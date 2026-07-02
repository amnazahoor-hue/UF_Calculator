"use client";

import type { ReactNode } from "react";
import { UfRateProvider } from "@/components/UfRateProvider";
import type { UfRatesResponse } from "@/lib/ufRate";

export function HomePageClient({
  children,
  initialUfData,
}: {
  children: ReactNode;
  initialUfData?: UfRatesResponse | null;
}) {
  return <UfRateProvider initialData={initialUfData ?? undefined}>{children}</UfRateProvider>;
}
