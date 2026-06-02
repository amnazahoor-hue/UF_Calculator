"use client";

import { motion } from "framer-motion";
import { SectionEyebrow } from "./SectionEyebrow";
import { SectionReveal } from "./SectionReveal";
import { SectionWave } from "./SectionWave";

const ease = [0.22, 1, 0.36, 1] as const;

const stats = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M12 3l8 4v6c0 4.5-3.5 7.8-8 9-4.5-1.2-8-4.5-8-9V7l8-4z" stroke="currentColor" strokeWidth="1.8" />
        <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
    label: "Official BCCh rate",
    value: "Verified",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
        <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
    label: "Updated daily",
    value: "24h",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M12 3v18M3 12h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    ),
    label: "100% free",
    value: "$0",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M4 12a8 8 0 0116 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M8 12h8M12 8v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
    label: "No signup",
    value: "Instant",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 28, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease } },
};

export function StatsStrip() {
  return (
    <section className="section-stats relative overflow-hidden" aria-label="Trust statistics">
      <div className="section-stats-glow" aria-hidden />
      <div aria-hidden className="section-stats-orb section-stats-orb--1" />
      <div aria-hidden className="section-stats-orb section-stats-orb--2" />

      <div className="relative mx-auto max-w-[1100px] px-4 py-10 sm:px-6 sm:py-12">
        <SectionReveal className="text-center">
          <SectionEyebrow variant="dark">Why trust this tool</SectionEyebrow>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.08, ease }}
            className="mx-auto mt-4 max-w-lg text-sm text-[color-mix(in_oklab,var(--surface)_75%,transparent)] sm:text-base"
          >
            Built for clarity, speed, and confidence when converting Chile&apos;s most important indexed unit.
          </motion.p>
        </SectionReveal>

        <motion.div
          className="mt-8 grid gap-4 sm:grid-cols-2 sm:mt-10 lg:grid-cols-4"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
        >
          {stats.map((item) => (
            <motion.article
              key={item.label}
              variants={cardVariant}
              whileHover={{ y: -6, scale: 1.02 }}
              className="stats-card group"
            >
              <span className="stats-card-accent" aria-hidden />
              <motion.div
                className="stats-card-icon"
                whileHover={{ rotate: [0, -6, 6, 0] }}
                transition={{ duration: 0.45 }}
              >
                {item.icon}
              </motion.div>
              <p className="stats-card-value">{item.value}</p>
              <p className="stats-card-label">{item.label}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>

      <SectionWave fill="--surface" className="-mb-px" />
    </section>
  );
}
