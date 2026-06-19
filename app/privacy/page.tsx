import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for Mercy Marketing Store.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-slate-950">Privacy Policy</h1>
      <p className="mt-2 text-sm text-slate-500">Last updated: {new Date().toLocaleDateString("en-US")}</p>
      <div className="mt-8 space-y-6 text-sm leading-relaxed text-slate-600">
        <p>
          Mercy Marketing Store respects your privacy. This policy explains how we collect, use, and protect your
          information when you use our website.
        </p>
        <section>
          <h2 className="text-lg font-semibold text-slate-900">Information we collect</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>Contact details you provide (name, email, message)</li>
            <li>Newsletter email addresses</li>
            <li>Order and cart information stored locally in your browser</li>
            <li>Basic usage data through standard web server logs</li>
          </ul>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-slate-900">How we use your data</h2>
          <p className="mt-3">
            We use your information to respond to inquiries, process orders, send marketing updates (with your
            consent), and improve our store experience.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-slate-900">Contact</h2>
          <p className="mt-3">
            Questions about privacy?{" "}
            <Link href="/contact" className="font-semibold text-slate-900 underline-offset-4 hover:underline">
              Contact us
            </Link>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
