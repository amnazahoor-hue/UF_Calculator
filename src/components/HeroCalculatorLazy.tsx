"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { HeroCalculatorFallback } from "./HeroCalculatorFallback";

const Calculator = dynamic(() => import("./Calculator").then((m) => ({ default: m.Calculator })), {
  ssr: false,
  loading: () => <HeroCalculatorFallback />,
});

export function HeroCalculatorLazy() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(() => setReady(true), { timeout: 2500 });
      return () => window.cancelIdleCallback(id);
    }

    const timeout = window.setTimeout(() => setReady(true), 2500);
    return () => window.clearTimeout(timeout);
  }, []);

  if (!ready) return <HeroCalculatorFallback />;

  return <Calculator variant="hero" />;
}
