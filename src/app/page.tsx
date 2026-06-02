import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Hero } from "@/components/Hero";
import { StatsStrip } from "@/components/StatsStrip";
import { faqItems } from "@/components/faqData";
import { defaultDescription } from "@/lib/site";

export const metadata: Metadata = {
  title: "UF Calculator Chile | Official UF to CLP Tool",
  description: defaultDescription,
  alternates: { canonical: "/" },
  openGraph: {
    title: `UF Calculator Chile | Official UF to CLP Tool`,
    description: defaultDescription,
  },
};

const Calculator = dynamic(() => import("@/components/Calculator").then((m) => ({ default: m.Calculator })), {
  loading: () => (
    <section id="tool" className="section-tool px-4 py-16 sm:px-6" aria-busy="true" aria-label="Loading calculator">
      <div className="mx-auto max-w-3xl animate-pulse rounded-3xl border border-border bg-surface p-8">
        <div className="h-6 w-40 rounded-full bg-bg-warm" />
        <div className="mt-6 h-12 w-full rounded-2xl bg-bg-warm" />
        <div className="mt-4 h-10 w-2/3 rounded-2xl bg-bg-warm" />
      </div>
    </section>
  ),
});

const HowItWorks = dynamic(() => import("@/components/HowItWorks").then((m) => ({ default: m.HowItWorks })));
const InfoCards = dynamic(() => import("@/components/InfoCards").then((m) => ({ default: m.InfoCards })));
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
      <Calculator />
      <HowItWorks />
      <InfoCards />
      <Faq />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </main>
  );
}
