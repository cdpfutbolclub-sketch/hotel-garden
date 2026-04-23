"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";

const weeks = [
  { label: "Week 1", dates: "June 29 – July 5, 2026" },
  { label: "Week 2", dates: "July 6 – July 11, 2026" },
];

export default function EventsBanner() {
  return (
    <section className="py-20 px-4 bg-hg-surface border-y border-hg-border">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-2xl backdrop-blur-[14px] bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-hg-gold/20"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)",
          }}
        >
          {/* Subtle gold glow */}
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at 80% 50%, rgba(201,168,76,0.07) 0%, transparent 60%)",
            }}
            aria-hidden
          />

          <div className="relative p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left */}
            <div>
              <div className="flex items-center gap-2 mb-5">
                <span className="w-6 h-px bg-hg-gold" />
                <p className="text-hg-gold text-[10px] tracking-[0.4em] uppercase">
                  CDP Fútbol Club × Hotel Garden
                </p>
              </div>
              <h2 className="font-heading text-hg-cream text-3xl sm:text-4xl mb-4 leading-tight">
                Draft Week 2026
              </h2>
              <p className="text-hg-muted text-sm leading-relaxed mb-6 max-w-md">
                An exclusive football trial program hosted at Hotel Garden. Train alongside
                professional players, compete in friendly matches, and experience Andorra
                like never before — all in one unforgettable week.
              </p>

              {/* Week date pills */}
              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                {weeks.map((w) => (
                  <div
                    key={w.label}
                    className="flex items-center gap-3 rounded-xl px-4 py-3 backdrop-blur-[14px] bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/15"
                  >
                    <Calendar size={14} className="text-hg-gold shrink-0" />
                    <div>
                      <p className="text-hg-gold text-[10px] tracking-wider uppercase font-semibold">{w.label}</p>
                      <p className="text-hg-cream text-xs">{w.dates}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                href="/draft-week"
                className="inline-flex items-center gap-2 bg-hg-gold hover:bg-hg-gold-light text-hg-black font-bold text-xs px-8 py-3.5 tracking-[0.2em] uppercase transition-colors duration-200 rounded-full group"
              >
                Reserve Your Spot
                <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Right — what's included */}
            <div className="lg:pl-8" style={{ borderLeft: "1px solid rgba(255,255,255,0.08)" }}>
              <p className="text-hg-muted text-[10px] tracking-[0.3em] uppercase mb-4">Package Includes</p>
              <ul className="space-y-3">
                {[
                  "7-night stay at Hotel Garden",
                  "Full board (breakfast, lunch, snack, dinner)",
                  "Training sessions with CDP FC first team",
                  "Friendly match participation",
                  "Official training kit + club bag",
                  "Gym & fitness center access",
                  "Local transportation",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-hg-muted text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-hg-gold shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-6 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                <p className="text-hg-muted text-xs mb-1">Complete package from</p>
                <p className="text-hg-gold font-bold text-3xl font-heading">€500</p>
                <p className="text-hg-muted text-xs mt-1">Per person, all-inclusive</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
