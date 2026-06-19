import { ContactForm } from "@/components/contact-form";
import { Clock, Mail, MapPin, MessageCircle, Phone, ShieldCheck } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get support and contact the MERCY MARKETING STORE team.",
};

const contactMethods = [
  {
    icon: Mail,
    label: "Email",
    value: "mercyonic@gmail.com",
    hint: "Best for orders & support",
    href: "mailto:mercyonic@gmail.com",
    action: "Open inbox",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "09026466738",
    hint: "Mon–Sat, 9am–6pm WAT",
    href: "tel:+2349026466738",
    action: "Tap to call",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Global Operations Hub",
    hint: "Lagos, Nigeria",
    href: null,
    action: null,
  },
] as const;

const highlights = [
  { icon: Clock, title: "24/7 inbox", text: "Messages are delivered to our team instantly." },
  { icon: ShieldCheck, title: "Secure & private", text: "Your details are only used to reply to you." },
  { icon: MessageCircle, title: "Fast replies", text: "Most inquiries answered within one business day." },
];

export default function ContactPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 pb-20 pt-10 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-500">Get in touch</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-5xl">Contact Us</h1>
        <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-400">
          Questions about an order, returns, or a product? Send us a message — we&apos;re here to help.
        </p>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
        <ContactForm />

        <aside className="space-y-4">
          {contactMethods.map(({ icon: Icon, label, value, hint, href, action }) => {
            const card = (
              <>
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-950 text-white transition group-hover:bg-slate-800">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>
                  <p className="mt-1 text-sm font-semibold text-slate-900 group-hover:text-rose-600 group-hover:underline dark:text-slate-100 dark:group-hover:text-rose-400">
                    {value}
                  </p>
                  <p className="mt-0.5 text-sm text-slate-500">{hint}</p>
                  {action ? (
                    <p className="mt-1 text-xs font-medium text-rose-500 opacity-0 transition group-hover:opacity-100">
                      {action}
                    </p>
                  ) : null}
                </div>
              </>
            );

            if (href) {
              return (
                <a
                  key={label}
                  href={href}
                  className="group flex cursor-pointer gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm shadow-slate-200/40 transition hover:border-rose-200 hover:bg-rose-50/30 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500/30 active:scale-[0.99] dark:border-slate-700 dark:bg-slate-900 dark:shadow-slate-900/40 dark:hover:border-rose-500/40 dark:hover:bg-rose-950/20"
                >
                  {card}
                </a>
              );
            }

            return (
              <div
                key={label}
                className="flex gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm shadow-slate-200/40 dark:border-slate-700 dark:bg-slate-900 dark:shadow-slate-900/40"
              >
                {card}
              </div>
            );
          })}

          <div className="rounded-2xl border border-slate-200/80 bg-gradient-to-br from-slate-50 to-white p-5 dark:border-slate-700 dark:from-slate-900 dark:to-slate-950">
            <p className="text-sm font-semibold text-slate-900 dark:text-white">Why contact us?</p>
            <ul className="mt-3 space-y-3">
              {highlights.map(({ icon: Icon, title, text }) => (
                <li key={title} className="flex gap-3">
                  <Icon className="mt-0.5 h-4 w-4 shrink-0 text-slate-700 dark:text-slate-300" />
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{title}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
