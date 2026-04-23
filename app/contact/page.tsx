"use client";

import { useState } from "react";
import { Phone, MapPin, CheckCircle } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      if (!res.ok) throw new Error("Failed");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please call us at +376 615 817.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full bg-white/5 border border-white/10 rounded-xl text-hg-cream placeholder-hg-muted px-4 py-3 focus:border-hg-gold outline-none transition-colors duration-200 text-sm";
  const labelClass = "block text-hg-muted text-[10px] tracking-[0.25em] uppercase mb-2";

  return (
    <div className="min-h-screen bg-hg-black">
      <div className="pt-32 pb-16 px-4 bg-hg-surface border-b border-hg-border">
        <div className="max-w-7xl mx-auto">
          <SectionHeader eyebrow="Get in Touch" title="Contact Us" subtitle="We're always happy to help. Reach out by phone or send us a message." />
        </div>
      </div>

      <div className="py-20 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact info */}
          <div>
            <p className="text-hg-gold text-[10px] tracking-[0.35em] uppercase mb-5">Reach Us</p>
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-4 rounded-2xl p-5 backdrop-blur-[14px] bg-gradient-to-br from-white/[0.07] to-white/[0.02] border border-white/10">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-hg-gold/10 border border-hg-gold/20">
                  <Phone size={16} className="text-hg-gold" />
                </div>
                <div>
                  <p className="text-hg-muted text-xs tracking-wider uppercase mb-1">Phone</p>
                  <a href="tel:+376615817" className="text-hg-cream hover:text-hg-gold text-base font-medium transition-colors">+376 615 817</a>
                </div>
              </div>
              <div className="flex items-start gap-4 rounded-2xl p-5 backdrop-blur-[14px] bg-gradient-to-br from-white/[0.07] to-white/[0.02] border border-white/10">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-1 bg-hg-gold/10 border border-hg-gold/20">
                  <MapPin size={16} className="text-hg-gold" />
                </div>
                <div>
                  <p className="text-hg-muted text-xs tracking-wider uppercase mb-1">Address</p>
                  <address className="text-hg-cream text-sm not-italic leading-relaxed">
                    Avinguda d&apos;Enclar 91–93<br />Santa Coloma, Andorra la Vella<br />AD500, Andorra
                  </address>
                </div>
              </div>
            </div>

            <div className="rounded-2xl p-6 backdrop-blur-[14px] bg-gradient-to-br from-white/[0.07] to-white/[0.02] border border-white/10">
              <p className="text-hg-cream font-semibold text-sm mb-3">Reception Hours</p>
              <p className="text-hg-muted text-sm leading-relaxed">
                Our reception is available <strong className="text-hg-cream">24 hours a day</strong>, 7 days a week. For urgent matters, please call us directly.
              </p>
            </div>
          </div>

          {/* Form */}
          <div>
            {submitted ? (
              <div className="rounded-2xl p-10 text-center h-full flex flex-col items-center justify-center backdrop-blur-[14px] bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-hg-gold/30">
                <CheckCircle className="text-hg-gold mb-4" size={48} />
                <h3 className="font-heading text-hg-cream text-2xl mb-3">Message Sent!</h3>
                <p className="text-hg-muted text-sm leading-relaxed">
                  Thank you for reaching out. We&apos;ll get back to you as soon as possible. For urgent requests, please call <a href="tel:+376615817" className="text-hg-gold hover:underline">+376 615 817</a>.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className={labelClass}>Full Name *</label>
                    <input id="name" type="text" placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} required />
                  </div>
                  <div>
                    <label htmlFor="cemail" className={labelClass}>Email *</label>
                    <input id="cemail" type="email" placeholder="your@email.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} required />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className={labelClass}>Subject</label>
                  <input id="subject" type="text" placeholder="What is this about?" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className={inputClass} />
                </div>
                <div>
                  <label htmlFor="message" className={labelClass}>Message *</label>
                  <textarea id="message" rows={6} placeholder="Your message…" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className={inputClass + " resize-none"} required />
                </div>
                {error && <p className="text-red-400 text-sm border border-red-400/30 bg-red-400/5 rounded-xl px-4 py-3" role="alert">{error}</p>}
                <button type="submit" disabled={loading} className="w-full bg-hg-gold hover:bg-hg-gold-light disabled:opacity-60 text-hg-black font-bold text-xs py-4 tracking-[0.2em] uppercase transition-colors rounded-full cursor-pointer">
                  {loading ? "Sending…" : "Send Message"}
                </button>
                <p className="text-hg-muted text-xs text-center">We typically respond within 24 hours.</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
