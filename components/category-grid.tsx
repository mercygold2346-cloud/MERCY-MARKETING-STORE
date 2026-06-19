import { categories } from "@/data/products";
import { Cpu, Dumbbell, Shirt, Smartphone, Sofa, Sparkles } from "lucide-react";
import Link from "next/link";

const iconMap = { Smartphone, Shirt, Sofa, Sparkles, Dumbbell, Cpu };

export function CategoryGrid() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      {categories.map((category) => {
        const Icon = iconMap[category.icon as keyof typeof iconMap];
        return (
          <Link
            key={category.id}
            href={`/shop?category=${category.id}`}
            className="group rounded-2xl border border-slate-200 bg-white p-4 text-left transition hover:-translate-y-1 hover:border-rose-200 hover:shadow-lg hover:shadow-rose-100/50 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-rose-500/40 dark:hover:shadow-rose-900/20"
          >
            <span className="inline-flex rounded-xl bg-slate-100 p-2.5 transition group-hover:bg-rose-50 dark:bg-slate-800 dark:group-hover:bg-rose-950/50">
              <Icon className="h-5 w-5 text-slate-700 group-hover:text-rose-600 dark:text-slate-300 dark:group-hover:text-rose-400" />
            </span>
            <p className="mt-3 text-sm font-semibold text-slate-900 dark:text-slate-100">{category.label}</p>
          </Link>
        );
      })}
    </div>
  );
}
