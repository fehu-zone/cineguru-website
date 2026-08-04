"use client";

import {
  useRef,
  type CSSProperties,
} from "react";

import { brands } from "@/data/site";
import { ClientLogo } from "@/components/ui/ClientLogo";

const temporaryBrands = [
  { label: "Geçici referans 01", id: "temporary-rta", logo: "/assets/references/RTA-1-1.webp", scale: 0.95 },
  { label: "Geçici referans 02", id: "temporary-vasso", logo: "/assets/references/Vasso.webp", scale: 1.35 },
  { label: "Geçici referans 03", id: "temporary-vodafone", logo: "/assets/references/Vodafone.webp", scale: 1.25 },
] as const;

const carouselBrands = [...brands, ...temporaryBrands];
const carouselStep = 320;

function getBrandScale(brand: (typeof carouselBrands)[number]) {
  return brand.id === "vialand" ? 1.05 : brand.scale;
}

function getMobileBrandScale(brand: (typeof carouselBrands)[number]) {
  if (brand.id === "world-ethnosport") return 1;
  return getBrandScale(brand);
}

function BrandGroup({
  duplicateKey,
  desktopOnly = false,
}: {
  duplicateKey?: string;
  desktopOnly?: boolean;
}) {
  return (
    <div
      className={`${desktopOnly ? "hidden min-[601px]:flex" : "flex"} shrink-0 items-center gap-[clamp(1.75rem,2.6vw,2.75rem)] pr-[clamp(1.75rem,2.6vw,2.75rem)] max-[600px]:gap-8 max-[600px]:pr-8`}
      aria-hidden={duplicateKey ? true : undefined}
    >
      {carouselBrands.map((brand) => {
        const scale = getBrandScale(brand);
        const mobileScale = getMobileBrandScale(brand);
        const desktopSlotWidth = 6.25 * Math.max(1, scale);
        const mobileBaseWidth = brand.id === "world-ethnosport" ? 9 : 8;
        const mobileSlotWidth = mobileBaseWidth * Math.max(1, mobileScale);

        return (
          <div
            className="flex h-[5.125rem] w-[var(--desktop-logo-slot)] shrink-0 items-center justify-center max-[900px]:h-[3.875rem] max-[600px]:h-[4.5rem] max-[600px]:w-[var(--mobile-logo-slot)]"
            style={{
              "--desktop-logo-slot": `${desktopSlotWidth}rem`,
              "--mobile-logo-slot": `${mobileSlotWidth}rem`,
            } as CSSProperties}
            key={`${brand.id}${duplicateKey ?? ""}`}
          >
            <ClientLogo
              className={`h-[5.125rem] w-[6.25rem] shrink-0 opacity-90 max-[900px]:h-[3.875rem] max-[600px]:opacity-100 ${brand.id === "world-ethnosport" ? "max-[600px]:h-[4.5rem] max-[600px]:w-36" : "max-[600px]:h-16 max-[600px]:w-32"}`}
              scale={scale}
              mobileScale={mobileScale}
              src={brand.logo}
              alt={duplicateKey ? "" : brand.label}
              draggable={false}
              loading="lazy"
              decoding="async"
            />
          </div>
        );
      })}
    </div>
  );
}

export function ReferenceCarousel() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const firstGroupRef = useRef<HTMLDivElement>(null);

  const getGroupWidth = () => firstGroupRef.current?.offsetWidth || 0;

  const move = (direction: 1 | -1) => {
    const viewport = viewportRef.current;
    const groupWidth = getGroupWidth();
    if (!viewport || !groupWidth) return;

    const currentScroll = viewport.scrollLeft;

    if (direction === 1) {
      // If we are reaching near the end of group 2, wrap back seamlessly to group 1
      if (currentScroll >= groupWidth * 2) {
        viewport.classList.remove("scroll-smooth");
        viewport.scrollLeft = currentScroll - groupWidth;
        void viewport.offsetWidth; // force reflow
        viewport.classList.add("scroll-smooth");
      }
      viewport.scrollBy({ left: carouselStep, behavior: "smooth" });
    } else {
      // If we are near the start of group 1, wrap forward seamlessly to group 2
      if (currentScroll <= carouselStep / 2) {
        viewport.classList.remove("scroll-smooth");
        viewport.scrollLeft = currentScroll + groupWidth;
        void viewport.offsetWidth; // force reflow
        viewport.classList.add("scroll-smooth");
      }
      viewport.scrollBy({ left: -carouselStep, behavior: "smooth" });
    }
  };

  const handleScroll = () => {
    const viewport = viewportRef.current;
    const groupWidth = getGroupWidth();
    if (!viewport || !groupWidth) return;

    if (viewport.scrollLeft >= groupWidth * 2.5) {
      viewport.classList.remove("scroll-smooth");
      viewport.scrollLeft -= groupWidth;
      void viewport.offsetWidth;
      viewport.classList.add("scroll-smooth");
    } else if (viewport.scrollLeft <= 5) {
      viewport.classList.remove("scroll-smooth");
      viewport.scrollLeft += groupWidth;
      void viewport.offsetWidth;
      viewport.classList.add("scroll-smooth");
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    move(event.key === "ArrowRight" ? 1 : -1);
  };

  return (
    <div className="relative mx-auto w-full max-w-site">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-canvas via-canvas/85 to-transparent" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-canvas via-canvas/85 to-transparent" aria-hidden="true" />
      <button type="button" aria-label="Önceki markalar" onClick={() => move(-1)} className="group absolute left-0 top-1/2 z-20 grid size-10 -translate-y-1/2 place-items-center text-foreground/70 transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
        <svg className="size-5 transition-transform duration-300 group-hover:-translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true"><path d="m15 5-7 7 7 7" /></svg>
      </button>
      <button type="button" aria-label="Sonraki markalar" onClick={() => move(1)} className="group absolute right-0 top-1/2 z-20 grid size-10 -translate-y-1/2 place-items-center text-foreground/70 transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
        <svg className="size-5 transition-transform duration-300 group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true"><path d="m9 5 7 7-7 7" /></svg>
      </button>
      <div
        ref={viewportRef}
        className="no-scrollbar w-full overflow-hidden overscroll-x-contain scroll-smooth select-none"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onScroll={handleScroll}
      >
        <div className="flex w-max items-center">
          <div ref={firstGroupRef} className="flex items-center">
            <BrandGroup />
          </div>
          <BrandGroup duplicateKey="-duplicate-1" />
          <BrandGroup duplicateKey="-duplicate-2" />
          <BrandGroup duplicateKey="-duplicate-3" />
        </div>
      </div>
    </div>
  );
}
