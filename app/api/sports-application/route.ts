import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { upsertContact } from "@/lib/ghl";

const resend = new Resend(process.env.RESEND_API_KEY);

const SESSION_LABELS: Record<string, string> = {
  jun1:  "Session 1 — June 1–6, 2026",
  jun22: "Session 2 — June 22–27, 2026",
  jul6:  "Session 3 — July 6–11, 2026",
  jul13: "Session 4 — July 13–18, 2026",
  jul20: "Session 5 — July 20–25, 2026",
  jul27: "Session 6 — July 27–Aug 1, 2026",
};

export async function POST(req: NextRequest) {
  try {
    const { firstName, lastName, email, phone, position, age, nationality, week, message } =
      await req.json();

    if (!firstName || !lastName || !email || !position || !age || !nationality || !week) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const sessionLabel = SESSION_LABELS[week] || week;

    // Forward to n8n for sheet logging + admin review email with Accept/Reject
    const n8nUrl =
      process.env.N8N_HOTEL_WEBHOOK_URL ||
      "https://cdpfc.app.n8n.cloud/webhook/hotel-application";

    await fetch(n8nUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        phone: phone || "",
        position,
        age: String(age),
        nationality,
        week,
        message: message || "",
        source: "hotel-website",
        timestamp: new Date().toISOString(),
      }),
    });

    // Immediate auto-confirm to applicant
    await resend.emails.send({
      from: "Hotel Garden <onboarding@resend.dev>",
      to: email,
      subject: "Application Received — CDP Draft Week 2026",
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#333">
          <h2 style="color:#C9A84C;border-bottom:1px solid #eee;padding-bottom:12px">Application Received</h2>
          <p>Hi ${firstName},</p>
          <p>Thank you for applying to <strong>CDP Draft Week 2026</strong>.</p>
          <p>We have received your application for <strong>${sessionLabel}</strong> as a <strong>${position}</strong>.</p>
          <p>Our team will review your application and get back to you within <strong>48 hours</strong>.</p>
          <p>For any urgent questions, call us at <a href="tel:+376615817">+376 615 817</a>.</p>
          <hr style="border:none;border-top:1px solid #eee;margin:24px 0">
          <p style="font-size:12px;color:#999">Hotel Garden · Avinguda d'Enclar 91–93, Santa Coloma, Andorra la Vella AD500</p>
        </div>
      `,
    });

    // --- GoHighLevel: capture applicant as a sports-guest for cross-sell.
    // Fails soft: the n8n + email flow above is the source of truth.
    try {
      await upsertContact({
        email,
        firstName,
        lastName,
        phone: phone || undefined,
        source: "Draft Week Application",
        tags: ["sports-guest", "draft-week-applicant"],
        fields: {
          purpose_of_stay: "Sports / Training",
          message: `Draft Week — ${sessionLabel} · Position: ${position} · Age: ${age} · ${nationality}${message ? ` · ${message}` : ""}`,
        },
      });
    } catch (ghlErr) {
      console.error("[Sports Application → GHL] non-fatal", ghlErr);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[Sports Application API Error]", err);
    return NextResponse.json({ error: "Failed to submit application" }, { status: 500 });
  }
}
