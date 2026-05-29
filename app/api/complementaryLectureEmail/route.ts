// app/api/complementaryLectureEmail/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { sanity } from "@/app/lib/sanity";
import ComplementaryLectureEmail from "@/app/components/emails/ComplementaryLectureEmail";
import ReturnComplementaryLectureEmail from "@/app/components/emails/ReturnComplementaryLectureEmail";
import { appendComplementaryLectureRegistration } from "@/app/lib/googleapi";

export const dynamic = "force-dynamic";

// ─── Generate registration reference ────────────────────────
function generateRegistrationRef(lectureId: string): string {
  const ts = Date.now().toString(36).toUpperCase();
  const rnd = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `SKSH-CL-${lectureId.slice(0, 6)}-${ts}-${rnd}`;
}

// ─── Route ──────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("[complementaryLectureEmail] BODY RECEIVED:", body);

    const { name, email, lectureId, lectureTitle, selectedSlot } = body;

    // ── Basic presence checks ────────────────────────────────
    if (!lectureId) {
      return NextResponse.json(
        { success: false, error: "Missing lectureId" },
        { status: 400 }
      );
    }

    if (!name?.trim() || !email?.trim() || !lectureTitle?.trim() || !selectedSlot) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // ── Secure fetch from Sanity ─────────────────────────────
    // Fetches mode and duration so they can't be spoofed from the client
    const lecture = await sanity.fetch(
      `*[_type == "complementaryLecture" && _id == $id][0]{
        title,
        mode,
        duration
      }`,
      { id: lectureId }
    );

    if (!lecture) {
      return NextResponse.json(
        { success: false, error: "Lecture not found" },
        { status: 400 }
      );
    }

    // Fall back gracefully if fields aren't in Sanity yet
    const mode     = lecture.mode     ?? "Online";
    const duration = lecture.duration ?? "TBD";

    // ── Generate registration reference ──────────────────────
    const registrationRef = generateRegistrationRef(lectureId);

    // ── Send both emails in parallel ─────────────────────────
    const resend = new Resend(process.env.RESEND_API_KEY);

    const [clientResult, ownerResult] = await Promise.allSettled([
      // 1️⃣  To the registrant — seat confirmation
      resend.emails.send({
        from:    process.env.CLIENT_EMAIL_FROM!,
        to:      email,
        replyTo: process.env.EMAIL_TO!,
        subject: `Seat Confirmed for ${lectureTitle} - Registration complete`,
        react: ComplementaryLectureEmail({
          name,
          email,
          lectureTitle,
          lectureId,
          selectedSlot,
          mode,
          duration,
          registrationRef,
        }),
      }),

      // 2️⃣  To the owner — new registration notification
      resend.emails.send({
        from:    process.env.OWNER_EMAIL_FROM!,
        to:      process.env.EMAIL_TO!,
        replyTo: email,
        subject: `New Complementary Registration for ${lectureTitle} — ${name}`,
        react: ReturnComplementaryLectureEmail({
          name,
          email,
          lectureTitle,
          lectureId,
          selectedSlot,
          mode,
          duration,
          registrationRef,
        }),
      }),
    ]);

    // Client email is fatal — if it fails, the user won't know they're registered
    if (clientResult.status === "rejected" || clientResult.value?.error) {
      console.error("[complementaryLectureEmail] Client email failed:", clientResult);
      return NextResponse.json(
        { success: false, error: "Failed to send confirmation email." },
        { status: 500 }
      );
    }

    // Owner notification is non-fatal
    if (ownerResult.status === "rejected" || ownerResult.value?.error) {
      console.error("[complementaryLectureEmail] Owner notification failed:", ownerResult);
    }

    // ── Google Sheets append ─────────────────────────────────
    try {
      await appendComplementaryLectureRegistration({
        name,
        email,
        lectureTitle,
        selectedSlot,
        mode,
        duration,
        registrationRef,
      });
    } catch (sheetErr) {
      // Non-fatal — log but don't fail the registration
      console.error("[complementaryLectureEmail] Google Sheets append failed:", sheetErr);
    }

    return NextResponse.json({ success: true, registrationRef });

  } catch (err) {
    console.error("[complementaryLectureEmail] Unexpected error:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}