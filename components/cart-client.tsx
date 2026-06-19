"use client";

import { Button } from "@/components/ui/button";
import { WhatsAppOrderButton } from "@/components/whatsapp-order-button";
import { useCart } from "@/context/cart-context";
import { formatNaira } from "@/lib/currency";
import { FREE_SHIPPING_THRESHOLD, calculateShipping } from "@/lib/shipping";
import { buildOrderWhatsAppMessage, buildWhatsAppUrl } from "@/lib/whatsapp";
import { currency } from "@/lib/utils";
import { CheckCircle2, CreditCard, Loader2, MessageCircle, Send } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

type CheckoutStep = "cart" | "shipping" | "payment" | "complete";

type ShippingDetails = {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
};

const emptyShipping: ShippingDetails = {
  name: "",
  email: "",
  phone: "",
  address: "",
  city: "",
};

const inputClass =
  "h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-slate-900/10 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100";

export function CartClient() {
  const { cartItems, removeFromCart, updateQuantity, subtotal, clearCart, hydrated } = useCart();
  const [step, setStep] = useState<CheckoutStep>("cart");
  const [shipping, setShipping] = useState<ShippingDetails>(emptyShipping);
  const [orderId, setOrderId] = useState("");
  const [loading, setLoading] = useState<"paystack" | "request" | "whatsapp" | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const shippingFee = useMemo(() => calculateShipping(subtotal, cartItems.length), [subtotal, cartItems.length]);
  const total = subtotal + shippingFee;
  const paystackEnabled = Boolean(process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY);

  const orderItems = cartItems.map((item) => ({
    id: item.id,
    name: item.name,
    price: item.price,
    quantity: item.quantity,
  }));

  function updateShipping(field: keyof ShippingDetails, value: string) {
    setShipping((prev) => ({ ...prev, [field]: value }));
  }

  function validateShipping() {
    if (shipping.name.trim().length < 2) return "Please enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(shipping.email.trim())) return "Please enter a valid email.";
    if (shipping.phone.trim().length < 7) return "Please enter a valid phone number.";
    if (shipping.address.trim().length < 5) return "Please enter your delivery address.";
    if (shipping.city.trim().length < 2) return "Please enter your city.";
    return null;
  }

  async function submitOrder(paymentMethod: "paystack" | "request" | "whatsapp") {
    const validationError = validateShipping();
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    setLoading(paymentMethod);
    setErrorMessage("");

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: shipping,
          items: orderItems,
          paymentMethod,
        }),
      });

      const data = (await response.json()) as {
        error?: string;
        orderId?: string;
        authorizationUrl?: string;
      };

      if (!response.ok) {
        throw new Error(data.error ?? "Could not process your order.");
      }

      const ref = data.orderId ?? `MMS-${Date.now().toString().slice(-6)}`;
      setOrderId(ref);

      if (paymentMethod === "paystack" && data.authorizationUrl) {
        window.location.href = data.authorizationUrl;
        return;
      }

      if (paymentMethod === "whatsapp") {
        const url = buildWhatsAppUrl(
          buildOrderWhatsAppMessage({
            orderId: ref,
            customerName: shipping.name.trim(),
            phone: shipping.phone.trim(),
            email: shipping.email.trim(),
            address: shipping.address.trim(),
            city: shipping.city.trim(),
            items: orderItems,
            subtotal,
            shippingFee,
            total,
            formatPrice: currency,
          }),
        );
        window.open(url, "_blank", "noopener,noreferrer");
      }

      setStep("complete");
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Could not process your order.");
    } finally {
      setLoading(null);
    }
  }

  if (!hydrated) {
    return (
      <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-10 text-center text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400">
        Loading cart...
      </div>
    );
  }

  if (cartItems.length === 0 && step !== "complete") {
    return (
      <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-10 text-center dark:border-slate-700 dark:bg-slate-900">
        <p className="text-slate-600 dark:text-slate-400">Your cart is empty.</p>
        <Link href="/shop" className="mt-5 inline-block">
          <Button>Start Shopping</Button>
        </Link>
      </div>
    );
  }

  if (step === "complete") {
    return (
      <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-10 text-center dark:border-slate-700 dark:bg-slate-900">
        <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-600" />
        <h2 className="mt-4 text-2xl font-bold text-slate-950 dark:text-white">Order Request Received</h2>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Thank you! Your order reference is <strong>{orderId}</strong>. A confirmation email was sent to{" "}
          <strong>{shipping.email}</strong>.
        </p>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-500">
          Our team will follow up with payment and delivery details if needed.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
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
            <div
              key={item.id}
              className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900"
            >
              <div className="relative h-20 w-20 overflow-hidden rounded-xl">
                <Image src={item.image} alt={item.name} fill className="object-cover" sizes="80px" />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="truncate text-sm font-semibold text-slate-900 dark:text-white">{item.name}</h2>
                <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-white">{currency(item.price)}</p>
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
                    className="h-8 w-14 rounded-md border border-slate-300 px-2 text-sm dark:border-slate-600 dark:bg-slate-800"
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
          <div className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Shipping Details</h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">No account needed — guest checkout only.</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <input
                className={inputClass}
                placeholder="Full name"
                value={shipping.name}
                onChange={(e) => updateShipping("name", e.target.value)}
                required
              />
              <input
                className={inputClass}
                placeholder="Email address"
                type="email"
                value={shipping.email}
                onChange={(e) => updateShipping("email", e.target.value)}
                required
              />
              <input
                className={inputClass}
                placeholder="Phone number (e.g. 09026466738)"
                value={shipping.phone}
                onChange={(e) => updateShipping("phone", e.target.value)}
                required
              />
              <input
                className={inputClass}
                placeholder="City"
                value={shipping.city}
                onChange={(e) => updateShipping("city", e.target.value)}
                required
              />
              <input
                className={`${inputClass} sm:col-span-2`}
                placeholder="Delivery address"
                value={shipping.address}
                onChange={(e) => updateShipping("address", e.target.value)}
                required
              />
            </div>
          </div>
        )}

        {step === "payment" && (
          <div className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Choose how to pay</h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              Pay instantly with Paystack ({formatNaira(total)}), submit an order request by email, or complete on
              WhatsApp.
            </p>
            {errorMessage && (
              <p className="mt-3 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:border-rose-900 dark:bg-rose-950/30 dark:text-rose-300">
                {errorMessage}
              </p>
            )}
            <div className="mt-5 space-y-3">
              {paystackEnabled && (
                <Button
                  className="h-12 w-full gap-2"
                  disabled={loading !== null}
                  onClick={() => submitOrder("paystack")}
                >
                  {loading === "paystack" ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <CreditCard className="h-4 w-4" />
                  )}
                  Pay with Paystack — {formatNaira(total)}
                </Button>
              )}
              <Button
                className="h-12 w-full gap-2 bg-[#25D366] text-white hover:bg-[#1ebe57]"
                disabled={loading !== null}
                onClick={() => submitOrder("whatsapp")}
              >
                {loading === "whatsapp" ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <MessageCircle className="h-4 w-4" />
                )}
                Order on WhatsApp
              </Button>
              <Button
                variant="secondary"
                className="h-12 w-full gap-2"
                disabled={loading !== null}
                onClick={() => submitOrder("request")}
              >
                {loading === "request" ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
                Submit order request (email confirmation)
              </Button>
              {!paystackEnabled && (
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Paystack not configured yet. Add keys to .env.local to enable card payments.
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="h-fit rounded-3xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Order Summary</h3>
        <div className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-400">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span className="font-semibold text-slate-900 dark:text-white">{currency(subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span className="font-semibold text-slate-900 dark:text-white">
              {shippingFee === 0 ? "Free" : currency(shippingFee)}
            </span>
          </div>
          {shippingFee > 0 && (
            <p className="text-xs text-emerald-700 dark:text-emerald-400">
              Add {currency(FREE_SHIPPING_THRESHOLD - subtotal)} more for free shipping
            </p>
          )}
          <div className="flex justify-between border-t border-slate-200 pt-2 text-base dark:border-slate-700">
            <span>Total</span>
            <div className="text-right">
              <span className="font-bold text-slate-950 dark:text-white">{currency(total)}</span>
              <p className="text-xs text-slate-500">≈ {formatNaira(total)}</p>
            </div>
          </div>
        </div>

        {step === "cart" && (
          <>
            <Button className="mt-5 w-full" onClick={() => setStep("shipping")}>
              Continue to Shipping
            </Button>
            {shipping.name && shipping.phone && (
              <div className="mt-3">
                <WhatsAppOrderButton
                  orderId={`MMS-QUICK-${Date.now().toString().slice(-4)}`}
                  customerName={shipping.name || "Customer"}
                  phone={shipping.phone}
                  email={shipping.email || "not provided"}
                  address={shipping.address || "To be confirmed"}
                  city={shipping.city || "Nigeria"}
                  items={orderItems}
                  subtotal={subtotal}
                  shippingFee={shippingFee}
                  total={total}
                  label="Quick order on WhatsApp"
                />
              </div>
            )}
          </>
        )}

        {step === "shipping" && (
          <Button
            className="mt-5 w-full"
            onClick={() => {
              const err = validateShipping();
              if (err) {
                setErrorMessage(err);
                return;
              }
              setErrorMessage("");
              setStep("payment");
            }}
          >
            Continue to Payment
          </Button>
        )}

        {step !== "cart" && (
          <Button
            variant="secondary"
            className="mt-2 w-full"
            onClick={() => setStep(step === "payment" ? "shipping" : "cart")}
          >
            Back
          </Button>
        )}

        <Button variant="ghost" className="mt-2 w-full" onClick={clearCart}>
          Clear Cart
        </Button>

        <a
          href={buildWhatsAppUrl("Hi! I need help with my order at Mercy Marketing Store.")}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 flex items-center justify-center gap-2 text-xs font-medium text-[#128C7E] hover:underline"
        >
          <MessageCircle className="h-3.5 w-3.5" />
          Need help? Chat on WhatsApp
        </a>
      </div>
    </div>
  );
}
