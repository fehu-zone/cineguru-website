"use client";

import { useEffect, useRef, type RefObject } from "react";

import type { Locale } from "@/i18n/config";

export function usePageProgress({
  locale,
  stages,
  serviceRef,
}: {
  locale: Locale;
  stages: string[];
  serviceRef: RefObject<HTMLDivElement | null>;
}) {
  const stageLabelRef = useRef<HTMLSpanElement>(null);
  const timecodeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  useEffect(() => {
    let frame = 0;
    const root = document.documentElement;
    const timecodeDisplays = Array.from(document.querySelectorAll<HTMLElement>(".tc-display"));
    const services = serviceRef.current;
    let maxScroll = 1;
    let serviceStart = 0;
    let serviceEnd = 1;

    const measurePage = () => {
      maxScroll = Math.max(1, root.scrollHeight - window.innerHeight);
      if (!services) return;
      serviceStart = services.offsetTop - window.innerHeight * 0.72;
      serviceEnd = services.offsetTop + services.offsetHeight - window.innerHeight * 0.32;
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        const progress = Math.min(1, Math.max(0, window.scrollY / maxScroll));
        root.style.setProperty("--page-progress", String(progress));

        const totalFrames = Math.floor(progress * 90 * 24);
        const seconds = Math.floor(totalFrames / 24);
        const frames = totalFrames % 24;
        const timecode = `TC 00:${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}:${String(frames).padStart(2, "0")}`;
        if (timecodeRef.current) timecodeRef.current.textContent = timecode;
        timecodeDisplays.forEach((element) => { element.textContent = timecode; });

        if (services) {
          const serviceProgress = Math.min(1, Math.max(0, (window.scrollY - serviceStart) / Math.max(1, serviceEnd - serviceStart)));
          services.style.setProperty("--service-progress", String(serviceProgress));
        }

        const nextStage = Math.min(stages.length - 1, Math.floor(progress * stages.length));
        if (stageLabelRef.current) stageLabelRef.current.textContent = `0${nextStage + 1} · ${stages[nextStage]}`;
        frame = 0;
      });
    };

    const resizeObserver = new ResizeObserver(measurePage);
    resizeObserver.observe(root);
    if (services) resizeObserver.observe(services);
    window.addEventListener("resize", measurePage, { passive: true });
    measurePage();
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measurePage);
      resizeObserver.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [serviceRef, stages]);

  return { stageLabelRef, timecodeRef };
}

export function useRevealOnScroll(): void {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nodes = document.querySelectorAll(".reveal-on-scroll");
    const revealAll = () => nodes.forEach((node) => node.classList.add("is-visible"));

    if (!reducedMotion) document.documentElement.classList.add("motion-ready");
    if (reducedMotion || !("IntersectionObserver" in window)) {
      revealAll();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.08, rootMargin: "0px 0px -4%" },
    );

    nodes.forEach((node) => observer.observe(node));
    const fallback = window.setTimeout(revealAll, 1400);
    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
      document.documentElement.classList.remove("motion-ready");
    };
  }, []);
}
