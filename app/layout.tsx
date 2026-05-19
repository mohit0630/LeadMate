import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LeadMate — Never miss a customer again",
  description: "AI-powered WhatsApp agent for Indian small businesses. Handles bookings, FAQs, and customer queries 24/7 in your brand's voice.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
