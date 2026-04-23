import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, Check, ArrowRight, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Draft Week 2026 — CDP × Hotel Garden",
  description:
    "Draft Week 2026: June 29–July 5 and July 6–11. Professional football trials in Andorra with CDP Fútbol Club, hosted at Hotel Garden. €500 all-inclusive.",
};

const weeks = [
  {
    id: "week1",
    label: "Week 1",
    dates: "June 29 – July 5, 2026",
    days: "7 days",
    spots: "Limited spots",
    accent: true,
  },
  {
    id: "week2",
    label: "Week 2",
    dates: "July 6 – July 11, 2026",
    days: "6 days",
    spots: "Limited spots",
    accent: false,
  },
];

const included = [
  "Accommodation at Hotel Garden (shared room)",
  "Full board — light breakfast, lunch, afternoon snack, dinner",
  "Training sessions with CDP FC first team",
  "Friendly match participation",
  "Official training kit + club bag",
  "Gym & fitness center access",
  "Technical & tactical coaching",
  "Local transportation",
  "Andorra la Vella experience",
];

const mealSchedule = [
  { meal: "Light Breakfast", time: "08:00" },
  { meal: "Lunch", time: "14:00" },
  { meal: "Afternoon Snack", time: "17:00" },
  { meal: "Dinner", time: "20:30" },
];

export default function DraftWeekPage() {
  return (
    <div className="min-h-screen bg-hg-black">
      {/* Hero */}
      <section className="relative pt-32 pb-24 px-4 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 25% 50%, rgba(201,168,76,0.08) 0%, #0F0D0B 60%)",
          }}
          aria-hidden
        />
        {/* Mountain silhouette */}
        <svg className="absolute bottom-0 left-0 right-0 w-full" viewBox="0 0 1440 200" preserveAspectRatio="none" aria-hidden>
          <path d="M0,120 L240,50 L480,90 L720,20 L960,70 L1200,30 L1440,80 L1440,200 L0,200 Z" fill="#1C1814" opacity="0.4" />
        </svg>

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 border border-hg-gold/30 bg-hg-gold/5 px-4 py-2 mb-8">
            <span className="w-1.5 h-1.5 bg-hg-gold rounded-full" />
            <span className="text-hg-gold text-[10px] tracking-[0.35em] uppercase">
              CDP Fútbol Club × Hotel Garden
            </span>
          </div>

          <h1 className="font-heading text-hg-cream text-5xl sm:text-6xl lg:text-7xl mb-6 leading-none">
            Draft Week
            <br />
            <span className="text-hg-gold">2026</span>
          </h1>

          <p className="text-hg-muted text-base sm:text-lg leading-relaxed mb-10 max-w-lg mx-auto">
            One week in Andorra. One chance to train with a professional club.
            Two weeks available — choose yours.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/sports#apply"
              className="w-full sm:w-auto bg-hg-gold hover:bg-hg-gold-light text-hg-black font-bold text-xs px-10 py-4 tracking-[0.2em] uppercase transition-colors"
            >
              Apply Now
            </Link>
            <a
              href="tel:+376615817"
              className="w-full sm:w-auto border border-hg-cream/30 hover:border-hg-gold text-hg-cream hover:text-hg-gold text-xs px-10 py-4 tracking-[0.2em] uppercase transition-colors flex items-center justify-center gap-2"
            >
              <Phone size={13} />
              +376 615 817
            </a>
          </div>
        </div>
      </section>

      {/* Week cards */}
      <section className="py-16 px-4 bg-hg-surface border-y border-hg-border">
        <div className="max-w-4xl mx-auto">
          <p className="text-hg-gold text-[10px] tracking-[0.4em] uppercase text-center mb-8">
            Available Dates
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {weeks.map((w) => (
              <div
                key={w.id}
                className={`relative border p-8 ${
                  w.accent
                    ? "border-hg-gold/50 bg-hg-card shadow-lg shadow-hg-gold/5"
                    : "border-hg-border bg-hg-card"
                }`}
              >
                {w.accent && (
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-hg-gold" />
                )}
                <div className="flex items-center gap-2 mb-4">
                  <Calendar size={16} className="text-hg-gold" />
                  <span className="text-hg-gold text-[10px] tracking-wider uppercase font-semibold">
                    {w.label}
                  </span>
                </div>
                <p className="font-heading text-hg-cream text-xl mb-2">{w.dates}</p>
                <p className="text-hg-muted text-sm mb-4">{w.days} · {w.spots}</p>
                <Link
                  href={`/sports#apply`}
                  className={`inline-flex items-center gap-2 text-xs px-5 py-2.5 tracking-wider uppercase transition-all group ${
                    w.accent
                      ? "bg-hg-gold hover:bg-hg-gold-light text-hg-black font-bold"
                      : "border border-hg-gold text-hg-gold hover:bg-hg-gold hover:text-hg-black"
                  }`}
                >
                  Select This Week
                  <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="py-20 px-4 bg-hg-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Included list */}
            <div>
              <p className="text-hg-gold text-[10px] tracking-[0.4em] uppercase mb-3">Package</p>
              <h2 className="font-heading text-hg-cream text-3xl sm:text-4xl mb-4 leading-tight">
                Everything<br />Included
              </h2>
              <div className="w-12 h-px bg-hg-gold mb-6" />
              <ul className="space-y-3 mb-8">
                {included.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-hg-muted text-sm">
                    <Check size={14} className="text-hg-gold shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="bg-hg-surface border border-hg-gold/30 p-6">
                <p className="text-hg-muted text-xs mb-2">Full package price — per player</p>
                <p className="font-heading text-hg-gold text-4xl font-bold">€500</p>
                <p className="text-hg-muted text-xs mt-2">
                  Payment goes to: <strong className="text-hg-cream">Cafe De La Republica</strong>
                  <br />
                  Organised in collaboration with Hotel Garden
                </p>
              </div>
            </div>

            {/* Meal schedule */}
            <div>
              <p className="text-hg-gold text-[10px] tracking-[0.4em] uppercase mb-3">Full Board</p>
              <h2 className="font-heading text-hg-cream text-3xl sm:text-4xl mb-4">
                Daily Meals
              </h2>
              <div className="w-12 h-px bg-hg-gold mb-6" />
              <p className="text-hg-muted text-sm leading-relaxed mb-6">
                Full board is included. Every meal is served at Hotel Garden and designed
                to fuel athletes for the training sessions ahead.
              </p>
              <div className="space-y-3">
                {mealSchedule.map((m) => (
                  <div
                    key={m.meal}
                    className="flex items-center justify-between bg-hg-surface border border-hg-border px-5 py-4"
                  >
                    <p className="text-hg-cream text-sm font-medium">{m.meal}</p>
                    <p className="text-hg-gold font-semibold text-sm">{m.time}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 bg-hg-surface border border-hg-border p-6">
                <p className="text-hg-cream font-semibold text-sm mb-2">Training Schedule</p>
                <p className="text-hg-muted text-sm leading-relaxed">
                  Monday: morning session only<br />
                  Tuesday – Friday: double sessions (morning + afternoon)<br />
                  Saturday: friendly match<br />
                  Sunday: rest / departure
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 bg-hg-surface border-t border-hg-border">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-hg-gold text-[10px] tracking-[0.4em] uppercase mb-3">Don't Miss It</p>
          <h2 className="font-heading text-hg-cream text-4xl mb-4">
            Spots Are Limited
          </h2>
          <div className="w-14 h-px bg-hg-gold mx-auto mb-6" />
          <p className="text-hg-muted text-base leading-relaxed mb-8">
            Two weeks, limited spaces. Apply now to secure your place in the
            2026 Draft Week program.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/sports#apply"
              className="w-full sm:w-auto bg-hg-gold hover:bg-hg-gold-light text-hg-black font-bold text-xs px-10 py-4 tracking-[0.2em] uppercase transition-colors"
            >
              Apply Now
            </Link>
            <Link
              href="/sports"
              className="w-full sm:w-auto border border-hg-gold text-hg-gold hover:bg-hg-gold hover:text-hg-black text-xs px-10 py-4 tracking-[0.2em] uppercase transition-colors"
            >
              Full Program Details
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
