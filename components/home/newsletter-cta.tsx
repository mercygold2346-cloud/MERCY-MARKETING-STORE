import { NewsletterForm } from "@/components/newsletter-form";
import { Sparkles } from "lucide-react";
import Image from "next/image";

export function NewsletterCta() {
  return (
    <section className="mt-16 overflow-hidden rounded-3xl bg-slate-950 shadow-xl shadow-slate-900/20">
      <div className="grid lg:grid-cols-2">
        <div className="relative min-h-[320px] sm:min-h-[380px] lg:min-h-[420px]">
          <Image
            src="/images/hero/newsletter-model.jpg"
            alt="Happy customer in stylish outfit celebrating a discount"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-slate-950/20 lg:to-slate-950/90" />
          <div className="absolute left-4 top-4 rounded-2xl border border-white/20 bg-rose-500 px-4 py-3 text-center shadow-lg backdrop-blur-sm sm:left-6 sm:top-6">
            <p className="text-3xl font-black leading-none text-white">15%</p>
            <p className="mt-0.5 text-[10px] font-bold uppercase tracking-wider text-white/90">Off first order</p>
          </div>
        </div>

        <div className="flex flex-col justify-center px-6 py-10 text-center sm:px-10 sm:py-12 lg:text-left">
          <p className="inline-flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-rose-400 lg:justify-start">
            <Sparkles className="h-3.5 w-3.5" />
            Join the list
          </p>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">Get 15% Off Your First Order</h2>
          <p className="mt-4 text-sm leading-relaxed text-slate-100 sm:text-base">
            Subscribe for early access to new drops, exclusive deals, and style guides.
          </p>
          <NewsletterForm variant="dark" inputId="home-newsletter-email" className="mt-8 lg:max-w-md" />
          <p className="mt-4 text-xs text-slate-400">No spam. Unsubscribe anytime.</p>
        </div>
      </div>
    </section>
  );
}
