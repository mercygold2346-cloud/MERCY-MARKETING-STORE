export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "2349026466738";

export function buildWhatsAppUrl(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

type OrderLine = { name: string; quantity: number; price: number };

export function buildOrderWhatsAppMessage(options: {
  orderId: string;
  customerName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  items: OrderLine[];
  subtotal: number;
  shippingFee: number;
  total: number;
  formatPrice: (value: number) => string;
}) {
  const lines = options.items.map(
    (item) => `• ${item.name} x${item.quantity} — ${options.formatPrice(item.price * item.quantity)}`,
  );

  return [
    `Hello Mercy Marketing Store! I'd like to place an order.`,
    ``,
    `Order ref: ${options.orderId}`,
    `Name: ${options.customerName}`,
    `Phone: ${options.phone}`,
    `Email: ${options.email}`,
    `Address: ${options.address}, ${options.city}`,
    ``,
    `Items:`,
    ...lines,
    ``,
    `Subtotal: ${options.formatPrice(options.subtotal)}`,
    `Shipping: ${options.shippingFee === 0 ? "Free" : options.formatPrice(options.shippingFee)}`,
    `Total: ${options.formatPrice(options.total)}`,
    ``,
    `Please confirm availability and payment details. Thank you!`,
  ].join("\n");
}
