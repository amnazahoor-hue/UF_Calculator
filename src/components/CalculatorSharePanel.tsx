"use client";

import type { CalcMode } from "@/lib/calculatorInput";

type SharePayload = {
  mode: CalcMode;
  input: string;
  result: number;
  rate: number;
  rateDate: string;
  siteUrl?: string;
  summaryLine?: string;
  dayChangeLabel?: string;
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

export function CalculatorSharePanel({ payload }: { payload: SharePayload }) {
  const handleWhatsApp = async () => {
    const { buildShareMessage, openWhatsAppShare } = await import("@/lib/calculatorShare");
    openWhatsAppShare(buildShareMessage(payload));
  };

  const handleEmail = async () => {
    const { buildShareMessage, openEmailShare } = await import("@/lib/calculatorShare");
    openEmailShare(buildShareMessage(payload));
  };

  const handlePdf = async () => {
    const { exportConversionPdf } = await import("@/lib/calculatorShare");
    await exportConversionPdf(payload);
  };

  return (
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
        El PDF incluye el logo oficial, el detalle de la conversión, información del valor UF y datos de la herramienta.
        Puedes reenviarlo por WhatsApp después de descargarlo.
      </p>
    </div>
  );
}
