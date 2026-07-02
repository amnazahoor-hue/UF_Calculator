"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { scrollToPageSection } from "@/lib/calculatorNav";

const HASH_SECTIONS = new Set(["home", "tool", "how-it-works", "faq", "live-rate"]);

function readHashSection() {
  return window.location.hash.replace(/^#/, "");
}

export function HashScrollHandler() {
  const pathname = usePathname();
  const userScrolledRef = useRef(false);

  useEffect(() => {
    if (pathname !== "/") return;

    userScrolledRef.current = window.scrollY > 8;

    const onUserScroll = () => {
      if (window.scrollY > 8) {
        userScrolledRef.current = true;
      }
    };

    const scrollToHashSection = (hash: string, behavior: ScrollBehavior = "smooth") => {
      if (!hash || !HASH_SECTIONS.has(hash) || userScrolledRef.current) return;
      scrollToPageSection(hash, behavior);
    };

    const onHashChange = () => {
      scrollToHashSection(readHashSection());
    };

    const initialHash = readHashSection();
    const timer = window.setTimeout(() => {
      scrollToHashSection(initialHash);
    }, 120);

    window.addEventListener("scroll", onUserScroll, { passive: true });
    window.addEventListener("hashchange", onHashChange);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onUserScroll);
      window.removeEventListener("hashchange", onHashChange);
    };
  }, [pathname]);

  return null;
}
