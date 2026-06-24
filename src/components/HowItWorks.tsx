"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { siteImages } from "@/lib/images";
import { scrollToPageSection } from "@/lib/calculatorNav";
import { SectionEyebrow } from "./SectionEyebrow";
import { SectionReveal } from "./SectionReveal";

function HowStepArrow() {
  return (
    <div className="how-step-arrow" aria-hidden>
      <svg viewBox="0 0 24 24" fill="none">
        <path
          d="M12 5v14M7 11l5 5 5-5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

const steps = [
  {
    num: "01",
    mobileNum: "1",
    title: "Paso 1: Valor Diario De UF",
    description:
      "Compruebe el valor actual que se muestra en la parte superior de la página. El valor de la unidad de fomento en Chile cambiará cada día, así que primero hay que verlo.",
    markerClass: "how-step-marker--center",
  },
  {
    num: "02",
    mobileNum: "2",
    title: "Paso 2: Elige Tu Dirección",
    description:
      "Luego, elige tu dirección, ya sea que estés convirtiendo UF a pesos o pesos a UF.",
    markerClass: "how-step-marker--center",
  },
  {
    num: "03",
    mobileNum: "3",
    title: "Paso 3: Nuestra Calculadora Realizará El Cálculo",
    description:
      "Para calcular el valor UF a pesos, nuestra herramienta simplemente multiplicará la cantidad de UF por el valor de la UF. En caso de que desee convertir pesos a UF, simplemente divide la cantidad en pesos por el valor de la UF.",
    markerClass: "how-step-marker--center",
  },
  {
    num: "04",
    mobileNum: "4",
    title: "Paso 4: Comprobar La Fecha",
    description:
      "Al realizar el cálculo, asegúrese de haber seleccionado la fecha correcta y luego multiplíquela por el valor UF correspondiente a la fecha a la que se aplica el pago.",
    markerClass: "how-step-marker--center",
  },
] as const;

const collageImages = [
  {
    src: siteImages.howItWorks.softwareDeveloper,
    alt: "Persona consultando el valor diario de la UF en pantalla",
    objectPosition: "center 20%",
  },
  {
    src: siteImages.howItWorks.teamStrategy,
    alt: "Profesionales eligiendo la dirección de conversión UF o pesos",
    objectPosition: "center center",
  },
  {
    src: siteImages.howItWorks.financialCalculation,
    alt: "Cálculo financiero con calculadora y documentos",
    objectPosition: "center center",
  },
  {
    src: siteImages.howItWorks.contractReview,
    alt: "Revisión de contratos y fechas de pago en UF",
    objectPosition: "center 25%",
  },
] as const;

export function HowItWorks() {
  return (
    <section id="how-it-works" className="section-how relative overflow-hidden pb-10 pt-10 sm:pb-12 sm:pt-12 lg:pb-14 lg:pt-14">
      <div className="relative mx-auto w-full max-w-content px-4 sm:px-6 lg:px-8">
        <div className="how-layout">
          <div className="how-left flex h-full flex-col">
            <SectionReveal>
              <SectionEyebrow>Cómo funciona</SectionEyebrow>
              <h2 className="mt-4 max-w-md text-[clamp(2rem,4vw,2.75rem)] font-bold leading-tight tracking-[-0.02em] text-ink">
                ¿Cómo Funciona el Cálculo UF?
              </h2>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-soft sm:text-base">
                Nuestro convertidor UF no lleva mucho tiempo en la conversión de UF a pesos; puede convertir fácilmente
                de pesos chilenos a UF. Así es como funciona:
              </p>
              <a
                href="#tool"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToPageSection("tool");
                }}
                className="header-cta mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              >
                Calcula UF Ahora
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

            <SectionReveal delay={0.1} className="how-left-images mt-8 flex min-h-0 flex-1 flex-col sm:mt-10">
              <div className="how-images-collage how-images-collage--four h-full min-h-0 flex-1">
                {collageImages.map((img, index) => (
                  <motion.div
                    key={img.src}
                    className="how-img-frame how-img-frame--grid"
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ y: -3 }}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      width={612}
                      height={408}
                      sizes="(max-width: 1024px) 45vw, 260px"
                      quality={88}
                      loading="lazy"
                      className="how-img-photo"
                      style={{ objectPosition: img.objectPosition }}
                    />
                  </motion.div>
                ))}
              </div>
            </SectionReveal>
          </div>

          <div className="how-timeline-panel h-full">
            <div className="how-timeline-inner">
              <div className="how-steps-stack">
                {steps.map((step, index) => (
                  <Fragment key={step.num}>
                    <SectionReveal delay={index * 0.1} className="how-step-reveal">
                      <motion.article
                        className="how-step-row how-step-row--hover"
                        whileHover={{ y: -2 }}
                        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <div className={`how-step-marker ${step.markerClass}`}>
                          <span className="how-step-num">
                            <span className="sm:hidden">{step.mobileNum}</span>
                            <span className="hidden sm:inline">{step.num}</span>
                          </span>
                        </div>
                        <div className="how-step-copy">
                          <h3 className="text-xl font-bold text-ink sm:text-2xl">{step.title}</h3>
                          <p className="mt-2 text-sm leading-relaxed text-ink-soft sm:text-base">{step.description}</p>
                        </div>
                      </motion.article>
                    </SectionReveal>
                    {index < steps.length - 1 ? <HowStepArrow /> : null}
                  </Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
