import { brands } from "@/data/site";
import type { Messages } from "@/i18n/config";
import { ClientLogo } from "@/components/ui/ClientLogo";
import { AboutJourney } from "@/components/sections/AboutJourney";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function AboutSection({ messages }: { messages: Messages }) {
  const about = messages.about;

  return (
    <section className="relative isolate overflow-hidden bg-canvas py-section text-foreground" id="about">
      <div className="page-shell relative z-10">
        <SectionHeading
          eyebrow={about.eyebrow}
          title={about.title}
          description={about.description}
          wideTitle
          titleClassName="!-translate-x-50 max-[940px]:!-translate-x-24 max-[640px]:!translate-x-0"
          descriptionClassName="!mt-[25rem] max-[940px]:!mt-8 max-[640px]:!mt-6"
        />
        <AboutJourney principles={about.principles} />
        <div className="reveal-on-scroll -mx-page mt-[clamp(5rem,9vw,9rem)] bg-surface px-page py-[clamp(2.5rem,5vw,5rem)] text-foreground" data-reveal="panel">
          <p className="mb-5 font-mono text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-foreground/78">{about.brandsLabel}</p>
          <div className="grid grid-cols-5 border-l border-t border-foreground/20 max-[940px]:grid-cols-2">
            {brands.map((brand) => (
              <div className="group relative grid min-h-28 place-items-center overflow-hidden border-b border-r border-foreground/20 transition-colors hover:bg-canvas" key={brand.id}>
                <i className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100" />
                <ClientLogo className="h-14 w-[min(72%,14rem)] opacity-100 brightness-125 contrast-125 drop-shadow-[0_0_0.7rem_rgba(255,255,255,0.08)] transition-[filter] duration-300 group-hover:brightness-150 group-hover:contrast-150" scale={brand.scale} src={brand.logo} alt={`${brand.label} ${about.brandLogoSuffix}`} title={brand.label} width={224} height={56} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
