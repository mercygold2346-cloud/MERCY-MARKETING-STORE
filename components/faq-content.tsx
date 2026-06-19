"use client";

import { faqCategories, faqs } from "@/data/faq";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function FaqContent() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null);

  const filtered =
    activeCategory === "all" ? faqs : faqs.filter((item) => item.category === activeCategory);

  return (
    <div className="mt-10 space-y-8">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setActiveCategory("all")}
          className={cn(
            "rounded-full px-4 py-2 text-sm font-medium transition",
            activeCategory === "all"
              ? "bg-slate-950 text-white dark:bg-white dark:text-slate-950"
              : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800",
          )}
        >
          All
        </button>
        {faqCategories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setActiveCategory(cat.id)}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium transition",
              activeCategory === cat.id
                ? "bg-slate-950 text-white dark:bg-white dark:text-slate-950"
                : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800",
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((item) => {
          const isOpen = openId === item.id;
          return (
            <div
              key={item.id}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900"
            >
              <button
                type="button"
                onClick={() => setOpenId(isOpen ? null : item.id)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                aria-expanded={isOpen}
              >
                <span className="text-sm font-semibold text-slate-900 dark:text-white sm:text-base">{item.question}</span>
                <ChevronDown
                  className={cn("h-4 w-4 shrink-0 text-slate-500 transition", isOpen && "rotate-180")}
                />
              </button>
              {isOpen && (
                <div className="border-t border-slate-100 px-5 py-4 text-sm leading-relaxed text-slate-600 dark:border-slate-800 dark:text-slate-400">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="rounded-2xl border border-rose-100 bg-gradient-to-r from-rose-50 to-white p-6 text-center dark:border-rose-900/40 dark:from-rose-950/30 dark:to-slate-900">
        <p className="text-sm font-semibold text-slate-900 dark:text-white">Still have questions?</p>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          Our team is happy to help by email or WhatsApp.
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          <Link
            href="/contact"
            className="rounded-full bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
          >
            Contact us
          </Link>
          <a
            href="https://wa.me/2349026466738"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-[#25D366] bg-[#25D366]/10 px-5 py-2.5 text-sm font-semibold text-[#128C7E] hover:bg-[#25D366]/20 dark:text-[#25D366]"
          >
            WhatsApp 09026466738
          </a>
        </div>
      </div>
    </div>
  );
}
