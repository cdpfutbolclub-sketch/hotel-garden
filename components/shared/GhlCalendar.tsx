"use client";

import Script from "next/script";

/**
 * Embeds a GoHighLevel booking calendar. Bookings made here land directly in
 * GHL as contacts and can trigger their own workflows — no site code needed.
 * The form_embed script auto-resizes the iframe to its content height.
 */
export default function GhlCalendar({
  calendarId,
  title = "Book an appointment",
  minHeight = 720,
}: {
  calendarId: string;
  title?: string;
  minHeight?: number;
}) {
  return (
    <>
      <iframe
        src={`https://api.leadconnectorhq.com/widget/booking/${calendarId}`}
        title={title}
        id={`ghl-cal-${calendarId}`}
        scrolling="no"
        style={{ width: "100%", minHeight, border: "none", overflow: "hidden" }}
      />
      <Script src="https://link.msgsndr.com/js/form_embed.js" strategy="lazyOnload" />
    </>
  );
}
