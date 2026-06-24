import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { siteName } from "@/lib/site";

export const metadata: Metadata = {
  title: "Términos y condiciones",
  description: `Términos de uso de ${siteName}: calculadora UF, API pública y contenido educativo para Chile.`,
};

const relatedLinks = [
  { href: "/privacy-policy", label: "Política de privacidad" },
  { href: "/disclaimer", label: "Descargo de responsabilidad" },
  { href: "/about-us", label: "Sobre nosotros" },
];

const sections = [
  {
    heading: "Aceptación y elegibilidad",
    paragraphs: [
      `Al usar ${siteName}, aceptas estos términos. Si no estás de acuerdo, debes dejar de utilizar el sitio. El servicio está dirigido a personas que necesitan convertir o consultar la UF con fines informativos en Chile.`,
      "Debes usar la plataforma de forma lícita. Podemos limitar el acceso ante abuso automatizado, intentos de intrusión o uso que degrade la disponibilidad de la calculadora para otros usuarios.",
    ],
  },
  {
    heading: "Naturaleza del servicio",
    paragraphs: [
      "Ofrecemos conversión UF → CLP y CLP → UF, tablas de referencia, FAQ y artículos educativos. Los resultados dependen de datos públicos y de la lógica de cálculo implementada en el sitio.",
      "No garantizamos que cada salida coincida con sistemas internos de bancos, AFP, aseguradoras o tribunales. Es tu deber contrastar el valor antes de obligaciones contractuales.",
    ],
  },
  {
    heading: "Uso permitido y prohibido",
    paragraphs: [
      "Puedes usar la calculadora para consultas personales, comparativas, planificación de presupuesto o apoyo a decisiones que luego validarás con fuentes oficiales.",
      "Está prohibido el scraping agresivo, la sobrecarga intencional de endpoints, la suplantación, la ingeniería inversa maliciosa y presentar nuestros resultados como valor oficial sin verificación independiente.",
    ],
  },
  {
    heading: "Propiedad intelectual",
    paragraphs: [
      "El diseño, textos, marca, código y organización del contenido pertenecen al operador del sitio o sus licenciantes. Puedes enlazar al servicio y citar fragmentos razonables con atribución.",
      "No está permitida la reproducción masiva del contenido o la creación de servicios derivados que confundan al usuario sobre la autoría sin autorización escrita.",
    ],
  },
  {
    heading: "Datos, publicidad y responsabilidad",
    paragraphs: [
      "El tratamiento de datos personales se rige por nuestra Política de privacidad. Podemos incorporar publicidad o enlaces comerciales; esas relaciones se divulgarán de forma visible.",
      "El servicio se ofrece sin garantías expresas o implícitas. No somos responsables por pérdidas derivadas de confiar exclusivamente en la calculadora para operaciones de alto impacto.",
    ],
  },
  {
    heading: "Cambios y contacto",
    paragraphs: [
      "Podemos actualizar estos términos, la interfaz o las fuentes de datos UF. El uso continuado después de un cambio implica aceptación de la versión vigente publicada en esta página.",
      "Para consultas sobre estos términos, notificaciones legales o reportes de errores en la conversión UF, utiliza la página de contacto con el mayor detalle posible (URL, fecha, monto y captura).",
    ],
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal · Términos"
      title="Términos y condiciones"
      intro={`Reglas de uso de la calculadora UF, el contenido educativo y los servicios digitales de ${siteName}.`}
      sections={sections}
      relatedLinks={relatedLinks}
    />
  );
}
