import { trustStats } from "@/data/home";
import { Globe, ShieldCheck, Sparkles, Truck } from "lucide-react";

const icons = [Sparkles, Truck, Globe, ShieldCheck];

export function TrustBar() {
  return (
    <section className="mt-14 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="grid grid-cols-2 divide-x divide-y divide-slate-100 md:grid-cols-4 md:divide-y-0">
        {trustStats.map((stat, i) => {
          const Icon = icons[i];
          return (
            <div key={stat.label} className="flex flex-col items-center gap-2 p-6 text-center sm:p-8">
              <Icon className="h-5 w-5 text-rose-500" />
              <p className="text-2xl font-bold text-slate-950 sm:text-3xl">{stat.value}</p>
              <p className="text-xs font-medium uppercase tracking-wider text-slate-500 sm:text-sm">
                {stat.label}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
