import {
  sendOrderConfirmationToCustomer,
  sendOrderNotificationToStore,
} from "@/lib/order-emails";
import { verifyPaystackTransaction } from "@/lib/paystack";
import { EMAIL_NOT_CONFIGURED } from "@/lib/mail";
import { NextResponse } from "next/server";

type StoredItem = { name: string; quantity: number; price: number };

function parseOrderItems(raw: string | undefined): StoredItem[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as StoredItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function GET(request: Request) {
  try {
    const reference = new URL(request.url).searchParams.get("reference");
    if (!reference) {
      return NextResponse.json({ error: "Missing payment reference." }, { status: 400 });
    }

    const verified = await verifyPaystackTransaction(reference);
    if (!verified.ok) {
      return NextResponse.json({ error: verified.error }, { status: 400 });
    }

    const meta = verified.data.metadata ?? {};
    const items = parseOrderItems(meta.order_items);
    const subtotal = Number(meta.subtotal ?? 0);
    const shippingFee = Number(meta.shipping_fee ?? 0);
    const total = Number(meta.total_usd ?? 0);

    const order = {
      orderId: reference,
      customerName: meta.customer_name ?? "Customer",
      customerEmail: verified.data.customer.email,
      phone: meta.customer_phone ?? "",
      address: meta.customer_address ?? "",
      city: meta.customer_city ?? "",
      items: items.length > 0 ? items : [{ name: "Order items", quantity: 1, price: total }],
      subtotal: subtotal || total,
      shippingFee,
      total: total || subtotal + shippingFee,
      paymentMethod: "Paystack",
      paid: true,
    };

    const storeEmail = await sendOrderNotificationToStore(order);
    if (!storeEmail.ok) {
      return NextResponse.json({ error: EMAIL_NOT_CONFIGURED }, { status: 503 });
    }

    await sendOrderConfirmationToCustomer(order);

    return NextResponse.json({ ok: true, orderId: reference, email: order.customerEmail });
  } catch (error) {
    console.error("Paystack verify error:", error);
    return NextResponse.json({ error: "Payment verification failed." }, { status: 500 });
  }
}
