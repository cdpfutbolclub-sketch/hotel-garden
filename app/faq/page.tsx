"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";

const faqs = [
  {
    q: "Is breakfast included in the room price?",
    a: "Yes — a full buffet breakfast is included in all room rates. Breakfast is served daily from 07:00 to 10:30.",
  },
  {
    q: "Is parking available?",
    a: "Yes, Hotel Garden offers free private outdoor parking with direct access to the hotel. No reservation needed.",
  },
  {
    q: "What are the check-in and check-out times?",
    a: "Check-in is from 14:00 and check-out is by 11:00. Early check-in or late check-out may be available — please contact us in advance.",
  },
  {
    q: "Is WiFi free?",
    a: "Yes, high-speed WiFi is available throughout the hotel at no additional cost for all guests.",
  },
  {
    q: "Do you accept credit cards?",
    a: "Yes, we accept all major credit and debit cards (Visa, Mastercard, Amex) via our secure Stripe online payment system.",
  },
  {
    q: "Is the restaurant open to non-guests?",
    a: "Yes — our restaurant and cantina is open to hotel guests and the public. Everyone is welcome for lunch and dinner.",
  },
  {
    q: "Can I use the gym as a hotel guest?",
    a: "Yes, all hotel guests have complimentary access to our fitness center. Please ask at reception for current gym hours.",
  },
  {
    q: "What is your cancellation policy?",
    a: "Please contact us directly at +376 615 817 for our cancellation policy, as it may vary by season and room type.",
  },
  {
    q: "What languages does your team speak?",
    a: "Our team speaks Catalan, Spanish, French, and English — ready to assist guests from across Europe and beyond.",
  },
  {
    q: "Do you sell ski passes?",
    a: "Yes — Hotel Garden has a ski pass sales point on-site, making it easy to hit the slopes without any extra stops.",
  },
  {
    q: "What is the Draft Week / CDP sports program?",
    a: "Hotel Garden is the official accommodation partner of CDP Fútbol Club. We host exclusive player trial weeks (Draft Weeks) where aspiring footballers can train with the club's first team. Visit our Sports page for full details.",
  },
  {
    q: "How far is the hotel from the city centre?",
    a: "Hotel Garden is located in Santa Coloma, a key district of Andorra la Vella. Shopping centres, restaurants, and attractions are just minutes away.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-2xl overflow-hidden backdrop-blur-[14px] bg-gradient-to-br from-white/[0.07] to-white/[0.02] border border-white/10 hover:border-hg-gold/30 transition-all duration-300">
      <button
        className="w-full flex items-center justify-between p-6 text-left group cursor-pointer"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span className={`text-sm font-medium transition-colors ${open ? "text-hg-gold" : "text-hg-cream group-hover:text-hg-gold"}`}>
          {q}
        </span>
        <ChevronDown
          size={16}
          className={`shrink-0 ml-4 text-hg-muted transition-transform duration-200 ${open ? "rotate-180 text-hg-gold" : ""}`}
        />
      </button>
      {open && (
        <div className="px-6 pb-6">
          <div className="w-full h-px bg-white/10 mb-4" />
          <p className="text-hg-muted text-sm leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-hg-black">
      {/* Header */}
      <div className="pt-32 pb-16 px-4 bg-hg-surface border-b border-hg-border">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            eyebrow="Help"
            title="Frequently Asked Questions"
            subtitle="Everything you need to know before your stay."
          />
        </div>
      </div>

      {/* FAQ list */}
      <div className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-3">
            {faqs.map((faq) => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>

          {/* Still have questions */}
          <div className="mt-16 rounded-2xl p-8 text-center backdrop-blur-[14px] bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-hg-gold/20">
            <h3 className="font-heading text-hg-cream text-2xl mb-3">Still Have Questions?</h3>
            <p className="text-hg-muted text-sm mb-6">
              Our team is available 24 hours a day to assist you.
            </p>
            <a
              href="tel:+376615817"
              className="inline-block bg-hg-gold hover:bg-hg-gold-light text-hg-black font-bold text-xs px-8 py-3 tracking-wider uppercase transition-colors rounded-full"
            >
              Call Us · +376 615 817
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
