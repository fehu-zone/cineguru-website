import { getMessages } from "@/i18n/config";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ContactPanel } from "@/components/layout/ContactPanel";
import { brands } from "@/data/site";
import { ClientLogo } from "@/components/ui/ClientLogo";

export default function AboutPage() {
  const locale = "tr";
  const messages = getMessages(locale);
  const about = messages.about;
  const f = messages.footer;

  const firstBrandRow = brands.slice(0, 8);
  const secondBrandRow = brands.slice(8);

  const renderBrand = (brand: (typeof brands)[number]) => (
    <div className="group relative grid min-h-[8rem] place-items-center overflow-hidden border-b border-r border-dotted border-foreground/25 bg-canvas/90 px-5 transition-colors hover:bg-surface max-[640px]:min-h-24" key={brand.id}>
      <i className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100" />
      <ClientLogo className="h-12 w-[min(92%,15rem)] opacity-100 brightness-125 contrast-125 drop-shadow-[0_0_0.8rem_rgba(255,255,255,0.1)] transition-[filter] duration-300 group-hover:brightness-150 group-hover:contrast-150 max-[640px]:h-10" scale={brand.scale} src={brand.logo} alt={`${brand.label} ${about.brandLogoSuffix}`} title={brand.label} width={256} height={64} loading="lazy" />
    </div>
  );

  return (
    <>
      <SiteHeader locale={locale} messages={messages} />
      <main className="page-shell pt-32 pb-24 text-foreground">
        <div className="max-w-[70ch] mx-auto mt-8 mb-20">
          <h1 className="font-display text-[clamp(2.2rem,4.5vw,4rem)] [font-weight:580] leading-[1.05] tracking-[-0.04em] mb-8">
            {f.aboutTitle}
          </h1>
          <p className="text-[1.25rem] leading-[1.6] text-foreground/90 font-normal mb-8 whitespace-pre-line">
            {about.title}
          </p>
          <p className="text-[1.05rem] leading-[1.75] text-foreground/70 mb-12">
            {about.description}
          </p>

          {/* Yazılı Referanslar / Çalışmalar Bölümü */}
          <div className="border-t border-foreground/10 pt-10 mt-10 mb-12">
            <h3 className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.16em] text-accent mb-6">
              İŞ BİRLİKLERİMİZ VE PROJELERİMİZ
            </h3>
            <p className="text-[1.05rem] leading-[1.75] text-foreground/75">
              Reklam filmlerinden dijital kampanyalara, marka hikâyelerinden etkinlik ve lansman filmlerine kadar geniş bir yelpazede video içerikler üretiyoruz. Her markanın kurumsal diline ve hedef kitlesine özel kurgulanmış, geleneksel film disiplinini üretken yapay zekâ teknolojileriyle birleştiren estetik düzeyi yüksek ve sonuç odaklı projeler tasarlıyoruz.
            </p>
          </div>

          {/* Principles Grid */}
          <div className="border-t border-foreground/10 pt-10 mt-12">
            <h3 className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.16em] text-accent mb-8">
              ÜRETİM YAKLAŞIMIMIZ
            </h3>
            <div className="grid grid-cols-2 gap-x-8 gap-y-10 max-[640px]:grid-cols-1">
              {about.principles.map((p, idx) => (
                <div key={idx} className="flex flex-col gap-2">
                  <span className="font-mono text-[0.58rem] text-foreground/45 uppercase tracking-wider">
                    0{idx + 1} · {p.title}
                  </span>
                  <p className="text-[0.92rem] leading-relaxed text-foreground/75">
                    {p.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Brands Section (Birlikte Ürettiklerimiz) */}
        <div className="border-t border-foreground/10 pt-16 mb-20">
          <p className="mb-8 text-center font-mono text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-accent max-[640px]:mb-6 max-[640px]:text-[0.62rem]">
            {about.brandsLabel}
          </p>
          <div className="relative overflow-hidden border border-dotted border-foreground/30 bg-[radial-gradient(circle,rgba(255,255,255,0.2)_1px,transparent_1px)] bg-[length:0.5rem_0.5rem]">
            <div className="grid grid-cols-8 max-[1100px]:grid-cols-4 max-[640px]:grid-cols-2">
              {firstBrandRow.map(renderBrand)}
            </div>
            <div className="grid grid-cols-8 max-[1100px]:grid-cols-4 max-[640px]:grid-cols-2">
              <div aria-hidden="true" className="min-h-[8rem] border-b border-r border-dotted border-foreground/25 bg-transparent max-[1100px]:hidden" />
              {secondBrandRow.map(renderBrand)}
              <div aria-hidden="true" className="min-h-[8rem] border-b border-dotted border-foreground/25 bg-transparent max-[1100px]:hidden" />
            </div>
          </div>
        </div>

        <div className="mt-32">
          <ContactPanel messages={messages} locale={locale} />
        </div>
      </main>
      <SiteFooter messages={messages} />
    </>
  );
}
