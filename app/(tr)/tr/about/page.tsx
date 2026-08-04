import { getMessages } from "@/i18n/config";
import { SubpageLayout, SubpageSection, SubpageGrid, BrandGridSection } from "@/components/layout/SubpageLayout";

export default function AboutPage() {
  const locale = "tr";
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
      {/* İş Birliklerimiz ve Projelerimiz */}
      <SubpageSection title="İŞ BİRLİKLERİMİZ VE PROJELERİMİZ">
        <p className="text-[1.125rem] md:text-[1.2rem] leading-[1.8] text-foreground/80 font-normal">
          Bugüne kadar Vodafone, Sıfır Atık Vakfı, TurkNet, Hesap.com, Dünya Etnospor Konfederasyonu, Kalekim, Farmasi, Vasso, ASFAT, Pasha Bank, Vialand, BOSAD ve RTA Laboratuvarları başta olmak üzere Türkiye&apos;nin ve dünyanın önde gelen markalarıyla iş birlikleri gerçekleştirdik. Ayrıca gizlilik sözleşmeleri (NDA) sebebiyle ismini açıkça paylaşamadığımız birçok devlet kurumu ve özel sektör markası için de yüksek standartlı video prodüksiyon projeleri ürettik.
        </p>
      </SubpageSection>

      {/* Üretim Yaklaşımımız */}
      <SubpageSection title="ÜRETİM YAKLAŞIMIMIZ">
        <SubpageGrid items={about.principles} />
      </SubpageSection>
    </SubpageLayout>
  );
}
