// // app/api/careerEmail/route.ts
// import { NextRequest, NextResponse } from "next/server";
// import { Resend } from "resend";
// import CareerEmail from "@/app/components/emails/CareerEmail";
// import ReturnCareerEmail from "@/app/components/emails/ReturnCareerEmail";
// import { appendCareerSubmission } from "@/app/lib/googleapi"; // add this helper alongside appendContactSubmission

// export const dynamic = "force-dynamic";

// // ─── Validation helpers (same as contact form) ────────────────────────────────

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
//   if (!t || t.length < 2 || t.length > 100) return false;
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
//     // ── Parse multipart/form-data ─────────────────────────────────────────────
//     const formData = await req.formData();

//     const name            = (formData.get("name")            as string | null)?.trim() ?? "";
//     const email           = (formData.get("email")           as string | null)?.trim() ?? "";
//     const position        = (formData.get("position")        as string | null)?.trim() ?? "";
//     const whyHire         = (formData.get("whyHire")         as string | null)?.trim() ?? "";
//     const extracurriculars= (formData.get("extracurriculars")as string | null)?.trim() ?? "";
//     const resumeFile      =  formData.get("resume") as File | null;

//     // ── Validation ────────────────────────────────────────────────────────────
//     if (!isNameValid(name))
//       return NextResponse.json({ success: false, error: "Invalid name." }, { status: 400 });

//     if (!isEmailFormatValid(email))
//       return NextResponse.json({ success: false, error: "Invalid email address." }, { status: 400 });

//     if (!position || position.length < 2)
//       return NextResponse.json({ success: false, error: "Position is required." }, { status: 400 });

//     if (!whyHire || whyHire.length < 20)
//       return NextResponse.json({ success: false, error: "Please write at least 20 characters for your pitch." }, { status: 400 });

//     if (!resumeFile || resumeFile.size === 0)
//       return NextResponse.json({ success: false, error: "Resume attachment is required." }, { status: 400 });

//     // 5 MB guard
//     if (resumeFile.size > 5 * 1024 * 1024)
//       return NextResponse.json({ success: false, error: "Resume must be under 5 MB." }, { status: 400 });

//     const allowedMime = [
//       "application/pdf",
//       "application/msword",
//       "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//     ];
//     if (!allowedMime.includes(resumeFile.type))
//       return NextResponse.json({ success: false, error: "Resume must be a PDF, DOC, or DOCX file." }, { status: 400 });

//     // ── Abstract API deep email verification ──────────────────────────────────
//     const { valid, reason } = await verifyEmailViaRoute(email);
//     if (!valid)
//       return NextResponse.json(
//         { success: false, error: reason ?? "Email address failed verification." },
//         { status: 400 }
//       );

//     // ── Convert resume to base64 for Resend attachment ────────────────────────
//     const resumeBuffer = Buffer.from(await resumeFile.arrayBuffer());
//     const resumeBase64 = resumeBuffer.toString("base64");

//     // Derive a safe filename
//     const safeFileName = resumeFile.name.replace(/[^a-zA-Z0-9._\-]/g, "_");

//     // ── Send both emails in parallel ──────────────────────────────────────────
//     const resend = new Resend(process.env.RESEND_API_KEY);

//     const [ownerResult, clientResult] = await Promise.allSettled([
//       // 1️⃣  To the owner — full application + resume attachment
//       resend.emails.send({
//         from:    process.env.OWNER_EMAIL_FROM!,
//         to:      process.env.EMAIL_TO!,
//         subject: `Job Application for ${position} · ${name}`,
//         react:   CareerEmail({ name, email, position, whyHire, extracurriculars }),
//         attachments: [
//           {
//             filename:    safeFileName,
//             content:     resumeBase64,
//             contentType: resumeFile.type,
//           },
//         ],
//       }),

//       // 2️⃣  To the applicant — acknowledgement (no attachment needed)
//       resend.emails.send({
//         from:    process.env.CLIENT_EMAIL_FROM!,
//         to:      email,
//         subject: `We received your application for ${position}`,
//         react:   ReturnCareerEmail({ name, email, position }),
//       }),
//     ]);

//     if (ownerResult.status === "rejected" || ownerResult.value?.error) {
//       console.error("[careerEmail] Owner email failed:", ownerResult);
//       return NextResponse.json(
//         { success: false, error: "Failed to send application." },
//         { status: 500 }
//       );
//     }

//     if (clientResult.status === "rejected" || clientResult.value?.error) {
//       console.error("[careerEmail] Applicant acknowledgement failed:", clientResult);
//       // Non-fatal — submission already recorded
//     }

//     // ── Google Sheets (non-fatal) ─────────────────────────────────────────────
//     try {
//       await appendCareerSubmission({ name, email, position, whyHire, extracurriculars });
//     } catch (sheetErr) {
//       console.error("[careerEmail] Google Sheets append failed:", sheetErr);
//     }

//     return NextResponse.json({ success: true });

//   } catch (err) {
//     console.error("[careerEmail] Unexpected error:", err);
//     return NextResponse.json({ success: false, error: "Internal server error." }, { status: 500 });
//   }
// }

// app/api/careerEmail/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import CareerEmail from "@/app/components/emails/CareerEmail";
import ReturnCareerEmail from "@/app/components/emails/ReturnCareerEmail";
import { appendCareerSubmission } from "@/app/lib/googleapi";
import { getEmailContents } from "@/app/lib/queries/email-templates";

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
  if (!t || t.length < 2 || t.length > 100) return false;
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
    // ── Parse multipart/form-data ─────────────────────────────────────────────
    const formData = await req.formData();

    const name             = (formData.get("name")             as string | null)?.trim() ?? "";
    const email            = (formData.get("email")            as string | null)?.trim() ?? "";
    const position         = (formData.get("position")         as string | null)?.trim() ?? "";
    const whyHire          = (formData.get("whyHire")          as string | null)?.trim() ?? "";
    const extracurriculars = (formData.get("extracurriculars") as string | null)?.trim() ?? "";
    const resumeFile       =  formData.get("resume") as File | null;

    // ── Validation ────────────────────────────────────────────────────────────
    if (!isNameValid(name))
      return NextResponse.json({ success: false, error: "Invalid name." }, { status: 400 });

    if (!isEmailFormatValid(email))
      return NextResponse.json({ success: false, error: "Invalid email address." }, { status: 400 });

    if (!position || position.length < 2)
      return NextResponse.json({ success: false, error: "Position is required." }, { status: 400 });

    if (!whyHire || whyHire.length < 20)
      return NextResponse.json({ success: false, error: "Please write at least 20 characters for your pitch." }, { status: 400 });

    if (!resumeFile || resumeFile.size === 0)
      return NextResponse.json({ success: false, error: "Resume attachment is required." }, { status: 400 });

    if (resumeFile.size > 5 * 1024 * 1024)
      return NextResponse.json({ success: false, error: "Resume must be under 5 MB." }, { status: 400 });

    const allowedMime = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!allowedMime.includes(resumeFile.type))
      return NextResponse.json({ success: false, error: "Resume must be a PDF, DOC, or DOCX file." }, { status: 400 });

    // ── Abstract API deep email verification ──────────────────────────────────
    const { valid, reason } = await verifyEmailViaRoute(email);
    if (!valid)
      return NextResponse.json(
        { success: false, error: reason ?? "Email address failed verification." },
        { status: 400 }
      );

    // ── Fetch CMS-driven email content (both templates in parallel) ───────────
    const emailContents = await getEmailContents(["career", "returnCareer"]);

    const careerContent = emailContents["career"] ?? {};
    const returnCareerContent = emailContents["returnCareer"] ?? {};

    // Merge with fallbacks
    const ownerEmailContent = {
      headerTitle:    "New Job Application",
      headerSubtitle: "Sukshmadarshini™ · Careers",
      bodyText:       "A new job application has been submitted via the website. Review the details below and follow up with the applicant.",
      resumeNote:     "📎 Resume attached: see the attachment in this email.",
      footerText:     "This application was submitted via the Sukshmadarshini™ Careers page.",
      ...careerContent,
    };

    const clientEmailContent = {
      headerTitle:    "Application Received",
      bodyText:       "Thank you for applying to Sukshmadarshini™. We have successfully received your application. Our team will review it and get back to you within 5 to 7 business days.",
      nextStepsTitle: "What happens next?",
      step1:          "📋 Our team will review your resume and cover letter.",
      step2:          "🕐 We aim to respond within 5 to 7 business days.",
      signOff:        "If you have any questions in the meantime, feel free to reply to this email.",
      footerText:     "This email was sent from Sukshmadarshini™",
      ...returnCareerContent,
    };

    // ── Convert resume to base64 for Resend attachment ────────────────────────
    const resumeBuffer = Buffer.from(await resumeFile.arrayBuffer());
    const resumeBase64 = resumeBuffer.toString("base64");
    const safeFileName = resumeFile.name.replace(/[^a-zA-Z0-9._\-]/g, "_");

    // ── Send both emails in parallel ──────────────────────────────────────────
    const resend = new Resend(process.env.RESEND_API_KEY);

    const [ownerResult, clientResult] = await Promise.allSettled([
      // 1️⃣  To the owner — full application + resume attachment
      resend.emails.send({
        from:    process.env.OWNER_EMAIL_FROM!,
        to:      process.env.EMAIL_TO!,
        replyTo: process.env.EMAIL_TO!,
        subject: `Job Application for ${position} · ${name}`,
        react:   CareerEmail({ name, email, position,
          //  whyHire, extracurriculars,
            emailContent: ownerEmailContent }),
        attachments: [
          {
            filename:    safeFileName,
            content:     resumeBase64,
            contentType: resumeFile.type,
          },
        ],
      }),

      // 2️⃣  To the applicant — acknowledgement
      resend.emails.send({
        from:    process.env.CLIENT_EMAIL_FROM!,
        to:      email,
        replyTo: process.env.EMAIL_TO!,
        subject: `We received your application for ${position}`,
        react:   ReturnCareerEmail({ name, email, position, emailContent: clientEmailContent }),
      }),
    ]);

    if (ownerResult.status === "rejected" || ownerResult.value?.error) {
      console.error("[careerEmail] Owner email failed:", ownerResult);
      return NextResponse.json(
        { success: false, error: "Failed to send application." },
        { status: 500 }
      );
    }

    if (clientResult.status === "rejected" || clientResult.value?.error) {
      console.error("[careerEmail] Applicant acknowledgement failed:", clientResult);
    }

    // ── Google Sheets (non-fatal) ─────────────────────────────────────────────
    try {
      await appendCareerSubmission({ name, email, position, whyHire, extracurriculars });
    } catch (sheetErr) {
      console.error("[careerEmail] Google Sheets append failed:", sheetErr);
    }

    return NextResponse.json({ success: true });

  } catch (err) {
    console.error("[careerEmail] Unexpected error:", err);
    return NextResponse.json({ success: false, error: "Internal server error." }, { status: 500 });
  }
}