import { forwardRef, type CSSProperties } from "react";

import type { Messages } from "@/i18n/config";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const ServicesSection = forwardRef<HTMLDivElement, { messages: Messages }>(function ServicesSection({ messages }, ref) {
  const services = messages.services;

  return (
    <section className="page-shell py-section text-surface bg-foreground" id="services">
      <SectionHeading eyebrow={services.eyebrow} title={services.title} compact />
      <div className="relative mt-[clamp(4rem,7vw,7rem)]" ref={ref}>
        <div className="absolute bottom-0 left-[calc(8.333%-0.5px)] top-0 w-px bg-surface/15 max-[940px]:hidden" aria-hidden="true">
          <i className="block w-px bg-accent [height:calc(var(--service-progress,0)*100%)]" />
        </div>
        {services.items.map((service, index) => (
          <article
            className="reveal-on-scroll grid min-h-44 grid-cols-12 items-start gap-grid border-t border-surface/20 py-7 max-[940px]:grid-cols-6 max-[640px]:min-h-0 max-[640px]:grid-cols-[2.625rem_1fr] max-[640px]:gap-y-4"
            style={{ "--stagger": index } as CSSProperties}
            key={service.title}
          >
            <span className="col-span-1 font-mono text-[0.59rem] text-accent">{String(index + 1).padStart(2, "0")}</span>
            <h3 className="col-start-3 col-span-3 font-display text-[clamp(1.8rem,3vw,3.4rem)] [font-weight:560] leading-none tracking-[-0.04em] max-[1180px]:col-span-3 max-[940px]:col-start-2 max-[940px]:col-span-2 max-[640px]:col-start-2 max-[640px]:col-span-1">{service.title}</h3>
            <p className="col-start-6 col-span-4 max-w-[38ch] text-[0.96rem] leading-[1.58] text-surface/65 max-[1180px]:col-start-6 max-[940px]:col-start-4 max-[940px]:col-span-3 max-[640px]:col-start-2 max-[640px]:col-span-1">{service.description}</p>
            <div className="col-start-10 col-span-2 flex flex-wrap gap-2 max-[940px]:col-start-2 max-[940px]:col-span-5 max-[940px]:mt-4 max-[640px]:col-start-2 max-[640px]:col-span-1 max-[640px]:mt-1">
              {service.tags.map((tag) => <span className="rounded-full border border-surface/20 px-3 py-1.5 font-mono text-[0.51rem] uppercase tracking-[0.06em] text-surface/65" key={tag}>{tag}</span>)}
            </div>
            <span className="col-start-12 justify-self-end text-xl text-accent max-[940px]:hidden" aria-hidden="true">↗</span>
          </article>
        ))}
      </div>
    </section>
  );
});
