"use client";

import { emitCalculatorNav, scrollToPageSection } from "@/lib/calculatorNav";
import { imageCatalog } from "@/lib/images";
import { ineUrl } from "@/lib/site";
import { SectionEyebrow } from "./SectionEyebrow";
import { SectionReveal } from "./SectionReveal";
import { SiteImage } from "./SiteImage";

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
      <div aria-hidden className="section-why-uf-glow" />

      <div className="relative z-[1] mx-auto w-full max-w-content px-4 sm:px-6 lg:px-8">
        <div className="why-uf-layout">
          <div className="why-uf-content">
            <SectionReveal>
              <SectionEyebrow>Valor diario</SectionEyebrow>
              <h2 className="mt-4 max-w-2xl text-[clamp(1.75rem,3.5vw,2.5rem)] font-bold tracking-[-0.02em] text-ink">
                ¿Por Qué La UF Cambia Cada Día?
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink-soft sm:text-base">
                La UF nunca será la misma diariamente, y la razón es que está directamente vinculada a la inflación. El{" "}
                <a
                  href={ineUrl}
                  className="content-page-inline-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  INE
                </a>{" "}
                publicará la inflación del mes anterior (IPC) una vez al mes, por lo que, en lugar de aumentar en un
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
          </div>

          <SectionReveal delay={0.08} className="why-uf-visual">
            <div className="why-uf-image-frame">
              <SiteImage
                image={imageCatalog.whyUfThinking}
                width={960}
                height={1200}
                sizes="(max-width: 1023px) 80vw, 420px"
                quality={88}
                loading="lazy"
                className="why-uf-image-photo"
              />
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
