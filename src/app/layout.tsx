import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { FooterBrand } from "@/components/FooterBrand";
import { HashScrollHandler } from "@/components/HashScrollHandler";
import { Header } from "@/components/Header";
import { HeaderBrand } from "@/components/HeaderBrand";
import { webApplicationJsonLd, webSiteJsonLd } from "@/lib/jsonLd";
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
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    title: homeTitle,
    description: defaultDescription,
    url: siteUrl,
    siteName,
    locale: "es_CL",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: siteName }],
  },
  twitter: {
    card: "summary_large_image",
    title: homeTitle,
    description: defaultDescription,
    images: ["/opengraph-image"],
  },
  icons: {
    icon: [{ url: "/images/favicon.webp", type: "image/webp", sizes: "48x48" }],
    apple: [{ url: "/images/apple-touch-icon.webp", type: "image/webp", sizes: "180x180" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = [webSiteJsonLd, webApplicationJsonLd];

  return (
    <html lang="es" className={`${inter.variable} h-full overflow-x-clip antialiased`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://mindicador.cl" />
        <link rel="dns-prefetch" href="https://mindicador.cl" />
      </head>
      <body className="flex min-h-full w-full max-w-full flex-col overflow-x-clip bg-bg-base" suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <Header brand={<HeaderBrand />} />
        <HashScrollHandler />
        {children}
        <Footer brand={<FooterBrand />} />
      </body>
    </html>
  );
}
