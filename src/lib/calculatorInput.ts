export type CalcMode = "UF_TO_CLP" | "CLP_TO_UF";

export const INPUT_MAX_LENGTH = 16;
export const MAX_UF = 9_999_999_999;
export const MAX_CLP = 9_999_999_999_999_999;

const UF_DECIMALS = 4;
const CLP_DECIMALS = 0;

export const RESULT_CLP_DECIMALS = 2;
export const RESULT_UF_DECIMALS = 2;

export function roundConversionResult(value: number, mode: CalcMode): number {
  const factor = 10 ** (mode === "UF_TO_CLP" ? RESULT_CLP_DECIMALS : RESULT_UF_DECIMALS);
  return Math.round(value * factor) / factor;
}

export function formatConversionResult(value: number, mode: CalcMode): string {
  if (Number.isNaN(value)) return "--";
  const decimals = mode === "UF_TO_CLP" ? RESULT_CLP_DECIMALS : RESULT_UF_DECIMALS;
  return new Intl.NumberFormat("es-CL", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

export function formatConversionInputDisplay(value: string, mode: CalcMode): string {
  const parsed = parseAmount(value);
  if (Number.isNaN(parsed)) return value;

  if (mode === "UF_TO_CLP") {
    return new Intl.NumberFormat("es-CL", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(parsed);
  }

  return new Intl.NumberFormat("es-CL", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(parsed);
}

export function formatConversionSummary(mode: CalcMode, input: string, result: number): string {
  const inputLabel = formatConversionInputDisplay(input, mode);
  const resultLabel = formatConversionResult(result, mode);

  if (mode === "UF_TO_CLP") {
    return `${inputLabel} UF = $ ${resultLabel} pesos chilenos`;
  }

  return `${inputLabel} pesos chilenos = ${resultLabel} unidad(es) de fomento`;
}

export function sanitizeAmount(raw: string, mode: CalcMode): string {
  let value = raw.replace(/[^\d.]/g, "");
  const parts = value.split(".");
  if (parts.length > 2) {
    value = `${parts[0]}.${parts.slice(1).join("")}`;
  }

  const maxDecimals = mode === "UF_TO_CLP" ? UF_DECIMALS : CLP_DECIMALS;
  if (value.includes(".")) {
    const [whole, fraction = ""] = value.split(".");
    value = `${whole}.${fraction.slice(0, maxDecimals)}`;
  }

  if (value.length > INPUT_MAX_LENGTH) {
    value = value.slice(0, INPUT_MAX_LENGTH);
  }

  if (value === "" || value === ".") return value;

  const parsed = Number(value);
  if (Number.isNaN(parsed)) return "";

  const max = mode === "UF_TO_CLP" ? MAX_UF : MAX_CLP;
  if (parsed > max) {
    return String(max);
  }

  return value;
}

export function parseAmount(value: string): number {
  const parsed = Number(value);
  return Number.isNaN(parsed) ? NaN : parsed;
}

export function isValidAmount(value: string): boolean {
  const trimmed = value.trim();
  if (!trimmed || trimmed === ".") return false;
  const parsed = parseAmount(trimmed);
  return !Number.isNaN(parsed) && parsed >= 0;
}

export function stepAmount(value: string, mode: CalcMode, direction: 1 | -1): string {
  const step = mode === "UF_TO_CLP" ? 0.1 : 1000;
  const parsed = parseAmount(value);
  const base = Number.isNaN(parsed) ? 0 : parsed;
  const next = Math.max(0, base + direction * step);
  const max = mode === "UF_TO_CLP" ? MAX_UF : MAX_CLP;
  const clamped = Math.min(next, max);
  if (mode === "CLP_TO_UF") {
    return String(Math.round(clamped));
  }

  const fixed = clamped.toFixed(UF_DECIMALS);
  return fixed.replace(/\.?0+$/, "") || "0";
}
