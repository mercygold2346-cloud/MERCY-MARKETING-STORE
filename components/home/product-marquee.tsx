"use client";

import { products } from "@/data/products";
import { currency } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const marqueeProducts = [...products.slice(0, 12), ...products.slice(0, 12)];

export function ProductMarquee() {
  return (
    <section className="mt-10 w-full max-w-full overflow-hidden rounded-3xl border border-slate-200/80 bg-white py-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <div className="mb-4 flex items-center justify-between px-5 sm:px-6">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-rose-600">Live picks</p>
          <h2 className="text-lg font-bold text-slate-950 sm:text-xl">Trending Now — Auto Scroll</h2>
        </div>
        <Link href="/shop" className="text-sm font-semibold text-slate-900 underline-offset-4 hover:underline">
          Shop all
        </Link>
      </div>

      <div className="marquee-mask relative w-full overflow-hidden">
        <div className="marquee-track flex w-max gap-4 px-4 will-change-transform">
          {marqueeProducts.map((product, i) => (
            <Link
              key={`${product.id}-${i}`}
              href={`/product/${product.id}`}
              className="group flex w-[200px] shrink-0 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 transition hover:-translate-y-1 hover:shadow-lg sm:w-[220px]"
            >
              <div className="relative h-36 overflow-hidden bg-slate-100">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="220px"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                {product.flashDeal && (
                  <span className="absolute left-2 top-2 rounded-full bg-rose-500 px-2 py-0.5 text-[10px] font-bold uppercase text-white">
                    Hot
                  </span>
                )}
              </div>
              <div className="p-3">
                <p className="line-clamp-1 text-sm font-semibold text-slate-900">{product.name}</p>
                <p className="mt-1 text-sm font-bold text-slate-950">{currency(product.price)}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
