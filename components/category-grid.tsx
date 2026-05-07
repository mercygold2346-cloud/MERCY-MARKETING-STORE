import { categories } from "@/data/products";
import { Cpu, Dumbbell, Shirt, Smartphone, Sofa, Sparkles } from "lucide-react";

const iconMap = { Smartphone, Shirt, Sofa, Sparkles, Dumbbell, Cpu };

export function CategoryGrid() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      {categories.map((category) => {
        const Icon = iconMap[category.icon as keyof typeof iconMap];
        return (
          <button
            key={category.id}
            className="rounded-2xl border border-slate-200 bg-white p-4 text-left transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <Icon className="h-5 w-5 text-slate-700" />
            <p className="mt-3 text-sm font-semibold text-slate-900">{category.label}</p>
          </button>
        );
      })}
    </div>
  );
}
