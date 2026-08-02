"use client";

import { useEffect, useState } from "react";

type Principle = { title: string; description: string };

export function AboutJourney({ principles }: { principles: Principle[] }) {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [revealedUntil, setRevealedUntil] = useState(0);

  useEffect(() => {
    if (activeIndex < 0 || activeIndex >= principles.length - 1 || revealedUntil > activeIndex) return;

    const timer = window.setTimeout(() => setRevealedUntil(activeIndex + 1), 900);
    return () => window.clearTimeout(timer);
  }, [activeIndex, principles.length, revealedUntil]);

  return (
    <div className="about-journey reveal-on-scroll" aria-label="Cineguru üretim hikâyesi">
      <svg className="about-journey-map" viewBox="0 0 1200 520" preserveAspectRatio="none" aria-hidden="true">
        <g className="about-journey-grid" fill="none" stroke="currentColor" strokeWidth="1">
          <path d="M0 90 120 320 390 160 690 340 1010 180 1200 300" />
          <path d="M0 440 240 390 500 470 790 420 1080 470 1200 410" />
          <path d="M120 320 120 90M390 160 390 440M690 340 690 100M1010 180 1010 420" />
        </g>
        <path className={`about-journey-path ${revealedUntil >= 1 ? "is-revealed" : ""}`} d="M120 320 390 160" />
        <path className={`about-journey-path ${revealedUntil >= 2 ? "is-revealed" : ""}`} d="M390 160 690 340" />
        <path className={`about-journey-path ${revealedUntil >= 3 ? "is-revealed" : ""}`} d="M690 340 1010 160" />
        <g className="about-journey-nodes">
          {[0, 1, 2, 3].map((index) => (
            <circle key={index} cx={[120, 390, 690, 1010][index]} cy={[320, 160, 340, 160][index]} r={index <= revealedUntil ? 5 : 3} />
          ))}
        </g>
      </svg>

      {principles.map((principle, index) => {
        const isAvailable = index <= revealedUntil;
        const isOpen = index <= activeIndex;
        return (
          <div className={`about-journey-step about-journey-step-${index + 1} ${isAvailable ? "is-available" : ""}`} key={principle.title}>
            <button
              className="about-journey-node"
              type="button"
              disabled={!isAvailable}
              aria-expanded={isOpen}
              aria-label={`${String(index + 1).padStart(2, "0")} ${principle.title}`}
              onClick={() => setActiveIndex(index)}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
            </button>
            <article className={`about-journey-card ${isOpen ? "is-open" : ""}`}>
              <p className="font-mono text-[0.58rem] uppercase tracking-[0.08em] text-accent">Adım {String(index + 1).padStart(2, "0")}</p>
              <h3 className="mt-4 font-display text-[clamp(1.6rem,2.4vw,2.8rem)] leading-none tracking-[-0.04em]">{principle.title}</h3>
              <p className="mt-4 text-[0.92rem] leading-[1.5] text-foreground/65">{principle.description}</p>
            </article>
          </div>
        );
      })}
    </div>
  );
}
