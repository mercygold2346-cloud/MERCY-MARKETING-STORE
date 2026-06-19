import { CartClient } from "@/components/cart-client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cart",
  description: "Review your items and complete your order.",
};

export default function CartPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-950">Your Cart</h1>
      <CartClient />
    </div>
  );
}
