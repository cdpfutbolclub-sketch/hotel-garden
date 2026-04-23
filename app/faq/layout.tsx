import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about Hotel Garden in Andorra. Check-in times, parking, breakfast, pet policy, cancellation, and more — all answered here.",
  openGraph: {
    title: "FAQ — Hotel Garden Andorra",
    description:
      "Everything you need to know before your stay. Check-in, parking, breakfast, WiFi, cancellations, and more.",
    type: "website",
  },
};

export default function FAQLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
