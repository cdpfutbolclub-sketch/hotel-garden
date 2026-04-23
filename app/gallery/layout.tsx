import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Photos of Hotel Garden in Santa Coloma, Andorra la Vella. Rooms, common areas, mountain views, and the surrounding Pyrenees landscape.",
  openGraph: {
    title: "Gallery — Hotel Garden Andorra",
    description:
      "See our rooms, restaurant, fitness center, and the breathtaking Pyrenean views surrounding Hotel Garden in Andorra la Vella.",
    type: "website",
  },
};

export default function GalleryLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
