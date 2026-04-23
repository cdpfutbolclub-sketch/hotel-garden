import type { Metadata } from "next";
import type { ReactNode } from "react";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://hotelgarden.ad";

export const metadata: Metadata = {
  title: "Draft Week 2026 — Train with CDP Fútbol Club in Andorra",
  description:
    "6-day elite football trial in Andorra with CDP Fútbol Club. Train with professionals, play in a match, and get seen. 6 sessions from June–August 2026. €500 all-inclusive.",
  openGraph: {
    title: "Draft Week 2026 — Train in Andorra. Be Seen.",
    description:
      "Join CDP Fútbol Club for an elite 6-day football trial in Andorra. Train, compete, and open doors. From €500, all-inclusive. Limited to 12 players per session.",
    type: "website",
  },
};

// SportsEvent JSON-LD structured data — one entry per session
// Google can surface these as rich results for event searches
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Draft Week 2026 — CDP Fútbol Club Football Trial Sessions",
  itemListElement: [
    { session: "Session 1", start: "2026-06-01", end: "2026-06-06" },
    { session: "Session 2", start: "2026-06-22", end: "2026-06-27" },
    { session: "Session 3", start: "2026-07-06", end: "2026-07-11" },
    { session: "Session 4", start: "2026-07-13", end: "2026-07-18" },
    { session: "Session 5", start: "2026-07-20", end: "2026-07-25" },
    { session: "Session 6", start: "2026-07-27", end: "2026-08-01" },
  ].map((s, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "SportsEvent",
      name: `Draft Week 2026 — ${s.session}`,
      description:
        "Elite 6-day football trial with CDP Fútbol Club in Andorra la Vella. Training, friendly match, accommodation, and full board included.",
      startDate: s.start,
      endDate: s.end,
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      location: {
        "@type": "Place",
        name: "Hotel Garden",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Avinguda d'Enclar 91–93",
          addressLocality: "Santa Coloma",
          addressRegion: "Andorra la Vella",
          postalCode: "AD500",
          addressCountry: "AD",
        },
      },
      organizer: {
        "@type": "Organization",
        name: "CDP Fútbol Club × Hotel Garden",
        url: `${BASE_URL}/draft-week`,
      },
      offers: {
        "@type": "Offer",
        price: "500",
        priceCurrency: "EUR",
        url: `${BASE_URL}/draft-week`,
        availability: "https://schema.org/LimitedAvailability",
        validFrom: "2026-01-01",
      },
      sport: "Football",
      maximumAttendeeCapacity: 12,
    },
  })),
};

export default function DraftWeekLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
