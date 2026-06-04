"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { navigateFromHeroTab, scrollToPageSection } from "@/lib/calculatorNav";
import { Calculator } from "./Calculator";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
};

const previewTabs = [
  { id: "UF_TO_CLP", label: "UF → CLP" },
  { id: "CLP_TO_UF", label: "CLP → UF" },
  { id: "RATE", label: "Live Rate" },
  { id: "FREE", label: "Free Tool" },
] as const;

type TabId = (typeof previewTabs)[number]["id"];

function InlineBrandIcon() {
  return (
    <span
      aria-hidden
      className="relative mx-1.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] bg-gradient-to-br from-accent to-accent-2 align-middle shadow-[0_10px_28px_color-mix(in_oklab,var(--accent)_40%,transparent),inset_0_1px_0_color-mix(in_oklab,var(--surface)_35%,transparent)] sm:mx-2 sm:h-11 sm:w-11"
      style={{ verticalAlign: "middle" }}
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="relative z-10">
        <path
          d="M6 17L11 12L15 15L19 10"
          stroke="var(--surface)"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="19" cy="10" r="2" fill="var(--surface)" />
      </svg>
    </span>
  );
}

function TrustPill() {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-[color-mix(in_oklab,var(--accent)_22%,var(--border))] bg-[color-mix(in_oklab,var(--bg-warm-2)_75%,var(--bg-warm))] px-4 py-2 text-xs font-medium text-ink-soft shadow-[0_4px_16px_color-mix(in_oklab,var(--accent)_12%,transparent)] sm:text-sm">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden className="text-accent">
        <path
          d="M12 3l7 3v6c0 4.4-3 7.5-7 9-4-1.5-7-4.6-7-9V6l7-3z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
      Trusted by thousands in Chile 🇨🇱
    </span>
  );
}

export function Hero() {
  const [activeTab, setActiveTab] = useState<TabId>("UF_TO_CLP");

  const openTool = () => scrollToPageSection("tool");

  const handleTabClick = (tabId: TabId) => {
    setActiveTab(tabId);
    navigateFromHeroTab(tabId);
  };

  return (
    <section id="home" className="overflow-x-hidden bg-bg-warm-2 pb-0 pt-0">
      <div className="hero-panel hero-panel-grid relative w-full rounded-none">
        <div aria-hidden className="hero-panel-glows">
          <span className="hero-panel-glow hero-panel-glow--1" />
          <span className="hero-panel-glow hero-panel-glow--2" />
          <span className="hero-panel-glow hero-panel-glow--3" />
        </div>
        <div aria-hidden className="hero-panel-grid-lines" />
        <div aria-hidden className="hero-headline-glow" />
        <div aria-hidden className="pointer-events-none absolute -right-6 top-16 z-[2] h-36 w-36 rounded-full bg-[color-mix(in_oklab,var(--accent-2)_28%,transparent)] blur-3xl sm:-right-16 sm:h-44 sm:w-44" />
        <div aria-hidden className="pointer-events-none absolute -left-4 bottom-24 z-[2] h-28 w-28 rounded-full bg-[color-mix(in_oklab,var(--accent)_14%,transparent)] blur-3xl sm:-left-12 sm:h-36 sm:w-36" />

        <div className="relative z-10 px-5 py-9 text-center sm:px-10 sm:py-11 md:px-12 md:py-12">
          <motion.div variants={stagger} initial="hidden" animate="show" className="mx-auto max-w-[920px]">
            <motion.div variants={fadeUp}>
              <TrustPill />
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="mx-auto mt-5 max-w-[840px] text-[clamp(2.5rem,5vw,4rem)] font-bold leading-[1.08] tracking-[-0.02em] text-ink sm:mt-6"
            >
              The only UF
              <span className="inline sm:whitespace-nowrap">
                {" "}
                <span aria-hidden className="text-accent">
                  ↔
                </span>{" "}
              </span>
              CLP calculator
              <InlineBrandIcon />
              you&apos;ll ever need
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mx-auto mt-4 max-w-[580px] text-[0.95rem] leading-relaxed text-ink-soft sm:mt-5 sm:text-base"
            >
              Convert Unidad de Fomento and Chilean Pesos in real time using the official BCCh-linked public rate —
              fast, accurate, and completely free.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-6 sm:mt-7">
              <motion.a
                href="#tool"
                onClick={(e) => {
                  e.preventDefault();
                  openTool();
                }}
                whileHover={{ scale: 1.03, boxShadow: "0 24px 56px color-mix(in oklab, var(--ink) 38%, transparent)" }}
                whileTap={{ scale: 0.98 }}
                className="group inline-flex items-center gap-2 rounded-2xl bg-ink px-8 py-3.5 text-base font-semibold text-surface shadow-[0_16px_40px_color-mix(in_oklab,var(--ink)_28%,transparent),0_4px_12px_color-mix(in_oklab,var(--ink)_18%,transparent)] transition-[box-shadow] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-warm-2)]"
              >
                Use calculator
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  <path
                    d="M5 12h14M13 6l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.a>
            </motion.div>

            <motion.div variants={fadeUp} className="relative mt-7 sm:mt-8">
              <div
                role="tablist"
                aria-label="Calculator features"
                className="hero-tablist relative mx-auto w-full max-w-[min(100%,20rem)] rounded-2xl border border-[color-mix(in_oklab,var(--accent)_20%,var(--border))] bg-[color-mix(in_oklab,var(--bg-warm-2)_70%,var(--bg-warm))] p-1.5 shadow-[0_8px_24px_color-mix(in_oklab,var(--accent)_14%,transparent)] sm:max-w-full sm:rounded-full"
              >
                {previewTabs.map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => handleTabClick(tab.id)}
                      className={`hero-tab-btn relative z-10 w-full rounded-full px-3 py-2.5 text-xs font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:w-auto sm:px-5 sm:py-2.5 sm:text-sm ${
                        isActive ? "text-ink" : "text-ink-soft hover:text-ink"
                      }`}
                    >
                      {isActive ? (
                        <motion.span
                          layoutId="hero-tab-highlight"
                          className="absolute inset-0 rounded-full bg-[color-mix(in_oklab,var(--surface)_92%,var(--bg-warm-2))] shadow-[0_4px_14px_color-mix(in_oklab,var(--accent)_16%,transparent)]"
                          transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        />
                      ) : null}
                      <span className="relative">{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-ink-soft sm:text-sm">
                <svg
                  aria-hidden
                  className="h-6 w-9 shrink-0 opacity-70"
                  viewBox="0 0 48 28"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                >
                  <path d="M4 24 C 14 10, 26 20, 42 8" strokeLinecap="round" />
                  <path d="M38 8 L42 8 L42 12" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>Works with official BCCh data</span>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative mx-auto mt-8 w-full max-w-[960px] pb-2 sm:mt-10 sm:pb-6"
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.35 }}
          >
            <Calculator variant="hero" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
