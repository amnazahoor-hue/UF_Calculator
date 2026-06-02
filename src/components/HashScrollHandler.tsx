"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { scrollToPageSection } from "@/lib/calculatorNav";

const HASH_SECTIONS = new Set(["tool", "how-it-works", "faq", "live-rate", "contact"]);

export function HashScrollHandler() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/") return;

    const hash = window.location.hash.replace("#", "");
    if (!hash || !HASH_SECTIONS.has(hash)) return;

    const timer = window.setTimeout(() => {
      scrollToPageSection(hash);
    }, 120);

    return () => window.clearTimeout(timer);
  }, [pathname]);

  return null;
}
