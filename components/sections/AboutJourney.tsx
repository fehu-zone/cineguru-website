"use client";

import type { CSSProperties } from "react";

type Principle = { title: string; description: string };

export function AboutJourney({
  principles,
  videos,
  chapterLabel,
  mediaLabel,
}: {
  principles: Principle[];
  videos: { youtubeId: string }[];
  chapterLabel: string;
  mediaLabel: string;
}) {
  return (
    <ol className="about-journey" aria-label="Cineguru üretim hikâyesi">
      {principles.map((principle, index) => {
        const chapter = String(index + 1).padStart(2, "0");
        const video = videos[index];
        const embedUrl = video
          ? `https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&mute=1&controls=0&disablekb=1&fs=0&iv_load_policy=3&modestbranding=1&playsinline=1&rel=0&loop=1&playlist=${video.youtubeId}`
          : null;

        return (
          <li
            className="about-timeline-item reveal-on-scroll"
            style={{ "--stagger": index } as CSSProperties}
            key={principle.title}
          >
            <article className="about-timeline-card">
              <div className="about-timeline-card-media">
                {embedUrl ? (
                  <iframe
                    className="about-timeline-media-video"
                    src={embedUrl}
                    title={`${principle.title} — ${mediaLabel}`}
                    loading="lazy"
                    tabIndex={-1}
                    allow="autoplay; encrypted-media; picture-in-picture"
                  />
                ) : null}
                <span className="about-timeline-media-shield" aria-hidden="true" />
                <span className="about-timeline-media-caption" aria-hidden="true">{mediaLabel}</span>
              </div>
              <div className="about-timeline-card-body">
                <div className="about-timeline-card-meta">
                  <p className="about-timeline-index">{chapterLabel} {chapter}</p>
                </div>
                <h3>{principle.title}</h3>
                <p className="about-timeline-description">{principle.description}</p>
              </div>
            </article>
          </li>
        );
      })}
    </ol>
  );
}
