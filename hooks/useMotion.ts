"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type RefObject } from "react";

type MotionSnapshot = {
  documentVisible: boolean;
  pageScrolling: boolean;
  reducedMotion: boolean;
  headerCompact: boolean;
};

const serverSnapshot: MotionSnapshot = {
  documentVisible: true,
  pageScrolling: false,
  reducedMotion: false,
  headerCompact: false,
};

let snapshot = serverSnapshot;
let stopEnvironment: (() => void) | null = null;
const subscribers = new Set<() => void>();

function updateSnapshot(patch: Partial<MotionSnapshot>) {
  const next = { ...snapshot, ...patch };
  if (
    next.documentVisible === snapshot.documentVisible &&
    next.pageScrolling === snapshot.pageScrolling &&
    next.reducedMotion === snapshot.reducedMotion &&
    next.headerCompact === snapshot.headerCompact
  ) return;

  snapshot = next;
  subscribers.forEach((subscriber) => subscriber());
}

function startMotionEnvironment() {
  const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  let scrollEndTimer = 0;

  updateSnapshot({
    documentVisible: !document.hidden,
    pageScrolling: false,
    reducedMotion: reducedMotionQuery.matches,
    headerCompact: window.scrollY > 24,
  });

  const finishScrolling = () => {
    window.clearTimeout(scrollEndTimer);
    updateSnapshot({ pageScrolling: false, headerCompact: window.scrollY > 24 });
  };

  const handleScroll = () => {
    updateSnapshot({ pageScrolling: true, headerCompact: window.scrollY > 24 });
    window.clearTimeout(scrollEndTimer);
    scrollEndTimer = window.setTimeout(finishScrolling, 140);
  };

  const handleVisibility = () => updateSnapshot({ documentVisible: !document.hidden });
  const handleReducedMotion = () => updateSnapshot({ reducedMotion: reducedMotionQuery.matches });

  window.addEventListener("scroll", handleScroll, { passive: true });
  window.addEventListener("scrollend", finishScrolling, { passive: true });
  document.addEventListener("visibilitychange", handleVisibility);
  reducedMotionQuery.addEventListener("change", handleReducedMotion);

  return () => {
    window.clearTimeout(scrollEndTimer);
    window.removeEventListener("scroll", handleScroll);
    window.removeEventListener("scrollend", finishScrolling);
    document.removeEventListener("visibilitychange", handleVisibility);
    reducedMotionQuery.removeEventListener("change", handleReducedMotion);
  };
}

function subscribe(subscriber: () => void) {
  subscribers.add(subscriber);
  if (!stopEnvironment) stopEnvironment = startMotionEnvironment();

  return () => {
    subscribers.delete(subscriber);
    if (subscribers.size === 0 && stopEnvironment) {
      stopEnvironment();
      stopEnvironment = null;
      snapshot = serverSnapshot;
    }
  };
}

export function useMotionPolicy() {
  return useSyncExternalStore(subscribe, () => snapshot, () => serverSnapshot);
}

export function useElementInView<T extends Element>(
  ref: RefObject<T | null>,
  { rootMargin = "120px 0px", threshold = 0.01 }: { rootMargin?: string; threshold?: number } = {},
) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (!("IntersectionObserver" in window)) {
      const fallbackTimer = setTimeout(() => setInView(true), 0);
      return () => clearTimeout(fallbackTimer);
    }

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin, threshold },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, rootMargin, threshold]);

  return inView;
}

export function useAutoAdvance({
  containerRef,
  delay,
  enabled = true,
  onAdvance,
}: {
  containerRef: RefObject<Element | null>;
  delay: number;
  enabled?: boolean;
  onAdvance: () => void;
}) {
  const { documentVisible, pageScrolling, reducedMotion } = useMotionPolicy();
  const inView = useElementInView(containerRef);
  const onAdvanceRef = useRef(onAdvance);

  useEffect(() => {
    onAdvanceRef.current = onAdvance;
  }, [onAdvance]);

  useEffect(() => {
    if (!enabled || !inView || !documentVisible || pageScrolling || reducedMotion) return;

    let timer = 0;
    const schedule = () => {
      timer = window.setTimeout(() => {
        onAdvanceRef.current();
        schedule();
      }, delay);
    };
    schedule();

    return () => window.clearTimeout(timer);
  }, [delay, documentVisible, enabled, inView, pageScrolling, reducedMotion]);
}
