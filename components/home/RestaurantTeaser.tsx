"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Users } from "lucide-react";

export default function RestaurantTeaser() {
  return (
    <section className="py-24 px-4 bg-hg-black">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative h-[420px] bg-hg-surface border border-hg-border overflow-hidden"
          >
            {/*
              TODO: Replace with real restaurant photo.
              Place at /public/images/restaurant.jpg and use:
              <Image src="/images/restaurant.jpg" alt="Restaurant" fill className="object-cover" />
            */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse at 30% 50%, rgba(201,168,76,0.07) 0%, #1C1814 70%)",
              }}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
              <p className="font-heading text-hg-gold/15 text-8xl font-bold leading-none select-none">
                Menu
              </p>
              <p className="text-hg-muted text-sm mt-4">Photo coming soon</p>
            </div>
            {/* Gold corner accent */}
            <div className="absolute top-0 left-0 w-16 h-1 bg-hg-gold" />
            <div className="absolute top-0 left-0 w-1 h-16 bg-hg-gold" />
          </motion.div>

          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="text-hg-gold text-xs tracking-[0.4em] uppercase mb-4">Dining</p>
            <h2 className="font-heading text-hg-cream text-4xl sm:text-5xl mb-4 leading-tight">
              Restaurant &<br />Cantina
            </h2>
            <div className="w-14 h-px bg-hg-gold mb-6" />
            <p className="text-hg-muted text-base leading-relaxed mb-6">
              Our on-site restaurant serves hearty Andorran-inspired cuisine and international
              dishes. Open to hotel guests and the public — a warm, welcoming space to enjoy
              a good meal in the heart of Santa Coloma.
            </p>
            <p className="text-hg-muted text-base leading-relaxed mb-8">
              Mornings start with a full buffet breakfast included in your stay. Lunch and
              dinner menus celebrate local flavors and mountain comfort food.
            </p>

            {/* Quick info */}
            <div className="flex flex-col gap-3 mb-8">
              <div className="flex items-center gap-3">
                <Clock size={14} className="text-hg-gold shrink-0" />
                <span className="text-hg-muted text-sm">
                  Breakfast · Lunch · Dinner
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Users size={14} className="text-hg-gold shrink-0" />
                <span className="text-hg-muted text-sm">
                  Open to hotel guests &amp; public
                </span>
              </div>
            </div>

            <Link
              href="/restaurant"
              className="inline-flex items-center gap-2 border border-hg-gold text-hg-gold hover:bg-hg-gold hover:text-hg-black text-xs px-7 py-3 tracking-[0.2em] uppercase transition-all duration-200 group"
            >
              View Restaurant
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
