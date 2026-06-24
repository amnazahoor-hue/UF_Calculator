import Image from "next/image";
import { siteImages } from "@/lib/images";

type LogoProps = {
  compact?: boolean;
  showLabel?: boolean;
  priority?: boolean;
};

export function Logo({ compact = false, showLabel = false, priority = false }: LogoProps) {
  const imageClass = compact
    ? "block h-11 w-11 shrink-0 object-contain sm:h-12 sm:w-12"
    : "block h-[3.25rem] w-[3.25rem] shrink-0 object-contain sm:h-14 sm:w-14";

  return (
    <span className="inline-flex min-w-0 items-center gap-2.5">
      <Image
        src={siteImages.logo}
        alt="UF Calculator Chile"
        width={56}
        height={56}
        priority={priority}
        className={imageClass}
      />
      {showLabel ? (
        <span className="truncate text-sm font-bold tracking-tight text-ink sm:text-base">UF Calc</span>
      ) : null}
    </span>
  );
}
