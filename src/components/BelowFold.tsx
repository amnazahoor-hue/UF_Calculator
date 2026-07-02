"use client";

import type { UfRatesResponse } from "@/lib/ufRate";
import { HomeSections } from "@/components/HomeSections";
import { UfRateProvider } from "@/components/UfRateProvider";

export function BelowFold({ initialUfData }: { initialUfData?: UfRatesResponse | null }) {
  return (
    <UfRateProvider initialData={initialUfData ?? undefined}>
      <HomeSections />
    </UfRateProvider>
  );
}
