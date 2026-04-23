import type { Metadata } from "next";
import { MapPin, Phone, Car, Train } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import MapWrapper from "@/components/location/MapWrapper";

export const metadata: Metadata = {
  title: "Location & How to Get Here",
  description:
    "Hotel Garden is located at Avinguda d'Enclar 91–93, Santa Coloma, Andorra la Vella. Find us on the map and get directions.",
};

const directions = [
  {
    icon: Car,
    from: "From Barcelona",
    detail: "~3 hours via N-145 through La Seu d'Urgell. Enter Andorra at the Sant Julià de Lòria border.",
  },
  {
    icon: Car,
    from: "From Toulouse",
    detail: "~2.5 hours via D820 through Tarascon-sur-Ariège. Enter Andorra at the Pas de la Casa border.",
  },
  {
    icon: Train,
    from: "By Train + Bus",
    detail: "Train to L'Hospitalet-près-l'Andorre or Latour-de-Carol, then direct bus to Andorra la Vella.",
  },
];

export default function LocationPage() {
  return (
    <div className="min-h-screen bg-hg-black">
      {/* Header */}
      <div className="pt-32 pb-16 px-4 bg-hg-surface border-b border-hg-border">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            eyebrow="Find Us"
            title="Location"
            subtitle="Hotel Garden is in the heart of Santa Coloma — easy to reach, impossible to forget."
          />
        </div>
      </div>

      {/* Map */}
      <div className="px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <MapWrapper />

          {/* Address + Get Directions */}
          <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl backdrop-blur-[14px] bg-gradient-to-br from-white/[0.07] to-white/[0.02] border border-white/10 px-6 py-5">
            <div className="flex items-start gap-3">
              <MapPin size={16} className="text-hg-gold mt-0.5 shrink-0" />
              <address className="text-hg-cream text-sm not-italic leading-relaxed">
                <strong>Hotel Garden</strong> · Avinguda d&apos;Enclar 91–93, Santa Coloma, Andorra la Vella AD500
              </address>
            </div>
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=42.509,1.5202"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 bg-hg-gold hover:bg-hg-gold-light text-hg-black font-bold text-xs px-6 py-2.5 tracking-wider uppercase transition-colors rounded-full"
            >
              Get Directions
            </a>
          </div>
        </div>
      </div>

      {/* Contact + Directions */}
      <div className="py-16 px-4 bg-hg-surface border-t border-hg-border">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact */}
            <div>
              <p className="text-hg-gold text-[10px] tracking-[0.35em] uppercase mb-5">Contact</p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone size={14} className="text-hg-gold shrink-0" />
                  <a href="tel:+376615817" className="text-hg-cream hover:text-hg-gold text-sm transition-colors">
                    +376 615 817
                  </a>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin size={14} className="text-hg-gold mt-0.5 shrink-0" />
                  <address className="text-hg-muted text-sm not-italic leading-relaxed">
                    Avinguda d&apos;Enclar 91–93<br />
                    Santa Coloma<br />
                    Andorra la Vella, AD500<br />
                    Andorra
                  </address>
                </div>
              </div>
            </div>

            {/* How to get here */}
            <div>
              <p className="text-hg-gold text-[10px] tracking-[0.35em] uppercase mb-5">How to Get Here</p>
              <div className="space-y-3">
                {directions.map((d) => {
                  const Icon = d.icon;
                  return (
                    <div key={d.from} className="rounded-2xl p-5 backdrop-blur-[14px] bg-gradient-to-br from-white/[0.07] to-white/[0.02] border border-white/10 hover:border-hg-gold/30 transition-all duration-300">
                      <div className="flex items-center gap-2 mb-2">
                        <Icon size={13} className="text-hg-gold shrink-0" />
                        <p className="text-hg-cream font-semibold text-sm">{d.from}</p>
                      </div>
                      <p className="text-hg-muted text-sm leading-relaxed pl-5">{d.detail}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
