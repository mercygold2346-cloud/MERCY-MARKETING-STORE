"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FormEvent, useState } from "react";

type NewsletterFormProps = {
  variant?: "light" | "dark";
  inputId?: string;
  className?: string;
  layout?: "inline" | "stacked";
};

export function NewsletterForm({
  variant = "dark",
  inputId = "newsletter-email",
  className,
  layout = "inline",
}: NewsletterFormProps) {
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setState("loading");
    setErrorMessage("");

    const value = String(new FormData(form).get("email") ?? "").trim();

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: value }),
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(data.error ?? "Could not subscribe.");
      setState("success");
      form.reset();
    } catch (error) {
      setState("error");
      setErrorMessage(error instanceof Error ? error.message : "Could not subscribe.");
    }
  }

  const isDark = variant === "dark";
  const isStacked = layout === "stacked";

  return (
    <div className={className}>
      <form
        onSubmit={handleSubmit}
        className={cn("flex gap-3", isStacked ? "flex-col" : "flex-col sm:flex-row sm:items-stretch")}
      >
        <label htmlFor={inputId} className="sr-only">
          Email address
        </label>
        <input
          id={inputId}
          name="email"
          type="email"
          required
          disabled={state === "loading" || state === "success"}
          placeholder="you@email.com"
          className={cn(
            "h-12 min-w-0 rounded-full border px-5 text-sm outline-none focus:ring-2 disabled:opacity-60",
            isStacked ? "w-full" : "w-full flex-1",
            isDark
              ? "border-white/25 bg-white/10 text-white placeholder:text-slate-400 ring-white/40"
              : "border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 ring-slate-900/20",
          )}
        />
        <Button
          type="submit"
          variant="secondary"
          disabled={state === "loading" || state === "success"}
          className={cn(
            "h-12 whitespace-nowrap",
            isStacked ? "w-full px-6" : "w-full shrink-0 px-6 sm:w-auto sm:px-8",
            isDark ? "bg-white text-slate-950 hover:bg-slate-100" : "",
          )}
        >
          {state === "loading" ? "Joining..." : state === "success" ? "Subscribed!" : "Get Discount"}
        </Button>
      </form>
      {state === "success" && (
        <p className={cn("mt-3 text-sm font-medium", isDark ? "text-emerald-300" : "text-emerald-700")}>
          You&apos;re subscribed! Check your inbox for your welcome offer.
        </p>
      )}
      {state === "error" && (
        <p className={cn("mt-3 text-sm font-medium", isDark ? "text-rose-300" : "text-rose-700")}>
          {errorMessage}
        </p>
      )}
    </div>
  );
}
