import { cn } from "@/lib/classNames";

export function CameraHud({ className, timecodeRef }: { className?: string; timecodeRef?: React.Ref<HTMLSpanElement> }) {
  const corner = "absolute size-[1.375rem] border-foreground/95 [filter:drop-shadow(0_1px_3px_rgb(0_0_0/0.9))]";

  return (
    <div className={cn("pointer-events-none absolute inset-0 z-10", className)} aria-hidden="true">
      <i className={cn(corner, "left-0 top-0 border-l-2 border-t-2")} />
      <i className={cn(corner, "right-0 top-0 border-r-2 border-t-2")} />
      <i className={cn(corner, "bottom-0 left-0 border-b-2 border-l-2")} />
      <i className={cn(corner, "bottom-0 right-0 border-b-2 border-r-2")} />
      <div className="absolute left-1.5 right-1.5 top-1.5 flex items-center justify-between font-mono text-[clamp(0.56rem,2.5vw,0.66rem)] font-semibold tracking-[0.1em] text-foreground/95 [text-shadow:0_1px_4px_rgb(0_0_0/0.9)]">
        <span className="flex items-center gap-2 text-foreground"><i className="size-[0.4375rem] rounded-full bg-accent shadow-[0_0_10px_var(--color-accent)]" /> REC</span>
        <span>4K / DCI</span>
      </div>
      <div className="absolute bottom-1.5 left-1.5 right-1.5 flex items-center justify-between font-mono text-[clamp(0.56rem,2.5vw,0.66rem)] font-semibold tracking-[0.1em] text-foreground/95 [text-shadow:0_1px_4px_rgb(0_0_0/0.9)]">
        <span ref={timecodeRef} className="tc-display">TC 00:00:00:00</span>
        <span>CG / SHOWREEL</span>
      </div>
    </div>
  );
}
