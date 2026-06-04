"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { faqItems } from "./faqData";
import { SectionEyebrow } from "./SectionEyebrow";
import { SectionReveal } from "./SectionReveal";

const faqImages = [
  {
    src: "https://images.unsplash.com/photo-1687529699742-a7e97c518dca?w=480&auto=format&fit=crop&q=55",
    alt: "Questions and answers concept",
    className: "faq-img faq-img--primary",
  },
  {
    src: "https://media.istockphoto.com/id/2198836359/photo/i-want-to-ask-a-question.webp?a=1&b=1&s=612x612&w=0&k=20&c=OFp426FNlvb42ZuLSJCSZQ6EchcT_nyeGue7LCmCF7s=",
    alt: "Person raising hand to ask a question in a meeting",
    className: "faq-img faq-img--secondary",
  },
] as const;

const accordionEase = [0.22, 1, 0.36, 1] as const;

export function Faq() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="faq" className="section-faq relative overflow-hidden pb-10 pt-8 sm:pb-12 sm:pt-10 lg:pb-14 lg:pt-11">
      <div aria-hidden className="faq-bg-glow" />

      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="faq-layout">
          <div className="faq-visual">
            <div className="faq-visual-sticky">
              <SectionReveal className="faq-visual-intro">
                <SectionEyebrow>FAQ</SectionEyebrow>
                <h2 className="mt-4 text-[clamp(2rem,4vw,2.75rem)] font-bold leading-tight tracking-[-0.02em] text-ink">
                  Questions? We&apos;ve got answers.
                </h2>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-soft sm:text-base">
                  Everything you need to know about UF, CLP, live rates, and using this calculator with confidence.
                </p>
              </SectionReveal>

              <SectionReveal delay={0.08} className="mt-8 flex flex-1 flex-col">
                <div className="faq-images">
                  {faqImages.map((img, index) => (
                    <motion.div
                      key={img.src}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1, ease: accordionEase }}
                      className={`${img.className} faq-img-frame`}
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        width={480}
                        height={480}
                        sizes="(max-width: 1024px) 90vw, 320px"
                        quality={70}
                        loading="lazy"
                        className="faq-img-photo"
                      />
                      <div className="faq-img-overlay" aria-hidden />
                    </motion.div>
                  ))}
                </div>
                <p className="faq-visual-hint mt-4 shrink-0 text-xs text-ink-soft">
                  <span className="lg:hidden">Tap a question below to expand the answer.</span>
                  <span className="hidden lg:inline">Tap a question on the right to expand the answer.</span>
                </p>
              </SectionReveal>
            </div>
          </div>

          <div className="faq-accordion">
            <motion.div
              layout
              className="faq-accordion-panel"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, ease: accordionEase }}
            >
              {faqItems.map((item, index) => {
                const open = active === index;
                return (
                  <motion.article
                    key={item.q}
                    layout
                    transition={{ layout: { duration: 0.35, ease: accordionEase } }}
                    className={`faq-item ${open ? "faq-item--open" : ""}`}
                  >
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
                  </motion.article>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
