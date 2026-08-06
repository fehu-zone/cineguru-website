"use client";

import { useRef } from "react";
import { brands } from "@/data/site";
import { ClientLogo } from "@/components/ui/ClientLogo";

export function ReferenceCarousel() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: -1 | 1) => {
    if (!scrollerRef.current) return;
    const amount = scrollerRef.current.clientWidth * 0.5;
    scrollerRef.current.scrollBy({ left: direction * amount, behavior: "smooth" });
  };

  const brandList = [...brands, ...brands, ...brands];

  return (
    <div className="relative w-full overflow-hidden border-t border-white/15 bg-[#0f0f0f]/95 py-5 backdrop-blur-xl sm:py-7">
      {/* Left Arrow Button */}
      <button
        type="button"
        onClick={() => scroll(-1)}
        className="group absolute left-3 top-1/2 z-30 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-white/25 bg-black/80 text-white transition-all hover:scale-110 hover:border-accent hover:bg-accent focus-visible:outline-2 focus-visible:outline-accent max-[640px]:left-2 max-[640px]:size-9"
        aria-label="Önceki markalar"
      >
        <svg className="size-5 transition-transform duration-200 group-hover:-translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
          <path d="m15 18-6-6 6-6" />
        </svg>
      </button>

      {/* Right Arrow Button */}
      <button
        type="button"
        onClick={() => scroll(1)}
        className="group absolute right-3 top-1/2 z-30 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-white/25 bg-black/80 text-white transition-all hover:scale-110 hover:border-accent hover:bg-accent focus-visible:outline-2 focus-visible:outline-accent max-[640px]:right-2 max-[640px]:size-9"
        aria-label="Sonraki markalar"
      >
        <svg className="size-5 transition-transform duration-200 group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
          <path d="m9 18 6-6-6-6" />
        </svg>
      </button>

      {/* Left Fade Gradient */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-16 bg-gradient-to-r from-[#0f0f0f] via-[#0f0f0f]/80 to-transparent sm:w-24" aria-hidden="true" />
      {/* Right Fade Gradient */}
      <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-16 bg-gradient-to-l from-[#0f0f0f] via-[#0f0f0f]/80 to-transparent sm:w-24" aria-hidden="true" />

      {/* Scrollable Track */}
      <div
        ref={scrollerRef}
        className="no-scrollbar flex w-full overflow-x-auto scroll-smooth select-none"
      >
        <div className="flex w-max animate-marquee items-center gap-12 px-14 sm:gap-16 sm:px-20 hover:[animation-play-state:paused]">
          {brandList.map((brand, index) => (
            <div
              key={`${brand.id}-${index}`}
              className="flex shrink-0 items-center justify-center opacity-90 transition-all duration-300 hover:scale-105 hover:opacity-100"
            >
              <ClientLogo
                src={brand.logo}
                alt={brand.label}
                className="h-9 w-auto max-w-[9.5rem] object-contain brightness-0 invert filter sm:h-12 sm:max-w-[12rem] md:h-14 md:max-w-[14rem]"
                scale={brand.scale}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
