/* eslint-disable @next/next/no-img-element -- logos are already optimized WebP assets */

import type { CSSProperties, ImgHTMLAttributes } from "react";

import { cn } from "@/lib/classNames";

type ClientLogoProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "alt"> & {
  src: string;
  alt: string;
  scale?: number;
  mobileScale?: number;
};

export function ClientLogo({ src, alt, className, style, scale = 1, mobileScale, width = 180, height = 82, ...props }: ClientLogoProps) {
  const logoStyle = mobileScale === undefined
    ? (scale !== 1 ? { ...style, transform: `scale(${scale})` } : style)
    : { ...style, transform: `scale(${scale})`, "--mobile-logo-scale": mobileScale } as CSSProperties;

  return (
    <img
      src={src}
      alt={alt}
      className={cn("object-contain", mobileScale !== undefined && "hero-responsive-logo", className)}
      style={logoStyle}
      width={width}
      height={height}
      decoding="async"
      {...props}
    />
  );
}
