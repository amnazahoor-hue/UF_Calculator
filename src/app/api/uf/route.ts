import { NextResponse } from "next/server";
import { normalizeUfHistory, type UfRateDay } from "@/lib/ufRate";

const MINDICADOR_UF_URL = "https://mindicador.cl/api/uf";
const FALLBACK_RATE = 40804;
const HISTORY_DAYS = 30;

function buildFallbackHistory(): UfRateDay[] {
  const today = new Date();
  const history: UfRateDay[] = [];

  for (let i = 0; i < HISTORY_DAYS; i += 1) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const dateKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
    history.push({ date: dateKey, rate: FALLBACK_RATE });
  }

  return history;
}

export async function GET() {
  try {
    const response = await fetch(MINDICADOR_UF_URL, {
      next: { revalidate: 1800 },
      headers: {
        Accept: "application/json",
        "User-Agent": "CalculadoraUFChile/1.0 (+https://uf-calculator-chile.vercel.app)",
      },
    });

    if (!response.ok) {
      throw new Error("upstream error");
    }

    const data = (await response.json()) as { serie?: Array<{ valor: number; fecha: string }> };
    const history = normalizeUfHistory(data.serie ?? []).slice(0, HISTORY_DAYS);
    const latest = history[0];

    if (!latest?.rate || !latest?.date) {
      throw new Error("invalid upstream payload");
    }

    return NextResponse.json(
      {
        rate: latest.rate,
        date: latest.date,
        history,
        source: "mindicador.cl",
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=3600",
        },
      },
    );
  } catch {
    const history = buildFallbackHistory();
    const latest = history[0];

    return NextResponse.json(
      {
        rate: latest.rate,
        date: latest.date,
        history,
        fallback: true,
        source: "fallback",
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
        },
      },
    );
  }
}
