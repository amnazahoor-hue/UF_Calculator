"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { useCallback, useEffect, useState } from "react";
import { headerNavLinks } from "@/lib/navigation";
import { scrollToPageSection } from "@/lib/calculatorNav";

function isPageActive(pathname: string, pageId: string) {
  return pathname === `/${pageId}`;
}

export function Header({ brand }: { brand: ReactNode }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const handleCalculateNow = useCallback(
    (e: { preventDefault: () => void }) => {
      e.preventDefault();
      closeMenu();

      if (pathname === "/") {
        scrollToPageSection("tool");
        window.setTimeout(() => {
          document.querySelector<HTMLInputElement>("#tool .calc-amount-input")?.focus({ preventScroll: true });
        }, 450);
        return;
      }

      window.location.href = "/#tool";
    },
    [closeMenu, pathname],
  );

  const renderNavItem = (item: (typeof headerNavLinks)[number], mobile = false) => {
    const isActive = isPageActive(pathname, item.pageId);
    const linkClass = `header-nav-link relative rounded-full px-2.5 py-1.5 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 xl:px-3.5 xl:py-2 xl:text-sm ${
      isActive ? "header-nav-link--active font-semibold text-ink" : "font-medium text-ink-soft"
    } ${mobile ? "block w-full rounded-xl px-3.5 py-2.5 text-left text-sm" : "shrink-0 whitespace-nowrap"}`;

    return (
      <Link
        key={item.href}
        href={item.href}
        className={linkClass}
        aria-current={isActive ? "page" : undefined}
        onClick={() => closeMenu()}
      >
        {isActive ? (
          <span
            className={`header-nav-pill absolute inset-0 ${mobile ? "rounded-xl" : "rounded-full"}`}
            aria-hidden
          />
        ) : null}
        <span className="relative">{item.label}</span>
      </Link>
    );
  };

  return (
    <header className="header-shell w-full py-3 sm:py-4">
      <div aria-hidden className="header-shell-glow" />
      <div className="relative mx-auto w-full max-w-shell px-3 sm:px-5 lg:px-8 xl:px-10">
        <div className="relative">
          <div
            className={`header-bar flex w-full items-center gap-2 rounded-full border-2 px-3 py-2 transition-all duration-300 sm:gap-3 sm:px-4 sm:py-2.5 lg:px-5 ${
              scrolled ? "header-bar--scrolled" : ""
            }`}
          >
            {brand}

            <div className="hidden h-6 w-px shrink-0 bg-[color-mix(in_oklab,var(--border)_90%,transparent)] lg:block" aria-hidden />

            <nav
              aria-label="Navegación principal"
              className="header-desktop-nav ml-auto hidden min-w-0 items-center justify-end gap-1 lg:flex xl:gap-1.5"
            >
              {headerNavLinks.map((item) => renderNavItem(item))}
              <a
                href={pathname === "/" ? "#tool" : "/#tool"}
                onClick={handleCalculateNow}
                className="header-cta header-bar-cta ml-1 inline-flex shrink-0 items-center gap-1.5 rounded-full bg-ink px-3.5 py-2 text-xs font-semibold text-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 xl:ml-1.5 xl:px-4 xl:py-2.5 xl:text-sm"
              >
                Calcular ahora
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden className="xl:h-4 xl:w-4">
                  <path
                    d="M5 12h14M13 6l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </nav>

            <button
              type="button"
              className="header-menu-btn ml-auto inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-ink transition hover:border-accent hover:bg-[color-mix(in_oklab,var(--accent)_8%,var(--surface))] lg:hidden"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
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

          {menuOpen ? (
            <>
              <button
                type="button"
                className="header-mobile-backdrop header-mobile-backdrop--open fixed inset-0 z-40 lg:hidden"
                aria-label="Cerrar menú"
                onClick={closeMenu}
              />
              <div
                id="mobile-nav-panel"
                className="header-mobile-panel header-mobile-panel--open absolute left-0 right-0 top-full z-50 mt-2 max-h-[min(80vh,32rem)] overflow-y-auto rounded-3xl border-2 border-[color-mix(in_oklab,var(--border)_85%,var(--accent)_15%)] bg-surface p-3 shadow-[0_24px_56px_color-mix(in_oklab,var(--ink)_22%,transparent)] sm:p-4 lg:hidden"
              >
                <nav aria-label="Navegación móvil" className="flex flex-col gap-1">
                  {headerNavLinks.map((item) => renderNavItem(item, true))}
                  <a
                    href={pathname === "/" ? "#tool" : "/#tool"}
                    onClick={handleCalculateNow}
                    className="header-cta mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-ink px-4 py-3 text-sm font-semibold text-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                  >
                    Calcular ahora
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path
                        d="M5 12h14M13 6l6 6-6 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                </nav>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </header>
  );
}
