import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, Phone, Calendar, MapPin, ArrowRight, Bed } from "lucide-react";
import Stripe from "stripe";

export const metadata: Metadata = {
  title: "Booking Confirmed",
  description: "Your Hotel Garden booking is confirmed.",
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

async function getSession(sessionId: string) {
  try {
    return await stripe.checkout.sessions.retrieve(sessionId);
  } catch {
    return null;
  }
}

export default async function BookingSuccess({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;
  const session = session_id ? await getSession(session_id) : null;
  const meta = session?.metadata ?? {};

  return (
    <div className="min-h-screen bg-hg-black flex items-center justify-center px-4 py-24">
      <div className="max-w-lg mx-auto text-center">
        {/* Icon */}
        <div className="w-20 h-20 mx-auto mb-8 bg-hg-surface border border-hg-gold/30 rounded-full flex items-center justify-center">
          <CheckCircle className="text-hg-gold" size={40} />
        </div>

        <p className="text-hg-gold text-xs tracking-[0.4em] uppercase mb-3">Confirmed</p>
        <h1 className="font-heading text-hg-cream text-4xl sm:text-5xl mb-4">
          Booking Confirmed!
        </h1>
        <div className="w-14 h-px bg-hg-gold mx-auto mb-7" />

        <p className="text-hg-muted text-base leading-relaxed mb-8">
          {session?.customer_email
            ? <>A confirmation email has been sent to <strong className="text-hg-cream">{session.customer_email}</strong>.</>
            : "Thank you for choosing Hotel Garden. A confirmation email has been sent to your inbox."}
        </p>

        {/* Booking details */}
        {meta.checkIn && (
          <div className="space-y-3 mb-8 text-left">
            {meta.guestName && (
              <div className="bg-hg-surface border border-hg-border p-4 flex items-center gap-3">
                <Phone size={14} className="text-hg-gold shrink-0" />
                <div>
                  <p className="text-hg-muted text-xs tracking-wider uppercase mb-0.5">Guest</p>
                  <p className="text-hg-cream text-sm font-medium">{meta.guestName}</p>
                </div>
              </div>
            )}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-hg-surface border border-hg-border p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Calendar size={13} className="text-hg-gold" />
                  <p className="text-hg-muted text-xs tracking-wider uppercase">Check-in</p>
                </div>
                <p className="text-hg-cream text-sm font-medium">{meta.checkIn}</p>
              </div>
              <div className="bg-hg-surface border border-hg-border p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Calendar size={13} className="text-hg-gold" />
                  <p className="text-hg-muted text-xs tracking-wider uppercase">Check-out</p>
                </div>
                <p className="text-hg-cream text-sm font-medium">{meta.checkOut}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {meta.roomType && (
                <div className="bg-hg-surface border border-hg-border p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Bed size={13} className="text-hg-gold" />
                    <p className="text-hg-muted text-xs tracking-wider uppercase">Room</p>
                  </div>
                  <p className="text-hg-cream text-sm font-medium">{meta.roomType}</p>
                </div>
              )}
              {meta.nights && (
                <div className="bg-hg-surface border border-hg-border p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Calendar size={13} className="text-hg-gold" />
                    <p className="text-hg-muted text-xs tracking-wider uppercase">Duration</p>
                  </div>
                  <p className="text-hg-cream text-sm font-medium">
                    {meta.nights} night{Number(meta.nights) > 1 ? "s" : ""}
                  </p>
                </div>
              )}
            </div>
            {session?.amount_total && (
              <div className="bg-hg-card border border-hg-gold/30 p-4 flex justify-between items-center">
                <p className="text-hg-muted text-sm">Total paid</p>
                <p className="text-hg-gold font-bold font-heading text-2xl">
                  €{(session.amount_total / 100).toFixed(0)}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Fallback when no session data */}
        {!meta.checkIn && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 text-left">
            <div className="bg-hg-surface border border-hg-border p-5">
              <div className="flex items-center gap-2 mb-2">
                <Calendar size={14} className="text-hg-gold" />
                <p className="text-hg-muted text-xs tracking-wider uppercase">Check-in</p>
              </div>
              <p className="text-hg-cream text-sm">As confirmed in your email</p>
            </div>
            <div className="bg-hg-surface border border-hg-border p-5">
              <div className="flex items-center gap-2 mb-2">
                <Phone size={14} className="text-hg-gold" />
                <p className="text-hg-muted text-xs tracking-wider uppercase">Questions?</p>
              </div>
              <a href="tel:+376615817" className="text-hg-gold hover:text-hg-gold-light text-sm font-semibold transition-colors">
                +376 615 817
              </a>
            </div>
          </div>
        )}

        {/* Address */}
        <div className="bg-hg-surface border border-hg-border p-5 text-left mb-8 flex items-start gap-3">
          <MapPin size={15} className="text-hg-gold shrink-0 mt-0.5" />
          <div>
            <p className="text-hg-muted text-xs tracking-wider uppercase mb-1">Hotel Address</p>
            <address className="text-hg-cream text-sm not-italic leading-relaxed">
              Hotel Garden · Avinguda d'Enclar 91–93<br />
              Santa Coloma, Andorra la Vella AD500
            </address>
          </div>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-2 text-hg-muted hover:text-hg-gold text-sm tracking-wider uppercase transition-colors group"
        >
          Back to Home
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
