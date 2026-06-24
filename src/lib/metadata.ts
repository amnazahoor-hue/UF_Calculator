import { imageCatalog } from "@/lib/images";

export const siteOpenGraphImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: imageCatalog.ogLogo.alt,
  type: "image/webp",
} as const;

export const siteTwitterImage = siteOpenGraphImage.url;
