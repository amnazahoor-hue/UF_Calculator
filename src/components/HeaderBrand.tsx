import Link from "next/link";
import { Logo } from "@/components/Logo";
import { siteName } from "@/lib/site";

export function HeaderBrand() {
  return (
    <Link
      href="/"
      aria-label={`${siteName} — inicio`}
      className="header-brand header-brand-link flex min-w-0 shrink-0 items-center py-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
    >
      <Logo compact header priority />
    </Link>
  );
}
