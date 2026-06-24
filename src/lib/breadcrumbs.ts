import type { BreadcrumbItem } from "@/lib/jsonLd";

export const homeBreadcrumbs: BreadcrumbItem[] = [{ name: "Inicio", path: "/" }];

export const aboutBreadcrumbs: BreadcrumbItem[] = [
  { name: "Inicio", path: "/" },
  { name: "Sobre nosotros", path: "/about-us" },
];

export const contactBreadcrumbs: BreadcrumbItem[] = [
  { name: "Inicio", path: "/" },
  { name: "Contacto", path: "/contact" },
];
