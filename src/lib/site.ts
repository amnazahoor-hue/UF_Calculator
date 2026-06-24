export const siteUrl = "https://icalculadorauf.cl";
export const siteName = "Calculadora UF Chile";
export const siteShortName = "Calculadora UF";
export const contactEmail = "support@icalculadorauf.cl";
export const contentLastUpdated = "2026-06-24";

/** Referencia pública del valor UF (mindicador — datos vinculados al BCCh) */
export const officialUfRateUrl = "https://mindicador.cl";
export const bcchUrl = "https://www.bcentral.cl";
export const bcchUfUrl =
  "https://www.bcentral.cl/web/banco-central/area/estadisticas-y-publicaciones/indicadores-y-estadisticas/cuentas-nacionales/unidad-de-fomento";

export const homeTitle = "Calculadora UF Chile | Convierte UF a CLP y CLP a UF";
export const homeDescription =
  "Calculadora UF Chile gratuita: convierte UF a pesos chilenos y CLP a UF con el valor oficial del día. Datos públicos del BCCh, sin registro ni costo.";

export const defaultDescription = homeDescription;

/** Perfiles sociales y enlaces de compartir funcionales */
export const socialProfiles = {
  x: "https://x.com/ufcalculatorcl",
  facebook: "https://www.facebook.com/sharer/sharer.php",
  reddit: "https://www.reddit.com/submit",
  youtube: "https://www.youtube.com",
  instagram: "https://www.instagram.com",
  pinterest: "https://pinterest.com/pin/create/button/",
  quora: "https://www.quora.com",
} as const;

export function buildShareUrl(platform: keyof typeof socialProfiles, pageUrl = siteUrl) {
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
    default:
      return socialProfiles[platform];
  }
}
