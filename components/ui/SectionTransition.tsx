export function SectionTransition({
  direction = "forward",
  fromIndex,
  fromStage,
  toStage,
}: {
  direction?: "forward" | "reverse";
  fromIndex: number;
  fromStage: string;
  toStage: string;
}) {
  const toIndex = fromIndex + 1;

  return (
    <div
      className="section-transition reveal-on-scroll page-shell grid grid-cols-[auto_minmax(2rem,1fr)_auto] items-center gap-[clamp(0.8rem,2vw,2rem)] py-[clamp(1.25rem,2vw,2rem)]"
      data-direction={direction}
      data-reveal="transition"
      aria-hidden="true"
    >
      <span className="section-transition-label font-mono text-[0.56rem] font-semibold uppercase tracking-[0.11em] text-foreground/45 max-[480px]:text-[0.5rem]">
        {String(fromIndex).padStart(2, "0")} · {fromStage}
      </span>
      <span className="section-transition-track relative block h-px bg-foreground/10">
        <i className="section-transition-fill absolute inset-0 block origin-left bg-gradient-to-r from-accent via-accent/70 to-foreground/35" />
        <i className="section-transition-marker absolute right-0 top-1/2 block size-1.5 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_0.9rem_color-mix(in_srgb,var(--color-accent)_55%,transparent)]" />
      </span>
      <span className="section-transition-label font-mono text-[0.56rem] font-semibold uppercase tracking-[0.11em] text-foreground/65 max-[480px]:text-[0.5rem]">
        {toStage} · {String(toIndex).padStart(2, "0")}
      </span>
    </div>
  );
}
