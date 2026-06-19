import { SocialLinks } from "@/components/social-links";
import { siteConfig } from "@/data/site";
import { Globe, HeartHandshake, MapPin, Sparkles, Target, Users } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "Mercy Marketing Store — a Lagos-based online shop bringing fashion, electronics, beauty, and lifestyle products to customers across Nigeria.",
};

const values = [
  {
    icon: Target,
    title: "Quality first",
    text: "Every product is chosen for real value — not just hype. We curate items our customers actually want to use and wear.",
  },
  {
    icon: MapPin,
    title: "Built for Nigeria",
    text: "Based in Lagos with delivery across Nigeria. Pay with Paystack, order on WhatsApp, or send an email — whatever works for you.",
  },
  {
    icon: HeartHandshake,
    title: "People over transactions",
    text: "We reply on WhatsApp, email, and phone. If something goes wrong with your order, we fix it — that's our promise.",
  },
  {
    icon: Globe,
    title: "Trend-forward catalog",
    text: "Fashion, electronics, home, beauty, fitness, and gadgets — updated regularly so you always find something fresh.",
  },
];

const milestones = [
  { label: "Products listed", value: "100+" },
  { label: "Categories", value: "6" },
  { label: "Support hours", value: "Mon–Sat" },
  { label: "Based in", value: "Lagos" },
];

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 pb-20 pt-10 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-500">Our story</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-5xl">
            Nigeria&apos;s marketplace for style, tech & everyday essentials
          </h1>
          <p className="mt-5 text-base leading-relaxed text-slate-600 dark:text-slate-400">
            Mercy Marketing Store started with a simple idea: make it easy for Nigerians to discover and buy quality
            products online — without complicated sign-ups, confusing checkout, or slow support.
          </p>
          <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-400">
            From Lagos, we serve shoppers nationwide with fashion drops, electronics, home goods, beauty picks, and
            more. Browse freely, add to cart, pay securely with Paystack, or message us on WhatsApp at{" "}
            <strong>{siteConfig.phone}</strong> — we&apos;re real people, and we&apos;re here to help.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/shop"
              className="inline-flex rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
            >
              Start shopping
            </Link>
            <Link
              href="/contact"
              className="inline-flex rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50 dark:border-slate-700 dark:text-white dark:hover:bg-slate-800"
            >
              Contact us
            </Link>
          </div>
        </div>

        <div className="relative min-h-[320px] overflow-hidden rounded-3xl bg-slate-950 shadow-xl">
          <Image
            src="/images/hero/slide-2.jpg"
            alt="Mercy Marketing Store — curated fashion and lifestyle products"
            fill
            sizes="(max-width: 1024px) 100vw, 480px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-rose-400">
              <Sparkles className="h-3.5 w-3.5" />
              Mercy Marketing Store
            </p>
            <p className="mt-2 text-lg font-bold text-white">Trusted by shoppers across Nigeria</p>
            <p className="mt-1 text-sm text-slate-300">{siteConfig.location} · Serving customers nationwide</p>
          </div>
        </div>
      </div>

      <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {milestones.map((item) => (
          <div
            key={item.label}
            className="rounded-2xl border border-slate-200 bg-white p-5 text-center dark:border-slate-700 dark:bg-slate-900"
          >
            <p className="text-2xl font-bold text-slate-950 dark:text-white">{item.value}</p>
            <p className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
              {item.label}
            </p>
          </div>
        ))}
      </div>

      <section className="mt-16">
        <div className="mb-8 flex items-center gap-3">
          <Users className="h-5 w-5 text-rose-500" />
          <h2 className="text-2xl font-bold text-slate-950 dark:text-white">What we stand for</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {values.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900"
            >
              <Icon className="h-5 w-5 text-rose-500" />
              <h3 className="mt-3 font-semibold text-slate-900 dark:text-white">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16 rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-8 dark:border-slate-700 dark:from-slate-900 dark:to-slate-950 sm:p-10">
        <h2 className="text-2xl font-bold text-slate-950 dark:text-white">Why shop with us?</h2>
        <ul className="mt-5 space-y-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          <li>✓ No login required — guest checkout in minutes</li>
          <li>✓ Paystack, WhatsApp ordering, and email order requests</li>
          <li>✓ Order confirmation emails so you always have a reference</li>
          <li>✓ Free shipping on orders over $75</li>
          <li>✓ Real support via {siteConfig.email} and WhatsApp {siteConfig.phone}</li>
        </ul>
        <SocialLinks className="mt-6" />
      </section>
    </div>
  );
}
