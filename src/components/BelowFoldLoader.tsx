"use client";

import dynamic from "next/dynamic";
import type { UfRatesResponse } from "@/lib/ufRate";

const BelowFold = dynamic(() => import("@/components/BelowFold").then((m) => ({ default: m.BelowFold })), {
  ssr: false,
});

export function BelowFoldLoader({ initialUfData }: { initialUfData?: UfRatesResponse | null }) {
  return <BelowFold initialUfData={initialUfData} />;
}
