import type { CSSProperties } from "react";
import Image from "next/image";

import { brands } from "@/data/site";
import type { Messages } from "@/i18n/config";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function AboutSection({ messages }: { messages: Messages }) {
  const about = messages.about;
  return (
    <section className="page-shell py-section text-surface bg-foreground" id="about">
      <SectionHeading eyebrow={about.eyebrow} title={about.title} description={about.description} />
      <div className="mt-[clamp(5rem,8vw,8rem)] grid grid-cols-3 gap-grid max-[940px]:grid-cols-1">
        {about.principles.map((principle, index) => (
          <article className="reveal-on-scroll min-h-[18.75rem] border-t border-surface/20 pb-5 pt-4 max-[940px]:min-h-0 max-[940px]:pb-12" style={{ "--stagger": index } as CSSProperties} key={principle.title}>
            <span className="font-mono text-[0.58rem] text-accent">{String(index + 1).padStart(2, "0")}</span>
            <h3 className="mt-16 max-w-[12ch] font-display text-[clamp(1.8rem,2.8vw,3.3rem)] font-semibold leading-[1.02] tracking-[-0.04em] max-[940px]:mt-10">{principle.title}</h3>
            <p className="mt-5 max-w-[35ch] text-[0.98rem] leading-[1.55] text-surface/65">{principle.description}</p>
          </article>
        ))}
      </div>
      <div className="reveal-on-scroll -mx-page mt-[clamp(5rem,9vw,9rem)] bg-canvas px-page py-[clamp(2.5rem,5vw,5rem)] text-foreground">
        <p className="mb-4 font-mono text-[0.61rem] uppercase tracking-[0.1em] text-foreground/55">{about.brandsLabel}</p>
        <div className="grid grid-cols-5 border-l border-t border-foreground/20 max-[940px]:grid-cols-2">
          {brands.map((brand) => (
            <div className="group relative grid min-h-28 place-items-center overflow-hidden border-b border-r border-foreground/20 transition-colors hover:bg-surface" key={brand.id}>
              <i className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100" />
              <Image className="max-h-8 w-[min(52%,10rem)] object-contain opacity-85" src={brand.logo} alt={`${brand.label} ${about.brandLogoSuffix}`} width={160} height={32} unoptimized />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
