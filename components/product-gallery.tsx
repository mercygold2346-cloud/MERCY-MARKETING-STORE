"use client";

import { Product } from "@/types/product";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

export function ProductGallery({ product }: { product: Product }) {
  const [active, setActive] = useState(product.image);
  const thumbs = [product.image, product.image, product.image];

  return (
    <div className="space-y-4">
      <motion.div
        layout
        className="relative h-[380px] overflow-hidden rounded-3xl border border-slate-200 bg-white sm:h-[460px]"
      >
        <Image src={active} alt={product.name} fill className="object-cover" priority />
      </motion.div>
      <div className="grid grid-cols-3 gap-3">
        {thumbs.map((thumb, i) => (
          <button
            key={i}
            onClick={() => setActive(thumb)}
            className="relative h-24 overflow-hidden rounded-xl border border-slate-200"
          >
            <Image src={thumb} alt={`${product.name} thumbnail`} fill className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
