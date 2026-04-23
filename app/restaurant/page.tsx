import type { Metadata } from "next";
import { Clock, Users, Phone } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";

export const metadata: Metadata = {
  title: "Restaurant & Dining",
  description:
    "Enjoy Andorran-inspired cuisine and international dishes at Hotel Garden's restaurant, open to guests and the public. Buffet breakfast included.",
};

const hours = [
  { meal: "Breakfast", time: "07:00 – 10:30", note: "Buffet style · Included for hotel guests" },
  { meal: "Lunch", time: "12:30 – 14:30", note: "À la carte menu" },
  { meal: "Dinner", time: "19:30 – 22:00", note: "Full dinner service" },
];

const menuHighlights = [
  { category: "Starters", items: ["Mountain charcuterie board", "Seasonal soup", "Mixed salad"] },
  { category: "Mains", items: ["Grilled local meats", "Pyrenean lamb", "Pasta & vegetarian options"] },
  { category: "Breakfast", items: ["Cold cuts & cheeses", "Fresh pastries", "Eggs & hot options", "Fresh fruit & yogurt"] },
  { category: "Desserts", items: ["Crema catalana", "Fresh fruit tart", "Seasonal specials"] },
];

export default function RestaurantPage() {
  return (
    <div className="min-h-screen bg-hg-black">
      {/* Header */}
      <div className="pt-32 pb-16 px-4 bg-hg-surface border-b border-hg-border">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            eyebrow="Dining"
            title="Restaurant & Cantina"
            subtitle="Hearty mountain cuisine and international flavours. Open to hotel guests and the public alike."
          />
        </div>
      </div>

      {/* Main content */}
      <div className="py-20 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left — description */}
          <div>
            {/* Image placeholder */}
            <div
              className="relative h-80 rounded-2xl overflow-hidden backdrop-blur-[14px] bg-gradient-to-br from-white/[0.07] to-white/[0.02] border border-white/10 mb-8"
              style={{ background: "radial-gradient(ellipse at 40% 40%, rgba(201,168,76,0.06) 0%, rgba(28,24,20,0.95) 70%)" }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-hg-muted text-sm">Photo coming soon</p>
              </div>
            </div>

            <p className="text-hg-gold text-[10px] tracking-[0.35em] uppercase mb-3">About the Restaurant</p>
            <h2 className="font-heading text-hg-cream text-3xl mb-4">A Taste of the Mountains</h2>
            <div className="w-12 h-px bg-hg-gold mb-5" />
            <p className="text-hg-muted leading-relaxed mb-4">
              Our restaurant celebrates the flavours of the Pyrenees while welcoming diners from around the world.
              Whether you&apos;re starting your day with a hearty buffet breakfast or sitting down for a leisurely
              dinner after a day on the slopes, our kitchen is ready to serve you.
            </p>
            <p className="text-hg-muted leading-relaxed mb-6">
              The cantina is open to the public — a warm, casual space perfect for locals and visitors
              alike to enjoy a quality meal in the heart of Santa Coloma.
            </p>

            {/* Info pills */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <Users size={14} className="text-hg-gold shrink-0" />
                <span className="text-hg-muted text-sm">Open to hotel guests and the public</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock size={14} className="text-hg-gold shrink-0" />
                <span className="text-hg-muted text-sm">Breakfast included for all hotel guests</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={14} className="text-hg-gold shrink-0" />
                <a href="tel:+376615817" className="text-hg-muted hover:text-hg-gold text-sm transition-colors">
                  +376 615 817 — reservations & enquiries
                </a>
              </div>
            </div>
          </div>

          {/* Right — hours + menu */}
          <div className="space-y-10">
            {/* Opening Hours */}
            <div>
              <p className="text-hg-gold text-[10px] tracking-[0.35em] uppercase mb-5">Opening Hours</p>
              <div className="space-y-3">
                {hours.map((h) => (
                  <div key={h.meal} className="rounded-2xl p-5 backdrop-blur-[14px] bg-gradient-to-br from-white/[0.07] to-white/[0.02] border border-white/10 hover:border-hg-gold/30 transition-all duration-300">
                    <div className="flex justify-between items-center mb-1">
                      <p className="text-hg-cream font-semibold text-sm">{h.meal}</p>
                      <p className="text-hg-gold text-sm font-medium">{h.time}</p>
                    </div>
                    <p className="text-hg-muted text-xs">{h.note}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Menu Highlights */}
            <div>
              <p className="text-hg-gold text-[10px] tracking-[0.35em] uppercase mb-5">Menu Highlights</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {menuHighlights.map((section) => (
                  <div key={section.category} className="rounded-2xl p-5 backdrop-blur-[14px] bg-gradient-to-br from-white/[0.07] to-white/[0.02] border border-white/10 hover:border-hg-gold/30 transition-all duration-300">
                    <p className="text-hg-cream font-semibold text-sm mb-3">{section.category}</p>
                    <ul className="space-y-1.5">
                      {section.items.map((item) => (
                        <li key={item} className="text-hg-muted text-xs flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-hg-gold shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <p className="text-hg-muted text-xs mt-4 italic">
                * Menu changes seasonally. Full menu available at the restaurant.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
