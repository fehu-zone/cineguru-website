"use client";

import { useRef, useState, type KeyboardEvent, type PointerEvent as ReactPointerEvent, type ReactNode } from "react";

import { reels, siteConfig } from "@/data/site";
import type { Messages } from "@/i18n/config";
import type { ActiveVideo } from "@/components/ui/VideoModal";
import { ReelPoster } from "@/components/ui/ResponsiveMedia";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/classNames";

type ChannelTab = "youtube" | "instagram";
type ChannelMessages = Messages["channel"];

const testReels = Array.from({ length: 6 }, (_, index) => {
  const source = reels[index % reels.length];
  return { ...source, id: `${source.id}-test-${index}`, sourceId: source.id };
});

function DraggableContentRail({ children }: { children: ReactNode }) {
  const dragRef = useRef({ pointerId: -1, mode: "idle" as "idle" | "pending" | "horizontal", startX: 0, startY: 0, startScrollLeft: 0, moved: false });

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
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
      className="horizontal-drag-surface no-scrollbar flex w-full cursor-grab gap-grid overflow-x-auto overflow-y-hidden pb-3 touch-pan-y"
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
  platform,
  channel,
  messages,
  onOpenVideo,
}: {
  platform: ChannelTab;
  channel: ChannelMessages;
  messages: Messages;
  onOpenVideo: (video: ActiveVideo) => void;
}) {
  const isInstagram = platform === "instagram";
  const overline = isInstagram ? channel.instagramOverline : channel.youtubeOverline;
  const title = isInstagram ? channel.instagramPanelTitle : channel.youtubePanelTitle;
  const description = isInstagram ? channel.instagramPanelDescription : channel.youtubePanelDescription;
  const cta = isInstagram ? channel.instagramLink : channel.youtubeChannel;
  const channelHref = isInstagram ? siteConfig.social[0].href : siteConfig.social[2].href;

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
        {testReels.map((reel) => {
          const content = channel.reels[reel.sourceId];
          return (
            <a
              key={reel.id}
              href={`https://www.youtube.com/shorts/${reel.youtubeId}`}
              className="group block w-[min(30vw,22rem)] shrink-0 max-[640px]:w-[min(72vw,17.5rem)]"
              data-cursor-label={messages.global.cursor}
              onClick={(event) => {
                event.preventDefault();
                onOpenVideo({ id: reel.youtubeId, title: content.title, orientation: "vertical" });
              }}
              aria-label={`${content.title} — ${channel.watchReel}`}
            >
              <span className="block aspect-[9/16] overflow-hidden bg-surface"><ReelPoster slug={reel.slug} alt={content.alt} sizes="(max-width: 640px) 72vw, (max-width: 940px) 30vw, 22rem" /></span>
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
  const [activeTab, setActiveTab] = useState<ChannelTab>("youtube");
  const tabs: ChannelTab[] = ["youtube", "instagram"];

  const handleTabKeys = (event: KeyboardEvent<HTMLButtonElement>, tab: ChannelTab) => {
    if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const index = tabs.indexOf(tab);
    const nextIndex = event.key === "Home" ? 0 : event.key === "End" ? tabs.length - 1 : (index + (event.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length;
    const nextTab = tabs[nextIndex];
    setActiveTab(nextTab);
    document.getElementById(`channel-tab-${nextTab}`)?.focus();
  };

  return (
    <section className="channel-section page-shell py-section" aria-labelledby="channel-title">
      <SectionHeading eyebrow={channel.eyebrow} title={channel.title} description={channel.description} titleId="channel-title" />
      <div className="mt-[clamp(2.5rem,3.5vw,3.5rem)]">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-5 border-b border-foreground/20 pb-3" role="tablist" aria-label={channel.tabsLabel}>
          <div className="flex gap-1 rounded-full border border-foreground/20 bg-surface/70 p-1">
            {tabs.map((tab, index) => {
              const selected = activeTab === tab;
              return (
                <button
                  key={tab}
                  id={`channel-tab-${tab}`}
                  className={cn("flex min-h-10 items-center gap-3 rounded-full px-4 py-2 font-mono text-[0.61rem] font-bold uppercase tracking-[0.08em] transition-colors duration-300 max-[480px]:gap-2 max-[480px]:px-3 max-[480px]:text-[0.54rem]", selected ? "bg-foreground text-canvas" : "text-foreground/55 hover:text-foreground")}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls="channel-tab-panel"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActiveTab(tab)}
                  onKeyDown={(event) => handleTabKeys(event, tab)}
                ><span className={cn(selected && "text-accent")}>0{index + 1}</span>{tab === "instagram" ? channel.instagramTab : channel.youtubeTab}</button>
              );
            })}
          </div>
          <span className="font-mono text-[0.57rem] uppercase tracking-[0.1em] text-foreground/40">{activeTab === "instagram" ? channel.instagramOverline : channel.youtubeOverline}</span>
        </div>

        <div id="channel-tab-panel" role="tabpanel" aria-labelledby={`channel-tab-${activeTab}`} className="channel-tab-panel min-h-[42rem]" key={activeTab}>
          <PlatformContentPanel platform={activeTab} channel={channel} messages={messages} onOpenVideo={onOpenVideo} />
        </div>
      </div>
    </section>
  );
}
