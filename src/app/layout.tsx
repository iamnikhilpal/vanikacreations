import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vanika Creations | Diwali Gift Hampers – Warm, Elegant & Festive Gifting",
  description: "Explore premium Diwali gift hampers by Vanika Creations. Sweets, dry fruits, chocolates & traditional decor—perfect for family & corporate gifting. Order now!",
  keywords: [
    "Diwali gift hampers",
    "hampers India",
    "festive gift boxes",
    "Diwali gifts online",
    "dry fruit hampers",
    "Diwali hamper for family",
    "premium gift hampers",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
