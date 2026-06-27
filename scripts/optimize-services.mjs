// One-off: convert generated service PNGs into web-optimized JPGs.
// Run with: node scripts/optimize-services.mjs
import sharp from "sharp";
import { unlink } from "node:fs/promises";
import path from "node:path";

const SRC = "assets/images";
const names = [
  "service-family",
  "service-consumer",
  "service-civil",
  "service-property",
  "service-registration",
  "service-cheque",
  "service-arbitration",
];

async function run() {
  for (const name of names) {
    const png = path.join(SRC, `${name}.png`);
    await sharp(png)
      .resize({ width: 900, withoutEnlargement: true })
      .jpeg({ quality: 78, mozjpeg: true })
      .toFile(path.join(SRC, `${name}.jpg`));
    await unlink(png).catch(() => {});
    console.log(`optimized ${name}`);
  }
}

run().catch((e) => { console.error(e); process.exit(1); });
