import Image from "next/image";
import { imageCatalog } from "@/lib/images";
import { siteName, siteShortName } from "@/lib/site";

export function FooterBrand() {
  return (
    <a href="#home" className="footer-brand-link">
      <span className="sr-only">{siteName} — volver al inicio de la calculadora UF</span>
      <span className="inline-flex min-w-0 max-w-full items-center gap-3">
        <span className="shrink-0">
          <Image
            src={imageCatalog.logo.src}
            alt={imageCatalog.logo.alt}
            title={imageCatalog.logo.title}
            width={96}
            height={96}
            sizes="96px"
            quality={88}
            loading="lazy"
            className="footer-logo-img block h-11 w-11 shrink-0 object-contain sm:h-12 sm:w-12"
          />
        </span>
        <span className="footer-logo-label truncate text-sm font-bold tracking-tight text-ink sm:text-base">
          {siteShortName}
        </span>
      </span>
    </a>
  );
}
