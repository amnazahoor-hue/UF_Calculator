import { siteUrl } from "@/lib/site";

/** Primary locale for this Spanish (Chile) site. */
export const sitePrimaryLocale = "es-CL";

/** ISO hreflang codes emitted for every indexable URL. */
export const siteHrefLangCodes = ["es", "es-CL", "x-default"] as const;

function resolveCanonicalUrl(path: string) {
  const canonicalPath = path.startsWith("/") ? path : `/${path}`;
  return `${siteUrl}${canonicalPath === "/" ? "" : canonicalPath}`;
}

/** Self-referencing hreflang alternates for a monolingual Chilean Spanish site. */
export function buildHrefLangAlternates(path: string) {
  const canonicalUrl = resolveCanonicalUrl(path);

  return {
    canonical: canonicalUrl,
    languages: {
      es: canonicalUrl,
      "es-CL": canonicalUrl,
      "x-default": canonicalUrl,
    },
  };
}
