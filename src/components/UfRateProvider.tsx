"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { UfRateDay, UfRatesResponse } from "@/lib/ufRate";

type UfRateContextValue = {
  rate: number | null;
  date: string | null;
  history: UfRateDay[];
  loading: boolean;
  fallback: boolean;
};

const UfRateContext = createContext<UfRateContextValue>({
  rate: null,
  date: null,
  history: [],
  loading: true,
  fallback: false,
});

export function UfRateProvider({
  children,
  initialData,
}: {
  children: ReactNode;
  initialData?: UfRatesResponse | null;
}) {
  const [data, setData] = useState<UfRatesResponse | null>(initialData ?? null);
  const [loading, setLoading] = useState(!initialData);

  useEffect(() => {
    if (initialData) {
      return;
    }

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
  }, [initialData]);

  const value = useMemo<UfRateContextValue>(
    () => ({
      rate: data?.rate ?? null,
      date: data?.date ?? null,
      history: data?.history ?? [],
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
