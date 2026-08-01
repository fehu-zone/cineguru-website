import type { Ref } from "react";
import Image from "next/image";

import { brands, siteConfig } from "@/data/site";
import type { Messages } from "@/i18n/config";
import { ButtonLink, TextLink } from "@/components/ui/Button";
import { CameraHud } from "@/components/ui/CameraHud";
import { Eyebrow } from "@/components/ui/SectionHeading";

export function HeroSection({ messages, timecodeRef }: { messages: Messages; timecodeRef: Ref<HTMLSpanElement> }) {
  const hero = messages.hero;

  return (
    <section className="relative isolate h-[max(47.5rem,100svh)] w-full max-w-none overflow-hidden" id="top">
      <div className="absolute inset-x-page bottom-[4.75rem] top-[4.6rem] z-10 hidden max-[640px]:block">
        <CameraHud />
      </div>

      <div className="absolute inset-0 z-0 overflow-hidden bg-surface">
        <video
          className="size-full scale-[1.025] object-cover [filter:blur(1.8px)_brightness(.56)_contrast(1.05)_saturate(1.08)] max-[600px]:[filter:blur(1.3px)_brightness(.5)_contrast(1.04)_saturate(1.08)]"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={siteConfig.showreel.poster}
          aria-hidden="true"
        >
          <source src={siteConfig.showreel.video} type="video/mp4" />
        </video>
        <div className="hero-cinematic-overlay absolute inset-0" />
        <div className="absolute inset-3 max-[640px]:hidden"><CameraHud timecodeRef={timecodeRef} /></div>
      </div>

      <div className="relative z-[5] ml-[max(var(--spacing-page),calc((100vw-var(--container-site))/2+2rem))] w-[min(58vw,47.5rem)] pt-[clamp(8rem,20vh,11rem)] max-[900px]:ml-page max-[900px]:w-[min(78%,42.5rem)] max-[600px]:mx-page max-[600px]:w-auto max-[600px]:pt-[clamp(7.5rem,18vh,10rem)]">
        <Eyebrow>{hero.eyebrow}</Eyebrow>
        <h1 className="mt-[clamp(1.25rem,2.3vw,2.1rem)] font-display text-[clamp(3.6rem,6.25vw,7.35rem)] font-semibold leading-[0.91] tracking-[-0.045em] max-[600px]:text-[clamp(2.45rem,12.5vw,4rem)] max-[600px]:leading-[0.96]">
          {hero.titleLines.map((line) => <span className="hero-title-line block whitespace-nowrap max-[600px]:whitespace-normal" key={line}>{line}</span>)}
        </h1>
        <p className="mt-[clamp(1.5rem,2.8vw,2.4rem)] max-w-[35.625rem] text-[clamp(1rem,calc(.35vw+.95rem),1.22rem)] leading-[1.56] text-foreground/75 max-[600px]:max-w-none max-[600px]:text-[0.96rem]">
          {hero.description}
        </p>
        <div className="mt-8 flex items-center gap-6 max-[600px]:mt-7 max-[600px]:flex-col max-[600px]:items-stretch max-[600px]:gap-3">
          <ButtonLink className="max-[600px]:w-full" href="#work">
            {hero.primaryCta}<span className="grid size-7 place-items-center rounded-full bg-canvas/15" aria-hidden="true">↓</span>
          </ButtonLink>
          <TextLink className="max-[600px]:self-center" href="#contact">{messages.navigation.projectCta}<span aria-hidden="true">↗</span></TextLink>
        </div>
      </div>

      <div className="absolute bottom-[7.1rem] left-[max(var(--spacing-page),calc((100vw-var(--container-site))/2+2rem))] right-page z-[5] grid grid-cols-[1fr_auto_auto] items-center gap-6 font-mono text-[0.55rem] font-semibold uppercase tracking-[0.09em] text-foreground/55 max-[900px]:left-page max-[640px]:bottom-[4.25rem] max-[640px]:grid-cols-[1fr_auto]">
        <p>{hero.foot}</p>
        <div className="flex gap-2 max-[640px]:hidden">{hero.tags.map((tag) => <span className="rounded-full border border-foreground/15 px-3 py-1.5" key={tag}>{tag}</span>)}</div>
        <a className="flex items-center gap-2 text-foreground" href="#work">{hero.discover}<span aria-hidden="true">↓</span></a>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-20 overflow-hidden border-t border-foreground/15 bg-canvas/95 px-page py-4 backdrop-blur-md max-[600px]:px-0 max-[600px]:py-2" aria-label={hero.clientsLabel}>
        <div className="hero-reference-track mx-auto grid w-full max-w-site grid-cols-[repeat(13,minmax(0,1fr))] items-center gap-[clamp(.8rem,1.8vw,2.1rem)] max-[900px]:grid-cols-[repeat(7,minmax(0,1fr))] max-[900px]:gap-y-2 max-[600px]:flex max-[600px]:w-max max-[600px]:max-w-none max-[600px]:gap-5">
          {brands.map((brand) => <Image className="h-[4.5rem] w-full object-contain opacity-75 max-[900px]:h-[3.5rem] max-[600px]:h-11 max-[600px]:w-28 max-[600px]:shrink-0" key={brand.id} src={brand.logo} alt={brand.label} width={180} height={72} unoptimized />)}
          {brands.map((brand) => <Image className="hidden h-11 w-28 shrink-0 object-contain opacity-75 max-[600px]:block" key={`${brand.id}-duplicate`} src={brand.logo} alt="" aria-hidden="true" width={112} height={44} unoptimized />)}
        </div>
      </div>
    </section>
  );
}
