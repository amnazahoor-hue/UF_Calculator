import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const WIDTH = 1920;
const HEIGHT = 1080;
const outputPath = path.resolve("public/images/conversion-table-bg.webp");

const ORANGE = "#e8744a";
const ORANGE_LIGHT = "#f2a07b";
const BLACK = "#121212";
const BLACK_SOFT = "#1a1a1a";

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <defs>
    <linearGradient id="base" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${BLACK}"/>
      <stop offset="50%" stop-color="${BLACK_SOFT}"/>
      <stop offset="100%" stop-color="${BLACK}"/>
    </linearGradient>
    <linearGradient id="glow" x1="0%" y1="50%" x2="100%" y2="50%">
      <stop offset="0%" stop-color="${ORANGE}" stop-opacity="0"/>
      <stop offset="50%" stop-color="${ORANGE}" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="${ORANGE}" stop-opacity="0"/>
    </linearGradient>
    <radialGradient id="spot" cx="72%" cy="38%" r="42%">
      <stop offset="0%" stop-color="${ORANGE}" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="${BLACK}" stop-opacity="0"/>
    </radialGradient>
    <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M 48 0 L 0 0 0 48" fill="none" stroke="${ORANGE}" stroke-opacity="0.14" stroke-width="1"/>
    </pattern>
  </defs>

  <rect width="100%" height="100%" fill="url(#base)"/>
  <rect width="100%" height="100%" fill="url(#grid)"/>
  <rect width="100%" height="100%" fill="url(#spot)"/>
  <rect x="0" y="420" width="100%" height="240" fill="url(#glow)"/>

  <text x="120" y="220" font-family="Arial, Helvetica, sans-serif" font-size="148" font-weight="700" fill="${ORANGE}" fill-opacity="0.22" letter-spacing="8">UF</text>
  <text x="1520" y="900" font-family="Arial, Helvetica, sans-serif" font-size="118" font-weight="700" fill="${ORANGE}" fill-opacity="0.18" letter-spacing="6">CLP</text>

  <g transform="translate(1180, 180)">
    <path
      d="M 40 620 C 140 560, 220 500, 300 430 S 460 300, 520 220 S 620 120, 700 80"
      fill="none"
      stroke="${ORANGE}"
      stroke-opacity="0.72"
      stroke-width="5"
      stroke-linecap="round"
    />
    <circle cx="40" cy="620" r="14" fill="${ORANGE}" fill-opacity="0.85" stroke="${BLACK_SOFT}" stroke-width="3"/>
    <circle cx="300" cy="430" r="14" fill="${ORANGE}" fill-opacity="0.85" stroke="${BLACK_SOFT}" stroke-width="3"/>
    <circle cx="520" cy="220" r="14" fill="${ORANGE}" fill-opacity="0.85" stroke="${BLACK_SOFT}" stroke-width="3"/>
    <circle cx="700" cy="80" r="16" fill="${ORANGE_LIGHT}" fill-opacity="0.9" stroke="${BLACK_SOFT}" stroke-width="3"/>
  </g>

  <g transform="translate(80, 520)" opacity="0.82">
    <path
      d="M 0 180 L 120 140 L 240 155 L 360 95 L 480 110 L 600 40"
      fill="none"
      stroke="${ORANGE_LIGHT}"
      stroke-opacity="0.75"
      stroke-width="4"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <circle cx="0" cy="180" r="10" fill="${ORANGE_LIGHT}" fill-opacity="0.9"/>
    <circle cx="240" cy="155" r="10" fill="${ORANGE}" fill-opacity="0.9"/>
    <circle cx="480" cy="110" r="10" fill="${ORANGE_LIGHT}" fill-opacity="0.9"/>
    <circle cx="600" cy="40" r="12" fill="${ORANGE}" fill-opacity="0.95"/>
  </g>

  <g transform="translate(220, 640)" opacity="0.38">
    <rect x="0" y="0" width="220" height="280" rx="24" fill="none" stroke="${ORANGE}" stroke-width="4"/>
    <rect x="24" y="24" width="172" height="56" rx="12" fill="none" stroke="${ORANGE_LIGHT}" stroke-width="3"/>
    <rect x="24" y="104" width="48" height="48" rx="10" fill="${ORANGE}" fill-opacity="0.55"/>
    <rect x="86" y="104" width="48" height="48" rx="10" fill="none" stroke="${ORANGE_LIGHT}" stroke-width="2.5"/>
    <rect x="148" y="104" width="48" height="48" rx="10" fill="none" stroke="${ORANGE_LIGHT}" stroke-width="2.5"/>
    <rect x="24" y="168" width="48" height="48" rx="10" fill="none" stroke="${ORANGE_LIGHT}" stroke-width="2.5"/>
    <rect x="86" y="168" width="48" height="48" rx="10" fill="none" stroke="${ORANGE_LIGHT}" stroke-width="2.5"/>
    <rect x="148" y="168" width="48" height="48" rx="10" fill="${ORANGE}" fill-opacity="0.55"/>
    <rect x="24" y="232" width="110" height="48" rx="10" fill="none" stroke="${ORANGE_LIGHT}" stroke-width="2.5"/>
    <rect x="148" y="232" width="48" height="48" rx="10" fill="${ORANGE}" fill-opacity="0.7"/>
  </g>

  <g transform="translate(980, 760)" opacity="0.55">
    <circle cx="80" cy="80" r="72" fill="none" stroke="${ORANGE}" stroke-width="5"/>
    <path d="M 80 28 L 80 132 M 52 56 L 80 28 L 108 56" fill="none" stroke="${ORANGE}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M 28 80 L 132 80 M 104 52 L 132 80 L 104 108" fill="none" stroke="${ORANGE_LIGHT}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
  </g>

  <g transform="translate(1460, 520)" opacity="0.48">
    <ellipse cx="50" cy="118" rx="54" ry="14" fill="${ORANGE}"/>
    <rect x="0" y="78" width="100" height="40" fill="${ORANGE}"/>
    <ellipse cx="50" cy="78" rx="54" ry="14" fill="${ORANGE_LIGHT}"/>
    <ellipse cx="50" cy="58" rx="54" ry="14" fill="${ORANGE}"/>
    <rect x="0" y="18" width="100" height="40" fill="${ORANGE}"/>
    <ellipse cx="50" cy="18" rx="54" ry="14" fill="${ORANGE_LIGHT}"/>
  </g>
</svg>`;

await sharp(Buffer.from(svg))
  .webp({ quality: 88, effort: 6 })
  .toFile(outputPath);

const stats = fs.statSync(outputPath);
console.log(`Wrote ${outputPath} (${Math.round(stats.size / 1024)} KB)`);
