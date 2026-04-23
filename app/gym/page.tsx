import type { Metadata } from "next";
import { Check } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";

export const metadata: Metadata = {
  title: "Gym & Fitness",
  description: "Stay active at Hotel Garden's fully equipped fitness center. Available to hotel guests and CDP Fútbol Club athletes.",
};

const equipment = [
  "Cardio machines (treadmills, bikes)",
  "Free weights & dumbbell rack",
  "Resistance training equipment",
  "Stretching & flexibility area",
  "Functional training zone",
];

const whoCanUse = [
  { title: "Hotel Guests",           desc: "All Hotel Garden guests have complimentary access to the fitness center during their stay. No additional cost, no reservation needed.", badge: "Complimentary" },
  { title: "CDP Fútbol Club Athletes", desc: "The gym is the official training facility for CDP FC players during trial weeks and events. Professional equipment to support performance.", badge: "Official Partner" },
];

export default function GymPage() {
  return (
    <div className="min-h-screen bg-hg-black">
      <div className="pt-32 pb-16 px-4 bg-hg-surface border-b border-hg-border">
        <div className="max-w-7xl mx-auto">
          <SectionHeader eyebrow="Wellness" title="Gym & Fitness Center" subtitle="Stay active and energised. Our fitness center is available to hotel guests and CDP Fútbol Club athletes." />
        </div>
      </div>

      <div className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-20">
            {/* Image placeholder */}
            <div
              className="relative h-96 rounded-2xl overflow-hidden backdrop-blur-[14px] bg-gradient-to-br from-white/[0.07] to-white/[0.02] border border-white/10"
              style={{ background: "radial-gradient(ellipse at 40% 50%, rgba(201,168,76,0.05) 0%, rgba(28,24,20,0.95) 70%)" }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-hg-muted text-sm">Photo coming soon</p>
              </div>
            </div>

            {/* Equipment list */}
            <div>
              <p className="text-hg-gold text-[10px] tracking-[0.35em] uppercase mb-3">Equipment</p>
              <h2 className="font-heading text-hg-cream text-3xl mb-4">Everything You Need<br />to Perform</h2>
              <div className="w-12 h-px bg-hg-gold mb-5" />
              <p className="text-hg-muted leading-relaxed mb-7">
                Our fitness center is equipped to support both leisure guests and serious athletes. Whether you&apos;re maintaining your routine or preparing for a match, the gym has you covered.
              </p>
              <ul className="space-y-3 mb-8">
                {equipment.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-hg-muted text-sm">
                    <Check size={14} className="text-hg-gold shrink-0" /> {item}
                  </li>
                ))}
              </ul>
              <div className="rounded-2xl p-5 backdrop-blur-[14px] bg-gradient-to-br from-white/[0.07] to-white/[0.02] border border-white/10">
                <p className="text-hg-muted text-xs leading-relaxed">
                  <span className="text-hg-cream font-semibold">Gym hours:</span> Available during hotel operating hours. Check with reception for specific times. Access is complimentary for all registered hotel guests.
                </p>
              </div>
            </div>
          </div>

          {/* Who can use */}
          <div>
            <p className="text-hg-gold text-[10px] tracking-[0.35em] uppercase text-center mb-8">Access</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {whoCanUse.map((item) => (
                <div key={item.title} className="rounded-2xl p-8 backdrop-blur-[14px] bg-gradient-to-br from-white/[0.07] to-white/[0.02] border border-white/10 hover:border-hg-gold/30 transition-all duration-300">
                  <div className="inline-block rounded-full bg-hg-gold/10 border border-hg-gold/30 text-hg-gold text-[10px] px-3 py-1 tracking-wider uppercase mb-4">
                    {item.badge}
                  </div>
                  <h3 className="font-heading text-hg-cream text-xl mb-3">{item.title}</h3>
                  <p className="text-hg-muted text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
