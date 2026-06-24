import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const inputPath = path.resolve("public/images/LOGO.jpeg");
const logoWebpPath = path.resolve("public/images/logo.webp");
const iconPath = path.resolve("src/app/icon.png");
const appleIconPath = path.resolve("src/app/apple-icon.png");

function colorDistance(r1, g1, b1, r2, g2, b2) {
  return Math.sqrt((r1 - r2) ** 2 + (g1 - g2) ** 2 + (b1 - b2) ** 2);
}

function pixelLightness(r, g, b) {
  return (r + g + b) / 3;
}

function pixelSaturation(r, g, b) {
  return Math.max(r, g, b) - Math.min(r, g, b);
}

function isBackgroundPixel(r, g, b) {
  const lightness = pixelLightness(r, g, b);
  const saturation = pixelSaturation(r, g, b);
  const min = Math.min(r, g, b);

  if (min > 205 && saturation < 55) return true;
  if (lightness > 198 && saturation < 48) return true;
  if (lightness > 178 && saturation < 30) return true;
  if (r > 215 && g > 215 && b > 215) return true;

  const whiteDist = colorDistance(r, g, b, 255, 255, 255);
  if (whiteDist < 70) return true;

  const cardDist = colorDistance(r, g, b, 245, 245, 245);
  if (cardDist < 42) return true;

  return false;
}

function cleanupFringe(data, width, height, channels) {
  const alphaAt = (x, y) => data[(y * width + x) * channels + 3];

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * channels;
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      if (data[i + 3] === 0) continue;

      let transparentNeighbors = 0;
      for (const [nx, ny] of [
        [x - 1, y],
        [x + 1, y],
        [x, y - 1],
        [x, y + 1],
      ]) {
        if (nx < 0 || ny < 0 || nx >= width || ny >= height) {
          transparentNeighbors++;
          continue;
        }
        if (alphaAt(nx, ny) < 20) transparentNeighbors++;
      }

      if (transparentNeighbors === 0) continue;

      const lightness = pixelLightness(r, g, b);
      const saturation = pixelSaturation(r, g, b);

      if (isBackgroundPixel(r, g, b)) {
        data[i + 3] = 0;
        continue;
      }

      if (lightness > 150 && saturation < 70) {
        const fade = Math.min(1, transparentNeighbors / 2 + (lightness - 150) / 90);
        data[i + 3] = Math.round(data[i + 3] * (1 - fade));
      }
    }
  }
}

async function removeBackground(buffer) {
  const { data, info } = await sharp(buffer).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  for (let i = 0; i < data.length; i += channels) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    if (isBackgroundPixel(r, g, b)) {
      data[i + 3] = 0;
    }
  }

  cleanupFringe(data, width, height, channels);
  cleanupFringe(data, width, height, channels);

  return sharp(data, { raw: { width, height, channels } }).png();
}

async function exportWebpUnderLimit(pngPipeline, maxBytes = 100 * 1024) {
  const sizes = [512, 384, 320, 256];
  const qualities = [88, 82, 76, 70, 64, 58];

  for (const size of sizes) {
    for (const quality of qualities) {
      const buffer = await pngPipeline
        .clone()
        .resize(size, size, { fit: "inside", withoutEnlargement: true })
        .webp({ quality, alphaQuality: 100, effort: 6 })
        .toBuffer();

      if (buffer.length <= maxBytes) {
        return { buffer, bytes: buffer.length };
      }
    }
  }

  const buffer = await pngPipeline
    .clone()
    .resize(256, 256, { fit: "inside", withoutEnlargement: true })
    .webp({ quality: 50, alphaQuality: 100, effort: 6 })
    .toBuffer();

  return { buffer, bytes: buffer.length };
}

async function exportSquareIcon(pngPipeline, size) {
  const iconSize = Math.round(size * 0.9);
  const offset = Math.round((size - iconSize) / 2);

  return pngPipeline
    .clone()
    .resize(iconSize, iconSize, { fit: "inside", withoutEnlargement: true })
    .extend({
      top: offset,
      bottom: size - iconSize - offset,
      left: offset,
      right: size - iconSize - offset,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png({ compressionLevel: 9 })
    .toBuffer();
}

const input = fs.readFileSync(inputPath);
const trimmed = await sharp(input).trim({ threshold: 12 }).toBuffer();
const transparent = await removeBackground(trimmed);
const tightLogo = transparent.trim({ threshold: 1 });

const logoResult = await exportWebpUnderLimit(tightLogo);
fs.writeFileSync(logoWebpPath, logoResult.buffer);
fs.writeFileSync(iconPath, await exportSquareIcon(tightLogo, 32));
fs.writeFileSync(appleIconPath, await exportSquareIcon(tightLogo, 180));

console.log(`Wrote ${logoWebpPath} (${logoResult.bytes} bytes)`);
