"use client";

import { motion } from "framer-motion";
import { scrollToPageSection } from "@/lib/calculatorNav";
import { SectionEyebrow } from "./SectionEyebrow";
import { SectionReveal } from "./SectionReveal";

const highlights = [
  {
    title: "Convertidor Central",
    body: "Convierte UF a pesos y CLP a UF al instante con el valor oficial de hoy visible en el widget.",
    icon: "convert",
    visual: "convert",
  },
  {
    title: "Visualización De Valor Claro",
    body: "El valor UF del día se muestra destacado y se actualiza todos los días sin buscar en otro lugar.",
    icon: "display",
    visual: "display",
  },
  {
    title: "Funciones De Fecha Y Hora",
    body: "Muestra cuánto cambió la UF desde ayer, con monto en pesos y dirección arriba o abajo.",
    icon: "datetime",
    visual: "datetime",
  },
  {
    title: "Tablas",
    body: "Tabla de conversión rápida, tabla diaria del período y resumen mensual en un solo lugar.",
    icon: "tables",
    visual: "tables",
  },
] as const;

function HighlightIcon({ type }: { type: (typeof highlights)[number]["icon"] }) {
  if (type === "convert") {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M7 7h10M7 7l3-3M7 7l3 3M17 17H7m10 0l-3-3m3 3l-3 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (type === "display") {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
        <rect x="3" y="4" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <path d="M8 20h8M12 18v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }
  if (type === "datetime") {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
        <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <path d="M8 3v4M16 3v4M3 10h18M12 14v3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 6h16M4 12h16M4 18h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function FeatureVisual({ type }: { type: (typeof highlights)[number]["visual"] }) {
  if (type === "convert") {
    return (
      <div className="features-showcase-mock" aria-hidden>
        <div className="features-showcase-mock-glyph features-showcase-mock-glyph--convert">⇄</div>
        <div className="features-showcase-mock-card">
          <div className="features-showcase-mock-row">
            <span className="features-showcase-mock-pill">UF</span>
            <span className="features-showcase-mock-value">1.00</span>
          </div>
          <div className="features-showcase-mock-divider" />
          <div className="features-showcase-mock-row">
            <span className="features-showcase-mock-pill features-showcase-mock-pill--accent">CLP</span>
            <span className="features-showcase-mock-value features-showcase-mock-value--accent">40.804</span>
          </div>
        </div>
      </div>
    );
  }

  if (type === "display") {
    return (
      <div className="features-showcase-mock" aria-hidden>
        <div className="features-showcase-mock-glyph features-showcase-mock-glyph--display">UF</div>
        <div className="features-showcase-mock-card">
          <span className="features-showcase-mock-label">Valor UF hoy</span>
          <span className="features-showcase-mock-hero-value">$40.804,00</span>
          <span className="features-showcase-mock-sub">Actualizado diariamente</span>
        </div>
      </div>
    );
  }

  if (type === "datetime") {
    return (
      <div className="features-showcase-mock" aria-hidden>
        <div className="features-showcase-mock-glyph features-showcase-mock-glyph--datetime">↗</div>
        <div className="features-showcase-mock-card">
          <div className="features-showcase-mock-chart">
            <span className="features-showcase-mock-bar" style={{ height: "38%" }} />
            <span className="features-showcase-mock-bar" style={{ height: "52%" }} />
            <span className="features-showcase-mock-bar features-showcase-mock-bar--accent" style={{ height: "72%" }} />
            <span className="features-showcase-mock-bar" style={{ height: "58%" }} />
          </div>
          <span className="features-showcase-mock-delta">+$12,40 vs ayer</span>
        </div>
      </div>
    );
  }

  return (
    <div className="features-showcase-mock" aria-hidden>
      <div className="features-showcase-mock-glyph features-showcase-mock-glyph--tables">☰</div>
      <div className="features-showcase-mock-card">
        <div className="features-showcase-mock-table-row">
          <span>1 UF</span>
          <span className="features-showcase-mock-value--accent">$40.804</span>
        </div>
        <div className="features-showcase-mock-table-row">
          <span>5 UF</span>
          <span>$204.020</span>
        </div>
        <div className="features-showcase-mock-table-row">
          <span>10 UF</span>
          <span>$408.040</span>
        </div>
      </div>
    </div>
  );
}

export function CalculatorFeatures() {
  return (
    <section id="caracteristicas" className="section-features relative overflow-hidden pb-12 pt-10 sm:pb-14 sm:pt-12">
      <div aria-hidden className="features-showcase-panel-glow" />
      <div aria-hidden className="features-showcase-panel-noise" />

      <div className="relative z-[1] mx-auto w-full max-w-content px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <div className="features-showcase-header">
            <div className="features-showcase-header-copy">
              <SectionEyebrow variant="dark">Características</SectionEyebrow>
              <h2 className="mt-4 text-[clamp(1.85rem,3.8vw,2.75rem)] font-bold leading-tight tracking-[-0.02em] text-surface">
                Características Destacadas De Nuestra Calculadora UF
              </h2>
            </div>
            <p className="features-showcase-intro">
              Calculadora UF es única en su clase y hace más que simples cálculos. Hemos diseñado nuestra herramienta
              para manejar todo cuando trabajamos con Unidad de Fomento: conversiones instantáneas, datos actualizados,
              tablas cotidianas y herramientas prácticas.
            </p>
          </div>
        </SectionReveal>

        <div className="features-showcase-grid">
          {highlights.map((item, index) => (
            <SectionReveal key={item.title} delay={index * 0.08}>
              <motion.article
                className="features-showcase-col group"
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="features-showcase-col-icon">
                  <HighlightIcon type={item.icon} />
                </span>
                <h3 className="features-showcase-col-title">{item.title}</h3>
                <p className="features-showcase-col-body">{item.body}</p>
                <FeatureVisual type={item.visual} />
              </motion.article>
            </SectionReveal>
          ))}
        </div>

        <SectionReveal delay={0.32} className="features-showcase-cta-wrap">
          <div className="features-showcase-cta">
            <h3 className="text-lg font-bold text-surface sm:text-xl">Descubra El Valor UF hoy Chile</h3>
            <p className="mt-2 text-sm leading-relaxed text-[color-mix(in_oklab,var(--surface)_72%,transparent)]">
              Consulte el valor actual de la UF y convierta al instante con datos actualizados.
            </p>
            <a
              href="#tool"
              onClick={(e) => {
                e.preventDefault();
                scrollToPageSection("tool");
              }}
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-surface transition hover:bg-[color-mix(in_oklab,var(--accent)_88%,var(--ink))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#121212]"
            >
              Ver valor UF hoy
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M5 12h14M13 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
