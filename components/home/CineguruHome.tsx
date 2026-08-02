"use client";

import { useCallback, useState } from "react";

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
import { ServicesSection } from "@/components/sections/ServicesSection";
import { WorkSection } from "@/components/sections/WorkSection";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { SectionTransition } from "@/components/ui/SectionTransition";
import { VideoModal, type ActiveVideo } from "@/components/ui/VideoModal";

export default function CineguruHome({ locale }: { locale: Locale }) {
  const messages = getMessages(locale);
  const [video, setVideo] = useState<ActiveVideo | null>(null);
  const { stageLabelRef, timecodeRef, progressBarRef } = usePageProgress({ locale, stages: messages.global.stages });
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
        <ScrollFilmline stageRef={stageLabelRef} progressRef={progressBarRef} initialStage={messages.global.stages[0]} hint={messages.global.scrollHint} />
        <HeroSection messages={messages} timecodeRef={timecodeRef} />
        <SectionTransition fromIndex={1} fromStage={messages.global.stages[0]} toStage={messages.global.stages[1]} />
        <WorkSection messages={messages} onOpenVideo={openVideo} />
        <SectionTransition direction="reverse" fromIndex={2} fromStage={messages.global.stages[1]} toStage={messages.global.stages[2]} />
        <ChannelSection messages={messages} onOpenVideo={openVideo} />
        <SectionTransition fromIndex={3} fromStage={messages.global.stages[2]} toStage={messages.global.stages[3]} />
        <ServicesSection messages={messages} />
        <SectionTransition direction="reverse" fromIndex={4} fromStage={messages.global.stages[3]} toStage={messages.global.stages[4]} />
        <AboutSection messages={messages} />
        <SectionTransition fromIndex={5} fromStage={messages.global.stages[4]} toStage={messages.global.stages[5]} />
        <ContactSection messages={messages} />
        <SiteFooter messages={messages} />
      </main>
      {video ? <VideoModal video={video} closeLabel={messages.global.close} onClose={closeVideo} /> : null}
    </>
  );
}
