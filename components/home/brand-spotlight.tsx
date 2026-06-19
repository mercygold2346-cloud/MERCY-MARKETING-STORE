import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export function BrandSpotlight() {
  return (
    <div className="grid items-stretch gap-0 overflow-hidden rounded-3xl bg-slate-950 lg:grid-cols-2">
      <div className="relative min-h-[300px] sm:min-h-[340px] lg:min-h-[400px]">
        <Image
          src="/images/hero/slide-1.jpg"
          alt="Young man in contemporary fashion"
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-950/20 to-slate-950/80 lg:to-slate-950" />
      </div>

      <div className="flex flex-col justify-center p-8 lg:p-12">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-rose-400">Brand spotlight</p>
        <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">Meet The Mercy Style Squad</h2>
        <p className="mt-4 text-sm leading-relaxed text-slate-100 sm:text-base">
          Curated looks for him and her — mix premium streetwear with timeless essentials. Our models showcase real
          outfits you can shop right now.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/shop?category=fashion">
            <Button variant="secondary" className="bg-white text-slate-950 hover:bg-slate-100">
              Shop Men
            </Button>
          </Link>
          <Link href="/shop?category=fashion">
            <Button
              variant="secondary"
              className="border-white/40 bg-transparent text-white hover:border-white/60 hover:bg-white/15"
            >
              Shop Women
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
