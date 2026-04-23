import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Book Your Stay",
  description:
    "Book a room at Hotel Garden in Santa Coloma, Andorra la Vella. Standard, Superior, and Family rooms from €50/night. Breakfast included, free parking, free WiFi.",
  openGraph: {
    title: "Book Your Stay — Hotel Garden Andorra",
    description:
      "Reserve your room online. Standard from €50, Superior from €75, Family from €95. All rooms include breakfast, free WiFi, and free parking.",
    type: "website",
  },
};

export default function BookingLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
