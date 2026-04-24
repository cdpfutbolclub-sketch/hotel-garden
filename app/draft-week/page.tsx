"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check, CheckCircle, Calendar, ChevronDown,
  Phone, ArrowRight, Users, Shield,
} from "lucide-react";

// ── Color tokens (used throughout as inline styles) ───────────────────────────
const C = {
  red:        "#CC1100",
  redLight:   "#E53010",
  redDark:    "#8B0000",
  redGlow:    "rgba(204,17,0,0.12)",
  redBorder:  "rgba(204,17,0,0.22)",
  redBorderHi:"rgba(204,17,0,0.55)",
  black:      "#080808",
  darkRed:    "#0D0000",
  deepRed:    "#150000",
  white:      "#F5F2F0",
  muted:      "#8A7A78",
  mutedDark:  "#5A4A48",
  gold:       "#C9A84C",          // reserved for prices only
  cardBg:     "rgba(255,255,255,0.04)",
  cardBgHi:   "rgba(255,255,255,0.07)",
  glass:      "backdrop-blur-[14px]",
};

// Section background helpers
const BG = {
  hero:   "linear-gradient(170deg, #000000 0%, #060000 50%, #140000 100%)",
  dark:   "linear-gradient(180deg, #080808 0%, #040000 12%, #040000 88%, #080808 100%)",
  accent: "linear-gradient(180deg, #080808 0%, #100000 12%, #100000 88%, #080808 100%)",
  strip:  "#000000",
};

// ── Sessions ──────────────────────────────────────────────────────────────────
const sessions = [
  { id: "jun1",  label: "Session 1", dates: "June 1 – 6, 2026",       arrival: "Mon 1 Jun",  departure: "Sat 6 Jun",  spots: 4  },
  { id: "jun22", label: "Session 2", dates: "June 22 – 27, 2026",     arrival: "Mon 22 Jun", departure: "Sat 27 Jun", spots: 7  },
  { id: "jul6",  label: "Session 3", dates: "July 6 – 11, 2026",      arrival: "Mon 6 Jul",  departure: "Sat 11 Jul", spots: 12 },
  { id: "jul13", label: "Session 4", dates: "July 13 – 18, 2026",     arrival: "Mon 13 Jul", departure: "Sat 18 Jul", spots: 12 },
  { id: "jul20", label: "Session 5", dates: "July 20 – 25, 2026",     arrival: "Mon 20 Jul", departure: "Sat 25 Jul", spots: 12 },
  { id: "jul27", label: "Session 6", dates: "July 27 – Aug 1, 2026",  arrival: "Mon 27 Jul", departure: "Sat 1 Aug",  spots: 12 },
];

// ── Coaches ───────────────────────────────────────────────────────────────────
const coaches = [
  { initials: "HC", name: "Head Coach",       role: "Technical Director",       cred: "UEFA A Licence · 15 years experience" },
  { initials: "AC", name: "Fitness Coach",    role: "Conditioning & Athletics",  cred: "UEFA B · Sports Science Degree" },
  { initials: "GC", name: "Goalkeeper Coach", role: "GK Specialist",             cred: "FFF Licence · Former Pro Goalkeeper" },
];

// ── Included ──────────────────────────────────────────────────────────────────
const included = [
  "6-night accommodation at Hotel Garden",
  "Full board: breakfast, lunch, afternoon snack, dinner",
  "Training sessions with CDP FC first team",
  "Friendly match participation on Saturday",
  "Official CDP training kit + club bag",
  "Gym & fitness center access",
  "Local transportation",
  "Technical & tactical coaching sessions",
  "Individual performance feedback",
];

// ── Schedule ──────────────────────────────────────────────────────────────────
const schedule = [
  { day: "Mon", label: "Arrival",   sessions: ["Check-in", "Evening training"] },
  { day: "Tue", label: "Day 2",     sessions: ["Morning session", "Afternoon session"] },
  { day: "Wed", label: "Day 3",     sessions: ["Morning session", "Afternoon session"] },
  { day: "Thu", label: "Day 4",     sessions: ["Morning session", "Afternoon session"] },
  { day: "Fri", label: "Day 5",     sessions: ["Morning session", "Video analysis"] },
  { day: "Sat", label: "Match Day", sessions: ["Friendly match", "Departure"] },
];

// ── Trust stats ───────────────────────────────────────────────────────────────
const trustStats = [
  { value: "6 Nights",   label: "All-inclusive stay" },
  { value: "9+",         label: "Training sessions" },
  { value: "First Team", label: "Train alongside pros" },
  { value: "12 Players", label: "Max per session" },
  { value: "€500",       label: "Complete package" },
];

// ── Club stats ────────────────────────────────────────────────────────────────
const clubStats = [
  { value: "Andorra",  label: "Based in" },
  { value: "2ª Div",   label: "Current league" },
  { value: "UEFA",     label: "European pathway" },
  { value: "Intl.",    label: "Player recruitment" },
];

// ── FAQs ──────────────────────────────────────────────────────────────────────
const faqs = [
  {
    q: "What level do I need to be to apply?",
    a: "The program is open to players aged 16–40 at any competitive level. Whether you are semi-professional, amateur, or simply passionate about developing your game, our coaches adapt sessions to the group. All you need is commitment.",
  },
  {
    q: "Is the €500 price really all-inclusive?",
    a: "Yes. The €500 covers 6 nights at Hotel Garden, full board (4 meals per day), all training sessions, the friendly match, your official CDP training kit, club bag, and local transportation. The only extras are personal shopping or optional excursions.",
  },
  {
    q: "Is there a real pathway to sign with CDP FC?",
    a: "CDP FC competes in the Andorran Segona Divisió with European ambitions. Players who demonstrate the right level during the week can be considered for a contract or loan arrangement. The club has a genuine UEFA pathway — not a promise, but a real and concrete opportunity.",
  },
  {
    q: "Can my family come and stay at the hotel?",
    a: "Absolutely. Hotel Garden has Standard, Superior, and Family rooms available. Your family can book directly alongside your program dates and experience Andorra — world-class shopping, mountain scenery, and ski infrastructure — while you train.",
  },
  {
    q: "What is the cancellation policy?",
    a: "Cancellations made more than 14 days before your session start date receive a full refund. Within 14 days, we offer a credit transferable to another available session. Contact us at +376 615 817 for any flexibility needed.",
  },
  {
    q: "How do I get to Andorra?",
    a: "The closest airports are Barcelona El Prat (~3h by bus or car) and Toulouse Blagnac (~2.5h). Direct bus connections run from both airports to Andorra la Vella. Hotel Garden is a short taxi ride from the bus station in Santa Coloma.",
  },
];

// ─────────────────────────────────────────────────────────────────────────────

export default function DraftWeekPage() {
  const formRef = useRef<HTMLDivElement>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    position: "", age: "", week: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const scrollToForm = (weekId?: string) => {
    if (weekId) setForm((f) => ({ ...f, week: weekId }));
    setTimeout(() => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/sports-application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please call us at +376 615 817.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-xl px-4 py-3 text-sm outline-none transition-colors duration-200"
    + " text-[#F5F2F0] placeholder-[#5A4A48]"
    + " border focus:border-[#CC1100]"
    + " bg-white/[0.04] border-white/10";
  const labelClass = "block text-[10px] tracking-[0.25em] uppercase mb-2"
    + " text-[#8A7A78]";

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: C.black }}>

      {/* ── 1. HERO ─────────────────────────────────────────────────────────────── */}
      <section
        className="relative min-h-screen flex flex-col justify-center px-4 pt-24 pb-20"
        style={{ background: BG.hero }}
      >
        {/* Red glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at 50% 45%, ${C.redGlow} 0%, transparent 55%)`,
          }}
        />

        {/* Diagonal accent line */}
        <div
          className="absolute top-0 right-0 w-px h-full pointer-events-none opacity-20"
          style={{ background: `linear-gradient(180deg, transparent 0%, ${C.red} 40%, transparent 100%)` }}
        />

        <div className="relative max-w-5xl mx-auto text-center">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center gap-3 mb-8"
          >
            <span className="w-10 h-px" style={{ background: C.red }} />
            <p className="text-[10px] tracking-[0.55em] uppercase font-medium" style={{ color: C.red }}>
              CDP Fútbol Club × Hotel Garden
            </p>
            <span className="w-10 h-px" style={{ background: C.red }} />
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="font-heading text-5xl sm:text-7xl lg:text-[90px] font-extralight leading-[0.9] mb-6 tracking-tight"
            style={{ color: C.white }}
          >
            Train in Andorra.
            <br />
            <em className="not-italic font-light" style={{ color: C.red }}>Be Seen.</em>
          </motion.h1>

          {/* Red divider under headline */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-16 h-0.5 mx-auto mb-8 origin-left"
            style={{ background: C.red }}
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-10"
            style={{ color: C.muted }}
          >
            A 6-day elite football trial with CDP Fútbol Club in the heart of the Pyrenees.
            Train with professionals, play in a competitive match, and put yourself in front
            of a club with a genuine UEFA pathway.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.32 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
          >
            <button
              onClick={() => scrollToForm()}
              className="inline-flex items-center gap-2 font-bold text-xs px-10 py-4 tracking-[0.25em] uppercase transition-all duration-200 rounded-full group"
              style={{ background: C.red, color: "#fff" }}
              onMouseEnter={e => (e.currentTarget.style.background = C.redLight)}
              onMouseLeave={e => (e.currentTarget.style.background = C.red)}
            >
              Reserve My Spot
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href="#dates"
              className="inline-flex items-center gap-2 text-xs px-8 py-4 tracking-[0.2em] uppercase transition-all duration-200 rounded-full border"
              style={{ borderColor: "rgba(255,255,255,0.15)", color: C.white }}
            >
              <Calendar size={13} style={{ color: C.red }} />
              View Available Dates
            </a>
          </motion.div>

          {/* Trust pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {["Andorra la Vella", "6 Sessions in 2026", "From €500 all-inclusive", "Max 12 players per session"].map(
              (pill) => (
                <span
                  key={pill}
                  className="text-xs px-4 py-2 rounded-full backdrop-blur-[14px]"
                  style={{
                    color: C.muted,
                    background: "rgba(255,255,255,0.04)",
                    border: `1px solid rgba(255,255,255,0.08)`,
                  }}
                >
                  {pill}
                </span>
              )
            )}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-30">
          <div className="w-px h-10 animate-pulse" style={{ background: C.red }} />
        </div>
      </section>

      {/* ── 2. TRUST BAR ────────────────────────────────────────────────────────── */}
      <section
        className="py-8 px-4"
        style={{
          background: BG.strip,
          borderTop: `1px solid ${C.redBorder}`,
          borderBottom: `1px solid ${C.redBorder}`,
        }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-6 text-center">
            {trustStats.map((s, i) => (
              <div key={i} className={i === 4 ? "col-span-2 sm:col-span-1" : ""}>
                <p
                  className="font-heading text-2xl font-extralight mb-1"
                  style={{ color: i === 4 ? C.gold : C.red }}
                >
                  {s.value}
                </p>
                <p className="text-[10px] tracking-[0.2em] uppercase" style={{ color: C.muted }}>
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. AVAILABLE DATES ──────────────────────────────────────────────────── */}
      <section id="dates" className="py-24 px-4" style={{ background: BG.accent }}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-[10px] tracking-[0.4em] uppercase mb-4" style={{ color: C.red }}>
              2026 Sessions
            </p>
            <h2 className="font-heading text-4xl sm:text-5xl font-extralight mb-4" style={{ color: C.white }}>
              Choose Your Week
            </h2>
            <p className="text-sm max-w-md mx-auto" style={{ color: C.muted }}>
              6 sessions across June and July 2026. Each limited to 12 players.
              Arrival Monday — departure Saturday.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {sessions.map((s, i) => {
              const isLow = s.spots <= 4;
              const isMed = s.spots > 4 && s.spots <= 7;
              return (
                <motion.div
                  key={s.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="group relative rounded-2xl p-6 cursor-pointer transition-all duration-300 backdrop-blur-[14px]"
                  style={{
                    background: C.cardBg,
                    border: `1px solid ${C.redBorder}`,
                  }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = C.redBorderHi)}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = C.redBorder)}
                  onClick={() => scrollToForm(s.id)}
                >
                  {/* Red top accent line */}
                  <div
                    className="absolute top-0 left-6 right-6 h-px"
                    style={{ background: isLow ? C.red : isMed ? "rgba(204,17,0,0.5)" : "rgba(204,17,0,0.2)" }}
                  />

                  {isLow && (
                    <div
                      className="absolute -top-3 right-4 px-3 py-1 text-[10px] font-bold rounded-full tracking-wider uppercase text-white"
                      style={{ background: C.red }}
                    >
                      Almost Full
                    </div>
                  )}
                  {isMed && (
                    <div
                      className="absolute -top-3 right-4 px-3 py-1 text-[10px] font-bold rounded-full tracking-wider uppercase"
                      style={{ background: "rgba(204,17,0,0.15)", color: C.red, border: `1px solid ${C.red}` }}
                    >
                      Filling Fast
                    </div>
                  )}

                  <p className="text-[10px] tracking-[0.3em] uppercase mb-2 font-semibold" style={{ color: C.red }}>
                    {s.label}
                  </p>
                  <p className="font-heading text-xl font-light mb-4" style={{ color: C.white }}>
                    {s.dates}
                  </p>

                  <div className="flex flex-col gap-1 mb-5 text-xs" style={{ color: C.mutedDark }}>
                    <span>↓ Arrival — {s.arrival}</span>
                    <span>↑ Departure — {s.departure}</span>
                  </div>

                  {/* Availability bar */}
                  <div className="mb-5">
                    <div className="flex justify-between text-[10px] mb-1.5" style={{ color: C.mutedDark }}>
                      <span>{s.spots} of 12 spots remaining</span>
                      <span style={{ color: isLow ? C.red : isMed ? "#E07050" : "#6A8A6A" }}>
                        {isLow ? "Urgent" : isMed ? "Limited" : "Available"}
                      </span>
                    </div>
                    <div className="w-full h-1 rounded-full" style={{ background: "rgba(255,255,255,0.08)" }}>
                      <div
                        className="h-1 rounded-full transition-all"
                        style={{
                          width: `${(s.spots / 12) * 100}%`,
                          background: isLow ? C.red : isMed ? "#CC5500" : "#336633",
                        }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="font-heading text-2xl font-extralight" style={{ color: C.gold }}>
                      €500
                    </span>
                    <span
                      className="flex items-center gap-1.5 text-xs group-hover:gap-2.5 transition-all duration-200"
                      style={{ color: C.red }}
                    >
                      Reserve my spot <ArrowRight size={11} />
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <p className="text-center text-xs tracking-wide" style={{ color: C.mutedDark }}>
            Spots are limited to 12 players per session and filled on a first-come basis.
          </p>
        </div>
      </section>

      {/* ── 4. THE CLUB — CREDIBILITY ────────────────────────────────────────────── */}
      <section className="py-24 px-4" style={{ background: BG.dark }}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-[10px] tracking-[0.4em] uppercase mb-4" style={{ color: C.red }}>The Club</p>
            <h2 className="font-heading text-4xl sm:text-5xl font-extralight mb-4" style={{ color: C.white }}>
              Training with CDP Fútbol Club
            </h2>
            <p className="text-sm max-w-lg mx-auto leading-relaxed" style={{ color: C.muted }}>
              A professional club competing in the Andorran Segona Divisió with European
              ambitions and a structured pathway for talented players from around the world.
            </p>
          </motion.div>

          {/* Match photos grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6" style={{ gridTemplateRows: "180px 180px" }}>
            {/* Large featured photo — 2×2 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="col-span-2 row-span-2 relative rounded-2xl overflow-hidden backdrop-blur-[14px]"
              style={{ background: C.cardBg, border: `1px solid ${C.redBorder}` }}
            >
              {/* Red glow on featured photo */}
              <div
                className="absolute inset-0"
                style={{
                  background: `radial-gradient(ellipse at 30% 60%, rgba(204,17,0,0.08) 0%, transparent 60%)`,
                }}
              />
              {/* ↓ Replace with: <Image src="/images/cdp-match-main.jpg" alt="CDP FC match" fill className="object-cover" /> */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 opacity-20">
                <Shield size={36} style={{ color: C.red }} />
                <p className="text-[10px] tracking-widest uppercase" style={{ color: C.muted }}>Main match photo</p>
              </div>
            </motion.div>

            {/* Top-right */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="col-span-2 relative rounded-2xl overflow-hidden backdrop-blur-[14px]"
              style={{ background: C.cardBg, border: `1px solid ${C.redBorder}` }}
            >
              {/* ↓ Replace with: <Image src="/images/cdp-training.jpg" alt="Training" fill className="object-cover" /> */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-20">
                <Users size={22} style={{ color: C.red }} />
                <p className="text-[10px] tracking-widest uppercase" style={{ color: C.muted }}>Training photo</p>
              </div>
            </motion.div>

            {/* Bottom-right: two small */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.14 }}
              className="relative rounded-2xl overflow-hidden backdrop-blur-[14px]"
              style={{ background: C.cardBg, border: `1px solid ${C.redBorder}` }}
            >
              {/* ↓ Replace with: <Image src="/images/cdp-team.jpg" alt="Team" fill className="object-cover" /> */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-20">
                <Users size={16} style={{ color: C.red }} />
                <p className="text-[9px] tracking-widest uppercase" style={{ color: C.muted }}>Team photo</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative rounded-2xl overflow-hidden backdrop-blur-[14px]"
              style={{ background: C.cardBg, border: `1px solid ${C.redBorder}` }}
            >
              {/* ↓ Replace with: <Image src="/images/cdp-pitch.jpg" alt="Pitch" fill className="object-cover" /> */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-20">
                <Shield size={16} style={{ color: C.red }} />
                <p className="text-[9px] tracking-widest uppercase" style={{ color: C.muted }}>Pitch photo</p>
              </div>
            </motion.div>
          </div>

          <p className="text-xs text-center mb-16 opacity-30" style={{ color: C.muted }}>
            Match and training photos will be added before launch
          </p>

          {/* Club stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16">
            {clubStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl px-5 py-4 text-center backdrop-blur-[14px]"
                style={{ background: C.cardBg, border: `1px solid ${C.redBorder}` }}
              >
                <p className="font-heading text-2xl font-light mb-1" style={{ color: C.red }}>
                  {stat.value}
                </p>
                <p className="text-[10px] tracking-[0.2em] uppercase" style={{ color: C.muted }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* Coach cards */}
          <div>
            <p
              className="text-center text-[10px] tracking-[0.4em] uppercase mb-8"
              style={{ color: C.red }}
            >
              Coaching Staff
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {coaches.map((coach, i) => (
                <motion.div
                  key={coach.initials}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex flex-col items-center text-center rounded-2xl p-8 backdrop-blur-[14px] transition-all duration-300"
                  style={{ background: C.cardBg, border: `1px solid ${C.redBorder}` }}
                >
                  {/*
                    Replace with real photo:
                    <div className="w-20 h-20 rounded-full overflow-hidden mb-5" style={{ border: `2px solid ${C.red}` }}>
                      <Image src="/images/coach-[name].jpg" alt={coach.name} width={80} height={80} className="object-cover" />
                    </div>
                  */}
                  <div
                    className="w-20 h-20 rounded-full mb-5 flex items-center justify-center font-heading text-2xl font-light"
                    style={{
                      color: C.red,
                      border: `2px solid ${C.red}`,
                      background: "rgba(204,17,0,0.08)",
                    }}
                  >
                    {coach.initials}
                  </div>
                  <p className="font-semibold text-sm mb-1" style={{ color: C.white }}>
                    {coach.name}
                  </p>
                  <p className="text-[10px] tracking-wider uppercase mb-3" style={{ color: C.red }}>
                    {coach.role}
                  </p>
                  <p className="text-xs leading-relaxed" style={{ color: C.muted }}>
                    {coach.cred}
                  </p>
                </motion.div>
              ))}
            </div>
            <p className="text-center text-xs mt-6 opacity-30" style={{ color: C.muted }}>
              Full coach bios and photos coming before launch
            </p>
          </div>
        </div>
      </section>

      {/* ── 5. WHAT'S INCLUDED ──────────────────────────────────────────────────── */}
      <section className="py-24 px-4" style={{ background: BG.accent }}>
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-[10px] tracking-[0.4em] uppercase mb-4" style={{ color: C.red }}>
              The Package
            </p>
            <h2 className="font-heading text-4xl sm:text-5xl font-extralight mb-4 leading-tight" style={{ color: C.white }}>
              Everything<br />Taken Care Of
            </h2>
            <div className="w-12 h-0.5 mb-6" style={{ background: C.red }} />
            <p className="text-sm leading-relaxed" style={{ color: C.muted }}>
              One price. Everything included. From the moment you arrive at Hotel Garden to
              the final whistle on match day — we handle it all so you can focus entirely
              on your game.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl p-8 backdrop-blur-[14px]"
            style={{
              background: "rgba(204,17,0,0.05)",
              border: `1px solid ${C.redBorderHi}`,
            }}
          >
            <ul className="space-y-3 mb-8">
              {included.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm" style={{ color: C.muted }}>
                  <Check size={14} className="shrink-0 mt-0.5" style={{ color: C.red }} />
                  {item}
                </li>
              ))}
            </ul>
            <div
              className="pt-6 flex items-end justify-between"
              style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
            >
              <div>
                <p className="text-xs mb-1" style={{ color: C.muted }}>Complete package</p>
                <p className="font-heading text-5xl font-extralight" style={{ color: C.gold }}>€500</p>
                <p className="text-xs mt-1" style={{ color: C.muted }}>Per player · All inclusive</p>
              </div>
              <button
                onClick={() => scrollToForm()}
                className="inline-flex items-center gap-2 font-bold text-xs px-6 py-3 tracking-[0.2em] uppercase transition-all duration-200 rounded-full group"
                style={{ background: C.red, color: "#fff" }}
                onMouseEnter={e => (e.currentTarget.style.background = C.redLight)}
                onMouseLeave={e => (e.currentTarget.style.background = C.red)}
              >
                Reserve
                <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 6. WEEKLY SCHEDULE ──────────────────────────────────────────────────── */}
      <section className="py-24 px-4" style={{ background: BG.dark }}>
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-[10px] tracking-[0.4em] uppercase mb-4" style={{ color: C.red }}>
              Programme
            </p>
            <h2 className="font-heading text-4xl font-extralight" style={{ color: C.white }}>
              6 Days. Structured. Intensive.
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {schedule.map((day, i) => (
              <motion.div
                key={day.day}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="rounded-2xl p-4 text-center backdrop-blur-[14px] transition-all duration-300"
                style={{
                  background: C.cardBg,
                  border: `1px solid ${C.redBorder}`,
                }}
              >
                {/* Red top accent */}
                <div
                  className="w-6 h-0.5 mx-auto mb-3"
                  style={{ background: day.label === "Match Day" ? C.red : "rgba(204,17,0,0.3)" }}
                />
                <p
                  className="text-[11px] font-semibold tracking-wider uppercase mb-0.5"
                  style={{ color: C.red }}
                >
                  {day.day}
                </p>
                <p className="text-[9px] tracking-wider uppercase mb-3 opacity-40" style={{ color: C.muted }}>
                  {day.label}
                </p>
                <div className="space-y-1.5">
                  {day.sessions.map((s) => (
                    <p
                      key={s}
                      className="text-xs rounded-lg px-2 py-1.5 leading-tight"
                      style={{
                        color: C.muted,
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      {s}
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. FAQ ──────────────────────────────────────────────────────────────── */}
      <section className="py-24 px-4" style={{ background: BG.accent }}>
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-[10px] tracking-[0.4em] uppercase mb-4" style={{ color: C.red }}>FAQ</p>
            <h2 className="font-heading text-4xl font-extralight" style={{ color: C.white }}>
              Common Questions
            </h2>
          </motion.div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="rounded-2xl overflow-hidden backdrop-blur-[14px]"
                style={{
                  background: C.cardBg,
                  border: `1px solid ${openFaq === i ? C.redBorderHi : C.redBorder}`,
                  transition: "border-color 0.2s",
                }}
              >
                <button
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                >
                  <span className="text-sm font-medium" style={{ color: C.white }}>{faq.q}</span>
                  <ChevronDown
                    size={16}
                    className={`shrink-0 transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`}
                    style={{ color: C.red }}
                  />
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div
                        className="px-6 pb-5"
                        style={{ borderTop: "1px solid rgba(204,17,0,0.12)" }}
                      >
                        <p className="text-sm leading-relaxed pt-4" style={{ color: C.muted }}>{faq.a}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. APPLICATION FORM ─────────────────────────────────────────────────── */}
      <section
        id="apply"
        ref={formRef}
        className="py-24 px-4"
        style={{ background: BG.dark }}
      >
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-[10px] tracking-[0.4em] uppercase mb-4" style={{ color: C.red }}>
              Apply Now
            </p>
            <h2 className="font-heading text-4xl sm:text-5xl font-extralight mb-4" style={{ color: C.white }}>
              Reserve My Spot
            </h2>
            <p className="text-sm leading-relaxed max-w-md mx-auto" style={{ color: C.muted }}>
              Fill in the form below and our team will confirm your spot within 48 hours.
              Sessions fill on a first-come basis — don&apos;t wait.
            </p>
          </motion.div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-2xl p-12 text-center flex flex-col items-center backdrop-blur-[14px]"
              style={{ background: "rgba(204,17,0,0.05)", border: `1px solid ${C.redBorderHi}` }}
            >
              <CheckCircle className="mb-5" size={52} style={{ color: C.red }} />
              <h3 className="font-heading text-2xl mb-3" style={{ color: C.white }}>Application Received!</h3>
              <p className="text-sm leading-relaxed max-w-sm" style={{ color: C.muted }}>
                We&apos;ll review your details and get back to you within 48 hours. Questions?
                Call us at{" "}
                <a href="tel:+376615817" className="hover:underline" style={{ color: C.red }}>
                  +376 615 817
                </a>
              </p>
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl p-8 backdrop-blur-[14px] space-y-5"
              style={{ background: C.cardBg, border: `1px solid ${C.redBorder}` }}
              noValidate
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="fn" className={labelClass}>First Name *</label>
                  <input id="fn" type="text" placeholder="First name" required
                    value={form.firstName}
                    onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                    className={inputClass} />
                </div>
                <div>
                  <label htmlFor="ln" className={labelClass}>Last Name *</label>
                  <input id="ln" type="text" placeholder="Last name" required
                    value={form.lastName}
                    onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                    className={inputClass} />
                </div>
                <div>
                  <label htmlFor="em" className={labelClass}>Email *</label>
                  <input id="em" type="email" placeholder="your@email.com" required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className={inputClass} />
                </div>
                <div>
                  <label htmlFor="ph" className={labelClass}>Phone</label>
                  <input id="ph" type="tel" placeholder="+X XXX XXX XXX"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className={inputClass} />
                </div>
                <div>
                  <label htmlFor="pos" className={labelClass}>Position *</label>
                  <select id="pos" required
                    value={form.position}
                    onChange={(e) => setForm({ ...form, position: e.target.value })}
                    className={inputClass + " cursor-pointer"}>
                    <option value="">Select position</option>
                    {["Goalkeeper", "Defender", "Midfielder", "Winger", "Forward"].map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="age" className={labelClass}>Age *</label>
                  <input id="age" type="number" placeholder="Your age" min={16} max={40} required
                    value={form.age}
                    onChange={(e) => setForm({ ...form, age: e.target.value })}
                    className={inputClass} />
                </div>
              </div>

              <div>
                <label htmlFor="wk" className={labelClass}>Preferred Session *</label>
                <select id="wk" required
                  value={form.week}
                  onChange={(e) => setForm({ ...form, week: e.target.value })}
                  className={inputClass + " cursor-pointer"}>
                  <option value="">Select a session</option>
                  {sessions.map((s) => (
                    <option key={s.id} value={s.id}>{s.label} — {s.dates}</option>
                  ))}
                </select>
              </div>

              {error && (
                <p
                  className="text-sm rounded-xl px-4 py-3"
                  style={{ color: "#FF6666", border: "1px solid rgba(255,100,100,0.3)", background: "rgba(255,100,100,0.05)" }}
                  role="alert"
                >
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full font-bold text-xs py-4 tracking-[0.25em] uppercase transition-all rounded-full cursor-pointer disabled:opacity-60"
                style={{ background: C.red, color: "#fff" }}
                onMouseEnter={e => { if (!loading) e.currentTarget.style.background = C.redLight; }}
                onMouseLeave={e => { e.currentTarget.style.background = C.red; }}
              >
                {loading ? "Submitting…" : "Reserve My Spot"}
              </button>

              <p className="text-center text-xs" style={{ color: C.mutedDark }}>
                We&apos;ll confirm within 48 hours ·{" "}
                <a href="tel:+376615817" className="hover:underline" style={{ color: C.red }}>
                  +376 615 817
                </a>
              </p>
            </form>
          )}
        </div>
      </section>

      {/* ── 9. BOTTOM CTA BAR ───────────────────────────────────────────────────── */}
      <section
        className="py-16 px-4"
        style={{ background: "#000000", borderTop: `1px solid ${C.redBorder}` }}
      >
        <div className="max-w-xl mx-auto text-center">
          <p className="text-[10px] tracking-[0.4em] uppercase mb-4" style={{ color: C.muted }}>
            Have Questions?
          </p>
          <h3 className="font-heading text-2xl font-light mb-6" style={{ color: C.white }}>
            Talk to Us Directly
          </h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+376615817"
              className="inline-flex items-center gap-2 px-8 py-3.5 text-xs tracking-wider uppercase transition-all duration-200 rounded-full"
              style={{ border: `1px solid ${C.red}`, color: C.red }}
            >
              <Phone size={13} />
              +376 615 817
            </a>
            <button
              onClick={() => scrollToForm()}
              className="inline-flex items-center gap-2 font-bold text-xs px-8 py-3.5 tracking-[0.2em] uppercase transition-all duration-200 rounded-full group"
              style={{ background: C.red, color: "#fff" }}
              onMouseEnter={e => (e.currentTarget.style.background = C.redLight)}
              onMouseLeave={e => (e.currentTarget.style.background = C.red)}
            >
              Reserve My Spot
              <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
