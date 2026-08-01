"use client";

import {
  useEffect,
  useRef,
  type CSSProperties,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
  type Ref,
} from "react";

import { brands } from "@/data/site";
import { useElementInView, useMotionPolicy } from "@/hooks/useMotion";
import { ClientLogo } from "@/components/ui/ClientLogo";

const temporaryBrands = [
  { label: "Geçici referans 01", id: "temporary-rta", logo: "/assets/references/RTA-1-1.webp", scale: 0.95 },
  { label: "Geçici referans 02", id: "temporary-vasso", logo: "/assets/references/Vasso.webp", scale: 1.35 },
  { label: "Geçici referans 03", id: "temporary-vodafone", logo: "/assets/references/Vodafone.webp", scale: 1.25 },
] as const;

const carouselBrands = [...brands, ...temporaryBrands];
const carouselSpeed = 72;

function getBrandScale(brand: (typeof carouselBrands)[number]) {
  return brand.id === "vialand" ? 1.05 : brand.scale;
}

function getMobileBrandScale(brand: (typeof carouselBrands)[number]) {
  if (brand.id === "world-ethnosport") return 1;
  return getBrandScale(brand);
}

function BrandGroup({
  duplicateKey,
  groupRef,
  desktopOnly = false,
}: {
  duplicateKey?: string;
  groupRef?: Ref<HTMLDivElement>;
  desktopOnly?: boolean;
}) {
  return (
    <div
      ref={groupRef}
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
  const trackRef = useRef<HTMLDivElement>(null);
  const firstGroupRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<Animation | null>(null);
  const animationDurationRef = useRef(0);
  const desktopGroupWidthRef = useRef(0);
  const canAutoPlayRef = useRef(false);
  const isDraggingRef = useRef(false);
  const dragRef = useRef({
    pointerId: -1,
    mode: "idle" as "idle" | "pending" | "horizontal",
    isMobile: false,
    startX: 0,
    startY: 0,
    startAnimationTime: 0,
    startScrollLeft: 0,
  });
  const { documentVisible, pageScrolling, reducedMotion } = useMotionPolicy();
  const inView = useElementInView(viewportRef);
  const canAutoPlay = inView && documentVisible && !pageScrolling && !reducedMotion;

  useEffect(() => {
    canAutoPlayRef.current = canAutoPlay;
  }, [canAutoPlay]);

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    const firstGroup = firstGroupRef.current;
    if (!viewport || !track || !firstGroup) return;

    const mobileQuery = window.matchMedia("(max-width: 600px)");
    const buildAnimation = () => {
      const previousAnimation = animationRef.current;
      const previousDuration = animationDurationRef.current;
      const previousTime = Number(previousAnimation?.currentTime ?? 0);
      const progress = previousDuration > 0
        ? ((previousTime % previousDuration) + previousDuration) % previousDuration / previousDuration
        : 0;

      previousAnimation?.cancel();
      animationRef.current = null;
      animationDurationRef.current = 0;

      const groupWidth = firstGroup.getBoundingClientRect().width;
      desktopGroupWidthRef.current = groupWidth;

      if (!mobileQuery.matches) {
        track.style.transform = "none";
        track.style.willChange = "auto";
        if (groupWidth > 0) viewport.scrollLeft = groupWidth;
        return;
      }

      viewport.scrollLeft = 0;
      if (groupWidth <= 0 || typeof track.animate !== "function") return;

      const duration = groupWidth / carouselSpeed * 1000;
      const animation = track.animate(
        [
          { transform: "translate3d(0, 0, 0)" },
          { transform: `translate3d(${-groupWidth}px, 0, 0)` },
        ],
        { duration, iterations: Infinity, easing: "linear" },
      );
      animation.currentTime = progress * duration;
      animationDurationRef.current = duration;
      animationRef.current = animation;
      track.style.willChange = canAutoPlayRef.current ? "transform" : "auto";
      if (!canAutoPlayRef.current) animation.pause();
    };

    const resizeObserver = new ResizeObserver(buildAnimation);
    resizeObserver.observe(firstGroup);
    mobileQuery.addEventListener("change", buildAnimation);
    buildAnimation();

    return () => {
      resizeObserver.disconnect();
      mobileQuery.removeEventListener("change", buildAnimation);
      animationRef.current?.cancel();
      animationRef.current = null;
    };
  }, []);

  useEffect(() => {
    const animation = animationRef.current;
    const track = trackRef.current;
    if (!animation || !track) return;

    if (canAutoPlay && !isDraggingRef.current) {
      track.style.willChange = "transform";
      animation.play();
    } else {
      animation.pause();
      track.style.willChange = "auto";
    }
  }, [canAutoPlay]);

  const normalizeDesktopScroll = (viewport: HTMLDivElement, keepDragOrigin: boolean) => {
    if (window.matchMedia("(max-width: 600px)").matches) return;
    const groupWidth = desktopGroupWidthRef.current;
    if (groupWidth <= 0) return;

    let nextScrollLeft = viewport.scrollLeft;
    let correction = 0;
    while (nextScrollLeft < groupWidth * 0.5) {
      nextScrollLeft += groupWidth;
      correction += groupWidth;
    }
    while (nextScrollLeft > groupWidth * 1.5) {
      nextScrollLeft -= groupWidth;
      correction -= groupWidth;
    }

    if (correction === 0) return;
    viewport.scrollLeft = nextScrollLeft;
    if (keepDragOrigin && dragRef.current.pointerId >= 0 && !dragRef.current.isMobile) {
      dragRef.current.startScrollLeft += correction;
    }
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;

    const isMobile = window.matchMedia("(max-width: 600px)").matches;
    dragRef.current = {
      pointerId: event.pointerId,
      mode: isMobile && event.pointerType !== "mouse" ? "pending" : "horizontal",
      isMobile,
      startX: event.clientX,
      startY: event.clientY,
      startAnimationTime: Number(animationRef.current?.currentTime ?? 0),
      startScrollLeft: event.currentTarget.scrollLeft,
    };

    if (dragRef.current.mode === "horizontal") {
      isDraggingRef.current = true;
      animationRef.current?.pause();
      event.currentTarget.classList.add("is-dragging");
    }

    if (dragRef.current.mode === "horizontal" || dragRef.current.mode === "pending") {
      try {
        event.currentTarget.setPointerCapture(event.pointerId);
      } catch {
        // Pointer capture is optional.
      }
    }
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (drag.pointerId !== event.pointerId || drag.mode === "idle") return;

    const deltaX = event.clientX - drag.startX;
    const deltaY = event.clientY - drag.startY;

    if (drag.mode === "pending") {
      if (Math.max(Math.abs(deltaX), Math.abs(deltaY)) < 7) return;
      if (Math.abs(deltaY) >= Math.abs(deltaX)) {
        dragRef.current.mode = "idle";
        dragRef.current.pointerId = -1;
        try {
          event.currentTarget.releasePointerCapture(event.pointerId);
        } catch {
          // Pointer capture may already be released.
        }
        return;
      }

      dragRef.current.mode = "horizontal";
      isDraggingRef.current = true;
      animationRef.current?.pause();
      const animationTime = Number(animationRef.current?.currentTime ?? 0);
      dragRef.current.startAnimationTime = animationTime + deltaX / carouselSpeed * 1000;
      event.currentTarget.classList.add("is-dragging");
      try {
        event.currentTarget.setPointerCapture(event.pointerId);
      } catch {
        // Pointer capture is optional.
      }
    }

    event.preventDefault();
    if (!drag.isMobile) {
      event.currentTarget.scrollLeft = drag.startScrollLeft - deltaX;
      normalizeDesktopScroll(event.currentTarget, true);
      return;
    }

    const animation = animationRef.current;
    const duration = animationDurationRef.current;
    if (!animation || duration <= 0) return;

    const nextTime = drag.startAnimationTime - deltaX / carouselSpeed * 1000;
    animation.currentTime = ((nextTime % duration) + duration) % duration;
  };

  const handlePointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    event.currentTarget.classList.remove("is-dragging");
    if (dragRef.current.pointerId !== event.pointerId) return;

    dragRef.current.pointerId = -1;
    dragRef.current.mode = "idle";
    isDraggingRef.current = false;
    if (canAutoPlayRef.current) animationRef.current?.play();
    try {
      event.currentTarget.releasePointerCapture(event.pointerId);
    } catch {
      // Pointer capture may already be released.
    }
  };

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    const direction = event.key === "ArrowRight" ? 1 : -1;
    event.currentTarget.scrollBy({
      left: direction * Math.max(280, event.currentTarget.clientWidth * 0.55),
      behavior: reducedMotion ? "auto" : "smooth",
    });
  };

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    normalizeDesktopScroll(event.currentTarget, true);
  };

  return (
    <div
      ref={viewportRef}
      className="horizontal-drag-surface no-scrollbar mx-auto w-full max-w-site cursor-grab select-none overflow-x-auto overflow-y-hidden overscroll-x-contain touch-pan-y max-[600px]:overflow-hidden"
      tabIndex={0}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onLostPointerCapture={handlePointerUp}
      onKeyDown={handleKeyDown}
      onScroll={handleScroll}
    >
      <div ref={trackRef} className="flex w-max items-center">
        <BrandGroup groupRef={firstGroupRef} />
        <BrandGroup duplicateKey="-duplicate-1" />
        <BrandGroup duplicateKey="-duplicate-2" desktopOnly />
      </div>
    </div>
  );
}
