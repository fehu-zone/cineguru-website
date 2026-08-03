"use client";

import type { CSSProperties } from "react";

type Principle = { title: string; description: string };

export function AboutJourney({
  principles,
  chapterLabel,
  mediaPlaceholder,
}: {
  principles: Principle[];
  chapterLabel: string;
  mediaPlaceholder: string;
}) {
  return (
    <ol className="about-journey" aria-label="Cineguru üretim hikâyesi">
      {principles.map((principle, index) => {
        const chapter = String(index + 1).padStart(2, "0");

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
            <article className="about-timeline-card" data-index={chapter}>
              <div className="about-timeline-card-media" aria-hidden="true">
                <span className="about-timeline-media-code">{chapter} / {String(principles.length).padStart(2, "0")}</span>
                <span className="about-timeline-media-cross about-timeline-media-cross-x" />
                <span className="about-timeline-media-cross about-timeline-media-cross-y" />
                <span className="about-timeline-media-orb" />
                <span className="about-timeline-media-caption">{mediaPlaceholder}</span>
              </div>
              <div className="about-timeline-card-body">
                <div className="about-timeline-card-meta">
                  <p className="about-timeline-index">{chapterLabel} {chapter}</p>
                  <span className="about-timeline-card-count">0{index + 1} — 04</span>
                </div>
                <h3>{principle.title}</h3>
                <p className="about-timeline-description">{principle.description}</p>
                <div className="about-timeline-card-footer">
                  <span>{principle.title}</span>
                  <span className="about-timeline-footer-line" />
                </div>
              </div>
            </article>
          </li>
        );
      })}
    </ol>
  );
}
