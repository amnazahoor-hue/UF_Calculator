"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState, type MouseEvent } from "react";
import { scrollToPageSection } from "@/lib/calculatorNav";
import { useActiveSection, type NavSectionId } from "@/lib/useActiveSection";
import { Logo } from "./Logo";

const navLinks = [
  { href: "/", label: "Home", sectionId: "home" as const },
  { href: "/#tool", label: "Tool", sectionId: "tool" as const },
  { href: "/#how-it-works", label: "How It Works", sectionId: "how-it-works" as const },
  { href: "/#faq", label: "FAQ", sectionId: "faq" as const },
  { href: "/contact", label: "Contact", sectionId: "contact" as const },
] as const;

type SectionId = NavSectionId;

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [manualActiveId, setManualActiveId] = useState<SectionId | null>(null);
  const [trackedPath, setTrackedPath] = useState(pathname);
  const observedActiveId = useActiveSection(isHome);

  if (pathname !== trackedPath) {
    setTrackedPath(pathname);
    if (manualActiveId !== null) {
      setManualActiveId(null);
    }
  }

  const activeId = manualActiveId ?? (pathname === "/contact" ? "contact" : observedActiveId);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!manualActiveId) return;
    const timer = window.setTimeout(() => setManualActiveId(null), 900);
    return () => window.clearTimeout(timer);
  }, [manualActiveId]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const goToSection = useCallback(
    (sectionId: SectionId, e?: MouseEvent<HTMLElement>) => {
      e?.preventDefault();
      setManualActiveId(sectionId);
      closeMenu();

      if (sectionId === "contact") {
        router.push("/contact");
        return;
      }

      if (!isHome) {
        router.push(sectionId === "home" ? "/" : `/#${sectionId}`);
        return;
      }

      scrollToPageSection(sectionId);
    },
    [closeMenu, isHome, router],
  );

  const renderNavItem = (item: (typeof navLinks)[number], mobile = false) => {
    const isActive = activeId === item.sectionId;
    const linkClass = `header-nav-link relative rounded-full px-3.5 py-2 text-sm transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${
      isActive ? "header-nav-link--active font-semibold text-ink" : "font-medium text-ink-soft hover:text-ink"
    } ${mobile ? "block w-full rounded-xl text-left" : ""}`;

    const activeHighlight = isActive ? (
      <motion.span
        layoutId="header-nav-active"
        className="header-nav-pill absolute inset-0 rounded-full"
        transition={{ type: "spring", stiffness: 400, damping: 34 }}
        aria-hidden
      />
    ) : null;

    const content = (
      <>
        {activeHighlight}
        <span className="relative">{item.label}</span>
      </>
    );

    if (item.sectionId === "contact") {
      return (
        <Link
          key={item.href}
          href={item.href}
          className={linkClass}
          aria-current={isActive ? "page" : undefined}
          onClick={() => {
            setManualActiveId("contact");
            closeMenu();
          }}
        >
          {content}
        </Link>
      );
    }

    if (isHome) {
      return (
        <a
          key={item.href}
          href={item.href}
          className={linkClass}
          aria-current={isActive ? (item.sectionId === "home" ? "page" : "true") : undefined}
          onClick={(e) => goToSection(item.sectionId, e)}
        >
          {content}
        </a>
      );
    }

    return (
      <Link
        key={item.href}
        href={item.href}
        className={linkClass}
        aria-current={isActive ? "page" : undefined}
        onClick={() => {
          setManualActiveId(item.sectionId);
          closeMenu();
        }}
      >
        {content}
      </Link>
    );
  };

  return (
    <header className="header-shell sticky top-0 z-50 w-full py-3 sm:py-4">
      <div aria-hidden className="header-shell-glow" />
      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div
          className={`header-bar flex w-full items-center gap-2 rounded-full border-2 px-3 py-2 transition-all duration-300 sm:gap-3 sm:px-4 sm:py-2.5 lg:px-5 ${
            scrolled ? "header-bar--scrolled" : ""
          }`}
        >
          <Link
            href="/"
            aria-label="UF Calculator home"
            className="flex shrink-0 items-center gap-2.5 rounded-full py-1 pl-1 pr-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            onClick={(e) => {
              if (isHome) {
                e.preventDefault();
                goToSection("home");
              } else {
                setManualActiveId("home");
              }
            }}
          >
            <Logo compact width={118} height={34} />
          </Link>

          <div className="hidden h-6 w-px bg-[color-mix(in_oklab,var(--border)_90%,transparent)] lg:block" aria-hidden />

          <nav
            aria-label="Main navigation"
            className="header-desktop-nav hidden min-w-0 flex-1 items-center justify-center gap-0.5 lg:flex lg:gap-1"
          >
            {navLinks.map((item) => renderNavItem(item))}
          </nav>

          <a
            href={isHome ? "#tool" : "/#tool"}
            onClick={(e) => goToSection("tool", e)}
            className="header-cta ml-auto hidden shrink-0 items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-surface lg:inline-flex"
          >
            Get Started
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>

          <button
            type="button"
            className="header-menu-btn ml-auto inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-ink transition hover:border-accent hover:bg-[color-mix(in_oklab,var(--accent)_8%,var(--surface))] lg:hidden"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-panel"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
              {menuOpen ? (
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>

        <AnimatePresence>
          {menuOpen ? (
            <motion.div
              id="mobile-nav-panel"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
              className="header-mobile-panel absolute left-4 right-4 top-[calc(100%+0.5rem)] z-50 overflow-hidden rounded-3xl border-2 border-[color-mix(in_oklab,var(--border)_85%,var(--accent)_15%)] bg-surface p-4 shadow-[0_24px_56px_color-mix(in_oklab,var(--ink)_22%,transparent)] sm:left-6 sm:right-6 md:left-1/2 md:right-auto md:w-[min(100%,28rem)] md:-translate-x-1/2 lg:hidden"
            >
              <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
                {navLinks.map((item) => renderNavItem(item, true))}
                <a
                  href={isHome ? "#tool" : "/#tool"}
                  onClick={(e) => goToSection("tool", e)}
                  className="header-cta mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-surface"
                >
                  Get Started
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </nav>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </header>
  );
}
