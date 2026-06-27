// Optimize site imagery: compress JPGs and emit WebP versions.
// Run with: npm run optimize:images
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const SRC = "assets/images";
const RAW = path.join(SRC, "_raw"); // keep originals here

const jobs = [
  { in: "hero-court.jpg",  width: 1600, jpgQ: 70, webpQ: 62 },
  { in: "about-court.jpg", width: 1000, jpgQ: 72, webpQ: 64 },
];

async function run() {
  await mkdir(RAW, { recursive: true });

  for (const job of jobs) {
    const src = path.join(RAW, job.in);
    const base = job.in.replace(/\.jpg$/, "");

    const pipeline = sharp(src).resize({ width: job.width, withoutEnlargement: true });

    await pipeline
      .clone()
      .jpeg({ quality: job.jpgQ, mozjpeg: true })
      .toFile(path.join(SRC, `${base}.jpg`));

    await pipeline
      .clone()
      .webp({ quality: job.webpQ })
      .toFile(path.join(SRC, `${base}.webp`));

    console.log(`optimized ${job.in}`);
  }

  // OG cover: fixed 1200x630 for social sharing
  await sharp(path.join(RAW, "hero-court.jpg"))
    .resize({ width: 1200, height: 630, fit: "cover", position: "centre" })
    .jpeg({ quality: 74, mozjpeg: true })
    .toFile(path.join(SRC, "og-cover.jpg"));
  console.log("optimized og-cover.jpg");
}

run().catch((e) => { console.error(e); process.exit(1); });
