import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const baseDir = path.resolve(__dirname, '..');
const dir = path.join(baseDir, 'public', 'assets', 'reels');

async function downloadReelThumbnail(slug, youtubeId) {
  await fs.mkdir(dir, { recursive: true });

  const urls = [
    `https://i.ytimg.com/vi/${youtubeId}/maxresdefault.jpg`,
    `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`,
    `https://i.ytimg.com/vi/${youtubeId}/sddefault.jpg`,
  ];

  let buffer = null;
  for (const url of urls) {
    try {
      const res = await fetch(url);
      if (res.ok) {
        buffer = Buffer.from(await res.arrayBuffer());
        console.log(`Successfully fetched from ${url}`);
        break;
      }
    } catch (e) {
      console.error(`Failed url ${url}`, e);
    }
  }

  if (buffer) {
    const webp1080 = path.join(dir, `${slug}-1080.webp`);
    const webp540 = path.join(dir, `${slug}-540.webp`);
    const avif1080 = path.join(dir, `${slug}-1080.avif`);
    const avif540 = path.join(dir, `${slug}-540.avif`);

    await fs.writeFile(webp1080, buffer);
    await fs.writeFile(webp540, buffer);
    await fs.writeFile(avif1080, buffer);
    await fs.writeFile(avif540, buffer);
    console.log(`Saved thumbnails for ${slug} (${youtubeId})`);
  } else {
    console.error(`Could not fetch thumbnail for ${youtubeId}`);
  }
}

downloadReelThumbnail('dikey-produksiyon', 'DPIxxw01dA0');
