import Link from "next/link";
import { Phone, MapPin, Star } from "lucide-react";

const footerLinks = [
  { href: "/rooms", label: "Rooms & Suites" },
  { href: "/restaurant", label: "Restaurant" },
  { href: "/gym", label: "Gym & Wellness" },
  { href: "/gallery", label: "Gallery" },
  { href: "/sports", label: "Sports Packages" },
  { href: "/draft-week", label: "Draft Week" },
  { href: "/about", label: "About Us" },
  { href: "/faq", label: "FAQ" },
];

export default function Footer() {
  return (
    <footer className="bg-hg-surface border-t border-hg-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand Column */}
          <div>
            <div className="mb-4">
              <p className="font-heading text-hg-cream text-xs tracking-[0.25em] uppercase">Hotel</p>
              <h3 className="font-heading text-hg-gold text-3xl tracking-[0.2em] uppercase leading-none">Garden</h3>
            </div>
            {/* 3 stars */}
            <div className="flex gap-1.5 mb-5">
              {[...Array(3)].map((_, i) => (
                <Star key={i} size={13} className="text-hg-gold fill-hg-gold" />
              ))}
            </div>
            <p className="text-hg-muted text-sm leading-relaxed italic mb-6">
              "A Garden of Comfort,<br />A World of Experience"
            </p>
            <Link
              href="/draft-week"
              className="inline-block border border-hg-gold/50 text-hg-gold text-xs px-4 py-2 tracking-wider uppercase hover:bg-hg-gold/10 transition-colors"
            >
              Draft Week — June 29 →
            </Link>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-hg-cream font-semibold text-xs tracking-[0.2em] uppercase mb-6 pb-3 border-b border-hg-border">
              Explore
            </h4>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-hg-muted hover:text-hg-gold text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-hg-cream font-semibold text-xs tracking-[0.2em] uppercase mb-6 pb-3 border-b border-hg-border">
              Find Us
            </h4>
            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <MapPin size={15} className="text-hg-gold mt-0.5 shrink-0" />
                <address className="text-hg-muted text-sm leading-relaxed not-italic">
                  Avinguda d'Enclar 91–93<br />
                  Santa Coloma<br />
                  Andorra la Vella, AD500
                </address>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={15} className="text-hg-gold shrink-0" />
                <a
                  href="tel:+376615817"
                  className="text-hg-muted hover:text-hg-gold text-sm transition-colors"
                >
                  +376 615 817
                </a>
              </div>
            </div>

            <div className="mt-8">
              <Link
                href="/booking"
                className="block bg-hg-gold hover:bg-hg-gold-light text-hg-black text-center font-semibold text-xs py-3 tracking-[0.2em] uppercase transition-colors"
              >
                Book Your Stay
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-hg-border mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-hg-muted text-xs">
            © {new Date().getFullYear()} Hotel Garden · Andorra la Vella · All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/faq" className="text-hg-muted hover:text-hg-gold text-xs transition-colors">
              FAQ
            </Link>
            <span className="text-hg-border">·</span>
            <Link href="/contact" className="text-hg-muted hover:text-hg-gold text-xs transition-colors">
              Contact
            </Link>
            <span className="text-hg-border">·</span>
            <Link href="/location" className="text-hg-muted hover:text-hg-gold text-xs transition-colors">
              Location
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
