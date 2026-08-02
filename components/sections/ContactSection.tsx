import { siteConfig } from "@/data/site";
import type { Messages } from "@/i18n/config";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { SocialLinks } from "@/components/ui/SocialLinks";

export function ContactSection({ messages }: { messages: Messages }) {
  const contact = messages.contact;

  return (
    <section className="page-shell pb-[clamp(4rem,7vw,7rem)] pt-section" id="contact">
      <div className="reveal-on-scroll mx-auto max-w-[52rem] text-center">
        <Eyebrow>{contact.eyebrow}</Eyebrow>
        <h2 className="mt-6 font-display text-[clamp(3.4rem,6.6vw,7.8rem)] [font-weight:580] leading-[1.02] tracking-[-0.045em] max-[640px]:text-[clamp(2rem,8.8vw,4.8rem)]">
          {contact.title.split("\n").map((line) => <span className="block whitespace-nowrap" key={line}>{line}</span>)}
        </h2>
        <p className="mx-auto mt-7 max-w-[46ch] text-[0.98rem] leading-[1.6] text-foreground/65">{contact.description}</p>
      </div>

      <div className="contact-cta-group reveal-on-scroll mt-[clamp(3.5rem,6vw,6rem)] flex gap-grid max-[640px]:flex-col">
        <ButtonLink className="group contact-cta-primary" size="display" href={`mailto:${siteConfig.email}?subject=${encodeURIComponent(contact.form.subject)}`}>
          {contact.mailCta}<span className="inline-block transition-transform duration-300 ease-out group-hover:rotate-45" aria-hidden="true">↗</span>
        </ButtonLink>
        <ButtonLink className="group contact-cta-secondary" size="display" variant="light" href={siteConfig.phoneHref}>
          {contact.phoneCta}<span className="inline-block transition-transform duration-300 ease-out group-hover:rotate-45" aria-hidden="true">↗</span>
        </ButtonLink>
      </div>

      <div className="mt-[clamp(5rem,8vw,8rem)] grid grid-cols-3 gap-grid border-t border-foreground/15 pt-5 max-[640px]:grid-cols-1 max-[640px]:gap-y-8">
        <a className="group flex flex-col gap-3 text-foreground transition-colors hover:text-accent" href={`mailto:${siteConfig.email}`}>
          <span className="font-mono text-[0.62rem] uppercase tracking-[0.08em] text-foreground/65">{contact.emailLabel}</span>
          <strong className="font-normal text-foreground transition-colors group-hover:text-accent">{siteConfig.email}</strong>
        </a>
        <a className="group flex flex-col gap-3 text-foreground transition-colors hover:text-accent" href={siteConfig.phoneHref} title={siteConfig.phoneDisplay}>
          <span className="font-mono text-[0.62rem] uppercase tracking-[0.08em] text-foreground/65">{messages.navigation.phoneLabel}</span>
          <strong className="font-normal text-foreground transition-colors group-hover:text-accent">{messages.navigation.phoneCta}</strong>
        </a>
        <address className="flex flex-col gap-3 not-italic">
          <span className="font-mono text-[0.62rem] uppercase tracking-[0.08em] text-foreground/65">{contact.location}</span>
          <strong className="font-normal text-foreground">{contact.address}</strong>
        </address>
        <div className="flex flex-col gap-3">
          <span className="font-mono text-[0.62rem] uppercase tracking-[0.08em] text-foreground/65">{contact.socialLabel}</span>
          <SocialLinks className="text-sm text-foreground" />
        </div>
      </div>
    </section>
  );
}
