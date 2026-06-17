// app/api/complementaryLectureEmail/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { sanity } from "@/app/lib/sanity";
import ComplementaryLectureEmail from "@/app/components/emails/ComplementaryLectureEmail";
import ReturnComplementaryLectureEmail from "@/app/components/emails/ReturnComplementaryLectureEmail";
import { appendComplementaryLectureRegistration } from "@/app/lib/googleapi";
import { getEmailContents } from "@/app/lib/queries/email-templates";

export const dynamic = "force-dynamic";

function generateRegistrationRef(lectureId: string): string {
  const ts = Date.now().toString(36).toUpperCase();
  const rnd = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `SKSH-CL-${lectureId.slice(0, 6)}-${ts}-${rnd}`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, lectureId, lectureTitle, selectedSlot } = body;

    if (!lectureId)
      return NextResponse.json({ success: false, error: "Missing lectureId" }, { status: 400 });

    if (!name?.trim() || !email?.trim() || !lectureTitle?.trim() || !selectedSlot)
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });

    const lecture = await sanity.fetch(
      `*[_type == "complementaryLecture" && _id == $id][0]{ time, title, mode, duration }`,
      { id: lectureId }
    );

    if (!lecture)
      return NextResponse.json({ success: false, error: "Lecture not found" }, { status: 400 });

    const mode     = lecture.mode     ?? "Online";
    const duration = lecture.duration ?? "TBD";
    const time     = lecture.time     ?? null;

    const emailContents = await getEmailContents([
      "complementaryLecture",
      "returnComplementaryLecture",
    ]);

    const clientEmailContent = {
      headerTitle:    "Seat Confirmed.",
      headerSubtitle: "Sukshmadarshini™ Complementary Lecture",
      bodyText:       "We are delighted to confirm your registration for our upcoming complementary lecture. This session is completely free of charge: your seat is confirmed the moment you register.",
      freeBadge:      "This is a FREE lecture: No payment required",
      whatToExpect1:  "A joining link or venue details will be shared closer to the lecture date.",
      whatToExpect2:  "Please keep this email handy as your registration confirmation.",
      whatToExpect3:  "We recommend joining a few minutes early to get settled.",
      signOff:        "If you have any questions, feel free to reply to this email: we are happy to help.",
      footerText:     "This email was sent from Sukshmadarshini™",
      ...(emailContents["complementaryLecture"] ?? {}),
    };

    const ownerEmailContent = {
      headerTitle:    "New Complementary Lecture Registration",
      headerSubtitle: "Sukshmadarshini™ · Internal Notification",
      bodyText:       "A new attendee has registered for a complementary lecture. No payment is required for this session. Review the details below for your records.",
      infoNote:       "This is a free / complementary session: no payment verification needed. Ensure a joining link or venue details are sent to the registrant before the lecture date.",
      footerText:     "Sukshmadarshini™ Internal Notification",
      ...(emailContents["returnComplementaryLecture"] ?? {}),
    };

    const registrationRef = generateRegistrationRef(lectureId);
    const resend = new Resend(process.env.RESEND_API_KEY);

    const [clientResult, ownerResult] = await Promise.allSettled([
      resend.emails.send({
        from:    process.env.CLIENT_EMAIL_FROM!,
        to:      email,
        replyTo: process.env.EMAIL_TO!,
        subject: `Seat Confirmed for ${lectureTitle}: Registration complete`,
        react: ComplementaryLectureEmail({
          name, email, lectureTitle, lectureId, selectedSlot,
          mode, duration, time, registrationRef,
          emailContent: clientEmailContent,
        }),
      }),
      resend.emails.send({
        from:    process.env.OWNER_EMAIL_FROM!,
        to:      process.env.EMAIL_TO!,
        replyTo: process.env.EMAIL_TO!,
        subject: `New Complementary Registration for ${lectureTitle}: ${name}`,
        react: ReturnComplementaryLectureEmail({
          name, email, lectureTitle, lectureId, selectedSlot,
          mode, duration, time, registrationRef,
          emailContent: ownerEmailContent,
        }),
      }),
    ]);

    if (clientResult.status === "rejected" || clientResult.value?.error) {
      console.error("[complementaryLectureEmail] Client email failed:", clientResult);
      return NextResponse.json({ success: false, error: "Failed to send confirmation email." }, { status: 500 });
    }

    if (ownerResult.status === "rejected" || ownerResult.value?.error)
      console.error("[complementaryLectureEmail] Owner notification failed:", ownerResult);

    try {
      await appendComplementaryLectureRegistration({ name, email, lectureTitle, selectedSlot, mode, duration, registrationRef });
    } catch (sheetErr) {
      console.error("[complementaryLectureEmail] Google Sheets append failed:", sheetErr);
    }

    return NextResponse.json({ success: true, registrationRef });

  } catch (err) {
    console.error("[complementaryLectureEmail] Unexpected error:", err);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}