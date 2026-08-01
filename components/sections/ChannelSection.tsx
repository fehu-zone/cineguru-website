import { reels, siteConfig } from "@/data/site";
import type { Messages } from "@/i18n/config";
import type { ActiveVideo } from "@/components/ui/VideoModal";
import { ReelPoster } from "@/components/ui/ResponsiveMedia";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function ChannelSection({ messages, onOpenVideo }: { messages: Messages; onOpenVideo: (video: ActiveVideo) => void }) {
  const channel = messages.channel;

  return (
    <section className="channel-section page-shell py-section" aria-labelledby="channel-title">
      <SectionHeading eyebrow={channel.eyebrow} title={channel.title} description={channel.description} titleId="channel-title" />
      <div className="mt-[clamp(4rem,7vw,7rem)] grid grid-cols-12 gap-grid max-[940px]:grid-cols-6 max-[940px]:gap-y-20">
        <a className="reveal-on-scroll group col-span-4 max-[940px]:col-start-2 max-[940px]:col-span-4 max-[640px]:col-span-full max-[640px]:mx-auto max-[640px]:w-[min(100%,24.375rem)]" href={siteConfig.social[0].href} target="_blank" rel="noreferrer" aria-label={channel.instagramAria}>
          <div className="aspect-[550/909] overflow-hidden bg-surface">
            <picture>
              <source srcSet="/assets/instagram-studio-feed-v1.avif" type="image/avif" />
              <img className="size-full object-cover transition-transform duration-700 group-hover:scale-[1.025]" src="/assets/instagram-studio-feed-v1.webp" width="550" height="909" loading="lazy" decoding="async" sizes="(max-width: 940px) 86vw, 34vw" alt={channel.instagramAlt} />
            </picture>
          </div>
          <div className="grid grid-cols-[1fr_auto] gap-4 border-t border-foreground/20 py-4 max-[640px]:grid-cols-1">
            <div><p className="font-mono text-[0.54rem] uppercase tracking-[0.09em] text-foreground/50">{channel.instagramOverline}</p><h3 className="mt-2 font-display text-[clamp(1.5rem,2.2vw,2.4rem)] font-semibold leading-tight tracking-[-0.035em]">{channel.instagramTitle}</h3></div>
            <span className="self-end font-mono text-[0.55rem] text-foreground/60">{channel.instagramLink} ↗</span>
          </div>
        </a>

        <article className="reveal-on-scroll col-start-6 col-end-[-1] min-w-0 max-[940px]:col-span-full">
          <div className="flex justify-between border-b border-foreground/20 pb-3 font-mono text-[0.58rem] uppercase tracking-[0.08em] text-foreground/55"><span>{channel.youtubeOverline}</span><a className="text-foreground transition-colors hover:text-accent" href={siteConfig.social[2].href} target="_blank" rel="noreferrer">{channel.youtubeChannel} ↗</a></div>
          <div className="mt-5 grid grid-cols-2 gap-grid max-[640px]:-mx-page max-[640px]:grid-flow-col max-[640px]:grid-cols-none max-[640px]:auto-cols-[min(72vw,17.5rem)] max-[640px]:snap-x max-[640px]:snap-mandatory max-[640px]:overflow-x-auto max-[640px]:px-page max-[640px]:pb-3">
            {reels.map((reel) => {
              const content = channel.reels[reel.id];
              return (
                <a key={reel.id} href={`https://www.youtube.com/shorts/${reel.youtubeId}`} className="group block max-[640px]:snap-start" data-cursor-label={messages.global.cursor} onClick={(event) => { event.preventDefault(); onOpenVideo({ id: reel.youtubeId, title: content.title, orientation: "vertical" }); }} aria-label={`${content.title} — ${channel.watchReel}`}>
                  <span className="block aspect-[9/16] overflow-hidden bg-surface"><ReelPoster slug={reel.slug} alt={content.alt} sizes="(max-width: 640px) 72vw, (max-width: 940px) 44vw, 28vw" /></span>
                  <span className="block border-t border-foreground/20 py-4"><small className="font-mono text-[0.52rem] uppercase tracking-[0.08em] text-foreground/45">{content.type} · {reel.year}</small><strong className="mt-1 block font-display text-xl tracking-[-0.025em]">{content.title}</strong><i className="mt-2 block font-mono text-[0.52rem] not-italic text-foreground/55">{channel.watchReel} ↗</i></span>
                </a>
              );
            })}
          </div>
        </article>
      </div>
    </section>
  );
}
