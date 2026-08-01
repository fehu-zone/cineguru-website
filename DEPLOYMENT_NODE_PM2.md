# Node.js + PM2 + Nginx ile kurulum

## 1. Gereksinimler

Sunucuda Node.js 22, npm, PM2 ve Nginx bulunmalıdır:

```bash
node --version
npm --version
pm2 --version
nginx -v
```

Node sürümü en az `22.13.0` olmalıdır.

## 2. Bağımlılık ve üretim build’i

```bash
cd /var/www/cineguru-website
npm ci
npm run build
```

## 3. PM2 ile başlatma

```bash
pm2 start ecosystem.config.cjs --env production
pm2 save
pm2 startup
```

`pm2 startup` komutunun ekrana yazdığı son `sudo` komutunu da çalıştırın.

## 4. Yerel doğrulama

```bash
bash scripts/verify-server.sh http://127.0.0.1:3000
pm2 logs cineguru-studio --lines 100
```

## 5. Nginx ve SSL

```bash
sudo cp nginx/wearecineguru.com.conf /etc/nginx/sites-available/wearecineguru.com
sudo ln -s /etc/nginx/sites-available/wearecineguru.com /etc/nginx/sites-enabled/wearecineguru.com
sudo nginx -t
sudo systemctl reload nginx
sudo certbot --nginx -d wearecineguru.com -d www.wearecineguru.com
```

## Güncelleme

```bash
npm ci
npm run build
pm2 reload ecosystem.config.cjs --env production
bash scripts/verify-server.sh https://www.wearecineguru.com
```
