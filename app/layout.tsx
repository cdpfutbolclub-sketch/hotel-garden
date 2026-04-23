import type { Metadata } from "next";
import { Playfair_Display_SC, Karla } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CookieBanner from "@/components/shared/CookieBanner";

const playfair = Playfair_Display_SC({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const karla = Karla({
  variable: "--font-karla",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Hotel Garden | Andorra la Vella",
    template: "%s | Hotel Garden",
  },
  description:
    "A 3-star hotel in Santa Coloma, Andorra la Vella. Breakfast included, free parking, mountain views. A Garden of Comfort, A World of Experience.",
  keywords: [
    "hotel andorra",
    "hotel santa coloma",
    "hotel garden andorra",
    "andorra la vella hotel",
    "mountain hotel andorra",
    "3 star hotel andorra",
  ],
  openGraph: {
    title: "Hotel Garden — Andorra la Vella",
    description: "A Garden of Comfort, A World of Experience. 3-star hotel in the heart of Santa Coloma, Andorra.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${karla.variable}`}
    >
      <body className="min-h-screen flex flex-col bg-hg-black text-hg-cream antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
