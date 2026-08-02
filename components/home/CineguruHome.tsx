"use client";

import { useCallback, useRef, useState } from "react";

import type { Locale } from "@/i18n/config";
import { getMessages } from "@/i18n/config";
import { trackEvent } from "@/lib/analytics";
import { createStructuredData } from "@/lib/structuredData";
import { usePageProgress, useRevealOnScroll } from "@/hooks/usePageEffects";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ScrollFilmline } from "@/components/layout/ScrollFilmline";
import { AboutSection } from "@/components/sections/AboutSection";
import { ChannelSection } from "@/components/sections/ChannelSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { WorkSection } from "@/components/sections/WorkSection";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { VideoModal, type ActiveVideo } from "@/components/ui/VideoModal";

export default function CineguruHome({ locale }: { locale: Locale }) {
  const messages = getMessages(locale);
  const [video, setVideo] = useState<ActiveVideo | null>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const { stageLabelRef, timecodeRef } = usePageProgress({ locale, stages: messages.global.stages, serviceRef: servicesRef });
  useRevealOnScroll();

  const openVideo = useCallback((nextVideo: ActiveVideo) => {
    trackEvent("video_open", { id: nextVideo.id, title: nextVideo.title, language: locale });
    setVideo(nextVideo);
  }, [locale]);
  const closeVideo = useCallback(() => setVideo(null), []);
  const structuredData = createStructuredData(locale, messages);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <main id="main-content" tabIndex={-1} aria-hidden={video ? true : undefined} inert={video ? true : undefined}>
        <CustomCursor label={messages.global.cursor} />
        <SiteHeader locale={locale} messages={messages} />
        <ScrollFilmline stageRef={stageLabelRef} initialStage={messages.global.stages[0]} hint={messages.global.scrollHint} />
        <HeroSection messages={messages} timecodeRef={timecodeRef} />
        <WorkSection messages={messages} onOpenVideo={openVideo} />
        <ChannelSection messages={messages} onOpenVideo={openVideo} />
        <ServicesSection ref={servicesRef} messages={messages} />
        <ProcessSection messages={messages} />
        <AboutSection messages={messages} />
        <ContactSection messages={messages} />
        <SiteFooter messages={messages} />
      </main>
      {video ? <VideoModal video={video} closeLabel={messages.global.close} onClose={closeVideo} /> : null}
    </>
  );
}
