import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";
import { buildPageMetadata } from "@/lib/pageMetadata";
import { siteName } from "@/lib/site";

export const metadata: Metadata = buildPageMetadata({
  title: "Política de Privacidad de la Calculadora UF",
  description:
    "Política de privacidad de Calculadora UF Chile: cookies, datos de uso de la calculadora UF, formulario de contacto y publicidad responsable en el sitio web.",
  path: "/privacy-policy",
  index: false,
});

const sections = [
  {
    heading: "Alcance y compromiso",
    paragraphs: [
      <>
        {siteName} respeta tu privacidad mientras usas la{" "}
        <Link href="/" className="content-page-inline-link">
          calculadora UF Chile
        </Link>
        , las tablas de conversión y el contenido educativo del sitio. Esta política explica qué datos podemos
        recopilar, por qué lo hacemos y qué opciones tienes.
      </>,
      "La herramienta principal no exige registro ni cuenta. Puedes convertir UF a pesos chilenos y viceversa sin entregar datos personales obligatorios. Solo solicitamos información adicional si decides escribirnos por el formulario de contacto.",
    ],
  },
  {
    heading: "Datos que podemos recopilar",
    paragraphs: [
      "Al navegar el sitio, nuestros servidores y proveedores técnicos pueden registrar datos como dirección IP, tipo de navegador, sistema operativo, idioma, páginas visitadas y marcas de tiempo. Esto ayuda a mantener la seguridad, medir rendimiento y detectar abusos en los endpoints de la API de UF.",
      "Si usas el conversor, no almacenamos de forma permanente los montos que ingresas para calcular, salvo registros técnicos agregados o anonimizados para diagnóstico. Al contactarnos, podemos recibir tu nombre, correo y mensaje.",
    ],
  },
  {
    heading: "Cookies, analítica y publicidad",
    paragraphs: [
      "Usamos cookies para recordar preferencias básicas, medir visitas a secciones como FAQ o casos de uso, y mantener la estabilidad del sitio. Puedes bloquear cookies desde tu navegador; algunas funciones del sitio se verán afectadas.",
      "Cuando activemos publicidad o enlaces de afiliados, lo señalaremos con avisos visibles. Esos proveedores pueden usar identificadores propios según sus políticas.",
    ],
  },
  {
    heading: "Finalidad del tratamiento",
    paragraphs: [
      "Usamos la información para operar la calculadora, mejorar textos sobre la UF en Chile, responder consultas, cumplir obligaciones legales y proteger la infraestructura frente a bots o scraping abusivo.",
      "No vendemos datos personales ni utilizamos la calculadora para decisiones automatizadas de crédito, scoring financiero o elegibilidad bancaria.",
    ],
  },
  {
    heading: "Conservación y seguridad",
    paragraphs: [
      "Conservamos mensajes de contacto el tiempo necesario para resolver incidencias y mantener registros de cumplimiento. Los informes analíticos agregados pueden conservarse más tiempo sin identificar usuarios de forma directa.",
      "Aplicamos medidas razonables de seguridad, pero ningún servicio en internet es 100 % invulnerable. Evita enviar claves bancarias, RUT completos innecesarios o documentos confidenciales por el formulario abierto.",
    ],
  },
  {
    heading: "Tus derechos y contacto",
    paragraphs: [
      "Según la normativa aplicable, puedes solicitar acceso, rectificación, eliminación u oposición al tratamiento de tus datos. Evaluaremos cada solicitud de buena fe y podremos pedir verificación de identidad.",
      "Para dudas sobre privacidad relacionadas con el uso de la calculadora UF, escríbenos desde la página de contacto. Actualizaremos esta política cuando cambien nuestras prácticas o requisitos legales.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      eyebrow="Legal · Privacidad"
      title="Política de Privacidad de la Calculadora UF"
      intro={`Cómo ${siteName} trata datos personales, cookies y analítica en el contexto de una calculadora gratuita de UF y pesos chilenos.`}
      sections={sections}
      breadcrumbs={[
        { name: "Inicio", path: "/" },
        { name: "Política de privacidad", path: "/privacy-policy" },
      ]}
    />
  );
}
