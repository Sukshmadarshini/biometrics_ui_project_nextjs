// app/api/collaborationEmail/route.ts

import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import CollaborationEmail from "@/app/components/emails/CollaborationEmail";
import ReturnCollaborationEmail from "@/app/components/emails/ReturnCollaborationEmail";
import { appendCollaborationInquiry } from "@/app/lib/googleapi";

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

function isOrgValid(org: string): boolean {
  const t = org.trim();
  if (!t || t.length < 2 || t.length > 150) return false;
  return /^[\p{L}\p{M}0-9'\-\.,& ]+$/u.test(t);
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
    const { name, email, organization, collaborationType, message } = body;

    // ── Validation ───────────────────────────────────────────
    if (!isNameValid(name))
      return NextResponse.json({ success: false, error: "Invalid name." }, { status: 400 });

    if (!isEmailFormatValid(email))
      return NextResponse.json({ success: false, error: "Invalid email address." }, { status: 400 });

    if (!isOrgValid(organization))
      return NextResponse.json({ success: false, error: "Invalid organization name." }, { status: 400 });

    if (!collaborationType?.trim() || collaborationType.trim().length < 3)
      return NextResponse.json({ success: false, error: "Please specify a collaboration type." }, { status: 400 });

    if (!message?.trim() || message.trim().length < 20)
      return NextResponse.json({ success: false, error: "Message too short (min 20 characters)." }, { status: 400 });

    const { valid, reason } = await verifyEmailViaRoute(email);
    if (!valid)
      return NextResponse.json(
        { success: false, error: reason ?? "Email address failed verification." },
        { status: 400 }
      );

    // ── Send both emails in parallel ─────────────────────────
    const resend = new Resend(process.env.RESEND_API_KEY);

    const [ownerResult, clientResult] = await Promise.allSettled([
      // 1️⃣  To the owner — new collaboration inquiry
      resend.emails.send({
        from:    process.env.OWNER_EMAIL_FROM!,
        to:      process.env.EMAIL_TO!,
        // replyTo: email,
        subject: `Collaboration Inquiry for ${collaborationType} - ${organization}`,
        react:   CollaborationEmail({ name, email, organization, collaborationType, message }),
      }),

      // 2️⃣  To the user — acknowledgement
      resend.emails.send({
        from:    process.env.CLIENT_EMAIL_FROM!,
        to:      process.env.EMAIL_TO!,
        // replyTo: email,
        subject: `We received your collaboration inquiry for ${collaborationType}`,
        react:   ReturnCollaborationEmail({ name, email, organization, collaborationType, message }),
      }),
    ]);

    if (ownerResult.status === "rejected" || ownerResult.value?.error) {
      console.error("[collaborationEmail] Owner email failed:", ownerResult);
      return NextResponse.json(
        { success: false, error: "Failed to send email." },
        { status: 500 }
      );
    }

    if (clientResult.status === "rejected" || clientResult.value?.error) {
      console.error("[collaborationEmail] User acknowledgement email failed:", clientResult);
    }

    // ── Google Sheets append ─────────────────────────────────
    try {
      await appendCollaborationInquiry({ name, email, organization, collaborationType, message });
    } catch (sheetErr) {
      console.error("[collaborationEmail] Google Sheets append failed:", sheetErr);
    }

    return NextResponse.json({ success: true });

  } catch (err) {
    console.error("[collaborationEmail] Unexpected error:", err);
    return NextResponse.json({ success: false, error: "Internal server error." }, { status: 500 });
  }
}