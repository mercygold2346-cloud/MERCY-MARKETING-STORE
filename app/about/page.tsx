import { Globe, HeartHandshake, Target } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Learn the mission and trust principles behind MERCY MARKETING STORE.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-slate-950">About Mercy Marketing Store</h1>
      <p className="mt-4 text-base leading-8 text-slate-600">
        MERCY MARKETING STORE is a premium global marketplace built to make everyday shopping faster, safer, and more inspiring.
        We combine data-driven merchandising with elevated UX to deliver high-conversion commerce experiences without clutter.
      </p>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        <div className="rounded-3xl border border-slate-200 bg-white p-6">
          <Target className="h-5 w-5 text-slate-900" />
          <h2 className="mt-3 font-semibold text-slate-900">Our Mission</h2>
          <p className="mt-2 text-sm text-slate-600">Connect customers with quality products from trusted suppliers worldwide.</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6">
          <Globe className="h-5 w-5 text-slate-900" />
          <h2 className="mt-3 font-semibold text-slate-900">Global Reach</h2>
          <p className="mt-2 text-sm text-slate-600">International logistics network supporting rapid and reliable delivery.</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6">
          <HeartHandshake className="h-5 w-5 text-slate-900" />
          <h2 className="mt-3 font-semibold text-slate-900">Trust First</h2>
          <p className="mt-2 text-sm text-slate-600">Security, transparency, and support are core to every purchase journey.</p>
        </div>
      </div>
    </div>
  );
}
