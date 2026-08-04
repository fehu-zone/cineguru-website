import { getMessages } from "@/i18n/config";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";

export default function AboutPage() {
  const locale = "tr";
  const messages = getMessages(locale);

  return (
    <>
      <SiteHeader locale={locale} messages={messages} />
      <main className="page-shell pt-32 pb-24 text-foreground">
        <div className="max-w-[70ch] mx-auto mt-8">
          <h1 className="font-display text-[clamp(2.2rem,4.5vw,4rem)] [font-weight:580] leading-[1.05] tracking-[-0.04em] mb-8">
            {messages.footer.aboutTitle}
          </h1>
          <div className="text-[1.05rem] leading-[1.75] text-foreground/75 space-y-6">
            <p>{messages.footer.aboutText}</p>
          </div>
        </div>
      </main>
      <SiteFooter messages={messages} locale={locale} />
    </>
  );
}
