import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";
import { aboutUsArticleSchemaGraph } from "@/lib/jsonLd";
import { buildPageMetadata } from "@/lib/pageMetadata";
import { aboutBreadcrumbs } from "@/lib/breadcrumbs";
import { bcchUfUrl, officialUfRateUrl, siteName } from "@/lib/site";

export const metadata: Metadata = buildPageMetadata({
  title: "Sobre la Calculadora UF Chile",
  description:
    "Conoce Calculadora UF Chile: misión, datos públicos del Banco Central y cómo convertimos UF y pesos con claridad para arriendos, créditos y contratos indexados.",
  path: "/about-us",
});

const relatedLinks = [
  { href: "/author", label: "Conocer a la autora" },
  { href: "/#tool", label: "Usar la calculadora" },
  { href: "/contact", label: "Contáctanos" },
];

const sections = [
  {
    heading: "Nuestra misión",
    paragraphs: [
      `${siteName} nace para ayudar a personas, familias y profesionales a entender y convertir la Unidad de Fomento sin fricción. Queremos que consultar el valor UF del día sea tan simple como usar una calculadora, pero con el contexto necesario para decisiones reales: arriendos, créditos, seguros, multas y contratos.`,
      "Creemos que la información financiera pública debe ser accesible, legible y útil en el móvil. Por eso priorizamos velocidad, claridad visual y explicaciones en español adaptadas al contexto chileno.",
    ],
  },
  {
    heading: "Para quién es esta herramienta",
    paragraphs: [
      "Arrendatarios y propietarios que necesitan pasar de UF a pesos para el pago mensual. Trabajadores independientes que facturan o cotizan en UF. Estudiantes que comparan matrículas indexadas. Y cualquier persona que quiera saber cuánto vale hoy un monto expresado en la unidad reajustable más usada en Chile.",
      "No reemplazamos al banco, a la notaría ni al SII. Somos el primer paso: una referencia rápida antes de confirmar con quien administra tu operación.",
    ],
  },
  {
    heading: "Qué ofrecemos",
    paragraphs: [
      "Conversión bidireccional UF ↔ CLP con valor actualizado desde indicadores públicos. Tablas de referencia, preguntas frecuentes y casos de uso que explican cuándo importa el día hábil, el redondeo y la diferencia entre valor de referencia y valor contractual.",
      "El acceso es gratuito. Financiamos el proyecto con publicidad responsable y, cuando corresponda, enlaces de afiliados siempre señalados con transparencia.",
    ],
  },
  {
    heading: "Datos y transparencia",
    paragraphs: [
      <>
        Los valores mostrados se obtienen de fuentes públicas como{" "}
        <a
          href={officialUfRateUrl}
          className="content-page-inline-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          mindicador.cl
        </a>
        , vinculadas al ecosistema del{" "}
        <a href={bcchUfUrl} className="content-page-inline-link" target="_blank" rel="noopener noreferrer">
          Banco Central de Chile
        </a>
        . Pueden existir diferencias de minutos u horas respecto a sistemas internos de bancos o notarías por políticas
        de actualización y redondeo.
      </>,
      "Si la fuente principal falla, activamos un modo de respaldo para que la calculadora siga disponible. Ese valor debe verificarse antes de pagos o firmas importantes.",
    ],
  },
  {
    heading: "Cómo trabajamos el contenido",
    paragraphs: [
      "Cada texto pasa por revisión editorial con foco en claridad, tono cercano y utilidad práctica. Evitamos prometer certeza donde solo hay estimación y enlazamos a políticas legales cuando el tema lo requiere.",
      "Los artículos y FAQ se actualizan cuando cambian hábitos de uso de la UF o surgen preguntas recurrentes de los lectores.",
    ],
  },
  {
    heading: "Compromiso con Chile",
    paragraphs: [
      "Diseñamos la interfaz pensando en lectores en Chile: formato de miles, contexto del IPC, referencias a contratos típicos y lenguaje que no asume formación financiera previa.",
      "Si detectas un error, una cifra desactualizada o una explicación confusa, escríbenos. Los reportes de la comunidad nos ayudan a mejorar.",
    ],
  },
];

export default function AboutUsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutUsArticleSchemaGraph()) }}
      />
      <LegalPage
        eyebrow="Proyecto · Chile"
        title="Sobre la Calculadora UF Chile"
        takeaways={`${siteName} es una herramienta gratuita para convertir UF y pesos chilenos con datos públicos del Banco Central. Explicamos la misión del proyecto, cómo validamos cifras y para quién está pensada la calculadora en Chile.`}
        intro={`${siteName} es una calculadora y guía informativa sobre la Unidad de Fomento. Aquí explicamos para quién es el proyecto, qué puedes esperar y cómo validamos la información con fuentes oficiales.`}
        sections={sections}
        relatedLinks={relatedLinks}
        breadcrumbs={aboutBreadcrumbs}
        breadcrumbSchema={false}
      />
    </>
  );
}
