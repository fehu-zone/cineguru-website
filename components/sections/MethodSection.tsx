"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import { methodPhases } from "@/data/site";
import type { Messages } from "@/i18n/config";
import { cn } from "@/lib/classNames";
import { Eyebrow } from "@/components/ui/SectionHeading";

export function MethodSection({ messages }: { messages: Messages }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const method = messages.method;
  const phaseConfig = methodPhases[activeIndex];
  const phase = method.phases[activeIndex];

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;
    const interval = window.setInterval(() => setActiveIndex((index) => (index + 1) % methodPhases.length), 6200);
    return () => window.clearInterval(interval);
  }, []);

  const selectPhase = (index: number) => setActiveIndex((index + methodPhases.length) % methodPhases.length);
  const handleKeys = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === "Home" ? 0 : event.key === "End" ? methodPhases.length - 1 : index + (event.key === "ArrowRight" ? 1 : -1);
    const normalized = (next + methodPhases.length) % methodPhases.length;
    selectPhase(normalized);
    document.getElementById(`method-tab-${normalized}`)?.focus();
  };

  return (
    <section className="page-shell grid grid-cols-12 gap-grid bg-surface py-section max-[940px]:grid-cols-6 max-[940px]:gap-y-16" id="method">
      <div className="reveal-on-scroll col-span-5 max-[1180px]:col-span-5 max-[940px]:col-span-full">
        <Eyebrow>{method.eyebrow}</Eyebrow>
        <h2 className="mt-6 max-w-[9ch] font-display text-[clamp(3.5rem,6vw,7rem)] font-semibold leading-[0.92] tracking-[-0.05em] max-[940px]:max-w-[10ch] max-[640px]:text-[clamp(3.1rem,13vw,4.8rem)]">{method.title}</h2>
        <p className="mt-8 max-w-[42ch] leading-[1.62] text-foreground/60">{method.description}</p>
      </div>

      <div className="reveal-on-scroll col-start-7 col-end-[-1] overflow-hidden border border-foreground/15 bg-canvas max-[1180px]:col-start-6 max-[940px]:col-span-full">
        <div className="flex justify-between border-b border-foreground/15 px-4 py-3 font-mono text-[0.55rem] uppercase tracking-[0.08em] text-foreground/55"><span>{method.systemLabel}</span><span className="flex items-center gap-2"><i className="size-1.5 rounded-full bg-accent shadow-[0_0_10px_var(--color-accent)]" /> {method.liveLabel}</span></div>
        <div className="method-scene relative min-h-[30rem] overflow-hidden max-[640px]:min-h-[22.5rem]" id="method-panel" role="tabpanel" aria-labelledby={`method-tab-${activeIndex}`}>
          <div className="method-grid absolute inset-0 opacity-45" />
          <div className="absolute -left-20 top-8 size-64 rounded-full bg-accent/15 blur-3xl" />
          <div className="absolute -right-24 bottom-6 size-72 rounded-full bg-foreground/10 blur-3xl" />
          <div className="absolute inset-[9%_7%_14%] overflow-hidden border border-foreground/20 bg-surface shadow-2xl max-[640px]:inset-[9%_5%_12%]">
            <Image className="object-cover" key={phaseConfig.image + activeIndex} src={phaseConfig.image} fill sizes="(max-width: 940px) 90vw, 48vw" alt={phase.alt} unoptimized />
            <div className="absolute inset-0 bg-gradient-to-t from-canvas/90 via-transparent to-canvas/15" />
            <div className="absolute bottom-3 left-3 right-3 border border-foreground/20 bg-canvas/75 p-3 font-mono text-[0.54rem] uppercase tracking-[0.08em] backdrop-blur-md">
              <div className="flex items-center justify-between gap-3"><span className="text-accent">{phase.name}</span><strong className="font-medium text-foreground/75">{phase.semantic}</strong></div>
              <div className="mt-3 grid grid-cols-4 gap-1" aria-hidden="true">{[0, 1, 2, 3].map((item) => <i className={cn("h-1 bg-foreground/20", item <= activeIndex && "bg-accent")} key={item} />)}</div>
            </div>
            <span className="absolute right-3 top-3 font-display text-6xl font-semibold text-foreground/25">{phaseConfig.code}</span>
          </div>
          <div className="absolute left-3 top-1/2 grid gap-2 font-mono text-[0.48rem] text-foreground/45 max-[640px]:hidden">{method.phases.map((item, index) => <span className={cn("flex items-center gap-2", index === activeIndex && "text-accent")} key={item.name}><i className="h-px w-3 bg-current" />0{index + 1} {item.name.toUpperCase()}</span>)}</div>
        </div>
        <div className="grid grid-cols-2 gap-4 border-t border-foreground/15 p-4 max-[640px]:grid-cols-1"><div><span className="font-mono text-[0.53rem] tracking-[0.08em] text-accent">{phase.tag}</span><strong className="mt-1 block font-display text-2xl">{phase.name}</strong></div><p className="text-sm leading-[1.55] text-foreground/60">{phase.detail}</p></div>
        <div className="grid grid-cols-3 border-t border-foreground/15" role="tablist" aria-label={method.tabsLabel}>
          {method.phases.map((item, index) => (
            <button
              key={methodPhases[index].code}
              id={`method-tab-${index}`}
              className={cn("border-r border-foreground/15 px-3 py-4 font-mono text-[0.58rem] uppercase tracking-[0.08em] text-foreground/45 transition-colors last:border-r-0 hover:text-foreground", index === activeIndex && "bg-foreground/10 text-foreground")}
              onClick={() => selectPhase(index)}
              onKeyDown={(event) => handleKeys(event, index)}
              role="tab"
              aria-selected={index === activeIndex}
              aria-controls="method-panel"
              tabIndex={index === activeIndex ? 0 : -1}
            ><span className="mr-2 text-accent">{methodPhases[index].code}</span>{item.name}</button>
          ))}
        </div>
      </div>
    </section>
  );
}
