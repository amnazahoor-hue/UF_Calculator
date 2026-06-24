import type { CalcMode } from "./calculatorInput";
import { formatConversionInputDisplay, formatConversionResult, formatConversionSummary } from "./calculatorInput";
import { siteImages } from "./images";
import { officialUfRateUrl, siteName, siteUrl } from "./site";
import { formatClpRate, formatUfLongDate } from "./ufRate";

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

const COLORS = {
  warm: "#f3e2d0",
  warm2: "#f8ede1",
  surface: "#ffffff",
  accent: "#e8744a",
  accentSoft: "#f4a574",
  ink: "#1a1a1a",
  soft: "#6b6b6b",
  border: "#e8ddd3",
  success: "#15803d",
  successBg: "#ecfdf3",
  error: "#b91c1c",
  errorBg: "#fef2f2",
} as const;

function resolvePublicSiteUrl(payloadUrl?: string) {
  if (payloadUrl && !/localhost|127\.0\.0\.1/i.test(payloadUrl)) {
    return payloadUrl.replace(/\/$/, "");
  }
  return siteUrl;
}

async function loadLogoDataUrl() {
  if (typeof window === "undefined") return null;

  try {
    const response = await fetch(siteImages.logo);
    if (!response.ok) return null;

    const blob = await response.blob();
    const objectUrl = URL.createObjectURL(blob);

    return await new Promise<string | null>((resolve) => {
      const image = new Image();
      image.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;
        const context = canvas.getContext("2d");

        if (!context) {
          URL.revokeObjectURL(objectUrl);
          resolve(null);
          return;
        }

        context.drawImage(image, 0, 0);
        URL.revokeObjectURL(objectUrl);
        resolve(canvas.toDataURL("image/png"));
      };
      image.onerror = () => {
        URL.revokeObjectURL(objectUrl);
        resolve(null);
      };
      image.src = objectUrl;
    });
  } catch {
    return null;
  }
}

function drawSectionTitle(
  doc: import("jspdf").jsPDF,
  title: string,
  x: number,
  y: number,
  ink: string,
) {
  doc.setTextColor(ink);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text(title, x, y);
  doc.setDrawColor(COLORS.accent);
  doc.setLineWidth(2);
  doc.line(x, y + 5, x + 42, y + 5);
}

function drawCard(
  doc: import("jspdf").jsPDF,
  x: number,
  y: number,
  w: number,
  h: number,
  fill: string = COLORS.surface,
  stroke: string = COLORS.border,
) {
  doc.setFillColor(fill);
  doc.setDrawColor(stroke);
  doc.setLineWidth(0.8);
  doc.roundedRect(x, y, w, h, 10, 10, "FD");
}

function drawInfoRow(
  doc: import("jspdf").jsPDF,
  label: string,
  value: string,
  x: number,
  y: number,
  w: number,
  ink: string,
  soft: string,
) {
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(soft);
  doc.text(label.toUpperCase(), x, y);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10.5);
  doc.setTextColor(ink);
  const lines = doc.splitTextToSize(value, w);
  doc.text(lines, x, y + 13);
  return lines.length * 13 + 18;
}

export function buildShareMessage({ mode, input, result, rate, rateDate, siteUrl: payloadSiteUrl }: SharePayload) {
  const publicUrl = resolvePublicSiteUrl(payloadSiteUrl);
  const fromUnit = mode === "UF_TO_CLP" ? "UF" : "CLP";
  const toUnit = mode === "UF_TO_CLP" ? "CLP" : "UF";
  const formattedResult = formatConversionResult(result, mode);
  const formattedRate = formatClpRate(rate);
  const dateLabel = rateDate ? formatUfLongDate(rateDate) : "—";

  return [
    `${siteName} — Conversión`,
    "",
    `Entrada: ${input} ${fromUnit}`,
    `Resultado: ${formattedResult} ${toUnit}`,
    `Valor UF: $${formattedRate} CLP (${dateLabel})`,
    "",
    publicUrl,
  ].join("\n");
}

export async function exportConversionPdf({
  mode,
  input,
  result,
  rate,
  rateDate,
  siteUrl: payloadSiteUrl,
  summaryLine,
  dayChangeLabel,
}: SharePayload) {
  const { jsPDF } = await import("jspdf");

  const publicUrl = resolvePublicSiteUrl(payloadSiteUrl);
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const margin = 44;
  const contentW = pageW - margin * 2;
  const { warm, warm2, surface, accent, ink, soft, border } = COLORS;

  const fromUnit = mode === "UF_TO_CLP" ? "UF" : "CLP";
  const toUnit = mode === "UF_TO_CLP" ? "CLP" : "UF";
  const direction = mode === "UF_TO_CLP" ? "UF → CLP" : "CLP → UF";
  const formattedResult = formatConversionResult(result, mode);
  const formattedInput = formatConversionInputDisplay(input, mode);
  const formattedRate = formatClpRate(rate);
  const rateDateLabel = rateDate ? formatUfLongDate(rateDate) : "—";
  const summary = summaryLine ?? formatConversionSummary(mode, input, result);
  const generatedAt = new Intl.DateTimeFormat("es-CL", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(new Date());

  doc.setFillColor(warm);
  doc.rect(0, 0, pageW, 118, "F");
  doc.setFillColor(accent);
  doc.rect(0, 118, pageW, 3, "F");

  const logoDataUrl = await loadLogoDataUrl();
  const logoSize = 48;
  const headerY = 34;

  if (logoDataUrl) {
    doc.setFillColor(surface);
    doc.roundedRect(margin - 2, headerY - 2, logoSize + 4, logoSize + 4, 10, 10, "F");
    doc.addImage(logoDataUrl, "PNG", margin, headerY, logoSize, logoSize);
  } else {
    doc.setFillColor(accent);
    doc.roundedRect(margin, headerY, logoSize, logoSize, 10, 10, "F");
  }

  const textX = margin + logoSize + 16;
  doc.setTextColor(ink);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(21);
  doc.text(siteName, textX, headerY + 20);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10.5);
  doc.setTextColor(soft);
  doc.text("Comprobante de conversión UF ↔ CLP", textX, headerY + 38);

  doc.setFontSize(9.5);
  doc.setTextColor(accent);
  doc.textWithLink(publicUrl, textX, headerY + 54, { url: publicUrl });

  doc.setFillColor(surface);
  doc.setDrawColor(border);
  doc.setLineWidth(0.6);
  doc.roundedRect(pageW - margin - 148, headerY + 4, 148, 34, 8, 8, "FD");
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(soft);
  doc.text("GENERADO", pageW - margin - 136, headerY + 18);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(ink);
  const generatedLines = doc.splitTextToSize(generatedAt, 132);
  doc.text(generatedLines, pageW - margin - 136, headerY + 30);

  let y = 142;

  drawSectionTitle(doc, "Resumen de conversión", margin, y, ink);
  y += 18;

  const conversionCardH = 108;
  drawCard(doc, margin, y, contentW, conversionCardH, warm2, border);

  const colW = (contentW - 56) / 2;
  const leftX = margin + 20;
  const rightX = margin + contentW / 2 + 16;
  const cardMidY = y + conversionCardH / 2;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(soft);
  doc.text("DIRECCIÓN", leftX, y + 22);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(accent);
  doc.text(direction, leftX, y + 38);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(soft);
  doc.text("ENTRADA", leftX, y + 58);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.setTextColor(ink);
  doc.text(`${formattedInput}`, leftX, y + 82);
  doc.setFontSize(11);
  doc.setTextColor(soft);
  doc.text(fromUnit, leftX, y + 96);

  doc.setFillColor(accent);
  doc.circle(margin + contentW / 2, cardMidY, 14, "F");
  doc.setTextColor(surface);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("→", margin + contentW / 2 - 4, cardMidY + 5);

  drawCard(doc, rightX, y + 14, colW, 80, surface, accent);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(accent);
  doc.text("RESULTADO", rightX + 14, y + 34);
  doc.setFontSize(26);
  doc.setTextColor(accent);
  doc.text(formattedResult, rightX + 14, y + 64);
  doc.setFontSize(12);
  doc.setTextColor(ink);
  doc.text(toUnit, rightX + 14, y + 80);

  y += conversionCardH + 14;

  doc.setFillColor(warm2);
  doc.setDrawColor(border);
  const summaryWrapped = doc.splitTextToSize(summary, contentW - 28);
  const summaryH = Math.max(32, summaryWrapped.length * 12 + 18);
  doc.roundedRect(margin, y, contentW, summaryH, 8, 8, "FD");
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(ink);
  doc.text(summaryWrapped, margin + 14, y + 19);
  y += summaryH + 16;

  drawSectionTitle(doc, "Valor UF utilizado", margin, y, ink);
  y += 18;

  const rateCardH = dayChangeLabel ? 118 : 96;
  drawCard(doc, margin, y, contentW, rateCardH, surface, border);

  const gridX = margin + 16;
  const gridW = contentW / 2 - 24;
  let gridY = y + 18;
  gridY += drawInfoRow(doc, "Tasa aplicada", `1 UF = $${formattedRate} CLP`, gridX, gridY, gridW, ink, soft);
  drawInfoRow(doc, "Fecha del valor", rateDateLabel, gridX + gridW + 16, y + 18, gridW, ink, soft);

  gridY = y + 62;
  drawInfoRow(
    doc,
    "Fuente de datos",
    "mindicador.cl · referencia pública BCCh",
    gridX,
    gridY,
    contentW - 32,
    ink,
    soft,
  );

  if (dayChangeLabel) {
    const isUp = dayChangeLabel.startsWith("Subió");
    const isDown = dayChangeLabel.startsWith("Bajó");
    const changeFill = isUp ? COLORS.successBg : isDown ? COLORS.errorBg : warm2;
    const changeStroke = isUp ? "#86efac" : isDown ? "#fca5a5" : border;
    const changeColor = isUp ? COLORS.success : isDown ? COLORS.error : soft;

    doc.setFillColor(changeFill);
    doc.setDrawColor(changeStroke);
    doc.roundedRect(margin + 14, y + rateCardH - 34, contentW - 28, 24, 6, 6, "FD");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(changeColor);
    doc.text(`Variación UF: ${dayChangeLabel}`, margin + 22, y + rateCardH - 18);
  }

  y += rateCardH + 20;

  drawSectionTitle(doc, "Acerca de la herramienta", margin, y, ink);
  y += 18;

  const aboutCardH = 108;
  drawCard(doc, margin, y, contentW, aboutCardH, warm2, border);

  const aboutBullets = [
    "Conversión bidireccional UF ↔ CLP con valor por fecha.",
    "Referencia rápida para arriendos, créditos, seguros y contratos.",
    "Acceso gratuito · sin registro · datos públicos de Chile.",
  ];

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(soft);
  let bulletY = y + 22;
  for (const bullet of aboutBullets) {
    doc.setFillColor(accent);
    doc.circle(margin + 22, bulletY - 3, 2.2, "F");
    const lines = doc.splitTextToSize(bullet, contentW - 52);
    doc.text(lines, margin + 32, bulletY);
    bulletY += lines.length * 12 + 8;
  }

  doc.setFontSize(8.5);
  doc.setTextColor(accent);
  doc.textWithLink(`Sitio: ${publicUrl}`, margin + 20, y + aboutCardH - 28, { url: publicUrl });
  doc.textWithLink(`Valor UF: ${officialUfRateUrl}`, margin + 20, y + aboutCardH - 14, { url: officialUfRateUrl });

  const footerY = pageH - 52;
  doc.setDrawColor(border);
  doc.setLineWidth(0.8);
  doc.line(margin, footerY - 10, pageW - margin, footerY - 10);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(soft);
  const disclaimer =
    "Documento de referencia. Confirme montos y fechas con fuentes oficiales antes de decisiones financieras o contractuales.";
  const disclaimerLines = doc.splitTextToSize(disclaimer, contentW);
  doc.text(disclaimerLines, margin, footerY);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.setTextColor(accent);
  doc.text(siteName, pageW / 2, footerY + disclaimerLines.length * 10 + 8, { align: "center" });

  const safeDate = rateDate || new Date().toISOString().slice(0, 10);
  doc.save(`calculadora-uf-chile-${safeDate}.pdf`);
}

export function openWhatsAppShare(message: string) {
  window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
}

export function openEmailShare(message: string) {
  const subject = encodeURIComponent(`${siteName} — Conversión`);
  const body = encodeURIComponent(message);
  window.location.href = `mailto:?subject=${subject}&body=${body}`;
}
