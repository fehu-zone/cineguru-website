"use client";

import {
  useRef,
  type AnchorHTMLAttributes,
  type FocusEvent,
  type PointerEvent,
  type ReactNode,
} from "react";

import { buttonStyles } from "@/components/ui/Button";
import { cn } from "@/lib/classNames";

type HoverVideoButtonLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children"> & {
  children: ReactNode;
  poster?: string;
  videoSrc: string;
};

export function HoverVideoButtonLink({
  children,
  className,
  onBlur,
  onFocus,
  onPointerEnter,
  onPointerLeave,
  poster,
  videoSrc,
  ...props
}: HoverVideoButtonLinkProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const playVideo = () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    void videoRef.current?.play().catch(() => {
      // Muted inline playback can still be blocked by an explicit browser policy.
    });
  };

  const resetVideo = () => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    video.currentTime = 0;
  };

  const handlePointerEnter = (event: PointerEvent<HTMLAnchorElement>) => {
    playVideo();
    onPointerEnter?.(event);
  };

  const handlePointerLeave = (event: PointerEvent<HTMLAnchorElement>) => {
    resetVideo();
    onPointerLeave?.(event);
  };

  const handleFocus = (event: FocusEvent<HTMLAnchorElement>) => {
    playVideo();
    onFocus?.(event);
  };

  const handleBlur = (event: FocusEvent<HTMLAnchorElement>) => {
    resetVideo();
    onBlur?.(event);
  };

  return (
    <a
      className={buttonStyles({
        size: "display",
        className: cn("group relative isolate overflow-hidden !border-0", className),
      })}
      onBlur={handleBlur}
      onFocus={handleFocus}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      {...props}
    >
      <video
        ref={videoRef}
        className="absolute inset-0 z-0 size-full scale-[1.02] object-cover opacity-0 [filter:sepia(.24)_brightness(.58)_contrast(1.08)_saturate(.8)] transition-opacity duration-500 ease-out group-hover:opacity-100 group-focus-visible:opacity-100"
        muted
        loop
        playsInline
        preload="metadata"
        poster={poster}
        disablePictureInPicture
        aria-hidden="true"
      >
        <source src={videoSrc} type="video/mp4" />
        <source src={videoSrc} type="video/quicktime" />
      </video>
      <span className="absolute inset-0 z-10 bg-canvas/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100" aria-hidden="true" />
      <span className="relative z-20 inline-flex min-w-0 items-center justify-center gap-4 text-canvas transition-colors duration-300 group-hover:text-foreground group-focus-visible:text-foreground">
        {children}
      </span>
    </a>
  );
}
