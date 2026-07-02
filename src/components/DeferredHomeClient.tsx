"use client";

import type { ComponentType, ReactNode } from "react";
import { useEffect, useState } from "react";
import type { UfRatesResponse } from "@/lib/ufRate";
import { useDeferClient } from "@/lib/useDeferClient";

export function HeroTabsSlot({ children }: { children: ReactNode }) {
  const ready = useDeferClient({
    idleTimeout: 3500,
    interactionSelector: "#home .hero-tablist, #home .hero-calculator-slot, #tool",
  });
  const [Tabs, setTabs] = useState<ComponentType | null>(null);

  useEffect(() => {
    if (!ready || Tabs) return;
    void import("./HeroTabs").then((module) => {
      setTabs(() => module.HeroTabs);
    });
  }, [ready, Tabs]);

  if (!Tabs) {
    return children;
  }

  return <Tabs />;
}

export function HeroCalculatorSlot({
  children,
  initialUfData,
}: {
  children: ReactNode;
  initialUfData?: UfRatesResponse | null;
}) {
  const ready = useDeferClient({
    idleTimeout: 3500,
    interactionSelector: "#home .hero-tablist, #home .hero-calculator-slot, #tool, a[href='#tool']",
  });
  const [Interactive, setInteractive] = useState<ComponentType<{ initialUfData?: UfRatesResponse | null }> | null>(
    null,
  );

  useEffect(() => {
    if (!ready || Interactive) return;
    void import("./HeroInteractive").then((module) => {
      setInteractive(() => module.HeroInteractive);
    });
  }, [ready, Interactive]);

  if (!Interactive) {
    return children;
  }

  return <Interactive initialUfData={initialUfData} />;
}

export function BelowFoldSlot({
  children,
  initialUfData,
}: {
  children: ReactNode;
  initialUfData?: UfRatesResponse | null;
}) {
  const ready = useDeferClient({
    idleTimeout: 4500,
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
