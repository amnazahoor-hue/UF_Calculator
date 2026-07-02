"use client";

import dynamic from "next/dynamic";
import { LazyOnView } from "@/components/LazyOnView";

const CalculatorFeatures = dynamic(() =>
  import("@/components/CalculatorFeatures").then((m) => ({ default: m.CalculatorFeatures })),
);
const HowItWorks = dynamic(() => import("@/components/HowItWorks").then((m) => ({ default: m.HowItWorks })));
const InfoCards = dynamic(() => import("@/components/InfoCards").then((m) => ({ default: m.InfoCards })));
const UfUseCases = dynamic(() => import("@/components/UfUseCases").then((m) => ({ default: m.UfUseCases })));
const WhyUfChanges = dynamic(() => import("@/components/WhyUfChanges").then((m) => ({ default: m.WhyUfChanges })));
const UfBenefits = dynamic(() => import("@/components/UfBenefits").then((m) => ({ default: m.UfBenefits })));
const Faq = dynamic(() => import("@/components/Faq").then((m) => ({ default: m.Faq })));
const StatsStrip = dynamic(() => import("@/components/StatsStrip").then((m) => ({ default: m.StatsStrip })));

export function HomeSections() {
  return (
    <>
      <LazyOnView minHeight="24rem">
        <StatsStrip />
      </LazyOnView>
      <LazyOnView minHeight="28rem">
        <InfoCards />
      </LazyOnView>
      <LazyOnView minHeight="28rem">
        <CalculatorFeatures />
      </LazyOnView>
      <LazyOnView minHeight="32rem">
        <HowItWorks />
      </LazyOnView>
      <LazyOnView minHeight="28rem">
        <UfUseCases />
      </LazyOnView>
      <LazyOnView minHeight="24rem">
        <WhyUfChanges />
      </LazyOnView>
      <LazyOnView minHeight="28rem">
        <UfBenefits />
      </LazyOnView>
      <LazyOnView minHeight="32rem">
        <Faq />
      </LazyOnView>
    </>
  );
}
