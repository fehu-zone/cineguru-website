import { siteConfig } from "@/data/site";
import type { Locale, Messages } from "@/i18n/config";
import { ButtonLink } from "@/components/ui/Button";
import { HoverVideoButtonLink } from "@/components/ui/HoverVideoButtonLink";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { ContactPanel } from "@/components/layout/ContactPanel";

export function ContactSection({ messages, locale }: { messages: Messages; locale: Locale }) {
  const contact = messages.contact;

  return (
    <section className="page-shell pb-[clamp(2.25rem,3.5vw,3.75rem)] pt-section" id="contact">
      <div className={`reveal-on-scroll mx-auto text-center ${locale === "en" ? "max-w-[80rem]" : "max-w-[52rem]"}`} data-reveal="heading">
        <Eyebrow>{contact.eyebrow}</Eyebrow>
        <h2 className="mt-6 font-display text-[clamp(3.4rem,6.6vw,7.8rem)] [font-weight:580] leading-[1.02] tracking-[-0.045em] max-[640px]:text-[clamp(2rem,8.8vw,4.8rem)]">
          {contact.title.split("\n").map((line) => <span className="block whitespace-nowrap" key={line}>{line}</span>)}
        </h2>
        <p className="mx-auto mt-7 max-w-[46ch] text-[0.98rem] leading-[1.6] text-foreground/65">{contact.description}</p>
      </div>

      <div className="contact-cta-group reveal-on-scroll mt-[clamp(3.5rem,6vw,6rem)] flex gap-grid max-[640px]:flex-col" data-reveal="split">
        <HoverVideoButtonLink
          className="contact-cta-primary !bg-accent/92"
          href={siteConfig.getWhatsappHref(locale)}
          target="_blank"
          rel="noopener noreferrer"
          poster={siteConfig.showreel.poster}
          videoSrc="/assets/videos/hemen-baslayalim.mov"
        >
          {contact.mailCta}
        </HoverVideoButtonLink>
        <ButtonLink className="contact-cta-secondary !bg-foreground/92" size="display" variant="light" href={siteConfig.phoneHref}>
          {contact.phoneCta}
        </ButtonLink>
      </div>

      <div className="reveal-on-scroll mt-[clamp(5rem,8vw,8rem)]" data-reveal="panel">
        <ContactPanel messages={messages} locale={locale} />
      </div>
    </section>
  );
}
