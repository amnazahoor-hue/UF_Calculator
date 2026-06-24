"use client";

import { motion } from "framer-motion";
import { scrollToPageSection } from "@/lib/calculatorNav";
import { SectionEyebrow } from "./SectionEyebrow";
import { SectionReveal } from "./SectionReveal";

const features = [
  {
    title: "Utiliza el valor UF más reciente y oficial.",
    icon: "official",
  },
  {
    title: "Según los datos oficiales de la UF del Banco Central de Chile.",
    icon: "bcch",
  },
  {
    title: "Cálculos precisos y rápidos",
    icon: "fast",
  },
  {
    title: "Resultados de cálculo en tiempo real",
    icon: "realtime",
  },
] as const;
const trustPills = ["Datos oficiales", "Actualización diaria", "Gratis"];

function FeatureIcon({ type }: { type: (typeof features)[number]["icon"] }) {
  if (type === "official") {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M12 3l8 4v6c0 4.5-3.5 7.8-8 9-4.5-1.2-8-4.5-8-9V7l8-4z" stroke="currentColor" strokeWidth="1.8" />
        <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }
  if (type === "bcch") {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M3 21h18M5 21V9l7-5 7 5v12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 21v-6h6v6" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    );
  }
  if (type === "fast") {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M13 2L4 14h7l-1 8 10-14h-7l0-6z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    );
  }
  if (type === "realtime") {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.8" />
        <path d="M12 8v4l3 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }
  return null;
}

export function InfoCards() {
  return (
    <section id="que-es-uf" className="section-info-wrap relative overflow-hidden pb-12 pt-10 sm:pb-14 sm:pt-12">
      <div aria-hidden className="section-info-texture" />
      <div aria-hidden className="section-info-glow" />

      <div className="relative z-[1] mx-auto w-full max-w-content px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl text-center lg:text-left">
              <SectionEyebrow>¿Qué es UF?</SectionEyebrow>
              <h2 className="mt-3 text-[clamp(1.75rem,3.5vw,2.5rem)] font-bold tracking-[-0.02em] text-ink">
                ¿Qué Es UF? Esto Es Lo Que Realmente Estás Convirtiendo
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-ink-soft sm:text-base">
                La UF, también conocida como Unidad de Fomento, es una unidad financiera que se ajusta según la
                inflación. La UF se estableció el 2 de enero de 1967 y fue asignada por el Ministerio de Hacienda de
                Chile. El valor de la UF cambia constantemente, ya que se basa en la inflación y ayuda a mantener el
                valor real del dinero a lo largo del tiempo. Con la ayuda de nuestra calculadora UF, puede ingresar
                su valor hoy y ver la equivalencia en pesos chilenos según el tipo de cambio actual de la UF.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-2 lg:justify-end">
              {trustPills.map((pill) => (
                <span
                  key={pill}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[color-mix(in_oklab,var(--accent)_22%,var(--border))] bg-[color-mix(in_oklab,var(--surface)_85%,var(--bg-warm-2))] px-3 py-1.5 text-xs font-medium text-ink-soft"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
                  {pill}
                </span>
              ))}
            </div>
          </div>
        </SectionReveal>

        <div className="relative mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((item, index) => (
            <SectionReveal key={item.title} delay={index * 0.06}>
              <motion.article
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="info-card group h-full"
              >
                <span className="info-card-icon">
                  <FeatureIcon type={item.icon} />
                </span>
                <h3 className="mt-4 text-base font-bold leading-snug text-ink">{item.title}</h3>
                <span className="info-card-accent" aria-hidden />
              </motion.article>
            </SectionReveal>
          ))}
        </div>

        <SectionReveal delay={0.28} className="mt-8 text-center">
          <a
            href="#tool"
            onClick={(e) => {
              e.preventDefault();
              scrollToPageSection("tool");
            }}
            className="header-cta inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          >
            Mantente Actualizado UF Hoy
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
        </SectionReveal>
      </div>
    </section>
  );
}
