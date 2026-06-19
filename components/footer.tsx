import { Logo } from "@/components/logo";
import { NewsletterForm } from "@/components/newsletter-form";
import { SocialLinks } from "@/components/social-links";
import { siteConfig } from "@/data/site";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div>
          <Logo />
          <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">{siteConfig.tagline}</p>
          <ul className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-400">
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 shrink-0 text-rose-500" />
              <a href={`mailto:${siteConfig.email}`} className="hover:text-slate-950 dark:hover:text-white">
                {siteConfig.email}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0 text-rose-500" />
              <a href={`tel:${siteConfig.phoneTel}`} className="hover:text-slate-950 dark:hover:text-white">
                {siteConfig.phone}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4 shrink-0 text-rose-500" />
              <span>{siteConfig.location}</span>
            </li>
          </ul>
          <SocialLinks className="mt-5" />
        </div>
        <div>
          <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Company</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-400">
            <li>
              <Link href="/about" className="hover:text-slate-950 dark:hover:text-white">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-slate-950 dark:hover:text-white">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/shop" className="hover:text-slate-950 dark:hover:text-white">
                Shop
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Support</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-400">
            <li>
              <Link href="/faq" className="hover:text-slate-950 dark:hover:text-white">
                FAQ
              </Link>
            </li>
            <li>
              <Link href="/shipping" className="hover:text-slate-950 dark:hover:text-white">
                Shipping & Returns
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-slate-950 dark:hover:text-white">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-slate-950 dark:hover:text-white">
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Newsletter</h4>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">Get exclusive drops and flash deal alerts.</p>
          <NewsletterForm variant="light" inputId="footer-newsletter-email" layout="stacked" className="mt-4" />
        </div>
      </div>
      <div className="border-t border-slate-100 py-6 text-center text-xs text-slate-500 dark:border-slate-800 dark:text-slate-500">
        © {new Date().getFullYear()} {siteConfig.name}. All rights reserved. · Based in {siteConfig.location}
      </div>
    </footer>
  );
}
