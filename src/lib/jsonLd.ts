import { defaultDescription, siteName, siteUrl } from "./site";

export const webSiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteName,
  url: siteUrl,
  description: defaultDescription,
  inLanguage: "en",
};

export const webApplicationJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: siteName,
  url: siteUrl,
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "CLP",
  },
  description: defaultDescription,
  featureList: [
    "Real-time UF to CLP conversion",
    "CLP to UF conversion",
    "Live UF rate from Chile public indicators",
    "Share and PDF export",
  ],
};
