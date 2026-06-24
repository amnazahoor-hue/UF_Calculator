import type { Metadata } from "next";
import Link from "next/link";
import { KeyTakeaways } from "@/components/KeyTakeaways";
import { SiteImage } from "@/components/SiteImage";
import { siteAuthor } from "@/lib/author";
import { authorPageSchemaGraph } from "@/lib/jsonLd";
import { buildPageMetadata } from "@/lib/pageMetadata";
import { imageCatalog } from "@/lib/images";
import { siteName } from "@/lib/site";

export const metadata: Metadata = buildPageMetadata({
  title: "Autora Editorial de Calculadora UF Chile",
  description:
    "Perfil editorial de Camila Escobar Vera en Calculadora UF Chile: criterios de revisión, temas sobre UF, contratos indexados y finanzas personales en Chile.",
  path: "/author",
  index: false,
});

const expertiseTopics = [
  "Unidad de Fomento (UF) y su vínculo con el IPC",
  "Arriendos y contratos indexados en Chile",
  "Créditos hipotecarios y cuotas en UF",
  "Seguros, multas y trámites con montos reajustables",
  "Redacción clara de conceptos financieros cotidianos",
];

const editorialStandards = [
  "Priorizar utilidad práctica sobre tecnicismos innecesarios.",
  "Señalar siempre cuándo conviene verificar con banco, notaría o institución emisora.",
  "Citar fuentes públicas (BCCh, mindicador) cuando el dato lo requiere.",
  "Actualizar FAQ y casos de uso cuando cambian hábitos de consulta.",
  "Mantener tono respetuoso y accesible para lectores sin formación financiera.",
];

export default function AuthorPage() {
  return (
    <main className="content-page flex-1">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(authorPageSchemaGraph()) }}
      />
      <div className="content-page-inner mx-auto w-full max-w-content px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
        <header className="content-page-hero">
          <p className="content-page-eyebrow">Equipo editorial</p>
          <h1 className="content-page-title">Autora Editorial de Calculadora UF Chile</h1>
          <KeyTakeaways>
            {siteAuthor.name} es la voz editorial ficticia detrás de {siteName}. Define criterios de claridad, revisión de
            datos UF y tono accesible para lectores en Chile que convierten pesos y UF cada día.
          </KeyTakeaways>
          <p className="content-page-intro">
            Personaje editorial ficticio creado para {siteName}. El retrato y la biografía son ilustrativos y no
            representan a una persona real. El contenido del sitio sigue estándares editoriales independientes de esta
            narrativa.
          </p>
        </header>

        <article className="author-card mt-8">
          <div className="author-card-media">
            <SiteImage
              image={imageCatalog.authorPortrait}
              width={640}
              height={640}
              loading="lazy"
              className="author-card-photo"
            />
          </div>
          <div className="author-card-copy">
            <h2 className="text-2xl font-bold text-ink sm:text-3xl">{siteAuthor.name}</h2>
            <p className="mt-2 text-sm font-semibold text-accent">
              {siteAuthor.role} · {siteAuthor.location}
            </p>
            <p className="mt-4 text-base leading-relaxed text-ink-soft">{siteAuthor.shortBio}</p>
          </div>
        </article>

        <div className="author-page-sections">
          <section className="content-page-card">
            <span className="content-page-card-num" aria-hidden>
              01
            </span>
            <h2 className="content-page-card-title">Trayectoria editorial</h2>
            <div className="content-page-card-body">
              <p>
                Camila coordina la línea editorial de {siteName} con un enfoque práctico: explicar la UF sin jerga
                innecesaria y conectar cada conversión con situaciones reales — arriendos, seguros, créditos
                hipotecarios, matrículas universitarias y trámites legales.
              </p>
              <p>
                Antes de colaborar en proyectos de divulgación financiera digital, estudió comunicación y economía
                aplicada. Esa combinación orienta textos que respetan el marco chileno: ciclo de publicación del IPC,
                actualización diaria de la UF y diferencias habituales entre valor de referencia web y valor contractual.
              </p>
            </div>
          </section>

          <section className="content-page-card">
            <span className="content-page-card-num" aria-hidden>
              02
            </span>
            <h2 className="content-page-card-title">Enfoque de trabajo</h2>
            <div className="content-page-card-body">
              <p>
                Su trabajo prioriza la precisión contextual. En lugar de prometer certeza absoluta, el contenido invita
                a verificar montos críticos con la institución que administra cada contrato, especialmente cuando hay
                plazos legales o pagos de alto valor.
              </p>
              <p>
                Revisa borradores de FAQ, casos de uso y páginas legales para que el lenguaje sea coherente: la
                calculadora es una referencia rápida, no un dictamen bancario ni una liquidación oficial.
              </p>
            </div>
          </section>

          <section className="content-page-card">
            <span className="content-page-card-num" aria-hidden>
              03
            </span>
            <h2 className="content-page-card-title">Temas que cubre</h2>
            <div className="content-page-card-body">
              <ul className="list-disc space-y-2 pl-5 text-[0.9375rem] leading-relaxed text-ink-soft">
                {expertiseTopics.map((topic) => (
                  <li key={topic}>{topic}</li>
                ))}
              </ul>
            </div>
          </section>

          <section className="content-page-card">
            <span className="content-page-card-num" aria-hidden>
              04
            </span>
            <h2 className="content-page-card-title">Estándares editoriales</h2>
            <div className="content-page-card-body">
              <ul className="list-disc space-y-2 pl-5 text-[0.9375rem] leading-relaxed text-ink-soft">
                {editorialStandards.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </section>

          <section className="content-page-card">
            <span className="content-page-card-num" aria-hidden>
              05
            </span>
            <h2 className="content-page-card-title">Contenido en el sitio</h2>
            <div className="content-page-card-body">
              <p>
                Participa en la planificación de preguntas frecuentes sobre por qué la UF cambia cada día, cómo se usa
                en contratos de arriendo y qué hacer cuando el valor del banco no coincide con el de una calculadora
                pública.
              </p>
              <p>
                También impulsa ejemplos numéricos realistas — por ejemplo, convertir 150 UF a pesos para comparar con
                un dividendo o estimar el reajuste anual de un arriendo — siempre con advertencias claras sobre
                redondeo y día hábil.
              </p>
            </div>
          </section>
        </div>

        <aside className="content-page-related" aria-label="Enlaces relacionados">
          <h2 className="content-page-related-title">También te puede interesar</h2>
          <div className="content-page-related-links">
            <Link href="/about-us" className="content-page-related-link">
              Sobre nosotros
            </Link>
            <Link href="/contact" className="content-page-related-link">
              Contáctanos
            </Link>
            <Link href="/#tool" className="content-page-related-link">
              Abrir calculadora
            </Link>
            <Link href="/privacy-policy" className="content-page-related-link">
              Política de privacidad
            </Link>
          </div>
        </aside>
      </div>
    </main>
  );
}
