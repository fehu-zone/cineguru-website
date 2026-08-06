import fs from "fs/promises";
import path from "path";

const items = [
  { slug: "etnospor-festivali", id: "YgTxEe4HDbo" },
  { slug: "sifir-atik", id: "qG5OExBLt8c" },
  { slug: "sifir-atik-blueaware", id: "YMRjZhdPsfk" },
  { slug: "vex-robotics", id: "aZrWhEaHDBg" },
  { slug: "cineguru-showreel", id: "7B39eWsDc5s" },
];

async function download() {
  const dir = path.join(process.cwd(), "public", "assets", "projects");
  await fs.mkdir(dir, { recursive: true });

  for (const item of items) {
    let url = `https://i.ytimg.com/vi/${item.id}/maxresdefault.jpg`;
    let res = await fetch(url);
    if (!res.ok) {
      url = `https://i.ytimg.com/vi/${item.id}/hqdefault.jpg`;
      res = await fetch(url);
    }
    if (res.ok) {
      const buffer = Buffer.from(await res.arrayBuffer());
      const webp1280 = path.join(dir, `${item.slug}-1280.webp`);
      const webp640 = path.join(dir, `${item.slug}-640.webp`);
      const avif1280 = path.join(dir, `${item.slug}-1280.avif`);
      const avif640 = path.join(dir, `${item.slug}-640.avif`);
      await fs.writeFile(webp1280, buffer);
      await fs.writeFile(webp640, buffer);
      await fs.writeFile(avif1280, buffer);
      await fs.writeFile(avif640, buffer);
      console.log(`Downloaded thumbnail for ${item.slug} (${item.id})`);
    } else {
      console.error(`Failed to download ${item.slug} (${item.id})`);
    }
  }
}

download();
