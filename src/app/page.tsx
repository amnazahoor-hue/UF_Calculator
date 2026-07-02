import { buildPageMetadata } from "@/lib/pageMetadata";
import { fetchUfRate } from "@/lib/fetchUfRate";
import { homePageSchemas } from "@/lib/jsonLd";
import { homeDescription, homeTitle } from "@/lib/site";
import type { UfRatesResponse } from "@/lib/ufRate";
import { Hero } from "@/components/Hero";
import { HomePageClient } from "@/components/HomePageClient";
import { HomeSections } from "@/components/HomeSections";

export const metadata = buildPageMetadata({
  title: homeTitle,
  description: homeDescription,
  path: "/",
  absoluteTitle: true,
});

export default async function Home() {
  let faqRate = 40804;
  let initialUfData: UfRatesResponse | null = null;

  try {
    const ufData = await fetchUfRate();
    faqRate = ufData.rate;
    initialUfData = ufData;
  } catch {
    // fallback rate for schema when API is unavailable at build time
  }

  const structuredData = homePageSchemas(faqRate);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <HomePageClient initialUfData={initialUfData}>
        <main className="flex-1">
          <Hero />
          <HomeSections />
        </main>
      </HomePageClient>
    </>
  );
}
