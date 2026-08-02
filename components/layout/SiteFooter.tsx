import type { Messages } from "@/i18n/config";
import { BrandLogo } from "@/components/ui/BrandLogo";

export function SiteFooter({ messages }: { messages: Messages }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="page-shell border-t border-foreground/20 py-8 text-foreground/75">
      <div className="grid grid-cols-3 items-end gap-x-grid gap-y-8 max-[640px]:grid-cols-1 max-[640px]:items-start">
        <a className="inline-flex w-fit text-foreground transition-colors hover:text-accent" href="#top" aria-label={messages.navigation.homeLabel}>
          <BrandLogo className="h-7 w-[7.625rem]" />
        </a>

        <a className="justify-self-center whitespace-nowrap font-mono text-[clamp(0.72rem,0.85vw,0.95rem)] font-normal uppercase leading-none tracking-[0.04em] text-foreground/80 transition-colors hover:text-accent max-[640px]:justify-self-start max-[640px]:whitespace-normal" href="https://ahmetkaradas.com/" target="_blank" rel="noreferrer">
          Powered and designed by Fehu
        </a>

        <div className="justify-self-end text-right font-mono text-[0.62rem] uppercase leading-[1.5] tracking-[0.07em] max-[640px]:justify-self-start max-[640px]:text-left">
          <p>© 2017—{currentYear} Cineguru Studio</p>
        </div>
      </div>
    </footer>
  );
}
