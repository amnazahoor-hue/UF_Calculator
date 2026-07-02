export type HeaderNavLink = {
  href: string;
  label: string;
  pageId: string;
};

/** Header navigation — only user-requested pages */
export const headerNavLinks: HeaderNavLink[] = [
  { href: "/about-us", label: "Sobre nosotros", pageId: "about-us" },
  { href: "/contact", label: "Contáctanos", pageId: "contact" },
  { href: "/privacy-policy", label: "Política de privacidad", pageId: "privacy-policy" },
  { href: "/disclaimer", label: "Descargo de responsabilidad", pageId: "disclaimer" },
];

export const footerProductLinks = [
  {
    href: "/#tool",
    label: "Herramienta UF ↔ CLP",
    ariaLabel: "Ir a la herramienta de conversión UF a pesos chilenos",
  },
  {
    href: "/#how-it-works",
    label: "Cómo funciona",
    ariaLabel: "Ir a la sección cómo funciona la calculadora UF",
  },
  {
    href: "/#faq",
    label: "Preguntas frecuentes",
    ariaLabel: "Ir a las preguntas frecuentes sobre la UF en Chile",
  },
] as const;

export const footerLegalLinks = [
  { href: "/privacy-policy", label: "Política de privacidad" },
  { href: "/terms-and-conditions", label: "Términos y condiciones" },
  { href: "/disclaimer", label: "Descargo de responsabilidad" },
] as const;

export const footerConnectLinks = [
  { href: "/about-us", label: "Sobre nosotros" },
  { href: "/contact", label: "Contáctanos" },
  { href: "/author", label: "Autora" },
] as const;
