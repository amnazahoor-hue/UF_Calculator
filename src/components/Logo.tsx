import { imageCatalog } from "@/lib/images";
import { SiteImage } from "@/components/SiteImage";
import { siteName, siteShortName } from "@/lib/site";

type LogoProps = {
  compact?: boolean;
  showLabel?: boolean;
  header?: boolean;
  footer?: boolean;
  priority?: boolean;
  variant?: "default" | "inverse";
};

export function Logo({
  compact = false,
  showLabel = true,
  header = false,
  footer = false,
  priority = false,
  variant = "default",
}: LogoProps) {
  const imageClass = footer
    ? "footer-logo-img block h-11 w-11 shrink-0 object-contain sm:h-12 sm:w-12"
    : compact
      ? "header-logo-img block h-10 w-10 shrink-0 object-contain sm:h-11 sm:w-11"
      : "block h-11 w-11 shrink-0 object-contain sm:h-12 sm:w-12";

  const labelClass =
    variant === "inverse"
      ? "truncate text-base font-bold tracking-tight text-surface sm:text-lg"
      : footer
        ? "footer-logo-label truncate text-sm font-bold tracking-tight text-ink sm:text-base"
        : "truncate text-sm font-bold tracking-tight text-ink sm:text-base";

  const imageSize = footer ? 96 : compact ? 88 : 96;
  const hasVisibleLabel = showLabel && (header || footer || !compact);

  return (
    <span
      className={`inline-flex min-w-0 items-center ${
        footer ? "max-w-full gap-3" : header ? "max-w-[12rem] gap-2.5 sm:max-w-[16rem] lg:max-w-[19rem]" : "max-w-full gap-2.5"
      }`}
    >
      <span className="shrink-0">
        <SiteImage
          image={imageCatalog.logo}
          describe={!hasVisibleLabel}
          width={imageSize}
          height={imageSize}
          unoptimized
          priority={priority}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          className={imageClass}
        />
      </span>
      {showLabel ? (
        <span className={`${labelClass}${header ? " text-xs sm:text-sm" : ""}`}>
          {header || footer ? siteShortName : siteName}
        </span>
      ) : null}
    </span>
  );
}
