import { getMessages } from "@/i18n/config";
import { SubpageLayout, SubpageSection, SubpageGrid, BrandGridSection } from "@/components/layout/SubpageLayout";

export default function AboutPage() {
  const locale = "en";
  const messages = getMessages(locale);
  const about = messages.about;
  const f = messages.footer;

  return (
    <SubpageLayout
      locale={locale}
      messages={messages}
      title={f.aboutTitle}
      subtitle={about.title}
      description={about.description}
      fullWidthContent={
        <BrandGridSection
          brandsLabel={about.brandsLabel}
          brandLogoSuffix={about.brandLogoSuffix}
        />
      }
    >
      {/* Our Clients & Stories */}
      <SubpageSection title="OUR CLIENTS & STORIES">
        <p className="text-[1.125rem] md:text-[1.2rem] leading-[1.8] text-foreground/80 font-normal">
          To date, we have collaborated with leading local and global brands, including Vodafone, Zero Waste Foundation, TurkNet, Hesap.com, World Ethnosport Confederation, Kalekim, Farmasi, Vasso, ASFAT, Pasha Bank, Vialand, BOSAD, and RTA Laboratories. Additionally, we have delivered high-standard video production projects for numerous government institutions and private sector organizations whose names we cannot publicly disclose due to non-disclosure agreements (NDAs).
        </p>
      </SubpageSection>

      {/* Production Approach */}
      <SubpageSection title="PRODUCTION APPROACH">
        <SubpageGrid items={about.principles} />
      </SubpageSection>
    </SubpageLayout>
  );
}
