"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
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
    alt: "Planificación financiera y ahorro vinculado a la UF",
    objectPosition: "center center",
  },
  {
    src: siteImages.faq.questionsAnswers,
    alt: "Preguntas y respuestas sobre la calculadora UF",
    objectPosition: "center center",
  },
] as const;

const accordionEase = [0.22, 1, 0.36, 1] as const;

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [panelMinHeight, setPanelMinHeight] = useState<number | undefined>();
  const panelRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const toggleItem = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  useLayoutEffect(() => {
    const measurePanel = () => {
      const panel = panelRef.current;
      const measureLayer = measureRef.current;
      const list = listRef.current;
      if (!panel || !measureLayer || !list) return;

      const triggers = list.querySelectorAll<HTMLElement>(".faq-item-trigger");
      const answers = measureLayer.querySelectorAll<HTMLElement>("[data-faq-measure-answer]");

      let triggersHeight = 0;
      triggers.forEach((trigger) => {
        triggersHeight += trigger.offsetHeight;
      });

      let maxAnswerHeight = 0;
      answers.forEach((answer) => {
        maxAnswerHeight = Math.max(maxAnswerHeight, answer.offsetHeight);
      });

      const listStyles = getComputedStyle(list);
      const rowGap = parseFloat(listStyles.rowGap || listStyles.gap || "0");
      const gaps = rowGap * Math.max(faqItems.length - 1, 0);

      const panelStyles = getComputedStyle(panel);
      const paddingY = parseFloat(panelStyles.paddingTop) + parseFloat(panelStyles.paddingBottom);

      setPanelMinHeight(Math.ceil(triggersHeight + gaps + maxAnswerHeight + paddingY + 6));
    };

    measurePanel();

    const observer = new ResizeObserver(measurePanel);
    if (panelRef.current) observer.observe(panelRef.current);

    window.addEventListener("resize", measurePanel);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measurePanel);
    };
  }, []);

  return (
    <section id="faq" className="section-faq relative overflow-hidden pb-10 pt-8 sm:pb-12 sm:pt-10 lg:pb-14 lg:pt-11">
      <div aria-hidden className="faq-bg-glow" />

      <div className="faq-section-inner relative mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="faq-layout">
          <div className="faq-visual">
            <div className="faq-visual-inner">
              <SectionReveal className="faq-visual-intro shrink-0">
                <SectionEyebrow>FAQ</SectionEyebrow>
                <h2 className="mt-4 text-[clamp(2rem,4vw,2.75rem)] font-bold leading-tight tracking-[-0.02em] text-ink">
                  Preguntas Frecuentes | FAQ
                </h2>
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink-soft sm:text-base">
                  Respuestas claras sobre la UF, su valor en pesos chilenos, conversiones y uso en contratos y finanzas en Chile.
                </p>
              </SectionReveal>

              <SectionReveal delay={0.08} className="faq-visual-media mt-6 sm:mt-8">
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
                        width={960}
                        height={640}
                        sizes="(max-width: 1024px) 50vw, 420px"
                        quality={88}
                        loading={index === 0 ? "eager" : "lazy"}
                        fetchPriority={index === 0 ? "auto" : "low"}
                        className="faq-img-photo"
                        style={{ objectPosition: img.objectPosition }}
                      />
                    </motion.div>
                  ))}
                </div>
              </SectionReveal>
            </div>
          </div>

          <div className="faq-accordion">
            <motion.div
              ref={panelRef}
              className="faq-accordion-panel"
              style={panelMinHeight ? { minHeight: panelMinHeight } : undefined}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, ease: accordionEase }}
            >
              <div ref={measureRef} className="faq-measure-layer" aria-hidden>
                {faqItems.map((item) => (
                  <div key={item.q} className="faq-item-answer faq-item-answer--measure" data-faq-measure-answer>
                    <p className="faq-item-answer-text">{item.a}</p>
                  </div>
                ))}
              </div>

              <div ref={listRef} className="faq-questions-list" role="list">
                {faqItems.map((item, index) => {
                  const isOpen = openIndex === index;
                  const answerId = `faq-answer-${index}`;

                  return (
                    <article
                      key={item.q}
                      role="listitem"
                      className={`faq-item ${isOpen ? "faq-item--open" : ""}`}
                    >
                      <button
                        type="button"
                        className="faq-item-trigger"
                        onClick={() => toggleItem(index)}
                        aria-expanded={isOpen}
                        aria-controls={answerId}
                      >
                        <span className="faq-item-index">{String(index + 1).padStart(2, "0")}</span>
                        <span className="faq-item-question">{item.q}</span>
                        <motion.span
                          className="faq-item-toggle"
                          aria-hidden
                          animate={{ rotate: isOpen ? 45 : 0 }}
                          transition={{ duration: 0.25, ease: accordionEase }}
                        >
                          +
                        </motion.span>
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen ? (
                          <motion.div
                            id={answerId}
                            key="answer"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: accordionEase }}
                            className="faq-item-answer-wrap"
                          >
                            <div className="faq-item-answer">
                              <p className="faq-item-answer-text">{item.a}</p>
                            </div>
                          </motion.div>
                        ) : null}
                      </AnimatePresence>
                    </article>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
