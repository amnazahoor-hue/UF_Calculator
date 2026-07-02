import Link from "next/link";
import { Logo } from "@/components/Logo";
import { siteName } from "@/lib/site";

export function HeaderBrand() {
  return (
    <Link
      href="/"
      className="header-brand header-brand-link flex min-w-0 shrink-0 items-center py-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
    >
      <span className="sr-only">{siteName} — inicio de la calculadora UF Chile</span>
      <Logo compact header priority />
    </Link>
  );
}
