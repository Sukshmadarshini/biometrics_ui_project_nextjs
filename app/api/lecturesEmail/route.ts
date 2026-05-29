// // app/api/lecturesEmail/route.ts
// import { NextRequest, NextResponse } from "next/server";
// import { Resend } from "resend";
// import { sanity } from "@/app/lib/sanity";
// import LectureEmail from "@/app/components/emails/LectureEmail";
// import { appendLectureRegistration } from "@/app/lib/googleapi";

// export const dynamic = "force-dynamic";

// // ─── Generate transaction reference ─────────────────────────
// function generateTransactionRef(lectureId: string): string {
//   const ts = Date.now().toString(36).toUpperCase();
//   const rnd = Math.random().toString(36).substring(2, 6).toUpperCase();
//   return `SKSH-LEC-${lectureId.slice(0, 6)}-${ts}-${rnd}`;
// }

// // ─── Build UPI URL ──────────────────────────────────────────
// function buildUpiUrl(opts: {
//   upiId: string;
//   upiName: string;
//   amount: number;
//   transactionRef: string;
// }): string {
//   const params = new URLSearchParams({
//     pa: opts.upiId,
//     pn: opts.upiName.replace(/[^a-zA-Z0-9 ]/g, ""),
//     am: opts.amount.toFixed(2),
//     tr: opts.transactionRef,
//     cu: "INR",
//     tn: `Lecture Payment - ${opts.transactionRef}`,
//   });
//   return `upi://pay?${params.toString()}`;
// }

// // ─── Route ──────────────────────────────────────────────────
// export async function POST(req: NextRequest) {
//   try {
//     const body = await req.json();
//     console.log("BODY RECEIVED:", body);

//     const { name, email, lectureId, lectureTitle, selectedSlot } = body;

//     if (!lectureId) {
//       return NextResponse.json(
//         { success: false, error: "Missing lectureId" },
//         { status: 400 }
//       );
//     }

//     // ────────────────────────────────────────────────────────
//     // 🔒 SECURE FETCH FROM SANITY
//     // ────────────────────────────────────────────────────────
//     const lecture = await sanity.fetch(
//       `*[_type == "lecture" && _id == $id][0]{
//         price,
//         priceLabel
//       }`,
//       { id: lectureId }
//     );

//     if (!lecture || !lecture.price) {
//       return NextResponse.json(
//         { success: false, error: "Invalid lecture or price not found" },
//         { status: 400 }
//       );
//     }

//     const amountNumeric = lecture.price;
//     const priceDisplay = lecture.priceLabel ?? `₹${lecture.price}`;

//     // ────────────────────────────────────────────────────────
//     // 💳 UPI CONFIG
//     // ────────────────────────────────────────────────────────
//     const upiId = process.env.UPI_ID;
//     const upiName = process.env.UPI_NAME ?? "Sukshmadarshini";

//     if (!upiId) {
//       return NextResponse.json(
//         { success: false, error: "Payment configuration missing" },
//         { status: 500 }
//       );
//     }

//     const transactionRef = generateTransactionRef(lectureId);
//     const upiUrl = buildUpiUrl({
//       upiId,
//       upiName,
//       amount: amountNumeric,
//       transactionRef,
//     });

//     const qrDataUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(
//       upiUrl
//     )}`;

//     // ────────────────────────────────────────────────────────
//     // 📧 SEND EMAIL
//     // ────────────────────────────────────────────────────────
//     const resend = new Resend(process.env.RESEND_API_KEY);

//     const { error } = await resend.emails.send({
//       from: process.env.CLIENT_EMAIL_FROM!,
//       to: email,
//       replyTo: process.env.EMAIL_TO!,
//       subject: `[Seat Reserved] ${lectureTitle} — Complete Your Payment`,
//       react: LectureEmail({
//         name,
//         email,
//         lectureTitle,
//         lectureId,
//         price: priceDisplay,
//         amountNumeric,
//         selectedSlot,
//         upiId,
//         upiName,
//         transactionRef,
//         qrDataUrl,
//       }),
//     });

//     if (error) {
//       console.error("[lectureEmail] Resend error:", error);
//       return NextResponse.json(
//         { success: false, error: "Failed to send email" },
//         { status: 500 }
//       );
//     }

//     // 📊 Append to Google Sheets — Lectures tab
//     try {
//       await appendLectureRegistration({
//         name,
//         email,
//         lectureTitle,
//         selectedSlot,
//         transactionRef,
//       });
//     } catch (sheetErr) {
//       // Non-fatal — log but don't fail the registration
//       console.error("[lectureEmail] Google Sheets append failed:", sheetErr);
//     }

//     return NextResponse.json({ success: true, transactionRef });
//   } catch (err) {
//     console.error("[lectureEmail] Unexpected error:", err);
//     return NextResponse.json(
//       { success: false, error: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }

// // app/api/lecturesEmail/route.ts
// import { NextRequest, NextResponse } from "next/server";
// import { Resend } from "resend";
// import { sanity } from "@/app/lib/sanity";
// import LectureEmail from "@/app/components/emails/LectureEmail";
// import ReturnLectureEmail from "@/app/components/emails/ReturnLectureEmail";
// import { appendLectureRegistration } from "@/app/lib/googleapi";

// export const dynamic = "force-dynamic";

// // ─── Generate transaction reference ─────────────────────────
// function generateTransactionRef(lectureId: string): string {
//   const ts = Date.now().toString(36).toUpperCase();
//   const rnd = Math.random().toString(36).substring(2, 6).toUpperCase();
//   return `SKSH-LEC-${lectureId.slice(0, 6)}-${ts}-${rnd}`;
// }

// // ─── Build UPI URL ──────────────────────────────────────────
// function buildUpiUrl(opts: {
//   upiId: string;
//   upiName: string;
//   amount: number;
//   transactionRef: string;
// }): string {
//   const params = new URLSearchParams({
//     pa: opts.upiId,
//     pn: opts.upiName.replace(/[^a-zA-Z0-9 ]/g, ""),
//     am: opts.amount.toFixed(2),
//     tr: opts.transactionRef,
//     cu: "INR",
//     tn: `Lecture Payment - ${opts.transactionRef}`,
//   });
//   return `upi://pay?${params.toString()}`;
// }

// // ─── Route ──────────────────────────────────────────────────
// export async function POST(req: NextRequest) {
//   try {
//     const body = await req.json();
//     console.log("BODY RECEIVED:", body);

//     const { name, email, lectureId, lectureTitle, selectedSlot } = body;

//     if (!lectureId) {
//       return NextResponse.json(
//         { success: false, error: "Missing lectureId" },
//         { status: 400 }
//       );
//     }

//     // ── Secure fetch from Sanity ─────────────────────────────
//     const lecture = await sanity.fetch(
//       `*[_type == "lecture" && _id == $id][0]{
//         price,
//         priceLabel
//       }`,
//       { id: lectureId }
//     );

//     if (!lecture || !lecture.price) {
//       return NextResponse.json(
//         { success: false, error: "Invalid lecture or price not found" },
//         { status: 400 }
//       );
//     }

//     const amountNumeric = lecture.price;
//     const priceDisplay = lecture.priceLabel ?? `₹${lecture.price}`;
//     const mode          = lecture.mode     ?? "N/A";
//     const duration      = lecture.duration ?? "N/A";

//     // ── UPI config ───────────────────────────────────────────
//     const upiId = process.env.UPI_ID;
//     const upiName = process.env.UPI_NAME ?? "Sukshmadarshini";

//     if (!upiId) {
//       return NextResponse.json(
//         { success: false, error: "Payment configuration missing" },
//         { status: 500 }
//       );
//     }

//     const transactionRef = generateTransactionRef(lectureId);
//     const upiUrl = buildUpiUrl({ upiId, upiName, amount: amountNumeric, transactionRef });
//     const qrDataUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(upiUrl)}`;

//     // ── Send both emails in parallel ─────────────────────────
//     const resend = new Resend(process.env.RESEND_API_KEY);

//     const [clientResult, ownerResult] = await Promise.allSettled([
//       // 1️⃣  To the student — payment instructions
//       resend.emails.send({
//         from:    process.env.CLIENT_EMAIL_FROM!,
//         to:      email,
//         replyTo: process.env.EMAIL_TO!,
//         subject: `[Seat Reserved] ${lectureTitle} — Complete Your Payment`,
//         react: LectureEmail({
//           name,
//           email,
//           lectureTitle,
//           lectureId,
//           price: priceDisplay,
//           amountNumeric,
//           selectedSlot,
//           upiId,
//           upiName,
//           transactionRef,
//           qrDataUrl,
//         }),
//       }),

//       // 2️⃣  To the owner — new registration notification
//       resend.emails.send({
//         from:    process.env.OWNER_EMAIL_FROM!,
//         to:      process.env.EMAIL_TO!,
//         replyTo: email,
//         subject: `[New Lecture Registration] ${lectureTitle} — ${name}`,
//         react: ReturnLectureEmail({
//           name,
//           email,
//           lectureTitle,
//           lectureId,
//           price: priceDisplay,
//           amountNumeric,
//           selectedSlot,
//           transactionRef,
//         }),
//       }),
//     ]);

//     if (clientResult.status === "rejected" || clientResult.value?.error) {
//       console.error("[lectureEmail] Client email failed:", clientResult);
//       return NextResponse.json(
//         { success: false, error: "Failed to send confirmation email to student." },
//         { status: 500 }
//       );
//     }

//     if (ownerResult.status === "rejected" || ownerResult.value?.error) {
//       console.error("[lectureEmail] Owner notification email failed:", ownerResult);
//     }

//     // ── Google Sheets append ─────────────────────────────────
//     try {
//       await appendLectureRegistration({
//         name,
//         email,
//         lectureTitle,
//         mode,
//         duration,
//         selectedSlot,
//         transactionRef,
//       });
//     } catch (sheetErr) {
//       console.error("[lectureEmail] Google Sheets append failed:", sheetErr);
//     }

//     return NextResponse.json({ success: true, transactionRef });

//   } catch (err) {
//     console.error("[lectureEmail] Unexpected error:", err);
//     return NextResponse.json(
//       { success: false, error: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }

// app/api/lecturesEmail/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { sanity } from "@/app/lib/sanity";
import LectureEmail from "@/app/components/emails/LectureEmail";
import ReturnLectureEmail from "@/app/components/emails/ReturnLectureEmail";
import { appendLectureRegistration } from "@/app/lib/googleapi";

export const dynamic = "force-dynamic";

// ─── Generate transaction reference ─────────────────────────
function generateTransactionRef(lectureId: string): string {
  const ts = Date.now().toString(36).toUpperCase();
  const rnd = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `SKSH-LEC-${lectureId.slice(0, 6)}-${ts}-${rnd}`;
}

// ─── Build UPI URL ──────────────────────────────────────────
function buildUpiUrl(opts: {
  upiId: string;
  upiName: string;
  amount: number;
  transactionRef: string;
}): string {
  const params = new URLSearchParams({
    pa: opts.upiId,
    pn: opts.upiName.replace(/[^a-zA-Z0-9 ]/g, ""),
    am: opts.amount.toFixed(2),
    tr: opts.transactionRef,
    cu: "INR",
    tn: `Lecture Payment - ${opts.transactionRef}`,
  });
  return `upi://pay?${params.toString()}`;
}

// ─── Route ──────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("BODY RECEIVED:", body);

    const { name, email, lectureId, lectureTitle, selectedSlot } = body;

    if (!lectureId) {
      return NextResponse.json(
        { success: false, error: "Missing lectureId" },
        { status: 400 }
      );
    }

    // ── Secure fetch from Sanity ─────────────────────────────
    const lecture = await sanity.fetch(
      `*[_type == "lecture" && _id == $id][0]{
        price,
        priceLabel
      }`,
      { id: lectureId }
    );

    if (!lecture || !lecture.price) {
      return NextResponse.json(
        { success: false, error: "Invalid lecture or price not found" },
        { status: 400 }
      );
    }

    const amountNumeric = lecture.price;
    const priceDisplay = lecture.priceLabel ?? `₹${lecture.price}`;

    // ── UPI config ───────────────────────────────────────────
    const upiId = process.env.UPI_ID;
    const upiName = process.env.UPI_NAME ?? "Sukshmadarshini";

    if (!upiId) {
      return NextResponse.json(
        { success: false, error: "Payment configuration missing" },
        { status: 500 }
      );
    }

    const transactionRef = generateTransactionRef(lectureId);
    const upiUrl = buildUpiUrl({ upiId, upiName, amount: amountNumeric, transactionRef });
    const qrDataUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(upiUrl)}`;

    // ── Send both emails in parallel ─────────────────────────
    const resend = new Resend(process.env.RESEND_API_KEY);

    const [clientResult, ownerResult] = await Promise.allSettled([
      // 1️⃣  To the student — payment instructions
      resend.emails.send({
        from:    process.env.CLIENT_EMAIL_FROM!,
        to:      email,
        replyTo: process.env.EMAIL_TO!,
        subject: `Seat Reserved for ${lectureTitle} - Complete Your Payment`,
        react: LectureEmail({
          name,
          email,
          lectureTitle,
          lectureId,
          price: priceDisplay,
          amountNumeric,
          selectedSlot,
          upiId,
          upiName,
          transactionRef,
          qrDataUrl,
        }),
      }),

      // 2️⃣  To the owner - new registration notification
      resend.emails.send({
        from:    process.env.OWNER_EMAIL_FROM!,
        to:      process.env.EMAIL_TO!,
        replyTo: email,
        subject: `New Lecture Registration: ${lectureTitle} - ${name}`,
        react: ReturnLectureEmail({
          name,
          email,
          lectureTitle,
          lectureId,
          price: priceDisplay,
          amountNumeric,
          selectedSlot,
          transactionRef,
        }),
      }),
    ]);

    if (clientResult.status === "rejected" || clientResult.value?.error) {
      console.error("[lectureEmail] Client email failed:", clientResult);
      return NextResponse.json(
        { success: false, error: "Failed to send confirmation email to student." },
        { status: 500 }
      );
    }

    if (ownerResult.status === "rejected" || ownerResult.value?.error) {
      console.error("[lectureEmail] Owner notification email failed:", ownerResult);
    }

    // ── Google Sheets append ─────────────────────────────────
    try {
      await appendLectureRegistration({
        name,
        email,
        lectureTitle,
        // mode,
        // duration,
        selectedSlot,
        transactionRef,
      });
    } catch (sheetErr) {
      console.error("[lectureEmail] Google Sheets append failed:", sheetErr);
    }

    return NextResponse.json({ success: true, transactionRef });

  } catch (err) {
    console.error("[lectureEmail] Unexpected error:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}