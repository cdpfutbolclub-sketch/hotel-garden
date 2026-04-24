"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check, CheckCircle, Calendar, ChevronDown,
  Phone, ArrowRight, Users, Shield, Mountain, MessageCircle, Star,
  Utensils, Dumbbell, PlayCircle, Zap, Activity, Coffee,
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

// WhatsApp
const WA_HREF = `https://wa.me/376615817?text=${encodeURIComponent("Hi, I'm interested in the Draft Week 2026 program. Can you tell me more?")}`;

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
  "Written scouting report from coaching staff",
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
  { value: "Direct",      label: "No agents needed" },
  { value: "UEFA",        label: "European pathway" },
  { value: "12 Players",  label: "Max per session" },
  { value: "€500",        label: "All-inclusive" },
  { value: "6 Days",      label: "To change everything" },
];

// ── Why Andorra ───────────────────────────────────────────────────────────────
const whyAndorra = [
  {
    Icon: Shield,
    title: "UEFA Member Nation",
    body: "Andorra competes in UEFA European qualifiers. A contract here is professional European football — not a dead-end league with no pathway forward.",
  },
  {
    Icon: Users,
    title: "No Agents. Direct Access.",
    body: "Agencies charge €3,000–€10,000 to place players at trials. This program gives you direct contact with the coaching staff. €500, everything included.",
  },
  {
    Icon: Mountain,
    title: "Focus Without Distraction",
    body: "Training in the Pyrenees means no city noise, no distractions. Just you, the ball, and 6 days to prove yourself to a real professional club.",
  },
];

// ── The Pathway ───────────────────────────────────────────────────────────────
const pathway = [
  { step: "01", title: "Apply",    body: "Submit your details. Our team confirms your spot within 48 hours. Sessions fill fast — first come, first served." },
  { step: "02", title: "Train",    body: "6 days. 9+ sessions. Train alongside CDP's first team under licensed coaches who are watching every minute." },
  { step: "03", title: "Evaluate", body: "Every player receives a written technical scouting report from our coaching staff — honest, detailed, signed." },
  { step: "04", title: "The Talk", body: "Players who meet the level enter a direct conversation with the club about contracts, loans, or ongoing trials." },
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
    <div className="min-h-screen overflow-x-hidden pb-20 sm:pb-0" style={{ background: C.black }}>

      {/* ── 1. HERO ─────────────────────────────────────────────────────────────── */}
      <section
        className="relative min-h-screen flex flex-col justify-center px-4 pt-20 pb-12 sm:pt-24 sm:pb-20"
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
            No agents. No middlemen. Just 6 days to show what you can do —
            in front of a professional club with a real European pathway.
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

          {/* Social proof line */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-[11px] tracking-[0.25em] uppercase mb-10"
            style={{ color: C.mutedDark }}
          >
            ✦ Max 12 players per session · Applications open now
          </motion.p>

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

      {/* ── 3. WHY ANDORRA ──────────────────────────────────────────────────────── */}
      <section className="py-14 sm:py-20 px-4" style={{ background: BG.dark }}>
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <p className="text-[10px] tracking-[0.4em] uppercase mb-3" style={{ color: C.red }}>The Advantage</p>
            <h2 className="font-heading text-3xl sm:text-4xl font-extralight" style={{ color: C.white }}>
              Why Andorra. Why CDP.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {whyAndorra.map(({ Icon, title, body }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl p-6 backdrop-blur-[14px]"
                style={{ background: C.cardBg, border: `1px solid ${C.redBorder}` }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center mb-4"
                  style={{ background: "rgba(204,17,0,0.1)", border: `1px solid ${C.redBorder}` }}
                >
                  <Icon size={18} style={{ color: C.red }} />
                </div>
                <h3 className="font-semibold text-sm mb-2" style={{ color: C.white }}>{title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: C.muted }}>{body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. AVAILABLE DATES ──────────────────────────────────────────────────── */}
      <section id="dates" className="py-14 sm:py-24 px-4" style={{ background: BG.accent }}>
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

      {/* ── 5. THE PATHWAY ──────────────────────────────────────────────────────── */}
      <section className="py-14 sm:py-20 px-4" style={{ background: BG.accent }}>
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-[10px] tracking-[0.4em] uppercase mb-3" style={{ color: C.red }}>After the Trial</p>
            <h2 className="font-heading text-3xl sm:text-4xl font-extralight mb-4" style={{ color: C.white }}>
              The Pathway to Professional Football
            </h2>
            <p className="text-sm max-w-lg mx-auto" style={{ color: C.muted }}>
              This isn&apos;t a holiday camp. Every step has a purpose.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {pathway.map(({ step, title, body }, i) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative rounded-2xl p-6 backdrop-blur-[14px]"
                style={{ background: C.cardBg, border: `1px solid ${C.redBorder}` }}
              >
                <p
                  className="font-heading text-4xl font-extralight mb-3 leading-none"
                  style={{ color: "rgba(204,17,0,0.2)" }}
                >
                  {step}
                </p>
                <h3 className="font-bold text-sm mb-2" style={{ color: C.white }}>{title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: C.muted }}>{body}</p>
                {i < pathway.length - 1 && (
                  <div
                    className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-px"
                    style={{ background: C.red }}
                  />
                )}
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-xs italic"
            style={{ color: C.mutedDark }}
          >
            &ldquo;We don&apos;t promise contracts. We promise honest evaluation and a real conversation —
            which is more than most agencies give you.&rdquo;
          </motion.p>
        </div>
      </section>

      {/* ── 6. THE CLUB — CREDIBILITY ────────────────────────────────────────────── */}
      <section className="py-14 sm:py-24 px-4" style={{ background: BG.dark }}>
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
            <div
              className="mt-8 rounded-2xl p-5 text-center backdrop-blur-[14px]"
              style={{ background: "rgba(204,17,0,0.05)", border: `1px solid ${C.redBorder}` }}
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <Star size={13} style={{ color: C.red }} />
                <p className="text-xs font-semibold tracking-wider uppercase" style={{ color: C.white }}>
                  Written Scouting Report
                </p>
                <Star size={13} style={{ color: C.red }} />
              </div>
              <p className="text-xs leading-relaxed" style={{ color: C.muted }}>
                Every player receives a detailed written technical report signed by the coaching staff.
                Honest. Specific. Yours to keep — regardless of outcome.
              </p>
            </div>
            <p className="text-center text-xs mt-4 opacity-30" style={{ color: C.muted }}>
              Full coach bios and photos coming before launch
            </p>
          </div>
        </div>
      </section>

      {/* ── 5. WHAT'S INCLUDED ──────────────────────────────────────────────────── */}
      <section className="py-14 sm:py-24 px-4" style={{ background: BG.accent }}>
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
            className="rounded-2xl p-5 sm:p-8 backdrop-blur-[14px]"
            style={{
              background: "rgba(204,17,0,0.05)",
              border: `1px solid ${C.redBorderHi}`,
            }}
          >
            <ul className="space-y-3 mb-6">
              {included.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm" style={{ color: C.muted }}>
                  <Check size={14} className="shrink-0 mt-0.5" style={{ color: C.red }} />
                  {item}
                </li>
              ))}
            </ul>

            {/* Price comparison */}
            <div
              className="rounded-xl p-4 mb-6 text-xs"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <p className="text-[10px] tracking-[0.3em] uppercase mb-3" style={{ color: C.mutedDark }}>
                vs. going through an agent
              </p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  ["Agent placement fee", "€3,000–€10,000", "Draft Week"],
                  ["Accommodation", "Extra", "Included"],
                  ["Meals", "Extra", "Included"],
                  ["Scouting report", "Rarely", "Every player"],
                  ["Total cost", "€5,000+", "€500"],
                ].map(([label, agent, us]) => (
                  <div key={label} className="contents">
                    <div style={{ color: C.mutedDark }} className="col-span-1">{label}</div>
                    <div className="col-span-1 flex gap-3">
                      <span className="line-through opacity-40" style={{ color: C.muted }}>{agent}</span>
                      <span className="font-semibold" style={{ color: us === "€500" ? C.gold : C.red }}>{us}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div
              className="pt-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
              style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
            >
              <div>
                <p className="text-xs mb-1" style={{ color: C.muted }}>Complete package</p>
                <p className="font-heading text-5xl font-extralight" style={{ color: C.gold }}>€500</p>
                <p className="text-xs mt-1" style={{ color: C.muted }}>Per player · All inclusive</p>
              </div>
              <button
                onClick={() => scrollToForm()}
                className="inline-flex items-center justify-center gap-2 font-bold text-xs w-full sm:w-auto px-6 py-3 tracking-[0.2em] uppercase transition-all duration-200 rounded-full group"
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
      <section className="py-14 sm:py-24 px-4" style={{ background: BG.dark }}>
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

          {/* Visual Schedule Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="overflow-x-auto rounded-2xl"
            style={{ border: `1px solid ${C.redBorder}` }}
          >
            <table style={{ minWidth: 560, width: "100%", borderCollapse: "collapse" }}>
              {/* Header */}
              <thead>
                <tr style={{ background: C.red }}>
                  <th className="text-[10px] font-bold tracking-[0.2em] uppercase py-3 px-4 text-left w-16"
                    style={{ color: "rgba(255,255,255,0.7)", borderRight: "1px solid rgba(255,255,255,0.15)" }}>
                    TIME
                  </th>
                  {["MON","TUE","WED","THU","FRI"].map(d => (
                    <th key={d} className="text-[10px] font-bold tracking-[0.2em] uppercase py-3 px-2 text-center"
                      style={{ color: C.white, borderRight: "1px solid rgba(255,255,255,0.15)" }}>
                      {d}
                    </th>
                  ))}
                  <th className="text-[10px] font-extrabold tracking-[0.2em] uppercase py-3 px-2 text-center"
                    style={{ color: C.white, background: "rgba(0,0,0,0.3)" }}>
                    SAT<br />
                    <span className="font-normal opacity-70 text-[8px]">MATCH</span>
                  </th>
                </tr>
              </thead>

              <tbody>
                {/* 08:30 Breakfast */}
                <tr style={{ borderBottom: `1px solid ${C.redBorder}` }}>
                  <td className="py-3 px-4 text-[11px] font-mono font-semibold"
                    style={{ color: C.muted, borderRight: `1px solid ${C.redBorder}` }}>
                    08:30
                  </td>
                  <td colSpan={6} className="py-3 px-4 text-xs text-center font-medium"
                    style={{ color: C.white }}>
                    Breakfast
                  </td>
                </tr>

                {/* 09:30 Gym */}
                <tr style={{ borderBottom: `1px solid ${C.redBorder}`, background: "rgba(255,255,255,0.02)" }}>
                  <td className="py-3 px-4 text-[11px] font-mono font-semibold"
                    style={{ color: C.muted, borderRight: `1px solid ${C.redBorder}` }}>
                    09:30
                  </td>
                  <td colSpan={5} className="py-3 px-4 text-xs text-center font-medium"
                    style={{ color: C.white, borderRight: `1px solid ${C.redBorder}` }}>
                    Gym Session
                  </td>
                  <td className="py-3 px-2 text-[10px] text-center"
                    style={{ color: C.muted }}>
                    Rest
                  </td>
                </tr>

                {/* 10:30 Video Analysis */}
                <tr style={{ borderBottom: `1px solid ${C.redBorder}` }}>
                  <td className="py-3 px-4 text-[11px] font-mono font-semibold"
                    style={{ color: C.muted, borderRight: `1px solid ${C.redBorder}` }}>
                    10:30
                  </td>
                  <td colSpan={5} className="py-3 px-4 text-xs text-center font-medium"
                    style={{ color: C.white, borderRight: `1px solid ${C.redBorder}` }}>
                    Video Analysis
                  </td>
                  <td className="py-3 px-2 text-[10px] text-center"
                    style={{ color: C.muted }}>
                    Rest
                  </td>
                </tr>

                {/* 11:30 TRAINING SESSION — red highlight */}
                <tr style={{ borderBottom: `1px solid rgba(255,255,255,0.15)` }}>
                  <td className="py-4 px-4 text-[11px] font-mono font-bold"
                    style={{ color: C.white, background: C.redDark, borderRight: "1px solid rgba(255,255,255,0.15)" }}>
                    11:30
                  </td>
                  <td colSpan={5} className="py-4 px-4 text-xs text-center font-extrabold tracking-widest uppercase"
                    style={{ color: C.white, background: C.red, borderRight: "1px solid rgba(255,255,255,0.2)" }}>
                    Training Session
                  </td>
                  <td className="py-4 px-2 text-[10px] text-center font-bold tracking-wide uppercase leading-tight"
                    style={{ color: C.white, background: "#7A0000" }}>
                    Friendly<br />Match
                  </td>
                </tr>

                {/* 13:00 Stretching */}
                <tr style={{ borderBottom: `1px solid ${C.redBorder}`, background: "rgba(255,255,255,0.02)" }}>
                  <td className="py-3 px-4 text-[11px] font-mono font-semibold"
                    style={{ color: C.muted, borderRight: `1px solid ${C.redBorder}` }}>
                    13:00
                  </td>
                  <td colSpan={5} className="py-3 px-4 text-xs text-center font-medium"
                    style={{ color: C.white, borderRight: `1px solid ${C.redBorder}` }}>
                    Stretching &amp; Recovery
                  </td>
                  <td className="py-3 px-2 text-[10px] text-center"
                    style={{ color: C.muted }}>
                    —
                  </td>
                </tr>

                {/* 14:00 Lunch */}
                <tr>
                  <td className="py-3 px-4 text-[11px] font-mono font-semibold"
                    style={{ color: C.muted, borderRight: `1px solid ${C.redBorder}` }}>
                    14:00
                  </td>
                  <td colSpan={5} className="py-3 px-4 text-xs text-center font-medium"
                    style={{ color: C.white, borderRight: `1px solid ${C.redBorder}` }}>
                    Lunch · Free Afternoon
                  </td>
                  <td className="py-3 px-2 text-[10px] text-center font-semibold"
                    style={{ color: C.muted }}>
                    Departure
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Bottom info bar */}
            <div
              className="flex flex-col sm:flex-row items-center justify-between gap-3 px-5 py-4"
              style={{ background: C.red }}
            >
              <div className="flex items-center gap-2">
                <Calendar size={14} style={{ color: C.white }} />
                <span className="text-xs font-semibold tracking-wide" style={{ color: C.white }}>
                  Arrive Sunday evening · Depart Saturday after the match
                </span>
              </div>
              <button
                onClick={() => scrollToForm()}
                className="shrink-0 text-[11px] font-bold tracking-widest uppercase px-5 py-2 rounded-full transition-colors"
                style={{ background: C.white, color: C.red }}
              >
                Limited Spots — Apply Now
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 7. FAQ ──────────────────────────────────────────────────────────────── */}
      <section className="py-14 sm:py-24 px-4" style={{ background: BG.accent }}>
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
        className="py-14 sm:py-24 px-4"
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
              className="rounded-2xl p-5 sm:p-8 backdrop-blur-[14px] space-y-5"
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

              <div className="flex items-center justify-center gap-3 flex-wrap">
                <p className="text-center text-xs" style={{ color: C.mutedDark }}>
                  We&apos;ll confirm within 48 hours ·{" "}
                  <a href="tel:+376615817" className="hover:underline" style={{ color: C.red }}>
                    +376 615 817
                  </a>
                </p>
                <span style={{ color: C.mutedDark }} className="text-xs opacity-40">or</span>
                <a
                  href={WA_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs hover:underline"
                  style={{ color: "#25D366" }}
                >
                  <MessageCircle size={13} />
                  WhatsApp us
                </a>
              </div>
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
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={WA_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-xs tracking-wider uppercase transition-all duration-200 rounded-full font-semibold"
              style={{ background: "#25D366", color: "#fff" }}
            >
              <MessageCircle size={13} />
              WhatsApp
            </a>
            <a
              href="tel:+376615817"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-xs tracking-wider uppercase transition-all duration-200 rounded-full"
              style={{ border: `1px solid ${C.red}`, color: C.red }}
            >
              <Phone size={13} />
              +376 615 817
            </a>
            <button
              onClick={() => scrollToForm()}
              className="inline-flex items-center justify-center gap-2 font-bold text-xs px-7 py-3.5 tracking-[0.2em] uppercase transition-all duration-200 rounded-full group"
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

      {/* ── STICKY MOBILE CTA BAR ────────────────────────────────────────────────── */}
      <div className="fixed bottom-0 left-0 right-0 z-50 sm:hidden"
        style={{ background: "rgba(8,8,8,0.95)", borderTop: `1px solid ${C.redBorder}`, backdropFilter: "blur(16px)" }}
      >
        <div className="flex gap-2 px-4 py-3">
          <a
            href={WA_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full text-xs font-semibold tracking-wider uppercase"
            style={{ background: "#25D366", color: "#fff" }}
          >
            <MessageCircle size={14} />
            WhatsApp
          </a>
          <button
            onClick={() => scrollToForm()}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full text-xs font-bold tracking-[0.2em] uppercase"
            style={{ background: C.red, color: "#fff" }}
          >
            Reserve
            <ArrowRight size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}
