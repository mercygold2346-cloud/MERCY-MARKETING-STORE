import { FaqContent } from "@/components/faq-content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about orders, payments, shipping, and returns at Mercy Marketing Store.",
};

export default function FaqPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 pb-20 pt-10 sm:px-6 lg:px-8">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-500">Help center</p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-5xl">
        Frequently Asked Questions
      </h1>
      <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-400">
        Everything you need to know about shopping, paying, and getting your order delivered.
      </p>
      <FaqContent />
    </div>
  );
}
