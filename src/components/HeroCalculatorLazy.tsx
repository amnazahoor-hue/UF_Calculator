"use client";

import dynamic from "next/dynamic";
import { HeroCalculatorFallback } from "./HeroCalculatorFallback";

const Calculator = dynamic(() => import("./Calculator").then((m) => ({ default: m.Calculator })), {
  ssr: false,
  loading: () => <HeroCalculatorFallback />,
});

export function HeroCalculatorLazy() {
  return <Calculator variant="hero" />;
}
