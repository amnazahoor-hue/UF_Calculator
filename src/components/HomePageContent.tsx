"use client";

import dynamic from "next/dynamic";
import { Hero } from "@/components/Hero";
import { StatsStrip } from "@/components/StatsStrip";
import { UfRateProvider } from "@/components/UfRateProvider";

const CalculatorFeatures = dynamic(() =>
  import("@/components/CalculatorFeatures").then((m) => ({ default: m.CalculatorFeatures })),
);
const HowItWorks = dynamic(() => import("@/components/HowItWorks").then((m) => ({ default: m.HowItWorks })));
const InfoCards = dynamic(() => import("@/components/InfoCards").then((m) => ({ default: m.InfoCards })));
const UfUseCases = dynamic(() => import("@/components/UfUseCases").then((m) => ({ default: m.UfUseCases })));
const WhyUfChanges = dynamic(() => import("@/components/WhyUfChanges").then((m) => ({ default: m.WhyUfChanges })));
const UfBenefits = dynamic(() => import("@/components/UfBenefits").then((m) => ({ default: m.UfBenefits })));
const Faq = dynamic(() => import("@/components/Faq").then((m) => ({ default: m.Faq })));

export function HomePageContent() {
  return (
    <UfRateProvider>
      <main className="flex-1">
        <Hero />
        <StatsStrip />
        <InfoCards />
        <CalculatorFeatures />
        <HowItWorks />
        <UfUseCases />
        <WhyUfChanges />
        <UfBenefits />
        <Faq />
      </main>
    </UfRateProvider>
  );
}
