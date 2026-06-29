import { ImageResponse } from "next/og";
import { imageCatalog } from "@/lib/images";
import { homeDescription, siteName, siteShortName, siteUrl } from "@/lib/site";

export const ogImageAlt = siteName;
export const ogImageSize = { width: 1200, height: 630 };
export const ogImageContentType = "image/webp";

function getAssetBaseUrl() {
  if (process.env.NODE_ENV === "development") {
    const port = process.env.PORT ?? "3000";
    return `http://localhost:${port}`;
  }

  return siteUrl;
}

export default async function OgImage() {
  const logoUrl = `${getAssetBaseUrl()}/images/og-logo.webp`;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          justifyContent: "center",
          padding: "72px",
          background: "linear-gradient(145deg, #f8ede1 0%, #f3e2d0 48%, #f0d9c4 100%)",
          color: "#1a1a1a",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "28px",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logoUrl}
            alt={imageCatalog.ogLogo.alt}
            width={120}
            height={120}
            style={{ objectFit: "contain", marginRight: "32px" }}
          />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                fontSize: 62,
                fontWeight: 700,
                lineHeight: 1.05,
                marginBottom: "12px",
              }}
            >
              {siteName}
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 32,
                fontWeight: 600,
                color: "#e8744a",
              }}
            >
              {siteShortName} · Chile
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 34,
            fontWeight: 500,
            color: "#6b6b6b",
            lineHeight: 1.35,
          }}
        >
          {homeDescription}
        </div>
      </div>
    ),
    ogImageSize,
  );
}
