import { siteConfig } from "@/data/site";
import type { Messages } from "@/i18n/config";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { SocialLinks } from "@/components/ui/SocialLinks";

export function SiteFooter({ messages }: { messages: Messages }) {
  return (
    <footer className="page-shell grid grid-cols-4 gap-grid border-t border-foreground/15 py-8 font-mono text-[0.58rem] uppercase tracking-[0.07em] text-foreground/55 max-[940px]:grid-cols-2 max-[640px]:grid-cols-1 max-[640px]:gap-y-7">
      <a className="inline-flex w-fit" href="#top" aria-label={messages.navigation.homeLabel}>
        <BrandLogo className="h-6 w-[7.625rem]" />
      </a>
      <p>{messages.footer.line}<br />{siteConfig.email}<br />{messages.contact.address}</p>
      <SocialLinks />
      <p className="justify-self-end text-right max-[940px]:justify-self-start max-[940px]:text-left">© 2017—{new Date().getFullYear()} Cineguru Studio</p>
    </footer>
  );
}
