import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Hotel Garden in Santa Coloma, Andorra la Vella. Call +376 615 817 or send us a message. We reply within 24 hours.",
  openGraph: {
    title: "Contact Hotel Garden — Andorra la Vella",
    description:
      "Reach our team at +376 615 817 or via our contact form. Located at Avinguda d'Enclar 91–93, Santa Coloma, Andorra la Vella AD500.",
    type: "website",
  },
};

export default function ContactLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
