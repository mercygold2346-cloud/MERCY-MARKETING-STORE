import { ShopClient } from "@/components/shop-client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop | MERCY MARKETING STORE",
  description: "Browse premium products with refined filters and trusted checkout.",
};

export default function ShopPage() {
  return <ShopClient />;
}
