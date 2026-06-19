"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import { CheckCircle2, Loader2, XCircle } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type VerifyState = "loading" | "success" | "error";

export default function CheckoutCompletePage() {
  const searchParams = useSearchParams();
  const reference = searchParams.get("reference");
  const { clearCart } = useCart();
  const [state, setState] = useState<VerifyState>("loading");
  const [orderId, setOrderId] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!reference) {
      setState("error");
      setErrorMessage("No payment reference found.");
      return;
    }

    async function verify() {
      try {
        const response = await fetch(`/api/paystack/verify?reference=${encodeURIComponent(reference!)}`);
        const data = (await response.json()) as { error?: string; orderId?: string; email?: string };

        if (!response.ok) {
          throw new Error(data.error ?? "Payment verification failed.");
        }

        setOrderId(data.orderId ?? reference!);
        setEmail(data.email ?? "");
        setState("success");
        clearCart();
      } catch (error) {
        setState("error");
        setErrorMessage(error instanceof Error ? error.message : "Payment verification failed.");
      }
    }

    verify();
  }, [reference, clearCart]);

  return (
    <div className="mx-auto w-full max-w-lg px-4 pb-20 pt-16 sm:px-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center dark:border-slate-700 dark:bg-slate-900">
        {state === "loading" && (
          <>
            <Loader2 className="mx-auto h-10 w-10 animate-spin text-slate-500" />
            <h1 className="mt-4 text-2xl font-bold text-slate-950 dark:text-white">Confirming payment...</h1>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Please wait while we verify your Paystack payment.</p>
          </>
        )}

        {state === "success" && (
          <>
            <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-600" />
            <h1 className="mt-4 text-2xl font-bold text-slate-950 dark:text-white">Payment successful!</h1>
            <p className="mt-2 text-slate-600 dark:text-slate-400">
              Order <strong>{orderId}</strong> is confirmed.
              {email && (
                <>
                  {" "}
                  A confirmation email was sent to <strong>{email}</strong>.
                </>
              )}
            </p>
            <Link href="/shop" className="mt-6 inline-block">
              <Button>Continue Shopping</Button>
            </Link>
          </>
        )}

        {state === "error" && (
          <>
            <XCircle className="mx-auto h-10 w-10 text-rose-500" />
            <h1 className="mt-4 text-2xl font-bold text-slate-950 dark:text-white">Payment issue</h1>
            <p className="mt-2 text-sm text-rose-600 dark:text-rose-400">{errorMessage}</p>
            <div className="mt-6 flex justify-center gap-3">
              <Link href="/cart">
                <Button variant="secondary">Back to Cart</Button>
              </Link>
              <Link href="/contact">
                <Button>Contact Support</Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
