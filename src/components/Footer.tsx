"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FooterSocialGlyph, type SocialIconId } from "./FooterSocialIcons";
import { Logo } from "./Logo";
import { SectionReveal } from "./SectionReveal";

const productLinks = [
  { href: "/#tool", label: "UF ↔ CLP Tool", sectionId: "tool" as const },
  { href: "/#how-it-works", label: "How It Works", sectionId: "how-it-works" as const },
  { href: "/#faq", label: "FAQ", sectionId: "faq" as const },
  { href: "/contact", label: "Contact", sectionId: null },
];

const legalLinks = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-and-conditions", label: "Terms & Conditions" },
  { href: "/disclaimer", label: "Disclaimer" },
];

const trustPills = [
  { label: "Official BCCh-linked rate" },
  { label: "100% free" },
  { label: "No signup required" },
];

/** Replace # with your profile URLs before publishing */
const footerSocialLinks: { id: SocialIconId; label: string; href: string }[] = [
  { id: "linkedin", label: "LinkedIn", href: "#" },
  { id: "youtube", label: "YouTube", href: "#" },
  { id: "facebook", label: "Facebook", href: "#" },
  { id: "instagram", label: "Instagram", href: "#" },
];

function scrollToTool(e: { preventDefault: () => void }) {
  e.preventDefault();
  document.getElementById("tool")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Footer() {
  return (
    <footer id="contact" className="section-footer footer-premium relative text-surface">
      <div className="footer-top-glow" aria-hidden />

      <div className="relative mx-auto w-full max-w-6xl px-4 pt-6 sm:px-6 sm:pt-8 lg:px-8">
        <SectionReveal>
          <motion.div
            className="footer-cta-bar"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-accent">Ready to convert?</p>
              <p className="mt-2 text-lg font-bold text-surface sm:text-xl">Live UF ↔ CLP in seconds</p>
            </div>
            <motion.a
              href="#tool"
              onClick={scrollToTool}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex shrink-0 items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-surface shadow-[0_8px_24px_color-mix(in_oklab,var(--accent)_35%,transparent)] transition hover:bg-[color-mix(in_oklab,var(--accent)_88%,var(--ink))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-2 focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
            >
              Open Calculator
            </motion.a>
          </motion.div>
        </SectionReveal>

        <div className="mt-8 flex flex-wrap gap-2 sm:mt-9">
          {trustPills.map((pill) => (
            <span
              key={pill.label}
              className="inline-flex items-center gap-1.5 rounded-full border border-[color-mix(in_oklab,var(--surface)_12%,transparent)] bg-[color-mix(in_oklab,var(--surface)_6%,transparent)] px-3 py-1.5 text-xs text-[color-mix(in_oklab,var(--surface)_80%,transparent)]"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
              {pill.label}
            </span>
          ))}
        </div>

        <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:mt-11 lg:grid-cols-12 lg:gap-8">
          <SectionReveal className="lg:col-span-5">
            <Logo variant="light" width={168} height={48} />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-[color-mix(in_oklab,var(--surface)_78%,transparent)]">
              UF Calculator Chile delivers real-time UF and CLP conversions with reliable public indicator data and a
              premium, mobile-first experience built for everyday financial decisions.
            </p>
            <p className="mt-4 text-sm text-[color-mix(in_oklab,var(--surface)_55%,transparent)]">
              Data sourced from Chile&apos;s public indicators via mindicador.
            </p>
          </SectionReveal>

          <SectionReveal delay={0.06} className="lg:col-span-2">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[color-mix(in_oklab,var(--surface)_90%,transparent)]">
              Product
            </h3>
            <nav className="mt-4 space-y-2.5">
              {productLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-sm text-[color-mix(in_oklab,var(--surface)_72%,transparent)] transition-colors hover:text-accent"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </SectionReveal>

          <SectionReveal delay={0.1} className="lg:col-span-2">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[color-mix(in_oklab,var(--surface)_90%,transparent)]">
              Legal
            </h3>
            <nav className="mt-4 space-y-2.5">
              {legalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-sm text-[color-mix(in_oklab,var(--surface)_72%,transparent)] transition-colors hover:text-accent"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </SectionReveal>

          <SectionReveal delay={0.14} className="lg:col-span-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[color-mix(in_oklab,var(--surface)_90%,transparent)]">
              Connect
            </h3>
            <p className="mt-4 text-sm text-[color-mix(in_oklab,var(--surface)_65%,transparent)]">
              Questions or feedback? Reach us through the contact page.
            </p>
            <Link
              href="/contact"
              className="mt-3 inline-flex text-sm font-medium text-accent transition hover:text-accent-2"
            >
              Get in touch →
            </Link>

            <p className="footer-social-heading">Follow us</p>
            <ul className="footer-social" role="list">
              {footerSocialLinks.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Follow us on ${item.label}`}
                    className="footer-social-link"
                  >
                    <FooterSocialGlyph id={item.id} className="footer-social-glyph" />
                  </a>
                </li>
              ))}
            </ul>
          </SectionReveal>
        </div>
      </div>

      <div className="footer-bottom-bar relative mt-10 border-t border-[color-mix(in_oklab,var(--surface)_10%,transparent)]">
        <div className="mx-auto flex w-full max-w-6xl justify-center px-4 py-6 sm:px-6 lg:px-8">
          <p className="text-center text-xs text-[color-mix(in_oklab,var(--surface)_50%,transparent)]" suppressHydrationWarning>
            &copy; {new Date().getFullYear()} UF Calculator Chile. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
