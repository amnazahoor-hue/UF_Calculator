import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl;
  return [
    { url: `${base}/`, changeFrequency: "daily", priority: 1 },
    { url: `${base}/privacy-policy`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/terms-and-conditions`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/disclaimer`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/contact`, changeFrequency: "monthly", priority: 0.6 },
  ];
}
