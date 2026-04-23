import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
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
    } = body;

    if (!checkIn || !checkOut || !nights || nights <= 0 || !email) {
      return NextResponse.json(
        { error: "Missing required booking fields" },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      customer_email: email,
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: `Hotel Garden — ${roomType} Room`,
              description: [
                `${nights} night${nights > 1 ? "s" : ""}`,
                `Check-in: ${checkIn}`,
                `Check-out: ${checkOut}`,
                `${guests} guest${guests > 1 ? "s" : ""}`,
                "Breakfast included",
              ].join(" · "),
            },
            unit_amount: Math.round(totalPrice * 100), // Stripe requires cents
          },
          quantity: 1,
        },
      ],
      metadata: {
        checkIn,
        checkOut,
        guests: guests.toString(),
        roomType,
        nights: nights.toString(),
        pricePerNight: pricePerNight.toString(),
        guestName: `${firstName} ${lastName}`.trim(),
        guestEmail: email,
      },
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/booking/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/booking`,
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (err) {
    console.error("[Stripe Checkout Error]", err);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
