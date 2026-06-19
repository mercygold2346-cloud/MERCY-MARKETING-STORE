import { CategoryGrid } from "@/components/category-grid";
import { DealTimer } from "@/components/deal-timer";
import { BrandSpotlight } from "@/components/home/brand-spotlight";
import { FeaturedCollections } from "@/components/home/featured-collections";
import { HeroCarousel } from "@/components/home/hero-carousel";
import { NewsletterCta } from "@/components/home/newsletter-cta";
import { ProductMarquee } from "@/components/home/product-marquee";
import { Testimonials } from "@/components/home/testimonials";
import { TrustBar } from "@/components/home/trust-bar";
import { ProductCard } from "@/components/product-card";
import { FadeInSection } from "@/components/sections/fade-in-section";
import { SectionHeading } from "@/components/section-heading";
import { products } from "@/data/products";
import { ArrowRight, Sparkles } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Shop premium fashion, streetwear, and lifestyle products at Mercy Marketing Store. New drops, flash deals, and fast delivery.",
};

export default function Home() {
  const trending = products.slice(0, 4);
  const flashDeals = products.filter((product) => product.flashDeal).slice(0, 4);
  const fashionPicks = products
    .filter((p) => p.category === "fashion" || p.category === "beauty")
    .slice(0, 6);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 pb-20 pt-6 sm:px-6 lg:px-8">
      <HeroCarousel />

      <ProductMarquee />

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3 rounded-2xl border border-rose-100 bg-gradient-to-r from-rose-50 via-white to-amber-50 px-4 py-3 text-center sm:gap-6 sm:px-6 dark:border-rose-900/40 dark:from-rose-950/40 dark:via-slate-900 dark:to-amber-950/30">
        <Sparkles className="hidden h-4 w-4 text-rose-500 sm:block" />
        <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
          <span className="font-bold text-rose-600 dark:text-rose-400">Free shipping</span> on orders over $75 · New fashion drops every week
        </p>
        <Link href="/shop" className="inline-flex items-center gap-1 text-sm font-semibold text-slate-900 hover:underline dark:text-white">
          Shop new arrivals <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <FadeInSection>
        <section className="mt-14">
          <SectionHeading
            title="Shop by Category"
            description="From streetwear to beauty — find your style in seconds."
          />
          <CategoryGrid />
        </section>
      </FadeInSection>

      <FadeInSection>
        <section className="mt-16">
          <BrandSpotlight />
        </section>
      </FadeInSection>

      <FadeInSection>
        <section className="mt-16">
          <SectionHeading title="Trending Products" description="Best-selling picks loved by our community." />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {trending.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </FadeInSection>

      <FadeInSection>
        <section className="mt-16">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <SectionHeading title="Flash Deals" description="High-value offers ending soon — grab them fast." />
            <DealTimer />
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {flashDeals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </FadeInSection>

      <section className="mt-16">
        <SectionHeading
          title="Featured Collections"
          description="Editorial picks — men's, women's, and footwear in one place."
        />
        <FeaturedCollections />
      </section>

      {fashionPicks.length > 0 && (
        <FadeInSection>
          <section className="mt-16">
            <SectionHeading title="Style & Beauty Picks" description="Outfits and glow-ups worth adding to cart." />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {fashionPicks.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <div className="mt-6 text-center">
              <Link
                href="/shop?category=fashion"
                className="inline-flex items-center gap-1 text-sm font-semibold text-slate-900 hover:underline dark:text-white"
              >
                View all fashion & beauty <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </section>
        </FadeInSection>
      )}

      <TrustBar />

      <FadeInSection>
        <Testimonials />
      </FadeInSection>

      <NewsletterCta />
    </div>
  );
}
