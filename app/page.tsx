import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import BookingBar from "@/components/home/BookingBar";
import RoomsPreview from "@/components/home/RoomsPreview";
import AmenitiesGrid from "@/components/home/AmenitiesGrid";
import RestaurantTeaser from "@/components/home/RestaurantTeaser";
import EventsBanner from "@/components/home/EventsBanner";
import Testimonials from "@/components/home/Testimonials";
import LocationSnippet from "@/components/home/LocationSnippet";

export const metadata: Metadata = {
  title: "Hotel Garden — Andorra la Vella | 3-Star Mountain Hotel",
  description:
    "Book your stay at Hotel Garden in Santa Coloma, Andorra. Breakfast included, free parking, mountain views, and 24-hour reception. A Garden of Comfort, A World of Experience.",
};

export default function Home() {
  return (
    <>
      <Hero />
      <BookingBar />
      <RoomsPreview />
      <AmenitiesGrid />
      <RestaurantTeaser />
      <EventsBanner />
      <Testimonials />
      <LocationSnippet />
    </>
  );
}
