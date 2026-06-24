"use client";

import { Logo } from "@/components/Logo";
import { scrollToPageSection } from "@/lib/calculatorNav";
import { siteName } from "@/lib/site";

export function FooterBrand() {
  return (
    <a
      href="#home"
      aria-label={`${siteName} — inicio`}
      onClick={(e) => {
        e.preventDefault();
        scrollToPageSection("home");
      }}
      className="footer-brand-link"
    >
      <Logo footer />
    </a>
  );
}
