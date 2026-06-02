import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { HashScrollHandler } from "@/components/HashScrollHandler";
import { Header } from "@/components/Header";
import { webApplicationJsonLd, webSiteJsonLd } from "@/lib/jsonLd";
import { defaultDescription, siteName, siteUrl } from "@/lib/site";

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
    default: "UF Calculator Chile | Real-Time UF to CLP Converter",
    template: `%s | ${siteName}`,
  },
  description: defaultDescription,
  keywords: [
    "UF calculator",
    "UF to CLP",
    "CLP to UF",
    "Chile UF",
    "valor UF hoy",
    "convertidor UF",
    "mindicador UF",
  ],
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/apple-icon.svg", type: "image/svg+xml" }],
  },
  openGraph: {
    title: "UF Calculator Chile | Real-Time UF to CLP Converter",
    description: defaultDescription,
    url: siteUrl,
    siteName,
    locale: "en_CL",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: siteName }],
  },
  twitter: {
    card: "summary_large_image",
    title: "UF Calculator Chile | Real-Time UF to CLP Converter",
    description: defaultDescription,
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = [webSiteJsonLd, webApplicationJsonLd];

  return (
    <html lang="en" className={`${inter.variable} h-full overflow-x-clip antialiased`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://mindicador.cl" />
        <link rel="dns-prefetch" href="https://mindicador.cl" />
      </head>
      <body className="flex min-h-full w-full max-w-full flex-col overflow-x-clip bg-bg-base" suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <Header />
        <HashScrollHandler />
        {children}
        <Footer />
      </body>
    </html>
  );
}
