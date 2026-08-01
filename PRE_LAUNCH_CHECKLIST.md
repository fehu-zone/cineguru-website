# Yayına geçiş kontrol listesi

## Sunucu

- [ ] Mevcut wearecineguru.com dosyaları ve yapılandırması yedeklendi.
- [ ] Node.js sürümü en az 22.13.0.
- [ ] Uygulama `127.0.0.1:3000` üzerinde çalışıyor.
- [ ] Uygulama process manager ile otomatik yeniden başlıyor.
- [ ] Nginx yapılandırması `nginx -t` testinden geçiyor.
- [ ] SSL sertifikası aktif ve otomatik yenileme açık.
- [ ] HTTP trafiği HTTPS’e yönlendiriliyor.
- [ ] `www` ve kök alan adı tek canonical adrese yönlendiriliyor.

## Site kontrolü

- [ ] `/` Türkçe sürüme yönlendiriyor.
- [ ] `/tr` ve `/en` sayfaları 200 yanıtı veriyor.
- [ ] TR/EN geçişleri doğru sayfaya gidiyor.
- [ ] Showreel açılıyor ve ses kendiliğinden başlamıyor.
- [ ] Seçili işler doğru YouTube videolarını açıyor.
- [ ] Dikey Reels doğal 9:16 oranında görünüyor.
- [ ] İletişim formu `info@wearecineguru.com` adresini hazırlıyor.
- [ ] Logo, favicon, Open Graph görseli ve sosyal medya bağlantıları çalışıyor.
- [ ] 320 px mobil, tablet ve masaüstü görünümü kontrol edildi.
- [ ] Klavye ile menü, video modalı ve form alanları kullanılabiliyor.

## SEO ve operasyon

- [ ] `https://www.wearecineguru.com/robots.txt` açılıyor.
- [ ] `https://www.wearecineguru.com/sitemap.xml` açılıyor.
- [ ] Google Search Console alan adı doğrulaması tamamlandı.
- [ ] CDN kullanılacaksa HTML üzerinde agresif cache kapalı.
- [ ] `/_next/static/` ve `/assets/` dosyaları cache alıyor.
- [ ] Yayından sonra `bash scripts/verify-server.sh https://www.wearecineguru.com` başarılı.
- [ ] Eski release geri dönüş için en az bir hafta saklanıyor.
