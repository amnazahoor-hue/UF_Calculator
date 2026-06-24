export type FixedConversionRow = {
  uf: number;
  clpLabel: string;
};

/** Valores fijos de la tabla UF → CLP (referencia publicada). */
export const fixedUfConversionTable: FixedConversionRow[] = [
  { uf: 1, clpLabel: "$40.790,42" },
  { uf: 2, clpLabel: "$81.580,84" },
  { uf: 5, clpLabel: "$203.592,11" },
  { uf: 10, clpLabel: "$407.904,22" },
  { uf: 25, clpLabel: "$1.019.760,55" },
  { uf: 30, clpLabel: "$1.223.400" },
  { uf: 50, clpLabel: "$2.039.521,09" },
  { uf: 80, clpLabel: "$3.263.233,75" },
  { uf: 100, clpLabel: "$4.079.042,19" },
  { uf: 500, clpLabel: "$20.395.210,94" },
  { uf: 1000, clpLabel: "$40.790.421,88" },
];

export const fixedUfReferenceLabel = fixedUfConversionTable[0].clpLabel;

export function formatFixedUfAmount(amount: number) {
  return `${new Intl.NumberFormat("es-CL", { maximumFractionDigits: 0 }).format(amount)} UF`;
}
