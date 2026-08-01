"use client";

import { useEffect, useRef } from "react";

export function CustomCursor({ label }: { label: string }) {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!finePointer.matches) return;

    let frame = 0;
    const cursor = cursorRef.current;
    const onPointerMove = (event: PointerEvent) => {
      if (frame) window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        cursor?.style.setProperty("--cursor-x", `${event.clientX}px`);
        cursor?.style.setProperty("--cursor-y", `${event.clientY}px`);
        const target = event.target as Element | null;
        cursor?.classList.toggle("is-watch", Boolean(target?.closest("[data-cursor-label]")));
      });
    };

    const magneticElements = Array.from(document.querySelectorAll<HTMLElement>("[data-magnetic]"));
    const moveMagnet = (event: PointerEvent) => {
      const element = event.currentTarget as HTMLElement;
      const rect = element.getBoundingClientRect();
      element.style.setProperty("--mag-x", `${(event.clientX - rect.left - rect.width / 2) * 0.1}px`);
      element.style.setProperty("--mag-y", `${(event.clientY - rect.top - rect.height / 2) * 0.1}px`);
    };
    const resetMagnet = (event: PointerEvent) => {
      const element = event.currentTarget as HTMLElement;
      element.style.setProperty("--mag-x", "0px");
      element.style.setProperty("--mag-y", "0px");
    };

    magneticElements.forEach((element) => {
      element.addEventListener("pointermove", moveMagnet);
      element.addEventListener("pointerleave", resetMagnet);
    });
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      magneticElements.forEach((element) => {
        element.removeEventListener("pointermove", moveMagnet);
        element.removeEventListener("pointerleave", resetMagnet);
      });
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return <div className="custom-cursor" ref={cursorRef} aria-hidden="true"><span>{label}</span></div>;
}
