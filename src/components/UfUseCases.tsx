"use client";

import { motion } from "framer-motion";
import { scrollToPageSection } from "@/lib/calculatorNav";
import { SectionEyebrow } from "./SectionEyebrow";
import { SectionReveal } from "./SectionReveal";

const useCases = [
  {
    title: "Vivienda Y Propiedad",
    body: "Gestiona tus pagos diarios con nuestra herramienta, ya que se utiliza para dividendos mensuales y pagos mensuales de préstamos que suelen estar fijados en UF. En el caso del alquiler, muchos contratos se cotizan en UF y también puedes ajustarlos mensualmente.",
  },
  {
    title: "Seguros Y Salud",
    body: "Los planes de seguro médico mensuales se cotizan en UF. También puede obtener coberturas premium de vida y hogar. Además, las pensiones y anualidades también se cotizan en UF para que conserven su valor.",
  },
  {
    title: "Préstamos Y Financiación",
    body: "Los préstamos estudiantiles, los depósitos a plazo fijo y otros trámites bancarios se realizan a través de la UF.",
  },
  {
    title: "Educación",
    body: "Los estudiantes también lo necesitan para el proceso de admisión a la universidad y para los trámites de matrícula, y eso es común con el valor UF hoy en Chile.",
  },
  {
    title: "Fines Legales Y Oficiales",
    body: "Todos los tipos de multas y sanciones también se expresan en UF. Necesitarías el valor UF de hoy y mañana para contratos de construcción, indemnizaciones por despido y acuerdos legales.",
  },
] as const;

function UfGrowthIllustration() {
  return (
    <svg className="use-cases-illustration" viewBox="0 0 420 380" fill="none" aria-hidden>
      <ellipse cx="210" cy="340" rx="160" ry="28" fill="#dbeafe" opacity="0.55" />
      <path
        d="M120 290 C 160 250, 200 220, 250 170 S 310 120, 330 95"
        stroke="url(#ufTrail)"
        strokeWidth="28"
        strokeLinecap="round"
      />
      <defs>
        <linearGradient id="ufTrail" x1="120" y1="290" x2="330" y2="95" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#f2a07b" />
          <stop offset="100%" stopColor="#e8744a" />
        </linearGradient>
      </defs>
      <g transform="translate(248, 58)">
        <path d="M36 8 L68 120 L52 120 L58 156 L20 92 L36 92 Z" fill="#3b82f6" />
        <path d="M30 24 L52 24 L48 72 L34 72 Z" fill="#60a5fa" opacity="0.45" />
        <circle cx="44" cy="52" r="10" fill="#eff6ff" />
        <text x="44" y="56" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1d4ed8">
          UF
        </text>
      </g>
      <rect x="72" y="248" width="88" height="58" rx="12" fill="#ffffff" stroke="#bfdbfe" strokeWidth="2" />
      <text x="88" y="272" fontSize="11" fontWeight="700" fill="#e8744a">
        CLP
      </text>
      <text x="88" y="292" fontSize="14" fontWeight="700" fill="#1a1a1a">
        $408.040
      </text>
      <circle cx="48" cy="72" r="3" fill="#ffffff" opacity="0.9" />
      <circle cx="360" cy="48" r="4" fill="#ffffff" opacity="0.85" />
      <path d="M350 36 l4 8 -8 0 z" fill="#ffffff" opacity="0.75" />
      <path d="M58 120 l4 8 -8 0 z" fill="#ffffff" opacity="0.7" />
    </svg>
  );
}

export function UfUseCases() {
  return (
    <section id="casos-de-uso" className="section-use-cases relative overflow-hidden pb-12 pt-10 sm:pb-14 sm:pt-12">
      <div aria-hidden className="use-cases-sky" />
      <div aria-hidden className="use-cases-cloud use-cases-cloud--1" />
      <div aria-hidden className="use-cases-cloud use-cases-cloud--2" />

      <div className="relative mx-auto w-full max-w-content px-4 sm:px-6 lg:px-8">
        <div className="use-cases-panel">
          <SectionReveal className="use-cases-panel-header text-center">
            <SectionEyebrow>Casos de uso</SectionEyebrow>
            <h2 className="mt-4 text-[clamp(1.75rem,3.5vw,2.5rem)] font-bold tracking-[-0.02em] text-ink">
              Cálculos De UF Para Cada Situación De La Vida Real
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-ink-soft sm:text-base">
              Nuestro conversor a UF se utiliza prácticamente en cualquier situación de la vida real. Aquí tienes
              algunos ejemplos cotidianos en los que puedes usar nuestra herramienta:
            </p>
          </SectionReveal>

          <div className="use-cases-split">
            <div className="use-cases-list">
              {useCases.map((item, index) => (
                <SectionReveal key={item.title} delay={index * 0.06}>
                  <motion.article
                    className="use-cases-item"
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <span className="use-cases-item-num" aria-hidden>
                      {index + 1}
                    </span>
                    <div className="use-cases-item-copy">
                      <h3 className="use-cases-item-title">{item.title}</h3>
                      <p className="use-cases-item-body">{item.body}</p>
                    </div>
                  </motion.article>
                </SectionReveal>
              ))}
            </div>

            <SectionReveal delay={0.12} className="use-cases-visual-wrap">
              <UfGrowthIllustration />
            </SectionReveal>
          </div>

          <SectionReveal delay={0.28} className="use-cases-cta-wrap">
            <h3 className="use-cases-cta-title">Echa Un Vistazo A UF 2026</h3>
            <p className="use-cases-cta-text">
              Convierte UF a pesos chilenos con el valor actualizado y úsalo en tus situaciones del día a día.
            </p>
            <a
              href="#tool"
              onClick={(e) => {
                e.preventDefault();
                scrollToPageSection("tool");
              }}
              className="use-cases-cta-btn"
            >
              Calcular UF ahora
            </a>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
