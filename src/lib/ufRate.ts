export type UfRateDay = {
  date: string;
  rate: number;
  projected?: boolean;
};

export type UfRatesResponse = {
  rate: number;
  date: string;
  history: UfRateDay[];
  fallback?: boolean;
  source?: string;
};

export function toDateKey(isoOrDate: string) {
  return isoOrDate.slice(0, 10);
}

function dateKeyFromParts(year: number, month: number, day = 1) {
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

/** Strip starts at current month; from July onward include previous month (Jun → Jul). */
export function getStripMinDate(today = new Date()) {
  const year = today.getFullYear();
  const month = today.getMonth() + 1;

  if (month >= 7) {
    return dateKeyFromParts(year, month - 1);
  }

  return dateKeyFromParts(year, month);
}

export function getTodayDateKey(today = new Date()) {
  return dateKeyFromParts(today.getFullYear(), today.getMonth() + 1, today.getDate());
}

/** End of next calendar month — e.g. in June includes all of July. */
function getStripEndDate(today = new Date()) {
  return new Date(today.getFullYear(), today.getMonth() + 2, 0);
}

function addDaysToDateKey(dateKey: string, days: number) {
  const date = parseDateKey(dateKey);
  date.setDate(date.getDate() + days);
  return dateKeyFromParts(date.getFullYear(), date.getMonth() + 1, date.getDate());
}

/** Adds forward dates through next month using the latest published UF rate. */
export function extendStripWithForwardDays(history: UfRateDay[]): UfRateDay[] {
  if (!history.length) return [];

  const sorted = [...history].sort((a, b) => a.date.localeCompare(b.date));
  const todayKey = getTodayDateKey();
  const latestRate = sorted.find((day) => day.date === todayKey)?.rate ?? sorted[sorted.length - 1].rate;
  const lastHistoricalKey = sorted[sorted.length - 1].date;
  const endDate = getStripEndDate();
  const endKey = dateKeyFromParts(endDate.getFullYear(), endDate.getMonth() + 1, endDate.getDate());

  const byDate = new Map(sorted.map((day) => [day.date, { ...day, projected: false }]));
  let cursorKey = addDaysToDateKey(lastHistoricalKey, 1);

  while (cursorKey <= endKey) {
    if (!byDate.has(cursorKey)) {
      byDate.set(cursorKey, {
        date: cursorKey,
        rate: latestRate,
        projected: cursorKey > todayKey,
      });
    }
    cursorKey = addDaysToDateKey(cursorKey, 1);
  }

  return Array.from(byDate.values()).sort((a, b) => a.date.localeCompare(b.date));
}

/** Chronological strip: current month onward + forward days through next month. */
export function prepareStripHistory(history: UfRateDay[], maxDays = 62) {
  const minDate = getStripMinDate();
  const historical = history
    .filter((day) => day.date >= minDate)
    .sort((a, b) => a.date.localeCompare(b.date));

  return extendStripWithForwardDays(historical).slice(-maxDays);
}

export function findStripDay(history: UfRateDay[], dateKey: string) {
  return prepareStripHistory(history).find((day) => day.date === dateKey);
}

export function parseDateKey(dateKey: string) {
  const [year, month, day] = dateKey.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function formatUfStripLabel(dateKey: string) {
  return new Intl.DateTimeFormat("es-CL", { day: "2-digit", month: "short" }).format(parseDateKey(dateKey));
}

export function formatUfLongDate(dateKey: string) {
  return new Intl.DateTimeFormat("es-CL", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(parseDateKey(dateKey));
}

export type UfDayChangeDirection = "up" | "down" | "flat";

export type UfDayChange = {
  direction: UfDayChangeDirection;
  amountClp: number;
  previousDate: string;
};

export function getUfDayChange(history: UfRateDay[], dateKey: string): UfDayChange | null {
  const rates = new Map(
    history
      .filter((day) => !day.projected)
      .map((day) => [day.date, day.rate] as const),
  );

  const currentRate = rates.get(dateKey);
  if (currentRate == null) return null;

  let previousKey = addDaysToDateKey(dateKey, -1);

  for (let attempt = 0; attempt < 10; attempt += 1) {
    const previousRate = rates.get(previousKey);
    if (previousRate != null) {
      const amountClp = Math.round((currentRate - previousRate) * 100) / 100;
      return {
        direction: amountClp > 0 ? "up" : amountClp < 0 ? "down" : "flat",
        amountClp,
        previousDate: previousKey,
      };
    }
    previousKey = addDaysToDateKey(previousKey, -1);
  }

  return null;
}

export function formatUfDayChangeLabel(change: UfDayChange, referenceDate: string) {
  const referenceLabel = isTodayDate(referenceDate)
    ? "respecto a ayer"
    : `respecto al ${formatUfStripLabel(change.previousDate)}`;

  if (change.direction === "flat") {
    return `Sin cambio ${referenceLabel}`;
  }

  const verb = change.direction === "up" ? "Subió" : "Bajó";
  return `${verb} $${formatClpRate(Math.abs(change.amountClp))} CLP ${referenceLabel}`;
}

export function formatClpRate(value: number) {
  return new Intl.NumberFormat("es-CL", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function isTodayDate(dateKey: string) {
  return dateKey === getTodayDateKey();
}

export function normalizeUfHistory(serie: Array<{ valor: number; fecha: string }>): UfRateDay[] {
  const byDate = new Map<string, number>();

  for (const entry of serie) {
    if (!entry?.valor || !entry?.fecha) continue;
    const date = toDateKey(entry.fecha);
    if (!byDate.has(date)) {
      byDate.set(date, entry.valor);
    }
  }

  return Array.from(byDate.entries())
    .map(([date, rate]) => ({ date, rate }))
    .sort((a, b) => b.date.localeCompare(a.date));
}
