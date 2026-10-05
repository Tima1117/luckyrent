import type { Metadata } from "next";
import { Inter_Tight, Manrope, Noto_Sans_Georgian } from "next/font/google";
import "./globals.css";

const display = Inter_Tight({ subsets: ["latin", "cyrillic"], weight: ["600", "700", "800"], variable: "--font-display", display: "swap" });
const body = Manrope({ subsets: ["latin", "cyrillic"], weight: ["400", "500", "600", "700", "800"], variable: "--font-body", display: "swap" });
const georgian = Noto_Sans_Georgian({ subsets: ["georgian"], weight: ["400", "600", "800"], variable: "--font-georgian", display: "swap" });

export const metadata: Metadata = {
  title: "LUCKY RENT — Car rental in Batumi, no deposit",
  description: "Car rental in Batumi with no deposit and full CASCO insurance. BMW, Mercedes, Subaru, Jeep — delivered to your hotel or the airport, 24/7. Rated 5.0 on Google.",
  openGraph: {
    title: "LUCKY RENT — Car rental in Batumi, no deposit",
    description: "No deposit, full CASCO, delivery to your hotel or the airport. Rated 5.0 by 70 guests on Google.",
    url: "https://luckyrent.vercel.app",
    siteName: "LUCKY RENT",
    locale: "en_US",
    type: "website",
  },
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable} ${georgian.variable}`}>{children}</body>
    </html>
  );
}
