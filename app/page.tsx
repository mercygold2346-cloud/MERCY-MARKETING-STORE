import { CategoryGrid } from "@/components/category-grid";
import { DealTimer } from "@/components/deal-timer";
import { ProductCard } from "@/components/product-card";
import { FadeInSection } from "@/components/sections/fade-in-section";
import { SectionHeading } from "@/components/section-heading";
import { SkeletonCard } from "@/components/skeleton-card";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
import { Globe, ShieldCheck, Truck } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Home",
  description: "Premium marketplace for global products, curated deals, and fast delivery.",
};

export default function Home() {
  const trending = products.slice(0, 4);
  const flashDeals = products.filter((product) => product.flashDeal).slice(0, 4);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
      <section className="rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 px-6 py-14 text-white sm:px-10">
        <p className="text-xs uppercase tracking-[0.24em] text-slate-300">Global premium marketplace</p>
        <h1 className="mt-4 max-w-2xl text-4xl font-bold leading-tight sm:text-5xl">
          Everything You Need. Delivered Fast.
        </h1>
        <p className="mt-4 max-w-2xl text-sm text-slate-300 sm:text-base">
          Discover verified products, trusted sellers, and lightning-fast shipping from one clean, modern shopping destination.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/shop">
            <Button>Start Shopping</Button>
          </Link>
          <Link href="/shop">
            <Button variant="secondary">Explore Deals</Button>
          </Link>
        </div>
      </section>

      <FadeInSection>
        <section className="mt-12">
          <SectionHeading title="Shop by Category" description="Curated categories to streamline your search." />
          <CategoryGrid />
        </section>
      </FadeInSection>

      <FadeInSection>
        <section className="mt-14">
          <SectionHeading title="Trending Products" description="Best-selling picks across our global network." />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {trending.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </FadeInSection>

      <FadeInSection>
        <section className="mt-14">
          <div className="mb-6 flex items-center justify-between">
            <SectionHeading title="Flash Deals" description="High-value offers ending soon." />
            <DealTimer />
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {flashDeals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </FadeInSection>

      <section className="mt-14">
        <SectionHeading title="Featured Collections" description="Premium kits and style-forward essentials." />
        <div className="grid gap-4 md:grid-cols-3">
          {["Smart Office", "Travel Essentials", "Wellness Upgrade"].map((item) => (
            <div key={item} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">{item}</h3>
              <p className="mt-2 text-sm text-slate-600">Elevated products selected for quality, speed, and value.</p>
              <Link href="/shop" className="mt-4 inline-block text-sm font-semibold text-slate-900">
                View Collection
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14 grid gap-4 rounded-3xl border border-slate-200 bg-white p-6 md:grid-cols-3">
        <div className="rounded-2xl bg-slate-50 p-5">
          <ShieldCheck className="h-5 w-5 text-slate-900" />
          <h3 className="mt-3 font-semibold text-slate-900">Secure Payments</h3>
          <p className="mt-2 text-sm text-slate-600">Bank-grade payment encryption and verified merchants.</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-5">
          <Truck className="h-5 w-5 text-slate-900" />
          <h3 className="mt-3 font-semibold text-slate-900">Fast Delivery</h3>
          <p className="mt-2 text-sm text-slate-600">Rapid fulfillment options with real-time shipping updates.</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-5">
          <Globe className="h-5 w-5 text-slate-900" />
          <h3 className="mt-3 font-semibold text-slate-900">Global Support</h3>
          <p className="mt-2 text-sm text-slate-600">24/7 multilingual support for a reliable experience.</p>
        </div>
      </section>

      <section className="mt-14">
        <SectionHeading title="Loading Preview" description="Skeleton states for perceived speed and smooth browsing." />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
