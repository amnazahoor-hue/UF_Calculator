import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Hero } from "@/components/Hero";
import { StatsStrip } from "@/components/StatsStrip";
import { faqItems } from "@/components/faqData";
import { homeDescription, homeTitle } from "@/lib/site";

export const metadata: Metadata = {
  title: homeTitle,
  description: homeDescription,
  alternates: { canonical: "/" },
  openGraph: {
    title: homeTitle,
    description: homeDescription,
  },
  twitter: {
    title: homeTitle,
    description: homeDescription,
  },
};

const CalculatorFeatures = dynamic(() =>
  import("@/components/CalculatorFeatures").then((m) => ({ default: m.CalculatorFeatures })),
);
const HowItWorks = dynamic(() => import("@/components/HowItWorks").then((m) => ({ default: m.HowItWorks })));
const InfoCards = dynamic(() => import("@/components/InfoCards").then((m) => ({ default: m.InfoCards })));
const UfUseCases = dynamic(() => import("@/components/UfUseCases").then((m) => ({ default: m.UfUseCases })));
const WhyUfChanges = dynamic(() => import("@/components/WhyUfChanges").then((m) => ({ default: m.WhyUfChanges })));
const UfBenefits = dynamic(() => import("@/components/UfBenefits").then((m) => ({ default: m.UfBenefits })));
const Faq = dynamic(() => import("@/components/Faq").then((m) => ({ default: m.Faq })));

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export default function Home() {
  return (
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </main>
  );
}
