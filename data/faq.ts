export type FaqItem = {
  id: string;
  question: string;
  answer: string;
  category: "orders" | "shipping" | "payments" | "returns" | "general";
};

export const faqCategories = [
  { id: "orders", label: "Orders" },
  { id: "payments", label: "Payments" },
  { id: "shipping", label: "Shipping" },
  { id: "returns", label: "Returns" },
  { id: "general", label: "General" },
] as const;

export const faqs: FaqItem[] = [
  {
    id: "1",
    category: "orders",
    question: "Do I need an account to place an order?",
    answer:
      "No. Mercy Marketing Store is built for quick guest checkout. Add items to your cart, enter your details, and pay with Paystack or order via WhatsApp — no login required.",
  },
  {
    id: "2",
    category: "orders",
    question: "How do I place an order on WhatsApp?",
    answer:
      "Add products to your cart, go to checkout, fill in your shipping details, then tap \"Order on WhatsApp\". Your cart summary opens in WhatsApp — send the message and our team will confirm availability and payment.",
  },
  {
    id: "3",
    category: "payments",
    question: "What payment methods do you accept?",
    answer:
      "We accept Paystack payments (debit/credit cards, bank transfer, USSD, and more). You can also submit an order request by email or complete your order on WhatsApp for manual payment instructions.",
  },
  {
    id: "4",
    category: "payments",
    question: "Is Paystack payment secure?",
    answer:
      "Yes. Paystack is a trusted Nigerian payment processor. Card details are handled on Paystack's secure page — we never store your card information on our website.",
  },
  {
    id: "5",
    category: "payments",
    question: "Will I receive an order confirmation email?",
    answer:
      "Yes. After you submit an order or complete a Paystack payment, you'll receive an automatic confirmation email with your order reference and summary. Our team also gets notified instantly.",
  },
  {
    id: "6",
    category: "shipping",
    question: "How long does delivery take?",
    answer:
      "Most orders within Lagos are delivered in 1–3 business days. Other Nigerian cities typically take 3–7 business days depending on your location and product availability.",
  },
  {
    id: "7",
    category: "shipping",
    question: "Do you offer free shipping?",
    answer:
      "Yes — orders over $75 qualify for free shipping. Smaller orders include a standard shipping fee shown at checkout before you pay.",
  },
  {
    id: "8",
    category: "returns",
    question: "What is your return policy?",
    answer:
      "If an item arrives damaged or not as described, contact us within 7 days at mercyonic@gmail.com or WhatsApp 09026466738. We'll arrange a replacement or refund after review.",
  },
  {
    id: "9",
    category: "returns",
    question: "Can I cancel my order?",
    answer:
      "You can cancel before dispatch by messaging us with your order reference. Once shipped, our standard return policy applies.",
  },
  {
    id: "10",
    category: "general",
    question: "How can I contact support?",
    answer:
      "Email mercyonic@gmail.com, call/WhatsApp 09026466738 (Mon–Sat, 9am–6pm WAT), or use the contact form on our website. We aim to reply within one business day.",
  },
];
