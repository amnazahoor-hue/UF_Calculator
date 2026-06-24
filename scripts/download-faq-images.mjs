import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const outDir = path.resolve("public/images/faq");

const faqImages = [
  {
    file: "mortgage-planning.webp",
    url: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=900&auto=format&fit=crop&q=80",
    alt: "Planificación hipotecaria y vivienda en UF",
  },
  {
    file: "banking-finance.webp",
    url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&auto=format&fit=crop&q=80",
    alt: "Sector financiero y valor de la UF en Chile",
  },
  {
    file: "financial-meeting.webp",
    url: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=900&auto=format&fit=crop&q=80",
    alt: "Reunión financiera para resolver dudas sobre la UF",
  },
  {
    file: "market-analysis.webp",
    url: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=900&auto=format&fit=crop&q=80",
    alt: "Análisis de mercado y evolución del valor UF",
  },
];

fs.mkdirSync(outDir, { recursive: true });

for (const image of faqImages) {
  const response = await fetch(image.url);
  if (!response.ok) {
    throw new Error(`Failed to download ${image.url}: ${response.status}`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  const outputPath = path.join(outDir, image.file);

  await sharp(buffer)
    .resize(612, 408, { fit: "cover", position: "center" })
    .webp({ quality: 82, effort: 6 })
    .toFile(outputPath);

  const stats = fs.statSync(outputPath);
  console.log(`Wrote ${outputPath} (${Math.round(stats.size / 1024)} KB)`);
}

console.log("FAQ images ready.");
