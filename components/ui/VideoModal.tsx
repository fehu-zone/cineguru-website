"use client";

import { useEffect, useRef } from "react";

import { cn } from "@/lib/classNames";

export type ActiveVideo = {
  id: string;
  title: string;
  orientation: "landscape" | "vertical";
};

export function VideoModal({ video, closeLabel, onClose }: { video: ActiveVideo; closeLabel: string; onClose: () => void }) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const returnFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    document.body.style.overflow = "hidden";
    const focusFrame = window.requestAnimationFrame(() => closeRef.current?.focus());

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab") return;

      const focusable = Array.from(
        dialogRef.current?.querySelectorAll<HTMLElement>(
          'button, a[href], iframe, input, textarea, select, [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      ).filter((element) => !element.hasAttribute("disabled"));
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      returnFocus?.focus();
    };
  }, [onClose]);

  return (
    <div
      ref={dialogRef}
      className="fixed inset-0 z-[1400] grid place-items-center bg-canvas/95 p-4 backdrop-blur-xl"
      role="dialog"
      aria-modal="true"
      aria-labelledby="video-modal-title"
      onClick={onClose}
    >
      <div
        className={cn(
          "w-[min(70rem,calc(100vw-2rem))]",
          video.orientation === "vertical" && "w-[min(25.625rem,calc((100dvh-7rem)*0.5625),calc(100vw-2rem))]",
        )}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4 pb-3 font-mono text-[0.61rem] tracking-[0.08em] text-foreground/70">
          <p id="video-modal-title">{video.title}</p>
          <button
            ref={closeRef}
            className="cursor-pointer rounded-full bg-foreground/10 px-3 py-2 text-foreground transition-colors hover:bg-foreground hover:text-canvas"
            onClick={onClose}
          >
            {closeLabel} <span aria-hidden="true">×</span>
          </button>
        </div>
        <div className={cn("aspect-video overflow-hidden rounded-xl bg-surface", video.orientation === "vertical" && "aspect-[9/16]")}>
          <iframe
            className="size-full border-0"
            src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0&modestbranding=1`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}
