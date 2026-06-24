import type { Metadata } from "next";
import { siteOpenGraphImage, siteTwitterImage } from "@/lib/metadata";
import { siteName, siteUrl } from "@/lib/site";

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  index?: boolean;
  /** Home uses absolute title without template suffix */
  absoluteTitle?: boolean;
};

export function buildPageMetadata({
  title,
  description,
  path,
  index = true,
  absoluteTitle = false,
}: PageMetadataInput): Metadata {
  const canonicalPath = path.startsWith("/") ? path : `/${path}`;
  const canonicalUrl = `${siteUrl}${canonicalPath === "/" ? "" : canonicalPath}`;
  const ogTitle = absoluteTitle || canonicalPath === "/" ? title : `${title} | ${siteName}`;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: canonicalUrl },
    robots: { index, follow: true },
    openGraph: {
      title: ogTitle,
      description,
      url: canonicalUrl,
      images: [siteOpenGraphImage],
    },
    twitter: {
      title: ogTitle,
      description,
      images: [siteTwitterImage],
    },
  };
}
