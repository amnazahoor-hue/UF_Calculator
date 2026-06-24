"use client";

import { useEffect, useState } from "react";
import { SectionEyebrow } from "./SectionEyebrow";
import { SectionReveal } from "./SectionReveal";

const ufAmounts = [1, 2, 5, 10, 25, 30, 50, 80, 100, 500, 1000] as const;

function formatClp(value: number) {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

function formatUf(amount: number) {
  return `${new Intl.NumberFormat("es-CL", { maximumFractionDigits: 0 }).format(amount)} UF`;
}

export function StatsStrip() {
  const [rate, setRate] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetch("/api/uf")
      .then((res) => res.json())
      .then((data: { rate?: number }) => {
        if (!cancelled && typeof data.rate === "number") {
          setRate(data.rate);
        }
      })
      .catch(() => {
        if (!cancelled) setRate(null);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="section-stats relative overflow-hidden" aria-labelledby="conversion-table-title">
      <div aria-hidden className="section-stats-bg" />
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
            Si te lo estás preguntando a cuánto está la unidad de fomento, entonces esta tabla te ayudará;
          </p>
          {rate ? (
            <p className="conversion-rate-chip mx-auto mt-5 inline-flex items-center gap-2 rounded-full border border-[color-mix(in_oklab,var(--accent)_28%,var(--border))] bg-[color-mix(in_oklab,var(--accent)_10%,var(--surface))] px-4 py-2 text-sm font-medium text-ink">
              <span className="h-2 w-2 rounded-full bg-accent" aria-hidden />
              UF hoy: <strong className="font-bold text-accent">{formatClp(rate)}</strong>
            </p>
          ) : null}
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
                  {ufAmounts.map((amount, index) => (
                    <tr key={amount} className={index % 2 === 1 ? "conversion-table-row--alt" : undefined}>
                      <td>
                        <span className="conversion-uf-pill">{formatUf(amount)}</span>
                      </td>
                      <td>
                        <span className="conversion-clp-value">{rate ? formatClp(amount * rate) : "—"}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {rate ? (
            <p className="mt-5 text-center text-xs text-[color-mix(in_oklab,var(--surface)_65%,transparent)] sm:text-sm">
              Valores calculados con la UF del día ({formatClp(rate)} por 1 UF).
            </p>
          ) : null}
        </SectionReveal>
      </div>
    </section>
  );
}
