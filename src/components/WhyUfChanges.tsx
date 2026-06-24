"use client";

import { emitCalculatorNav, scrollToPageSection } from "@/lib/calculatorNav";
import { SectionEyebrow } from "./SectionEyebrow";
import { SectionReveal } from "./SectionReveal";

const highlights = [
  "La UF está vinculada directamente a la inflación (IPC).",
  "El INE publica el IPC del mes anterior una vez al mes.",
  "El ajuste se distribuye de forma uniforme en cada día del mes.",
  "El Banco Central aplica los valores del día 10 al día 9 del mes siguiente.",
];

function openClpToUfCalculator() {
  emitCalculatorNav("CLP_TO_UF");
  scrollToPageSection("tool");
  window.setTimeout(() => {
    document.querySelector<HTMLInputElement>("#tool .calc-amount-input")?.focus({ preventScroll: true });
  }, 450);
}

export function WhyUfChanges() {
  return (
    <section id="por-que-cambia-uf" className="section-why-uf relative overflow-hidden pb-12 pt-10 sm:pb-14 sm:pt-12">
      <div className="relative mx-auto w-full max-w-content px-4 sm:px-6 lg:px-8">
        <div className="section-why-uf-panel relative overflow-hidden rounded-[28px] px-5 py-8 sm:px-9 sm:py-10 md:px-11 md:py-11">
          <div aria-hidden className="section-why-uf-texture" />
          <div aria-hidden className="section-why-uf-glow" />

          <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-center lg:gap-10">
            <SectionReveal>
              <SectionEyebrow>Valor diario</SectionEyebrow>
              <h2 className="mt-4 text-[clamp(1.75rem,3.5vw,2.5rem)] font-bold tracking-[-0.02em] text-ink">
                ¿Por Qué La UF Cambia Cada Día?
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-ink-soft sm:text-base">
                La UF nunca será la misma diariamente, y la razón es que está directamente vinculada a la inflación. El
                INE publicará la inflación del mes anterior (IPC) una vez al mes, por lo que, en lugar de aumentar en un
                solo día, se distribuye uniformemente a lo largo de cada día del mes. El Banco Central aplicará estos
                valores desde el día 10 de un mes hasta el día 9 del mes siguiente, teniendo en cuenta los cambios en el
                cálculo de la UF.
              </p>
              <button
                type="button"
                onClick={openClpToUfCalculator}
                className="header-cta mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              >
                Convertir Pesos A UF
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M5 12h14M13 6l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </SectionReveal>

            <SectionReveal delay={0.1}>
              <div className="why-uf-points">
                <p className="why-uf-points-title">Cómo se actualiza la UF</p>
                <ul className="mt-4 space-y-3">
                  {highlights.map((point) => (
                    <li key={point} className="why-uf-point">
                      <span className="why-uf-point-marker" aria-hidden />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                <div className="why-uf-cycle mt-5" aria-hidden>
                  <span>Día 10</span>
                  <span className="why-uf-cycle-line" />
                  <span>…</span>
                  <span className="why-uf-cycle-line" />
                  <span>Día 9</span>
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
