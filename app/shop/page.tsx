import { ShopClient } from "@/components/shop-client";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Shop",
  description: "Browse premium products with refined filters and trusted checkout.",
};

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-7xl px-4 py-16 text-slate-600">Loading shop...</div>}>
      <ShopClient />
    </Suspense>
  );
}
