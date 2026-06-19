import { readFileSync } from "fs";

const text = readFileSync("data/products.ts", "utf8");
const products = [];
const blockRe = /\{\s*id: "(\d+)",[\s\S]*?\n  \},/g;
let block;
while ((block = blockRe.exec(text))) {
  const b = block[0];
  const id = b.match(/id: "(\d+)"/)?.[1];
  const name = b.match(/name: "([^"]+)"/)?.[1];
  const category = b.match(/category: "([^"]+)"/)?.[1];
  let image = null;
  if (b.includes('img("')) image = `/images/products/${b.match(/img\("([^"]+)"\)/)?.[1]}.jpg`;
  else if (b.includes('elec("')) image = `/images/products/electronics/${b.match(/elec\("([^"]+)"\)/)?.[1]}.png`;
  else if (b.includes('fash("')) image = `/images/products/fashion/${b.match(/fash\("([^"]+)"\)/)?.[1]}.png`;
  else if (b.includes('homeImg("')) image = `/images/products/home/${b.match(/homeImg\("([^"]+)"\)/)?.[1]}.png`;
  else if (b.includes('beautyImg("')) image = `/images/products/beauty/${b.match(/beautyImg\("([^"]+)"\)/)?.[1]}.png`;
  else if (b.includes('fitnessImg("')) image = `/images/products/fitness/${b.match(/fitnessImg\("([^"]+)"\)/)?.[1]}.png`;
  else if (b.includes('gadgetImg("')) image = `/images/products/gadgets/${b.match(/gadgetImg\("([^"]+)"\)/)?.[1]}.png`;
  if (id && name && category && image) products.push({ id, name, category, image });
}

const byImage = {};
for (const p of products) {
  (byImage[p.image] ||= []).push(p);
}
const dups = Object.entries(byImage).filter(([, arr]) => arr.length > 1);
console.log("Total products:", products.length);
console.log("Duplicate image groups:", dups.length);
console.log("Extra duplicate entries:", dups.reduce((s, [, a]) => s + a.length - 1, 0));
for (const [img, arr] of dups.sort((a, b) => b[1].length - a[1].length)) {
  console.log(`\n--- ${img} (${arr.length}) ---`);
  for (const p of arr) console.log(`  ${p.id} | ${p.category} | ${p.name}`);
}
