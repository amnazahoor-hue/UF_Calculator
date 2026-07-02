"use client";

import type { UfRatesResponse } from "@/lib/ufRate";
import { HeroCalculatorIsland } from "@/components/HeroCalculatorIsland";

export function HeroInteractive({ initialUfData }: { initialUfData?: UfRatesResponse | null }) {
  return <HeroCalculatorIsland initialUfData={initialUfData} />;
}
