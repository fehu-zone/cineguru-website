# Cineguru Studio

React + TypeScript + Tailwind tabanlı Cineguru Studio sitesi.

Bu sürüm local geliştirme ve doğrudan Node.js üzerinde çalışacak şekilde düzenlenmiştir. Cloudflare ve Docker şu an çalışma akışının parçası değildir. Sunucuya geçişte mevcut Nginx + PM2 yapısı kullanılacaktır.

## Teknoloji

- React 19
- TypeScript
- Next.js 16 App Router
- Tailwind CSS 4
- Node.js 22.13 veya üzeri

## Local geliştirme

```bash
npm ci
npm run dev
```

Ardından `http://localhost:3000/tr` adresini açın.

## Production build ve test

```bash
npm run build
npm test
```

Production preview:

```bash
npm run start
```

Uygulama varsayılan olarak `http://127.0.0.1:3000` üzerinde çalışır.

## Sayfalar

- `/` Türkçe sürüme yönlendirir
- `/tr` Türkçe sürüm
- `/en` İngilizce sürüm
- `/robots.txt` arama motoru yönergeleri
- `/sitemap.xml` site haritası

## Kaynak kod mimarisi

- `app/`: route, layout, metadata, robots ve sitemap dosyaları
- `components/ui/`: tekrar kullanılabilir temel arayüz parçaları
- `components/layout/`: site header, footer ve sayfa ilerleme göstergesi
- `components/sections/`: ana sayfanın bağımsız bölümleri
- `components/home/`: sayfa bileşimi ve ortak etkileşim state'i
- `i18n/locales/`: Türkçe ve İngilizce JSON içerikleri
- `data/`: dilden bağımsız video, marka ve site sabitleri
- `hooks/`: tarayıcı davranışları ve sayfa efektleri
- `lib/`: analytics, structured data ve küçük yardımcılar

## Sunucuya geçiş

Sunucuda Nginx önünde Node.js + PM2 kullanılacaktır. Ayrıntılı komutlar için `DEPLOYMENT_NODE_PM2.md` dosyasına bakın.

Temel akış:

```bash
npm ci
npm run build
pm2 start ecosystem.config.cjs --env production
pm2 save
```

Nginx yapılandırması daha sonra `nginx/wearecineguru.com.conf` üzerinden uygulanacaktır.

## Not

Local akışta yalnızca uygulama kaynakları, public varlıklar ve Node.js sunucu yapılandırması tutulur. Build çıktıları ve geçici cache klasörleri repoya dahil edilmez.
