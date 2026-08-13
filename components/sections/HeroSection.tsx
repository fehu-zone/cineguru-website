"use client";

import type { Ref } from "react";

import { siteConfig } from "@/data/site";
import type { Locale, Messages } from "@/i18n/config";
import { trackWhatsappClick } from "@/lib/analytics";
import { ButtonLink, TextLink } from "@/components/ui/Button";
import { CameraHud } from "@/components/ui/CameraHud";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { ViewportVideo } from "@/components/ui/ViewportVideo";
import { ReferenceCarousel } from "@/components/ui/ReferenceCarousel";

export function HeroSection({ messages, timecodeRef, locale = "tr" }: { messages: Messages; timecodeRef: Ref<HTMLSpanElement>; locale?: Locale }) {
  const hero = messages.hero;
  const whatsappHref = siteConfig.getWhatsappHref(locale);

  return (
    <section className="relative isolate min-h-[100svh] w-full max-w-none overflow-hidden" id="top">
      <div className="pointer-events-none absolute bottom-20 left-5 right-5 top-[4.6rem] z-10 hidden max-[640px]:block">
        <CameraHud />
      </div>

      <div className="absolute inset-0 z-0 overflow-hidden bg-surface">
        <ViewportVideo
          className="size-full scale-[1.025] object-cover [filter:blur(1.8px)_brightness(.56)_contrast(1.05)_saturate(1.08)] max-[600px]:[filter:blur(1.3px)_brightness(.5)_contrast(1.04)_saturate(1.08)]"
          poster={siteConfig.showreel.poster}
          src={siteConfig.showreel.video}
          mobileSrc={siteConfig.showreel.mobileVideo}
        />
        <div className="hero-cinematic-overlay absolute inset-0" />
        <div className="pointer-events-none absolute inset-3 max-[640px]:hidden">
          <CameraHud timecodeRef={timecodeRef} />
        </div>
      </div>

      <div className="relative z-30 ml-[max(calc(var(--spacing-page)+2rem),calc((100vw-var(--container-site))/2+var(--spacing-page)+2rem))] w-[min(58vw,47.5rem)] pb-28 pt-[clamp(10rem,24vh,19rem)] max-[900px]:ml-page max-[900px]:w-[min(78%,42.5rem)] max-[900px]:pt-[clamp(8rem,20vh,13rem)] max-[600px]:ml-5 max-[600px]:w-[calc(100%-2.5rem)] max-[600px]:pt-[clamp(7.5rem,18vh,11.5rem)]">
        <Eyebrow>{hero.eyebrow}</Eyebrow>
        <h1 className="mt-[clamp(1.25rem,2.3vw,2.1rem)] font-display text-[clamp(3.6rem,6.25vw,7.35rem)] font-semibold leading-[0.91] tracking-[-0.045em] max-[600px]:mt-3 max-[600px]:text-[clamp(1.85rem,7.8vw,2.75rem)] max-[600px]:leading-[1.02] max-[600px]:tracking-[-0.035em]">
          <span className="max-[600px]:hidden">
            {hero.titleLines.map((line) => (
              <span className="hero-title-line block whitespace-nowrap" key={line}>
                {line}
              </span>
            ))}
          </span>
          <span className="hidden max-[600px]:block">
            {hero.mobileTitleLines.map((line) => (
              <span className="block whitespace-normal break-words" key={line}>
                {line}
              </span>
            ))}
          </span>
        </h1>
        <p className="mt-[clamp(1.5rem,2.8vw,2.4rem)] max-w-[35.625rem] text-[clamp(1rem,calc(.35vw+.95rem),1.22rem)] leading-[1.56] text-foreground/75 max-[600px]:mt-4 max-[600px]:max-w-[32ch] max-[600px]:text-[1rem] max-[600px]:font-medium max-[600px]:leading-[1.45] max-[600px]:text-foreground/90">
          {hero.description}
        </p>
        <div className="relative z-30 mt-8 flex items-center gap-6 max-[600px]:mt-6 max-[600px]:flex-col max-[600px]:items-stretch max-[600px]:gap-3.5">
          <ButtonLink
            className="max-[600px]:min-h-[3.75rem] max-[600px]:w-full max-[600px]:justify-center max-[600px]:text-[0.88rem] max-[600px]:font-bold max-[600px]:tracking-[0.06em]"
            href="#work"
          >
            {hero.primaryCta}
            <span className="grid size-7 place-items-center rounded-full bg-white/20 text-white" aria-hidden="true">
              ↓
            </span>
          </ButtonLink>
          <TextLink
            className="max-[600px]:hidden"
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsappClick({ placement: "hero_desktop", language: locale })}
          >
            {messages.navigation.projectCta}
            <span aria-hidden="true">↗</span>
          </TextLink>
          <ButtonLink
            variant="light"
            className="min-[601px]:!hidden max-[600px]:flex max-[600px]:min-h-[3.75rem] max-[600px]:w-full max-[600px]:justify-center max-[600px]:text-[0.88rem] max-[600px]:font-bold max-[600px]:tracking-[0.06em]"
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsappClick({ placement: "hero_mobile", language: locale })}
          >
            {messages.navigation.projectCta}
            <span aria-hidden="true">↗</span>
          </ButtonLink>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-30">
        <ReferenceCarousel />
      </div>
    </section>
  );
}
