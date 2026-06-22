import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Hero } from "@/components/Hero";
import { StatsStrip } from "@/components/StatsStrip";
import { faqItems } from "@/components/faqData";
const homeTitle = "Calculadora UF Chile | Convierte UF a CLP y CLP a UF";
const homeDescription =
  "Convierta UF a pesos chilenos y pesos a UF con nuestra calculadora UF. Obtenga al instante el valor de UF, actualizaciones diarias y cálculos precisos.";

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
      <HowItWorks />
      <InfoCards />
      <Faq />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </main>
  );
}
