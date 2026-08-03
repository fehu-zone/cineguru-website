import { brands } from "@/data/site";
import type { Messages } from "@/i18n/config";
import { ClientLogo } from "@/components/ui/ClientLogo";
import { AboutJourney } from "@/components/sections/AboutJourney";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function AboutSection({ messages }: { messages: Messages }) {
  const about = messages.about;
  const firstBrandRow = brands.slice(0, 8);
  const secondBrandRow = brands.slice(8);

  const renderBrand = (brand: (typeof brands)[number]) => (
    <div className="group relative grid min-h-[6.25rem] place-items-center overflow-hidden border-b border-r border-dotted border-foreground/25 bg-canvas/90 px-4 transition-colors hover:bg-surface max-[640px]:min-h-[5.5rem]" key={brand.id}>
      <i className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100" />
      <ClientLogo className="h-11 w-[min(88%,12rem)] opacity-100 brightness-125 contrast-125 drop-shadow-[0_0_0.7rem_rgba(255,255,255,0.08)] transition-[filter] duration-300 group-hover:brightness-150 group-hover:contrast-150 max-[640px]:h-9" scale={brand.scale} src={brand.logo} alt={`${brand.label} ${about.brandLogoSuffix}`} title={brand.label} width={224} height={56} loading="lazy" />
    </div>
  );

  return (
    <section className="relative isolate overflow-hidden bg-canvas py-section text-foreground" id="about">
      <div className="about-section-atmosphere" aria-hidden="true" />
      <div className="page-shell relative z-10">
        <SectionHeading
          eyebrow={about.eyebrow}
          title={about.title}
          description={about.description}
          wideTitle
          titleClassName="!-translate-x-50 max-[940px]:!-translate-x-24 max-[640px]:!translate-x-0"
          descriptionClassName="!mt-[25rem] max-[940px]:!mt-8 max-[640px]:!mt-6"
        />
        <AboutJourney
          principles={about.principles}
          chapterLabel={about.chapterLabel}
          mediaPlaceholder={about.mediaPlaceholder}
        />
        <div className="reveal-on-scroll -mx-page mt-[clamp(5rem,9vw,9rem)] bg-canvas px-page py-[clamp(2.5rem,5vw,5rem)] text-foreground" data-reveal="panel">
          <p className="mb-7 text-center font-mono text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-accent max-[640px]:mb-5 max-[640px]:text-[0.58rem]">{about.brandsLabel}</p>
          <div className="relative overflow-hidden border border-dotted border-foreground/30 bg-[radial-gradient(circle,rgba(255,255,255,0.2)_1px,transparent_1px)] bg-[length:0.5rem_0.5rem]">
            <div className="grid grid-cols-8 max-[1100px]:grid-cols-4 max-[640px]:grid-cols-2">{firstBrandRow.map(renderBrand)}</div>
            <div className="grid grid-cols-8 max-[1100px]:grid-cols-4 max-[640px]:grid-cols-2">
              <div aria-hidden="true" className="min-h-[6.25rem] border-b border-r border-dotted border-foreground/25 bg-transparent max-[1100px]:hidden" />
              {secondBrandRow.map(renderBrand)}
              <div aria-hidden="true" className="min-h-[6.25rem] border-b border-dotted border-foreground/25 bg-transparent max-[1100px]:hidden" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
