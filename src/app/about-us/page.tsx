import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { siteName } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sobre nosotros",
  description: `Conoce la misión de ${siteName}: convertir UF y pesos chilenos con claridad, datos públicos y una experiencia pensada para Chile.`,
};

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
      "El acceso es gratuito. Financiamos el proyecto con publicidad responsable y, en el futuro, posibles enlaces de afiliados siempre señalados con transparencia.",
    ],
  },
  {
    heading: "Datos y transparencia",
    paragraphs: [
      "Los valores mostrados se obtienen de fuentes públicas como mindicador, vinculadas al ecosistema del Banco Central de Chile. Pueden existir diferencias de minutos u horas respecto a sistemas internos de bancos o notarías por políticas de actualización y redondeo.",
      "Si la fuente principal falla, activamos un modo de respaldo para que la calculadora siga disponible. Ese valor debe verificarse antes de pagos o firmas importantes.",
    ],
  },
  {
    heading: "Cómo trabajamos el contenido",
    paragraphs: [
      "Cada texto pasa por revisión editorial con foco en claridad, tono cercano y utilidad práctica. Evitamos prometer certeza donde solo hay estimación y enlazamos a políticas legales cuando el tema lo requiere.",
      "Puedes conocer a nuestra autora editorial ficticia en la página de autora. Los artículos y FAQ se actualizan cuando cambian hábitos de uso de la UF o surgen preguntas recurrentes de los lectores.",
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
    <LegalPage
      eyebrow="Proyecto · Chile"
      title="Sobre nosotros"
      intro={`${siteName} es una calculadora y guía informativa sobre la Unidad de Fomento. Aquí explicamos para quién es el proyecto, qué puedes esperar y cómo validamos la información.`}
      sections={sections}
      relatedLinks={relatedLinks}
    />
  );
}
