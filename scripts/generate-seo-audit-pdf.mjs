import { jsPDF } from "jspdf";
import fs from "node:fs";
import path from "node:path";

const doc = new jsPDF({ unit: "mm", format: "a4" });
const margin = 14;
const pageW = doc.internal.pageSize.getWidth();
const maxW = pageW - margin * 2;
let y = 18;

function addTitle(text) {
  if (y > 270) {
    doc.addPage();
    y = 18;
  }
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text(text, margin, y);
  y += 8;
}

function addHeading(text) {
  if (y > 275) {
    doc.addPage();
    y = 18;
  }
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text(text, margin, y);
  y += 6;
}

function addPara(text) {
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  const lines = doc.splitTextToSize(text, maxW);
  for (const line of lines) {
    if (y > 285) {
      doc.addPage();
      y = 18;
    }
    doc.text(line, margin, y);
    y += 4.2;
  }
  y += 2;
}

function addBullet(text) {
  addPara(`- ${text}`);
}

const auditDate = "24 June 2026 (final re-audit)";

doc.setFont("helvetica", "bold");
doc.setFontSize(18);
doc.text("SEO Audit Report — Calculadora UF Chile", margin, y);
y += 8;
doc.setFont("helvetica", "normal");
doc.setFontSize(10);
doc.text(`Site: https://icalculadorauf.cl | Date: ${auditDate} | Mode: Read-only re-audit`, margin, y);
y += 10;

addTitle("Executive Summary");
addPara(
  "Final re-audit after all SEO/UX fixes in this sprint: I4 authority links, FAQ layout stability (equal column heights, no footer shift on expand, all 12 items visible), CLS skeletons for UF rate, breadcrumbs on subpages, Article schema, schema dedup, InfoCards heading fix, homepage Inicio breadcrumb removed, and AuthorByline removed. 53 checklist items pass; 31 fail or are unverifiable. Resolved: I4, G2 (subpages), G5, G7, B4, J6, FAQ CLS. Regressions: I1 (byline removed), G2 partial on homepage. Top remaining: A2/A4 title-meta lengths, F3, J2, J8, K5.",
);

addTitle("FIXES APPLIED IN THIS SPRINT (8)");
const latestFixed = [
  "I4 — Outbound links to mindicador.cl + Banco Central de Chile on /about-us and /disclaimer",
  "FAQ layout v2 — Left image column stretches to match accordion height; grid align-items: stretch on md+",
  "FAQ CLS — Reserved min-height for tallest answer; expand/collapse does not shift footer or left column",
  "FAQ list — All 12 items (01–12) visible; no internal scroll trap or clipped questions",
  "J6 — UfRatePanelSkeleton + fixed min-heights on calculator rate panel and StatsStrip chip",
  "G2/G5/G7 — Breadcrumbs on subpages, Article schema on about-us, author schema deduped",
  "B4 — InfoCards promotional titles use p.info-card-title instead of decorative H3",
  "UX removals — Homepage Inicio breadcrumb and AuthorByline removed per user request",
];
latestFixed.forEach((item) => addBullet(item));

addTitle("PASSING ITEMS (53)");
const passing = [
  "A1 — Primary keyword at start of home title — src/lib/site.ts homeTitle",
  "A2 — Title length 50–60 chars on / and /about-us (52 chars each with template)",
  "A3 — Unique title per page — buildPageMetadata on each route",
  "A5 — Unique meta descriptions — per-page in src/app/*/page.tsx",
  "A6 — Keyword variation in descriptions — UF/CLP/pesos chilenos/BCCh",
  "B1 — One H1 per page — Hero.tsx, LegalPage.tsx, author/page.tsx",
  "B2 — H1 aligned with title — homepage and subpages",
  "B3 — H2 subtopics on homepage — StatsStrip, InfoCards, CalculatorFeatures, etc.",
  "B4 — H3 for nested detail only — InfoCards cards use p; FAQ uses h3 under h2",
  "B5 — UF keyword in H2s — multiple homepage sections",
  "B6 — No skipped heading levels — logical h1→h2→h3",
  "C1 — Keyword in URLs — /about-us, /privacy-policy",
  "C2 — Lowercase hyphenated URLs — all routes",
  "C4 — Consistent legal URL pattern — kebab-case pages",
  "C5 — No indexable query-param URLs — App Router static paths",
  "D1 — Keyword in first 100 words — Hero intro paragraph",
  "D3 — Semantic keywords — UF, CLP, BCCh, inflación, arriendos",
  "D4 — Matches calculator/search intent — tool + educational sections",
  "D7 — FAQ with PAA-style questions — src/lib/faqContent.ts (12 items)",
  "D9 — Date stamp in schema — contentLastUpdated in jsonLd aboutUsArticleSchemaGraph",
  "E1 — WebP for raster assets — public/images/*.webp",
  "E3 — Descriptive ALT on images — src/lib/images.ts imageCatalog",
  "E4 — ALT reads naturally — contextual Spanish descriptions",
  "E5 — Descriptive filenames — mortgage-planning.webp, etc.",
  "E7 — OG image 1200×630 — src/lib/ogImage.tsx + metadata.ts",
  "E8 — Text not baked into images — HTML headings for main copy",
  "F1 — No orphan pages — header/footer link all routes",
  "F2 — Calculator linked from homepage — Hero #tool, footer anchors",
  "F4 — Descriptive anchors — footer/header labels in Spanish",
  "F7 — No obvious broken internal hrefs in components",
  "F9 — Link count well under 150 per page",
  "G1 — FAQ schema on homepage — src/app/page.tsx faqPageNode",
  "G2 — Breadcrumb schema + visible nav on /about-us, /contact, and legal pages — Breadcrumbs.tsx",
  "G3 — WebApplication schema — src/lib/jsonLd.ts via layout.tsx",
  "G4 — Organization schema — jsonLd organizationNode with logo, sameAs",
  "G5 — Article schema on /about-us — aboutUsArticleSchemaGraph()",
  "G7 — No duplicate/conflicting schema graphs — author page deduped",
  "H1 — Self-referencing canonical — buildPageMetadata alternates.canonical",
  "H4 — No duplicate meta titles/descriptions across pages",
  "H5 — Thin legal pages noindexed — privacy/terms/disclaimer/author index:false",
  "I2 — About Us page — /about-us",
  "I3 — Privacy + Terms in footer — navigation.ts footerLegalLinks",
  "I4 — External authority citations as links — mindicador.cl + bcentral.cl on about-us and disclaimer",
  "I6 — Contact page + mailto — contact/page.tsx support@icalculadorauf.cl",
  "J3 — Clear CTAs — header, hero CTA, footer CTA",
  "J4 — Max 3 clicks to any page — flat nav from header/footer",
  "J5 — Scannable lists/steps — HowItWorks steps, use cases, legal sections",
  "J6 — CLS guard on UF rate load + FAQ accordion min-height reserves answer space (no footer shift)",
  "J7 — Supporting images — FAQ, HowItWorks, WhyUf sections",
  "K2 — What is UF section — InfoCards ¿Qué es UF?",
  "K3 — Natural FAQ phrasing — Who/What/How questions in faqContent",
  "K4 — Step-by-step HowItWorks — 4 steps with H3 titles",
  "K7 — Conversion table — StatsStrip.tsx",
  "K8 — Key Takeaways box — KeyTakeaways.tsx on about/contact/author",
  "K9 — Result context in calculator — rate label + date + day-change slot",
  "K12 — Consistent brand naming — siteName across metadata/components",
  "K15 — Homepage indexable with crawlable text — SSR metadata + static sections",
];
passing.forEach((item) => addBullet(item));

addTitle("FAILING ITEMS (31)");
const failing = [
  "A2 — Title length 50–60 chars — contact(68), privacy(66), disclaimer(73), author(63) with template suffix",
  "A4 — Meta 140–160 chars — terms desc(167), disclaimer desc(168) exceed max",
  "A1 subpages — Not all titles start with primary keyword Calculadora UF",
  "C3 — URL max 3–4 words — /terms-and-conditions exceeds guideline",
  "D2 — Keyword density 1–2% — not measured in codebase",
  "D5 — Word count vs SERP average — no benchmark in repo",
  "D6 — Content originality — cannot verify from code alone",
  "D8 — Answer-first per H2 — most section intros are marketing not direct answers",
  "D10 — Bold/italic for answer phrases — minimal semantic emphasis",
  "E2 — Image compression — banking-finance.webp 91.8KB; why-uf-section-bg 99KB",
  "E6 — Lazy loading — header logo priority/eager; CSS backgrounds not img+lazy",
  "F3 — Internal links in first 3–4 paragraphs — Hero intro has no internal links",
  "F5 — Exact-match anchor overuse — cannot verify vs external profile",
  "F6 — Topic cluster interlinking — partial; homepage body lacks pillar→cluster links",
  "F8 — Redirect chains — not verifiable statically",
  "F10 — Related links at bottom of tool pages — only about/contact subpages",
  "G2 partial — Homepage lacks visible breadcrumb; /author JSON-LD only",
  "G5 partial — Article schema missing on /contact (supporting content)",
  "G6 — Video schema — no video content on site",
  "G8 — Rich Results validation — not run in codebase (manual step required)",
  "I1 — Author attribution on content pages — AuthorByline component removed sitewide",
  "I5 — Statistics freshness audit — static copy dates not verified to 2-year rule sitewide",
  "J1 — TOC for long pages — homepage has no table of contents",
  "J2 — Calculator above fold on mobile — hero stacks pill+H1+intro+CTA+tabs before calculator",
  "J8 — Social share buttons — footer social href=\"#\" placeholders",
  "K1 — 40–60 word concise answer at top — Hero intro is longer multi-sentence block",
  "K5 — Speakable schema — KeyTakeaways itemProp only; no SpeakableSpecification JSON-LD",
  "K6 — Self-contained H2 sections — mixed marketing vs isolated answers",
  "K10 — Citation-friendly phrasing — limited Según/Based on patterns",
  "K11 — Wikipedia/Wikidata presence — not evidenced in codebase",
  "K13 — Avoid hedging — legal copy uses puede-style hedging",
  "K14 — AI citation testing — cannot verify from repository",
];
failing.forEach((item) => addBullet(item));

doc.addPage();
y = 18;
addTitle("DEVELOPER ACTION BLOCK — REMAINING");
addPara("Completed: G2 (subpages), G5 about-us, G7, B4, J6, I4. Priority fixes still open:");

const dev = [
  [
    "A2 Title lengths",
    "Template appends ' | Calculadora UF Chile' — contact(68), privacy(66), disclaimer(73), author(63).",
    "Shorten base titles to 35–42 chars or use absoluteTitle on subpages.",
  ],
  [
    "A4 Meta too long",
    "terms (167) and disclaimer (168) descriptions exceed 160 characters.",
    "Trim descriptions to 140–160 chars in src/app/terms-and-conditions/page.tsx and disclaimer/page.tsx.",
  ],
  [
    "I1 Author byline",
    "AuthorByline removed from all pages — no visible author/date attribution on indexable content.",
    "Re-add lightweight byline on homepage or about-us if E-E-A-T attribution is required.",
  ],
  [
    "F3 Early internal links",
    "Hero first paragraphs contain no internal links to pillar sections.",
    "Add contextual links to conversion table and FAQ (/#faq) in hero intro.",
  ],
  [
    "J2 Above-fold calculator",
    "Hero order: trust pill, H1, intro, CTA, tabs, then calculator — mobile scroll required.",
    "Move calculator higher on mobile or reduce hero stack height.",
  ],
  [
    "J8 Social sharing",
    "Footer social icons use href='#'.",
    "Restore buildShareUrl() functional links or remove dead placeholder icons.",
  ],
  [
    "K5 Speakable schema",
    "itemProp='speakable' on KeyTakeaways is not valid Schema.org JSON-LD.",
    "Add SpeakableSpecification in JSON-LD with cssSelector for .key-takeaways-text.",
  ],
  [
    "E2 Image size",
    "banking-finance.webp 91.8KB; why-uf-section-bg 99KB.",
    "Recompress FAQ/background assets below 80KB in optimize-images.mjs.",
  ],
  [
    "D8 Answer-first H2",
    "Section intros are marketing copy not direct answers.",
    "Rewrite first sentence under each H2 to answer the heading directly.",
  ],
  [
    "G8 Validation",
    "No CI step for Rich Results Test.",
    "Run Google Rich Results Test on / and /about-us after schema changes.",
  ],
  [
    "K1 Concise top answer",
    "Hero paragraph exceeds 40–60 word direct-answer guideline.",
    "Add KeyTakeaways or concise answer box at top of homepage hero.",
  ],
  [
    "J1 TOC",
    "No table of contents on long homepage.",
    "Optional: anchor TOC for homepage sections over 1500 words.",
  ],
  [
    "G5 Contact schema",
    "Contact is indexable supporting page without Article/WebPage schema.",
    "Add WebPage or ContactPage schema with dateModified on /contact.",
  ],
  [
    "G2 Homepage breadcrumb",
    "Homepage Inicio breadcrumb removed — no visible breadcrumb on /.",
    "Re-add only if SEO breadcrumb trail on homepage is desired; otherwise OK.",
  ],
  [
    "Calculator H2 English",
    "Standalone Calculator section variant uses English H2 'UF ↔ CLP Tool'.",
    "Spanish H2 if standalone section is ever rendered on a route.",
  ],
];

dev.forEach(([issue, reason, solution], idx) => {
  addHeading(`${idx + 1}. ${issue}`);
  addPara(`Reason: ${reason}`);
  addPara(`Solution: ${solution}`);
  y += 1;
});

doc.addPage();
y = 18;
addTitle("COMPLETED — ALL PRIOR ACTION BLOCKS");
const completed = [
  "G2 Breadcrumbs — visible + JSON-LD on /about-us, /contact, and legal pages",
  "G7 Duplicate schema — author graph deduped via shared @id references",
  "G5 Article schema — aboutUsArticleSchemaGraph on /about-us",
  "B4 H3 usage — InfoCards card titles use p.info-card-title",
  "J6 CLS — UfRatePanelSkeleton + FAQ accordion answer-space reservation",
  "I4 Authority links — mindicador.cl + bcentral.cl on about-us and disclaimer",
  "FAQ layout — equal-height columns, full 01–12 list, stable footer on expand",
];
completed.forEach((item) => addBullet(item));

const out = path.resolve("SEO-Audit-Report-UF-Cal.pdf");
fs.writeFileSync(out, Buffer.from(doc.output("arraybuffer")));
console.log(`Wrote ${out} (${fs.statSync(out).size} bytes)`);
