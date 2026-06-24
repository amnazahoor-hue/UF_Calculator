import { siteName } from "@/lib/site";

export type SiteImageMeta = {
  src: string;
  alt: string;
  title: string;
  description: string;
};

export const imageCatalog = {
  logo: {
    src: "/images/site-logo.webp",
    alt: `Logotipo de ${siteName}`,
    title: siteName,
    description: `Logotipo oficial de ${siteName}, calculadora gratuita para convertir UF y pesos chilenos en Chile.`,
  },
  ogLogo: {
    src: "/images/og-logo.webp",
    alt: `Logotipo de ${siteName} para vista previa en redes sociales`,
    title: `${siteName} — imagen Open Graph`,
    description: `Identidad visual de ${siteName} usada en tarjetas de enlace para WhatsApp, Facebook y X.`,
  },
  favicon: {
    src: "/images/favicon.webp",
    alt: `Icono de ${siteName}`,
    title: `Favicon de ${siteName}`,
    description: `Icono del sitio web de ${siteName} mostrado en la pestaña del navegador.`,
  },
  appleTouchIcon: {
    src: "/images/apple-touch-icon.webp",
    alt: `Icono de inicio de ${siteName} para dispositivos Apple`,
    title: `Apple Touch Icon de ${siteName}`,
    description: `Acceso directo visual a ${siteName} cuando se guarda en la pantalla de inicio de iPhone o iPad.`,
  },
  conversionTableBg: {
    src: "/images/conversion-table-bg.webp",
    alt: "Fondo de la tabla de conversión de UF a pesos chilenos",
    title: "Fondo tabla UF a CLP",
    description:
      "Imagen de fondo decorativa de la sección con la tabla de referencia para convertir cantidades de UF a pesos chilenos.",
  },
  whyUfSectionBg: {
    src: "/images/why-uf-section-bg.webp",
    alt: "Fondo ilustrativo sobre la variación diaria de la UF en Chile",
    title: "Fondo sección ¿Por qué cambia la UF?",
    description:
      "Imagen de fondo decorativa que acompaña la explicación sobre cómo la UF se actualiza cada día según la inflación.",
  },
  whyUfThinking: {
    src: "/images/why-uf-thinking.webp",
    alt: "Persona reflexionando sobre el valor diario de la UF en Chile",
    title: "Reflexión sobre el valor diario de la UF",
    description:
      "Ilustración de una persona analizando el cambio diario de la Unidad de Fomento y su relación con la inflación en Chile.",
  },
  authorPortrait: {
    src: "/images/author/author-portrait.webp",
    alt: "Retrato de Camila Escobar Vera, editora financiera en Chile",
    title: "Retrato editorial de la autora",
    description:
      "Retrato ilustrativo de Camila Escobar Vera, personaje editorial ficticio asociado al contenido de la calculadora UF en Chile.",
  },
  faq: {
    mortgagePlanning: {
      src: "/images/faq/mortgage-planning.webp",
      alt: "Planificación hipotecaria y vivienda en UF",
      title: "Hipotecas y vivienda en UF",
      description:
        "Imagen sobre planificación hipotecaria y compra de vivienda con montos expresados en Unidad de Fomento en Chile.",
    },
    bankingFinance: {
      src: "/images/faq/banking-finance.webp",
      alt: "Sector financiero y valor de la UF en Chile",
      title: "Finanzas y banca en Chile",
      description:
        "Rascacielos financieros que representan el sector bancario chileno y el uso de la UF en contratos y productos financieros.",
    },
    financialMeeting: {
      src: "/images/faq/finance-education.webp",
      alt: "Planificación financiera y ahorro vinculado a la UF",
      title: "Educación y planificación financiera",
      description:
        "Imagen sobre educación financiera, ahorro y decisiones cotidianas relacionadas con la UF y los pesos chilenos.",
    },
    questionsAnswers: {
      src: "/images/faq/questions-answers.webp",
      alt: "Preguntas y respuestas sobre la calculadora UF",
      title: "Preguntas frecuentes sobre la UF",
      description:
        "Escena de consulta y respuestas sobre la calculadora UF, conversiones y uso de la Unidad de Fomento en Chile.",
    },
  },
  howItWorks: {
    softwareDeveloper: {
      src: "/images/how-it-works/software-developer.webp",
      alt: "Persona consultando el valor diario de la UF en pantalla",
      title: "Consultar el valor UF del día",
      description:
        "Paso visual del proceso: revisar el valor actual de la UF antes de convertir montos entre UF y pesos chilenos.",
    },
    teamStrategy: {
      src: "/images/how-it-works/team-strategy.webp",
      alt: "Profesionales eligiendo la dirección de conversión UF o pesos",
      title: "Elegir dirección de conversión",
      description:
        "Imagen que representa la elección entre convertir UF a CLP o CLP a UF dentro de la calculadora.",
    },
    financialCalculation: {
      src: "/images/how-it-works/financial-calculation.webp",
      alt: "Cálculo financiero con calculadora y documentos",
      title: "Realizar el cálculo UF",
      description:
        "Ilustración del cálculo financiero con calculadora y documentos al convertir montos según el valor de la UF.",
    },
    contractReview: {
      src: "/images/how-it-works/contract-review.webp",
      alt: "Revisión de contratos y fechas de pago en UF",
      title: "Verificar fecha y contrato",
      description:
        "Imagen sobre revisión de contratos, fechas de pago y confirmación del valor UF aplicable a cada operación.",
    },
  },
} as const satisfies Record<string, SiteImageMeta | Record<string, SiteImageMeta>>;

/** Rutas de imagen para scripts y usos que solo necesitan el `src`. */
export const siteImages = {
  logo: imageCatalog.logo.src,
  conversionTableBg: imageCatalog.conversionTableBg.src,
  whyUfSectionBg: imageCatalog.whyUfSectionBg.src,
  whyUfThinking: imageCatalog.whyUfThinking.src,
  faq: {
    mortgagePlanning: imageCatalog.faq.mortgagePlanning.src,
    bankingFinance: imageCatalog.faq.bankingFinance.src,
    financialMeeting: imageCatalog.faq.financialMeeting.src,
    questionsAnswers: imageCatalog.faq.questionsAnswers.src,
  },
  howItWorks: {
    softwareDeveloper: imageCatalog.howItWorks.softwareDeveloper.src,
    teamStrategy: imageCatalog.howItWorks.teamStrategy.src,
    financialCalculation: imageCatalog.howItWorks.financialCalculation.src,
    contractReview: imageCatalog.howItWorks.contractReview.src,
  },
} as const;
