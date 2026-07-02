"use client";

import type { UfRatesResponse } from "@/lib/ufRate";
import { HomeSections } from "@/components/HomeSections";
import { UfRateProvider } from "@/components/UfRateProvider";

export function BelowFold({ initialUfData }: { initialUfData?: UfRatesResponse | null }) {
  return (
    <div className="below-fold-shell">
      <UfRateProvider initialData={initialUfData ?? undefined}>
        <HomeSections />
      </UfRateProvider>
    </div>
  );
}
