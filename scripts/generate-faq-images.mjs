import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { formatKb, writeWebpUnderLimit } from "./image-utils.mjs";

const sourceDir = path.resolve("scripts/faq-source");
const outDir = path.resolve("public/images/faq");
const WIDTH = 960;
const HEIGHT = 640;

const faqImages = [
  { file: "mortgage-planning.webp", source: "mortgage-planning.png" },
  { file: "banking-finance.webp", source: "banking-finance.png" },
  { file: "finance-education.webp", source: "finance-education.png" },
  { file: "questions-answers.webp", source: "questions-answers.png" },
];

fs.mkdirSync(outDir, { recursive: true });

for (const image of faqImages) {
  const sourcePath = path.join(sourceDir, image.source);
  const outputPath = path.join(outDir, image.file);

  if (!fs.existsSync(sourcePath)) {
    throw new Error(`Missing FAQ source image: ${sourcePath}`);
  }

  const pipeline = sharp(sourcePath)
    .resize(WIDTH, HEIGHT, { fit: "cover", position: "center", kernel: sharp.kernel.lanczos3 })
    .sharpen({ sigma: 0.35 });

  const result = await writeWebpUnderLimit(pipeline, outputPath, {
    widthSteps: [960, 880, 800, 720],
    qualities: [84, 80, 76, 72, 68, 64, 58, 52],
  });

  console.log(`Wrote ${outputPath} (${formatKb(result.bytes)}, q${result.quality})`);
}

console.log("FAQ images ready.");
