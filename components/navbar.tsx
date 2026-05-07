"use client";

import { useCart } from "@/context/cart-context";
import { Search, ShoppingBag } from "lucide-react";
import Link from "next/link";

export function Navbar() {
  const { itemCount } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-sm font-black tracking-wide text-slate-950 sm:text-base">
          MERCY MARKETING STORE
        </Link>
        <div className="relative ml-auto hidden max-w-md flex-1 md:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <label htmlFor="global-search" className="sr-only">
            Search products
          </label>
          <input
            id="global-search"
            type="text"
            placeholder="Search products, collections, brands..."
            aria-label="Search products"
            className="h-10 w-full rounded-full border border-slate-200 bg-slate-50 pl-9 pr-4 text-sm text-slate-700 outline-none ring-slate-900/10 transition focus:ring-2"
          />
        </div>
        <nav className="hidden items-center gap-5 text-sm font-medium text-slate-600 lg:flex">
          <Link href="/shop" className="hover:text-slate-950">
            Shop
          </Link>
          <Link href="/about" className="hover:text-slate-950">
            About
          </Link>
          <Link href="/contact" className="hover:text-slate-950">
            Contact
          </Link>
        </nav>
        <Link
          href="/cart"
          className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white hover:bg-slate-100"
          aria-label="Cart"
        >
          <ShoppingBag className="h-4 w-4 text-slate-700" />
          {itemCount > 0 && (
            <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-slate-950 px-1 text-[10px] font-bold text-white">
              {itemCount}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
