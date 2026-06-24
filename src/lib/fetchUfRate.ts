import type { UfRatesResponse } from "@/lib/ufRate";
import { siteUrl } from "@/lib/site";

function getApiBaseUrl() {
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return siteUrl;
}

export async function fetchUfRate(): Promise<UfRatesResponse> {
  const response = await fetch(`${getApiBaseUrl()}/api/uf`, {
    next: { revalidate: 1800 },
  });

  if (!response.ok) {
    throw new Error("UF rate fetch failed");
  }

  return response.json() as Promise<UfRatesResponse>;
}
