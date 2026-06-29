import type { UfRatesResponse } from "@/lib/ufRate";
import { siteUrl } from "@/lib/site";

function getApiBaseUrl() {
  if (process.env.NODE_ENV === "development") {
    const port = process.env.PORT ?? "3000";
    return `http://localhost:${port}`;
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
