import type { Locale, Messages } from "@/i18n/config";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { siteConfig } from "@/data/site";
import Link from "next/link";

export function SiteFooter({ messages, locale }: { messages: Messages; locale: Locale }) {
  const currentYear = new Date().getFullYear();
  const f = messages.footer;

  return (
    <footer className="page-shell border-t border-foreground/10 pb-8 pt-12 text-foreground/75">
      {/* 3-Column Premium Footer Layout */}
      <div className="grid grid-cols-3 gap-grid pb-12 text-[0.88rem] leading-relaxed max-[940px]:grid-cols-2 max-[640px]:grid-cols-1 gap-y-10">
        {/* Column 1: Social Links */}
        <div className="flex flex-col gap-3">
          <h4 className="font-mono text-[0.58rem] font-bold uppercase tracking-[0.16em] text-accent">
            {f.socialTitle}
          </h4>
          <div className="flex flex-col gap-2.5">
            {siteConfig.social.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="w-fit font-mono text-[0.78rem] tracking-[0.04em] text-foreground/60 transition-colors hover:text-accent"
              >
                {social.label.toUpperCase()} ↗
              </a>
            ))}
          </div>
        </div>

        {/* Column 2: Corporate Links (Separate Pages) */}
        <div className="flex flex-col gap-3">
          <h4 className="font-mono text-[0.58rem] font-bold uppercase tracking-[0.16em] text-accent">
            {locale === "tr" ? "KURUMSAL" : "CORPORATE"}
          </h4>
          <div className="flex flex-col gap-2.5">
            <Link
              href={`/${locale}/about`}
              className="w-fit font-mono text-[0.78rem] tracking-[0.04em] text-foreground/60 transition-colors hover:text-accent"
            >
              {f.aboutTitle}
            </Link>
            <Link
              href={`/${locale}/privacy`}
              className="w-fit font-mono text-[0.78rem] tracking-[0.04em] text-foreground/60 transition-colors hover:text-accent"
            >
              {f.privacyTitle}
            </Link>
          </div>
        </div>

        {/* Column 3: Brand Statement */}
        <div className="flex flex-col gap-3 pr-4 max-[940px]:col-span-2 max-[640px]:col-span-1">
          <h4 className="font-mono text-[0.58rem] font-bold uppercase tracking-[0.16em] text-accent">
            CINEGURU STUDIO
          </h4>
          <p className="text-foreground/60 text-[0.8rem] leading-relaxed max-w-[32ch]">
            {f.line}
          </p>
        </div>
      </div>

      {/* Bottom Footer Bar */}
      <div className="border-t border-foreground/10 pt-8 grid grid-cols-3 items-center gap-x-grid gap-y-6 max-[768px]:grid-cols-1 max-[768px]:text-center">
        <a className="inline-flex w-fit text-foreground transition-colors hover:text-accent max-[768px]:mx-auto" href="#top" aria-label={messages.navigation.homeLabel}>
          <BrandLogo className="h-7 w-[7.625rem]" />
        </a>

        <a className="justify-self-center whitespace-nowrap font-mono text-[clamp(0.72rem,0.8vw,0.85rem)] font-normal leading-none tracking-[0.06em] text-foreground/45 transition-colors hover:text-accent max-[768px]:mx-auto" href="https://ahmetkaradas.com/" target="_blank" rel="noreferrer">
          POWERED AND DESIGNED BY FEHU
        </a>

        <div className="justify-self-end text-right font-mono text-[0.62rem] leading-[1.5] tracking-[0.08em] text-foreground/45 max-[768px]:mx-auto max-[768px]:text-center">
          <p>© 2017—{currentYear} CINEGURU STUDIO</p>
        </div>
      </div>
    </footer>
  );
}
