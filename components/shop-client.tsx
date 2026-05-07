"use client";

import { FilterSidebar } from "@/components/filter-sidebar";
import { ProductCard } from "@/components/product-card";
import { SectionHeading } from "@/components/section-heading";
import { products } from "@/data/products";
import { useMemo, useState } from "react";

type SortOption = "featured" | "price-asc" | "price-desc" | "rating-desc";

export function ShopClient() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(250);
  const [minRating, setMinRating] = useState(4.0);
  const [sortBy, setSortBy] = useState<SortOption>("featured");

  const filteredProducts = useMemo(() => {
    const normalized = searchQuery.trim().toLowerCase();

    const base = products.filter((product) => {
      const matchesCategory =
        selectedCategories.length === 0 || selectedCategories.includes(product.category);
      const matchesPrice = product.price <= maxPrice;
      const matchesRating = product.rating >= minRating;
      const matchesSearch =
        normalized.length === 0 ||
        product.name.toLowerCase().includes(normalized) ||
        product.category.toLowerCase().includes(normalized);
      return matchesCategory && matchesPrice && matchesRating && matchesSearch;
    });

    return [...base].sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "rating-desc") return b.rating - a.rating;
      return 0;
    });
  }, [maxPrice, minRating, searchQuery, selectedCategories, sortBy]);

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((item) => item !== categoryId) : [...prev, categoryId],
    );
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
      <SectionHeading
        title="Shop Marketplace"
        description="Browse curated products with premium filters and refined discovery."
      />
      <div className="mt-6 grid gap-6 lg:grid-cols-[280px_1fr]">
        <FilterSidebar
          selectedCategories={selectedCategories}
          onToggleCategory={toggleCategory}
          maxPrice={maxPrice}
          onPriceChange={setMaxPrice}
          minRating={minRating}
          onRatingChange={setMinRating}
        />
        <div>
          <div className="mb-4 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-600 sm:flex-row">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              aria-label="Search products"
              className="h-10 flex-1 rounded-full border border-slate-200 bg-slate-50 px-4 text-sm text-slate-700 outline-none ring-slate-900/10 focus:ring-2"
            />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              aria-label="Sort products"
              className="h-10 rounded-full border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none ring-slate-900/10 focus:ring-2"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating-desc">Top Rated</option>
            </select>
          </div>

          <p className="mb-4 text-sm text-slate-600">Showing {filteredProducts.length} products</p>
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
