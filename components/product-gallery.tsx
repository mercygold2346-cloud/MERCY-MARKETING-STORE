"use client";

import { Product } from "@/types/product";
import { motion } from "framer-motion";
import Image from "next/image";

export function ProductGallery({ product }: { product: Product }) {
  return (
    <div className="space-y-4">
      <motion.div
        layout
        className="relative h-[380px] overflow-hidden rounded-3xl border border-slate-200 bg-white sm:h-[460px]"
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </motion.div>
      <p className="text-center text-xs text-slate-500">High-resolution product imagery</p>
    </div>
  );
}
