"use client";

import Image, { type ImageProps } from "next/image";
import { useId } from "react";
import type { SiteImageMeta } from "@/lib/images";

type SiteImageProps = Omit<ImageProps, "alt" | "src" | "title"> & {
  image: SiteImageMeta;
  describe?: boolean;
};

export function SiteImage({ image, describe = true, ...props }: SiteImageProps) {
  const descriptionId = useId();

  return (
    <>
      <Image
        {...props}
        src={image.src}
        alt={image.alt}
        title={image.title}
        aria-describedby={describe ? descriptionId : undefined}
      />
      {describe ? (
        <span id={descriptionId} className="sr-only">
          {image.description}
        </span>
      ) : null}
    </>
  );
}
