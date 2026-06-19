import { testimonials } from "@/data/testimonials";
import { RatingStars } from "@/components/ui/rating-stars";
import { Quote } from "lucide-react";

export function Testimonials() {
  return (
    <section className="mt-16">
      <div className="mb-6 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-500">Customer love</p>
        <h2 className="mt-2 text-2xl font-bold text-slate-950 dark:text-white sm:text-3xl">What shoppers say</h2>
        <p className="mx-auto mt-2 max-w-xl text-sm text-slate-600 dark:text-slate-400 sm:text-base">
          Real feedback from customers across Nigeria who shop with us.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {testimonials.map((item) => (
          <article
            key={item.id}
            className="flex flex-col rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900"
          >
            <Quote className="h-5 w-5 text-rose-400" />
            <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-700 dark:text-slate-300">{item.text}</p>
            <div className="mt-4 border-t border-slate-100 pt-4 dark:border-slate-800">
              <RatingStars rating={item.rating} reviews={0} hideCount />
              <p className="mt-2 text-sm font-semibold text-slate-900 dark:text-white">{item.name}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{item.location}</p>
              {item.product && (
                <p className="mt-1 text-xs font-medium text-rose-600 dark:text-rose-400">Bought: {item.product}</p>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
