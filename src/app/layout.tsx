import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "../context/CartContext";

export const metadata: Metadata = {
  title: "AYAN UNIVERSE | Next-Gen Premium Pod Vapes & E-Juices",
  description:
    "Discover Ayan Universe - the pinnacle of next-generation pod vapes and premium e-juices. Sleek design, rich flavors, and direct orders. Verified 18+ store.",
  keywords: "vape, pod vape, premium vape, e-cigarette, next-gen vapes, ayan universe, e-juice, flavors",
  openGraph: {
    title: "AYAN UNIVERSE | Next-Gen Premium Pod Vapes",
    description: "Discover the pinnacle of next-generation pod vapes and e-juices with Ayan Universe.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
