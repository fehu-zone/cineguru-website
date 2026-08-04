import { siteConfig } from "@/data/site";
import type { Locale, Messages } from "@/i18n/config";
import { ButtonLink } from "@/components/ui/Button";
import { HoverVideoButtonLink } from "@/components/ui/HoverVideoButtonLink";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { SocialLinks } from "@/components/ui/SocialLinks";
import Link from "next/link";

export function ContactSection({ messages, locale }: { messages: Messages; locale: Locale }) {
  const contact = messages.contact;
  const f = messages.footer;

  return (
    <section className="page-shell pb-[clamp(2.25rem,3.5vw,3.75rem)] pt-section" id="contact">
      <div className="reveal-on-scroll mx-auto max-w-[52rem] text-center" data-reveal="heading">
        <Eyebrow>{contact.eyebrow}</Eyebrow>
        <h2 className="mt-6 font-display text-[clamp(3.4rem,6.6vw,7.8rem)] [font-weight:580] leading-[1.02] tracking-[-0.045em] max-[640px]:text-[clamp(2rem,8.8vw,4.8rem)]">
          {contact.title.split("\n").map((line) => <span className="block whitespace-nowrap" key={line}>{line}</span>)}
        </h2>
        <p className="mx-auto mt-7 max-w-[46ch] text-[0.98rem] leading-[1.6] text-foreground/65">{contact.description}</p>
      </div>

      <div className="contact-cta-group reveal-on-scroll mt-[clamp(3.5rem,6vw,6rem)] flex gap-grid max-[640px]:flex-col" data-reveal="split">
        <HoverVideoButtonLink
          className="contact-cta-primary !bg-accent/92"
          href={`mailto:${siteConfig.email}?subject=${encodeURIComponent(contact.form.subject)}`}
          poster={siteConfig.showreel.poster}
          videoSrc={siteConfig.showreel.video}
        >
          {contact.mailCta}
        </HoverVideoButtonLink>
        <ButtonLink className="contact-cta-secondary !bg-foreground/92" size="display" variant="light" href={siteConfig.phoneHref}>
          {contact.phoneCta}
        </ButtonLink>
      </div>

      <div className="reveal-on-scroll mt-[clamp(5rem,8vw,8rem)] grid grid-cols-3 gap-grid border-t border-foreground/15 pt-5 max-[940px]:grid-cols-2 max-[640px]:grid-cols-1 gap-y-10" data-reveal="panel">
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
        
        {/* Biz Kimiz Link */}
        <div className="flex flex-col gap-3">
          <span className="font-mono text-[0.62rem] uppercase tracking-[0.08em] text-foreground/65">{f.aboutTitle}</span>
          <Link href={`/${locale}/about`} className="text-sm text-foreground transition-colors hover:text-accent w-fit">
            {locale === "tr" ? "Biz Kimiz ↗" : "About Us ↗"}
          </Link>
        </div>

        {/* Gizlilik ve Sözleşmeler Link */}
        <div className="flex flex-col gap-3">
          <span className="font-mono text-[0.62rem] uppercase tracking-[0.08em] text-foreground/65">{f.privacyTitle}</span>
          <Link href={`/${locale}/privacy`} className="text-sm text-foreground transition-colors hover:text-accent w-fit">
            {locale === "tr" ? "Gizlilik ve Sözleşmeler ↗" : "Privacy & Contracts ↗"}
          </Link>
        </div>

        {/* Social Links */}
        <div className="flex flex-col gap-3">
          <span className="font-mono text-[0.62rem] uppercase tracking-[0.08em] text-foreground/65">{contact.socialLabel}</span>
          <SocialLinks className="text-sm text-foreground" />
        </div>
      </div>
    </section>
  );
}
