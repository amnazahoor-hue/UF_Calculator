import { formatClpRate } from "@/lib/ufRate";

export type ConversionRow = {
  uf: number;
  clpLabel: string;
};

const UF_AMOUNTS = [1, 2, 5, 10, 25, 30, 50, 80, 100, 500, 1000] as const;

export function buildConversionTable(rate: number): ConversionRow[] {
  return UF_AMOUNTS.map((uf) => ({
    uf,
    clpLabel: `$${formatClpRate(rate * uf)}`,
  }));
}

export function buildConversionReferenceLabel(rate: number) {
  return `$${formatClpRate(rate)}`;
}

/** @deprecated Use buildConversionTable(rate) */
export const fixedUfConversionTable = buildConversionTable(40790.42);
export const fixedUfReferenceLabel = fixedUfConversionTable[0].clpLabel;

export function formatFixedUfAmount(amount: number) {
  return `${new Intl.NumberFormat("es-CL", { maximumFractionDigits: 0 }).format(amount)} UF`;
}
