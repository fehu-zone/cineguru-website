/* eslint-disable @next/next/no-img-element -- logos are already optimized WebP assets */

import type { ImgHTMLAttributes } from "react";

import { cn } from "@/lib/classNames";

type ClientLogoProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "alt"> & {
  src: string;
  alt: string;
};

export function ClientLogo({ src, alt, className, width = 180, height = 82, ...props }: ClientLogoProps) {
  return (
    <img
      src={src}
      alt={alt}
      className={cn("object-contain", className)}
      width={width}
      height={height}
      decoding="async"
      {...props}
    />
  );
}
