"use client";

import type { UfRatesResponse } from "@/lib/ufRate";
import { HeroCalculatorLazy } from "@/components/HeroCalculatorLazy";
import { UfRateProvider } from "@/components/UfRateProvider";

export function HeroCalculatorIsland({ initialUfData }: { initialUfData?: UfRatesResponse | null }) {
  return (
    <UfRateProvider initialData={initialUfData ?? undefined}>
      <HeroCalculatorLazy />
    </UfRateProvider>
  );
}
