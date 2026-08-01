"use client";

import { useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent } from "react";

import { projects } from "@/data/site";
import type { Messages } from "@/i18n/config";
import type { ActiveVideo } from "@/components/ui/VideoModal";
import { ProjectPoster } from "@/components/ui/ResponsiveMedia";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ReferenceCarousel } from "@/components/ui/ReferenceCarousel";
import { useAutoAdvance } from "@/hooks/useMotion";
import { cn } from "@/lib/classNames";

function TypewriterText({ text, startDelay = 0 }: { text: string; startDelay?: number }) {
  return (
    <span aria-label={text}>
      {Array.from(text).map((character, index) => (
        <span
          className="typewriter-character"
          style={{ "--typewriter-delay": `${startDelay + index * 18}ms` } as CSSProperties}
          aria-hidden="true"
          key={`${index}-${character}`}
        >
          {character}
        </span>
      ))}
    </span>
  );
}

export function WorkSection({ messages, onOpenVideo }: { messages: Messages; onOpenVideo: (video: ActiveVideo) => void }) {
  const work = messages.work;
  const featuredProjects = projects.filter((project) => project.featured);
  const archiveProjects = projects.filter((project) => !project.featured);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const autoplayRef = useRef<HTMLDivElement>(null);
  const tabsScrollerRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({
    pointerId: -1,
    mode: "idle" as "idle" | "pending" | "horizontal",
    startX: 0,
    startY: 0,
    startScrollLeft: 0,
    moved: false,
  });
  const activeProject = featuredProjects[activeIndex] ?? featuredProjects[0];
  const activeContent = work.projects[activeProject.id];

  const handleTabsPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    const scroller = event.currentTarget;
    dragRef.current = {
      pointerId: event.pointerId,
      mode: "pending",
      startX: event.clientX,
      startY: event.clientY,
      startScrollLeft: scroller.scrollLeft,
      moved: false,
    };

  };

  const handleTabsPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (dragRef.current.pointerId !== event.pointerId || dragRef.current.mode === "idle") return;
    const distance = event.clientX - dragRef.current.startX;
    const verticalDistance = event.clientY - dragRef.current.startY;

    if (dragRef.current.mode === "pending") {
      if (Math.max(Math.abs(distance), Math.abs(verticalDistance)) < 7) return;
      if (Math.abs(verticalDistance) >= Math.abs(distance)) {
        dragRef.current.pointerId = -1;
        dragRef.current.mode = "idle";
        return;
      }
      dragRef.current.mode = "horizontal";
      event.currentTarget.classList.add("is-dragging");
      dragRef.current.moved = true;
      try {
        event.currentTarget.setPointerCapture(event.pointerId);
      } catch {
        // Pointer capture is optional.
      }
    }

    event.preventDefault();
    event.currentTarget.scrollLeft = dragRef.current.startScrollLeft - distance;
  };

  const handleTabsPointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    event.currentTarget.classList.remove("is-dragging");
    if (dragRef.current.pointerId !== event.pointerId) return;
    const dragged = dragRef.current.moved;
    dragRef.current.pointerId = -1;
    dragRef.current.mode = "idle";
    try {
      event.currentTarget.releasePointerCapture(event.pointerId);
    } catch {
      // Pointer capture may already be released.
    }
    if (dragged) window.setTimeout(() => { dragRef.current.moved = false; }, 0);
  };

  useAutoAdvance({
    containerRef: autoplayRef,
    delay: 5600,
    enabled: !isPaused && featuredProjects.length > 1,
    onAdvance: () => {
      setActiveIndex((index) => (index + 1) % featuredProjects.length);
    },
  });

  return (
    <section className="bg-canvas text-foreground" id="work">
      <div className="bg-canvas text-foreground">
        <div className="page-shell pb-[clamp(3rem,5vw,5rem)] pt-[clamp(6rem,11vw,13rem)] max-[600px]:pt-20">
          <SectionHeading eyebrow={work.eyebrow} title={work.title} description={work.description} />
        </div>
      </div>

      <div className="page-shell pb-section pt-[clamp(2.5rem,3.5vw,3.5rem)]">

      <div className="reveal-on-scroll mt-0" ref={autoplayRef}>
        <div className="mb-5 flex items-center justify-between gap-4 border-b border-foreground/15 pb-3">
          <p className="font-mono text-[0.61rem] font-semibold tracking-[0.1em] text-foreground/55">{work.caseStudiesLabel}</p>
          <span className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.12em] text-accent">{work.referenceLabel}</span>
        </div>

        <div className="overflow-hidden border border-foreground/15 bg-surface">
          <div className="flex items-center border-b border-foreground/15" role="tablist" aria-label={work.referenceTabsLabel}>
            <div
              className="horizontal-drag-surface case-tabs-scroller flex min-w-0 flex-1 cursor-grab select-none touch-pan-y overflow-x-auto"
              ref={tabsScrollerRef}
              onPointerDown={handleTabsPointerDown}
              onPointerMove={handleTabsPointerMove}
              onPointerUp={handleTabsPointerUp}
              onPointerCancel={handleTabsPointerUp}
              onLostPointerCapture={handleTabsPointerUp}
            >
              {featuredProjects.map((project, index) => {
                const content = work.projects[project.id];
                const isActive = index === activeIndex;
                return (
                  <button
                    className={cn(
                      "relative shrink-0 cursor-pointer border-r border-foreground/15 px-5 py-4 font-mono text-[0.66rem] font-semibold uppercase tracking-[0.08em] transition-colors duration-300 last:border-r-0 max-[640px]:px-4",
                      isActive ? "text-foreground" : "text-foreground/55 hover:text-accent",
                    )}
                    type="button"
                    id={project.id}
                    data-video-id={project.youtubeId}
                    role="tab"
                    aria-selected={isActive}
                    aria-controls="featured-case-study"
                    onClick={() => {
                      if (dragRef.current.moved) {
                        dragRef.current.moved = false;
                        return;
                      }
                      setActiveIndex(index);
                    }}
                    key={project.id}
                  >
                    {content.title}
                    <i className={cn("absolute inset-x-0 bottom-0 h-px origin-left bg-accent transition-transform duration-500", isActive ? "scale-x-100" : "scale-x-0")} />
                  </button>
                );
              })}
            </div>
            <div className="ml-5 mr-4 shrink-0 border-l border-foreground/15 pl-5 max-[640px]:ml-3 max-[640px]:mr-3 max-[640px]:pl-3">
              <button
                className="rounded-full border border-foreground/20 px-3 py-2 font-mono text-[0.58rem] uppercase tracking-[0.08em] text-foreground/75 transition-colors hover:border-accent hover:text-accent"
                type="button"
                aria-pressed={isPaused}
                onClick={() => setIsPaused((paused) => !paused)}
              >
                <span aria-hidden="true">{isPaused ? "▶" : "Ⅱ"}</span> {isPaused ? work.resumeLabel : work.pauseLabel}
              </button>
            </div>
          </div>

          <div className="grid min-h-[42rem] grid-cols-[minmax(0,1.05fr)_minmax(18rem,0.95fr)] items-center gap-10 overflow-hidden px-[clamp(1.5rem,5vw,5rem)] py-[clamp(2.5rem,6vw,5.5rem)] max-[760px]:min-h-[48rem] max-[760px]:grid-cols-1 max-[760px]:gap-8" id="featured-case-study" role="tabpanel" aria-labelledby={activeProject.id}>
            <button
              className="group min-w-0 cursor-pointer text-left"
              type="button"
              data-cursor-label={messages.global.cursor}
              onClick={() => onOpenVideo({ id: activeProject.youtubeId, title: activeContent.title, orientation: "landscape" })}
              aria-label={`${activeContent.title} - ${work.watchLabel}`}
              key={activeProject.id}
            >
              <p className="mb-5 font-mono text-[0.78rem] font-bold uppercase tracking-[0.13em] text-accent">{activeContent.type} · {activeProject.year}</p>
              <blockquote className="max-w-[31ch] font-display text-[clamp(1.8rem,3.3vw,3.7rem)] [font-weight:560] leading-[1.03] tracking-[-0.04em]">
                <TypewriterText text={`\u201c${activeContent.caseStudy[0]?.text ?? activeContent.title}\u201d`} />
              </blockquote>
              {activeContent.caseStudy[1] ? <p className="mt-6 max-w-[54ch] text-[0.95rem] leading-[1.55]"><TypewriterText startDelay={850} text={activeContent.caseStudy[1].text} /></p> : null}
              <footer className="mt-8 font-body text-[0.9rem] leading-[1.4] text-foreground/75">
                <strong className="font-semibold">{activeContent.title}</strong><br />{activeContent.caseStudy[2]?.text ?? "Cineguru Studio"}
              </footer>
            </button>

            <a
              className="group relative block aspect-video overflow-hidden bg-canvas"
              href={`https://www.youtube.com/watch?v=${activeProject.youtubeId}`}
              data-cursor-label={messages.global.cursor}
              onClick={(event) => { event.preventDefault(); onOpenVideo({ id: activeProject.youtubeId, title: activeContent.title, orientation: "landscape" }); }}
              aria-label={`${activeContent.title} - ${work.watchLabel}`}
              key={`${activeProject.id}-poster`}
            >
              <ProjectPoster slug={activeProject.slug} alt={activeContent.alt} sizes="(max-width: 760px) 100vw, 42vw" />
              <span className="absolute inset-0 bg-gradient-to-t from-canvas/75 via-transparent to-canvas/10 opacity-70 transition-opacity duration-500 group-hover:opacity-100" aria-hidden="true" />
              <span className="pointer-events-none absolute bottom-4 right-4 translate-y-2 rounded-full bg-foreground/90 px-4 py-2.5 font-mono text-[0.75rem] font-semibold uppercase tracking-[0.1em] text-canvas opacity-0 shadow-[0_5px_20px_rgba(0,0,0,0.28)] backdrop-blur-md transition-[opacity,transform,background-color] duration-300 group-hover:translate-y-0 group-hover:opacity-100" aria-hidden="true">{work.watchLabel}</span>
            </a>
          </div>
        </div>

        <div className="mt-8 border-y border-foreground/15 py-6">
          <p className="mb-5 font-mono text-[0.61rem] font-semibold uppercase tracking-[0.1em] text-foreground/55">{work.referenceBrandsLabel}</p>
          <ReferenceCarousel />
        </div>
      </div>

      <p className="reveal-on-scroll mb-5 mt-[clamp(5rem,8vw,8rem)] border-b border-foreground/15 pb-3 font-mono text-[0.61rem] font-semibold tracking-[0.1em] text-foreground/55">{work.archiveLabel}</p>
      <div className="grid grid-cols-4 gap-grid max-[1180px]:grid-cols-2 max-[640px]:grid-cols-1">
        {archiveProjects.map((project, index) => {
          const content = work.projects[project.id];
          return (
            <article className="reveal-on-scroll" style={{ "--stagger": index } as CSSProperties} key={project.id}>
              <a
                className="group block"
                href={`https://www.youtube.com/watch?v=${project.youtubeId}`}
                data-cursor-label={messages.global.cursor}
                onClick={(event) => { event.preventDefault(); onOpenVideo({ id: project.youtubeId, title: content.title, orientation: "landscape" }); }}
                aria-label={`${content.title} - ${work.watchLabel}`}
              >
                <div className="relative aspect-video overflow-hidden bg-surface">
                  <ProjectPoster slug={project.slug} alt={content.alt} sizes="(max-width: 640px) 100vw, (max-width: 1180px) 50vw, 25vw" />
                  <span className="pointer-events-none absolute bottom-4 right-4 translate-y-2 rounded-full bg-foreground/90 px-4 py-2.5 font-mono text-[0.75rem] font-semibold uppercase tracking-[0.1em] text-canvas opacity-0 shadow-[0_5px_20px_rgba(0,0,0,0.28)] backdrop-blur-md transition-[opacity,transform,background-color] duration-300 group-hover:translate-y-0 group-hover:opacity-100" aria-hidden="true">{work.watchLabel}</span>
                </div>
                <div className="flex min-h-24 items-start justify-between gap-3 border-b border-foreground/15 py-4">
                  <div><p className="font-mono text-[0.53rem] uppercase tracking-[0.08em] text-foreground/50">{content.type}</p><h3 className="mt-1 font-display text-[clamp(1.25rem,1.5vw,1.8rem)] [font-weight:560] leading-[1.04] tracking-[-0.035em]">{content.title}</h3></div>
                  <span className="font-mono text-[0.55rem] text-foreground/50">{project.year}</span>
                </div>
              </a>
            </article>
          );
        })}
      </div>
      </div>
    </section>
  );
}
