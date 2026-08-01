import { useEffect, useRef, type PointerEvent as ReactPointerEvent, type Ref } from "react";

import { brands, siteConfig } from "@/data/site";
import type { Messages } from "@/i18n/config";
import { ButtonLink, TextLink } from "@/components/ui/Button";
import { CameraHud } from "@/components/ui/CameraHud";
import { ClientLogo } from "@/components/ui/ClientLogo";
import { Eyebrow } from "@/components/ui/SectionHeading";

function HeroBrandTicker() {
  const trackRef = useRef<HTMLDivElement>(null);
  const group1Ref = useRef<HTMLDivElement>(null);

  const offsetRef = useRef(0);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const startOffsetRef = useRef(0);

  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();
    const speed = 95; // 95px per second

    const loop = (currentTime: number) => {
      const deltaTime = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;

      const track = trackRef.current;
      const group1 = group1Ref.current;

      if (window.innerWidth <= 600 && track && group1) {
        const groupWidth = group1.offsetWidth;

        if (!isDraggingRef.current && groupWidth > 0) {
          offsetRef.current -= speed * deltaTime;
        }

        if (groupWidth > 0) {
          while (offsetRef.current <= -groupWidth) {
            offsetRef.current += groupWidth;
          }
          while (offsetRef.current > 0) {
            offsetRef.current -= groupWidth;
          }
        }

        track.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
      } else if (track) {
        track.style.transform = "none";
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handlePointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (window.innerWidth > 600) return;
    isDraggingRef.current = true;
    startXRef.current = e.clientX;
    startOffsetRef.current = offsetRef.current;
    try {
      (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
    } catch {
      // fallback if pointer capture fails
    }
  };

  const handlePointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current || window.innerWidth > 600) return;
    const deltaX = e.clientX - startXRef.current;
    offsetRef.current = startOffsetRef.current + deltaX;

    const group1 = group1Ref.current;
    if (group1) {
      const groupWidth = group1.offsetWidth;
      if (groupWidth > 0) {
        while (offsetRef.current <= -groupWidth) {
          offsetRef.current += groupWidth;
          startOffsetRef.current += groupWidth;
        }
        while (offsetRef.current > 0) {
          offsetRef.current -= groupWidth;
          startOffsetRef.current -= groupWidth;
        }
      }
    }

    if (trackRef.current) {
      trackRef.current.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
    }
  };

  const handlePointerUp = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      try {
        (e.currentTarget as HTMLElement).releasePointerCapture?.(e.pointerId);
      } catch {
        // fallback
      }
    }
  };

  return (
    <div
      className="mx-auto w-full max-w-site select-none overflow-hidden touch-pan-y"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      <div
        ref={trackRef}
        className="flex w-max items-center will-change-transform max-[600px]:flex min-[601px]:grid min-[601px]:w-full min-[601px]:grid-cols-[repeat(13,minmax(0,1fr))] min-[601px]:items-center min-[601px]:gap-[clamp(1.4rem,2.8vw,3.2rem)] min-[900px]:grid-cols-[repeat(13,minmax(0,1fr))] max-[900px]:grid-cols-[repeat(7,minmax(0,1fr))] max-[900px]:gap-y-4"
      >
        <div ref={group1Ref} className="max-[600px]:flex max-[600px]:shrink-0 max-[600px]:items-center max-[600px]:gap-10 max-[600px]:pr-10 min-[601px]:contents">
          {brands.map((brand) => (
            <ClientLogo
              className="h-[5.125rem] w-full opacity-90 max-[900px]:h-[3.875rem] max-[600px]:h-16 max-[600px]:w-32 max-[600px]:shrink-0 max-[600px]:opacity-100"
              scale={brand.scale}
              key={brand.id}
              src={brand.logo}
              alt={brand.label}
              loading="eager"
            />
          ))}
        </div>
        <div className="hidden max-[600px]:flex max-[600px]:shrink-0 max-[600px]:items-center max-[600px]:gap-10 max-[600px]:pr-10" aria-hidden="true">
          {brands.map((brand) => (
            <ClientLogo
              className="h-16 w-32 shrink-0 opacity-100"
              scale={brand.scale}
              key={`${brand.id}-dup1`}
              src={brand.logo}
              alt=""
              width={128}
              height={64}
              loading="eager"
            />
          ))}
        </div>
        <div className="hidden max-[600px]:flex max-[600px]:shrink-0 max-[600px]:items-center max-[600px]:gap-10 max-[600px]:pr-10" aria-hidden="true">
          {brands.map((brand) => (
            <ClientLogo
              className="h-16 w-32 shrink-0 opacity-100"
              scale={brand.scale}
              key={`${brand.id}-dup2`}
              src={brand.logo}
              alt=""
              width={128}
              height={64}
              loading="eager"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function HeroSection({ messages, timecodeRef }: { messages: Messages; timecodeRef: Ref<HTMLSpanElement> }) {
  const hero = messages.hero;

  return (
    <section className="relative isolate h-[max(47.5rem,100svh)] w-full max-w-none overflow-hidden" id="top">
      <div className="absolute bottom-24 left-5 right-5 top-[4.6rem] z-10 hidden max-[640px]:block">
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

      <div className="relative z-[5] ml-[max(calc(var(--spacing-page)+2rem),calc((100vw-var(--container-site))/2+var(--spacing-page)+2rem))] w-[min(58vw,47.5rem)] pt-[clamp(10rem,24vh,19rem)] max-[900px]:ml-page max-[900px]:w-[min(78%,42.5rem)] max-[900px]:pt-[clamp(8rem,20vh,13rem)] max-[600px]:ml-5 max-[600px]:w-[calc(100%-2.5rem)] max-[600px]:pt-[clamp(11.5rem,28vh,16.5rem)]">
        <Eyebrow>{hero.eyebrow}</Eyebrow>
        <h1 className="mt-[clamp(1.25rem,2.3vw,2.1rem)] font-display text-[clamp(3.6rem,6.25vw,7.35rem)] font-semibold leading-[0.91] tracking-[-0.045em] max-[600px]:mt-3 max-[600px]:text-[clamp(3.1rem,13vw,3.75rem)] max-[600px]:leading-[0.96] max-[600px]:tracking-[-0.04em]">
          <span className="max-[600px]:hidden">
            {hero.titleLines.map((line) => <span className="hero-title-line block whitespace-nowrap" key={line}>{line}</span>)}
          </span>
          <span className="hidden max-[600px]:block">
            {hero.mobileTitleLines.map((line) => <span className="block whitespace-nowrap" key={line}>{line}</span>)}
          </span>
        </h1>
        <p className="mt-[clamp(1.5rem,2.8vw,2.4rem)] max-w-[35.625rem] text-[clamp(1rem,calc(.35vw+.95rem),1.22rem)] leading-[1.56] text-foreground/75 max-[600px]:mt-4 max-[600px]:max-w-[32ch] max-[600px]:text-[1.12rem] max-[600px]:font-medium max-[600px]:leading-[1.45] max-[600px]:text-foreground/90">
          {hero.description}
        </p>
        <div className="mt-8 flex items-center gap-6 max-[600px]:mt-8 max-[600px]:flex-col max-[600px]:items-stretch max-[600px]:gap-3.5">
          <ButtonLink className="max-[600px]:min-h-[3.75rem] max-[600px]:w-full max-[600px]:justify-center max-[600px]:text-[0.88rem] max-[600px]:font-bold max-[600px]:tracking-[0.06em]" href="#work">
            {hero.primaryCta}<span className="grid size-7 place-items-center rounded-full bg-black/10 text-canvas" aria-hidden="true">↓</span>
          </ButtonLink>
          <TextLink className="max-[600px]:hidden" href="#contact">{messages.navigation.projectCta}<span aria-hidden="true">↗</span></TextLink>
          <ButtonLink variant="light" className="min-[601px]:!hidden max-[600px]:flex max-[600px]:min-h-[3.75rem] max-[600px]:w-full max-[600px]:justify-center max-[600px]:text-[0.88rem] max-[600px]:font-bold max-[600px]:tracking-[0.06em]" href="#contact">
            {messages.navigation.projectCta}<span aria-hidden="true">↗</span>
          </ButtonLink>
        </div>
      </div>

      <div className="absolute bottom-5 left-[max(var(--spacing-page),calc((100vw-var(--container-site))/2+2rem))] right-page z-[5] grid grid-cols-[1fr_auto_auto] items-center gap-6 font-mono text-[0.55rem] font-semibold uppercase tracking-[0.09em] text-foreground/55 max-[900px]:left-page max-[640px]:hidden">
        <p>{hero.foot}</p>
        <div className="flex gap-2 max-[640px]:hidden">{hero.tags.map((tag) => <span className="rounded-full border border-foreground/15 px-3 py-1.5" key={tag}>{tag}</span>)}</div>
        <a className="flex items-center gap-2 text-foreground" href="#work">{hero.discover}<span aria-hidden="true">↓</span></a>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-20 overflow-hidden border-t border-foreground/15 bg-canvas/95 px-page py-[1.5rem] backdrop-blur-md max-[600px]:px-0 max-[600px]:py-3.5" aria-label={hero.clientsLabel}>
        <HeroBrandTicker />
      </div>
    </section>
  );
}

