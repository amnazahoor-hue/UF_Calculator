import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Inter } from "next/font/google";
import "./globals.css";
import { DeferredHashScroll } from "@/components/DeferredHashScroll";
import { FooterBrand } from "@/components/FooterBrand";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HeaderBrand } from "@/components/HeaderBrand";
import { imageCatalog } from "@/lib/images";
import { siteOpenGraphImage, siteTwitterImage } from "@/lib/metadata";
import { buildHrefLangAlternates } from "@/lib/seo";
import { defaultDescription, homeTitle, siteName, siteUrl } from "@/lib/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "optional",
  preload: true,
  adjustFontFallback: true,
});

const GoogleAnalytics = dynamic(() =>
  import("@/components/GoogleAnalytics").then((m) => ({ default: m.GoogleAnalytics })),
);

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: homeTitle,
    template: `%s | ${siteName}`,
  },
  description: defaultDescription,
  keywords: [
    "calculadora UF",
    "UF a CLP",
    "CLP a UF",
    "Chile UF",
    "valor UF hoy",
    "convertidor UF",
    "calculadora uf chile",
    "mindicador UF",
  ],
  robots: { index: true, follow: true },
  alternates: buildHrefLangAlternates("/"),
  verification: {
    google: "rE9ijM1AJWkITiYDx-n-nAQ-yAB7BP-G7PKQhSzZlLc",
  },
  openGraph: {
    title: homeTitle,
    description: defaultDescription,
    url: siteUrl,
    siteName,
    locale: "es_CL",
    type: "website",
    images: [siteOpenGraphImage],
  },
  twitter: {
    card: "summary_large_image",
    title: homeTitle,
    description: defaultDescription,
    images: [siteTwitterImage],
  },
  icons: {
    icon: [{ url: imageCatalog.favicon.src, type: "image/webp", sizes: "48x48" }],
    apple: [{ url: imageCatalog.appleTouchIcon.src, type: "image/webp", sizes: "180x180" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-CL" className={`${inter.variable} h-full overflow-x-clip antialiased`} suppressHydrationWarning>
      <head>
        <link rel="preload" href={imageCatalog.logo.src} as="image" type="image/webp" />
      </head>
      <body className="flex min-h-full w-full max-w-full flex-col overflow-x-clip bg-bg-base" suppressHydrationWarning>
        <GoogleAnalytics />
        <Header brand={<HeaderBrand />} />
        <DeferredHashScroll />
        {children}
        <Footer brand={<FooterBrand />} />
      </body>
    </html>
  );
}
