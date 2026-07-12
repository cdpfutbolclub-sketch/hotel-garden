import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { upsertContact, addTags, removeTags, upsertOpportunity, STAGE } from "@/lib/ghl";

// Stripe SDK needs the Node runtime (not Edge).
export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  // Stripe signs the RAW body — read it verbatim, never JSON.parse first.
  const rawBody = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature || !WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Missing signature or secret" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = await stripe.webhooks.constructEventAsync(rawBody, signature, WEBHOOK_SECRET);
  } catch (err) {
    console.error("[Stripe Webhook] signature verification failed", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const meta = session.metadata || {};
      const email = meta.guestEmail || session.customer_email || undefined;
      const amountPaid = (session.amount_total ?? 0) / 100;

      // Prefer the contact id we stashed at checkout; fall back to email lookup.
      let contactId = meta.ghlContactId || null;
      if (!contactId && email) {
        contactId = await upsertContact({ email, source: "Website Booking" });
      }

      if (contactId) {
        // Paid → no longer abandoned, now a confirmed booking.
        await removeTags(contactId, ["abandoned-booking"]);
        await addTags(contactId, ["booked"]);
        if (email) {
          await upsertContact({ email, fields: { deposit_paid: amountPaid } });
        }
        // Move to Booking Confirmed → this fires the pre-arrival workflow.
        await upsertOpportunity({
          contactId,
          stageId: STAGE.BOOKING_CONFIRMED,
          name: `${meta.roomType || "Room"} — ${meta.guestName || email || "Guest"}`,
          monetaryValue: amountPaid,
          status: "won",
        });
      }
    }
  } catch (err) {
    // Log but still 200 — otherwise Stripe retries endlessly on a CRM error.
    console.error("[Stripe Webhook] handler error (non-fatal)", err);
  }

  return NextResponse.json({ received: true });
}
