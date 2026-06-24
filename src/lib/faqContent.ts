import { formatClpRate } from "@/lib/ufRate";

export type FaqItem = {
  q: string;
  a: string;
};

const staticFaqItems: FaqItem[] = [
  {
    q: "¿Qué es la UF (Unidad de Fomento) y para qué se utiliza?",
    a: "La UF es una unidad monetaria expresada en pesos chilenos que se ajusta diariamente a la inflación. Fue creada en 1967 para preservar el poder adquisitivo. Se utiliza en hipotecas, alquileres, seguros y contratos a largo plazo.",
  },
  {
    q: "¿Cómo se calcula el valor de la UF?",
    a: "La fórmula es: UF hoy = UF del día anterior × (1 + variación diaria del IPC). La inflación mensual se distribuye en los días del período. Los valores del mes se publican del día 10 al 9 del mes siguiente.",
  },
  {
    q: "¿Cómo convierto pesos chilenos a UF?",
    a: "Divide la cantidad en pesos entre el valor actual de la UF. El resultado es cuántas unidades de fomento equivalen a ese monto según el tipo de cambio del día.",
  },
  {
    q: "¿Por qué cambia la UF todos los días?",
    a: "La inflación se distribuye a lo largo del mes y el valor difiere cada día según el IPC del período anterior. El Banco Central de Chile publica el valor oficial diariamente desde 1977.",
  },
  {
    q: "¿Quién publica el valor oficial de la UF?",
    a: "Según registros oficiales del Banco Central de Chile, la UF se actualiza y publica cada día hábil. Instituciones como el BCCh y el SII utilizan ese valor en sus sistemas.",
  },
  {
    q: "¿Cuál es la diferencia entre UF, UTM y UTA?",
    a: "La UF se actualiza diariamente para contratos y créditos. La UTM es una unidad tributaria mensual para impuestos y multas. La UTA equivale a 12 UTM y se usa en cálculos anuales.",
  },
  {
    q: "¿Para qué se utiliza la UF en Chile?",
    a: "La UF se usa en dividendos hipotecarios, arriendos, seguros, multas, matrículas universitarias, depósitos a plazo y contratos de construcción en todo Chile.",
  },
  {
    q: "¿Puedo cobrar o pagar en UF?",
    a: "La UF es una unidad de cuenta, no moneda de curso legal. Las obligaciones se expresan en UF, pero el pago se realiza en pesos chilenos convertidos al valor del día.",
  },
  {
    q: "¿Cómo se calcula el dividendo de una hipoteca en Unidades de Fomento (UF)?",
    a: "Se consideran el monto del préstamo en UF, la tasa de interés y el plazo. Multiplica las cuotas en UF por el valor del día para obtener el monto en pesos chilenos.",
  },
  {
    q: "¿Dónde puedo encontrar información sobre el valor histórico de la UF?",
    a: "El Banco Central de Chile publica series históricas oficiales. También puedes consultar mindicador.cl o usar la tabla de fechas de esta calculadora.",
  },
];

export function buildFaqItems(rate: number): FaqItem[] {
  const formattedRate = formatClpRate(rate);
  const exampleFive = formatClpRate(rate * 5);

  return [
    staticFaqItems[0],
    {
      q: "¿Cuál es el valor actual de la UF en pesos chilenos?",
      a: `Hoy 1 UF equivale a $${formattedRate} pesos chilenos según la fuente pública consultada. El valor cambia cada día hábil; consulta la calculadora para ver la cifra actualizada.`,
    },
    ...staticFaqItems.slice(1, 3),
    {
      q: "¿Cómo convierto UF a pesos chilenos?",
      a: `Multiplica la cantidad de UF por el valor del día. Ejemplo con la tasa actual: 5 UF × $${formattedRate} = $${exampleFive} pesos chilenos.`,
    },
    ...staticFaqItems.slice(3),
  ];
}

/** @deprecated Use buildFaqItems(rate) for live values */
export const faqItems = buildFaqItems(40804);
