"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { faqItems } from "./faqData";
import { SectionEyebrow } from "./SectionEyebrow";
import { SectionReveal } from "./SectionReveal";

import { siteImages } from "@/lib/images";

const faqImages = [
  {
    src: siteImages.faq.mortgagePlanning,
    alt: "Planificación hipotecaria y vivienda en UF",
    objectPosition: "center center",
  },
  {
    src: siteImages.faq.bankingFinance,
    alt: "Sector financiero y valor de la UF en Chile",
    objectPosition: "center center",
  },
  {
    src: siteImages.faq.financialMeeting,
    alt: "Reunión financiera para resolver dudas sobre la UF",
    objectPosition: "center center",
  },
  {
    src: siteImages.faq.marketAnalysis,
    alt: "Análisis de mercado y evolución del valor UF",
    objectPosition: "center center",
  },
] as const;

const accordionEase = [0.22, 1, 0.36, 1] as const;

export function Faq() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="faq" className="section-faq relative overflow-hidden pb-10 pt-8 sm:pb-12 sm:pt-10 lg:pb-14 lg:pt-11">
      <div aria-hidden className="faq-bg-glow" />

      <div className="relative mx-auto w-full max-w-content px-4 sm:px-6 lg:px-8">
        <div className="faq-layout">
          <div className="faq-visual">
            <div className="faq-visual-sticky">
              <SectionReveal className="faq-visual-intro">
                <SectionEyebrow>FAQ</SectionEyebrow>
                <h2 className="mt-4 text-[clamp(2rem,4vw,2.75rem)] font-bold leading-tight tracking-[-0.02em] text-ink">
                  Preguntas Frecuentes | FAQ
                </h2>
                <p className="mt-4 max-w-lg text-sm leading-relaxed text-ink-soft sm:text-base">
                  Respuestas claras sobre la UF, su valor en pesos chilenos, conversiones y uso en contratos y finanzas en Chile.
                </p>
              </SectionReveal>

              <SectionReveal delay={0.08} className="faq-visual-media mt-8">
                <div className="faq-images-grid">
                  {faqImages.map((img, index) => (
                    <motion.div
                      key={img.src}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.08, ease: accordionEase }}
                      className="faq-img-frame faq-img-frame--grid"
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        width={612}
                        height={408}
                        sizes="(max-width: 1024px) 45vw, 240px"
                        quality={88}
                        loading={index === 0 ? "eager" : "lazy"}
                        fetchPriority={index === 0 ? "auto" : "low"}
                        className="faq-img-photo"
                        style={{ objectPosition: img.objectPosition }}
                      />
                    </motion.div>
                  ))}
                </div>
                <p className="faq-visual-hint mt-4 shrink-0 text-xs text-ink-soft">
                  <span className="lg:hidden">Toca una pregunta abajo para ver la respuesta.</span>
                  <span className="hidden lg:inline">Toca una pregunta a la derecha para ver la respuesta.</span>
                </p>
              </SectionReveal>
            </div>
          </div>

          <div className="faq-accordion">
            <motion.div
              className="faq-accordion-panel"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, ease: accordionEase }}
            >
              {faqItems.map((item, index) => {
                const open = active === index;
                return (
                  <article key={item.q} className={`faq-item ${open ? "faq-item--open" : ""}`}>
                    <button
                      type="button"
                      className="faq-item-trigger"
                      onClick={() => setActive(open ? null : index)}
                      aria-expanded={open}
                    >
                      <span className="faq-item-index">{String(index + 1).padStart(2, "0")}</span>
                      <span className="faq-item-question">{item.q}</span>
                      <motion.span
                        className="faq-item-toggle"
                        aria-hidden
                        animate={{ rotate: open ? 45 : 0 }}
                        transition={{ duration: 0.25, ease: accordionEase }}
                      >
                        +
                      </motion.span>
                    </button>
                    <AnimatePresence initial={false}>
                      {open ? (
                        <motion.div
                          key="answer"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: accordionEase }}
                          className="overflow-hidden"
                        >
                          <p className="faq-item-answer">{item.a}</p>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </article>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
