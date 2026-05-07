import { Mail, MapPin, Phone } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get support and contact the MERCY MARKETING STORE team.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-slate-950">Contact Us</h1>
      <p className="mt-3 text-slate-600">Our support team is available 24/7 for orders, returns, and business inquiries.</p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <form className="rounded-3xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-slate-900">Send a Message</h2>
          <div className="mt-4 space-y-3">
            <label htmlFor="contact-name" className="sr-only">
              Full name
            </label>
            <input id="contact-name" className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none ring-slate-900/20 focus:ring-2" placeholder="Full name" />
            <label htmlFor="contact-email" className="sr-only">
              Email address
            </label>
            <input id="contact-email" className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none ring-slate-900/20 focus:ring-2" placeholder="Email address" type="email" />
            <label htmlFor="contact-message" className="sr-only">
              Message
            </label>
            <textarea id="contact-message" className="h-32 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none ring-slate-900/20 focus:ring-2" placeholder="How can we help?" />
            <button className="h-11 w-full rounded-full bg-slate-950 text-sm font-semibold text-white">Submit</button>
          </div>
        </form>

        <div className="space-y-4">
          <div className="rounded-3xl border border-slate-200 bg-white p-6">
            <Mail className="h-5 w-5 text-slate-900" />
            <p className="mt-3 text-sm font-semibold text-slate-900">support@mercymarketingstore.com</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6">
            <Phone className="h-5 w-5 text-slate-900" />
            <p className="mt-3 text-sm font-semibold text-slate-900">+1 (800) 555-0182</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6">
            <MapPin className="h-5 w-5 text-slate-900" />
            <p className="mt-3 text-sm font-semibold text-slate-900">Global Operations Hub, New York, NY</p>
          </div>
        </div>
      </div>
    </div>
  );
}
