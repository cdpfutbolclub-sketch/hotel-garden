"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, ArrowRight } from "lucide-react";

const facts = [
  { label: "Country",  value: "Andorra" },
  { label: "Parish",   value: "Andorra la Vella" },
  { label: "District", value: "Santa Coloma" },
  { label: "Altitude", value: "~1,000m" },
  { label: "Border",   value: "France & Spain" },
  { label: "Tax",      value: "10% — Europe's lowest" },
];

export default function LocationSnippet() {
  return (
    <section className="py-24 px-4 bg-hg-surface border-t border-hg-border">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-hg-gold text-xs tracking-[0.4em] uppercase mb-4">Location</p>
            <h2 className="font-heading text-hg-cream text-4xl sm:text-5xl mb-4 leading-tight">
              Heart of<br />Andorra
            </h2>
            <div className="w-14 h-px bg-hg-gold mb-6" />
            <p className="text-hg-muted text-base leading-relaxed mb-6">
              Hotel Garden sits in Santa Coloma, a vibrant district of Andorra la Vella — surrounded
              by the Pyrenees mountains, with easy access to shopping, skiing, and the best of Andorra.
            </p>

            {/* Location facts */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {facts.map((f) => (
                <div
                  key={f.label}
                  className="rounded-xl px-4 py-3 backdrop-blur-[14px] bg-gradient-to-br from-white/[0.07] to-white/[0.02] border border-white/10"
                >
                  <p className="text-hg-muted text-[10px] tracking-[0.2em] uppercase mb-1">{f.label}</p>
                  <p className="text-hg-cream text-sm font-medium">{f.value}</p>
                </div>
              ))}
            </div>

            <div className="flex items-start gap-3 mb-8">
              <MapPin size={16} className="text-hg-gold mt-0.5 shrink-0" />
              <address className="text-hg-muted text-sm not-italic leading-relaxed">
                Avinguda d&apos;Enclar 91–93, Santa Coloma<br />
                Andorra la Vella, AD500
              </address>
            </div>

            <Link
              href="/location"
              className="inline-flex items-center gap-2 border border-hg-gold text-hg-gold hover:bg-hg-gold hover:text-hg-black text-xs px-7 py-3 tracking-[0.2em] uppercase transition-all duration-200 rounded-full group"
            >
              View on Map
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Map placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative h-[380px] rounded-2xl overflow-hidden backdrop-blur-[14px] bg-gradient-to-br from-white/[0.07] to-white/[0.02] border border-white/10"
          >
            <div
              className="absolute inset-0"
              style={{ background: "radial-gradient(ellipse at 60% 40%, rgba(201,168,76,0.05) 0%, transparent 70%)" }}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <MapPin size={40} className="text-hg-gold/40" />
              <p className="text-hg-muted text-sm">Interactive map on location page</p>
              <Link
                href="/location"
                className="text-hg-gold text-xs tracking-wider uppercase underline underline-offset-4 hover:text-hg-gold-light transition-colors"
              >
                Open Map →
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
