import {
  sendContactAutoReply,
  sendOrderConfirmationToCustomer,
  sendOrderNotificationToStore,
} from "@/lib/order-emails";
import { createOrderReference, initializePaystackTransaction, isPaystackConfigured } from "@/lib/paystack";
import { calculateShipping } from "@/lib/shipping";
import { EMAIL_NOT_CONFIGURED } from "@/lib/mail";
import { NextResponse } from "next/server";

type OrderItemPayload = { id: string; name: string; price: number; quantity: number };

type OrderPayload = {
  customer?: {
    name?: string;
    email?: string;
    phone?: string;
    address?: string;
    city?: string;
  };
  items?: OrderItemPayload[];
  paymentMethod?: "paystack" | "request" | "whatsapp";
};

function validateOrder(body: OrderPayload) {
  const name = body.customer?.name?.trim() ?? "";
  const email = body.customer?.email?.trim() ?? "";
  const phone = body.customer?.phone?.trim() ?? "";
  const address = body.customer?.address?.trim() ?? "";
  const city = body.customer?.city?.trim() ?? "";
  const items = body.items ?? [];
  const paymentMethod = body.paymentMethod ?? "request";

  if (name.length < 2) return { error: "Please enter your full name." };
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { error: "Please enter a valid email." };
  if (phone.length < 7) return { error: "Please enter a valid phone number." };
  if (address.length < 5) return { error: "Please enter your delivery address." };
  if (city.length < 2) return { error: "Please enter your city." };
  if (items.length === 0) return { error: "Your cart is empty." };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingFee = calculateShipping(subtotal, items.length);
  const total = subtotal + shippingFee;
  const orderId = createOrderReference();

  return {
    name,
    email,
    phone,
    address,
    city,
    items,
    paymentMethod,
    subtotal,
    shippingFee,
    total,
    orderId,
  };
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as OrderPayload;
    const validated = validateOrder(body);

    if ("error" in validated) {
      return NextResponse.json({ error: validated.error }, { status: 400 });
    }

    const order = {
      orderId: validated.orderId,
      customerName: validated.name,
      customerEmail: validated.email,
      phone: validated.phone,
      address: validated.address,
      city: validated.city,
      items: validated.items.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      subtotal: validated.subtotal,
      shippingFee: validated.shippingFee,
      total: validated.total,
      paymentMethod:
        validated.paymentMethod === "paystack"
          ? "Paystack"
          : validated.paymentMethod === "whatsapp"
            ? "WhatsApp"
            : "Order request",
    };

    if (validated.paymentMethod === "paystack") {
      if (!isPaystackConfigured()) {
        return NextResponse.json(
          { error: "Paystack is not configured. Add PAYSTACK_SECRET_KEY and NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY to .env.local." },
          { status: 503 },
        );
      }

      const origin = new URL(request.url).origin;
      const paystack = await initializePaystackTransaction({
        email: validated.email,
        amountUsd: validated.total,
        reference: validated.orderId,
        callbackUrl: `${origin}/checkout/complete?reference=${validated.orderId}`,
        metadata: {
          customer_name: validated.name,
          customer_phone: validated.phone,
          customer_address: validated.address,
          customer_city: validated.city,
          order_items: JSON.stringify(
            validated.items.map((item) => ({
              name: item.name,
              quantity: item.quantity,
              price: item.price,
            })),
          ),
          subtotal: String(validated.subtotal),
          shipping_fee: String(validated.shippingFee),
          total_usd: String(validated.total),
        },
      });

      if (!paystack.ok) {
        return NextResponse.json({ error: paystack.error }, { status: 500 });
      }

      return NextResponse.json({
        ok: true,
        orderId: validated.orderId,
        authorizationUrl: paystack.authorizationUrl,
      });
    }

    const storeEmail = await sendOrderNotificationToStore(order);
    if (!storeEmail.ok) {
      return NextResponse.json({ error: EMAIL_NOT_CONFIGURED }, { status: 503 });
    }

    await sendOrderConfirmationToCustomer(order);

    return NextResponse.json({ ok: true, orderId: validated.orderId });
  } catch (error) {
    console.error("Order error:", error);
    return NextResponse.json({ error: "Could not process your order. Please try again." }, { status: 500 });
  }
}
