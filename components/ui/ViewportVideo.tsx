"use client";

import { useEffect, useRef } from "react";

export function ViewportVideo({
  className,
  poster,
  src,
}: {
  className: string;
  poster: string;
  src: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let isNearViewport = true;
    const updatePlayback = () => {
      if (isNearViewport && !document.hidden) {
        void video.play().catch(() => {
          // Muted autoplay can still be blocked by an explicit browser policy.
        });
      } else {
        video.pause();
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isNearViewport = entry.isIntersecting;
        updatePlayback();
      },
      { rootMargin: "120px 0px", threshold: 0.01 },
    );

    observer.observe(video);
    document.addEventListener("visibilitychange", updatePlayback);
    updatePlayback();

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", updatePlayback);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      className={className}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      poster={poster}
      disablePictureInPicture
      aria-hidden="true"
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
