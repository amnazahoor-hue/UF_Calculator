"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { SectionEyebrow } from "./SectionEyebrow";
import { SectionReveal } from "./SectionReveal";
import { SectionWave } from "./SectionWave";

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
    title: "Enter UF or CLP",
    description: "Type an amount in either direction and switch conversion modes whenever you need.",
    markerClass: "how-step-marker--1",
  },
  {
    num: "02",
    mobileNum: "2",
    title: "Official rate loads",
    description: "We fetch the latest public UF value through our server route — linked to Chile's indicator data.",
    markerClass: "how-step-marker--2",
  },
  {
    num: "03",
    mobileNum: "3",
    title: "See results instantly",
    description: "Tap Calculate to get a clear, stable CLP or UF output you can share instantly.",
    markerClass: "how-step-marker--3",
  },
] as const;

const collageImages = [
  {
    src: "https://media.istockphoto.com/id/1435220822/photo/african-american-software-developer.webp?a=1&b=1&s=612x612&w=0&k=20&c=XETUT5mBrRDzRjXu_D86Q6AVXiqeDI4qTQxgGL_uN8U=",
    alt: "Developer using a financial calculator on desktop",
    className: "how-img how-img--main",
    objectPosition: "center 22%",
  },
  {
    src: "https://media.istockphoto.com/id/2216469287/photo/female-employee-explaining-strategies-to-manager.webp?a=1&b=1&s=612x612&w=0&k=20&c=NyoHgf-jiSyZL6IpPX8Sm19eBKHc3lvJkBYXlK9B_JQ=",
    alt: "Colleagues reviewing financial data together",
    className: "how-img how-img--secondary",
    objectPosition: "center 35%",
  },
] as const;

export function HowItWorks() {
  return (
    <section id="how-it-works" className="section-how relative overflow-hidden pb-4 pt-10 sm:pb-6 sm:pt-12 lg:pb-8 lg:pt-14">
      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="how-layout">
          <div className="how-left h-full">
            <SectionReveal>
              <SectionEyebrow>How it works</SectionEyebrow>
              <h2 className="mt-4 max-w-md text-[clamp(2rem,4vw,2.75rem)] font-bold leading-tight tracking-[-0.02em] text-ink">
                Get started in minutes
              </h2>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-soft sm:text-base">
                A simple three-step flow — no signup, no friction. Just accurate UF ↔ CLP conversions.
              </p>
            </SectionReveal>

            <SectionReveal delay={0.1} className="how-left-images mt-8 flex flex-1 flex-col sm:mt-10">
              <div className="how-images-collage min-h-0 flex-1">
                {collageImages.map((img) => (
                  <motion.div
                    key={img.src}
                    className={`${img.className} how-img-frame`}
                    whileHover={{ y: -4, scale: 1.02 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      width={612}
                      height={612}
                      sizes="(max-width: 1024px) 90vw, 340px"
                      quality={70}
                      loading="lazy"
                      className="how-img-photo"
                      style={{ objectPosition: img.objectPosition }}
                    />
                  </motion.div>
                ))}
                <div className="how-images-accent" aria-hidden />
              </div>
            </SectionReveal>
          </div>

          <div className="how-timeline-panel h-full">
            <div className="how-timeline-inner">
              <div className="how-steps-stack">
                <svg className="how-curve-svg" viewBox="0 0 96 100" preserveAspectRatio="none" aria-hidden>
                  <path
                    d="M 48 6 C 90 50, 90 50, 48 94"
                    fill="none"
                    stroke="color-mix(in oklab, var(--ink) 22%, var(--border))"
                    strokeWidth="1"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>
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

      <SectionWave fill="--bg-warm-2" className="relative z-10 -mb-px" />
    </section>
  );
}
