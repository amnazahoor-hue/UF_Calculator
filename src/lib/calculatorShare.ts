import type { CalcMode } from "./calculatorInput";

type SharePayload = {
  mode: CalcMode;
  input: string;
  result: number;
  rate: number;
  rateDate: string;
  siteUrl: string;
};

function formatForDisplay(value: number, mode: CalcMode) {
  const max = mode === "UF_TO_CLP" ? 2 : 4;
  return new Intl.NumberFormat("es-CL", { minimumFractionDigits: 2, maximumFractionDigits: max }).format(value);
}

export function buildShareMessage({ mode, input, result, rate, rateDate, siteUrl }: SharePayload) {
  const fromUnit = mode === "UF_TO_CLP" ? "UF" : "CLP";
  const toUnit = mode === "UF_TO_CLP" ? "CLP" : "UF";
  const formattedResult = formatForDisplay(result, mode);
  const formattedRate = new Intl.NumberFormat("es-CL").format(rate);
  const dateLabel = rateDate ? new Date(rateDate).toLocaleDateString("es-CL") : "—";

  return [
    "UF Calculator Chile — Conversion",
    "",
    `Input: ${input} ${fromUnit}`,
    `Result: ${formattedResult} ${toUnit}`,
    `UF rate: ${formattedRate} CLP (as of ${dateLabel})`,
    "",
    siteUrl,
  ].join("\n");
}

export async function exportConversionPdf({ mode, input, result, rate, rateDate, siteUrl }: SharePayload) {
  const { jsPDF } = await import("jspdf");

  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageW = doc.internal.pageSize.getWidth();
  const margin = 48;
  const warm = "#f3e2d0";
  const warm2 = "#f8ede1";
  const accent = "#e8744a";
  const ink = "#1a1a1a";
  const soft = "#6b6b6b";

  doc.setFillColor(warm);
  doc.roundedRect(0, 0, pageW, 120, 0, 0, "F");

  doc.setFillColor(accent);
  doc.roundedRect(margin, 36, 36, 36, 8, 8, "F");
  doc.setDrawColor("#ffffff");
  doc.setLineWidth(2);
  doc.line(margin + 10, 58, margin + 18, 50);
  doc.line(margin + 18, 50, margin + 24, 54);
  doc.line(margin + 24, 54, margin + 30, 46);

  doc.setTextColor(ink);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text("UF Calculator Chile", margin + 48, 52);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(soft);
  doc.text("Official UF ↔ CLP conversion summary", margin + 48, 68);

  let y = 140;
  doc.setFillColor(warm2);
  doc.roundedRect(margin, y, pageW - margin * 2, 88, 12, 12, "F");

  const fromUnit = mode === "UF_TO_CLP" ? "UF" : "CLP";
  const toUnit = mode === "UF_TO_CLP" ? "CLP" : "UF";
  const formattedResult = formatForDisplay(result, mode);

  doc.setTextColor(soft);
  doc.setFontSize(10);
  doc.text("INPUT", margin + 20, y + 28);
  doc.setTextColor(ink);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text(`${input} ${fromUnit}`, margin + 20, y + 54);

  y += 108;
  doc.setFillColor("#ffffff");
  doc.setDrawColor(accent);
  doc.setLineWidth(1.2);
  doc.roundedRect(margin, y, pageW - margin * 2, 88, 12, 12, "FD");

  doc.setTextColor(accent);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("RESULT", margin + 20, y + 28);
  doc.setTextColor(ink);
  doc.setFontSize(24);
  doc.text(`${formattedResult} ${toUnit}`, margin + 20, y + 58);

  y += 120;
  doc.setTextColor(ink);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.text(`UF rate: ${new Intl.NumberFormat("es-CL").format(rate)} CLP`, margin, y);
  y += 18;
  doc.setTextColor(soft);
  doc.text(`Rate date: ${rateDate ? new Date(rateDate).toLocaleDateString("es-CL") : "—"}`, margin, y);
  y += 18;
  doc.text(`Generated: ${new Date().toLocaleString("es-CL")}`, margin, y);
  y += 18;
  doc.setTextColor(accent);
  doc.textWithLink(siteUrl, margin, y, { url: siteUrl });

  y += 36;
  doc.setFontSize(9);
  doc.setTextColor(soft);
  const disclaimer =
    "This document is for reference only. Verify amounts with official sources before making financial decisions.";
  const lines = doc.splitTextToSize(disclaimer, pageW - margin * 2);
  doc.text(lines, margin, y);

  doc.save(`uf-calculator-${Date.now()}.pdf`);
}

export function openWhatsAppShare(message: string) {
  window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
}

export function openEmailShare(message: string) {
  const subject = encodeURIComponent("UF Calculator Chile — Conversion");
  const body = encodeURIComponent(message);
  window.location.href = `mailto:?subject=${subject}&body=${body}`;
}
