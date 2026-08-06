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
  videos: readonly { video?: string; youtubeId?: string }[];
  chapterLabel: string;
  mediaLabel: string;
}) {
  return (
    <ol className="about-journey" aria-label="Cineguru üretim hikâyesi">
      {principles.map((principle, index) => {
        const chapter = String(index + 1).padStart(2, "0");
        const videoItem = videos[index];
        const videoSrc = videoItem?.video;
        const embedUrl = videoItem?.youtubeId
          ? `https://www.youtube-nocookie.com/embed/${videoItem.youtubeId}?autoplay=1&mute=1&controls=0&disablekb=1&fs=0&iv_load_policy=3&modestbranding=1&playsinline=1&rel=0&loop=1&playlist=${videoItem.youtubeId}`
          : null;

        return (
          <li
            className="about-timeline-item reveal-on-scroll"
            style={{ "--stagger": index } as CSSProperties}
            key={principle.title}
          >
            <article className="about-timeline-card">
              <div className="about-timeline-card-media">
                {videoSrc ? (
                  <video
                    className="about-timeline-media-video object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    disablePictureInPicture
                    aria-hidden="true"
                  >
                    <source src={videoSrc} type="video/mp4" />
                    <source src={videoSrc} type="video/quicktime" />
                  </video>
                ) : embedUrl ? (
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
                <div className="about-timeline-card-copy">
                  <h3>{principle.title}</h3>
                  <p className="about-timeline-description">{principle.description}</p>
                </div>
              </div>
            </article>
          </li>
        );
      })}
    </ol>
  );
}
