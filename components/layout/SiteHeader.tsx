"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { navigationItems, siteConfig } from "@/data/site";
import type { Locale, Messages } from "@/i18n/config";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/classNames";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { ButtonLink } from "@/components/ui/Button";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { useMotionPolicy } from "@/hooks/useMotion";

export function SiteHeader({ locale, messages }: { locale: Locale; messages: Messages }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { headerCompact: scrolled } = useMotionPolicy();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    document.body.style.overflow = "hidden";
    const firstLink = navRef.current?.querySelector<HTMLAnchorElement>("a");
    const focusFrame = window.requestAnimationFrame(() => firstLink?.focus());
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setMenuOpen(false);
      menuButtonRef.current?.focus();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const nav = messages.navigation;
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[1000] mx-auto grid h-[4.875rem] w-full max-w-site grid-cols-[3fr_6fr_3fr] items-center gap-grid border-b border-foreground/10 bg-gradient-to-b from-canvas/90 via-canvas/60 to-transparent px-page backdrop-blur-md transition-[height,background-color,border-color] duration-300 max-[1180px]:grid-cols-[2fr_5fr_3fr] max-[940px]:grid-cols-[1fr_auto] max-[640px]:backdrop-blur-none",
          scrolled && "h-16 border-foreground/15 bg-canvas/90",
          "max-[640px]:h-16",
        )}
      >
        <a className="relative z-[1010] inline-flex w-fit" href="#top" aria-label={nav.homeLabel}>
          <BrandLogo className="max-[640px]:h-6 max-[640px]:w-[7.25rem]" />
        </a>

        <nav
          ref={navRef}
          className={cn(
            "flex justify-center max-[940px]:fixed max-[940px]:inset-0 max-[940px]:z-[1000] max-[940px]:block max-[940px]:overflow-y-auto max-[940px]:bg-canvas max-[940px]:px-page max-[940px]:pb-12 max-[940px]:pt-28 max-[940px]:opacity-0 max-[940px]:pointer-events-none max-[940px]:translate-x-full max-[940px]:transition-[opacity,transform] max-[940px]:duration-300",
            menuOpen && "max-[940px]:translate-x-0 max-[940px]:opacity-100 max-[940px]:pointer-events-auto",
          )}
          aria-label={nav.mainLabel}
        >
          <div className="flex justify-center gap-[clamp(1.1rem,2.4vw,2.8rem)] font-mono text-[0.63rem] font-semibold uppercase tracking-[0.09em] max-[940px]:flex-col max-[940px]:items-start max-[940px]:gap-1 max-[940px]:font-display max-[940px]:text-[clamp(2.75rem,11vw,5rem)] max-[940px]:font-semibold max-[940px]:normal-case max-[940px]:tracking-[-0.04em]">
            {navigationItems.map((item) => (
              <a key={item.key} className="text-foreground/65 transition-colors hover:text-foreground max-[940px]:text-foreground" href={item.href} onClick={closeMenu}>
                {nav.items[item.key]}
              </a>
            ))}
          </div>

          <div className="mt-12 hidden grid-cols-2 gap-10 border-t border-foreground/15 pt-8 max-[940px]:grid max-[640px]:grid-cols-1">
            <div>
              <h4 className="eyebrow mb-6">{nav.contactInfoTitle}</h4>
              <div className="grid gap-5 text-sm text-foreground/75">
                <p className="grid gap-1"><span className="font-mono text-[0.56rem] tracking-[0.08em] text-foreground/45">{nav.phoneLabel}</span><a href={siteConfig.phoneHref}>{siteConfig.phoneDisplay}</a></p>
                <p className="grid gap-1"><span className="font-mono text-[0.56rem] tracking-[0.08em] text-foreground/45">{messages.contact.emailLabel.toUpperCase()}</span><a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a></p>
                <p className="grid gap-1"><span className="font-mono text-[0.56rem] tracking-[0.08em] text-foreground/45">{nav.officeLabel}</span><span>{messages.contact.address}</span></p>
              </div>
            </div>
            <div>
              <h4 className="eyebrow mb-6">{nav.followUsTitle}</h4>
              <SocialLinks iconOnly />
            </div>
          </div>
        </nav>

        <div className="relative z-[1010] flex items-center justify-end gap-3 max-[640px]:absolute max-[640px]:right-5 max-[640px]:top-1/2 max-[640px]:-translate-y-1/2">
          <nav className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-foreground/30 bg-foreground/5 px-3 font-mono text-[0.67rem] font-semibold tracking-[0.08em] text-foreground/70" aria-label={nav.languageLabel}>
            <Link href="/tr" lang="tr" hrefLang="tr" className={cn("transition-colors hover:text-foreground", locale === "tr" && "text-foreground")} aria-current={locale === "tr" ? "page" : undefined} onClick={() => trackEvent("language_select", { language: "tr" })}>TR</Link>
            <span className="text-accent">·</span>
            <Link href="/en" lang="en" hrefLang="en" className={cn("transition-colors hover:text-foreground", locale === "en" && "text-foreground")} aria-current={locale === "en" ? "page" : undefined} onClick={() => trackEvent("language_select", { language: "en" })}>EN</Link>
          </nav>
          <ButtonLink variant="outline" size="compact" className="max-[940px]:hidden" href="#contact" onClick={() => trackEvent("contact_cta", { placement: "header", language: locale })}>
            {nav.projectCta}
          </ButtonLink>
          <button
            ref={menuButtonRef}
            className="relative hidden size-10 place-items-center rounded-full border border-foreground/25 max-[940px]:grid max-[640px]:size-9"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? nav.closeMenuLabel : nav.openMenuLabel}
          >
            <span className={cn("col-start-1 row-start-1 h-px w-3.5 -translate-y-[0.1875rem] bg-foreground transition-transform", menuOpen && "translate-y-0 rotate-45")} />
            <span className={cn("col-start-1 row-start-1 h-px w-3.5 translate-y-[0.1875rem] bg-foreground transition-transform", menuOpen && "translate-y-0 -rotate-45")} />
          </button>
        </div>
      </header>
      <button
        className={cn("fixed inset-0 z-[990] hidden bg-canvas/75 opacity-0 pointer-events-none transition-opacity max-[940px]:block", menuOpen && "max-[940px]:opacity-100 max-[940px]:pointer-events-auto")}
        type="button"
        aria-label={nav.closeMenuLabel}
        onClick={closeMenu}
      />
    </>
  );
}
