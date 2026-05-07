"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import { Product } from "@/types/product";

export function AddToCartBar({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return (
    <div className="sticky bottom-3 mt-8 rounded-2xl border border-slate-200 bg-white p-2 shadow-lg sm:static sm:border-0 sm:p-0 sm:shadow-none">
      <Button className="w-full sm:w-auto" onClick={() => addToCart(product)}>
        Add to Cart
      </Button>
    </div>
  );
}
