import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of service for Mercy Marketing Store.",
};

export default function TermsPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-slate-950">Terms of Service</h1>
      <p className="mt-2 text-sm text-slate-500">Last updated: {new Date().toLocaleDateString("en-US")}</p>
      <div className="mt-8 space-y-6 text-sm leading-relaxed text-slate-600">
        <p>
          By using Mercy Marketing Store, you agree to these terms. Please read them carefully before placing an
          order.
        </p>
        <section>
          <h2 className="text-lg font-semibold text-slate-900">Orders & pricing</h2>
          <p className="mt-3">
            All prices are listed in USD. We reserve the right to update prices and product availability. An order
            is confirmed once you receive an order reference and confirmation communication from our team.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-slate-900">Product information</h2>
          <p className="mt-3">
            We aim to display accurate product images and descriptions. Minor variations in color or packaging may
            occur.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-slate-900">Limitation of liability</h2>
          <p className="mt-3">
            Mercy Marketing Store is not liable for indirect or consequential damages arising from use of this
            website or products purchased through it, to the fullest extent permitted by law.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-slate-900">Contact</h2>
          <p className="mt-3">
            <Link href="/contact" className="font-semibold text-slate-900 underline-offset-4 hover:underline">
              Contact support
            </Link>{" "}
            for questions about these terms.
          </p>
        </section>
      </div>
    </div>
  );
}
