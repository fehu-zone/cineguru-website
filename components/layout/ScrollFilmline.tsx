import type { Ref } from "react";

export function ScrollFilmline({ stageRef, initialStage, hint }: { stageRef: Ref<HTMLSpanElement>; initialStage: string; hint: string }) {
  return (
    <div className="fixed bottom-8 right-3 top-24 z-[900] flex w-5 flex-col items-center gap-3 font-mono text-[0.47rem] uppercase tracking-[0.08em] text-foreground/45 max-[640px]:hidden" aria-hidden="true">
      <span ref={stageRef} className="whitespace-nowrap [writing-mode:vertical-rl]">01 · {initialStage}</span>
      <div className="relative h-full w-px overflow-hidden bg-foreground/15"><i className="absolute inset-x-0 top-0 block bg-accent [height:calc(var(--page-progress,0)*100%)]" /></div>
      <span className="whitespace-nowrap [writing-mode:vertical-rl]">{hint}</span>
    </div>
  );
}
