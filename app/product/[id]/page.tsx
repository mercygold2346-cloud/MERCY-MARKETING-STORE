import { AddToCartBar } from "@/components/add-to-cart-bar";
import { ProductCard } from "@/components/product-card";
import { ProductGallery } from "@/components/product-gallery";
import { ProductTrustBadges } from "@/components/product-trust-badges";
import { RatingStars } from "@/components/ui/rating-stars";
import { products } from "@/data/products";
import { currency } from "@/lib/utils";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = products.find((item) => item.id === id);
  if (!product) {
    return {
      title: "Product Not Found",
    };
  }
  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [product.image],
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = products.find((item) => item.id === id);

  if (!product) {
    notFound();
  }

  const related = products.filter((item) => item.category === product.category && item.id !== product.id);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-2">
        <ProductGallery product={product} />
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 dark:border-slate-700 dark:bg-slate-900">
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            {product.category}
          </span>
          <h1 className="mt-4 text-3xl font-bold text-slate-950 dark:text-white">{product.name}</h1>
          <div className="mt-4 flex items-center gap-4">
            <span className="text-3xl font-bold text-slate-950 dark:text-white">{currency(product.price)}</span>
            {product.originalPrice && (
              <span className="text-base text-slate-400 line-through">{currency(product.originalPrice)}</span>
            )}
          </div>
          <div className="mt-3">
            <RatingStars rating={product.rating} reviews={product.reviews} />
          </div>
          <p className="mt-5 text-sm leading-7 text-slate-600 dark:text-slate-400">{product.description}</p>
          <ul className="mt-5 space-y-2 text-sm text-slate-700 dark:text-slate-300">
            {product.features.map((feature) => (
              <li key={feature}>- {feature}</li>
            ))}
          </ul>
          <AddToCartBar product={product} />
          <ProductTrustBadges />
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-14">
          <h2 className="text-2xl font-bold text-slate-950 dark:text-white">Related Products</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.slice(0, 4).map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
