import type { MetadataRoute } from "next";
import { contentLastUpdated, siteUrl } from "@/lib/site";

const lastModified = new Date(contentLastUpdated);

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl;

  return [
    { url: `${base}/`, lastModified, changeFrequency: "daily", priority: 1 },
    { url: `${base}/about-us`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/contact`, lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/author`, lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/privacy-policy`, lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/terms-and-conditions`, lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/disclaimer`, lastModified, changeFrequency: "yearly", priority: 0.3 },
  ];
}
