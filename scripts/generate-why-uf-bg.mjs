import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { formatKb, writeWebpUnderLimit } from "./image-utils.mjs";

const WIDTH = 1200;
const HEIGHT = 900;
const outputPath = path.resolve("public/images/why-uf-section-bg.webp");

const ORANGE = "#e8744a";
const ORANGE_LIGHT = "#f2a07b";
const CREAM = "#f8ede1";
const CREAM_DEEP = "#f3e2d0";
const INK_SOFT = "#6b6b6b";

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <defs>
    <linearGradient id="base" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${CREAM}" stop-opacity="0"/>
      <stop offset="28%" stop-color="${CREAM}" stop-opacity="0.15"/>
      <stop offset="55%" stop-color="${CREAM_DEEP}" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="${ORANGE_LIGHT}" stop-opacity="0.42"/>
    </linearGradient>
    <radialGradient id="glowA" cx="78%" cy="38%" r="42%">
      <stop offset="0%" stop-color="${ORANGE}" stop-opacity="0.28"/>
      <stop offset="100%" stop-color="${CREAM}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glowB" cx="92%" cy="78%" r="36%">
      <stop offset="0%" stop-color="${ORANGE_LIGHT}" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="${CREAM_DEEP}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="fadeLeft" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${CREAM}" stop-opacity="1"/>
      <stop offset="22%" stop-color="${CREAM}" stop-opacity="0.92"/>
      <stop offset="42%" stop-color="${CREAM}" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${ORANGE_LIGHT}" stop-opacity="0.2"/>
      <stop offset="100%" stop-color="${ORANGE}"/>
    </linearGradient>
    <linearGradient id="areaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="${ORANGE}" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="${ORANGE}" stop-opacity="0"/>
    </linearGradient>
    <pattern id="grid" width="36" height="36" patternUnits="userSpaceOnUse">
      <path d="M 36 0 L 0 0 0 36" fill="none" stroke="${ORANGE}" stroke-opacity="0.08" stroke-width="1"/>
    </pattern>
  </defs>

  <rect width="100%" height="100%" fill="url(#base)"/>
  <rect x="320" width="880" height="100%" fill="url(#grid)"/>
  <rect width="100%" height="100%" fill="url(#glowA)"/>
  <rect width="100%" height="100%" fill="url(#glowB)"/>

  <g transform="translate(520, 120)" opacity="0.95">
    <path
      d="M 40 520 C 180 470, 300 430, 420 360 S 620 250, 700 170"
      fill="none"
      stroke="url(#lineGrad)"
      stroke-width="7"
      stroke-linecap="round"
    />
    <path
      d="M 40 520 C 180 470, 300 430, 420 360 S 620 250, 700 170 L 700 560 L 40 560 Z"
      fill="url(#areaGrad)"
    />
    <circle cx="40" cy="520" r="10" fill="${ORANGE_LIGHT}" fill-opacity="0.85"/>
    <circle cx="300" cy="430" r="9" fill="${ORANGE}" fill-opacity="0.8"/>
    <circle cx="520" cy="290" r="9" fill="${ORANGE}" fill-opacity="0.8"/>
    <circle cx="700" cy="170" r="12" fill="${ORANGE}" stroke="#ffffff" stroke-width="3"/>
  </g>

  <g transform="translate(780, 520)" opacity="0.88">
    <circle cx="0" cy="0" r="118" fill="none" stroke="${ORANGE_LIGHT}" stroke-width="3" stroke-opacity="0.45"/>
    <circle cx="0" cy="0" r="88" fill="${ORANGE}" fill-opacity="0.1"/>
    <path d="M -72 0 A 72 72 0 1 1 72 0" fill="none" stroke="${ORANGE}" stroke-width="8" stroke-linecap="round" stroke-opacity="0.75"/>
    <text x="0" y="10" font-family="Arial, Helvetica, sans-serif" font-size="42" font-weight="800" fill="${ORANGE}" text-anchor="middle">UF</text>
    <text x="0" y="48" font-family="Arial, Helvetica, sans-serif" font-size="13" font-weight="700" fill="${INK_SOFT}" text-anchor="middle" letter-spacing="3">VALOR DIARIO</text>
  </g>

  <g transform="translate(600, 620)" opacity="0.9">
    <rect x="0" y="0" width="520" height="14" rx="7" fill="${CREAM_DEEP}" fill-opacity="0.85"/>
    <rect x="0" y="0" width="360" height="14" rx="7" fill="${ORANGE}" fill-opacity="0.72"/>
    <circle cx="360" cy="7" r="18" fill="${ORANGE}" stroke="#ffffff" stroke-width="4"/>
    <text x="0" y="48" font-family="Arial, Helvetica, sans-serif" font-size="20" font-weight="700" fill="${ORANGE}">Día 10</text>
    <text x="520" y="48" font-family="Arial, Helvetica, sans-serif" font-size="20" font-weight="700" fill="${ORANGE}" text-anchor="end">Día 9</text>
    <text x="260" y="78" font-family="Arial, Helvetica, sans-serif" font-size="14" fill="${INK_SOFT}" text-anchor="middle">Ciclo Banco Central · IPC</text>
  </g>

  <g transform="translate(940, 140)" opacity="0.75">
    <text font-family="Arial, Helvetica, sans-serif" font-size="15" font-weight="700" fill="${ORANGE}" letter-spacing="4">IPC</text>
    <path d="M 0 24 L 0 88 M -18 52 L 0 24 L 18 52" fill="none" stroke="${ORANGE}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    <text x="36" y="72" font-family="Arial, Helvetica, sans-serif" font-size="13" fill="${INK_SOFT}">INE</text>
    <text x="36" y="92" font-family="Arial, Helvetica, sans-serif" font-size="13" fill="${INK_SOFT}">BCCh</text>
  </g>

  <g opacity="0.18">
    <text x="980" y="820" font-family="Arial, Helvetica, sans-serif" font-size="120" font-weight="800" fill="${ORANGE}">UF</text>
  </g>

  <rect width="100%" height="100%" fill="url(#fadeLeft)"/>
</svg>`;

await writeWebpUnderLimit(sharp(Buffer.from(svg)), outputPath, {
  widthSteps: [1200, 1100, 1000, 900],
  qualities: [88, 84, 80, 76, 72, 68, 64, 58],
});

const stats = fs.statSync(outputPath);
console.log(`Wrote ${outputPath} (${formatKb(stats.size)})`);
