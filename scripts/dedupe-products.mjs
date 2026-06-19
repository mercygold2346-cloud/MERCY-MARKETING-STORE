import { readFileSync, writeFileSync } from "fs";

const file = "data/products.ts";
const text = readFileSync(file, "utf8");

const bundleNames = {
  "/images/products/electronics/tech-essentials.png": "Premium Tech Essentials Bundle",
  "/images/products/electronics/apple-ecosystem.png": "Apple Ecosystem Bundle",
  "/images/products/electronics/iphones.png": "iPhone 16 Collection",
  "/images/products/electronics/smartwatch.png": "Apex Smart Fitness Watch Set",
  "/images/products/fashion/streetwear-essentials.png": "Streetwear Essentials Bundle",
  "/images/products/fashion/nike-sportswear-set.png": "Nike Sportswear Set",
  "/images/products/fashion/green-orange-streetwear.png": "Green & Orange Streetwear Look",
  "/images/products/fashion/burgundy-minimalist-look.png": "Burgundy Minimalist Look Set",
  "/images/products/fashion/dark-streetwear-edit.png": "Dark Streetwear Edit Bundle",
  "/images/products/fashion/summer-linen-shirts.png": "Summer Linen Shirt Collection",
  "/images/products/fashion/navy-denim-ootd.png": "Navy Denim OOTD Set",
  "/images/products/fashion/varsity-streetwear.png": "Varsity Streetwear Set",
  "/images/products/fashion/lavender-coquette.png": "Lavender Coquette Look Set",
  "/images/products/fashion/pink-bow-coquette.png": "Pink Bow Coquette Set",
  "/images/products/fashion/casual-neutral-collage.png": "Casual Neutral Outfit Collection",
  "/images/products/fashion/city-casual-look.png": "City Casual Look Set",
  "/images/products/fashion/comfy-day-ootd.png": "Comfy Day OOTD Set",
  "/images/products/fashion/lavender-summer-set.png": "Lavender Summer Set",
};

function resolveImage(block) {
  if (block.includes('img("')) return `/images/products/${block.match(/img\("([^"]+)"\)/)?.[1]}.jpg`;
  if (block.includes('elec("')) return `/images/products/electronics/${block.match(/elec\("([^"]+)"\)/)?.[1]}.png`;
  if (block.includes('fash("')) return `/images/products/fashion/${block.match(/fash\("([^"]+)"\)/)?.[1]}.png`;
  if (block.includes('homeImg("')) return `/images/products/home/${block.match(/homeImg\("([^"]+)"\)/)?.[1]}.png`;
  if (block.includes('beautyImg("')) return `/images/products/beauty/${block.match(/beautyImg\("([^"]+)"\)/)?.[1]}.png`;
  if (block.includes('fitnessImg("')) return `/images/products/fitness/${block.match(/fitnessImg\("([^"]+)"\)/)?.[1]}.png`;
  if (block.includes('gadgetImg("')) return `/images/products/gadgets/${block.match(/gadgetImg\("([^"]+)"\)/)?.[1]}.png`;
  return null;
}

const headerEnd = text.indexOf("export const products: Product[] = [");
const footerStart = text.lastIndexOf("\n];");
const header = text.slice(0, headerEnd);
const footer = text.slice(footerStart);

const arrayBody = text.slice(headerEnd + "export const products: Product[] = [".length, footerStart);
const blockRe = /\n  \{[\s\S]*?\n  \},/g;
const blocks = arrayBody.match(blockRe) || [];

const seen = new Map();
const kept = [];
let removed = 0;

for (const block of blocks) {
  const id = Number(block.match(/id: "(\d+)"/)?.[1]);
  const image = resolveImage(block);
  if (!image) {
    kept.push(block);
    continue;
  }
  if (seen.has(image)) {
    removed++;
    continue;
  }
  seen.set(image, id);
  let updated = block;
  const bundleName = bundleNames[image];
  if (bundleName) {
    updated = updated.replace(/name: "[^"]+"/, `name: "${bundleName}"`);
    updated = updated.replace(
      /description: "[^"]+"/,
      `description: "Curated collection featuring everything shown in the product photo — one complete set, ready to shop."`,
    );
  }
  kept.push(updated);
}

const output = header + "export const products: Product[] = [" + kept.join("") + footer;
writeFileSync(file, output);
console.log(`Removed ${removed} duplicate products. Kept ${kept.length} total.`);
