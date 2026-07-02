import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { formatKb, writeWebpUnderLimit } from "./image-utils.mjs";

const imagesDir = path.resolve("public/images");
const logoWebpPath = path.resolve("public/images/site-logo.webp");
const legacyLogoWebpPath = path.resolve("public/images/logo.webp");
const faviconWebpPath = path.resolve("public/images/favicon.webp");
const appleTouchWebpPath = path.resolve("public/images/apple-touch-icon.webp");
const ogLogoPngPath = path.resolve("public/images/og-logo.png");
const ogLogoWebpPath = path.resolve("public/images/og-logo.webp");
const legacyIconPngPath = path.resolve("src/app/icon.png");
const legacyApplePngPath = path.resolve("src/app/apple-icon.png");

const ICON_BG = { r: 248, g: 237, b: 225 };

function findLogoInput() {
  const candidates = ["LOGO.webp", "LOGO.jpeg", "LOGO.jpg", "LOGO.png", "logo.webp", "logo.jpeg", "logo.jpg", "logo.png"];
  for (const name of candidates) {
    const fullPath = path.join(imagesDir, name);
    if (fs.existsSync(fullPath)) return fullPath;
  }

  if (fs.existsSync(logoWebpPath)) {
    return logoWebpPath;
  }

  throw new Error(`No LOGO file found in ${imagesDir}. Add LOGO.webp (or .jpeg/.png) or keep site-logo.webp.`);
}

function isBackgroundPixel(r, g, b) {
  const lightness = (r + g + b) / 3;
  if (r > 245 && g > 245 && b > 245) return true;
  if (lightness > 250) return true;
  const whiteDist = Math.sqrt((r - 255) ** 2 + (g - 255) ** 2 + (b - 255) ** 2);
  return whiteDist < 28;
}

async function removeWhiteBackground(buffer) {
  const { data, info } = await sharp(buffer).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  for (let i = 0; i < data.length; i += channels) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    if (isBackgroundPixel(r, g, b) || data[i + 3] < 20) {
      data[i + 3] = 0;
    }
  }

  return sharp(data, { raw: { width, height, channels } }).png();
}

async function cropToOpaqueContent(input, alphaThreshold = 28, pad = 4) {
  const pipeline = Buffer.isBuffer(input) ? sharp(input) : input;
  const { data, info } = await pipeline.clone().ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  let minX = width;
  let minY = height;
  let maxX = 0;
  let maxY = 0;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * channels;
      if (data[i + 3] > alphaThreshold) {
        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxX = Math.max(maxX, x);
        maxY = Math.max(maxY, y);
      }
    }
  }

  if (maxX < minX) {
    return pipeline.png().toBuffer();
  }

  const left = Math.max(0, minX - pad);
  const top = Math.max(0, minY - pad);
  const extractWidth = Math.min(width - left, maxX - minX + 1 + pad * 2);
  const extractHeight = Math.min(height - top, maxY - minY + 1 + pad * 2);

  if (extractWidth < 1 || extractHeight < 1) {
    return pipeline.png().toBuffer();
  }

  return pipeline.extract({ left, top, width: extractWidth, height: extractHeight }).png().toBuffer();
}

async function exportWebpIcon(pipeline, size) {
  const padding = Math.max(4, Math.round(size * 0.12));
  const inner = size - padding * 2;

  return pipeline
    .clone()
    .flatten({ background: ICON_BG })
    .resize(512, 512, {
      fit: "inside",
      withoutEnlargement: false,
      kernel: sharp.kernel.lanczos3,
      background: ICON_BG,
    })
    .sharpen({ sigma: 0.45 })
    .resize(inner, inner, {
      fit: "contain",
      background: ICON_BG,
      kernel: sharp.kernel.lanczos3,
    })
    .extend({
      top: padding,
      bottom: padding,
      left: padding,
      right: padding,
      background: ICON_BG,
    })
    .resize(size, size, { fit: "cover", kernel: sharp.kernel.lanczos3 });
}

const inputPath = findLogoInput();
console.log(`Using source: ${inputPath}`);

const input = fs.readFileSync(inputPath);
const trimmed = await sharp(input).trim({ threshold: 12 }).png().toBuffer();
const transparentLogo = await removeWhiteBackground(trimmed);
const transparentBuffer = await transparentLogo.png().toBuffer();
const croppedBuffer = await cropToOpaqueContent(transparentBuffer);
const trimmedBuffer = await sharp(croppedBuffer)
  .trim({ threshold: 8, background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toBuffer();
const logoPipeline = sharp(trimmedBuffer);

const logoResult = await writeWebpUnderLimit(logoPipeline, logoWebpPath, {
  widthSteps: [128, 96, 80],
  qualities: [92, 88, 82, 76, 70, 64],
  webp: { alphaQuality: 100, effort: 6 },
});

if (fs.existsSync(legacyLogoWebpPath)) {
  fs.unlinkSync(legacyLogoWebpPath);
}

const faviconResult = await writeWebpUnderLimit(await exportWebpIcon(logoPipeline, 48), faviconWebpPath, {
  widthSteps: [null],
  qualities: [88, 82, 76, 70, 64],
  webp: { effort: 6 },
});

const appleResult = await writeWebpUnderLimit(await exportWebpIcon(logoPipeline, 180), appleTouchWebpPath, {
  widthSteps: [null],
  qualities: [88, 82, 76, 70, 64],
  webp: { effort: 6 },
});

await logoPipeline
  .clone()
  .resize(256, 256, {
    fit: "contain",
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  })
  .png()
  .toFile(ogLogoPngPath);

const ogWebpResult = await writeWebpUnderLimit(
  sharp(ogLogoPngPath),
  ogLogoWebpPath,
  {
    widthSteps: [256, 220, 180],
    qualities: [88, 82, 76, 70],
    webp: { effort: 6 },
  },
);

for (const legacyPath of [legacyIconPngPath, legacyApplePngPath]) {
  if (fs.existsSync(legacyPath)) {
    fs.unlinkSync(legacyPath);
  }
}

console.log(
  `Wrote ${logoWebpPath} (${formatKb(logoResult.bytes)}, q${logoResult.quality}${logoResult.width ? `, ${logoResult.width}px` : ""})`,
);
console.log(`Wrote ${faviconWebpPath} (${formatKb(faviconResult.bytes)})`);
console.log(`Wrote ${appleTouchWebpPath} (${formatKb(appleResult.bytes)})`);
console.log(`Wrote ${ogLogoPngPath}`);
console.log(`Wrote ${ogLogoWebpPath} (${formatKb(ogWebpResult.bytes)})`);
