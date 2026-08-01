"use client";

import React, { useState } from "react";
import Spline from "@splinetool/react-spline";

/* ─── Spline 3D Scene URLs for each Service ─── */
const SPLINE_SCENES: Record<number, string> = {
  // 01 · Strateji: free/public Spline abstract scene for ideation and planning.
  0: "https://prod.spline.design/9951u9cumiw2Ehj8/scene.splinecode",

  // 02 · Pre Production: Storyboard ve Çizim
  1: "https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode",

  // 03 · Production + AI Video: Üretim Sentezi
  2: "https://prod.spline.design/PyzDhpQ9E5f1E3MT/scene.splinecode",
  3: "https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode",

};

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class SplineErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.warn("Spline 3D load error caught gracefully:", error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

export function ServicesSplineScene({
  activeIndex,
}: {
  activeIndex: number;
}) {
  const [loaded, setLoaded] = useState(false);
  const currentScene = SPLINE_SCENES[activeIndex] ?? SPLINE_SCENES[0];

  return (
    <div className="relative size-full overflow-hidden bg-canvas">
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-canvas font-mono text-xs text-foreground/40 z-0">
          <div className="flex items-center gap-3">
            <i className="size-2 animate-ping rounded-full bg-accent" />
            <span>3D SAHNE YÜKLENİYOR...</span>
          </div>
        </div>
      )}
      <div className="relative z-10 size-full">
        <SplineErrorBoundary
          fallback={
            <div className="flex size-full items-center justify-center bg-canvas text-mono text-xs text-foreground/40">
              <span>3D Sahne Modeli Hazırlanıyor...</span>
            </div>
          }
        >
          <Spline
            key={currentScene}
            scene={currentScene}
            onLoad={() => setLoaded(true)}
            style={{ width: "100%", height: "100%" }}
          />
        </SplineErrorBoundary>
      </div>
    </div>
  );
}
