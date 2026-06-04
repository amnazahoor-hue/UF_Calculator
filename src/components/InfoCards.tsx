"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { SectionEyebrow } from "./SectionEyebrow";
import { SectionReveal } from "./SectionReveal";

const info = [
  {
    title: "What is UF?",
    body: "UF (Unidad de Fomento) is a Chilean inflation-indexed unit used in mortgages, rents, and long-term contracts to preserve purchasing power.",
    icon: "chart",
  },
  {
    title: "Why UF changes daily",
    body: "UF updates each day to reflect CPI-linked adjustments. That means CLP values linked to UF move as inflation data is integrated over time.",
    icon: "calendar",
  },
  {
    title: "Trusted source",
    body: "This converter reads UF from mindicador, which reflects Chile's official indicator publications and keeps conversion references current.",
    icon: "shield",
  },
] as const;

const trustPills = ["BCCh-linked data", "Daily updates", "Free to use"];

function InfoCardIcon({ type }: { type: (typeof info)[number]["icon"] }) {
  if (type === "chart") {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M4 18V6M10 18V10M16 18V14M22 18V4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }
  if (type === "calendar") {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
        <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <path d="M8 3v4M16 3v4M3 10h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 3l8 4v6c0 4.5-3.5 7.8-8 9-4.5-1.2-8-4.5-8-9V7l8-4z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function InfoCards() {
  return (
    <section className="section-info-wrap relative overflow-hidden pb-12 pt-0 sm:pb-14 sm:pt-0">
      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="section-info-panel relative overflow-hidden rounded-[28px] px-5 pb-9 pt-6 sm:px-9 sm:pb-11 sm:pt-7 md:px-11 md:pb-12 md:pt-8">
          <div aria-hidden className="section-info-texture" />
          <div aria-hidden className="section-info-glow" />

          <div className="relative">
            <SectionReveal>
              <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-2xl text-center lg:text-left">
                  <SectionEyebrow>Market context</SectionEyebrow>
                  <h2 className="mt-3 text-[clamp(1.75rem,3.5vw,2.5rem)] font-bold tracking-[-0.02em] text-ink">
                    UF Market Context
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft sm:text-base">
                    Before using any financial calculator, review the{" "}
                    <Link
                      className="font-semibold text-accent underline decoration-accent/40 underline-offset-2 transition hover:decoration-accent"
                      href="/disclaimer"
                    >
                      disclaimer
                    </Link>{" "}
                    and understand how indicator-based values behave in real market conditions.
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

            <div className="relative mt-8 grid gap-4 md:grid-cols-3 md:gap-5">
              {info.map((item, index) => (
                <SectionReveal key={item.title} delay={index * 0.08}>
                  <motion.article
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    className="info-card group h-full"
                  >
                    <span className="info-card-icon">
                      <InfoCardIcon type={item.icon} />
                    </span>
                    <h3 className="mt-4 text-lg font-bold text-ink sm:text-xl">{item.title}</h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-ink-soft">{item.body}</p>
                    <span className="info-card-accent" aria-hidden />
                  </motion.article>
                </SectionReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
