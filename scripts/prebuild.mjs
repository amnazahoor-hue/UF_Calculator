import { execSync } from "node:child_process";

const isVercel = process.env.VERCEL === "1" || Boolean(process.env.VERCEL_ENV);

if (isVercel) {
  console.log("Vercel build: using committed assets, skipping local prebuild steps.");
  process.exit(0);
}

const steps = [
  "npm run generate:why-uf-bg",
  "npm run process:logo",
  "npm run generate:faq-images",
  "npm run optimize:images",
];

for (const step of steps) {
  execSync(step, { stdio: "inherit", env: process.env });
}
