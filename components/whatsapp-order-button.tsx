"use client";

import { buildOrderWhatsAppMessage, buildWhatsAppUrl } from "@/lib/whatsapp";
import { currency } from "@/lib/utils";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type WhatsAppOrderButtonProps = {
  orderId: string;
  customerName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  items: { name: string; quantity: number; price: number }[];
  subtotal: number;
  shippingFee: number;
  total: number;
  className?: string;
  variant?: "primary" | "secondary";
  label?: string;
};

export function WhatsAppOrderButton({
  orderId,
  customerName,
  phone,
  email,
  address,
  city,
  items,
  subtotal,
  shippingFee,
  total,
  className,
  variant = "secondary",
  label = "Order on WhatsApp",
}: WhatsAppOrderButtonProps) {
  const url = buildWhatsAppUrl(
    buildOrderWhatsAppMessage({
      orderId,
      customerName,
      phone,
      email,
      address,
      city,
      items,
      subtotal,
      shippingFee,
      total,
      formatPrice: currency,
    }),
  );

  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className={cn("block", className)}>
      <Button type="button" variant={variant} className="w-full gap-2 bg-[#25D366] text-white hover:bg-[#1ebe57]">
        <MessageCircle className="h-4 w-4" />
        {label}
      </Button>
    </a>
  );
}
