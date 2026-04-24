"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar, Users, Bed, Search } from "lucide-react";

const roomTypes = ["Any Room", "Standard", "Superior", "Family"];

export default function BookingBar() {
  const router = useRouter();
  const today = new Date().toISOString().split("T")[0];

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [roomType, setRoomType] = useState("Any Room");

  const handleSearch = () => {
    const params = new URLSearchParams({
      ...(checkIn && { checkIn }),
      ...(checkOut && { checkOut }),
      guests: guests.toString(),
      ...(roomType !== "Any Room" && { roomType }),
    });
    router.push(`/booking?${params.toString()}`);
  };

  return (
    <section className="relative z-20 px-4 -mt-10 pb-2">
      <div className="max-w-5xl mx-auto">
        <div className="rounded-2xl backdrop-blur-[14px] bg-gradient-to-br from-white/[0.10] to-white/[0.03] border border-white/15 shadow-2xl shadow-hg-black/60">
          {/* Top label */}
          <div className="px-6 pt-5 pb-0">
            <p className="text-hg-gold text-[10px] tracking-[0.35em] uppercase font-medium">
              Quick Reservation
            </p>
          </div>

          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Check-in */}
            <div className="flex flex-col gap-1.5">
              <label className="flex items-center gap-1.5 text-hg-muted text-[10px] tracking-[0.25em] uppercase">
                <Calendar size={11} className="text-hg-gold" /> Check-in
              </label>
              <input
                type="date" value={checkIn} min={today}
                onChange={(e) => setCheckIn(e.target.value)}
                className="bg-transparent border-b border-white/15 focus:border-hg-gold text-hg-cream text-sm py-2 outline-none transition-colors duration-200 cursor-pointer"
              />
            </div>

            {/* Check-out */}
            <div className="flex flex-col gap-1.5">
              <label className="flex items-center gap-1.5 text-hg-muted text-[10px] tracking-[0.25em] uppercase">
                <Calendar size={11} className="text-hg-gold" /> Check-out
              </label>
              <input
                type="date" value={checkOut} min={checkIn || today}
                onChange={(e) => setCheckOut(e.target.value)}
                className="bg-transparent border-b border-white/15 focus:border-hg-gold text-hg-cream text-sm py-2 outline-none transition-colors duration-200 cursor-pointer"
              />
            </div>

            {/* Guests */}
            <div className="flex flex-col gap-1.5">
              <label className="flex items-center gap-1.5 text-hg-muted text-[10px] tracking-[0.25em] uppercase">
                <Users size={11} className="text-hg-gold" /> Guests
              </label>
              <select
                value={guests} onChange={(e) => setGuests(Number(e.target.value))}
                className="bg-transparent border-b border-white/15 focus:border-hg-gold text-hg-cream text-sm py-2 outline-none transition-colors duration-200 cursor-pointer"
              >
                {[1,2,3,4,5,6].map((n) => (
                  <option key={n} value={n}>{n} Guest{n > 1 ? "s" : ""}</option>
                ))}
              </select>
            </div>

            {/* Room Type */}
            <div className="flex flex-col gap-1.5">
              <label className="flex items-center gap-1.5 text-hg-muted text-[10px] tracking-[0.25em] uppercase">
                <Bed size={11} className="text-hg-gold" /> Room Type
              </label>
              <select
                value={roomType} onChange={(e) => setRoomType(e.target.value)}
                className="bg-transparent border-b border-white/15 focus:border-hg-gold text-hg-cream text-sm py-2 outline-none transition-colors duration-200 cursor-pointer"
              >
                {roomTypes.map((rt) => <option key={rt} value={rt}>{rt}</option>)}
              </select>
            </div>
          </div>

          <div className="px-6 pb-6 flex justify-center sm:justify-end">
            <button
              onClick={handleSearch}
              className="flex items-center gap-2 bg-hg-gold hover:bg-hg-gold-light text-hg-black font-bold text-xs px-8 py-3 tracking-[0.2em] uppercase transition-colors duration-200 rounded-full cursor-pointer"
            >
              <Search size={14} /> Check Availability
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
