import type { CalcMode } from "./calculatorInput";

export type CalculatorNavTarget = CalcMode | "RATE" | "FREE";

export const CALCULATOR_NAV_EVENT = "uf-calculator:navigate";

export function scrollToPageSection(sectionId: string) {
  if (typeof window === "undefined") return;

  if (sectionId === "home") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

  const el = document.getElementById(sectionId);
  if (!el) return;

  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function emitCalculatorNav(target: CalculatorNavTarget) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(CALCULATOR_NAV_EVENT, { detail: { target } }));
}

function focusCalculatorInput() {
  window.setTimeout(() => {
    const input = document.querySelector<HTMLInputElement>("#tool .calc-amount-input");
    input?.focus({ preventScroll: true });
  }, 450);
}

export function navigateFromHeroTab(tabId: CalculatorNavTarget) {
  if (tabId === "RATE") {
    scrollToPageSection("tool");
    return;
  }

  const mode: CalcMode = tabId === "CLP_TO_UF" ? "CLP_TO_UF" : "UF_TO_CLP";
  emitCalculatorNav(mode);
  scrollToPageSection("tool");
  focusCalculatorInput();
}
