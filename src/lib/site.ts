/** Canonical production URL — used for sitemap, canonical tags, JSON-LD, and sharing. */
export const canonicalSiteUrl = "https://icalculadorauf.cl";

function resolveSiteUrl() {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (fromEnv) return fromEnv;

  return canonicalSiteUrl;
}

export const siteUrl = resolveSiteUrl();
export const siteName = "Calculadora UF Chile";
export const siteShortName = "Calculadora UF";
export const contactEmail = "support@icalculadorauf.cl";
export const contentLastUpdated = "2026-06-24";

/** Referencia pública del valor UF (mindicador — datos vinculados al BCCh) */
export const officialUfRateUrl = "https://mindicador.cl";
export const bcchUrl = "https://www.bcentral.cl";
export const ineUrl = "https://www.ine.gob.cl";
export const bcchUfUrl =
  "https://www.bcentral.cl/web/banco-central/area/estadisticas-y-publicaciones/indicadores-y-estadisticas/cuentas-nacionales/unidad-de-fomento";

export const homeTitle = "Calculadora UF Chile | Convierte UF a CLP y CLP a UF";
export const homeDescription =
  "Calculadora UF Chile gratuita: convierte UF a pesos chilenos y CLP a UF con el valor oficial del día. Datos públicos del BCCh, sin registro ni costo.";

export const defaultDescription = homeDescription;

/** Official social profile URLs (footer links + Schema.org sameAs). */
export const socialProfiles = {
  instagram: "https://www.instagram.com/calculadorauf/",
  x: "https://x.com/Calculadorauf",
  reddit: "https://www.reddit.com/user/Calculadorauf/",
  quora: "https://www.quora.com/profile/Calculadorauf",
  youtube: "https://www.youtube.com/@Calculadorauf-l4b",
  pinterest: "https://www.pinterest.com/Calculadorauf/",
  facebook: "https://www.facebook.com/share/1E8ZvYnLyb/",
} as const;

export const socialProfileUrls = Object.values(socialProfiles);

/** Share-intent URLs for spreading a page link on social platforms. */
export function buildShareUrl(platform: "x" | "facebook" | "reddit" | "pinterest", pageUrl = siteUrl) {
  const encodedUrl = encodeURIComponent(pageUrl);
  const encodedText = encodeURIComponent(`${siteName} — convierte UF y pesos chilenos al instante`);

  switch (platform) {
    case "x":
      return `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`;
    case "facebook":
      return `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
    case "reddit":
      return `https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedText}`;
    case "pinterest":
      return `https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedText}`;
  }
}
