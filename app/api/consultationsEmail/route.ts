// // app/api/consultationsEmail/route.ts
// import { NextRequest, NextResponse } from "next/server";
// import { Resend } from "resend";
// import { sanity } from "@/app/lib/sanity";
// import ConsultationEmail from "@/app/components/emails/ConsultationEmail";
// import ReturnConsultationEmail from "@/app/components/emails/ReturnConsultationEmail";
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

//     // ── Secure fetch from Sanity ─────────────────────────────
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

//     // ── UPI config ───────────────────────────────────────────
//     const upiId = process.env.UPI_ID;
//     const upiName = process.env.UPI_NAME ?? "Sukshmadarshini";

//     if (!upiId) {
//       return NextResponse.json(
//         { success: false, error: "Payment configuration missing" },
//         { status: 500 }
//       );
//     }

//     const transactionRef = generateTransactionRef(serviceId);
//     const upiUrl = buildUpiUrl({ upiId, upiName, amount: amountNumeric, transactionRef });
//     const qrDataUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(upiUrl)}`;

//     // ── Send both emails in parallel ─────────────────────────
//     const resend = new Resend(process.env.RESEND_API_KEY);

//     const [clientResult, ownerResult] = await Promise.allSettled([
//       // 1️⃣  To the customer — payment instructions
//       resend.emails.send({
//         from:    process.env.CLIENT_EMAIL_FROM!,
//         to:      email,
//         // replyTo: process.env.EMAIL_TO!,
//         subject: `Booking Confirmed for ${serviceTitle} - Payment details inside`,
//         react: ConsultationEmail({
//           name,
//           email,
//           serviceTitle,
//           serviceId,
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
//         // replyTo: email,
//         subject: `New Consultation Registration for ${serviceTitle} - ${name}`,
//         react: ReturnConsultationEmail({
//           name,
//           email,
//           serviceTitle,
//           serviceId,
//           price: priceDisplay,
//           amountNumeric,
//           selectedSlot,
//           transactionRef,
//         }),
//       }),
//     ]);

//     // Log any individual send failures but don't block the response
//     if (clientResult.status === "rejected" || clientResult.value?.error) {
//       console.error("[consultationEmail] Client email failed:", clientResult);
//       return NextResponse.json(
//         { success: false, error: "Failed to send confirmation email to customer." },
//         { status: 500 }
//       );
//     }

//     if (ownerResult.status === "rejected" || ownerResult.value?.error) {
//       // Non-fatal — customer email succeeded, log owner failure
//       console.error("[consultationEmail] Owner notification email failed:", ownerResult);
//     }

//     // ── Google Sheets append ─────────────────────────────────
//     try {
//       await appendConsultationRegistration({
//         name,
//         email,
//         serviceTitle,
//         selectedSlot,
//         transactionRef,
//       });
//     } catch (sheetErr) {
//       console.error("[consultationEmail] Google Sheets append failed:", sheetErr);
//     }

//     return NextResponse.json({ success: true, transactionRef });

//   } catch (err) {
//     console.error("[consultationEmail] Unexpected error:", err);
//     return NextResponse.json(
//       { success: false, error: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }

// app/api/consultationEmail/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { sanity } from "@/app/lib/sanity";
import ConsultationEmail from "@/app/components/emails/ConsultationEmail";
import ReturnConsultationEmail from "@/app/components/emails/ReturnConsultationEmail";
import { appendConsultationRegistration } from "@/app/lib/googleapi";
import { getEmailContents } from "@/app/lib/queries/email-templates";

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
    console.log("[consultationEmail] BODY RECEIVED:", body);

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
    const priceDisplay  = service.priceLabel ?? `₹${service.price}`;

    // ── UPI config ───────────────────────────────────────────
    const upiId   = process.env.UPI_ID;
    const upiName = process.env.UPI_NAME ?? "Sukshmadarshini";

    if (!upiId) {
      return NextResponse.json(
        { success: false, error: "Payment configuration missing" },
        { status: 500 }
      );
    }

    const transactionRef = generateTransactionRef(serviceId);
    const upiUrl         = buildUpiUrl({ upiId, upiName, amount: amountNumeric, transactionRef });
    const qrDataUrl      = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(upiUrl)}`;

    // ── Fetch CMS-driven email content (both templates in parallel) ───────────
    const emailContents = await getEmailContents(["consultation", "returnConsultation"]);

    const clientEmailContent = {
      headerTitle:       "Booking Confirmed",
      headerSubtitle:    "Sukshmadarshini™ Consultation",
      bodyText:          "Thank you for registering for our consultation session. We are excited to have you join us. To confirm your slot, please complete the payment using the details below.",
      upiNote:           "You can make the payment using any UPI app: Google Pay, PhonePe, Paytm, etc.",
      afterPaymentTitle: "After Payment",
      afterPaymentText:  "Once you have completed the payment, please reply to this email with your name and a screenshot of the payment confirmation.",
      importantNote:     "Your slot is held temporarily. It will be auto-released if payment is not received 1 day prior to the session.",
      signOff:           "If you have any questions or face any issues, feel free to reply to this email: we are happy to help.",
      footerText:        "This email was sent from Sukshmadarshini™",
      ...emailContents["consultation"],
    };

    const ownerEmailContent = {
      headerTitle:    "New Consultation Registration",
      headerSubtitle: "Sukshmadarshini™ · Internal Notification",
      bodyText:       "A new consultation registration has been received. Payment is pending verification. Please review the details below and confirm once payment is received.",
      actionNote:     "Action required: Verify payment using the transaction reference above. Confirm the booking by replying to the client's email once payment is received. Slot will auto-cancel if payment is not received 1 day prior to the session.",
      footerText:     "Sukshmadarshini™ Internal Notification",
      ...emailContents["returnConsultation"],
    };

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
          emailContent: clientEmailContent,
        }),
      }),

      // 2️⃣  To the owner — new registration notification
      resend.emails.send({
        from:    process.env.OWNER_EMAIL_FROM!,
        to:      process.env.EMAIL_TO!,
        replyTo: process.env.EMAIL_TO!,
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
          emailContent: ownerEmailContent,
        }),
      }),
    ]);

    if (clientResult.status === "rejected" || clientResult.value?.error) {
      console.error("[consultationEmail] Client email failed:", clientResult);
      return NextResponse.json(
        { success: false, error: "Failed to send confirmation email to customer." },
        { status: 500 }
      );
    }

    if (ownerResult.status === "rejected" || ownerResult.value?.error) {
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