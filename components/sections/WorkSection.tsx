import type { CSSProperties } from "react";

import { projects } from "@/data/site";
import type { Messages } from "@/i18n/config";
import type { ActiveVideo } from "@/components/ui/VideoModal";
import { ProjectPoster } from "@/components/ui/ResponsiveMedia";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function WorkSection({ messages, onOpenVideo }: { messages: Messages; onOpenVideo: (video: ActiveVideo) => void }) {
  const work = messages.work;
  const featuredProjects = projects.filter((project) => project.featured);
  const archiveProjects = projects.filter((project) => !project.featured);

  return (
    <section className="page-shell py-section text-surface bg-foreground" id="work">
      <SectionHeading eyebrow={work.eyebrow} title={work.title} description={work.description} />

      <p className="reveal-on-scroll mb-5 mt-[clamp(4rem,7vw,7rem)] border-b border-surface/20 pb-3 font-mono text-[0.61rem] font-semibold tracking-[0.1em] text-surface/55">{work.caseStudiesLabel}</p>
      <div className="grid grid-cols-2 gap-x-grid gap-y-[clamp(3rem,5vw,5rem)] max-[900px]:grid-cols-1">
        {featuredProjects.map((project, index) => {
          const content = work.projects[project.id];
          return (
            <article className="reveal-on-scroll" style={{ "--stagger": index } as CSSProperties} key={project.id}>
              <a
                className="group relative block aspect-video overflow-hidden bg-surface"
                href={`https://www.youtube.com/watch?v=${project.youtubeId}`}
                data-cursor-label={messages.global.cursor}
                onClick={(event) => { event.preventDefault(); onOpenVideo({ id: project.youtubeId, title: content.title, orientation: "landscape" }); }}
                aria-label={`${content.title} — ${work.watchLabel}`}
              >
                <ProjectPoster slug={project.slug} alt={content.alt} sizes="(max-width: 900px) 100vw, 50vw" />
                <span className="absolute bottom-4 right-4 rounded-full bg-canvas/80 px-3 py-2 font-mono text-[0.56rem] uppercase tracking-[0.08em] text-foreground backdrop-blur-md" aria-hidden="true">{work.watchLabel}</span>
              </a>
              <div className="flex min-h-24 items-start justify-between gap-4 border-b border-surface/20 py-4">
                <div><p className="font-mono text-[0.56rem] uppercase tracking-[0.08em] text-surface/50">{content.type}</p><h3 className="mt-1 font-display text-[clamp(1.55rem,2.2vw,2.5rem)] font-semibold tracking-[-0.035em]">{content.title}</h3></div>
                <span className="font-mono text-[0.58rem] text-surface/50">{project.year}</span>
              </div>
              {content.caseStudy.length ? (
                <div className="mt-5 border-l-2 border-accent pl-5" aria-label={`${content.title} — ${work.caseStudyLabel}`}>
                  <p className="mb-4 font-mono text-[0.56rem] font-semibold uppercase tracking-[0.1em] text-accent">{work.caseStudyLabel}</p>
                  <dl className="grid gap-3">
                    {content.caseStudy.map((item) => (
                      <div className="grid grid-cols-[8rem_1fr] gap-4 text-sm leading-[1.5] max-[500px]:grid-cols-1 max-[500px]:gap-1" key={item.label}>
                        <dt className="font-semibold">{item.label}</dt><dd className="text-surface/65">{item.text}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ) : null}
            </article>
          );
        })}
      </div>

      <p className="reveal-on-scroll mb-5 mt-[clamp(5rem,8vw,8rem)] border-b border-surface/20 pb-3 font-mono text-[0.61rem] font-semibold tracking-[0.1em] text-surface/55">{work.archiveLabel}</p>
      <div className="grid grid-cols-4 gap-grid max-[1180px]:grid-cols-2 max-[640px]:grid-cols-1">
        {archiveProjects.map((project, index) => {
          const content = work.projects[project.id];
          return (
            <article className="reveal-on-scroll" style={{ "--stagger": index } as CSSProperties} key={project.id}>
              <a
                className="group block"
                href={`https://www.youtube.com/watch?v=${project.youtubeId}`}
                data-cursor-label={messages.global.cursor}
                onClick={(event) => { event.preventDefault(); onOpenVideo({ id: project.youtubeId, title: content.title, orientation: "landscape" }); }}
                aria-label={`${content.title} — ${work.watchLabel}`}
              >
                <div className="aspect-video overflow-hidden bg-surface"><ProjectPoster slug={project.slug} alt={content.alt} sizes="(max-width: 640px) 100vw, (max-width: 1180px) 50vw, 25vw" /></div>
                <div className="flex min-h-24 items-start justify-between gap-3 border-b border-surface/20 py-4">
                  <div><p className="font-mono text-[0.53rem] uppercase tracking-[0.08em] text-surface/50">{content.type}</p><h3 className="mt-1 font-display text-[clamp(1.35rem,1.7vw,2rem)] font-semibold tracking-[-0.035em]">{content.title}</h3></div>
                  <span className="font-mono text-[0.55rem] text-surface/50">{project.year}</span>
                </div>
              </a>
            </article>
          );
        })}
      </div>
    </section>
  );
}
