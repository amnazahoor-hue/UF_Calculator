import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { formatKb, writeWebpUnderLimit } from "./image-utils.mjs";

const outDir = path.resolve("public/images/faq");
const WIDTH = 960;
const HEIGHT = 640;

const faqImages = [
  {
    file: "mortgage-planning.webp",
    url: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600&auto=format&fit=crop&q=85",
  },
  {
    file: "banking-finance.webp",
    url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&auto=format&fit=crop&q=85",
  },
  {
    file: "finance-education.webp",
    url: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1600&auto=format&fit=crop&q=85",
  },
  {
    file: "questions-answers.webp",
    url: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&auto=format&fit=crop&q=85",
  },
];

const legacyFiles = ["financial-meeting.webp", "market-analysis.webp", "ask-question.webp"];

fs.mkdirSync(outDir, { recursive: true });

for (const legacy of legacyFiles) {
  const legacyPath = path.join(outDir, legacy);
  if (fs.existsSync(legacyPath)) {
    fs.unlinkSync(legacyPath);
  }
}

for (const image of faqImages) {
  const outputPath = path.join(outDir, image.file);
  if (fs.existsSync(outputPath)) {
    console.log(`Skip ${image.file} (already exists)`);
    continue;
  }

  const response = await fetch(image.url);
  if (!response.ok) {
    throw new Error(`Failed to download ${image.url}: ${response.status}`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());

  const pipeline = sharp(buffer)
    .resize(WIDTH, HEIGHT, { fit: "cover", position: "center", kernel: sharp.kernel.lanczos3 })
    .sharpen({ sigma: 0.35 });

  const result = await writeWebpUnderLimit(pipeline, outputPath, {
    widthSteps: [960, 880, 800, 720],
    qualities: [84, 80, 76, 72, 68, 64, 58, 52],
  });

  console.log(`Wrote ${outputPath} (${formatKb(result.bytes)}, q${result.quality})`);
}

console.log("FAQ images ready.");
