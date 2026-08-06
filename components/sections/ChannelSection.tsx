"use client";

import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent, type ReactNode } from "react";

import { reels, siteConfig } from "@/data/site";
import type { Messages } from "@/i18n/config";
import type { ActiveVideo } from "@/components/ui/VideoModal";
import { ReelPoster } from "@/components/ui/ResponsiveMedia";

type ChannelMessages = Messages["channel"];

function DraggableContentRail({ children }: { children: ReactNode }) {
  const railRef = useRef<HTMLDivElement>(null);
  const [isScrollable, setIsScrollable] = useState(false);
  const dragRef = useRef({ pointerId: -1, mode: "idle" as "idle" | "pending" | "horizontal", startX: 0, startY: 0, startScrollLeft: 0, moved: false });

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    const updateScrollableState = () => {
      setIsScrollable(rail.scrollWidth > rail.clientWidth + 1);
    };

    updateScrollableState();
    const observer = new ResizeObserver(updateScrollableState);
    observer.observe(rail);
    return () => observer.disconnect();
  }, []);

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || event.button !== 0 || !isScrollable) return;
    dragRef.current = {
      pointerId: event.pointerId,
      mode: "pending",
      startX: event.clientX,
      startY: event.clientY,
      startScrollLeft: event.currentTarget.scrollLeft,
      moved: false,
    };
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;
    const drag = dragRef.current;
    if (drag.pointerId !== event.pointerId || drag.mode === "idle") return;
    const deltaX = event.clientX - drag.startX;
    const deltaY = event.clientY - drag.startY;

    if (drag.mode === "pending") {
      if (Math.max(Math.abs(deltaX), Math.abs(deltaY)) < 7) return;
      if (Math.abs(deltaY) >= Math.abs(deltaX)) {
        dragRef.current.pointerId = -1;
        dragRef.current.mode = "idle";
        return;
      }
      dragRef.current.mode = "horizontal";
      dragRef.current.moved = true;
      event.currentTarget.classList.add("is-dragging");
      try { event.currentTarget.setPointerCapture(event.pointerId); } catch { /* optional */ }
    }

    event.preventDefault();
    if (Math.abs(deltaX) > 5) dragRef.current.moved = true;
    event.currentTarget.scrollLeft = drag.startScrollLeft - deltaX;
  };

  const handlePointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;
    event.currentTarget.classList.remove("is-dragging");
    if (dragRef.current.pointerId !== event.pointerId) return;
    const moved = dragRef.current.moved;
    dragRef.current.pointerId = -1;
    dragRef.current.mode = "idle";
    if (moved) window.setTimeout(() => { dragRef.current.moved = false; }, 0);
    try { event.currentTarget.releasePointerCapture(event.pointerId); } catch { /* optional */ }
  };

  const handleClickCapture = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!dragRef.current.moved) return;
    event.preventDefault();
    event.stopPropagation();
    dragRef.current.moved = false;
  };

  return (
    <div
      ref={railRef}
      className={`horizontal-drag-surface no-scrollbar flex w-full snap-x snap-mandatory gap-grid overflow-x-auto overflow-y-hidden pb-3 [touch-action:pan-x_pan-y] ${isScrollable ? "cursor-grab" : "cursor-default"}`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onLostPointerCapture={handlePointerUp}
      onClickCapture={handleClickCapture}
      onDragStart={(event) => event.preventDefault()}
    >
      {children}
    </div>
  );
}

function PlatformContentPanel({
  channel,
  messages,
  onOpenVideo,
}: {
  channel: ChannelMessages;
  messages: Messages;
  onOpenVideo: (video: ActiveVideo) => void;
}) {
  const overline = channel.youtubeOverline;
  const title = channel.youtubePanelTitle;
  const description = channel.youtubePanelDescription;
  const cta = channel.youtubeChannel;
  const channelHref = siteConfig.social[2].href;

  return (
    <article>
      <div className="mb-8 flex items-end justify-between gap-5 border-b border-foreground/20 pb-4 max-[640px]:items-start max-[640px]:flex-col">
        <div>
          <p className="font-mono text-[0.59rem] font-bold uppercase tracking-[0.1em] text-accent">{overline}</p>
          <h3 className="mt-4 max-w-[15ch] font-display text-[clamp(2.5rem,5vw,5.8rem)] [font-weight:560] leading-[0.92] tracking-[-0.05em]">{title}</h3>
          <p className="mt-5 max-w-[42ch] leading-[1.55] text-foreground/60">{description}</p>
        </div>
        <a className="shrink-0 font-mono text-[0.61rem] font-bold uppercase tracking-[0.09em] text-foreground transition-colors hover:text-accent" href={channelHref} target="_blank" rel="noreferrer">{cta} ↗</a>
      </div>

      <DraggableContentRail>
        {reels.map((reel) => {
          const content = channel.reels[reel.id];
          return (
            <a
              key={reel.id}
              href={`https://www.youtube.com/shorts/${reel.youtubeId}`}
              className="group block w-[min(30vw,22rem)] shrink-0 snap-start max-[640px]:w-[min(80vw,20rem)]"
              data-cursor-label={messages.global.cursor}
              onClick={(event) => {
                event.preventDefault();
                onOpenVideo({ id: reel.youtubeId, title: content.title, orientation: "vertical" });
              }}
              aria-label={`${content.title} — ${channel.watchReel}`}
            >
              <span className="block aspect-[9/16] overflow-hidden bg-surface"><ReelPoster slug={reel.slug} alt={content.alt} sizes="(max-width: 640px) 80vw, (max-width: 940px) 30vw, 22rem" /></span>
              <span className="block border-t border-foreground/20 py-4"><small className="font-mono text-[0.52rem] uppercase tracking-[0.08em] text-foreground/45">{content.type} · {reel.year}</small><strong className="mt-1 block font-display text-xl [font-weight:560] leading-[1.05] tracking-[-0.03em]">{content.title}</strong><i className="mt-2 block font-mono text-[0.52rem] not-italic text-foreground/55">{channel.watchReel} ↗</i></span>
            </a>
          );
        })}
      </DraggableContentRail>
    </article>
  );
}

export function ChannelSection({ messages, onOpenVideo }: { messages: Messages; onOpenVideo: (video: ActiveVideo) => void }) {
  const channel = messages.channel;

  return (
    <section className="channel-section page-shell py-section" aria-labelledby="channel-title">
      <div className="reveal-on-scroll mt-[clamp(2.5rem,3.5vw,3.5rem)]" data-reveal="panel">
        <div id="channel-tab-panel" className="channel-tab-panel min-h-[42rem]">
          <PlatformContentPanel channel={channel} messages={messages} onOpenVideo={onOpenVideo} />
        </div>
      </div>
    </section>
  );
}
