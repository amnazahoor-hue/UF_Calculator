import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";
import { buildPageMetadata } from "@/lib/pageMetadata";
import { bcchUfUrl, officialUfRateUrl, siteName } from "@/lib/site";

export const metadata: Metadata = buildPageMetadata({
  title: "Descargo de Responsabilidad — Calculadora UF Chile",
  description:
    "Descargo de Calculadora UF Chile: la herramienta UF es informativa. Valida montos con tu banco o notaría. Fuentes públicas y límites de responsabilidad explicados aquí.",
  path: "/disclaimer",
  index: false,
});

const sections = [
  {
    heading: "Uso exclusivamente informativo",
    paragraphs: [
      <>
        <Link href="/" className="content-page-inline-link">
          {siteName}
        </Link>{" "}
        es una herramienta gratuita para estimar conversiones entre la Unidad de Fomento (UF) y pesos chilenos (CLP). No
        somos banco, corredora, notaría, asesoría tributaria ni estudio jurídico.
      </>,
      "Los resultados sirven como referencia rápida para arriendos, créditos, seguros, multas o contratos indexados en UF. Antes de firmar, pagar o presentar un trámite oficial, debes confirmar el valor con la institución que administra tu operación.",
    ],
  },
  {
    heading: "Fuente del valor UF y posibles diferencias",
    paragraphs: [
      <>
        Mostramos valores obtenidos de indicadores públicos (por ejemplo vía{" "}
        <a
          href={officialUfRateUrl}
          className="content-page-inline-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          mindicador.cl
        </a>
        ), vinculados al ecosistema del{" "}
        <a href={bcchUfUrl} className="content-page-inline-link" target="_blank" rel="noopener noreferrer">
          Banco Central de Chile
        </a>
        . La UF se actualiza según reglas oficiales y puede variar por horario de publicación, redondeo o caché
        técnico.
      </>,
      "Un banco, administradora de fondos o arrendador puede aplicar el valor del día hábil anterior, una ventana distinta o decimales diferentes. Por eso una conversión en nuestra calculadora puede no coincidir exactamente con la de tu contrato.",
    ],
  },
  {
    heading: "Sin garantías ni relación profesional",
    paragraphs: [
      "El servicio se entrega “tal cual” y “según disponibilidad”. No garantizamos uptime continuo, ausencia de errores de redondeo ni idoneidad para un juicio, auditoría o liquidación bancaria específica.",
      "Usar el sitio no crea relación de asesoría financiera, legal o contable entre tú y los operadores del proyecto.",
    ],
  },
  {
    heading: "Modo de respaldo y continuidad",
    paragraphs: [
      "Si la fuente principal de datos no responde, podemos mostrar un valor de respaldo para que la herramienta siga operativa. Ese valor es temporal y debe verificarse antes de cualquier decisión contractual.",
      "Te recomendamos anotar fecha, hora y captura del valor UF usado cuando el monto sea relevante para dividendos, boletas o pagos legales.",
    ],
  },
  {
    heading: "Publicidad y enlaces externos",
    paragraphs: [
      "El sitio puede incluir anuncios, enlaces de afiliados o referencias a terceros para financiar el acceso gratuito. Esa monetización no cambia el carácter informativo de la calculadora.",
      "No controlamos sitios externos ni sus políticas. Revisa siempre los términos del proveedor antes de contratar un producto financiero.",
    ],
  },
  {
    heading: "Limitación de responsabilidad",
    paragraphs: [
      "En la medida permitida por la ley, no respondemos por daños indirectos, lucro cesante, multas, retrasos en pagos o disputas contractuales derivadas del uso de los valores mostrados.",
      <>
        Tú eres responsable de validar cifras críticas. Para montos altos o plazos legales, consulta directamente al{" "}
        <a href={bcchUfUrl} className="content-page-inline-link" target="_blank" rel="noopener noreferrer">
          Banco Central de Chile
        </a>
        , a tu banco o a un profesional calificado en Chile.
      </>,
    ],
  },
];

export default function DisclaimerPage() {
  return (
    <LegalPage
      eyebrow="Legal · Descargo"
      title="Descargo de Responsabilidad — Calculadora UF Chile"
      intro={`Límites del uso de ${siteName} como referencia para conversiones UF ↔ CLP en Chile.`}
      sections={sections}
      breadcrumbs={[
        { name: "Inicio", path: "/" },
        { name: "Descargo de responsabilidad", path: "/disclaimer" },
      ]}
    />
  );
}
