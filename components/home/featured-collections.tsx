import { featuredCollections } from "@/data/home";
import Image from "next/image";
import Link from "next/link";

export function FeaturedCollections() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {featuredCollections.map((collection, i) => (
        <Link
          key={collection.id}
          href={collection.href}
          className={`group relative overflow-hidden rounded-3xl ${
            i === 0 ? "md:row-span-1" : ""
          }`}
        >
          <div className="relative aspect-[4/5] min-h-[280px] sm:min-h-[320px]">
            <Image
              src={collection.image}
              alt={collection.title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6">
              <h3 className="text-xl font-bold text-white sm:text-2xl">{collection.title}</h3>
              <p className="mt-2 text-sm text-slate-200">{collection.description}</p>
              <span className="mt-4 inline-flex text-sm font-semibold text-white underline-offset-4 group-hover:underline">
                Shop collection →
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
