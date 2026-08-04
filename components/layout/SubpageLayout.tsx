import type { ReactNode } from "react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ContactPanel } from "@/components/layout/ContactPanel";
import type { Locale, Messages } from "@/i18n/config";

export interface SubpageLayoutProps {
  locale: Locale;
  messages: Messages;
  title?: string;
  subtitle?: string;
  description?: string;
  children?: ReactNode;
  showContactPanel?: boolean;
  maxWidthClass?: string;
}

/**
 * Standard Header for interior/subpages (About, Privacy, Terms, etc.)
 */
export function SubpageHeader({
  title,
  subtitle,
  description,
}: {
  title?: string;
  subtitle?: string;
  description?: string;
}) {
  if (!title && !subtitle && !description) return null;

  return (
    <header className="mb-16">
      {title && (
        <h1 className="font-display text-[clamp(2.5rem,5.5vw,4.5rem)] [font-weight:580] leading-[1.08] tracking-[-0.04em] mb-8 text-foreground">
          {title}
        </h1>
      )}
      {subtitle && (
        <p className="text-[1.35rem] md:text-[1.55rem] leading-[1.5] text-foreground/90 font-normal mb-6 whitespace-pre-line">
          {subtitle}
        </p>
      )}
      {description && (
        <p className="text-[1.125rem] md:text-[1.25rem] leading-[1.75] text-foreground/75">
          {description}
        </p>
      )}
    </header>
  );
}

/**
 * Reusable Section divider for subpages
 */
export function SubpageSection({
  title,
  children,
  className = "",
}: {
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`border-t border-foreground/15 pt-10 mt-12 mb-14 ${className}`}>
      {title && (
        <h2 className="font-mono text-xs md:text-sm font-bold uppercase tracking-[0.18em] text-accent mb-6">
          {title}
        </h2>
      )}
      {children}
    </section>
  );
}

/**
 * Grid layout for numbered items or feature points (e.g. 01, 02, 03, 04)
 */
export function SubpageGrid({
  items,
}: {
  items: Array<{ number?: string; title: string; description: string }>;
}) {
  return (
    <div className="grid grid-cols-2 gap-x-10 gap-y-10 max-[640px]:grid-cols-1">
      {items.map((item, idx) => {
        const numStr = item.number ?? `0${idx + 1}`;
        return (
          <div key={idx} className="flex flex-col gap-2.5">
            <span className="font-mono text-xs md:text-sm font-semibold text-accent tracking-wider uppercase">
              {numStr} · {item.title}
            </span>
            <p className="text-[1.05rem] leading-[1.7] text-foreground/80 font-normal">
              {item.description}
            </p>
          </div>
        );
      })}
    </div>
  );
}

/**
 * SubpageLayout wrapper component
 */
export function SubpageLayout({
  locale,
  messages,
  title,
  subtitle,
  description,
  children,
  showContactPanel = true,
  maxWidthClass = "max-w-[76ch]",
}: SubpageLayoutProps) {
  return (
    <>
      <SiteHeader locale={locale} messages={messages} />
      <main className="page-shell pt-32 pb-24 text-foreground">
        <div className={`${maxWidthClass} mx-auto px-5 md:px-0 mt-8 mb-20`}>
          <SubpageHeader title={title} subtitle={subtitle} description={description} />
          {children}
        </div>
        {showContactPanel && (
          <div className="mt-28">
            <ContactPanel messages={messages} locale={locale} />
          </div>
        )}
      </main>
      <SiteFooter messages={messages} />
    </>
  );
}
