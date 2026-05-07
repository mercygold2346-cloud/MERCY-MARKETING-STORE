import type { Metadata } from "next";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { CartProvider } from "@/context/cart-context";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mercymarketingstore.com"),
  title: {
    default: "MERCY MARKETING STORE",
    template: "%s | MERCY MARKETING STORE",
  },
  description: "Modern premium global marketplace experience.",
  openGraph: {
    title: "MERCY MARKETING STORE",
    description: "Everything you need. Delivered fast.",
    url: "https://mercymarketingstore.com",
    siteName: "MERCY MARKETING STORE",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MERCY MARKETING STORE",
    description: "Everything you need. Delivered fast.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full">
        <CartProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
