// // // app/api/consultationsEmail/route.ts
// // import { NextRequest, NextResponse } from "next/server";
// // import { Resend } from "resend";
// // import QRCode from "qrcode";
// // import ConsultationEmail from "@/app/components/emails/ConsultationEmail";

// // export const dynamic = "force-dynamic";

// // // ─── Consultation price map (matches consultationDetails in the dialogue) ─────
// // const PRICE_MAP: Record<number, { label: string; amount: number }> = {
// //   1: { label: "₹3,500", amount: 3500 },
// //   2: { label: "₹2,500", amount: 2500 },
// //   3: { label: "₹2,500", amount: 2500 },
// //   4: { label: "₹20,000", amount: 20000 },
// // };

// // // ─── Generate a short unique transaction reference ────────────────────────────
// // function generateTransactionRef(serviceId: number): string {
// //   const ts  = Date.now().toString(36).toUpperCase();
// //   const rnd = Math.random().toString(36).substring(2, 6).toUpperCase();
// //   return `SKSH-${serviceId}-${ts}-${rnd}`;
// // }

// // // ─── Build UPI deep-link URL ──────────────────────────────────────────────────
// // function buildUpiUrl(opts: {
// //   upiId: string;
// //   upiName: string;
// //   amount: number;
// //   transactionRef: string;
// //   serviceTitle: string;
// // }): string {
// //   const params = new URLSearchParams({
// //     pa: opts.upiId,
// //     pn: opts.upiName.replace(/[^a-zA-Z0-9 ]/g, ""),
// //     am: opts.amount.toFixed(2),
// //     tr: opts.transactionRef,
// //     cu: "INR",
// //     tn: `Consultation Payment - ${opts.transactionRef}`,
// //   });
// //   return `upi://pay?${params.toString()}`;
// // }

// // // ─── Server-side validation helpers ──────────────────────────────────────────

// // const FAKE_NAME_PATTERNS = [
// //   /^(.)\1{2,}$/i,
// //   /^[^aeiou]{5,}$/i,
// //   /^(test|fake|asdf|qwerty|admin|user|anon|anonymous|nobody|noone|noreply|abc|xyz)$/i,
// //   /^[a-z]{1,2}$/i,
// //   /\d{3,}/,
// // ];

// // function isNameValid(name: string): boolean {
// //   const t = name.trim();
// //   if (!t || t.length < 2 || t.length > 80) return false;
// //   if (!/^[\p{L}\p{M}'\- ]+$/u.test(t)) return false;
// //   return !FAKE_NAME_PATTERNS.some((p) => p.test(t));
// // }

// // function isEmailFormatValid(email: string): boolean {
// //   return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim().toLowerCase());
// // }

// // function isSlotValid(slot: string): boolean {
// //   if (!slot) return false;
// //   const d = new Date(slot);
// //   if (isNaN(d.getTime())) return false;
// //   // Slot must be in the future
// //   return d > new Date();
// // }

// // // ─── Reuse /api/validateEmail for Abstract API check ─────────────────────────
// // async function verifyEmailViaRoute(email: string): Promise<{ valid: boolean; reason?: string }> {
// //   try {
// //     const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
// //     const res = await fetch(
// //       `${baseUrl}/api/validateEmail?email=${encodeURIComponent(email)}`,
// //       { cache: "no-store" }
// //     );
// //     if (!res.ok) return { valid: true };
// //     return res.json();
// //   } catch {
// //     return { valid: true };
// //   }
// // }

// // // ─── Route handler ────────────────────────────────────────────────────────────

// // export async function POST(req: NextRequest) {
  
// //   try {
// //     const body = await req.json();
// //     console.log("BODY RECEIVED:", body);
// //     const { name, email, serviceId, serviceTitle, selectedSlot } = body;

// //     // ── Validate inputs ──────────────────────────────────────────────────────
// //     if (!isNameValid(name))
// //       return NextResponse.json({ success: false, error: "Invalid name." }, { status: 400 });

// //     if (!isEmailFormatValid(email))
// //       return NextResponse.json({ success: false, error: "Invalid email address." }, { status: 400 });

// //     if (!serviceId || !PRICE_MAP[serviceId])
// //       return NextResponse.json({ success: false, error: "Invalid service." }, { status: 400 });

// //     if (!serviceTitle?.trim())
// //       return NextResponse.json({ success: false, error: "Service title is missing." }, { status: 400 });

// //     if (!isSlotValid(selectedSlot))
// //       return NextResponse.json({ success: false, error: "Invalid or past slot time." }, { status: 400 });

// //     // ── Abstract API email verification ──────────────────────────────────────
// //     const { valid, reason } = await verifyEmailViaRoute(email);
// //     if (!valid)
// //       return NextResponse.json(
// //         { success: false, error: reason ?? "Email address failed verification." },
// //         { status: 400 }
// //       );

// //     // ── Resolve UPI config from env ───────────────────────────────────────────
// //     const upiId   = process.env.UPI_ID;
// //     const upiName = process.env.UPI_NAME ?? "Sukshmadarshini";

// //     if (!upiId)
// //       return NextResponse.json({ success: false, error: "Payment configuration missing." }, { status: 500 });

// //     // ── Build transaction reference and UPI URL ───────────────────────────────
// //     const { label: price, amount: amountNumeric } = PRICE_MAP[serviceId];
// //     const transactionRef = generateTransactionRef(serviceId);
// //     const upiUrl         = buildUpiUrl({ upiId, upiName, amount: amountNumeric, transactionRef, serviceTitle });

// //     // ── Generate QR code as base64 data URL ───────────────────────────────────
// //     // let qrDataUrl: string;
// //     // try {
// //     //   qrDataUrl = await QRCode.toDataURL(upiUrl, { width: 300, margin: 2 });
// //     // } catch (err) {
// //     //   console.error("[consultationEmail] QR generation failed:", err);
// //     //   return NextResponse.json({ success: false, error: "Failed to generate payment QR code." }, { status: 500 });
// //     // }
// //     // const upiUrl = buildUpiUrl(...);

// //     // ✅ Replace QR generation here
// //     const qrDataUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(upiUrl)}`;

// //     // ── Send via Resend ───────────────────────────────────────────────────────
// //     const resend = new Resend(process.env.RESEND_API_KEY);

// //     const { error } = await resend.emails.send({
// //       from:    process.env.CLIENT_EMAIL_FROM!,
// //       to:      email,                    // sent TO the customer
// //       replyTo: process.env.EMAIL_TO!,   // replies come back to Sukshmadarshini
// //       subject: `[Booking Confirmed] ${serviceTitle} — Complete Your Payment`,
// //       react:   ConsultationEmail({
// //         name,
// //         email,
// //         serviceTitle,
// //         serviceId,
// //         price,
// //         amountNumeric,
// //         selectedSlot,
// //         upiId,
// //         upiName,
// //         transactionRef,
// //         qrDataUrl,
// //       }),
// //     });

// //     if (error) {
// //       console.error("[consultationEmail] Resend error:", error);
// //       return NextResponse.json({ success: false, error: "Failed to send email." }, { status: 500 });
// //     }

// //     return NextResponse.json({ success: true, transactionRef });

// //   } catch (err) {
// //     console.error("[consultationEmail] Unexpected error:", err);
// //     return NextResponse.json({ success: false, error: "Internal server error." }, { status: 500 });
// //   }
// // }

// import { NextRequest, NextResponse } from "next/server";
// import { Resend } from "resend";
// import { sanity } from "@/app/lib/sanity";
// import ConsultationEmail from "@/app/components/emails/ConsultationEmail";
// import { appendConsultationRegistration } from "@/app/lib/googleapi";

// export const dynamic = "force-dynamic";

// // ─── Generate transaction reference ─────────────────────────
// function generateTransactionRef(serviceId: string): string {
//   const ts = Date.now().toString(36).toUpperCase();
//   const rnd = Math.random().toString(36).substring(2, 6).toUpperCase();
//   return `SKSH-${serviceId.slice(0, 6)}-${ts}-${rnd}`;
// }

// // ─── Build UPI URL ──────────────────────────────────────────
// function buildUpiUrl(opts: {
//   upiId: string;
//   upiName: string;
//   amount: number;
//   transactionRef: string;
// }) {
//   const params = new URLSearchParams({
//     pa: opts.upiId,
//     pn: opts.upiName.replace(/[^a-zA-Z0-9 ]/g, ""),
//     am: opts.amount.toFixed(2),
//     tr: opts.transactionRef,
//     cu: "INR",
//     tn: `Consultation Payment - ${opts.transactionRef}`,
//   });

//   return `upi://pay?${params.toString()}`;
// }

// // ─── Route ──────────────────────────────────────────────────
// export async function POST(req: NextRequest) {
//   try {
//     const body = await req.json();
//     console.log("BODY RECEIVED:", body);

//     const { name, email, serviceId, serviceTitle, selectedSlot } = body;

//     if (!serviceId) {
//       return NextResponse.json(
//         { success: false, error: "Missing serviceId" },
//         { status: 400 }
//       );
//     }

//     // ────────────────────────────────────────────────────────
//     // 🔒 SECURE FETCH FROM SANITY
//     // ────────────────────────────────────────────────────────
//     const service = await sanity.fetch(
//       `*[_type == "consultation" && _id == $id][0]{
//         price,
//         priceLabel
//       }`,
//       { id: serviceId }
//     );

//     if (!service || !service.price) {
//       return NextResponse.json(
//         { success: false, error: "Invalid service or price not found" },
//         { status: 400 }
//       );
//     }

//     const amountNumeric = service.price;
//     const priceDisplay = service.priceLabel ?? `₹${service.price}`;

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

//     const transactionRef = generateTransactionRef(serviceId);
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
//       subject: `[Booking Confirmed] ${serviceTitle} — Complete Your Payment`,
//       react: ConsultationEmail({
//         name,
//         email,
//         serviceTitle,
//         serviceId,
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
//       console.error("[consultationEmail] Resend error:", error);
//       return NextResponse.json(
//         { success: false, error: "Failed to send email" },
//         { status: 500 }
//       );
//     }

//         // 📊 Append to Google Sheets — Consultations tab
//     try {
//       await appendConsultationRegistration({
//         name,
//         email,
//         serviceTitle,
//         selectedSlot,
//         transactionRef,
//       });
//     } catch (sheetErr) {
//       // Non-fatal — log but don't fail the registration
//       console.error("[consultationEmail] Google Sheets append failed:", sheetErr);
//     }

//     return NextResponse.json({
//       success: true,
//       transactionRef,
//     });
//   } catch (err) {
//     console.error("[consultationEmail] Unexpected error:", err);
//     return NextResponse.json(
//       { success: false, error: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }


// app/api/consultationsEmail/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { sanity } from "@/app/lib/sanity";
import ConsultationEmail from "@/app/components/emails/ConsultationEmail";
import ReturnConsultationEmail from "@/app/components/emails/ReturnConsultationEmail";
import { appendConsultationRegistration } from "@/app/lib/googleapi";

export const dynamic = "force-dynamic";

// ─── Generate transaction reference ─────────────────────────
function generateTransactionRef(serviceId: string): string {
  const ts = Date.now().toString(36).toUpperCase();
  const rnd = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `SKSH-${serviceId.slice(0, 6)}-${ts}-${rnd}`;
}

// ─── Build UPI URL ──────────────────────────────────────────
function buildUpiUrl(opts: {
  upiId: string;
  upiName: string;
  amount: number;
  transactionRef: string;
}) {
  const params = new URLSearchParams({
    pa: opts.upiId,
    pn: opts.upiName.replace(/[^a-zA-Z0-9 ]/g, ""),
    am: opts.amount.toFixed(2),
    tr: opts.transactionRef,
    cu: "INR",
    tn: `Consultation Payment - ${opts.transactionRef}`,
  });
  return `upi://pay?${params.toString()}`;
}

// ─── Route ──────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("BODY RECEIVED:", body);

    const { name, email, serviceId, serviceTitle, selectedSlot } = body;

    if (!serviceId) {
      return NextResponse.json(
        { success: false, error: "Missing serviceId" },
        { status: 400 }
      );
    }

    // ── Secure fetch from Sanity ─────────────────────────────
    const service = await sanity.fetch(
      `*[_type == "consultation" && _id == $id][0]{
        price,
        priceLabel
      }`,
      { id: serviceId }
    );

    if (!service || !service.price) {
      return NextResponse.json(
        { success: false, error: "Invalid service or price not found" },
        { status: 400 }
      );
    }

    const amountNumeric = service.price;
    const priceDisplay = service.priceLabel ?? `₹${service.price}`;

    // ── UPI config ───────────────────────────────────────────
    const upiId = process.env.UPI_ID;
    const upiName = process.env.UPI_NAME ?? "Sukshmadarshini";

    if (!upiId) {
      return NextResponse.json(
        { success: false, error: "Payment configuration missing" },
        { status: 500 }
      );
    }

    const transactionRef = generateTransactionRef(serviceId);
    const upiUrl = buildUpiUrl({ upiId, upiName, amount: amountNumeric, transactionRef });
    const qrDataUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(upiUrl)}`;

    // ── Send both emails in parallel ─────────────────────────
    const resend = new Resend(process.env.RESEND_API_KEY);

    const [clientResult, ownerResult] = await Promise.allSettled([
      // 1️⃣  To the customer — payment instructions
      resend.emails.send({
        from:    process.env.CLIENT_EMAIL_FROM!,
        to:      email,
        replyTo: process.env.EMAIL_TO!,
        subject: `Booking Confirmed for ${serviceTitle} - Payment details inside`,
        react: ConsultationEmail({
          name,
          email,
          serviceTitle,
          serviceId,
          price: priceDisplay,
          amountNumeric,
          selectedSlot,
          upiId,
          upiName,
          transactionRef,
          qrDataUrl,
        }),
      }),

      // 2️⃣  To the owner — new registration notification
      resend.emails.send({
        from:    process.env.OWNER_EMAIL_FROM!,
        to:      process.env.EMAIL_TO!,
        replyTo: email,
        subject: `New Consultation Registration for ${serviceTitle} - ${name}`,
        react: ReturnConsultationEmail({
          name,
          email,
          serviceTitle,
          serviceId,
          price: priceDisplay,
          amountNumeric,
          selectedSlot,
          transactionRef,
        }),
      }),
    ]);

    // Log any individual send failures but don't block the response
    if (clientResult.status === "rejected" || clientResult.value?.error) {
      console.error("[consultationEmail] Client email failed:", clientResult);
      return NextResponse.json(
        { success: false, error: "Failed to send confirmation email to customer." },
        { status: 500 }
      );
    }

    if (ownerResult.status === "rejected" || ownerResult.value?.error) {
      // Non-fatal — customer email succeeded, log owner failure
      console.error("[consultationEmail] Owner notification email failed:", ownerResult);
    }

    // ── Google Sheets append ─────────────────────────────────
    try {
      await appendConsultationRegistration({
        name,
        email,
        serviceTitle,
        selectedSlot,
        transactionRef,
      });
    } catch (sheetErr) {
      console.error("[consultationEmail] Google Sheets append failed:", sheetErr);
    }

    return NextResponse.json({ success: true, transactionRef });

  } catch (err) {
    console.error("[consultationEmail] Unexpected error:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}