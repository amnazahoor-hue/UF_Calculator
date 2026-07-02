"use client";

import type { ComponentType, ReactNode } from "react";
import { useEffect, useState } from "react";
import type { UfRatesResponse } from "@/lib/ufRate";
import { useDeferClient } from "@/lib/useDeferClient";

const HERO_DEFER_SELECTOR =
  "#home .hero-tablist, #home .hero-calculator-slot, #tool, a[href='#tool']";

export function HeroDeferredSlots({
  tabsShell,
  calculatorShell,
  initialUfData,
}: {
  tabsShell: ReactNode;
  calculatorShell: ReactNode;
  initialUfData?: UfRatesResponse | null;
}) {
  const ready = useDeferClient({
    idleTimeout: 4000,
    interactionSelector: HERO_DEFER_SELECTOR,
  });
  const [HeroTabs, setHeroTabs] = useState<ComponentType | null>(null);
  const [HeroInteractive, setHeroInteractive] = useState<ComponentType<{ initialUfData?: UfRatesResponse | null }> | null>(
    null,
  );

  useEffect(() => {
    if (!ready || (HeroTabs && HeroInteractive)) return;

    void Promise.all([import("./HeroTabs"), import("./HeroInteractive")]).then(([tabsMod, interactiveMod]) => {
      setHeroTabs(() => tabsMod.HeroTabs);
      setHeroInteractive(() => interactiveMod.HeroInteractive);
    });
  }, [ready, HeroTabs, HeroInteractive]);

  return (
    <>
      {HeroTabs ? <HeroTabs /> : tabsShell}

      <div className="hero-calculator-slot relative mx-auto mt-8 w-full max-w-content-narrow pb-2 sm:mt-10 sm:pb-6">
        {HeroInteractive ? <HeroInteractive initialUfData={initialUfData} /> : calculatorShell}
      </div>
    </>
  );
}

export function BelowFoldSlot({
  children,
  initialUfData,
}: {
  children: ReactNode;
  initialUfData?: UfRatesResponse | null;
}) {
  const ready = useDeferClient({
    idleTimeout: 5000,
    rootMargin: "480px 0px",
  });
  const [Fold, setFold] = useState<ComponentType<{ initialUfData?: UfRatesResponse | null }> | null>(null);

  useEffect(() => {
    if (!ready || Fold) return;
    void import("./BelowFold").then((module) => {
      setFold(() => module.BelowFold);
    });
  }, [ready, Fold]);

  return (
    <div className="below-fold-shell" data-defer-root>
      {Fold ? <Fold initialUfData={initialUfData} /> : children}
    </div>
  );
}
