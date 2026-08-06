import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const baseDir = path.resolve(__dirname, '..');
const dir1080 = path.join(baseDir, 'public/assets/videos/1080p');
const dir720 = path.join(baseDir, 'public/assets/videos/720p');

fs.mkdirSync(dir1080, { recursive: true });
fs.mkdirSync(dir720, { recursive: true });

const mappings1080 = [
  ['1080p/Hemen Başlayalım_1.mp4', 'public/assets/videos/1080p/hemen-baslayalim.mp4'],
  ['1080p/Tek Yaratıcı Yön.mp4', 'public/assets/videos/1080p/tek-kreatif-yon.mp4'],
  ['1080p/Hibrit Üretim.mp4', 'public/assets/videos/1080p/hibrit-uretim.mp4'],
  ['1080p/Her Ekrana Hazır.mp4', 'public/assets/videos/1080p/her-ekrana-hazir.mp4'],
  ['1080p/İz Bırakan Final.mp4', 'public/assets/videos/1080p/iz-birakan-final.mp4'],
];

const mappings720 = [
  ['720p/720p/Hemen Başlayalım.mp4', 'public/assets/videos/720p/hemen-baslayalim.mp4'],
  ['720p/720p/Tek Yaratıcı Yön.mp4', 'public/assets/videos/720p/tek-kreatif-yon.mp4'],
  ['720p/720p/Hibrit Üretim.mp4', 'public/assets/videos/720p/hibrit-uretim.mp4'],
  ['720p/720p/Her Ekrana Hazır.mp4', 'public/assets/videos/720p/her-ekrana-hazir.mp4'],
  ['720p/720p/İz Bırakan Final.mp4', 'public/assets/videos/720p/iz-birakan-final.mp4'],
];

for (const [src, dest] of [...mappings1080, ...mappings720]) {
  const srcPath = path.join(baseDir, src);
  const destPath = path.join(baseDir, dest);
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${src} -> ${dest}`);
  } else {
    console.warn(`Source video not found: ${srcPath}`);
  }
}

const movDir = path.join(baseDir, 'public/assets/videos');
if (fs.existsSync(movDir)) {
  const files = fs.readdirSync(movDir);
  for (const file of files) {
    if (file.endsWith('.mov')) {
      fs.unlinkSync(path.join(movDir, file));
      console.log(`Removed old file ${file}`);
    }
  }
}
console.log('Video setup completed!');
