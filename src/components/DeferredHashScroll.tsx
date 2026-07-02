"use client";

import { useEffect, useState, type ComponentType } from "react";
import { useDeferClient } from "@/lib/useDeferClient";

export function DeferredHashScroll() {
  const ready = useDeferClient({ idleTimeout: 1200 });
  const [Handler, setHandler] = useState<ComponentType | null>(null);

  useEffect(() => {
    if (!ready || Handler) return;
    void import("./HashScrollHandler").then((module) => {
      setHandler(() => module.HashScrollHandler);
    });
  }, [ready, Handler]);

  if (!Handler) {
    return null;
  }

  return <Handler />;
}
