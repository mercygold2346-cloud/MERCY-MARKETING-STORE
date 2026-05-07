import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-white">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div>
          <h3 className="text-sm font-black text-slate-950">MERCY MARKETING STORE</h3>
          <p className="mt-3 text-sm text-slate-600">
            Premium global marketplace delivering trend-forward products fast.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-slate-900">Company</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
            <li>
              <Link href="/shop">Shop</Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-slate-900">Support</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li>Shipping & Returns</li>
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-slate-900">Newsletter</h4>
          <p className="mt-3 text-sm text-slate-600">Get exclusive drops and flash deal alerts.</p>
          <div className="mt-4 flex gap-2">
            <label htmlFor="newsletter-email" className="sr-only">
              Newsletter email
            </label>
            <input
              id="newsletter-email"
              type="email"
              placeholder="Your email"
              aria-label="Newsletter email"
              className="h-10 flex-1 rounded-full border border-slate-200 px-4 text-sm outline-none ring-slate-900/20 focus:ring-2"
            />
            <button className="rounded-full bg-slate-950 px-4 text-sm font-semibold text-white">
              Join
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
