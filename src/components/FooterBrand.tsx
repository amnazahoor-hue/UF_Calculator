"use client";

import { Logo } from "@/components/Logo";
import { scrollToPageSection } from "@/lib/calculatorNav";
import { siteName } from "@/lib/site";

export function FooterBrand() {
  return (
    <a
      href="#home"
      onClick={(e) => {
        e.preventDefault();
        scrollToPageSection("home");
      }}
      className="footer-brand-link"
    >
      <span className="sr-only">{siteName} — volver al inicio de la calculadora UF</span>
      <Logo footer />
    </a>
  );
}
