import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";
import { siteName } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contacto",
  description: `Contacta con ${siteName} para soporte, reportes de datos UF, privacidad, alianzas y comentarios.`,
};

const relatedLinks = [
  { href: "/privacy-policy", label: "Política de privacidad" },
  { href: "/disclaimer", label: "Descargo de responsabilidad" },
  { href: "/#faq", label: "Preguntas frecuentes" },
];

const sections = [
  {
    heading: "Antes de escribirnos",
    paragraphs: [
      `Usa este canal para dudas sobre ${siteName}, errores en la conversión UF, sugerencias de contenido o consultas legales generales. No somos banco ni asesoría regulada; para plazos de pago urgentes valida el valor directamente con tu institución.`,
      "Revisa la política de privacidad y los términos antes de enviar datos sensibles. No compartas contraseñas, datos bancarios completos ni documentos confidenciales por este formulario.",
    ],
  },
  {
    heading: "Qué incluir en tu mensaje",
    paragraphs: [
      "Para reportar un problema técnico: URL de la página, fecha y hora, dispositivo, navegador y una descripción breve. Si el tema es el valor UF, indica el monto mostrado, el valor esperado y la fuente con la que comparas.",
      "Para avisos legales o privacidad: nombre completo, rol u organización, jurisdicción y base de tu solicitud. Podemos pedir verificación adicional para proteger datos de otros usuarios.",
    ],
  },
  {
    heading: "Temas que atendemos",
    paragraphs: [
      "Usabilidad de la calculadora, diferencias por redondeo o caché, aclaraciones del FAQ, solicitudes de eliminación de datos, reportes de abuso automatizado y propuestas de alianzas alineadas con educación financiera transparente.",
      "Las respuestas suelen llegar en uno a tres días hábiles según volumen. La calculadora sigue disponible mientras procesamos tu caso.",
    ],
  },
  {
    heading: "Publicidad y alianzas",
    paragraphs: [
      "Si tu consulta es sobre un anuncio o enlace patrocinado, indica la página y la ubicación del elemento. La monetización no cambia el carácter informativo de la herramienta.",
      "Para integraciones o colaboraciones editoriales, describe tu organización, alcance, plazo y requisitos técnicos. Priorizamos propuestas que aporten valor claro a lectores en Chile.",
    ],
  },
];

export default function ContactPage() {
  return (
    <LegalPage
      eyebrow="Soporte"
      title="Contáctanos"
      intro={`Escríbenos si necesitas ayuda con la calculadora UF, quieres reportar un dato incorrecto o tienes una consulta sobre privacidad y términos de ${siteName}.`}
      sections={sections}
      relatedLinks={relatedLinks}
    >
      <section className="content-page-panel" aria-labelledby="contact-form-title">
        <h2 id="contact-form-title" className="content-page-panel-title">
          Enviar mensaje
        </h2>
        <form className="content-page-form" aria-label="Formulario de contacto">
          <label className="content-page-label">
            Nombre
            <input
              type="text"
              name="name"
              autoComplete="name"
              className="content-page-input"
              placeholder="Tu nombre"
            />
          </label>
          <label className="content-page-label">
            Correo electrónico
            <input
              type="email"
              name="email"
              autoComplete="email"
              className="content-page-input"
              placeholder="tu@correo.cl"
            />
          </label>
          <label className="content-page-label">
            Asunto
            <select name="topic" className="content-page-input" defaultValue="general">
              <option value="general">Consulta general</option>
              <option value="data">Valor UF o conversión incorrecta</option>
              <option value="privacy">Privacidad o datos personales</option>
              <option value="legal">Aviso legal</option>
              <option value="partnership">Alianza o publicidad</option>
            </select>
          </label>
          <label className="content-page-label">
            Mensaje
            <textarea
              name="message"
              rows={5}
              className="content-page-input"
              placeholder="Describe tu consulta con el mayor detalle posible…"
            />
          </label>
          <button type="button" className="content-page-submit">
            Enviar mensaje
          </button>
        </form>
        <p className="mt-4 text-sm leading-relaxed text-ink-soft">
          Al enviar aceptas que tratemos tu mensaje según nuestra{" "}
          <Link href="/privacy-policy" className="font-semibold text-accent hover:text-accent-2">
            política de privacidad
          </Link>
          . Este formulario es informativo; la respuesta no constituye asesoría financiera ni legal.
        </p>
      </section>
    </LegalPage>
  );
}
