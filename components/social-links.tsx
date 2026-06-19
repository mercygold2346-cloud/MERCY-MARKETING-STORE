import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";
import { Facebook, Instagram, MessageCircle } from "lucide-react";

type SocialLinksProps = {
  className?: string;
  iconClassName?: string;
};

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" />
    </svg>
  );
}

const iconMap = {
  instagram: Instagram,
  facebook: Facebook,
  tiktok: TikTokIcon,
  whatsapp: MessageCircle,
};

export function SocialLinks({ className, iconClassName }: SocialLinksProps) {
  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      {siteConfig.social.map((item) => {
        const Icon = iconMap[item.icon];
        return (
          <a
            key={item.label}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Follow us on ${item.label}`}
            className={cn(
              "inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-rose-500/40 dark:hover:bg-rose-950/40 dark:hover:text-rose-400",
              item.icon === "whatsapp" &&
                "hover:border-[#25D366]/40 hover:bg-[#25D366]/10 hover:text-[#128C7E] dark:hover:text-[#25D366]",
            )}
          >
            <Icon className={cn("h-4 w-4", iconClassName)} />
          </a>
        );
      })}
    </div>
  );
}
