import Link from "next/link";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  showText?: boolean;
};

export function Logo({ className, showText = true }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn("group flex min-w-0 items-center gap-2.5", className)}
      aria-label="Mercy Marketing Store — Home"
    >
      <span className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-rose-500 to-slate-950 shadow-md shadow-rose-500/20 transition group-hover:shadow-lg group-hover:shadow-rose-500/30 dark:from-rose-600 dark:to-slate-900">
        <svg viewBox="0 0 32 32" className="h-5 w-5" aria-hidden>
          <text
            x="16"
            y="22"
            textAnchor="middle"
            fill="white"
            fontSize="18"
            fontWeight="800"
            fontFamily="system-ui, sans-serif"
          >
            M
          </text>
        </svg>
      </span>
      {showText && (
        <span className="hidden min-w-0 flex-col leading-tight sm:flex">
          <span className="truncate text-sm font-black tracking-wide text-slate-950 dark:text-white">
            MERCY MARKETING
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-rose-600 dark:text-rose-400">
            Store
          </span>
        </span>
      )}
    </Link>
  );
}
