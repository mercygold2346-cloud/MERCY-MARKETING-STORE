"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CheckCircle2, Loader2, Mail, MessageSquare, Send, User } from "lucide-react";
import { FormEvent, useState } from "react";

type FormState = "idle" | "loading" | "success" | "error";

const inputClass =
  "h-12 w-full rounded-xl border border-slate-200 bg-slate-50/80 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:bg-white focus:ring-2 focus:ring-slate-900/10 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-slate-500 dark:focus:bg-slate-800";

export function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setState("loading");
    setErrorMessage("");

    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      subject: String(formData.get("subject") ?? "").trim(),
      message: String(formData.get("message") ?? "").trim(),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(data.error ?? "Could not send your message.");
      }

      setState("success");
      form.reset();
    } catch (error) {
      setState("error");
      setErrorMessage(error instanceof Error ? error.message : "Could not send your message.");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm shadow-slate-200/60 dark:border-slate-700 dark:bg-slate-900 dark:shadow-slate-900/40"
    >
      <div className="border-b border-slate-100 bg-gradient-to-r from-slate-950 to-slate-800 px-6 py-5 text-white sm:px-8">
        <h2 className="text-xl font-semibold tracking-tight">Send a Message</h2>
        <p className="mt-1 text-sm text-slate-300">
          Fill out the form and we&apos;ll get back to you by email — usually within 24 hours.
        </p>
      </div>

      <div className="space-y-4 p-6 sm:p-8">
        <div className="relative">
          <User className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <label htmlFor="contact-name" className="sr-only">
            Full name
          </label>
          <input
            id="contact-name"
            name="name"
            required
            minLength={2}
            disabled={state === "loading"}
            className={inputClass}
            placeholder="Full name"
          />
        </div>

        <div className="relative">
          <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <label htmlFor="contact-email" className="sr-only">
            Email address
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            disabled={state === "loading"}
            className={inputClass}
            placeholder="Email address"
          />
        </div>

        <div className="relative">
          <MessageSquare className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <label htmlFor="contact-subject" className="sr-only">
            Subject
          </label>
          <input
            id="contact-subject"
            name="subject"
            disabled={state === "loading"}
            className={inputClass}
            placeholder="Subject (optional)"
          />
        </div>

        <div>
          <label htmlFor="contact-message" className="sr-only">
            Message
          </label>
          <textarea
            id="contact-message"
            name="message"
            required
            minLength={10}
            disabled={state === "loading"}
            className={cn(inputClass, "h-36 resize-none py-3 pl-4")}
            placeholder="Tell us about your order, question, or feedback..."
          />
        </div>

        <Button
          type="submit"
          disabled={state === "loading" || state === "success"}
          className="h-12 w-full gap-2 text-sm font-semibold"
        >
          {state === "loading" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : state === "success" ? (
            <>
              <CheckCircle2 className="h-4 w-4" />
              Message Sent
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              Send Message
            </>
          )}
        </Button>

        {state === "success" && (
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 dark:border-emerald-900 dark:bg-emerald-950/30">
            <p className="text-sm font-medium text-emerald-900 dark:text-emerald-200">Thank you — your message was sent successfully.</p>
            <p className="mt-1 text-sm text-emerald-700 dark:text-emerald-400">
              We&apos;ll reply to the email you provided. A confirmation copy was sent to your inbox.
            </p>
          </div>
        )}

        {state === "error" && (
          <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3">
            <p className="text-sm font-medium text-rose-900">{errorMessage}</p>
            {errorMessage.includes("GMAIL") && (
              <p className="mt-2 text-xs leading-relaxed text-rose-700">
                Create a <strong>.env.local</strong> file in the project root with GMAIL_USER and GMAIL_APP_PASSWORD.
                See <strong>env.example</strong> in the project folder for the exact format.
              </p>
            )}
          </div>
        )}
      </div>
    </form>
  );
}
