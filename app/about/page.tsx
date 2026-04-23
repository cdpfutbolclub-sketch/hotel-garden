import type { Metadata } from "next";
import Link from "next/link";
import { Star, MapPin } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Hotel Garden — a 3-star hotel in Santa Coloma, Andorra la Vella.",
};

const advantages = [
  { title: "Prime Location",         desc: "Situated in Santa Coloma, at the heart of Andorra la Vella — close to ski resorts, duty-free shopping, and the Pyrenean outdoors." },
  { title: "Europe's Low-Tax Gateway", desc: "Andorra offers one of Europe's lowest corporate tax rates (10%) with no wealth or inheritance tax — a strategic destination for business travellers." },
  { title: "Mountain & Nature",      desc: "Set at roughly 1,000m altitude, surrounded by the Pyrenean mountains. Clean air, stunning scenery, and outdoor adventure right at your doorstep." },
  { title: "12M+ Tourists Per Year", desc: "Andorra attracts over 12 million tourists annually for skiing, luxury shopping, and duty-free goods — one of Europe's most visited destinations per capita." },
  { title: "Border of France & Spain", desc: "A 3-hour drive from Barcelona, 2 hours from Toulouse. Andorra is perfectly positioned between two major European countries." },
  { title: "Sports & Partnership",   desc: "Official accommodation partner of CDP Fútbol Club — hosting professional player trials, training programs, and sports events year-round." },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-hg-black">
      {/* Header */}
      <div className="pt-32 pb-16 px-4 bg-hg-surface border-b border-hg-border">
        <div className="max-w-7xl mx-auto">
          <SectionHeader eyebrow="Our Story" title="About Hotel Garden" subtitle="A 3-star hotel rooted in genuine Andorran hospitality." />
        </div>
      </div>

      <div className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Story */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
            {/* Image placeholder */}
            <div
              className="relative h-[460px] rounded-2xl overflow-hidden backdrop-blur-[14px] bg-gradient-to-br from-white/[0.07] to-white/[0.02] border border-white/10"
              style={{ background: "radial-gradient(ellipse at 40% 40%, rgba(201,168,76,0.06) 0%, rgba(28,24,20,0.95) 70%)" }}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                <div className="flex gap-2">
                  <Star size={18} className="text-hg-red fill-hg-red" />
                  <Star size={22} className="text-hg-gold fill-hg-gold" />
                  <Star size={18} className="text-[#1E5799] fill-[#1E5799]" />
                </div>
                <p className="font-heading text-hg-gold/20 text-8xl font-bold select-none">HG</p>
                <p className="text-hg-muted text-sm">Photo coming soon</p>
              </div>
            </div>

            {/* Text */}
            <div>
              <p className="text-hg-gold text-[10px] tracking-[0.35em] uppercase mb-3">Who We Are</p>
              <h2 className="font-heading text-hg-cream text-3xl sm:text-4xl mb-4 leading-tight">
                Rooted in Hospitality,<br />Built for Comfort
              </h2>
              <div className="w-12 h-px bg-hg-gold mb-6" />
              <div className="space-y-4 text-hg-muted text-base leading-relaxed">
                <p>Hotel Garden is a 3-star hotel located in Santa Coloma, the vibrant commercial heart of Andorra la Vella. We offer a warm, genuine welcome to every guest — whether you&apos;re here for the mountains, the shopping, or simply a comfortable place to rest in one of Europe&apos;s most unique destinations.</p>
                <p>Our 17 rooms are designed with comfort in mind — private balconies, clean mountain air, and that feeling of being exactly where you should be. Every stay includes a hearty buffet breakfast, free parking, and complimentary WiFi.</p>
                <p>Hotel Garden is also the official accommodation partner of CDP Fútbol Club, hosting player trials, sports events, and training programs throughout the year.</p>
              </div>
              <div className="mt-8 flex items-start gap-3">
                <MapPin size={16} className="text-hg-gold mt-0.5 shrink-0" />
                <address className="text-hg-muted text-sm not-italic leading-relaxed">
                  Avinguda d&apos;Enclar 91–93, Santa Coloma<br />Andorra la Vella, AD500
                </address>
              </div>
              <div className="mt-6 flex items-center gap-3">
                <div className="flex gap-1">
                  {[...Array(3)].map((_, i) => <Star key={i} size={14} className="text-hg-gold fill-hg-gold" />)}
                </div>
                <span className="text-hg-muted text-sm">Official 3-star classification</span>
              </div>
            </div>
          </div>

          {/* Why Andorra */}
          <div>
            <div className="text-center mb-12">
              <p className="text-hg-gold text-[10px] tracking-[0.4em] uppercase mb-3">Why Andorra</p>
              <h2 className="font-heading text-hg-cream text-3xl sm:text-4xl mb-4">The Advantages of Staying Here</h2>
              <div className="w-14 h-px bg-hg-gold mx-auto" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {advantages.map((adv, i) => (
                <div
                  key={adv.title}
                  className="rounded-2xl p-7 backdrop-blur-[14px] bg-gradient-to-br from-white/[0.07] to-white/[0.02] border border-white/10 hover:border-hg-gold/30 hover:from-white/[0.10] transition-all duration-300"
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-4 bg-hg-gold/10 border border-hg-gold/20">
                    <span className="text-hg-gold font-bold text-sm">{i + 1}</span>
                  </div>
                  <h3 className="font-heading text-hg-cream text-lg mb-2">{adv.title}</h3>
                  <p className="text-hg-muted text-sm leading-relaxed">{adv.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-20 text-center rounded-2xl p-10 backdrop-blur-[14px] bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-hg-gold/20">
            <h3 className="font-heading text-hg-cream text-3xl mb-4">Ready to Experience It?</h3>
            <p className="text-hg-muted text-base mb-8 max-w-md mx-auto">Book your stay at Hotel Garden and discover the best of Andorra.</p>
            <Link href="/booking" className="inline-block bg-hg-gold hover:bg-hg-gold-light text-hg-black font-bold text-xs px-10 py-4 tracking-[0.2em] uppercase transition-colors rounded-full">
              Book Your Stay
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
