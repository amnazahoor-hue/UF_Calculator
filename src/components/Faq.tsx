"use client";

import { motion } from "framer-motion";
import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { buildFaqItems } from "@/lib/faqContent";
import { useUfRate } from "@/components/UfRateProvider";
import { SectionEyebrow } from "./SectionEyebrow";
import { SectionReveal } from "./SectionReveal";
import { SiteImage } from "./SiteImage";
import { imageCatalog } from "@/lib/images";

const faqImages = [
  imageCatalog.faq.mortgagePlanning,
  imageCatalog.faq.bankingFinance,
  imageCatalog.faq.financialMeeting,
  imageCatalog.faq.questionsAnswers,
] as const;

const accordionEase = [0.22, 1, 0.36, 1] as const;

export function Faq() {
  const { rate } = useUfRate();
  const faqItems = useMemo(() => buildFaqItems(rate ?? 40804), [rate]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
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

      // Reserve tallest answer up front so expand/collapse never shifts the footer.
      setPanelMinHeight(Math.ceil(triggersHeight + gaps + maxAnswerHeight + paddingY));
    };

    measurePanel();
    window.addEventListener("resize", measurePanel);
    return () => window.removeEventListener("resize", measurePanel);
  }, [faqItems]);

  return (
    <section id="faq" className="section-faq relative overflow-hidden pb-10 pt-8 sm:pb-12 sm:pt-10 lg:pb-14 lg:pt-11">
      <div aria-hidden className="faq-bg-glow" />

      <div className="faq-section-inner relative mx-auto w-full px-4 sm:px-6 lg:px-8">
        <SectionReveal className="faq-intro">
          <SectionEyebrow>FAQ</SectionEyebrow>
          <h2 className="mt-4 text-[clamp(2rem,4vw,2.75rem)] font-bold leading-tight tracking-[-0.02em] text-ink">
            Preguntas Frecuentes | FAQ
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-ink-soft sm:text-base">
            Respuesta directa: la UF es la unidad reajustable más usada en Chile y su valor en pesos cambia cada día
            hábil según la inflación publicada por el Banco Central.
          </p>
        </SectionReveal>

        <div className="faq-layout">
          <SectionReveal delay={0.06} className="faq-visual">
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
                  <SiteImage
                    image={img}
                    width={960}
                    height={640}
                    sizes="(max-width: 767px) 50vw, (max-width: 1023px) 45vw, 280px"
                    quality={88}
                    loading="lazy"
                    className="faq-img-photo"
                    style={{ objectPosition: "center center" }}
                  />
                </motion.div>
              ))}
            </div>
          </SectionReveal>

          <div className="faq-accordion">
            <div
              ref={panelRef}
              className="faq-accordion-panel"
              style={panelMinHeight ? { minHeight: panelMinHeight } : undefined}
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
                      <h3 className="faq-item-heading m-0">
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
                      </h3>

                      {isOpen ? (
                        <div id={answerId} className="faq-item-answer-wrap">
                          <div className="faq-item-answer">
                            <p className="faq-item-answer-text">{item.a}</p>
                          </div>
                        </div>
                      ) : null}
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
