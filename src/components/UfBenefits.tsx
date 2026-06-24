"use client";

import { motion } from "framer-motion";
import { SectionEyebrow } from "./SectionEyebrow";
import { SectionReveal } from "./SectionReveal";

const benefits = [
  {
    title: "Proteja El Poder Adquisitivo",
    body: "Dado que la inflación siempre fluctúa, un valor expresado en UF conservará un mayor valor y durante mucho tiempo.",
    icon: "shield",
  },
  {
    title: "Contratos A Largo Plazo Contra La Inflación",
    body: "Las hipotecas, las propiedades de alquiler y los seguros pueden durar décadas, y dado que la inflación fluctúa, se mantendrán estables durante toda su vida útil.",
    icon: "contract",
  },
  {
    title: "Nunca Perder Dinero",
    body: "Ahorrar dinero en pesos acabará por perder valor con el tiempo, y mantener los ahorros y depósitos indexados a la UF significa preservarlos.",
    icon: "savings",
  },
  {
    title: "Mantiene Estable El Sistema Financiero De Chile",
    body: "La UF es una unidad a prueba de inflación y de tipo fijo. Esta es una de las razones por las que el sistema hipotecario en Chile está tan desarrollado.",
    icon: "stability",
  },
] as const;

function BenefitIcon({ type }: { type: (typeof benefits)[number]["icon"] }) {
  if (type === "shield") {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M12 3l8 4v6c0 4.5-3.5 7.8-8 9-4.5-1.2-8-4.5-8-9V7l8-4z" stroke="currentColor" strokeWidth="1.8" />
        <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }
  if (type === "contract") {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M7 4h7l5 5v11H7V4z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M14 4v5h5M10 13h6M10 17h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }
  if (type === "savings") {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M12 3v18M7 8c0-2.8 2.2-5 5-5s5 2.2 5 5-2.2 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M3 21h18M6 21V10l6-4 6 4v11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 21v-5h4v5" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}

export function UfBenefits() {
  return (
    <section id="beneficios-uf" className="section-benefits relative overflow-hidden pb-12 pt-10 sm:pb-14 sm:pt-12">
      <div aria-hidden className="section-benefits-glow" />

      <div className="relative mx-auto w-full max-w-content px-4 sm:px-6 lg:px-8">
        <SectionReveal className="mx-auto max-w-3xl text-center">
          <SectionEyebrow>Beneficios</SectionEyebrow>
          <h2 className="mt-4 text-[clamp(1.75rem,3.5vw,2.5rem)] font-bold tracking-[-0.02em] text-ink">
            ¿Cuáles Son Los Beneficios De La Calculadora UF?
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-ink-soft sm:text-base">
            Nuestra calculadora está diseñada para brindarle resultados fluidos, precisos y rápidos. No se trata solo
            de un número que necesita ser calculado; esta es la razón por la que los asuntos de UF en Chile importan:
          </p>
        </SectionReveal>

        <div className="mt-10 grid gap-4 md:grid-cols-2 md:gap-5">
          {benefits.map((item, index) => (
            <SectionReveal key={item.title} delay={index * 0.07}>
              <motion.article
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="feature-card group h-full"
              >
                <span className="feature-card-icon">
                  <BenefitIcon type={item.icon} />
                </span>
                <h3 className="mt-4 text-lg font-bold leading-snug text-ink">{item.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-soft">{item.body}</p>
                <span className="feature-card-accent" aria-hidden />
              </motion.article>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
