"use client";

import { useEffect, useMemo, useState } from "react";
import {
  formatConversionResult,
  formatConversionSummary,
  isValidAmount,
  parseAmount,
  roundConversionResult,
  sanitizeAmount,
  stepAmount,
  type CalcMode,
} from "@/lib/calculatorInput";
import { CALCULATOR_NAV_EVENT, emitCalculatorNav, type CalculatorNavTarget } from "@/lib/calculatorNav";
import { siteUrl } from "@/lib/site";
import {
  formatClpRate,
  formatUfDayChangeLabel,
  formatUfLongDate,
  getTodayDateKey,
  getUfDayChange,
  isTodayDate,
  prepareStripHistory,
  type UfRateDay,
} from "@/lib/ufRate";
import { SectionEyebrow } from "./SectionEyebrow";
import { UfDateStrip } from "./UfDateStrip";
import { UfRatePanelSkeleton } from "./UfRatePanelSkeleton";
import { UfDayChangeNotice } from "./UfDayChange";
import { useUfRate } from "./UfRateProvider";

export type CalculatorProps = {
  variant?: "hero" | "section";
};

function WhatsAppIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#25D366"
        d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 004.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.86 9.86 0 0012.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.23 8.23 0 012.42 5.83c0 4.54-3.7 8.23-8.24 8.23-1.48 0-2.93-.39-4.19-1.14l-.3-.18-3.12.82.83-3.04-.2-.32a8.16 8.16 0 01-1.24-4.35c.01-4.54 3.7-8.24 8.22-8.24M8.53 7.33c-.16 0-.43.06-.66.31-.23.25-.87.85-.87 2.07 0 1.22.89 2.39 1 2.56.14.17 1.76 2.67 4.25 3.73.59.27 1.05.42 1.41.53.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.23-.16-.48-.28-.25-.14-1.48-.73-1.71-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.78.97-.14.17-.29.19-.54.07-.25-.13-1.06-.39-2.02-1.24-.75-.67-1.25-1.49-1.4-1.74-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.14.17-.25.25-.41.08-.17.04-.32-.02-.44-.06-.12-.56-1.35-.77-1.84-.2-.48-.41-.42-.56-.43h-.48z"
      />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="2" y="4" width="20" height="16" rx="3" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3 7l9 6 9-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function PdfIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M8 3h8l4 4v14H8V3z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M16 3v4h4M10 13h6M10 17h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function RestoreIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 7V3h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 7a9 9 0 0114.52-2.47" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M20 17v4h-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20 17A9 9 0 015.48 19.47" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

type AmountInputProps = {
  mode: CalcMode;
  value: string;
  onChange: (value: string) => void;
  onUserEdit: () => void;
  label: string;
};

function AmountInput({ mode, value, onChange, onUserEdit, label }: AmountInputProps) {
  const handleChange = (raw: string) => {
    onUserEdit();
    onChange(sanitizeAmount(raw, mode));
  };

  return (
    <label className="block min-w-0 text-sm font-medium text-ink-soft">
      {label}
      <div className="calc-amount-wrap mt-2">
        <input
          className="calc-amount-input w-full rounded-2xl border border-border bg-surface py-3 pl-4 pr-11 text-base text-ink outline-none ring-accent/20 transition focus:ring-4"
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          inputMode="decimal"
          aria-label={label}
          autoComplete="off"
        />
        <div className="calc-amount-steppers">
          <button
            type="button"
            className="calc-step-btn"
            aria-label="Increase amount"
            onClick={() => {
              onUserEdit();
              onChange(stepAmount(value, mode, 1));
            }}
          >
            ▲
          </button>
          <button
            type="button"
            className="calc-step-btn"
            aria-label="Decrease amount"
            onClick={() => {
              onUserEdit();
              onChange(stepAmount(value, mode, -1));
            }}
          >
            ▼
          </button>
        </div>
      </div>
    </label>
  );
}

export function Calculator({ variant = "section" }: CalculatorProps) {
  const isHero = variant === "hero";
  const { history, date: latestDate, loading, fallback } = useUfRate();
  const [mode, setMode] = useState<CalcMode>("UF_TO_CLP");
  const [input, setInput] = useState("1");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [copied, setCopied] = useState(false);

  const stripDays = useMemo(() => prepareStripHistory(history), [history]);

  const selectedDay = useMemo(
    () =>
      stripDays.find((day) => day.date === selectedDate) ??
      stripDays.find((day) => isTodayDate(day.date)) ??
      stripDays[stripDays.length - 1] ??
      null,
    [stripDays, selectedDate],
  );
  const rate = selectedDay?.rate ?? null;
  const rateDate = selectedDay?.date ?? "";

  const dayChange = useMemo(() => {
    if (!rateDate || selectedDay?.projected) return null;
    return getUfDayChange(history, rateDate);
  }, [history, rateDate, selectedDay?.projected]);

  const [calculatedResult, setCalculatedResult] = useState<number | null>(null);
  const [calcError, setCalcError] = useState<string>("");

  const parsed = parseAmount(input);
  const invalid = !isValidAmount(input);

  const resetResult = () => {
    setCalculatedResult(null);
    setCalcError("");
  };

  useEffect(() => {
    const onNav = (event: Event) => {
      const target = (event as CustomEvent<{ target: CalculatorNavTarget }>).detail?.target;
      if (target === "UF_TO_CLP") {
        setMode("UF_TO_CLP");
        setInput("1");
        setCalculatedResult(null);
        setCalcError("");
      } else if (target === "CLP_TO_UF") {
        setMode("CLP_TO_UF");
        setInput("100000");
        setCalculatedResult(null);
        setCalcError("");
      }
    };
    window.addEventListener(CALCULATOR_NAV_EVENT, onNav);
    return () => window.removeEventListener(CALCULATOR_NAV_EVENT, onNav);
  }, []);

  useEffect(() => {
    if (latestDate && !selectedDate) {
      setSelectedDate(latestDate);
    }
  }, [latestDate, selectedDate]);

  useEffect(() => {
    if (!loading && !history.length) {
      setError("No pudimos cargar el valor UF. Intenta de nuevo en un momento.");
    }
  }, [history.length, loading]);

  const handleDateSelect = (dateKey: string) => {
    setSelectedDate(dateKey);
    resetResult();
  };

  const handleCopyRate = async () => {
    if (!rate) return;
    const text = `1 UF = $${formatClpRate(rate)} CLP`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const handleCalculate = () => {
    if (!rate) {
      setCalcError("UF rate is not available yet. Please wait or refresh.");
      return;
    }
    if (invalid) {
      setCalcError("Enter a valid non-negative amount within the allowed limit.");
      setCalculatedResult(null);
      return;
    }
    const result = roundConversionResult(
      mode === "UF_TO_CLP" ? parsed * rate : parsed / rate,
      mode,
    );
    setCalculatedResult(result);
    setCalcError("");
  };

  const handleSwap = () => {
    const next: CalcMode = mode === "UF_TO_CLP" ? "CLP_TO_UF" : "UF_TO_CLP";
    setMode(next);
    setInput(next === "UF_TO_CLP" ? "1" : "100000");
    resetResult();
    emitCalculatorNav(next);
  };

  const handleRestore = () => {
    const todayKey =
      history.find((day) => isTodayDate(day.date))?.date ??
      (latestDate || history[0]?.date || getTodayDateKey());

    setMode("UF_TO_CLP");
    setInput("1");
    setSelectedDate(todayKey);
    setCalculatedResult(null);
    setCalcError("");
    setCopied(false);
    emitCalculatorNav("UF_TO_CLP");
  };

  const sharePayload =
    rate && calculatedResult !== null && !invalid
      ? {
          mode,
          input,
          result: calculatedResult,
          rate,
          rateDate,
          siteUrl,
          summaryLine: formatConversionSummary(mode, input, calculatedResult),
          dayChangeLabel: dayChange ? formatUfDayChangeLabel(dayChange, rateDate) : undefined,
        }
      : null;

  const handleWhatsApp = async () => {
    if (!sharePayload) return;
    const { buildShareMessage, openWhatsAppShare } = await import("@/lib/calculatorShare");
    openWhatsAppShare(buildShareMessage(sharePayload));
  };

  const handleEmail = async () => {
    if (!sharePayload) return;
    const { buildShareMessage, openEmailShare } = await import("@/lib/calculatorShare");
    openEmailShare(buildShareMessage(sharePayload));
  };

  const handlePdf = async () => {
    if (!sharePayload) return;
    const { exportConversionPdf } = await import("@/lib/calculatorShare");
    await exportConversionPdf(sharePayload);
  };

  const hasResult = calculatedResult !== null && !invalid;

  const card = (
    <div
      className={`calculator-card text-left ${isHero ? "hero-calculator-card rounded-[20px] p-4 sm:rounded-[24px] sm:p-6" : "rounded-[28px] p-5 sm:p-8"}`}
    >
            <div className="uf-rate-panel" aria-busy={loading} aria-live="polite">
              {error ? <p className="rounded-xl bg-error/10 p-3 text-sm text-error">{error}</p> : null}

              {!error && loading ? <UfRatePanelSkeleton /> : null}

              {!error && !loading && history.length > 0 ? (
                <>
                  <div className="uf-rate-panel-head">
                    <div>
                      <p className="uf-rate-panel-eyebrow">
                        {selectedDate && isTodayDate(selectedDate) ? "Valor UF hoy" : "Valor UF del día"}
                      </p>
                      {selectedDate ? (
                        <p className="uf-rate-panel-date">{formatUfLongDate(selectedDate)}</p>
                      ) : (
                        <p className="uf-rate-panel-date uf-rate-panel-date--placeholder" aria-hidden>
                          &nbsp;
                        </p>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={handleCopyRate}
                      disabled={!rate}
                      className="uf-rate-copy-btn"
                      aria-label="Copiar valor UF"
                    >
                      {copied ? "Copiado" : "Copiar"}
                    </button>
                  </div>
                  <p className="uf-rate-panel-value">
                    1 UF ={" "}
                    <strong className="uf-rate-value-display">
                      ${rate ? formatClpRate(rate) : "—"}
                    </strong>{" "}
                    CLP
                  </p>
                  <div className="uf-rate-day-change-slot">
                    {dayChange ? (
                      <UfDayChangeNotice change={dayChange} referenceDate={rateDate} compact />
                    ) : null}
                  </div>
                  <UfDateStrip history={history} selectedDate={selectedDate} onSelect={handleDateSelect} />
                </>
              ) : null}
            </div>

            <div
              className={`grid min-w-0 gap-5 lg:grid-cols-[1fr_auto_1fr] lg:items-stretch lg:gap-4 ${isHero ? "mt-0" : "mt-5"}`}
            >
              <div className="calc-panel min-w-0">
                <AmountInput
                  mode={mode}
                  value={input}
                  onChange={setInput}
                  onUserEdit={resetResult}
                  label={mode === "UF_TO_CLP" ? "UF Amount" : "CLP Amount"}
                />
                <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                  <button
                    type="button"
                    onClick={handleCalculate}
                    disabled={loading || Boolean(error) || !rate}
                    className="calc-submit-btn inline-flex flex-1 items-center justify-center rounded-2xl bg-ink px-6 py-3.5 text-base font-semibold text-surface transition enabled:hover:scale-[1.02] enabled:hover:bg-[color-mix(in_oklab,var(--ink)_88%,var(--accent))] enabled:active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Calcular
                  </button>
                  <button
                    type="button"
                    onClick={handleRestore}
                    disabled={loading || Boolean(error)}
                    className="calc-restore-btn inline-flex items-center justify-center gap-2 rounded-2xl border border-border bg-surface px-5 py-3.5 text-base font-semibold text-ink-soft transition enabled:hover:border-accent enabled:hover:text-accent disabled:cursor-not-allowed disabled:opacity-50 sm:min-w-[9.5rem]"
                    aria-label="Restaurar calculadora"
                  >
                    <RestoreIcon />
                    Restaurar
                  </button>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-ink-soft">
                  Sin cálculo automático — presiona Calcular para ver el resultado.
                </p>
              </div>

              <div className="flex items-center justify-center lg:items-center lg:self-center">
                <button
                  type="button"
                  onClick={handleSwap}
                  aria-label="Swap conversion direction"
                  className="calc-swap-btn flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-border bg-surface text-xl text-accent shadow-sm transition hover:scale-105 hover:border-accent active:scale-95"
                >
                  ⇄
                </button>
              </div>

              <div className={`calc-result-panel min-w-0 ${hasResult ? "calc-result-panel--active" : ""}`}>
                <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft">Resultado</p>
                <div className="calc-result-body mt-2">
                  {hasResult ? (
                    <div>
                      <p className="calc-result-reveal text-xl font-bold leading-snug sm:text-2xl">
                        <span className="calc-result-value block break-words">
                          {formatConversionResult(calculatedResult!, mode)}
                        </span>
                        <span className="mt-1 block text-base font-semibold text-ink-soft sm:text-lg">
                          {mode === "UF_TO_CLP" ? "CLP" : "UF"}
                        </span>
                      </p>
                      {dayChange ? (
                        <div className="mt-4">
                          <p className="mb-2 text-[0.6875rem] font-semibold uppercase tracking-wide text-ink-soft">
                            Variación UF
                          </p>
                          <UfDayChangeNotice change={dayChange} referenceDate={rateDate} />
                        </div>
                      ) : null}
                    </div>
                  ) : (
                    <p className="text-sm leading-relaxed text-ink-soft">
                      Presiona Calcular para ver tu conversión aquí.
                    </p>
                  )}
                </div>
              </div>
            </div>

            {hasResult ? (
              <p className="calc-result-summary mt-4 text-center text-sm leading-relaxed text-ink-soft sm:text-base">
                {formatConversionSummary(mode, input, calculatedResult!)}
              </p>
            ) : null}

            {calcError ? <p className="mt-4 text-sm text-error">{calcError}</p> : null}

            {calculatedResult !== null && !invalid ? (
              <div className="calc-share-panel mt-6 overflow-hidden rounded-2xl border border-[color-mix(in_oklab,var(--accent)_25%,var(--border))] bg-[color-mix(in_oklab,var(--bg-warm-2)_50%,var(--surface))] p-4 sm:p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-accent">Share result</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={handleWhatsApp}
                    className="inline-flex items-center gap-2 rounded-full border border-[color-mix(in_oklab,var(--success)_40%,var(--border))] bg-surface px-4 py-2.5 text-sm font-medium text-ink transition hover:border-[#25D366] hover:shadow-sm"
                  >
                    <WhatsAppIcon />
                    WhatsApp
                  </button>
                  <button
                    type="button"
                    onClick={handleEmail}
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2.5 text-sm font-medium text-ink transition hover:border-accent hover:shadow-sm"
                  >
                    <EmailIcon />
                    Email
                  </button>
                  <button
                    type="button"
                    onClick={handlePdf}
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2.5 text-sm font-medium text-ink transition hover:border-accent hover:shadow-sm"
                  >
                    <PdfIcon />
                    Export PDF
                  </button>
                </div>
                <p className="mt-3 text-xs text-ink-soft">
                  El PDF incluye el logo oficial, el detalle de la conversión, información del valor UF y datos de la herramienta. Puedes reenviarlo por WhatsApp después de descargarlo.
                </p>
              </div>
            ) : null}

            <div id="live-rate" className="uf-live-rate-bar mt-6 flex flex-wrap items-center gap-3 text-xs text-ink-soft">
              <span className="uf-live-rate-pill rounded-full bg-[color-mix(in_oklab,var(--accent)_12%,var(--surface))] px-3 py-1 font-medium text-accent">
                Tasa:{" "}
                <strong className="uf-rate-value-display font-semibold">
                  {loading ? "…" : rate ? formatClpRate(rate) : "—"} CLP
                </strong>
              </span>
              <span className="uf-live-rate-date">
                Fecha: {loading ? "…" : rateDate ? formatUfLongDate(rateDate) : "—"}
              </span>
              {fallback ? (
                <span className="rounded-full bg-[color-mix(in_oklab,var(--accent-2)_25%,var(--surface))] px-3 py-1 text-accent">
                  Valor de respaldo
                </span>
              ) : null}
            </div>
    </div>
  );

  if (isHero) {
    return (
      <div id="tool" className="hero-calculator w-full">
        {card}
      </div>
    );
  }

  return (
    <section className="section-tool relative overflow-hidden pb-14 pt-8 sm:pb-16 sm:pt-10 lg:pb-20 lg:pt-12">
      <div className="section-tool-glow" aria-hidden />
      <div className="section-tool-blob" aria-hidden />
      <div className="section-tool-rings" aria-hidden />

      <div className="relative z-10 mx-auto w-full max-w-content-narrow px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <SectionEyebrow>Live calculator</SectionEyebrow>
          <h2 className="mt-4 text-3xl font-bold text-ink sm:text-4xl">UF ↔ CLP Tool</h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-ink-soft sm:text-base">
            Enter an amount, then tap Calculate. Share your result via WhatsApp, email, or PDF.
          </p>
        </div>

        <div className="mt-8 sm:mt-10">
          {card}
        </div>
      </div>
    </section>
  );
}
