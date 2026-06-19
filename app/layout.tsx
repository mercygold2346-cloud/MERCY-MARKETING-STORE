import type { Metadata } from "next";
import { FloatingWhatsApp } from "@/components/floating-whatsapp";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeScript } from "@/components/theme-script";
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
  description: "Modern premium global marketplace for fashion, electronics, home, beauty, and more.",
  openGraph: {
    title: "MERCY MARKETING STORE",
    description: "Everything you need. Delivered fast.",
    url: "https://mercymarketingstore.com",
    siteName: "MERCY MARKETING STORE",
    locale: "en_US",
    type: "website",
    images: [{ url: "/images/hero/slide-2.jpg", width: 1200, height: 630, alt: "Mercy Marketing Store" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "MERCY MARKETING STORE",
    description: "Everything you need. Delivered fast.",
    images: ["/images/hero/slide-2.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`} data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className="min-h-full">
        <ThemeScript />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-slate-950 focus:px-4 focus:py-2 focus:text-sm focus:text-white dark:focus:bg-white dark:focus:text-slate-950"
        >
          Skip to main content
        </a>
        <ThemeProvider>
          <CartProvider>
            <Navbar />
            <main id="main-content" className="w-full overflow-x-clip">{children}</main>
            <Footer />
            <FloatingWhatsApp />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
