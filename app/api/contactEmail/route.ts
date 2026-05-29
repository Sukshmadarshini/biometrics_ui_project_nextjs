// // app/api/contactEmail/route.ts
// import { NextRequest, NextResponse } from "next/server";
// import { Resend } from "resend";
// import ContactEmail from "@/app/components/emails/ContactEmail";

// export const dynamic = "force-dynamic";

// // ─── Server-side validation helpers ──────────────────────────────────────────

// const DISPOSABLE_DOMAINS = new Set([
//   "mailinator.com", "guerrillamail.com", "tempmail.com", "yopmail.com",
//   "sharklasers.com", "spam4.me", "trashmail.com", "trashmail.me",
//   "dispostable.com", "maildrop.cc", "fakeinbox.com", "10minutemail.com",
//   "tempr.email", "discard.email", "mytemp.email", "temp-mail.org",
//   "throwaway.email", "getnada.com",
// ]);

// const FAKE_NAME_PATTERNS = [
//   /^(.)\1{2,}$/i,
//   /^[^aeiou]{5,}$/i,
//   /^(test|fake|asdf|qwerty|admin|user|anon|anonymous|nobody|noone|noreply|abc|xyz)$/i,
//   /^[a-z]{1,2}$/i,
//   /\d{3,}/,
// ];

// function isNameValid(name: string): boolean {
//   const t = name.trim();
//   if (!t || t.length < 2 || t.length > 50) return false;
//   if (!/^[\p{L}\p{M}'\- ]+$/u.test(t)) return false;
//   return !FAKE_NAME_PATTERNS.some((p) => p.test(t));
// }

// function isEmailFormatValid(email: string): boolean {
//   const t = email.trim().toLowerCase();
//   if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(t)) return false;
//   const domain = t.split("@")[1];
//   if (DISPOSABLE_DOMAINS.has(domain)) return false;
//   const local = t.split("@")[0];
//   return !/^(test|fake|noreply|no-reply|donotreply|spam|trash|throwaway|temp)\d*$/i.test(local);
// }

// // ─── Reuse /api/validate-email for the Abstract API check ────────────────────

// async function verifyEmailViaRoute(email: string): Promise<{ valid: boolean; reason?: string }> {
//   try {
//     const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
//     const res = await fetch(
//       `${baseUrl}/api/validateEmail?email=${encodeURIComponent(email)}`,
//       { cache: "no-store" }
//     );
//     if (!res.ok) return { valid: true };
//     return res.json();
//   } catch {
//     return { valid: true };
//   }
// }

// // ─── Route handler ────────────────────────────────────────────────────────────

// export async function POST(req: NextRequest) {
//   try {
//     const body = await req.json();
//     const { firstName, lastName, email, subject, message } = body;
//     const name = `${firstName} ${lastName}`;

//     // ── Server-side field validation ─────────────────────────────────────────
//     if (!isNameValid(firstName))
//       return NextResponse.json({ success: false, error: "Invalid first name." }, { status: 400 });

//     if (!isNameValid(lastName))
//       return NextResponse.json({ success: false, error: "Invalid last name." }, { status: 400 });

//     if (!isEmailFormatValid(email))
//       return NextResponse.json({ success: false, error: "Invalid email address." }, { status: 400 });

//     if (!subject?.trim() || subject.trim().length < 3)
//       return NextResponse.json({ success: false, error: "Invalid subject." }, { status: 400 });

//     if (!message?.trim() || message.trim().length < 10)
//       return NextResponse.json({ success: false, error: "Message too short." }, { status: 400 });

//     // ── Abstract API deep verification via /api/validate-email ───────────────
//     const { valid, reason } = await verifyEmailViaRoute(email);
//     if (!valid)
//       return NextResponse.json(
//         { success: false, error: reason ?? "Email address failed verification." },
//         { status: 400 }
//       );

//     // ── Send via Resend using your ContactEmail component ────────────────────
//     const resend = new Resend(process.env.RESEND_API_KEY);

//     const { error } = await resend.emails.send({
//       from:    process.env.OWNER_EMAIL_FROM!,
//       to:      process.env.EMAIL_TO!,
//       replyTo: email,
//       subject: `[Contact Form] ${subject}`,
//       react:   ContactEmail({ name, email, subject, message }),
//     });

//     if (error) {
//       console.error("[contactEmail] Resend error:", error);
//       return NextResponse.json({ success: false, error: "Failed to send email." }, { status: 500 });
//     }

//     return NextResponse.json({ success: true });

//   } catch (err) {
//     console.error("[contactEmail] Unexpected error:", err);
//     return NextResponse.json({ success: false, error: "Internal server error." }, { status: 500 });
//   }
// }

// app/api/contactEmail/route.ts
// app/api/contactEmail/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import ContactEmail from "@/app/components/emails/ContactEmail";
import ReturnContactEmail from "@/app/components/emails/ReturnContactEmail";
import { appendContactSubmission } from "@/app/lib/googleapi";

export const dynamic = "force-dynamic";

// ─── Validation helpers ───────────────────────────────────────────────────────

const DISPOSABLE_DOMAINS = new Set([
  "mailinator.com", "guerrillamail.com", "tempmail.com", "yopmail.com",
  "sharklasers.com", "spam4.me", "trashmail.com", "trashmail.me",
  "dispostable.com", "maildrop.cc", "fakeinbox.com", "10minutemail.com",
  "tempr.email", "discard.email", "mytemp.email", "temp-mail.org",
  "throwaway.email", "getnada.com",
]);

const FAKE_NAME_PATTERNS = [
  /^(.)\1{2,}$/i,
  /^[^aeiou]{5,}$/i,
  /^(test|fake|asdf|qwerty|admin|user|anon|anonymous|nobody|noone|noreply|abc|xyz)$/i,
  /^[a-z]{1,2}$/i,
  /\d{3,}/,
];

function isNameValid(name: string): boolean {
  const t = name.trim();
  if (!t || t.length < 2 || t.length > 50) return false;
  if (!/^[\p{L}\p{M}'\- ]+$/u.test(t)) return false;
  return !FAKE_NAME_PATTERNS.some((p) => p.test(t));
}

function isEmailFormatValid(email: string): boolean {
  const t = email.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(t)) return false;
  const domain = t.split("@")[1];
  if (DISPOSABLE_DOMAINS.has(domain)) return false;
  const local = t.split("@")[0];
  return !/^(test|fake|noreply|no-reply|donotreply|spam|trash|throwaway|temp)\d*$/i.test(local);
}

async function verifyEmailViaRoute(email: string): Promise<{ valid: boolean; reason?: string }> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
    const res = await fetch(
      `${baseUrl}/api/validateEmail?email=${encodeURIComponent(email)}`,
      { cache: "no-store" }
    );
    if (!res.ok) return { valid: true };
    return res.json();
  } catch {
    return { valid: true };
  }
}

// ─── Route handler ────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, subject, message } = body;
    const name = `${firstName} ${lastName}`;

    // ── Validation ───────────────────────────────────────────
    if (!isNameValid(firstName))
      return NextResponse.json({ success: false, error: "Invalid first name." }, { status: 400 });

    if (!isNameValid(lastName))
      return NextResponse.json({ success: false, error: "Invalid last name." }, { status: 400 });

    if (!isEmailFormatValid(email))
      return NextResponse.json({ success: false, error: "Invalid email address." }, { status: 400 });

    if (!subject?.trim() || subject.trim().length < 3)
      return NextResponse.json({ success: false, error: "Invalid subject." }, { status: 400 });

    if (!message?.trim() || message.trim().length < 10)
      return NextResponse.json({ success: false, error: "Message too short." }, { status: 400 });

    const { valid, reason } = await verifyEmailViaRoute(email);
    if (!valid)
      return NextResponse.json(
        { success: false, error: reason ?? "Email address failed verification." },
        { status: 400 }
      );

    // ── Send both emails in parallel ─────────────────────────
    const resend = new Resend(process.env.RESEND_API_KEY);

    const [ownerResult, clientResult] = await Promise.allSettled([
      // 1️⃣  To the owner — new contact form submission
      resend.emails.send({
        from:    process.env.OWNER_EMAIL_FROM!,
        to:      process.env.EMAIL_TO!,
        replyTo: email,
        subject: `Contact Form: ${subject}`,
        react:   ContactEmail({ name, email, subject, message }),
      }),

      // 2️⃣  To the user — acknowledgement
      resend.emails.send({
        from:    process.env.CLIENT_EMAIL_FROM!,
        to:      email,
        replyTo: process.env.EMAIL_TO!,
        subject: `We received your message - ${subject}`,
        react:   ReturnContactEmail({ name, email, subject, message }),
      }),
    ]);

    if (ownerResult.status === "rejected" || ownerResult.value?.error) {
      console.error("[contactEmail] Owner email failed:", ownerResult);
      return NextResponse.json(
        { success: false, error: "Failed to send email." },
        { status: 500 }
      );
    }

    if (clientResult.status === "rejected" || clientResult.value?.error) {
      console.error("[contactEmail] User acknowledgement email failed:", clientResult);
    }

    // ── Google Sheets append ─────────────────────────────────
    try {
      await appendContactSubmission({ name, email, subject, message });
    } catch (sheetErr) {
      // Non-fatal — log but don't fail the submission
      console.error("[contactEmail] Google Sheets append failed:", sheetErr);
    }

    return NextResponse.json({ success: true });

  } catch (err) {
    console.error("[contactEmail] Unexpected error:", err);
    return NextResponse.json({ success: false, error: "Internal server error." }, { status: 500 });
  }
}