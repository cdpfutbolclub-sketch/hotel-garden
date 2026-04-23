import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const HOTEL_EMAIL = process.env.HOTEL_EMAIL || "yacine0skull@gmail.com";

export async function POST(req: NextRequest) {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      position,
      age,
      nationality,
      week,
      message,
    } = await req.json();

    if (!firstName || !lastName || !email || !position || !age || !nationality || !week) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const weekLabel =
      week === "week1"
        ? "Week 1 — June 29 – July 5, 2026"
        : "Week 2 — July 6 – July 11, 2026";

    // Notify hotel/CDP
    await resend.emails.send({
      from: "Hotel Garden <onboarding@resend.dev>",
      to: HOTEL_EMAIL,
      replyTo: email,
      subject: `[Draft Week Application] ${firstName} ${lastName} — ${position}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
          <h2 style="color: #C9A84C; border-bottom: 1px solid #eee; padding-bottom: 12px;">
            New Draft Week Application — CDP × Hotel Garden
          </h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; font-weight: bold; width: 140px;">Name:</td><td>${firstName} ${lastName}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Email:</td><td><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Phone:</td><td>${phone || "—"}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Position:</td><td>${position}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Age:</td><td>${age}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Nationality:</td><td>${nationality}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Preferred Week:</td><td>${weekLabel}</td></tr>
          </table>
          ${message ? `
          <div style="margin-top: 20px; background: #f9f9f9; padding: 16px; border-left: 3px solid #C9A84C;">
            <p style="font-weight: bold; margin: 0 0 8px;">Additional Info:</p>
            <p style="margin: 0; white-space: pre-wrap;">${message}</p>
          </div>` : ""}
          <p style="margin-top: 24px; font-size: 12px; color: #999;">
            Sent via hotelgarden.ad sports application form
          </p>
        </div>
      `,
    });

    // Auto-confirm to applicant
    await resend.emails.send({
      from: "Hotel Garden <onboarding@resend.dev>",
      to: email,
      subject: "Application Received — Draft Week 2026 · Hotel Garden",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
          <h2 style="color: #C9A84C;">Application Received</h2>
          <p>Hi ${firstName},</p>
          <p>Thank you for applying to <strong>Draft Week 2026</strong> with CDP Fútbol Club, hosted at Hotel Garden in Andorra.</p>
          <p>We've received your application for <strong>${weekLabel}</strong> as a <strong>${position}</strong>.</p>
          <p>Our team will review your application and get back to you within <strong>48 hours</strong>.</p>
          <p>For any urgent questions, call us at <a href="tel:+376615817">+376 615 817</a>.</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
          <p style="font-size: 12px; color: #999;">
            Hotel Garden · Avinguda d'Enclar 91–93, Santa Coloma, Andorra la Vella AD500
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[Sports Application API Error]", err);
    return NextResponse.json(
      { error: "Failed to submit application" },
      { status: 500 }
    );
  }
}
