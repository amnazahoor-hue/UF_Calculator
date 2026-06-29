import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { FooterBrand } from "@/components/FooterBrand";
import { HashScrollHandler } from "@/components/HashScrollHandler";
import { Header } from "@/components/Header";
import { HeaderBrand } from "@/components/HeaderBrand";
import { imageCatalog } from "@/lib/images";
import { siteOpenGraphImage, siteTwitterImage } from "@/lib/metadata";
import { defaultDescription, homeTitle, siteName, siteUrl } from "@/lib/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

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
    <html lang="es" className={`${inter.variable} h-full overflow-x-clip antialiased`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://mindicador.cl" />
        <link rel="dns-prefetch" href="https://mindicador.cl" />
      </head>
      <body className="flex min-h-full w-full max-w-full flex-col overflow-x-clip bg-bg-base" suppressHydrationWarning>
        <Header brand={<HeaderBrand />} />
        <HashScrollHandler />
        {children}
        <Footer brand={<FooterBrand />} />
      </body>
    </html>
  );
}
