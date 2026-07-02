"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";
import { scrollToPageSection } from "@/lib/calculatorNav";
import { SectionEyebrow } from "./SectionEyebrow";
import { SectionReveal } from "./SectionReveal";

const UfUseCasesAnimation = dynamic(
  () => import("./UfUseCasesAnimation").then((m) => ({ default: m.UfUseCasesAnimation })),
  { ssr: false },
);

const useCases = [
  {
    title: "Vivienda Y Propiedad",
    body: "Gestiona tus pagos diarios con nuestra herramienta, ya que se utiliza para dividendos mensuales y pagos mensuales de préstamos que suelen estar fijados en UF. En el caso del alquiler, muchos contratos se cotizan en UF y también puedes ajustarlos mensualmente.",
  },
  {
    title: "Seguros Y Salud",
    body: "Los planes de seguro médico mensuales se cotizan en UF. También puede obtener coberturas premium de vida y hogar. Además, las pensiones y anualidades también se cotizan en UF para que conserven su valor.",
  },
  {
    title: "Préstamos Y Financiación",
    body: "Los préstamos estudiantiles, los depósitos a plazo fijo y otros trámites bancarios se realizan a través de la UF.",
  },
  {
    title: "Educación",
    body: "Los estudiantes también lo necesitan para el proceso de admisión a la universidad y para los trámites de matrícula, y eso es común con el valor UF hoy en Chile.",
  },
  {
    title: "Fines Legales Y Oficiales",
    body: "Todos los tipos de multas y sanciones también se expresan en UF. Necesitarías el valor UF de hoy y mañana para contratos de construcción, indemnizaciones por despido y acuerdos legales.",
  },
] as const;

export function UfUseCases() {
  const [activeCase, setActiveCase] = useState(0);
  const [ufRate, setUfRate] = useState<number | null>(null);

  const handleActiveChange = useCallback((index: number) => {
    setActiveCase(index);
  }, []);

  useEffect(() => {
    let cancelled = false;

    fetch("/api/uf")
      .then((res) => res.json())
      .then((data: { rate?: number }) => {
        if (!cancelled && typeof data.rate === "number") {
          setUfRate(data.rate);
        }
      })
      .catch(() => {
        if (!cancelled) setUfRate(null);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section id="use-cases" className="section-use-cases relative overflow-hidden pb-12 pt-10 sm:pb-14 sm:pt-12">
      <div aria-hidden className="use-cases-sky" />
      <div aria-hidden className="use-cases-cloud use-cases-cloud--1" />
      <div aria-hidden className="use-cases-cloud use-cases-cloud--2" />

      <div className="relative mx-auto w-full max-w-content px-4 sm:px-6 lg:px-8">
        <div className="use-cases-panel">
          <SectionReveal className="use-cases-panel-header text-center">
            <SectionEyebrow>Casos de uso</SectionEyebrow>
            <h2 className="mt-4 text-[clamp(1.75rem,3.5vw,2.5rem)] font-bold tracking-[-0.02em] text-ink">
              Cálculos De UF Para Cada Situación De La Vida Real
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-ink-soft sm:text-base">
              Nuestro conversor a UF se utiliza prácticamente en cualquier situación de la vida real. Aquí tienes
              algunos ejemplos cotidianos en los que puedes usar nuestra herramienta:
            </p>
          </SectionReveal>

          <div className="use-cases-split">
            <div className="use-cases-list">
              {useCases.map((item, index) => (
                <SectionReveal key={item.title} delay={index * 0.06}>
                  <article
                    className={`use-cases-item${activeCase === index ? " use-cases-item--active" : ""}`}
                    onMouseEnter={() => setActiveCase(index)}
                    onFocus={() => setActiveCase(index)}
                    tabIndex={0}
                  >
                    <span className="use-cases-item-num" aria-hidden>
                      {index + 1}
                    </span>
                    <div className="use-cases-item-copy">
                      <h3 className="use-cases-item-title">{item.title}</h3>
                      <p className="use-cases-item-body">{item.body}</p>
                    </div>
                  </article>
                </SectionReveal>
              ))}
            </div>

            <SectionReveal delay={0.12} className="use-cases-visual-wrap">
              <UfUseCasesAnimation active={activeCase} onActiveChange={handleActiveChange} ufRate={ufRate} />
            </SectionReveal>
          </div>

          <SectionReveal delay={0.28} className="use-cases-cta-wrap">
            <h3 className="use-cases-cta-title">Echa Un Vistazo A UF 2026</h3>
            <p className="use-cases-cta-text">
              Convierte UF a pesos chilenos con el valor actualizado y úsalo en tus situaciones del día a día.
            </p>
            <a
              href="#tool"
              onClick={(e) => {
                e.preventDefault();
                scrollToPageSection("tool");
              }}
              className="use-cases-cta-btn"
            >
              Calcular UF ahora
            </a>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
