"use client";

import { useMemo } from "react";
import { imageCatalog } from "@/lib/images";
import {
  buildConversionReferenceLabel,
  buildConversionTable,
  formatFixedUfAmount,
} from "@/lib/conversionTable";
import { useUfRate } from "@/components/UfRateProvider";
import { UfRateValueSkeleton } from "@/components/UfRatePanelSkeleton";
import { SectionEyebrow } from "./SectionEyebrow";
import { SectionReveal } from "./SectionReveal";

export function StatsStrip() {
  const { rate, loading } = useUfRate();
  const liveRate = rate ?? 40804;
  const conversionTable = useMemo(() => buildConversionTable(liveRate), [liveRate]);
  const referenceLabel = useMemo(() => buildConversionReferenceLabel(liveRate), [liveRate]);

  return (
    <section
      id="conversion-table"
      className="section-stats relative overflow-hidden"
      aria-labelledby="conversion-table-title"
    >
      <div
        className="section-stats-bg"
        role="img"
        aria-label={imageCatalog.conversionTableBg.description}
        title={imageCatalog.conversionTableBg.title}
      />
      <div aria-hidden className="section-stats-pattern" />

      <div className="relative z-[1] mx-auto max-w-content-narrow px-4 py-10 sm:px-6 sm:py-12 lg:py-14">
        <SectionReveal className="section-stats-intro text-center">
          <SectionEyebrow variant="dark">Tabla de conversión</SectionEyebrow>
          <h2
            id="conversion-table-title"
            className="mt-4 text-[clamp(1.5rem,3.5vw,2.25rem)] font-bold leading-tight tracking-[-0.02em] text-surface"
          >
            Tabla De Conversión De UF A Pesos Chilenos (CLP)
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[color-mix(in_oklab,var(--surface)_72%,transparent)] sm:text-base">
            Si te lo estás preguntando a cuánto está la unidad de fomento, entonces esta tabla te ayudará.
          </p>
          <p className="conversion-rate-chip mx-auto mt-5 inline-flex min-h-[2.5rem] min-w-[14.5rem] items-center justify-center gap-2 rounded-full border border-[color-mix(in_oklab,var(--accent)_28%,var(--border))] bg-[color-mix(in_oklab,var(--accent)_10%,var(--surface))] px-4 py-2 text-sm font-medium text-ink">
            <span className="h-2 w-2 shrink-0 rounded-full bg-accent" aria-hidden />
            1 UF ={" "}
            <strong className="uf-rate-value-display font-bold text-accent">
              {loading ? <UfRateValueSkeleton /> : referenceLabel}
            </strong>
          </p>
        </SectionReveal>

        <SectionReveal delay={0.08} className="mt-8 sm:mt-10">
          <div className="conversion-table-wrap">
            <div className="conversion-table-accent" aria-hidden />
            <div className="overflow-x-auto">
              <table className="conversion-table w-full min-w-[320px] border-collapse text-left">
                <thead>
                  <tr>
                    <th scope="col">Cantidad UF</th>
                    <th scope="col">Valor en pesos chilenos (CLP)</th>
                  </tr>
                </thead>
                <tbody>
                  {conversionTable.map((row, index) => (
                    <tr key={row.uf} className={index % 2 === 1 ? "conversion-table-row--alt" : undefined}>
                      <td>
                        <span className="conversion-uf-pill">{formatFixedUfAmount(row.uf)}</span>
                      </td>
                      <td>
                        <span className="conversion-clp-value">{row.clpLabel}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className="mt-5 text-center text-xs text-[color-mix(in_oklab,var(--surface)_65%,transparent)] sm:text-sm">
            Valores calculados con la tasa UF vigente: 1 UF = {referenceLabel} CLP.
          </p>
        </SectionReveal>
      </div>
    </section>
  );
}
