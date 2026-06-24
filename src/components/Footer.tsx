"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { FooterSocialIcon, type SocialIconId } from "./FooterSocialIcons";
import { SectionReveal } from "./SectionReveal";
import { scrollToPageSection } from "@/lib/calculatorNav";
import { footerConnectLinks, footerLegalLinks, footerProductLinks } from "@/lib/navigation";
import { siteName } from "@/lib/site";

const trustPills = [
  { label: "Valor vinculado al BCCh" },
  { label: "100% gratuita" },
  { label: "Sin registro" },
];

const footerSocialLinks: { id: SocialIconId; label: string; href: string }[] = [
  { id: "x", label: "X", href: "#" },
  { id: "reddit", label: "Reddit", href: "#" },
  { id: "quora", label: "Quora", href: "#" },
  { id: "youtube", label: "YouTube", href: "#" },
  { id: "facebook", label: "Facebook", href: "#" },
  { id: "instagram", label: "Instagram", href: "#" },
  { id: "pinterest", label: "Pinterest", href: "#" },
];

function scrollToTool(e: { preventDefault: () => void }) {
  e.preventDefault();
  document.getElementById("tool")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function scrollToHero(e: { preventDefault: () => void }) {
  e.preventDefault();
  scrollToPageSection("home");
}

export function Footer({ brand }: { brand: ReactNode }) {
  return (
    <footer id="contact" className="footer-shell relative py-3 sm:py-4">
      <div aria-hidden className="footer-shell-glow" />
      <div className="relative mx-auto w-full max-w-shell px-3 sm:px-5 lg:px-8 xl:px-10">
        <div className="footer-bar">
          <SectionReveal>
            <motion.div
              className="footer-cta-bar"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-accent">¿Listo para convertir?</p>
                <p className="mt-2 text-lg font-bold text-ink sm:text-xl">UF ↔ CLP en segundos, con valor actualizado</p>
              </div>
              <motion.a
                href="#tool"
                onClick={scrollToTool}
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex shrink-0 items-center justify-center rounded-full bg-ink px-6 py-3 text-sm font-semibold text-surface shadow-[0_8px_24px_color-mix(in_oklab,var(--ink)_20%,transparent)] transition hover:bg-[color-mix(in_oklab,var(--ink)_88%,var(--accent))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              >
                Abrir calculadora
              </motion.a>
            </motion.div>
          </SectionReveal>

          <div className="mt-8 flex flex-wrap gap-2 sm:mt-9">
            {trustPills.map((pill) => (
              <span key={pill.label} className="footer-trust-pill">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
                {pill.label}
              </span>
            ))}
          </div>

          <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:mt-11 lg:grid-cols-12 lg:gap-8">
            <SectionReveal className="lg:col-span-4">
              {brand}
              <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink-soft">
                {siteName} te ayuda a convertir UF y pesos chilenos con datos públicos, una interfaz clara y contenido
                pensado para decisiones financieras cotidianas en Chile.
              </p>
              <p className="mt-4 text-sm text-ink-soft">
                Datos obtenidos de indicadores públicos de Chile vía mindicador.
              </p>
            </SectionReveal>

            <SectionReveal delay={0.06} className="lg:col-span-2">
              <p className="footer-column-title font-bold text-sm uppercase tracking-widest text-ink">Producto</p>
              <nav className="mt-4 space-y-2.5" aria-label="Enlaces del producto">
                {footerProductLinks.map((link) => (
                  <Link key={link.href} href={link.href} className="footer-link">
                    {link.label}
                  </Link>
                ))}
              </nav>
            </SectionReveal>

            <SectionReveal delay={0.1} className="lg:col-span-3">
              <p className="footer-column-title font-bold text-sm uppercase tracking-widest text-ink">Legal e información</p>
              <nav className="mt-4 space-y-2.5" aria-label="Enlaces legales e informativos">
                {footerLegalLinks.map((link) => (
                  <Link key={link.href} href={link.href} className="footer-link">
                    {link.label}
                  </Link>
                ))}
              </nav>
            </SectionReveal>

            <SectionReveal delay={0.14} className="lg:col-span-3">
              <p className="footer-column-title font-bold text-sm uppercase tracking-widest text-ink">Conectar</p>
              <nav className="mt-4 space-y-2.5" aria-label="Enlaces de contacto">
                {footerConnectLinks.map((link) => (
                  <Link key={link.href} href={link.href} className="footer-link">
                    {link.label}
                  </Link>
                ))}
              </nav>
            </SectionReveal>
          </div>

          <SectionReveal delay={0.18} className="footer-social-row">
            <p className="footer-social-heading">Síguenos</p>
            <ul className="footer-social" role="list">
              {footerSocialLinks.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Síguenos en ${item.label}`}
                    className={`footer-social-link footer-social-link--${item.id}`}
                  >
                    <FooterSocialIcon id={item.id} className="footer-social-glyph" />
                  </a>
                </li>
              ))}
            </ul>
          </SectionReveal>

          <div className="footer-bottom-bar mt-10 border-t border-[color-mix(in_oklab,var(--border)_85%,transparent)] pt-6">
            <p className="text-center text-xs text-ink-soft" suppressHydrationWarning>
              <a href="#home" onClick={scrollToHero} className="footer-copyright-link">
                &copy; {new Date().getFullYear()} {siteName}. Todos los derechos reservados.
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
