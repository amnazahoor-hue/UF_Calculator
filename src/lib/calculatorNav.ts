import type { CalcMode } from "./calculatorInput";

export type CalculatorNavTarget = CalcMode | "RATE" | "FREE";

export const CALCULATOR_NAV_EVENT = "uf-calculator:navigate";

const HEADER_OFFSET = 108;

export function scrollToPageSection(sectionId: string) {
  if (typeof window === "undefined") return;

  if (sectionId === "home") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

  const el = document.getElementById(sectionId);
  if (!el) return;

  const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
  window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
}

export function emitCalculatorNav(target: CalculatorNavTarget) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(CALCULATOR_NAV_EVENT, { detail: { target } }));
}

export function navigateFromHeroTab(tabId: CalculatorNavTarget) {
  emitCalculatorNav(tabId);

  if (tabId === "RATE") {
    scrollToPageSection("live-rate");
    return;
  }

  scrollToPageSection("tool");
}
