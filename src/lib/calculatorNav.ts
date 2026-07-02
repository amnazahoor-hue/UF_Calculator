import type { CalcMode } from "./calculatorInput";

export type CalculatorNavTarget = CalcMode | "RATE" | "FREE";

export const CALCULATOR_NAV_EVENT = "uf-calculator:navigate";

function getHeaderScrollOffset() {
  if (typeof window === "undefined") return 0;

  const raw = getComputedStyle(document.documentElement).getPropertyValue("--header-offset").trim();
  const headerOffset = Number.parseFloat(raw);
  return (Number.isFinite(headerOffset) ? headerOffset : 72) + 12;
}

export function scrollToPageSection(sectionId: string, behavior: ScrollBehavior = "smooth") {
  if (typeof window === "undefined") return;

  if (sectionId === "home") {
    window.scrollTo({ top: 0, behavior });
    return;
  }

  const el = document.getElementById(sectionId);
  if (!el) return;

  const top = Math.max(0, el.getBoundingClientRect().top + window.scrollY - getHeaderScrollOffset());
  window.scrollTo({ top, behavior });
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
