"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { UfRatesResponse } from "@/lib/ufRate";

type UfRateContextValue = {
  rate: number | null;
  date: string | null;
  loading: boolean;
  fallback: boolean;
};

const UfRateContext = createContext<UfRateContextValue>({
  rate: null,
  date: null,
  loading: true,
  fallback: false,
});

export function UfRateProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<UfRatesResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    fetch("/api/uf")
      .then((response) => response.json())
      .then((payload: UfRatesResponse) => {
        if (!cancelled) {
          setData(payload);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const value = useMemo<UfRateContextValue>(
    () => ({
      rate: data?.rate ?? null,
      date: data?.date ?? null,
      loading,
      fallback: Boolean(data?.fallback),
    }),
    [data, loading],
  );

  return <UfRateContext.Provider value={value}>{children}</UfRateContext.Provider>;
}

export function useUfRate() {
  return useContext(UfRateContext);
}
