"use client";

import { motion } from "framer-motion";
import { Wifi, Car, Coffee, Dumbbell, Clock, Ticket, Wine, Mountain } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";

const amenities = [
  { icon: Coffee,   label: "Breakfast Included", desc: "Buffet breakfast served daily for all guests" },
  { icon: Wifi,     label: "Free WiFi",           desc: "High-speed internet throughout the hotel" },
  { icon: Car,      label: "Free Parking",        desc: "Private outdoor parking with direct hotel access" },
  { icon: Mountain, label: "Mountain Views",      desc: "Stunning Pyrenean mountain panoramas from rooms" },
  { icon: Dumbbell, label: "Fitness Center",      desc: "Fully equipped gym for guests and CDP athletes" },
  { icon: Clock,    label: "24H Reception",       desc: "Our team is always available for your needs" },
  { icon: Ticket,   label: "Ski Pass Sales",      desc: "Convenient ski pass point on-site" },
  { icon: Wine,     label: "Bar & Lounge",        desc: "Relaxing shared lounge and bar area" },
];

export default function AmenitiesGrid() {
  return (
    <section
      className="py-24 px-4"
      style={{
        background: "linear-gradient(180deg, #450920 0%, #7B2048 12%, #7B2048 88%, #450920 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Facilities"
          title="Everything You Need"
          subtitle="Comfort and convenience built into every stay."
        />

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {amenities.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="group flex flex-col items-center text-center gap-3 p-4 sm:p-6 rounded-2xl backdrop-blur-[14px] bg-gradient-to-br from-white/[0.06] to-white/[0.01] border border-white/10 hover:border-hg-gold/30 hover:from-white/[0.10] transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center border border-white/10 group-hover:border-hg-gold/40 bg-white/5 transition-colors duration-200">
                  <Icon size={20} className="text-hg-gold" />
                </div>
                <div>
                  <p className="text-hg-cream font-medium text-xs sm:text-sm mb-1">{item.label}</p>
                  <p className="text-hg-muted text-xs leading-relaxed hidden sm:block">{item.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
