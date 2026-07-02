"use client";

import dynamic from "next/dynamic";
import type { UfRatesResponse } from "@/lib/ufRate";
import { HeroCalculatorIsland } from "@/components/HeroCalculatorIsland";

const HeroTabs = dynamic(() => import("@/components/HeroTabs").then((m) => ({ default: m.HeroTabs })), {
  ssr: false,
});

export function HeroInteractive({ initialUfData }: { initialUfData?: UfRatesResponse | null }) {
  return (
    <>
      <HeroTabs />

      <div className="relative mx-auto mt-8 w-full max-w-content-narrow pb-2 sm:mt-10 sm:pb-6">
        <HeroCalculatorIsland initialUfData={initialUfData} />
      </div>
    </>
  );
}
