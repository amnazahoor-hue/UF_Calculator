export type CalcMode = "UF_TO_CLP" | "CLP_TO_UF";

export const INPUT_MAX_LENGTH = 16;
export const MAX_UF = 99_999;
export const MAX_CLP = 999_999_999_999;

const UF_DECIMALS = 4;
const CLP_DECIMALS = 0;

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
