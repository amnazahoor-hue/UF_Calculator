"use client";

import { useEffect, useState } from "react";

export type NavSectionId = "home" | "tool" | "how-it-works" | "faq" | "contact";

const SECTION_ORDER: NavSectionId[] = ["home", "tool", "how-it-works", "faq", "contact"];

export function useActiveSection(enabled: boolean) {
  const [activeId, setActiveId] = useState<NavSectionId>("home");

  useEffect(() => {
    if (!enabled) return;

    const elements = SECTION_ORDER.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => Boolean(el),
    );

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (window.scrollY < 72) {
          setActiveId("home");
          return;
        }

        const visible = entries.filter((entry) => entry.isIntersecting && entry.intersectionRatio > 0);
        if (!visible.length) return;

        const best = visible.reduce((winner, entry) =>
          entry.intersectionRatio > winner.intersectionRatio ? entry : winner,
        );

        const id = best.target.id as NavSectionId;
        if (SECTION_ORDER.includes(id)) {
          setActiveId(id);
        }
      },
      {
        root: null,
        rootMargin: "-18% 0px -52% 0px",
        threshold: [0, 0.12, 0.25, 0.4, 0.55, 0.7],
      },
    );

    elements.forEach((el) => observer.observe(el));

    const onScrollTop = () => {
      if (window.scrollY < 72) setActiveId("home");
    };

    window.addEventListener("scroll", onScrollTop, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScrollTop);
    };
  }, [enabled]);

  return activeId;
}
