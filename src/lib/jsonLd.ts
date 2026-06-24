import { buildFaqItems } from "@/lib/faqContent";
import { siteAuthor } from "@/lib/author";
import {
  bcchUrl,
  contentLastUpdated,
  defaultDescription,
  officialUfRateUrl,
  siteName,
  siteUrl,
  socialProfiles,
} from "@/lib/site";

const organizationId = `${siteUrl}/#organization`;
const websiteId = `${siteUrl}/#website`;
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

function organizationNode() {
  return {
    "@type": "Organization",
    "@id": organizationId,
    name: siteName,
    url: siteUrl,
    logo: {
      "@type": "ImageObject",
      url: `${siteUrl}/images/site-logo.webp`,
    },
    description: defaultDescription,
    sameAs: [
      socialProfiles.x,
      socialProfiles.youtube,
      socialProfiles.instagram,
      officialUfRateUrl,
      bcchUrl,
    ],
  };
}

function websiteNode() {
  return {
    "@type": "WebSite",
    "@id": websiteId,
    url: siteUrl,
    name: siteName,
    description: defaultDescription,
    inLanguage: "es-CL",
    publisher: { "@id": organizationId },
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
    isPartOf: { "@id": websiteId },
    mainEntityOfPage: { "@id": websiteId },
  };
}

export function breadcrumbListNode(items: BreadcrumbItem[]) {
  return {
    "@type": "BreadcrumbList",
    "@id": `${siteUrl}${items[items.length - 1]?.path ?? "/"}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.path === "/" ? "" : item.path}`,
    })),
  };
}

export function faqPageNode(rate: number) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${siteUrl}/#faq`,
    isPartOf: { "@id": websiteId },
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
};

export function siteSchemaGraph(options: SiteSchemaOptions = {}) {
  const graph: Record<string, unknown>[] = [organizationNode(), websiteNode(), webApplicationNode()];

  if (options.breadcrumbs?.length) {
    graph.push(breadcrumbListNode(options.breadcrumbs));
  }

  if (typeof options.faqRate === "number") {
    graph.push(faqPageNode(options.faqRate));
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
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

  return {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumbListNode([
        { name: "Inicio", path: "/" },
        { name: "Autora", path: "/author" },
      ]),
      {
        "@type": "ProfilePage",
        "@id": authorPageId,
        url: `${siteUrl}/author`,
        name: `Autora editorial | ${siteName}`,
        description: `Perfil editorial de ${siteAuthor.name} en ${siteName}.`,
        inLanguage: "es-CL",
        isPartOf: { "@id": websiteId },
        about: { "@id": authorPersonId },
        mainEntity: { "@id": authorPersonId },
      },
      {
        "@type": "Person",
        "@id": authorPersonId,
        name: siteAuthor.name,
        jobTitle: siteAuthor.role,
        description: siteAuthor.shortBio,
        image: `${siteUrl}${siteAuthor.image}`,
        url: `${siteUrl}/author`,
        homeLocation: {
          "@type": "Place",
          name: siteAuthor.location,
        },
        worksFor: { "@id": organizationId },
        knowsAbout: [...authorKnowsAbout],
        mainEntityOfPage: { "@id": authorPageId },
      },
    ],
  };
}

const aboutUsArticleDescription =
  "Conoce Calculadora UF Chile: misión, datos públicos del Banco Central y cómo convertimos UF y pesos con claridad para arriendos, créditos y contratos indexados.";

export function aboutUsArticleSchemaGraph() {
  const aboutArticleId = `${siteUrl}/about-us#article`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": aboutArticleId,
        headline: "Sobre la Calculadora UF Chile",
        description: aboutUsArticleDescription,
        url: `${siteUrl}/about-us`,
        inLanguage: "es-CL",
        dateModified: contentLastUpdated,
        author: { "@id": authorPersonId },
        publisher: { "@id": organizationId },
        isPartOf: { "@id": websiteId },
        mainEntityOfPage: `${siteUrl}/about-us`,
      },
    ],
  };
}
