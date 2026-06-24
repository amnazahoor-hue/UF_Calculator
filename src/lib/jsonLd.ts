import { buildFaqItems } from "@/lib/faqContent";
import { siteAuthor } from "@/lib/author";
import {
  bcchUrl,
  contactEmail,
  contentLastUpdated,
  defaultDescription,
  homeTitle,
  officialUfRateUrl,
  siteName,
  siteUrl,
  socialProfiles,
} from "@/lib/site";

const organizationId = `${siteUrl}/#organization`;
const webPageId = `${siteUrl}/#webpage`;
const webApplicationId = `${siteUrl}/#webapplication`;
const authorPersonId = `${siteUrl}/author#person`;

const toolFeatures = [
  "Conversión UF a pesos chilenos (CLP) en tiempo real",
  "Conversión CLP a UF",
  "Valor UF del día con historial reciente",
  "Tabla de conversión de referencia",
  "Compartir resultados por WhatsApp, correo o PDF",
  "Sin registro ni costo",
] as const;

const authorKnowsAbout = [
  "Unidad de Fomento (UF)",
  "Contratos indexados en Chile",
  "Créditos hipotecarios en UF",
  "Arriendos y reajustes en UF",
  "Finanzas personales en Chile",
] as const;

export type BreadcrumbItem = {
  name: string;
  path: string;
};

export function absoluteSiteUrl(path = "/") {
  if (path === "/" || path === "") return siteUrl;
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export function jsonLdGraph(...nodes: Record<string, unknown>[]) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes,
  };
}

function organizationNode() {
  return {
    "@type": "Organization",
    "@id": organizationId,
    name: siteName,
    url: siteUrl,
    logo: {
      "@type": "ImageObject",
      url: absoluteSiteUrl("/images/site-logo.webp"),
    },
    description: defaultDescription,
    email: contactEmail,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: contactEmail,
      availableLanguage: ["Spanish", "es"],
    },
    sameAs: [
      socialProfiles.x,
      socialProfiles.youtube,
      socialProfiles.instagram,
      officialUfRateUrl,
      bcchUrl,
    ],
  };
}

function webPageNode(path = "/") {
  const pageUrl = absoluteSiteUrl(path);

  return {
    "@type": "WebPage",
    "@id": path === "/" ? webPageId : `${pageUrl}#webpage`,
    url: pageUrl,
    name: path === "/" ? homeTitle : siteName,
    description: defaultDescription,
    inLanguage: "es-CL",
    dateModified: contentLastUpdated,
    publisher: { "@id": organizationId },
    mainEntity: { "@id": webApplicationId },
  };
}

function webApplicationNode() {
  return {
    "@type": "WebApplication",
    "@id": webApplicationId,
    name: siteName,
    url: siteUrl,
    applicationCategory: "FinanceApplication",
    applicationSubCategory: "Currency Converter",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    countriesSupported: "CL",
    inLanguage: "es-CL",
    isAccessibleForFree: true,
    description: defaultDescription,
    featureList: [...toolFeatures],
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "CLP",
    },
    provider: { "@id": organizationId },
    publisher: { "@id": organizationId },
    isPartOf: { "@id": webPageId },
    mainEntityOfPage: { "@id": webPageId },
  };
}

export function breadcrumbListNode(items: BreadcrumbItem[]) {
  const pagePath = items[items.length - 1]?.path ?? "/";

  return {
    "@type": "BreadcrumbList",
    "@id": `${absoluteSiteUrl(pagePath)}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteSiteUrl(item.path),
    })),
  };
}

export function faqPageNode(rate: number) {
  return {
    "@type": "FAQPage",
    "@id": `${siteUrl}/#faq`,
    url: `${siteUrl}/#faq`,
    isPartOf: { "@id": webPageId },
    mainEntity: buildFaqItems(rate).map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}

type SiteSchemaOptions = {
  breadcrumbs?: BreadcrumbItem[];
  faqRate?: number;
  pagePath?: string;
  additionalNodes?: Record<string, unknown>[];
};

export function standaloneJsonLd(node: Record<string, unknown>) {
  return {
    "@context": "https://schema.org",
    ...node,
  };
}

export function siteSchemaGraph(options: SiteSchemaOptions = {}) {
  const pagePath = options.pagePath ?? "/";
  const graph: Record<string, unknown>[] = [
    organizationNode(),
    webPageNode(pagePath),
    webApplicationNode(),
  ];

  if (options.breadcrumbs?.length) {
    graph.push(breadcrumbListNode(options.breadcrumbs));
  }

  if (typeof options.faqRate === "number") {
    graph.push(faqPageNode(options.faqRate));
  }

  if (options.additionalNodes?.length) {
    graph.push(...options.additionalNodes);
  }

  return jsonLdGraph(...graph);
}

/** Homepage: five root-level schemas in one JSON-LD array for Schema.org Validator. */
export function homePageSchemas(faqRate: number) {
  const pageUrl = siteUrl;
  const breadcrumbs = [{ name: "Inicio", path: "/" }];

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteName,
    url: pageUrl,
    logo: {
      "@type": "ImageObject",
      url: absoluteSiteUrl("/images/site-logo.webp"),
    },
    description: defaultDescription,
    email: contactEmail,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: contactEmail,
      availableLanguage: ["Spanish", "es"],
    },
    sameAs: [
      socialProfiles.x,
      socialProfiles.youtube,
      socialProfiles.instagram,
      officialUfRateUrl,
      bcchUrl,
    ],
  };

  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    url: pageUrl,
    name: homeTitle,
    description: defaultDescription,
    inLanguage: "es-CL",
    dateModified: contentLastUpdated,
  };

  const webApplication = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: siteName,
    url: pageUrl,
    applicationCategory: "FinanceApplication",
    applicationSubCategory: "Currency Converter",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    countriesSupported: "CL",
    inLanguage: "es-CL",
    isAccessibleForFree: true,
    description: defaultDescription,
    featureList: [...toolFeatures],
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "CLP",
    },
  };

  const breadcrumbsSchema = {
    "@context": "https://schema.org",
    ...breadcrumbListNode(breadcrumbs),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    url: `${pageUrl}/#faq`,
    mainEntity: buildFaqItems(faqRate).map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return [organization, webPage, webApplication, breadcrumbsSchema, faqSchema];
}

export function homePageSchemaGraph(faqRate: number) {
  return siteSchemaGraph({
    breadcrumbs: [{ name: "Inicio", path: "/" }],
    faqRate,
    pagePath: "/",
  });
}

/** @deprecated Use siteSchemaGraph() */
export function toolSchemaGraph() {
  return siteSchemaGraph();
}

/** @deprecated Use siteSchemaGraph({ faqRate }) */
export function faqPageJsonLd(rate = 40804) {
  return faqPageNode(rate);
}

export function authorPageSchemaGraph() {
  const authorPageId = `${siteUrl}/author#webpage`;

  return siteSchemaGraph({
    breadcrumbs: [
      { name: "Inicio", path: "/" },
      { name: "Autora", path: "/author" },
    ],
    additionalNodes: [
      {
        "@type": "ProfilePage",
        "@id": authorPageId,
        url: absoluteSiteUrl("/author"),
        name: `Autora editorial | ${siteName}`,
        description: `Perfil editorial de ${siteAuthor.name} en ${siteName}.`,
        inLanguage: "es-CL",
        isPartOf: { "@id": webPageId },
        about: { "@id": authorPersonId },
        mainEntity: { "@id": authorPersonId },
      },
      {
        "@type": "Person",
        "@id": authorPersonId,
        name: siteAuthor.name,
        jobTitle: siteAuthor.role,
        description: siteAuthor.shortBio,
        image: absoluteSiteUrl(siteAuthor.image),
        url: absoluteSiteUrl("/author"),
        homeLocation: {
          "@type": "Place",
          name: siteAuthor.location,
        },
        worksFor: { "@id": organizationId },
        knowsAbout: [...authorKnowsAbout],
        mainEntityOfPage: { "@id": authorPageId },
      },
    ],
  });
}

const aboutUsArticleDescription =
  "Conoce Calculadora UF Chile: misión, datos públicos del Banco Central y cómo convertimos UF y pesos con claridad para arriendos, créditos y contratos indexados.";

export function aboutUsArticleSchemaGraph() {
  const aboutArticleId = `${siteUrl}/about-us#article`;

  return siteSchemaGraph({
    pagePath: "/about-us",
    breadcrumbs: [
      { name: "Inicio", path: "/" },
      { name: "Sobre nosotros", path: "/about-us" },
    ],
    additionalNodes: [
      {
        "@type": "Article",
        "@id": aboutArticleId,
        headline: "Sobre la Calculadora UF Chile",
        description: aboutUsArticleDescription,
        url: absoluteSiteUrl("/about-us"),
        inLanguage: "es-CL",
        dateModified: contentLastUpdated,
        author: { "@id": authorPersonId },
        publisher: { "@id": organizationId },
        isPartOf: { "@id": `${absoluteSiteUrl("/about-us")}#webpage` },
        mainEntityOfPage: absoluteSiteUrl("/about-us"),
      },
    ],
  });
}
