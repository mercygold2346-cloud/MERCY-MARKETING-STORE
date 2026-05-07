"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import { currency } from "@/lib/utils";
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type CheckoutStep = "cart" | "shipping" | "payment" | "complete";

export function CartClient() {
  const { cartItems, removeFromCart, updateQuantity, subtotal, clearCart } = useCart();
  const [step, setStep] = useState<CheckoutStep>("cart");
  const shippingFee = cartItems.length > 0 ? 9 : 0;
  const total = subtotal + shippingFee;

  if (cartItems.length === 0 && step !== "complete") {
    return (
      <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-10 text-center">
        <p className="text-slate-600">Your cart is empty.</p>
        <Link href="/shop" className="mt-5 inline-block">
          <Button>Start Shopping</Button>
        </Link>
      </div>
    );
  }

  if (step === "complete") {
    return (
      <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-10 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-600" />
        <h2 className="mt-4 text-2xl font-bold text-slate-950">Order Confirmed</h2>
        <p className="mt-2 text-slate-600">Your mock checkout is complete. Confirmation #MMS-20485.</p>
        <div className="mt-6 flex justify-center gap-3">
          <Link href="/shop">
            <Button variant="secondary">Continue Shopping</Button>
          </Link>
          <Button onClick={clearCart}>Clear Cart</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
      <div className="space-y-4">
        {step === "cart" &&
          cartItems.map((item) => (
            <div key={item.id} className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-4">
              <div className="relative h-20 w-20 overflow-hidden rounded-xl">
                <Image src={item.image} alt={item.name} fill className="object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="truncate text-sm font-semibold text-slate-900">{item.name}</h2>
                <p className="mt-1 text-sm font-semibold text-slate-900">{currency(item.price)}</p>
                <div className="mt-2 flex items-center gap-2">
                  <label htmlFor={`qty-${item.id}`} className="text-xs text-slate-500">
                    Qty
                  </label>
                  <input
                    id={`qty-${item.id}`}
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                    className="h-8 w-14 rounded-md border border-slate-300 px-2 text-sm"
                  />
                </div>
              </div>
              <button
                className="text-xs font-semibold text-rose-500"
                onClick={() => removeFromCart(item.id)}
                aria-label={`Remove ${item.name} from cart`}
              >
                Remove
              </button>
            </div>
          ))}

        {step === "shipping" && (
          <div className="rounded-3xl border border-slate-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-slate-900">Shipping Details</h2>
            <div className="mt-4 grid gap-3">
              <input className="h-11 rounded-xl border border-slate-200 px-4 text-sm" placeholder="Full name" />
              <input className="h-11 rounded-xl border border-slate-200 px-4 text-sm" placeholder="Address" />
              <input className="h-11 rounded-xl border border-slate-200 px-4 text-sm" placeholder="City" />
            </div>
          </div>
        )}

        {step === "payment" && (
          <div className="rounded-3xl border border-slate-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-slate-900">Payment Method</h2>
            <div className="mt-4 grid gap-3">
              <input className="h-11 rounded-xl border border-slate-200 px-4 text-sm" placeholder="Card number" />
              <div className="grid grid-cols-2 gap-3">
                <input className="h-11 rounded-xl border border-slate-200 px-4 text-sm" placeholder="MM / YY" />
                <input className="h-11 rounded-xl border border-slate-200 px-4 text-sm" placeholder="CVC" />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="h-fit rounded-3xl border border-slate-200 bg-white p-5">
        <h3 className="text-lg font-semibold text-slate-900">Order Summary</h3>
        <div className="mt-4 space-y-2 text-sm text-slate-600">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span className="font-semibold text-slate-900">{currency(subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span className="font-semibold text-slate-900">{currency(shippingFee)}</span>
          </div>
          <div className="flex justify-between border-t border-slate-200 pt-2 text-base">
            <span>Total</span>
            <span className="font-bold text-slate-950">{currency(total)}</span>
          </div>
        </div>
        {step === "cart" && (
          <Button className="mt-5 w-full" onClick={() => setStep("shipping")}>
            Continue to Shipping
          </Button>
        )}
        {step === "shipping" && (
          <Button className="mt-5 w-full" onClick={() => setStep("payment")}>
            Continue to Payment
          </Button>
        )}
        {step === "payment" && (
          <Button className="mt-5 w-full" onClick={() => setStep("complete")}>
            Place Order
          </Button>
        )}
        {step !== "cart" && (
          <Button variant="secondary" className="mt-2 w-full" onClick={() => setStep("cart")}>
            Back to Cart
          </Button>
        )}
        <Button variant="ghost" className="mt-2 w-full" onClick={clearCart}>
          Clear Cart
        </Button>
      </div>
    </div>
  );
}
