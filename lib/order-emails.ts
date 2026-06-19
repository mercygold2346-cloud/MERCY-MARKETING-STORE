import { escapeHtml, sendStoreEmail } from "@/lib/mail";
import { formatNaira } from "@/lib/currency";
import { currency } from "@/lib/utils";

type OrderItem = { name: string; quantity: number; price: number };

type OrderDetails = {
  orderId: string;
  customerName: string;
  customerEmail: string;
  phone: string;
  address: string;
  city: string;
  items: OrderItem[];
  subtotal: number;
  shippingFee: number;
  total: number;
  paymentMethod: string;
  paid?: boolean;
};

function formatItemsText(items: OrderItem[]) {
  return items
    .map((item) => `  - ${item.name} x${item.quantity} — ${currency(item.price * item.quantity)}`)
    .join("\n");
}

function formatItemsHtml(items: OrderItem[]) {
  return items
    .map(
      (item) =>
        `<li>${escapeHtml(item.name)} × ${item.quantity} — ${escapeHtml(currency(item.price * item.quantity))}</li>`,
    )
    .join("");
}

export async function sendOrderNotificationToStore(order: OrderDetails) {
  const itemsText = formatItemsText(order.items);
  const itemsHtml = formatItemsHtml(order.items);

  return sendStoreEmail({
    subject: `[New Order] ${order.orderId} — ${order.customerName}`,
    replyTo: order.customerEmail,
    text: [
      "New order from Mercy Marketing Store",
      "",
      `Order ID: ${order.orderId}`,
      `Payment: ${order.paymentMethod}${order.paid ? " (PAID)" : ""}`,
      "",
      `Customer: ${order.customerName}`,
      `Email: ${order.customerEmail}`,
      `Phone: ${order.phone}`,
      `Address: ${order.address}, ${order.city}`,
      "",
      "Items:",
      itemsText,
      "",
      `Subtotal: ${currency(order.subtotal)}`,
      `Shipping: ${order.shippingFee === 0 ? "Free" : currency(order.shippingFee)}`,
      `Total: ${currency(order.total)} (~${formatNaira(order.total)})`,
    ].join("\n"),
    html: `
      <h2>New order — ${escapeHtml(order.orderId)}</h2>
      <p><strong>Payment:</strong> ${escapeHtml(order.paymentMethod)}${order.paid ? " (PAID)" : ""}</p>
      <p><strong>Customer:</strong> ${escapeHtml(order.customerName)}</p>
      <p><strong>Email:</strong> ${escapeHtml(order.customerEmail)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(order.phone)}</p>
      <p><strong>Address:</strong> ${escapeHtml(order.address)}, ${escapeHtml(order.city)}</p>
      <h3>Items</h3>
      <ul>${itemsHtml}</ul>
      <p><strong>Total:</strong> ${escapeHtml(currency(order.total))} (~${escapeHtml(formatNaira(order.total))})</p>
    `,
  });
}

export async function sendOrderConfirmationToCustomer(order: OrderDetails) {
  const itemsHtml = formatItemsHtml(order.items);
  const paidNote = order.paid
    ? "Your payment was received successfully."
    : "Our team will contact you shortly with payment and delivery details.";

  return sendStoreEmail({
    to: order.customerEmail,
    subject: `Order confirmed — ${order.orderId} | Mercy Marketing Store`,
    text: [
      `Hi ${order.customerName},`,
      "",
      "Thank you for your order at Mercy Marketing Store!",
      "",
      `Order reference: ${order.orderId}`,
      paidNote,
      "",
      "Your items:",
      formatItemsText(order.items),
      "",
      `Subtotal: ${currency(order.subtotal)}`,
      `Shipping: ${order.shippingFee === 0 ? "Free" : currency(order.shippingFee)}`,
      `Total: ${currency(order.total)} (~${formatNaira(order.total)})`,
      "",
      "Questions? Reply to this email or WhatsApp us at 09026466738.",
      "",
      "— Mercy Marketing Store",
    ].join("\n"),
    html: `
      <h2>Thank you, ${escapeHtml(order.customerName)}!</h2>
      <p>Your order <strong>${escapeHtml(order.orderId)}</strong> has been received.</p>
      <p>${escapeHtml(paidNote)}</p>
      <h3>Order summary</h3>
      <ul>${itemsHtml}</ul>
      <p><strong>Total:</strong> ${escapeHtml(currency(order.total))} (~${escapeHtml(formatNaira(order.total))})</p>
      <p style="margin-top:24px;color:#64748b;font-size:14px">
        Questions? Reply to this email or WhatsApp <strong>09026466738</strong>.
      </p>
      <p style="color:#64748b;font-size:14px">— Mercy Marketing Store</p>
    `,
  });
}

export async function sendContactAutoReply(options: {
  name: string;
  email: string;
  subject: string;
}) {
  return sendStoreEmail({
    to: options.email,
    subject: "We received your message — Mercy Marketing Store",
    text: [
      `Hi ${options.name},`,
      "",
      "Thank you for contacting Mercy Marketing Store.",
      "",
      `We received your message about "${options.subject}" and will reply within one business day.`,
      "",
      "For urgent orders, WhatsApp us at 09026466738.",
      "",
      "— Mercy Marketing Store",
    ].join("\n"),
    html: `
      <h2>We got your message, ${escapeHtml(options.name)}!</h2>
      <p>Thank you for contacting <strong>Mercy Marketing Store</strong>.</p>
      <p>We received your message about <em>${escapeHtml(options.subject)}</em> and will reply within one business day.</p>
      <p>For urgent orders, WhatsApp us at <strong>09026466738</strong>.</p>
      <p style="margin-top:24px;color:#64748b;font-size:14px">— Mercy Marketing Store</p>
    `,
  });
}
