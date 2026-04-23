"use client";

import { useState } from "react";
import SectionHeader from "@/components/shared/SectionHeader";

const filters = ["All", "Rooms", "Restaurant", "Gym", "Exterior", "Andorra"];

// TODO: Replace placeholder items with real photos.
// Each photo should be placed in /public/images/gallery/ and referenced here.
// Example: { src: "/images/gallery/room-standard-1.jpg", alt: "Standard Room", category: "Rooms" }
const placeholderGallery = [
  { id: 1, category: "Rooms", label: "Standard Room" },
  { id: 2, category: "Rooms", label: "Superior Room — Mountain View" },
  { id: 3, category: "Rooms", label: "Family Room" },
  { id: 4, category: "Rooms", label: "Room Detail" },
  { id: 5, category: "Restaurant", label: "Restaurant Interior" },
  { id: 6, category: "Restaurant", label: "Buffet Breakfast" },
  { id: 7, category: "Gym", label: "Fitness Center" },
  { id: 8, category: "Exterior", label: "Hotel Exterior" },
  { id: 9, category: "Exterior", label: "Hotel Entrance" },
  { id: 10, category: "Andorra", label: "Pyrenean Mountains" },
  { id: 11, category: "Andorra", label: "Santa Coloma" },
  { id: 12, category: "Andorra", label: "Andorra la Vella" },
];

export default function GalleryPage() {
  const [active, setActive] = useState("All");

  const filtered =
    active === "All"
      ? placeholderGallery
      : placeholderGallery.filter((p) => p.category === active);

  return (
    <div className="min-h-screen bg-hg-black">
      {/* Header */}
      <div className="pt-32 pb-16 px-4 bg-hg-surface border-b border-hg-border">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            eyebrow="Photos"
            title="Gallery"
            subtitle="Explore Hotel Garden through our photos."
          />
        </div>
      </div>

      {/* Filter tabs */}
      <div className="sticky top-20 z-30 bg-hg-black/90 backdrop-blur-sm border-b border-hg-border">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto py-3 scrollbar-none">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={`shrink-0 text-xs px-5 py-2 tracking-wider uppercase transition-all duration-200 cursor-pointer rounded-full ${
                  active === f
                    ? "bg-hg-gold text-hg-black font-bold"
                    : "text-hg-muted hover:text-hg-cream border border-white/10 hover:border-hg-gold/30"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/*
            TODO: Once you have real photos, replace the placeholder grid items below
            with Next.js <Image> components. Example:
            <Image src={item.src} alt={item.alt} fill className="object-cover hover:scale-105 transition-transform duration-500" />
          */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {filtered.map((item, i) => (
              <div
                key={item.id}
                className={`relative rounded-2xl overflow-hidden backdrop-blur-[14px] bg-gradient-to-br from-white/[0.07] to-white/[0.02] border border-white/10 hover:border-hg-gold/40 transition-all duration-300 ${
                  i % 5 === 0 ? "col-span-2 row-span-2" : ""
                }`}
                style={{ aspectRatio: i % 5 === 0 ? "1 / 1" : "4 / 3" }}
              >
                <div
                  className="absolute inset-0 flex flex-col items-end justify-end p-4"
                  style={{
                    background: `radial-gradient(ellipse at 30% 30%, rgba(201,168,76,0.04) 0%, rgba(28,24,20,0.6) 80%)`,
                  }}
                >
                  <span className="rounded-full bg-hg-black/70 backdrop-blur-sm text-hg-muted text-[10px] px-3 py-1 border border-white/10">
                    {item.label}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-hg-muted text-sm">
              Professional photos coming soon.{" "}
              <a href="tel:+376615817" className="text-hg-gold hover:underline">
                Contact us
              </a>{" "}
              to arrange a visit.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
