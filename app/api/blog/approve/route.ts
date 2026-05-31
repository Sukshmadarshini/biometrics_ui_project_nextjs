// app/api/blog/approve/route.ts

import { NextRequest, NextResponse } from "next/server";
// import { createClient } from "@sanity/client";
import { writer } from "../../../lib/sanity"; 
import { Resend } from "resend";
import { jwtVerify } from "jose";

// const sanity = createClient({
//   projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
//   dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
//   apiVersion: "2024-01-01",
//   token: process.env.SANITY_API_WRITE_TOKEN,
//   useCdn: false,
// });

const resend = new Resend(process.env.RESEND_API_KEY);
const JWT_SECRET = new TextEncoder().encode(process.env.BLOG_APPROVAL_SECRET!);
const OWNER_EMAIL = "sukshmadarshini@gmail.com";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!;

// ── Shared email wrapper ──────────────────────────────────────────────────────
function emailShell(innerHtml: string) {
  return `
    <div style="font-family:'Segoe UI',sans-serif;background:#f3f4f6;padding:40px 16px;min-height:100vh;">
      <div style="max-width:580px;margin:auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.07);">

        <div style="background:#15803d;padding:28px 36px;">
          <p style="margin:0;color:#bbf7d0;font-size:12px;letter-spacing:.12em;text-transform:uppercase;font-weight:600;">Sukshmadarshini</p>
          <h1 style="margin:6px 0 0;color:#fff;font-size:22px;font-weight:700;line-height:1.3;">Scientific Agriculture &amp; Plant Science</h1>
        </div>

        <div style="padding:32px 36px;">
          ${innerHtml}
        </div>

        <div style="padding:20px 36px;background:#f9fafb;border-top:1px solid #e5e7eb;">
          <p style="margin:0;font-size:12px;color:#9ca3af;text-align:center;">
            © ${new Date().getFullYear()} Sukshmadarshini · <a href="${BASE_URL}" style="color:#15803d;text-decoration:none;">sukshmadarshini.com</a>
          </p>
        </div>

      </div>
    </div>
  `;
}

// ── Browser confirmation page shown to the owner after clicking the link ──────
function htmlPage(title: string, message: string, isSuccess: boolean) {
  const color = isSuccess ? "#15803d" : "#dc2626";
  const icon  = isSuccess ? "✅" : "❌";
  return new NextResponse(
    `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>${title}</title>
  <style>
    *{box-sizing:border-box;margin:0;padding:0}
    body{min-height:100vh;display:flex;align-items:center;justify-content:center;font-family:'Segoe UI',system-ui,sans-serif;background:#f3f4f6}
    .card{background:#fff;border-radius:16px;padding:48px;max-width:460px;width:90%;text-align:center;box-shadow:0 4px 24px rgba(0,0,0,.08)}
    .icon{font-size:52px;margin-bottom:20px}
    h1{color:${color};font-size:24px;margin-bottom:12px}
    p{color:#6b7280;line-height:1.7;font-size:15px;margin-bottom:8px}
    a{color:${color};text-decoration:none;font-weight:600}
  </style>
</head>
<body>
  <div class="card">
    <div class="icon">${icon}</div>
    <h1>${title}</h1>
    <p>${message}</p>
    <p style="margin-top:24px"><a href="${BASE_URL}/blogs">← Back to Blogs</a></p>
  </div>
</body>
</html>`,
    { status: 200, headers: { "Content-Type": "text/html" } }
  );
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const token  = searchParams.get("token");
  const action = searchParams.get("action"); // "approve" | "reject"

  if (!token || !["approve", "reject"].includes(action ?? "")) {
    return htmlPage("Invalid Link", "This approval link is missing required parameters.", false);
  }

  // ── Verify JWT ────────────────────────────────────────────────────────────
  let docId: string;
  let submitterEmail: string | null = null;
  let blogTitle: string = "your blog post";

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    docId          = payload.docId as string;
    submitterEmail = (payload.submitterEmail as string) || null;
    blogTitle      = (payload.blogTitle as string) || "your blog post";
  } catch {
    return htmlPage(
      "Link Expired or Invalid",
      "This approval link has expired (links last 7 days) or has been tampered with.",
      false
    );
  }

  // ── Patch Sanity doc ──────────────────────────────────────────────────────
  try {
    const newStatus = action === "approve" ? "published" : "rejected";
    await writer.patch(docId).set({ status: newStatus }).commit();

    // ── EMAIL 3: Notify the submitter of the decision ─────────────────────
    if (submitterEmail) {
      if (action === "approve") {
        await resend.emails.send({
          from: `Sukshmadarshini Blog <no-reply@${new URL(BASE_URL).hostname}>`,
          // from: `Sukshmadarshini Blog <onboarding@resend.dev>`,
          to: submitterEmail,
          subject: `🎉 Your blog post is live — "${blogTitle}"`,
          html: emailShell(`
            <h2 style="margin:0 0 8px;color:#111827;font-size:20px;">Your post is published! 🎉</h2>
            <p style="margin:0 0 24px;color:#6b7280;font-size:14px;line-height:1.7;">
              Great news — your blog submission has been reviewed and approved. It's now live on the Sukshmadarshini website.
            </p>

            <div style="background:#f0fdf4;border-radius:10px;padding:20px 24px;margin-bottom:28px;">
              <p style="margin:0 0 4px;font-size:12px;font-weight:600;color:#15803d;text-transform:uppercase;letter-spacing:.08em;">Published Post</p>
              <p style="margin:0;font-size:18px;font-weight:700;color:#111827;">${blogTitle}</p>
            </div>

            <a href="${BASE_URL}/blogs"
               style="display:inline-block;background:#15803d;color:#fff;padding:13px 30px;border-radius:8px;text-decoration:none;font-weight:700;font-size:14px;margin-bottom:28px;">
              View it on the website →
            </a>

            <p style="font-size:13px;color:#6b7280;line-height:1.7;margin:0;">
              Thank you for contributing to our community! Feel free to share your post or submit another one.
            </p>
          `),
        });
      } else {
        // Rejected
        await resend.emails.send({
          from: `Sukshmadarshini Blog <no-reply@${new URL(BASE_URL).hostname}>`,
          // from: `Sukshmadarshini Blog <onboarding@resend.dev>`,
          to: submitterEmail,
          subject: `Blog submission update — "${blogTitle}"`,
          html: emailShell(`
            <h2 style="margin:0 0 8px;color:#111827;font-size:20px;">Submission Update</h2>
            <p style="margin:0 0 24px;color:#6b7280;font-size:14px;line-height:1.7;">
              Thank you for taking the time to submit a blog post. After review, we're unable to publish this particular submission on our platform at this time.
            </p>

            <div style="background:#fef2f2;border-radius:10px;padding:20px 24px;margin-bottom:28px;">
              <p style="margin:0 0 4px;font-size:12px;font-weight:600;color:#dc2626;text-transform:uppercase;letter-spacing:.08em;">Submission</p>
              <p style="margin:0;font-size:18px;font-weight:700;color:#111827;">${blogTitle}</p>
              <p style="margin:6px 0 0;font-size:13px;color:#6b7280;">Status: Not approved for publishing</p>
            </div>

            <div style="background:#fffbeb;border-left:3px solid #f59e0b;border-radius:0 8px 8px 0;padding:14px 18px;margin-bottom:24px;">
              <p style="margin:0;font-size:13px;color:#92400e;line-height:1.6;">
                This may be due to content focus, formatting, or editorial guidelines. We encourage you to review our published blogs for reference and consider resubmitting a revised version.
              </p>
            </div>

            <p style="font-size:14px;color:#6b7280;line-height:1.7;margin:0;">
              If you have questions, please reach out at
              <a href="mailto:${OWNER_EMAIL}" style="color:#15803d;font-weight:600;">${OWNER_EMAIL}</a>
            </p>
          `),
        });
      }
    }

    // ── Browser response to owner ─────────────────────────────────────────
    if (action === "approve") {
      return htmlPage(
        "Blog Published!",
        `"${blogTitle}" is now live on the website.${submitterEmail ? ` A notification has been sent to ${submitterEmail}.` : ""}`,
        true
      );
    } else {
      return htmlPage(
        "Blog Rejected",
        `The submission has been rejected and will not appear on the website.${submitterEmail ? ` ${submitterEmail} has been notified.` : ""}`,
        false
      );
    }
  } catch (err) {
    console.error("[blog/approve]", err);
    return htmlPage(
      "Something Went Wrong",
      "Could not update the blog status. Please try again or update it directly in Sanity Studio.",
      false
    );
  }
}