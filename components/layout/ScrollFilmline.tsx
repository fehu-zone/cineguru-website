import type { Ref } from "react";

export function ScrollFilmline({ stageRef, initialStage, hint }: { stageRef: Ref<HTMLSpanElement>; initialStage: string; hint: string }) {
  return (
    <div className="pointer-events-none fixed bottom-4 right-page z-[700] grid grid-cols-[auto_6.875rem] items-center gap-2.5 rounded-full border border-foreground/15 bg-canvas/75 px-2.5 py-2 font-mono text-[0.5rem] tracking-[0.08em] text-foreground/55 backdrop-blur-md max-[640px]:hidden" aria-hidden="true">
      <span ref={stageRef} className="whitespace-nowrap">01 · {initialStage}</span>
      <div className="h-px overflow-hidden bg-foreground/20"><i className="block size-full origin-left scale-x-[var(--page-progress,0)] bg-accent" /></div>
      <span className="hidden">{hint}</span>
    </div>
  );
}
