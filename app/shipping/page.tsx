import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shipping & Returns",
  description: "Shipping, delivery, and return policy for Mercy Marketing Store.",
};

export default function ShippingPage() {
  return (
    <LegalLayout title="Shipping & Returns">
      <section>
        <h2 className="text-lg font-semibold text-slate-900">Shipping</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>Standard delivery: 3–7 business days</li>
          <li>Express delivery: 1–3 business days (where available)</li>
          <li>Free shipping on orders over $75</li>
          <li>Standard shipping fee: $9 on orders under $75</li>
        </ul>
      </section>
      <section>
        <h2 className="text-lg font-semibold text-slate-900">Returns</h2>
        <p className="mt-3">
          Items may be returned within 30 days of delivery if unused and in original packaging. Contact our support
          team to start a return. Refunds are processed within 5–10 business days after we receive your item.
        </p>
      </section>
      <section>
        <h2 className="text-lg font-semibold text-slate-900">Questions?</h2>
        <p className="mt-3">
          Email us at{" "}
          <Link href="/contact" className="font-semibold text-slate-900 underline-offset-4 hover:underline">
            support@mercymarketingstore.com
          </Link>{" "}
          or use our contact form.
        </p>
      </section>
    </LegalLayout>
  );
}

function LegalLayout({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-slate-950">{title}</h1>
      <p className="mt-2 text-sm text-slate-500">Last updated: {new Date().toLocaleDateString("en-US")}</p>
      <div className="prose prose-slate mt-8 max-w-none space-y-6 text-sm leading-relaxed text-slate-600">{children}</div>
    </div>
  );
}
