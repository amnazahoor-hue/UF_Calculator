import { buildPageMetadata } from "@/lib/pageMetadata";
import { fetchUfRate } from "@/lib/fetchUfRate";
import { faqPageNode } from "@/lib/jsonLd";
import { homeDescription, homeTitle } from "@/lib/site";
import { HomePageContent } from "@/components/HomePageContent";

export const metadata = buildPageMetadata({
  title: homeTitle,
  description: homeDescription,
  path: "/",
  absoluteTitle: true,
});

export default async function Home() {
  let faqRate = 40804;

  try {
    const ufData = await fetchUfRate();
    faqRate = ufData.rate;
  } catch {
    // fallback rate for schema when API is unavailable at build time
  }

  const structuredData = faqPageNode(faqRate);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <HomePageContent />
    </>
  );
}
