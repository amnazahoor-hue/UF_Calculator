import type { UfRatesResponse } from "@/lib/ufRate";
import { HeroInteractive } from "./HeroInteractive";

export function Hero({ initialUfData }: { initialUfData?: UfRatesResponse | null }) {
  return (
    <section
      id="home"
      className="overflow-x-hidden bg-bg-warm-2 pb-0 -mt-[var(--header-offset)] pt-[var(--header-offset)]"
    >
      <div className="hero-panel hero-panel-grid relative w-full rounded-none">
        <div aria-hidden className="hero-panel-glows">
          <span className="hero-panel-glow hero-panel-glow--1" />
          <span className="hero-panel-glow hero-panel-glow--2" />
          <span className="hero-panel-glow hero-panel-glow--3" />
        </div>
        <div aria-hidden className="hero-panel-grid-lines" />
        <div aria-hidden className="hero-headline-glow" />
        <div aria-hidden className="pointer-events-none absolute -right-6 top-16 z-[2] h-36 w-36 rounded-full bg-[color-mix(in_oklab,var(--accent-2)_28%,transparent)] blur-3xl sm:-right-16 sm:h-44 sm:w-44" />
        <div aria-hidden className="pointer-events-none absolute -left-4 bottom-24 z-[2] h-28 w-28 rounded-full bg-[color-mix(in_oklab,var(--accent)_14%,transparent)] blur-3xl sm:-left-12 sm:h-36 sm:w-36" />

        <div className="relative z-10 px-5 pb-9 pt-6 text-center sm:px-10 sm:pb-11 sm:pt-8 md:px-12 md:pb-12">
          <div className="mx-auto max-w-content-narrow">
            <h1 className="mx-auto max-w-[920px] text-[clamp(2rem,4.5vw,3.35rem)] font-bold leading-[1.12] tracking-[-0.02em] text-ink">
              Calculadora De UF: Convierte UF Pesos Chilenos Al Instante.
            </h1>

            <p className="mx-auto mt-4 max-w-[800px] text-[0.95rem] leading-relaxed text-ink-soft sm:mt-5 sm:text-base">
              Convierte UF a Pesos Chilenos al Instante (Unidad de Fomento) y de UF a pesos chilenos al instante. Con
              nuestra herramienta, puede consultar fácilmente los pagos de hipotecas, precios de propiedades, alquileres,
              préstamos y todos los demás contratos financieros en Chile. Calculadora UF se actualiza diariamente para
              reflejar la inflación y le proporciona cálculos precisos y rápidos.
            </p>

            <div className="mt-6 sm:mt-7">
              <a
                href="#tool"
                className="header-cta inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-warm-2)]"
              >
                Ingrese su valor hoy calcula ahora
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
            </div>
          </div>

          <HeroInteractive initialUfData={initialUfData} />
        </div>
      </div>
    </section>
  );
}
