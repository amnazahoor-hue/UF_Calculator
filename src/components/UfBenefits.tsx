"use client";

import { motion, useReducedMotion } from "framer-motion";
import { scrollToPageSection } from "@/lib/calculatorNav";
import { SectionReveal } from "./SectionReveal";

export function BenefitsCenterVisual() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="benefits-center-visual" aria-hidden>
      <motion.div
        className="benefits-center-visual-orb"
        animate={reduceMotion ? undefined : { scale: [1, 1.05, 1], opacity: [0.7, 0.9, 0.7] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="benefits-center-device"
        animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="benefits-center-device-top">
          <span className="benefits-center-device-dot" />
          <span className="benefits-center-device-dot" />
          <span className="benefits-center-device-dot benefits-center-device-dot--accent" />
        </div>

        <div className="benefits-center-device-screen">
          <p className="benefits-center-device-label">Calculadora UF Chile</p>

          <div className="benefits-center-device-row">
            <span className="benefits-center-device-pill">UF</span>
            <span className="benefits-center-device-value">1,00</span>
          </div>

          <motion.div
            className="benefits-center-device-swap"
            animate={reduceMotion ? undefined : { rotate: [0, 180, 360] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            ⇅
          </motion.div>

          <div className="benefits-center-device-row benefits-center-device-row--clp">
            <span className="benefits-center-device-pill benefits-center-device-pill--clp">CLP</span>
            <span className="benefits-center-device-value benefits-center-device-value--clp">$40.804</span>
          </div>

          <div className="benefits-center-device-footer">
            <span className="benefits-center-device-live" />
            Valor UF actualizado hoy
          </div>
        </div>
      </motion.div>

      <motion.span
        className="benefits-center-badge benefits-center-badge--left"
        animate={reduceMotion ? undefined : { y: [0, -5, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
      >
        Preciso
      </motion.span>
      <motion.span
        className="benefits-center-badge benefits-center-badge--right"
        animate={reduceMotion ? undefined : { y: [0, 5, 0] }}
        transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
      >
        Gratis
      </motion.span>
    </div>
  );
}

function BenefitBlock({
  title,
  body,
  icon,
  align = "left",
}: {
  title: string;
  body: string;
  icon: "shield" | "contract" | "savings" | "stability";
  align?: "left" | "right";
}) {
  return (
    <article className={`benefits-showcase-item benefits-showcase-item--${align}`} tabIndex={0}>
      <span className="benefits-showcase-item-icon">
        <BenefitIcon type={icon} />
      </span>
      <h3 className="benefits-showcase-item-title">{title}</h3>
      <p className="benefits-showcase-item-body">{body}</p>
    </article>
  );
}

function BenefitIcon({ type }: { type: "shield" | "contract" | "savings" | "stability" }) {
  const props = { width: 22, height: 22, viewBox: "0 0 24 24", fill: "none", "aria-hidden": true as const };

  if (type === "shield") {
    return (
      <svg {...props}>
        <path d="M12 3l8 4v6c0 4.5-3.5 7.8-8 9-4.5-1.2-8-4.5-8-9V7l8-4z" stroke="currentColor" strokeWidth="1.8" />
        <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }
  if (type === "contract") {
    return (
      <svg {...props}>
        <path d="M7 4h7l5 5v11H7V4z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M14 4v5h5M10 13h6M10 17h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }
  if (type === "savings") {
    return (
      <svg {...props}>
        <path d="M12 3v18M7 8c0-2.8 2.2-5 5-5s5 2.2 5 5-2.2 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg {...props}>
      <path d="M3 21h18M6 21V10l6-4 6 4v11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 21v-5h4v5" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}

const benefitsLeft = [
  {
    title: "Proteja El Poder Adquisitivo",
    body: "Dado que la inflación siempre fluctúa, un valor expresado en UF conservará un mayor valor y durante mucho tiempo.",
    icon: "shield" as const,
  },
  {
    title: "Contratos A Largo Plazo Contra La Inflación",
    body: "Las hipotecas, las propiedades de alquiler y los seguros pueden durar décadas, y dado que la inflación fluctúa, se mantendrán estables durante toda su vida útil.",
    icon: "contract" as const,
  },
];

const benefitsRight = [
  {
    title: "Nunca Perder Dinero",
    body: "Ahorrar dinero en pesos acabará por perder valor con el tiempo, y mantener los ahorros y depósitos indexados a la UF significa preservarlos.",
    icon: "savings" as const,
  },
  {
    title: "Mantiene Estable El Sistema Financiero De Chile",
    body: "La UF es una unidad a prueba de inflación y de tipo fijo. Esta es una de las razones por las que el sistema hipotecario en Chile está tan desarrollado.",
    icon: "stability" as const,
  },
];

export function UfBenefits() {
  return (
    <section id="beneficios-uf" className="section-benefits relative overflow-hidden pb-12 pt-10 sm:pb-14 sm:pt-12">
      <div aria-hidden className="section-benefits-glow" />

      <div className="relative mx-auto w-full max-w-content px-4 sm:px-6 lg:px-8">
        <div className="benefits-showcase-panel">
          <SectionReveal className="benefits-showcase-header">
            <p className="benefits-showcase-eyebrow">Beneficios</p>
            <h2 className="benefits-showcase-title">¿Cuáles Son Los Beneficios De La Calculadora UF?</h2>
            <p className="benefits-showcase-intro">
              Nuestra calculadora está diseñada para brindarle resultados fluidos, precisos y rápidos. No se trata solo
              de un número que necesita ser calculado; esta es la razón por la que los asuntos de UF en Chile importan.
            </p>
          </SectionReveal>

          <div className="benefits-showcase-grid">
            <div className="benefits-showcase-col benefits-showcase-col--left">
              {benefitsLeft.map((item, index) => (
                <SectionReveal key={item.title} delay={index * 0.08}>
                  <BenefitBlock {...item} align="left" />
                </SectionReveal>
              ))}
            </div>

            <SectionReveal delay={0.12} className="benefits-showcase-center">
              <BenefitsCenterVisual />
            </SectionReveal>

            <div className="benefits-showcase-col benefits-showcase-col--right">
              {benefitsRight.map((item, index) => (
                <SectionReveal key={item.title} delay={0.16 + index * 0.08}>
                  <BenefitBlock {...item} align="right" />
                </SectionReveal>
              ))}
            </div>
          </div>

          <SectionReveal delay={0.28} className="benefits-showcase-cta-wrap">
            <button
              type="button"
              onClick={() => scrollToPageSection("tool")}
              className="benefits-showcase-cta"
            >
              Calcular UF ahora
              <span className="benefits-showcase-cta-icon" aria-hidden>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M7 17L17 7M17 7H9M17 7v8"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </button>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
