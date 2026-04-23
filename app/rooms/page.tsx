import type { Metadata } from "next";
import Link from "next/link";
import { Check, Phone } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import { GlowCard } from "@/components/shared/GlowCard";

export const metadata: Metadata = {
  title: "Rooms & Suites",
  description:
    "Choose from Standard, Superior, and Family rooms at Hotel Garden. All rooms include breakfast, free WiFi, and mountain views from €50/night.",
};

// Glow hue per room category (0–360)
const ROOM_HUE: Record<string, number> = {
  standard: 210,  // sapphire blue — clean, comfortable
  superior:  42,  // gold         — premium, most popular
  family:   155,  // emerald      — warm, welcoming
};

const rooms = [
  {
    id: "standard",
    category: "Standard",
    title: "Standard Room",
    price: 50,
    description: "Everything you need for a comfortable stay in Andorra — balcony, private bathroom, and breakfast every morning.",
    amenities: [
      "Private balcony",
      "Complimentary buffet breakfast",
      "Free high-speed WiFi",
      "Flat-screen TV",
      "Private en-suite bathroom",
      "Bidet & roll-in shower",
      "Hairdryer & bath sheets",
      "Writing desk",
      "Free outdoor parking",
    ],
    badge: null,
    popular: false,
  },
  {
    id: "superior",
    category: "Superior",
    title: "Superior Room",
    price: 75,
    description: "Elevated comfort with panoramic mountain views, premium furnishings, and upgraded bathroom amenities.",
    amenities: [
      "Panoramic mountain view",
      "Complimentary buffet breakfast",
      "Free high-speed WiFi",
      "Flat-screen TV",
      "Safety deposit box",
      "Premium bathroom with shower",
      "Premium linens & towels",
      "Writing desk",
      "Free outdoor parking",
    ],
    badge: "Most Popular",
    popular: true,
  },
  {
    id: "family",
    category: "Family",
    title: "Family Room",
    price: 95,
    description: "Spacious, welcoming rooms designed for the whole family — multiple beds, extra storage, breakfast included.",
    amenities: [
      "Multiple beds (family config)",
      "Complimentary buffet breakfast",
      "Free high-speed WiFi",
      "Flat-screen TV",
      "Private balcony",
      "En-suite bathroom",
      "Extra storage space",
      "Family-friendly layout",
      "Free outdoor parking",
    ],
    badge: "Ideal for Families",
    popular: false,
  },
];

export default function RoomsPage() {
  return (
    <div className="min-h-screen bg-hg-black">
      {/* Page header */}
      <div className="pt-32 pb-16 px-4 bg-hg-surface border-b border-hg-border">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            eyebrow="Accommodation"
            title="Rooms & Suites"
            subtitle="17 rooms across three categories. Every room includes breakfast, free WiFi, and free parking. Starting from €50 per night."
          />
        </div>
      </div>

      {/* Pricing cards */}
      <div
        className="py-24 px-4"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, rgba(201,168,76,0.05) 0%, transparent 65%)",
        }}
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 justify-center items-stretch">
          {rooms.map((room) => (
            <GlowCard
              key={room.id}
              featured={room.popular}
              glowHue={ROOM_HUE[room.id]}
              wrapperClassName={[
                "flex-1 max-w-sm transition-all duration-300",
                room.popular ? "scale-105" : "",
              ].join(" ")}
              className="relative flex flex-col px-7 py-8"
            >
              {/* Most Popular badge */}
              {room.badge && (
                <div
                  className={[
                    "absolute -top-4 right-5 px-3 py-1 text-[11px] font-bold rounded-full tracking-wider uppercase",
                    room.popular
                      ? "bg-hg-gold text-hg-black"
                      : "bg-white/10 text-hg-cream border border-white/20",
                  ].join(" ")}
                >
                  {room.badge}
                </div>
              )}

              {/* Room type eyebrow */}
              <p className="text-hg-gold text-[10px] tracking-[0.35em] uppercase font-medium mb-2">
                {room.category}
              </p>

              {/* Room name */}
              <h2 className="font-heading text-hg-cream text-4xl font-extralight tracking-tight leading-none mb-3">
                {room.title}
              </h2>

              <p className="text-hg-muted text-sm leading-relaxed mb-6">
                {room.description}
              </p>

              {/* Price */}
              <div className="flex items-baseline gap-2 mb-6">
                <span className="font-heading text-hg-gold text-5xl font-extralight">
                  €{room.price}
                </span>
                <span className="text-hg-muted text-sm">/ night</span>
              </div>

              {/* Divider */}
              <div
                className="w-full h-px mb-6"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.12) 50%, transparent)",
                }}
              />

              {/* Amenities */}
              <ul className="flex flex-col gap-2.5 mb-8 flex-1">
                {room.amenities.map((a) => (
                  <li key={a} className="flex items-center gap-2.5 text-hg-cream/80 text-sm">
                    <Check size={13} className="text-hg-gold shrink-0" />
                    {a}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                href={`/booking?roomType=${room.category}`}
                className={[
                  "w-full py-3 rounded-xl font-bold text-sm tracking-wider uppercase text-center transition-colors duration-200",
                  room.popular
                    ? "bg-hg-gold hover:bg-hg-gold-light text-hg-black"
                    : "bg-white/10 hover:bg-white/20 text-hg-cream border border-white/15",
                ].join(" ")}
              >
                Book Now
              </Link>
            </GlowCard>
          ))}
        </div>

        {/* Breakfast note */}
        <p className="text-center text-hg-muted text-xs mt-10 tracking-wide">
          All rates include buffet breakfast · Free outdoor parking · Free WiFi
        </p>
      </div>

      {/* Questions CTA */}
      <div className="py-16 px-4 bg-hg-surface border-t border-hg-border">
        <div className="max-w-xl mx-auto text-center">
          <h3 className="font-heading text-hg-cream text-2xl mb-3">Need Help Choosing?</h3>
          <p className="text-hg-muted text-sm mb-6">
            Call us and we&apos;ll help you find the perfect room for your stay.
          </p>
          <a
            href="tel:+376615817"
            className="inline-flex items-center gap-2 border border-hg-gold text-hg-gold hover:bg-hg-gold hover:text-hg-black px-7 py-3 text-sm tracking-wider uppercase transition-all duration-200 rounded-full"
          >
            <Phone size={14} />
            +376 615 817
          </a>
        </div>
      </div>
    </div>
  );
}
