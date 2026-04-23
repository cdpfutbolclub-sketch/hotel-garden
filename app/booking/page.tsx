"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Calendar, Users, Bed, CreditCard, Check } from "lucide-react";

const ROOM_PRICES: Record<string, number> = {
  Standard: 50,
  Superior: 75,
  Family: 95,
};

function BookingForm() {
  const searchParams = useSearchParams();
  const today = new Date().toISOString().split("T")[0];

  const [checkIn, setCheckIn] = useState(searchParams.get("checkIn") || "");
  const [checkOut, setCheckOut] = useState(searchParams.get("checkOut") || "");
  const [guests, setGuests] = useState(Number(searchParams.get("guests")) || 1);
  const [roomType, setRoomType] = useState(
    searchParams.get("roomType") || "Standard"
  );
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const nights =
    checkIn && checkOut
      ? Math.max(
          0,
          Math.ceil(
            (new Date(checkOut).getTime() - new Date(checkIn).getTime()) /
              (1000 * 60 * 60 * 24)
          )
        )
      : 0;

  const pricePerNight = ROOM_PRICES[roomType] ?? 50;
  const totalPrice = nights * pricePerNight;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (nights <= 0) {
      setError("Please select valid check-in and check-out dates.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          checkIn,
          checkOut,
          guests,
          roomType,
          nights,
          pricePerNight,
          totalPrice,
          firstName,
          lastName,
          email,
        }),
      });

      if (!res.ok) {
        throw new Error("Checkout session failed");
      }

      const { url } = await res.json();
      if (url) window.location.href = url;
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again or call us at +376 615 817.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full bg-white/5 border border-white/10 rounded-xl text-hg-cream placeholder-hg-muted px-4 py-3 focus:border-hg-gold outline-none transition-colors duration-200 text-sm";
  const labelClass =
    "block text-hg-muted text-[10px] tracking-[0.25em] uppercase mb-2";

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {/* ─── Stay Details ─────────────────────────────── */}
      <div className="rounded-2xl p-6 sm:p-8 backdrop-blur-[14px] bg-gradient-to-br from-white/[0.07] to-white/[0.02] border border-white/10">
        <h2 className="font-heading text-hg-cream text-xl mb-6 flex items-center gap-3">
          <Calendar size={18} className="text-hg-gold" />
          Your Stay
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="checkIn" className={labelClass}>Check-in Date *</label>
            <input
              id="checkIn"
              type="date"
              value={checkIn}
              min={today}
              onChange={(e) => setCheckIn(e.target.value)}
              className={inputClass}
              required
            />
          </div>
          <div>
            <label htmlFor="checkOut" className={labelClass}>Check-out Date *</label>
            <input
              id="checkOut"
              type="date"
              value={checkOut}
              min={checkIn || today}
              onChange={(e) => setCheckOut(e.target.value)}
              className={inputClass}
              required
            />
          </div>
          <div>
            <label htmlFor="guests" className={labelClass}>Number of Guests *</label>
            <select
              id="guests"
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className={inputClass + " cursor-pointer"}
            >
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <option key={n} value={n}>
                  {n} Guest{n > 1 ? "s" : ""}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="roomType" className={labelClass}>Room Type *</label>
            <select
              id="roomType"
              value={roomType}
              onChange={(e) => setRoomType(e.target.value)}
              className={inputClass + " cursor-pointer"}
            >
              {Object.entries(ROOM_PRICES).map(([rt, price]) => (
                <option key={rt} value={rt}>
                  {rt} — from €{price}/night
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* ─── Guest Details ─────────────────────────────── */}
      <div className="rounded-2xl p-6 sm:p-8 backdrop-blur-[14px] bg-gradient-to-br from-white/[0.07] to-white/[0.02] border border-white/10">
        <h2 className="font-heading text-hg-cream text-xl mb-6 flex items-center gap-3">
          <Users size={18} className="text-hg-gold" />
          Guest Information
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="firstName" className={labelClass}>First Name *</label>
            <input
              id="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Your first name"
              className={inputClass}
              required
              autoComplete="given-name"
            />
          </div>
          <div>
            <label htmlFor="lastName" className={labelClass}>Last Name *</label>
            <input
              id="lastName"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Your last name"
              className={inputClass}
              required
              autoComplete="family-name"
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="email" className={labelClass}>Email Address *</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className={inputClass}
              required
              autoComplete="email"
            />
            <p className="text-hg-muted text-[11px] mt-1.5">
              Your booking confirmation will be sent to this address.
            </p>
          </div>
        </div>
      </div>

      {/* ─── Price Summary ─────────────────────────────── */}
      {nights > 0 && (
        <div className="rounded-2xl p-6 sm:p-8 backdrop-blur-[14px] bg-gradient-to-br from-white/[0.10] to-white/[0.03] border border-hg-gold/30">
          <h2 className="font-heading text-hg-cream text-xl mb-5">Price Summary</h2>
          <div className="space-y-3 mb-5">
            <div className="flex justify-between text-sm">
              <span className="text-hg-muted">
                {roomType} Room × {nights} night{nights > 1 ? "s" : ""}
              </span>
              <span className="text-hg-cream">
                €{pricePerNight} × {nights} = €{pricePerNight * nights}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-hg-muted">Buffet Breakfast</span>
              <span className="text-hg-gold flex items-center gap-1">
                <Check size={12} /> Included
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-hg-muted">Free Parking</span>
              <span className="text-hg-gold flex items-center gap-1">
                <Check size={12} /> Included
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-hg-muted">Free WiFi</span>
              <span className="text-hg-gold flex items-center gap-1">
                <Check size={12} /> Included
              </span>
            </div>
          </div>
          <div className="border-t border-white/10 pt-4 flex justify-between items-baseline">
            <span className="text-hg-cream font-semibold text-sm">Total</span>
            <span className="text-hg-gold font-bold text-3xl font-heading">
              €{totalPrice}
            </span>
          </div>
          <p className="text-hg-muted text-xs mt-2">
            Secure payment processed by Stripe. Full amount charged upfront.
          </p>
        </div>
      )}

      {/* ─── Error ─────────────────────────────────────── */}
      {error && (
        <p
          className="text-red-400 text-sm border border-red-400/30 bg-red-400/5 rounded-xl px-4 py-3"
          role="alert"
        >
          {error}
        </p>
      )}

      {/* ─── Submit ─────────────────────────────────────── */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-hg-gold hover:bg-hg-gold-light disabled:opacity-50 disabled:cursor-not-allowed text-hg-black font-bold text-sm px-8 py-4 tracking-[0.2em] uppercase transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer rounded-full"
      >
        <CreditCard size={16} />
        {loading
          ? "Processing..."
          : nights > 0
          ? `Pay €${totalPrice} — Confirm Booking`
          : "Select Dates to Continue"}
      </button>

      <p className="text-hg-muted text-xs text-center">
        By booking, you confirm you have read our FAQ. Questions? Call{" "}
        <a href="tel:+376615817" className="text-hg-gold hover:underline">
          +376 615 817
        </a>
      </p>
    </form>
  );
}

export default function BookingPage() {
  return (
    <div className="min-h-screen bg-hg-black pt-28 pb-24 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-hg-gold text-xs tracking-[0.4em] uppercase mb-3">Reserve</p>
          <h1 className="font-heading text-hg-cream text-4xl sm:text-5xl mb-4">
            Book Your Stay
          </h1>
          <div className="w-14 h-px bg-hg-gold mx-auto mb-5" />
          <p className="text-hg-muted text-sm">
            Secure online booking · Breakfast included · Free parking
          </p>
        </div>

        <Suspense
          fallback={
            <div className="text-center text-hg-muted py-12">Loading booking form…</div>
          }
        >
          <BookingForm />
        </Suspense>
      </div>
    </div>
  );
}
