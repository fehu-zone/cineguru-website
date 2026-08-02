"use client";

import type { CSSProperties } from "react";

type Principle = { title: string; description: string };

export function AboutJourney({ principles }: { principles: Principle[] }) {
  return (
    <ol className="about-journey" aria-label="Cineguru üretim hikâyesi">
      {principles.map((principle, index) => {
        return (
          <li
            className="about-timeline-item reveal-on-scroll"
            style={{ "--stagger": index } as CSSProperties}
            key={principle.title}
          >
            <div className="about-timeline-marker-wrap">
              <span className="about-timeline-marker" aria-hidden="true">
                <span>{String(index + 1).padStart(2, "0")}</span>
              </span>
            </div>
            <article className="about-timeline-card" data-index={String(index + 1).padStart(2, "0")}>
              <p className="about-timeline-index">Bölüm {String(index + 1).padStart(2, "0")}</p>
              <h3>{principle.title}</h3>
              <p className="about-timeline-description">{principle.description}</p>
            </article>
          </li>
        );
      })}
    </ol>
  );
}
