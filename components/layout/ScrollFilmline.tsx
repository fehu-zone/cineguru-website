"use client";

import type { Ref } from "react";
import { useCallback } from "react";

export function ScrollFilmline({ stageRef, initialStage, hint }: { stageRef: Ref<HTMLSpanElement>; initialStage: string; hint: string }) {
  const scrollToNextSection = useCallback(() => {
    const sectionIds = ["top", "work", "services", "method", "process", "about", "contact"];
    const scrollPosition = window.scrollY + 120;

    let targetSection: HTMLElement | null = null;
    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el && el.offsetTop > scrollPosition) {
        targetSection = el;
        break;
      }
    }

    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  return (
    <button
      type="button"
      onClick={scrollToNextSection}
      className="group pointer-events-auto fixed right-6 top-1/2 z-[700] flex cursor-pointer -translate-y-1/2 flex-col items-center gap-3.5 rounded-full border border-foreground/20 bg-canvas/85 px-3.5 py-4 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-foreground/80 backdrop-blur-md shadow-2xl transition-all duration-300 hover:scale-105 hover:border-accent hover:bg-canvas hover:shadow-[0_0_25px_rgba(255,61,0,0.35)] max-[768px]:hidden"
      aria-label="Sonraki bölüme geç"
      title={hint}
    >
      <span ref={stageRef} className="whitespace-nowrap [writing-mode:vertical-rl] rotate-180 transition-colors duration-300 group-hover:text-accent">
        01 · {initialStage}
      </span>
      <div className="relative h-20 w-[0.125rem] overflow-hidden rounded-full bg-foreground/20 group-hover:bg-foreground/30">
        <i className="block size-full origin-top scale-y-[var(--page-progress,0)] bg-accent transition-transform duration-150 ease-out" />
      </div>
      <span className="grid size-5 place-items-center rounded-full bg-foreground/10 text-[0.6rem] text-foreground/80 transition-all duration-300 group-hover:bg-accent group-hover:text-canvas group-hover:translate-y-0.5" aria-hidden="true">
        ↓
      </span>
    </button>
  );
}
