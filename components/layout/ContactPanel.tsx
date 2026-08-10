"use client";

import { siteConfig } from "@/data/site";
import type { Locale, Messages } from "@/i18n/config";
import { trackPhoneClick } from "@/lib/analytics";
import { SocialLinks } from "@/components/ui/SocialLinks";
import Link from "next/link";

export function ContactPanel({ messages, locale }: { messages: Messages; locale: Locale }) {
  const contact = messages.contact;
  const f = messages.footer;

  return (
    <div data-nosnippet className="grid grid-cols-3 gap-grid border-t border-foreground/15 pt-5 max-[940px]:grid-cols-2 max-[640px]:grid-cols-1 gap-y-10">
      <a className="group flex flex-col gap-3 text-foreground transition-colors hover:text-accent" href={`mailto:${siteConfig.email}`}>
        <span className="font-mono text-[0.62rem] uppercase tracking-[0.08em] text-foreground/65">{contact.emailLabel}: </span>
        <strong className="font-normal text-foreground transition-colors group-hover:text-accent">{siteConfig.email}</strong>
      </a>
      <a
        className="group flex flex-col gap-3 text-foreground transition-colors hover:text-accent"
        href={siteConfig.phoneHref}
        title={siteConfig.phoneDisplay}
        onClick={() => trackPhoneClick({ placement: "contact_panel", language: locale })}
      >
        <span className="font-mono text-[0.62rem] uppercase tracking-[0.08em] text-foreground/65">{messages.navigation.phoneLabel}: </span>
        <strong className="font-normal text-foreground transition-colors group-hover:text-accent">{messages.navigation.phoneCta} ({siteConfig.phoneDisplay})</strong>
      </a>
      <address className="flex flex-col gap-3 not-italic">
        <span className="font-mono text-[0.62rem] uppercase tracking-[0.08em] text-foreground/65">{contact.location}: </span>
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
  );
}
