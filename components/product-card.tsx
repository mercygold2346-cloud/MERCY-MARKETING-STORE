"use client";

import { RatingStars } from "@/components/ui/rating-stars";
import { useCart } from "@/context/cart-context";
import { currency } from "@/lib/utils";
import { Product } from "@/types/product";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

export function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <motion.article
      whileHover={{ y: -5, scale: 1.01 }}
      transition={{ duration: 0.2 }}
      className="group rounded-3xl border border-slate-200 bg-white p-3 shadow-sm transition-shadow hover:shadow-xl dark:border-slate-700 dark:bg-slate-900 dark:hover:shadow-slate-900/40"
    >
      <Link href={`/product/${product.id}`} className="block">
        <div className="relative h-52 overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {discount > 0 && (
            <span className="absolute left-3 top-3 rounded-full bg-rose-500 px-2.5 py-1 text-xs font-semibold text-white">
              -{discount}%
            </span>
          )}
        </div>
      </Link>
      <div className="space-y-2 p-2 pt-4">
        <Link href={`/product/${product.id}`} className="block">
          <h3 className="line-clamp-2 text-sm font-semibold text-slate-900 dark:text-slate-100">{product.name}</h3>
        </Link>
        <RatingStars rating={product.rating} reviews={product.reviews} />
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-slate-900 dark:text-white">{currency(product.price)}</span>
          {product.originalPrice && (
            <span className="text-xs text-slate-400 line-through">
              {currency(product.originalPrice)}
            </span>
          )}
        </div>
        <Button className="w-full" onClick={() => addToCart(product)}>
          Add to Cart
        </Button>
      </div>
    </motion.article>
  );
}
