import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import sharp from "sharp";
import { formatKb, MAX_IMAGE_BYTES, writeWebpUnderLimit } from "./image-utils.mjs";

const imagesRoot = path.resolve("public/images");
const rasterExt = new Set([".webp", ".jpeg", ".jpg", ".png", ".gif"]);

function walkImages(dir) {
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walkImages(fullPath));
      continue;
    }
    const ext = path.extname(entry.name).toLowerCase();
    if (rasterExt.has(ext)) {
      files.push(fullPath);
    }
  }
  return files;
}

async function optimizeFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const baseName = path.basename(filePath, ext);
  const dir = path.dirname(filePath);
  const webpPath = path.join(dir, `${baseName}.webp`);
  const stats = fs.statSync(filePath);

  const metadata = await sharp(filePath).metadata();
  const widthSteps = [];

  if (metadata.width && metadata.width > 1400) widthSteps.push(1400, 1200, 1000);
  else if (metadata.width && metadata.width > 1200) widthSteps.push(1200, 1000);
  else if (metadata.width && metadata.width > 1000) widthSteps.push(1000, 900);

  widthSteps.push(null);

  const pipeline = sharp(filePath);
  const tempPath = path.join(
    os.tmpdir(),
    `uf-cal-${Date.now()}-${Math.random().toString(36).slice(2)}.webp`,
  );

  const result = await writeWebpUnderLimit(pipeline, tempPath, {
    widthSteps,
    webp: ext === ".png" || metadata.hasAlpha ? { effort: 6, alphaQuality: 100 } : { effort: 6 },
  });

  fs.renameSync(tempPath, webpPath);

  if (filePath !== webpPath && fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }

  console.log(
    `Optimized ${path.relative(process.cwd(), webpPath)}: ${formatKb(stats.size)} → ${formatKb(result.bytes)} (q${result.quality}${result.width ? `, ${result.width}px` : ""})`,
  );

  return result.bytes;
}

const files = walkImages(imagesRoot);
let overLimit = 0;

for (const file of files) {
  const size = fs.statSync(file).size;
  const ext = path.extname(file).toLowerCase();
  const needsWork = ext !== ".webp" || size > MAX_IMAGE_BYTES;

  if (!needsWork) {
    console.log(`OK ${path.relative(process.cwd(), file)} (${formatKb(size)})`);
    continue;
  }

  await optimizeFile(file);

  const outputPath =
    ext === ".webp" ? file : path.join(path.dirname(file), `${path.basename(file, ext)}.webp`);
  if (fs.statSync(outputPath).size > MAX_IMAGE_BYTES) {
    overLimit += 1;
    console.error(`Still over limit: ${outputPath}`);
  }
}

if (overLimit > 0) {
  process.exit(1);
}

console.log("All images in public/images are WebP and ≤ 100 KB.");
