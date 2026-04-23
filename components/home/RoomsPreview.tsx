"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";

const CheckIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16" height="16" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="3"
    strokeLinecap="round" strokeLinejoin="round"
    className={className}
  >
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

const rooms = [
  {
    id: "standard",
    planName: "Standard",
    description: "All the essentials for a comfortable stay — balcony, breakfast, and everything you need.",
    price: "50",
    features: ["Private balcony", "Complimentary breakfast", "Free high-speed WiFi", "Flat-screen TV", "Private bathroom"],
    buttonText: "Book Now",
    isPopular: false,
    buttonVariant: "secondary" as const,
  },
  {
    id: "superior",
    planName: "Superior",
    description: "Elevated comfort with panoramic mountain views and premium furnishings.",
    price: "75",
    features: ["Mountain panorama view", "Complimentary breakfast", "Free high-speed WiFi", "Safety deposit box", "Premium linens"],
    buttonText: "Book Now",
    isPopular: true,
    buttonVariant: "primary" as const,
  },
  {
    id: "family",
    planName: "Family",
    description: "Spacious rooms designed for families — extra beds, room to breathe, breakfast for all.",
    price: "95",
    features: ["Multiple beds", "Complimentary breakfast", "Free high-speed WiFi", "Private balcony", "Extra storage space"],
    buttonText: "Book Now",
    isPopular: false,
    buttonVariant: "secondary" as const,
  },
];

export default function RoomsPreview() {
  return (
    <section
      className="py-24 px-4 bg-hg-black"
      style={{
        background:
          "radial-gradient(ellipse at 50% 40%, rgba(201,168,76,0.05) 0%, #0F0D0B 60%)",
      }}
    >
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Accommodation"
          title="Our Rooms"
          subtitle="17 rooms across three categories. Breakfast included in every stay."
        />

        {/* Cards */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-6 justify-center items-center md:items-stretch">
          {rooms.map((room, i) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={[
                "relative flex-1 max-w-sm w-full flex flex-col rounded-2xl px-7 py-8",
                "backdrop-blur-[14px] bg-gradient-to-br shadow-xl transition-all duration-300",
                room.isPopular
                  ? "from-white/[0.18] to-white/[0.08] border border-hg-gold/30 ring-2 ring-hg-gold/20 scale-105 shadow-2xl shadow-hg-gold/10"
                  : "from-white/[0.07] to-white/[0.02] border border-white/10",
              ].join(" ")}
            >
              {/* Most Popular badge */}
              {room.isPopular && (
                <div className="absolute -top-4 right-4 px-3 py-1 text-[11px] font-bold rounded-full bg-hg-gold text-hg-black tracking-wider uppercase">
                  Most Popular
                </div>
              )}

              {/* Plan name */}
              <div className="mb-3">
                <h2 className="text-[42px] font-extralight tracking-[-0.03em] text-hg-cream font-heading leading-none">
                  {room.planName}
                </h2>
                <p className="text-[15px] text-hg-muted mt-2 leading-relaxed">{room.description}</p>
              </div>

              {/* Price */}
              <div className="my-6 flex items-baseline gap-2">
                <span className="text-[48px] font-extralight text-hg-gold font-heading leading-none">
                  €{room.price}
                </span>
                <span className="text-sm text-hg-muted">/ night</span>
              </div>

              {/* Divider */}
              <div
                className="w-full h-px mb-5"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.09) 20%, rgba(255,255,255,0.22) 50%, rgba(255,255,255,0.09) 80%, transparent)",
                }}
              />

              {/* Features */}
              <ul className="flex flex-col gap-2.5 text-sm text-hg-cream/85 mb-8 flex-1">
                {room.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2.5">
                    <CheckIcon className="text-hg-gold w-4 h-4 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                href={`/booking?roomType=${room.planName}`}
                className={[
                  "mt-auto w-full py-2.5 rounded-xl font-semibold text-sm text-center transition-colors duration-200",
                  room.buttonVariant === "primary"
                    ? "bg-hg-gold hover:bg-hg-gold-light text-hg-black"
                    : "bg-white/10 hover:bg-white/20 text-hg-cream border border-white/20",
                ].join(" ")}
              >
                {room.buttonText}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View all link */}
        <div className="text-center mt-16">
          <Link
            href="/rooms"
            className="inline-flex items-center gap-2 text-hg-muted hover:text-hg-gold text-sm tracking-wider uppercase transition-colors group"
          >
            View All Room Details
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
