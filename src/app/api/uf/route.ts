import { NextResponse } from "next/server";

const FALLBACK_RATE = 39189.81;

export async function GET() {
  try {
    const response = await fetch("https://mindicador.cl/api/uf", { next: { revalidate: 3600 } });
    if (!response.ok) {
      throw new Error("upstream error");
    }

    const data = (await response.json()) as { serie?: Array<{ valor: number; fecha: string }> };
    const latest = data.serie?.[0];
    if (!latest?.valor || !latest?.fecha) {
      throw new Error("invalid upstream payload");
    }

    return NextResponse.json({ rate: latest.valor, date: latest.fecha });
  } catch {
    return NextResponse.json({ rate: FALLBACK_RATE, date: new Date().toISOString(), fallback: true });
  }
}
