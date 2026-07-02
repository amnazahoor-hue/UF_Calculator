"use client";

import { useEffect, useState } from "react";
import { CALCULATOR_NAV_EVENT, navigateFromHeroTab } from "@/lib/calculatorNav";

const previewTabs = [
  { id: "UF_TO_CLP", label: "UF → CLP" },
  { id: "CLP_TO_UF", label: "CLP → UF" },
  { id: "RATE", label: "Valor UF hoy" },
  { id: "FREE", label: "Free Tool" },
] as const;

type TabId = (typeof previewTabs)[number]["id"];

export function HeroTabs() {
  const [activeTab, setActiveTab] = useState<TabId>("UF_TO_CLP");

  const handleTabClick = (tabId: TabId) => {
    if (tabId === "RATE") {
      navigateFromHeroTab(tabId);
      return;
    }

    setActiveTab(tabId === "CLP_TO_UF" ? "CLP_TO_UF" : "UF_TO_CLP");
    navigateFromHeroTab(tabId);
  };

  useEffect(() => {
    const onNav = (event: Event) => {
      const target = (event as CustomEvent<{ target: TabId }>).detail?.target;
      if (target === "UF_TO_CLP" || target === "CLP_TO_UF") {
        setActiveTab(target);
      }
    };
    window.addEventListener(CALCULATOR_NAV_EVENT, onNav);
    return () => window.removeEventListener(CALCULATOR_NAV_EVENT, onNav);
  }, []);

  return (
    <div className="relative mt-7 sm:mt-8">
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
                <span className="absolute inset-0 rounded-full bg-[color-mix(in_oklab,var(--surface)_92%,var(--bg-warm-2))] shadow-[0_4px_14px_color-mix(in_oklab,var(--accent)_16%,transparent)]" />
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
        <span>Datos oficiales vinculados al BCCh</span>
      </div>
    </div>
  );
}
