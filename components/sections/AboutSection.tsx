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
        <SectionHeading eyebrow={about.eyebrow} title={about.title} description={about.description} wideTitle />
        <AboutJourney principles={about.principles} />
        <div className="reveal-on-scroll -mx-page mt-[clamp(5rem,9vw,9rem)] bg-surface px-page py-[clamp(2.5rem,5vw,5rem)] text-foreground">
          <p className="mb-4 font-mono text-[0.61rem] uppercase tracking-[0.1em] text-foreground/55">{about.brandsLabel}</p>
          <div className="grid grid-cols-5 border-l border-t border-foreground/20 max-[940px]:grid-cols-2">
            {brands.map((brand) => (
              <div className="group relative grid min-h-28 place-items-center overflow-hidden border-b border-r border-foreground/20 transition-colors hover:bg-canvas" key={brand.id}>
                <i className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100" />
                <ClientLogo className="h-8 w-[min(52%,10rem)] opacity-85" scale={brand.scale} src={brand.logo} alt={`${brand.label} ${about.brandLogoSuffix}`} width={160} height={32} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
