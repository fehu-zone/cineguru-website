"use client";

import {
  Component,
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

import type { Messages } from "@/i18n/config";
import { cn } from "@/lib/classNames";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { useElementInView, useMotionPolicy } from "@/hooks/useMotion";

const loadServicesScene = () =>
  import("./ServicesScene").then((module) => ({ default: module.ServicesScene }));

const ServicesScene = lazy(loadServicesScene);

const loadServicesSplineScene = () =>
  import("./ServicesSplineScene").then((module) => ({ default: module.ServicesSplineScene }));

const ServicesSplineScene = lazy(loadServicesSplineScene);

class ServicesSceneErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <div className="services-canvas-fallback services-canvas-fallback--error" />;
    }

    return this.props.children;
  }
}

export function ServicesSection({ messages }: { messages: Messages }) {
  const services = messages.services;
  // The services section must always enter on 01 / Strategy.
  const [activeIndex, setActiveIndex] = useState(0);
  const [threeIndex, setThreeIndex] = useState(0);
  const [sceneMounted, setSceneMounted] = useState(false);
  const [splineMounted, setSplineMounted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useElementInView(sectionRef, { rootMargin: "200px 0px" });
  const { documentVisible, pageScrolling, reducedMotion } = useMotionPolicy();
  const sceneActive = inView && documentVisible && !pageScrolling;

  useEffect(() => {
    let cancelled = false;
    const idleWindow = window as unknown as {
      requestIdleCallback?: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number;
      cancelIdleCallback?: (handle: number) => void;
    };
    const preload = () => {
      void import("./ServicesScene").then((module) => {
        if (!cancelled) module.preloadServicesScene(0);
      });
    };

    if (idleWindow.requestIdleCallback && idleWindow.cancelIdleCallback) {
      const idleId = idleWindow.requestIdleCallback(preload, { timeout: 1800 });
      return () => {
        cancelled = true;
        idleWindow.cancelIdleCallback?.(idleId);
      };
    }

    const timer = window.setTimeout(preload, 900);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (sceneMounted || !sceneActive) return;
    const frame = window.requestAnimationFrame(() => setSceneMounted(true));
    return () => window.cancelAnimationFrame(frame);
  }, [sceneActive, sceneMounted]);

  const preloadService = useCallback((index: number) => {
    if (index === 3) {
      void loadServicesSplineScene();
      return;
    }

    void import("./ServicesScene").then((module) => module.preloadServicesScene(index));
  }, []);

  const selectService = useCallback((index: number) => {
    const normalized = (index + services.items.length) % services.items.length;
    preloadService(normalized);
    if (normalized < 3) setThreeIndex(normalized);
    else setSplineMounted(true);
    setActiveIndex(normalized);
  }, [preloadService, services.items.length]);

  const handleKeys = useCallback((event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const count = services.items.length;
    const next = event.key === "Home" ? 0 : event.key === "End" ? count - 1 : index + (event.key === "ArrowRight" ? 1 : -1);
    const normalized = (next + count) % count;
    selectService(normalized);
    document.getElementById(`service-tab-${normalized}`)?.focus();
  }, [services.items.length, selectService]);

  const active = services.items[activeIndex];

  return (
    <section
      ref={sectionRef}
      className="page-shell py-section text-foreground"
      id="services"
    >
      {/* ─── Heading ─── */}
      <div className="reveal-on-scroll">
        <Eyebrow>{services.eyebrow}</Eyebrow>
        <h2 className="mt-6 max-w-[14ch] font-display text-[clamp(3.4rem,6.6vw,7.8rem)] [font-weight:580] leading-[1.02] tracking-[-0.045em] max-[640px]:text-[clamp(2rem,8.8vw,4.8rem)]">
          {services.title}
        </h2>
      </div>

      {/* ─── Tabs ─── */}
      <div
        className="reveal-on-scroll mt-[clamp(2.5rem,4vw,4rem)]"
        role="tablist"
        aria-label={services.eyebrow}
      >
        <div className="grid gap-0 max-[640px]:grid-cols-2" style={{ gridTemplateColumns: `repeat(${services.items.length}, 1fr)` }}>
          {services.items.map((service, index) => (
            <button
              key={service.title}
              id={`service-tab-${index}`}
              className={cn(
                "services-tab border-t border-foreground/10 px-2 pb-4 pt-5 text-left font-mono text-[0.58rem] uppercase tracking-[0.08em] text-foreground/35 transition-colors duration-300 hover:text-foreground/65 max-[640px]:pb-3 max-[640px]:pt-4",
                index === activeIndex && "services-tab-active text-foreground",
              )}
              style={{ "--tab-progress": index === activeIndex ? 1 : 0 } as CSSProperties}
              onClick={() => selectService(index)}
              onPointerEnter={() => preloadService(index)}
              onFocus={() => preloadService(index)}
              onKeyDown={(e) => handleKeys(e, index)}
              role="tab"
              aria-selected={index === activeIndex}
              tabIndex={index === activeIndex ? 0 : -1}
            >
              <span className="text-accent mr-1.5">{String(index + 1).padStart(2, "0")}</span>
              {service.title}
            </button>
          ))}
        </div>
      </div>

      {/* ─── Active service info row ─── */}
      <div className="services-detail-panel reveal-on-scroll mt-[clamp(2rem,3vw,3rem)] grid grid-cols-12 items-start gap-grid max-[940px]:grid-cols-6 max-[640px]:grid-cols-1 max-[640px]:gap-y-4" key={activeIndex}>
        <div className="col-span-1 max-[640px]:col-span-1">
          <span className="font-mono text-[0.58rem] uppercase tracking-[0.08em] text-accent">
            {String(activeIndex + 1).padStart(2, "0")} / {String(services.items.length).padStart(2, "0")}
          </span>
        </div>
        <h3 className="col-start-2 col-span-3 font-display text-[clamp(1.8rem,2.8vw,3.2rem)] [font-weight:560] leading-[1.02] tracking-[-0.035em] max-[940px]:col-start-2 max-[940px]:col-span-2 max-[640px]:col-start-1 max-[640px]:col-span-1">
          {active.title}
        </h3>
        <p className="col-start-6 col-span-4 max-w-[42ch] text-[0.96rem] leading-[1.62] text-foreground/55 max-[940px]:col-start-4 max-[940px]:col-span-3 max-[640px]:col-start-1 max-[640px]:col-span-1">
          {active.description}
        </p>
        <div className="col-start-10 col-span-3 flex flex-wrap gap-2 max-[940px]:col-start-1 max-[940px]:col-span-6 max-[940px]:mt-3 max-[640px]:col-start-1 max-[640px]:col-span-1 max-[640px]:mt-1">
          {active.tags.map((tag) => (
            <span
              className="rounded-full border border-foreground/15 px-3.5 py-1.5 font-mono text-[0.52rem] uppercase tracking-[0.06em] text-foreground/50"
              key={tag}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* ─── 3D Canvas — full width, large ─── */}
      <div
        className="reveal-on-scroll mt-[clamp(2rem,3vw,3rem)]"
      >
        {/* ─── 3D Canvas — full width, large ─── */}
        <div className="services-canvas-container services-canvas-container--full">
          <div className="services-scene-layer">
            {sceneMounted ? (
              <>
                <div className={cn("absolute inset-0", activeIndex === 3 && "invisible pointer-events-none")}>
                  <ServicesSceneErrorBoundary>
                    <Suspense fallback={<div className="services-canvas-fallback" />}>
                      <ServicesScene active={sceneActive && activeIndex !== 3} activeIndex={threeIndex} reducedMotion={reducedMotion} />
                    </Suspense>
                  </ServicesSceneErrorBoundary>
                </div>
                {splineMounted ? (
                  <div className={cn("absolute inset-0", activeIndex !== 3 && "invisible pointer-events-none")}>
                    <Suspense fallback={<div className="services-canvas-fallback" />}>
                      <ServicesSplineScene active={sceneActive && activeIndex === 3} activeIndex={3} />
                    </Suspense>
                  </div>
                ) : null}
              </>
            ) : (
              <div className="services-canvas-fallback" />
            )}
          </div>
          {/* ─── Cinematic HUD overlay + 3 Floating Glassmorphism Info Boxes ─── */}
          <div className={`services-canvas-hud services-canvas-hud-${activeIndex}`} key={`hud-cards-${activeIndex}`}>
            <span className="services-hud-corner services-hud-tl" />
            <span className="services-hud-corner services-hud-tr" />
            <span className="services-hud-corner services-hud-bl" />
            <span className="services-hud-corner services-hud-br" />
            <span className="services-hud-label services-hud-label-top">CG / PRODÜKSIYON SİSTEMİ</span>
            <span className="services-hud-label services-hud-label-bottom">
              <i className="services-hud-dot" /> AKTİF · {String(activeIndex + 1).padStart(2, "0")}
            </span>

            {/* 3 Floating Info Boxes around 3D scene */}
            {[
              // 01 Strateji
              [
                { posClass: "top-10 left-10 max-[768px]:top-10 max-[768px]:left-3", code: "01 · STRATEJİ", title: "HEDEF & ANALİZ", desc: "Markanın hedeflerine uygun mesaj omurgasını oluştururuz." },
                { posClass: "top-10 right-10 max-[768px]:top-10 max-[768px]:right-3", code: "02 · ANLATI", title: "YARATICI KONSEPT", desc: "İzleyicinin hafızasında kalacak özgün fikir." },
                { posClass: "bottom-10 left-10 max-[768px]:bottom-10 max-[768px]:left-3", code: "03 · MİMARİ", title: "KAMPANYA KURGUSU", desc: "Tüm mecralarda çalışan yayın haritası." },
              ],
              // 02 Pre Production
              [
                { posClass: "top-10 left-10 max-[768px]:top-10 max-[768px]:left-3", code: "01 · ÇİZİM", title: "AI STORYBOARD", desc: "Senaryoyu kare kare üretken yapay zekâ ile görselleştiririz." },
                { posClass: "top-10 right-10 max-[768px]:top-10 max-[768px]:right-3", code: "02 · TUTARLILIK", title: "CHARACTER LOCK", desc: "Karakterlerin stil devamlılığını tüm sahnelerde koruruz." },
                { posClass: "bottom-10 left-10 max-[768px]:bottom-10 max-[768px]:left-3", code: "03 · TEKNİK", title: "PRODÜKSİYON PLANI", desc: "Kamera açıları ve detaylı çekim takvimi." },
              ],
              // 03 Production + AI Video
              [
                { posClass: "top-10 left-10 max-[768px]:top-10 max-[768px]:left-3", code: "01 · SET", title: "CANLI ÇEKİM", desc: "Deneyimli yönetmen ve görüntü ekibiyle çekim." },
                { posClass: "top-10 right-10 max-[768px]:top-10 max-[768px]:right-3", code: "02 · SENTEZ", title: "AI VIDEO DÜNYASI", desc: "Fiziksel mekan sınırlarını aşan üretken video sentezi." },
                { posClass: "bottom-10 left-10 max-[768px]:bottom-10 max-[768px]:left-3", code: "03 · DİL", title: "OPTİK & MOVEMENT", desc: "Sinematik camera lensleri ve akıcı hareket dili." },
              ],
              // 04 Post Production (The iconic 3D Robot Scene!)
              [
                { posClass: "top-10 left-10 max-[768px]:top-10 max-[768px]:left-3", code: "01 · TEMPO", title: "DİNAMİK KURGU", desc: "Kurgu masasında hikayenin ritmini ve hissini işleriz." },
                { posClass: "top-10 right-10 max-[768px]:top-10 max-[768px]:right-3", code: "02 · EFEKT", title: "VFX & COMPOSITING", desc: "AI ve klasik VFX tekniklerini tek karede buluştururuz." },
                { posClass: "bottom-10 left-10 max-[768px]:bottom-10 max-[768px]:left-3", code: "03 · FİNAL", title: "RENK & SES TASARIMI", desc: "Sinematik renk derecelendirmesi ve atmosferik ses dünyası." },
              ],
            ][activeIndex].map((box) => (
              <div
                key={box.title}
                className={cn(
                  "services-overlay-box absolute pointer-events-auto",
                  box.posClass
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[0.54rem] font-bold uppercase tracking-[0.08em] text-accent">
                    {box.code}
                  </span>
                  <i className="size-1.5 rounded-full bg-accent shadow-[0_0_8px_var(--color-accent)]" />
                </div>
                <h4 className="mt-1 font-display text-[0.88rem] font-semibold tracking-[-0.02em] text-foreground">
                  {box.title}
                </h4>
                <p className="mt-1 text-[0.72rem] leading-relaxed text-foreground/65 max-w-[24ch]">
                  {box.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ─── 3 Feature Cards Grid below Canvas ─── */}
        <div className="services-feature-grid mt-6 grid grid-cols-3 gap-grid max-[940px]:grid-cols-1 max-[940px]:gap-4" key={`feature-grid-${activeIndex}`}>
          {[
            [
              { code: "01", label: "HEDEF & ANALİZ", desc: "Markanın hedeflerine uygun mesaj omurgasını oluştururuz." },
              { code: "02", label: "YARATICI KONSEPT", desc: "İzleyicinin hafızasında yer edecek özgün ana fikir." },
              { code: "03", label: "KAMPANYA KURGUSU", desc: "Tüm mecralarda çalışan yayın kurgusu." },
            ],
            [
              { code: "01", label: "AI STORYBOARD", desc: "Senaryoyu kare kare üretken yapay zekâ ile görselleştiririz." },
              { code: "02", label: "CHARACTER LOCK", desc: "Karakterlerin yüz ve stil devamlılığını koruruz." },
              { code: "03", label: "PRODÜKSİYON PLANI", desc: "Kamera açıları, mekan ve çekim takvimi haritası." },
            ],
            [
              { code: "01", label: "CANLI ÇEKİM", desc: "Deneyimli yönetmen ve görüntü ekibiyle çekim." },
              { code: "02", label: "AI VIDEO DÜNYASI", desc: "Fiziksel mekan sınırlarını aşan üretken video sentezi." },
              { code: "03", label: "OPTİK & HAREKET", desc: "Sinematik camera lensleri ve akıcı hareket dili." },
            ],
            [
              { code: "01", label: "DİNAMİK KURGU", desc: "Kurgu masasında hikayenin ritmini ve hissini işleriz." },
              { code: "02", label: "VFX & COMPOSITING", desc: "AI ve klasik VFX tekniklerini tek karede buluştururuz." },
              { code: "03", label: "RENK & SES TASARIMI", desc: "Sinematik renk derecelendirmesi ve ses tasarımı." },
            ],
          ][activeIndex].map((card) => (
            <div
              key={card.label}
              className="group border border-foreground/10 bg-canvas/60 p-5 backdrop-blur-sm transition-all duration-300 hover:border-accent/40 hover:bg-canvas/90"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[0.56rem] font-bold tracking-[0.08em] text-accent">
                  {card.code}
                </span>
                <i className="size-1.5 rounded-full bg-foreground/20 transition-colors group-hover:bg-accent" />
              </div>
              <h4 className="mt-3 font-display text-[1.05rem] font-semibold leading-tight tracking-[-0.02em]">
                {card.label}
              </h4>
              <p className="mt-2 text-[0.85rem] leading-relaxed text-foreground/60">
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
