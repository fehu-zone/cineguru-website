import fs from "fs";
import path from "path";
import sharp from "sharp";

const rootDir = process.cwd();
const assetsDir = path.join(rootDir, "public", "assets");

async function optimizeLogos() {
  const refDir = path.join(assetsDir, "references");
  if (!fs.existsSync(refDir)) return;

  const files = fs.readdirSync(refDir).filter(f => f.endsWith(".webp"));
  console.log(`Optimizing ${files.length} logo images in references...`);

  for (const file of files) {
    const filePath = path.join(refDir, file);
    const inputBuffer = fs.readFileSync(filePath);
    const beforeSize = inputBuffer.length;

    const resultBuffer = await sharp(inputBuffer)
      .resize({ width: 280, withoutEnlargement: true })
      .webp({ quality: 85, effort: 6 })
      .toBuffer();

    fs.writeFileSync(filePath, resultBuffer);
    const afterSize = resultBuffer.length;
    console.log(`Logo ${file}: ${Math.round(beforeSize/1024)}KB -> ${Math.round(afterSize/1024)}KB`);
  }
}

async function optimizeProjectPosters() {
  const projDir = path.join(assetsDir, "projects");
  if (!fs.existsSync(projDir)) return;

  const files = fs.readdirSync(projDir);
  console.log(`Optimizing project posters in projects...`);

  for (const file of files) {
    const filePath = path.join(projDir, file);
    const isAvif = file.endsWith(".avif");
    const isWebp = file.endsWith(".webp");
    if (!isAvif && !isWebp) continue;

    const inputBuffer = fs.readFileSync(filePath);
    const beforeSize = inputBuffer.length;
    const is640 = file.includes("-640");
    const is1280 = file.includes("-1280");

    let pipeline = sharp(inputBuffer);
    if (is640) {
      pipeline = pipeline.resize({ width: 640, height: 360, fit: "cover", withoutEnlargement: true });
    } else if (is1280) {
      pipeline = pipeline.resize({ width: 1280, height: 720, fit: "cover", withoutEnlargement: true });
    }

    if (isAvif) {
      pipeline = pipeline.avif({ quality: 75, effort: 4 });
    } else if (isWebp) {
      pipeline = pipeline.webp({ quality: 78, effort: 4 });
    }

    const resultBuffer = await pipeline.toBuffer();
    fs.writeFileSync(filePath, resultBuffer);
    const afterSize = resultBuffer.length;
    console.log(`Project ${file}: ${Math.round(beforeSize/1024)}KB -> ${Math.round(afterSize/1024)}KB`);
  }
}

async function optimizeReelPosters() {
  const reelDir = path.join(assetsDir, "reels");
  if (!fs.existsSync(reelDir)) return;

  const files = fs.readdirSync(reelDir);
  console.log(`Optimizing reel posters in reels...`);

  for (const file of files) {
    const filePath = path.join(reelDir, file);
    const isAvif = file.endsWith(".avif");
    const isWebp = file.endsWith(".webp");
    if (!isAvif && !isWebp) continue;

    const inputBuffer = fs.readFileSync(filePath);
    const beforeSize = inputBuffer.length;
    const is540 = file.includes("-540");
    const is1080 = file.includes("-1080");

    let pipeline = sharp(inputBuffer);
    if (is540) {
      pipeline = pipeline.resize({ width: 540, height: 960, fit: "cover", withoutEnlargement: true });
    } else if (is1080) {
      pipeline = pipeline.resize({ width: 1080, height: 1920, fit: "cover", withoutEnlargement: true });
    }

    if (isAvif) {
      pipeline = pipeline.avif({ quality: 75, effort: 4 });
    } else if (isWebp) {
      pipeline = pipeline.webp({ quality: 78, effort: 4 });
    }

    const resultBuffer = await pipeline.toBuffer();
    fs.writeFileSync(filePath, resultBuffer);
    const afterSize = resultBuffer.length;
    console.log(`Reel ${file}: ${Math.round(beforeSize/1024)}KB -> ${Math.round(afterSize/1024)}KB`);
  }
}

async function optimizeOtherAssets() {
  const files = [
    { file: "method-direction-v6.webp", width: 800, quality: 80 },
    { file: "method-generation-v6.webp", width: 800, quality: 80 },
    { file: "method-filmcraft-v6.webp", width: 800, quality: 80 },
    { file: "og-cineguru-v7.jpg", width: 1200, quality: 82 },
    { file: "showreel-poster-1280.avif", width: 1280, quality: 75 },
    { file: "showreel-poster-1280.webp", width: 1280, quality: 78 },
  ];

  for (const item of files) {
    const filePath = path.join(assetsDir, item.file);
    if (!fs.existsSync(filePath)) continue;

    const inputBuffer = fs.readFileSync(filePath);
    const beforeSize = inputBuffer.length;

    let pipeline = sharp(inputBuffer).resize({ width: item.width, withoutEnlargement: true });
    if (item.file.endsWith(".avif")) {
      pipeline = pipeline.avif({ quality: item.quality, effort: 4 });
    } else if (item.file.endsWith(".webp")) {
      pipeline = pipeline.webp({ quality: item.quality, effort: 4 });
    } else {
      pipeline = pipeline.jpeg({ quality: item.quality, mozjpeg: true });
    }

    const resultBuffer = await pipeline.toBuffer();
    fs.writeFileSync(filePath, resultBuffer);
    console.log(`Asset ${item.file}: ${Math.round(beforeSize/1024)}KB -> ${Math.round(resultBuffer.length/1024)}KB`);
  }
}

async function run() {
  await optimizeLogos();
  await optimizeProjectPosters();
  await optimizeReelPosters();
  await optimizeOtherAssets();
  console.log("All image optimizations complete!");
}

run().catch(console.error);
