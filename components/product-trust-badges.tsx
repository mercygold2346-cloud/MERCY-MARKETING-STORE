import { FREE_SHIPPING_THRESHOLD } from "@/lib/shipping";
import { currency } from "@/lib/utils";
import { CreditCard, MessageCircle, RefreshCw, ShieldCheck, Truck } from "lucide-react";
import Link from "next/link";

const badges = [
  {
    icon: Truck,
    title: "Fast Nigeria delivery",
    text: "1–3 business days in Lagos · 3–7 days nationwide",
  },
  {
    icon: ShieldCheck,
    title: "Secure checkout",
    text: "Pay safely with Paystack, WhatsApp, or email order",
  },
  {
    icon: CreditCard,
    title: "Guest checkout",
    text: "No account needed — order in minutes",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp support",
    text: "Chat with us at 09026466738 for quick help",
  },
  {
    icon: RefreshCw,
    title: "Easy returns",
    text: "Damaged or wrong item? Contact us within 7 days",
  },
];

export function ProductTrustBadges() {
  return (
    <div className="mt-6 space-y-3">
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 dark:border-emerald-900/50 dark:bg-emerald-950/30">
        <p className="text-sm font-semibold text-emerald-900 dark:text-emerald-200">
          Free shipping on orders over {currency(FREE_SHIPPING_THRESHOLD)}
        </p>
        <p className="mt-0.5 text-xs text-emerald-700 dark:text-emerald-400">
          Standard delivery fee applies on smaller orders — shown at checkout.
        </p>
      </div>

      <ul className="grid gap-2 sm:grid-cols-2">
        {badges.map(({ icon: Icon, title, text }) => (
          <li
            key={title}
            className="flex gap-3 rounded-2xl border border-slate-200 bg-slate-50/80 p-3 dark:border-slate-700 dark:bg-slate-800/50"
          >
            <Icon className="mt-0.5 h-4 w-4 shrink-0 text-rose-500" />
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">{title}</p>
              <p className="mt-0.5 text-xs leading-relaxed text-slate-600 dark:text-slate-400">{text}</p>
            </div>
          </li>
        ))}
      </ul>

      <p className="text-xs text-slate-500 dark:text-slate-400">
        Questions before you buy?{" "}
        <Link href="/contact" className="font-semibold text-slate-900 underline-offset-2 hover:underline dark:text-white">
          Contact us
        </Link>{" "}
        or{" "}
        <a
          href="https://wa.me/2349026466738"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-[#128C7E] underline-offset-2 hover:underline dark:text-[#25D366]"
        >
          WhatsApp
        </a>
        .
      </p>
    </div>
  );
}
