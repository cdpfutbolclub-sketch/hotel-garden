"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";

const TESTIMONIALS = [
  {
    id: 1,
    name: "Marco T.",
    origin: "Italy",
    rating: 5,
    date: "March 2025",
    text: "Super friendly staff, spacious and clean rooms. The breakfast was excellent and free parking is a huge plus when visiting Andorra. Highly recommended to anyone visiting the area.",
  },
  {
    id: 2,
    name: "Sophie L.",
    origin: "France",
    rating: 4,
    date: "January 2025",
    text: "Great location with easy access to everything in Andorra. The staff were incredibly helpful throughout our stay and the comfortable beds made for a great night's sleep. Good breakfast too.",
  },
  {
    id: 3,
    name: "Carlos M.",
    origin: "Spain",
    rating: 5,
    date: "December 2024",
    text: "Excellent service and very well-organized. The hotel is perfectly placed for exploring Andorra and the Pyrenees. Food was great, rooms spacious and comfortable. Will definitely return.",
  },
  {
    id: 4,
    name: "Lena B.",
    origin: "Germany",
    rating: 5,
    date: "February 2025",
    text: "A hidden gem in the Pyrenees. The mountain views from our balcony were breathtaking and the hotel team went above and beyond to make our stay memorable. We'll be back next winter.",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1" aria-label={`${rating} out of 5 stars`}>
      {[...Array(5)].map((_, i) => (
        <Star key={i} size={13} className={i < rating ? "text-hg-gold fill-hg-gold" : "text-hg-border"} />
      ))}
    </div>
  );
}

type Testimonial = typeof TESTIMONIALS[number];
type Position = "front" | "middle" | "back";

function getPosition(index: number, total: number): Position {
  if (index === 0) return "front";
  if (index === total - 1) return "back";
  return "middle";
}

function TestimonialCard({
  testimonial,
  position,
  handleShuffle,
  isMobile,
}: {
  testimonial: Testimonial;
  position: Position;
  handleShuffle: () => void;
  isMobile: boolean;
}) {
  const dragStartX = React.useRef(0);
  const isFront = position === "front";

  const xOffset = isMobile
    ? { middle: "10%", back: "20%" }
    : { middle: "22%", back: "44%" };

  return (
    <motion.div
      style={{
        zIndex: position === "front" ? 2 : position === "middle" ? 1 : 0,
      }}
      animate={{
        rotate: position === "front" ? "-4deg" : position === "middle" ? "0deg" : "4deg",
        x: position === "front" ? "0%" : position === "middle" ? xOffset.middle : xOffset.back,
        scale: position === "front" ? 1 : position === "middle" ? 0.97 : 0.94,
      }}
      drag={isFront}
      dragElastic={0.3}
      dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
      onDragStart={(e: MouseEvent) => {
        dragStartX.current = e.clientX;
      }}
      onDragEnd={(e: MouseEvent) => {
        if (dragStartX.current - e.clientX > (isMobile ? 60 : 150)) {
          handleShuffle();
        }
        dragStartX.current = 0;
      }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`absolute left-0 top-0 flex flex-col gap-4 h-[280px] w-[240px] sm:h-[340px] sm:w-[360px] select-none rounded-2xl p-5 sm:p-7 backdrop-blur-[14px] bg-gradient-to-br from-white/[0.09] to-white/[0.02] border shadow-2xl ${
        isFront
          ? "border-hg-gold/40 cursor-grab active:cursor-grabbing shadow-hg-gold/5"
          : "border-white/10"
      }`}
    >
      <div className="flex items-center justify-between">
        <StarRating rating={testimonial.rating} />
        <span className="text-hg-muted text-xs">{testimonial.date}</span>
      </div>

      <p className="text-hg-muted text-sm leading-relaxed flex-1 italic">
        &ldquo;{testimonial.text}&rdquo;
      </p>

      <div className="flex items-center gap-3 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="w-9 h-9 rounded-full bg-hg-gold/10 border border-hg-gold/30 flex items-center justify-center shrink-0">
          <span className="text-hg-gold font-bold text-sm font-heading">
            {testimonial.name[0]}
          </span>
        </div>
        <div>
          <p className="text-hg-cream font-medium text-sm">{testimonial.name}</p>
          <p className="text-hg-muted text-xs">{testimonial.origin}</p>
        </div>
        {isFront && (
          <span className="ml-auto text-hg-muted/50 text-[10px] tracking-wider">
            swipe ›
          </span>
        )}
      </div>
    </motion.div>
  );
}

export default function Testimonials() {
  const [cards, setCards] = React.useState(TESTIMONIALS);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleShuffle = React.useCallback(() => {
    setCards((prev) => {
      const [front, ...rest] = prev;
      return [...rest, front];
    });
  }, []);

  return (
    <section className="py-24 px-4 bg-hg-black overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Guest Reviews"
          title="What Our Guests Say"
          subtitle="Real experiences from real travellers who chose Hotel Garden."
        />

        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">
          {/* Card stack — container is wide enough to hold cards + their x-offset overflow */}
          <div className="relative h-[280px] w-[240px] sm:h-[340px] sm:w-[540px] shrink-0">
            {cards.map((t, i) => (
              <TestimonialCard
                key={t.id}
                testimonial={t}
                position={getPosition(i, cards.length)}
                handleShuffle={handleShuffle}
                isMobile={isMobile}
              />
            ))}
          </div>

          {/* Side text — isolated stacking context so it's never behind cards */}
          <div className="relative z-10 text-center lg:text-left max-w-xs">
            <p className="text-hg-gold text-[10px] tracking-[0.4em] uppercase mb-4">Verified Guests</p>
            <h3 className="font-heading text-hg-cream text-3xl mb-4 leading-tight">
              Loved by Guests<br />Across Europe
            </h3>
            <div className="w-12 h-px bg-hg-gold mb-5 mx-auto lg:mx-0" />
            <p className="text-hg-muted text-sm leading-relaxed mb-6">
              Drag the card or swipe left to read more reviews from our guests.
            </p>
            <div className="flex items-center gap-3 justify-center lg:justify-start">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className="text-hg-gold fill-hg-gold" />
                ))}
              </div>
              <span className="text-hg-muted text-sm">4.8 average rating</span>
            </div>
            <p className="text-hg-muted/50 text-xs mt-6">
              Based on reviews from TripAdvisor and booking platforms
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
