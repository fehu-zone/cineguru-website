import { getMessages } from "@/i18n/config";
import { SubpageLayout } from "@/components/layout/SubpageLayout";

export default function PrivacyPage() {
  const locale = "tr";
  const messages = getMessages(locale);

  return (
    <SubpageLayout
      locale={locale}
      messages={messages}
      title={messages.footer.privacyTitle}
    >
      <div className="text-[1.125rem] md:text-[1.2rem] leading-[1.85] text-foreground/80 space-y-8 font-normal">
        {messages.footer.privacyParagraphs.map((para, idx) => (
          <p key={idx}>{para}</p>
        ))}
      </div>
    </SubpageLayout>
  );
}
