"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, CheckCircle, Calendar, Users, Dumbbell, Phone } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";

const included = [
  "7-night accommodation at Hotel Garden",
  "Full board: breakfast, lunch, afternoon snack, dinner",
  "Training sessions with CDP FC first team",
  "Friendly match participation",
  "Official CDP training kit",
  "Club bag provided",
  "Gym & fitness center access",
  "Local transportation",
  "Technical & tactical coaching sessions",
];

const schedule = [
  { day: "Monday", sessions: ["Morning session"] },
  { day: "Tuesday", sessions: ["Morning session", "Afternoon session"] },
  { day: "Wednesday", sessions: ["Morning session", "Afternoon session"] },
  { day: "Thursday", sessions: ["Morning session", "Afternoon session"] },
  { day: "Friday", sessions: ["Morning session", "Afternoon session"] },
  { day: "Saturday", sessions: ["Friendly match"] },
  { day: "Sunday", sessions: ["Rest / Departure"] },
];

export default function SportsPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    position: "",
    age: "",
    nationality: "",
    week: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
    "w-full bg-white/5 border border-white/10 rounded-xl text-hg-cream placeholder-hg-muted px-4 py-3 focus:border-hg-gold outline-none transition-colors duration-200 text-sm";
  const labelClass = "block text-hg-muted text-[10px] tracking-[0.25em] uppercase mb-2";

  return (
    <div className="min-h-screen bg-hg-black">
      {/* Header */}
      <div className="pt-32 pb-16 px-4 bg-hg-surface border-b border-hg-border">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            eyebrow="CDP Fútbol Club × Hotel Garden"
            title="Sports Package"
            subtitle="Professional football trial weeks in Andorra. Train, compete, and live the experience."
          />
        </div>
      </div>

      <div className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Intro */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20 items-start">
            <div>
              <p className="text-hg-gold text-[10px] tracking-[0.35em] uppercase mb-3">The Program</p>
              <h2 className="font-heading text-hg-cream text-3xl sm:text-4xl mb-4 leading-tight">
                A Week That Can<br />Change Everything
              </h2>
              <div className="w-12 h-px bg-hg-gold mb-6" />
              <div className="space-y-4 text-hg-muted text-sm leading-relaxed">
                <p>
                  Hotel Garden is the official accommodation partner of CDP Fútbol Club —
                  a professional football club based in Andorra la Vella, competing in the
                  Andorran Segona Divisió with European ambitions.
                </p>
                <p>
                  The Draft Week program invites selected players from around the world to
                  join a one-week immersive trial with the club&apos;s first team. Train with
                  professionals, play in friendly matches, and showcase your talent in the
                  heart of the Pyrenees.
                </p>
                <p>
                  The complete package — accommodation, full board, training, and kit — is
                  organised in collaboration with Hotel Garden, your home for the week.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-3">
                <div className="rounded-2xl p-4 text-center backdrop-blur-[14px] bg-gradient-to-br from-white/[0.07] to-white/[0.02] border border-white/10">
                  <Calendar size={20} className="text-hg-gold mx-auto mb-2" />
                  <p className="text-hg-cream font-semibold text-sm">1 Week</p>
                  <p className="text-hg-muted text-xs">Intensive program</p>
                </div>
                <div className="rounded-2xl p-4 text-center backdrop-blur-[14px] bg-gradient-to-br from-white/[0.07] to-white/[0.02] border border-white/10">
                  <Dumbbell size={20} className="text-hg-gold mx-auto mb-2" />
                  <p className="text-hg-cream font-semibold text-sm">9x Sessions</p>
                  <p className="text-hg-muted text-xs">Training + match</p>
                </div>
                <div className="rounded-2xl p-4 text-center backdrop-blur-[14px] bg-gradient-to-br from-white/[0.07] to-white/[0.02] border border-white/10">
                  <Users size={20} className="text-hg-gold mx-auto mb-2" />
                  <p className="text-hg-cream font-semibold text-sm">First Team</p>
                  <p className="text-hg-muted text-xs">Train alongside pros</p>
                </div>
                <div className="rounded-2xl p-4 text-center backdrop-blur-[14px] bg-gradient-to-br from-white/[0.07] to-white/[0.02] border border-white/10">
                  <p className="text-hg-gold font-bold text-2xl font-heading">€500</p>
                  <p className="text-hg-muted text-xs">Full package</p>
                </div>
              </div>
            </div>

            {/* What's included */}
            <div className="rounded-2xl p-8 backdrop-blur-[14px] bg-gradient-to-br from-white/[0.10] to-white/[0.03] border border-hg-gold/30">
              <p className="text-hg-gold text-[10px] tracking-[0.35em] uppercase mb-5">What&apos;s Included</p>
              <ul className="space-y-3 mb-8">
                {included.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-hg-muted text-sm">
                    <Check size={14} className="text-hg-gold shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="border-t border-white/10 pt-6">
                <p className="text-hg-muted text-xs mb-1">Total package price</p>
                <p className="text-hg-gold font-bold text-4xl font-heading">€500</p>
                <p className="text-hg-muted text-xs mt-1">Per player · All inclusive</p>
              </div>
            </div>
          </div>

          {/* Schedule */}
          <div className="mb-20">
            <div className="text-center mb-10">
              <p className="text-hg-gold text-[10px] tracking-[0.4em] uppercase mb-3">Programme</p>
              <h2 className="font-heading text-hg-cream text-3xl mb-4">Weekly Schedule</h2>
              <div className="w-12 h-px bg-hg-gold mx-auto" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
              {schedule.map((day) => (
                <div key={day.day} className="rounded-2xl p-4 text-center backdrop-blur-[14px] bg-gradient-to-br from-white/[0.07] to-white/[0.02] border border-white/10 hover:border-hg-gold/30 transition-all duration-300">
                  <p className="text-hg-gold text-[10px] tracking-wider uppercase mb-3 font-semibold">
                    {day.day}
                  </p>
                  <div className="space-y-1.5">
                    {day.sessions.map((s) => (
                      <p key={s} className="text-hg-muted text-xs rounded-lg bg-white/5 border border-white/10 px-2 py-1.5">
                        {s}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Application Form */}
          <div id="apply" className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <p className="text-hg-gold text-[10px] tracking-[0.35em] uppercase mb-3">Apply Now</p>
              <h2 className="font-heading text-hg-cream text-3xl mb-4">Submit Your Application</h2>
              <div className="w-12 h-px bg-hg-gold mb-6" />
              <p className="text-hg-muted text-sm leading-relaxed mb-6">
                Fill in the form and our team will review your application and get back to you
                within 48 hours. Spots are limited for each week.
              </p>
              <Link href="/draft-week" className="text-hg-gold hover:text-hg-gold-light text-sm underline underline-offset-4 transition-colors">
                View Draft Week Dates →
              </Link>
            </div>

            {submitted ? (
              <div className="rounded-2xl p-10 text-center flex flex-col items-center justify-center backdrop-blur-[14px] bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-hg-gold/30">
                <CheckCircle className="text-hg-gold mb-4" size={48} />
                <h3 className="font-heading text-hg-cream text-2xl mb-3">Application Received!</h3>
                <p className="text-hg-muted text-sm leading-relaxed">
                  We&apos;ll review your application and contact you within 48 hours. Questions?
                  Call <a href="tel:+376615817" className="text-hg-gold hover:underline">+376 615 817</a>
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="sfn" className={labelClass}>First Name *</label>
                    <input id="sfn" type="text" placeholder="First name" value={form.firstName}
                      onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                      className={inputClass} required />
                  </div>
                  <div>
                    <label htmlFor="sln" className={labelClass}>Last Name *</label>
                    <input id="sln" type="text" placeholder="Last name" value={form.lastName}
                      onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                      className={inputClass} required />
                  </div>
                  <div>
                    <label htmlFor="semail" className={labelClass}>Email *</label>
                    <input id="semail" type="email" placeholder="your@email.com" value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className={inputClass} required />
                  </div>
                  <div>
                    <label htmlFor="sphone" className={labelClass}>Phone</label>
                    <input id="sphone" type="tel" placeholder="+X XXX XXX XXX" value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className={inputClass} />
                  </div>
                  <div>
                    <label htmlFor="sposition" className={labelClass}>Position *</label>
                    <select id="sposition" value={form.position}
                      onChange={(e) => setForm({ ...form, position: e.target.value })}
                      className={inputClass + " cursor-pointer"} required>
                      <option value="">Select position</option>
                      {["Goalkeeper", "Defender", "Midfielder", "Forward", "Winger"].map(p => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="sage" className={labelClass}>Age *</label>
                    <input id="sage" type="number" placeholder="Your age" min={16} max={40}
                      value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })}
                      className={inputClass} required />
                  </div>
                  <div>
                    <label htmlFor="snat" className={labelClass}>Nationality *</label>
                    <input id="snat" type="text" placeholder="Your nationality" value={form.nationality}
                      onChange={(e) => setForm({ ...form, nationality: e.target.value })}
                      className={inputClass} required />
                  </div>
                  <div>
                    <label htmlFor="sweek" className={labelClass}>Preferred Week *</label>
                    <select id="sweek" value={form.week}
                      onChange={(e) => setForm({ ...form, week: e.target.value })}
                      className={inputClass + " cursor-pointer"} required>
                      <option value="">Select a week</option>
                      <option value="week1">Week 1 — June 29 – July 5, 2026</option>
                      <option value="week2">Week 2 — July 6 – July 11, 2026</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="smessage" className={labelClass}>Additional Info</label>
                  <textarea id="smessage" rows={4} placeholder="Tell us about your experience, current club, etc."
                    value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className={inputClass + " resize-none"} />
                </div>
                {error && (
                  <p className="text-red-400 text-sm border border-red-400/30 bg-red-400/5 rounded-xl px-4 py-3" role="alert">
                    {error}
                  </p>
                )}
                <button type="submit" disabled={loading}
                  className="w-full bg-hg-gold hover:bg-hg-gold-light disabled:opacity-60 text-hg-black font-bold text-xs py-4 tracking-[0.2em] uppercase transition-colors rounded-full cursor-pointer">
                  {loading ? "Submitting…" : "Submit Application"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
