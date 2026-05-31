// // app/api/blog/submit/route.ts

// import { NextRequest, NextResponse } from "next/server";
// import { createClient } from "@sanity/client";
// import { Resend } from "resend";
// import { SignJWT } from "jose";

// const sanity = createClient({
//   projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
//   dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
//   apiVersion: "2024-01-01",
//   token: process.env.SANITY_API_WRITE_TOKEN,
//   useCdn: false,
// });

// const resend = new Resend(process.env.RESEND_API_KEY);
// const JWT_SECRET = new TextEncoder().encode(process.env.BLOG_APPROVAL_SECRET!);
// const OWNER_EMAIL = "sukshmadarshini@gmail.com";
// const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!;

// // ── Shared email wrapper ──────────────────────────────────────────────────────
// // Wrap any inner HTML in a consistent branded shell
// function emailShell(innerHtml: string) {
//   return `
//     <div style="font-family:'Segoe UI',sans-serif;background:#f3f4f6;padding:40px 16px;min-height:100vh;">
//       <div style="max-width:580px;margin:auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.07);">

//         <!-- Header -->
//         <div style="background:#15803d;padding:28px 36px;">
//           <p style="margin:0;color:#bbf7d0;font-size:12px;letter-spacing:.12em;text-transform:uppercase;font-weight:600;">Sukshmadarshini</p>
//           <h1 style="margin:6px 0 0;color:#fff;font-size:22px;font-weight:700;line-height:1.3;">Scientific Agriculture &amp; Plant Science</h1>
//         </div>

//         <!-- Body -->
//         <div style="padding:32px 36px;">
//           ${innerHtml}
//         </div>

//         <!-- Footer -->
//         <div style="padding:20px 36px;background:#f9fafb;border-top:1px solid #e5e7eb;">
//           <p style="margin:0;font-size:12px;color:#9ca3af;text-align:center;">
//             © ${new Date().getFullYear()} Sukshmadarshini · <a href="${BASE_URL}" style="color:#15803d;text-decoration:none;">sukshmadarshini.com</a>
//           </p>
//         </div>

//       </div>
//     </div>
//   `;
// }

// export async function POST(req: NextRequest) {
//   try {
//     const body = await req.json();
//     const { title, author, email, excerpt, content } = body as {
//       title: string;
//       author: string;
//       email?: string;
//       excerpt?: string;
//       content: string;
//     };

//     // ── Validation ────────────────────────────────────────────────────────────
//     if (!title?.trim() || !content?.trim()) {
//       return NextResponse.json({ message: "Title and content are required" }, { status: 400 });
//     }
//     if (title.length > 120 || (author?.length ?? 0) > 60 || content.length > 10000) {
//       return NextResponse.json({ message: "Input too long" }, { status: 400 });
//     }

//     const words = content.split(/\s+/).filter(Boolean).length;
//     const readTime = `${Math.max(1, Math.round(words / 200))} min read`;

//     // ── Plain text → Portable Text blocks ────────────────────────────────────
//     const portableTextContent = content
//       .split(/\n\n+/)
//       .map((para) => ({
//         _type: "block",
//         _key: crypto.randomUUID().replace(/-/g, "").slice(0, 12),
//         style: "normal",
//         markDefs: [],
//         children: [
//           {
//             _type: "span",
//             _key: crypto.randomUUID().replace(/-/g, "").slice(0, 12),
//             text: para.trim(),
//             marks: [],
//           },
//         ],
//       }));

//     // ── Slug ──────────────────────────────────────────────────────────────────
//     const slugCurrent = title
//       .trim()
//       .toLowerCase()
//       .replace(/[^a-z0-9\s-]/g, "")
//       .replace(/\s+/g, "-")
//       .slice(0, 96);

//     // ── Create Sanity doc (status: pending) ───────────────────────────────────
//     const doc = await sanity.create({
//       _type: "blog",
//       id: { _type: "slug", current: slugCurrent },
//       title: title.trim(),
//       author: author?.trim() || "Anonymous",
//       submitterEmail: email?.trim() || null,
//       excerpt: excerpt?.trim() || content.slice(0, 140) + (content.length > 140 ? "…" : ""),
//       content: portableTextContent,
//       readTime,
//       date: new Date().toISOString().slice(0, 10),
//       likes: 0,
//       status: "pending",
//     });

//     // ── Sign JWT (7-day expiry) ────────────────────────────────────────────────
//     // Carry both docId AND submitter email so the approve route can notify them
//     const token = await new SignJWT({
//       docId: doc._id,
//       submitterEmail: email?.trim() || null,
//       blogTitle: title.trim(),
//     })
//       .setProtectedHeader({ alg: "HS256" })
//       .setExpirationTime("7d")
//       .sign(JWT_SECRET);

//     const approveUrl = `${BASE_URL}/api/blog/approve?token=${token}&action=approve`;
//     const rejectUrl  = `${BASE_URL}/api/blog/approve?token=${token}&action=reject`;

//     // ── EMAIL 1: Owner approval request ───────────────────────────────────────
//     await resend.emails.send({
//       from: `Sukshmadarshini Blog <no-reply@${new URL(BASE_URL).hostname}>`,
//       to: OWNER_EMAIL,
//       subject: `📝 New blog submission: "${title.trim()}"`,
//       html: emailShell(`
//         <h2 style="margin:0 0 4px;color:#111827;font-size:20px;">New Blog Submission</h2>
//         <p style="margin:0 0 24px;color:#6b7280;font-size:14px;">Someone submitted a blog post for your review.</p>

//         <table style="width:100%;border-collapse:collapse;margin-bottom:24px;font-size:14px;">
//           <tr style="border-bottom:1px solid #f3f4f6;">
//             <td style="color:#6b7280;padding:10px 0;width:110px;vertical-align:top;">Title</td>
//             <td style="font-weight:600;color:#111827;padding:10px 0;">${title.trim()}</td>
//           </tr>
//           <tr style="border-bottom:1px solid #f3f4f6;">
//             <td style="color:#6b7280;padding:10px 0;">Author</td>
//             <td style="color:#111827;padding:10px 0;">${author?.trim() || "Anonymous"}</td>
//           </tr>
//           ${email ? `
//           <tr style="border-bottom:1px solid #f3f4f6;">
//             <td style="color:#6b7280;padding:10px 0;">Email</td>
//             <td style="color:#111827;padding:10px 0;">${email.trim()}</td>
//           </tr>` : ""}
//           <tr>
//             <td style="color:#6b7280;padding:10px 0;">Read time</td>
//             <td style="color:#111827;padding:10px 0;">${readTime}</td>
//           </tr>
//         </table>

//         <div style="background:#f0fdf4;border-left:3px solid #16a34a;border-radius:0 8px 8px 0;padding:16px 20px;margin-bottom:28px;">
//           <p style="margin:0 0 6px;font-size:12px;font-weight:600;color:#15803d;text-transform:uppercase;letter-spacing:.08em;">Excerpt</p>
//           <p style="margin:0;color:#374151;font-size:14px;line-height:1.7;">${excerpt?.trim() || content.slice(0, 200) + "…"}</p>
//         </div>

//         <p style="font-size:13px;color:#6b7280;margin-bottom:20px;">
//           Review the full post in
//           <a href="https://www.sanity.io/manage" style="color:#15803d;font-weight:600;">Sanity Studio</a>
//           before approving. These links expire in <strong>7 days</strong>.
//         </p>

//         <div style="display:flex;gap:12px;">
//           <a href="${approveUrl}"
//              style="display:inline-block;background:#15803d;color:#fff;padding:13px 30px;border-radius:8px;text-decoration:none;font-weight:700;font-size:14px;">
//             ✅ Approve &amp; Publish
//           </a>
//           &nbsp;&nbsp;
//           <a href="${rejectUrl}"
//              style="display:inline-block;background:#dc2626;color:#fff;padding:13px 30px;border-radius:8px;text-decoration:none;font-weight:700;font-size:14px;">
//             ❌ Reject
//           </a>
//         </div>

//         <p style="font-size:11px;color:#d1d5db;margin-top:28px;">Doc ID: <code>${doc._id}</code></p>
//       `),
//     });

//     // ── EMAIL 2: Client submission confirmation (only if they gave an email) ──
//     if (email?.trim()) {
//       await resend.emails.send({
//         from: `Sukshmadarshini Blog <no-reply@${new URL(BASE_URL).hostname}>`,
//         to: email.trim(),
//         subject: `✅ We received your blog submission — "${title.trim()}"`,
//         html: emailShell(`
//           <h2 style="margin:0 0 8px;color:#111827;font-size:20px;">Thanks for your submission, ${author?.trim() || "there"}!</h2>
//           <p style="margin:0 0 24px;color:#6b7280;font-size:14px;line-height:1.7;">
//             We've received your blog post and it's currently under review. Our team will go through it and you'll get another email once a decision has been made.
//           </p>

//           <div style="background:#f0fdf4;border-radius:10px;padding:20px 24px;margin-bottom:24px;">
//             <p style="margin:0 0 4px;font-size:12px;font-weight:600;color:#15803d;text-transform:uppercase;letter-spacing:.08em;">Your Submission</p>
//             <p style="margin:0;font-size:18px;font-weight:700;color:#111827;">${title.trim()}</p>
//             <p style="margin:4px 0 0;font-size:13px;color:#6b7280;">${readTime} · submitted ${new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</p>
//           </div>

//           <div style="background:#fffbeb;border-left:3px solid #f59e0b;border-radius:0 8px 8px 0;padding:14px 18px;margin-bottom:24px;">
//             <p style="margin:0;font-size:13px;color:#92400e;line-height:1.6;">
//               ⏳ <strong>Status: Pending Review</strong> — We typically review submissions within 2–3 business days. Please don't resubmit the same post.
//             </p>
//           </div>

//           <p style="font-size:14px;color:#6b7280;line-height:1.7;margin:0 0 8px;">
//             Questions? Reach us at
//             <a href="mailto:${OWNER_EMAIL}" style="color:#15803d;font-weight:600;">${OWNER_EMAIL}</a>
//           </p>
//         `),
//       });
//     }

//     return NextResponse.json({ success: true });
//   } catch (err: any) {
//     console.error("[blog/submit]", err);
//     return NextResponse.json({ message: "Internal server error" }, { status: 500 });
//   }
// }

// app/api/blog/submit/route.ts
// Uses the same sanity client your queries.ts already uses — no duplicate config.

import { NextRequest, NextResponse } from "next/server";
import { writer } from "../../../lib/sanity";   // ← adjust path to match your project
import { Resend } from "resend";
import { SignJWT } from "jose";

const resend = new Resend(process.env.RESEND_API_KEY);
const JWT_SECRET = new TextEncoder().encode(process.env.BLOG_APPROVAL_SECRET!);
const OWNER_EMAIL = "sukshmadarshini@gmail.com";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!;

function emailShell(innerHtml: string) {
  return `
    <div style="font-family:'Segoe UI',sans-serif;background:#f3f4f6;padding:40px 16px;min-height:100vh;">
      <div style="max-width:580px;margin:auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.07);">
        <div style="background:#15803d;padding:28px 36px;">
          <p style="margin:0;color:#bbf7d0;font-size:12px;letter-spacing:.12em;text-transform:uppercase;font-weight:600;">Sukshmadarshini</p>
          <h1 style="margin:6px 0 0;color:#fff;font-size:22px;font-weight:700;line-height:1.3;">Scientific Agriculture &amp; Plant Science</h1>
        </div>
        <div style="padding:32px 36px;">${innerHtml}</div>
        <div style="padding:20px 36px;background:#f9fafb;border-top:1px solid #e5e7eb;">
          <p style="margin:0;font-size:12px;color:#9ca3af;text-align:center;">
            © ${new Date().getFullYear()} Sukshmadarshini · <a href="${BASE_URL}" style="color:#15803d;text-decoration:none;">sukshmadarshini.com</a>
          </p>
        </div>
      </div>
    </div>
  `;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, author, email, excerpt, content } = body as {
      title: string;
      author: string;
      email?: string;
      excerpt?: string;
      content: string;
    };

    if (!title?.trim() || !content?.trim()) {
      return NextResponse.json({ message: "Title and content are required" }, { status: 400 });
    }
    if (title.length > 120 || (author?.length ?? 0) > 60 || content.length > 10000) {
      return NextResponse.json({ message: "Input too long" }, { status: 400 });
    }

    const words = content.split(/\s+/).filter(Boolean).length;
    const readTime = `${Math.max(1, Math.round(words / 200))} min read`;

    const portableTextContent = content
      .split(/\n\n+/)
      .map((para) => ({
        _type: "block",
        _key: crypto.randomUUID().replace(/-/g, "").slice(0, 12),
        style: "normal",
        markDefs: [],
        children: [{
          _type: "span",
          _key: crypto.randomUUID().replace(/-/g, "").slice(0, 12),
          text: para.trim(),
          marks: [],
        }],
      }));

    const slugCurrent = title
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .slice(0, 96);

    // NOTE: sanity client imported above must have a write token configured.
    // If your existing client is read-only, either:
    //   a) add the write token to it (check your lib/sanity.ts), or
    //   b) create a separate write client here with createClient({ ...config, token: process.env.SANITY_API_WRITE_TOKEN })
    const doc = await writer.create({
      _type: "blog",
      id: { _type: "slug", current: slugCurrent },
      title: title.trim(),
      author: author?.trim() || "Anonymous",
      submitterEmail: email?.trim() || null,
      excerpt: excerpt?.trim() || content.slice(0, 140) + (content.length > 140 ? "…" : ""),
      content: portableTextContent,
      readTime,
      date: new Date().toISOString().slice(0, 10),
      likes: 0,
      status: "pending",
    });

    const token = await new SignJWT({
      docId: doc._id,
      submitterEmail: email?.trim() || null,
      blogTitle: title.trim(),
    })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("7d")
      .sign(JWT_SECRET);

    const approveUrl = `${BASE_URL}/api/blog/approve?token=${token}&action=approve`;
    const rejectUrl  = `${BASE_URL}/api/blog/approve?token=${token}&action=reject`;

    // Email 1: Owner
    await resend.emails.send({
      from: `Sukshmadarshini Blog <no-reply@${new URL(BASE_URL).hostname}>`,
      // from: `Sukshmadarshini Blog <onboarding@resend.dev>`,
      to: OWNER_EMAIL,
      subject: `📝 New blog submission: "${title.trim()}"`,
      html: emailShell(`
        <h2 style="margin:0 0 4px;color:#111827;font-size:20px;">New Blog Submission</h2>
        <p style="margin:0 0 24px;color:#6b7280;font-size:14px;">Someone submitted a blog post for your review.</p>
        <table style="width:100%;border-collapse:collapse;margin-bottom:24px;font-size:14px;">
          <tr style="border-bottom:1px solid #f3f4f6;">
            <td style="color:#6b7280;padding:10px 0;width:110px;">Title</td>
            <td style="font-weight:600;color:#111827;padding:10px 0;">${title.trim()}</td>
          </tr>
          <tr style="border-bottom:1px solid #f3f4f6;">
            <td style="color:#6b7280;padding:10px 0;">Author</td>
            <td style="color:#111827;padding:10px 0;">${author?.trim() || "Anonymous"}</td>
          </tr>
          ${email ? `<tr style="border-bottom:1px solid #f3f4f6;"><td style="color:#6b7280;padding:10px 0;">Email</td><td style="color:#111827;padding:10px 0;">${email.trim()}</td></tr>` : ""}
          <tr><td style="color:#6b7280;padding:10px 0;">Read time</td><td style="color:#111827;padding:10px 0;">${readTime}</td></tr>
        </table>
        <div style="background:#f0fdf4;border-left:3px solid #16a34a;border-radius:0 8px 8px 0;padding:16px 20px;margin-bottom:28px;">
          <p style="margin:0 0 6px;font-size:12px;font-weight:600;color:#15803d;text-transform:uppercase;">Excerpt</p>
          <p style="margin:0;color:#374151;font-size:14px;line-height:1.7;">${excerpt?.trim() || content.slice(0, 200) + "…"}</p>
        </div>
        <p style="font-size:13px;color:#6b7280;margin-bottom:20px;">Review the full post in <a href="https://www.sanity.io/manage" style="color:#15803d;font-weight:600;">Sanity Studio</a> before approving. Links expire in <strong>7 days</strong>.</p>
        <div>
          <a href="${approveUrl}" style="display:inline-block;background:#15803d;color:#fff;padding:13px 30px;border-radius:8px;text-decoration:none;font-weight:700;font-size:14px;">✅ Approve &amp; Publish</a>
          &nbsp;&nbsp;
          <a href="${rejectUrl}" style="display:inline-block;background:#dc2626;color:#fff;padding:13px 30px;border-radius:8px;text-decoration:none;font-weight:700;font-size:14px;">❌ Reject</a>
        </div>
        <p style="font-size:11px;color:#d1d5db;margin-top:28px;">Doc ID: <code>${doc._id}</code></p>
      `),
    });

    // Email 2: Client confirmation (only if email provided)
    if (email?.trim()) {
      await resend.emails.send({
        from: `Sukshmadarshini Blog <no-reply@${new URL(BASE_URL).hostname}>`,
        to: email.trim(),
        subject: `✅ We received your blog — "${title.trim()}"`,
        html: emailShell(`
          <h2 style="margin:0 0 8px;color:#111827;font-size:20px;">Thanks for your submission, ${author?.trim() || "there"}!</h2>
          <p style="margin:0 0 24px;color:#6b7280;font-size:14px;line-height:1.7;">We've received your blog post and it's currently under review. You'll get another email once a decision has been made.</p>
          <div style="background:#f0fdf4;border-radius:10px;padding:20px 24px;margin-bottom:24px;">
            <p style="margin:0 0 4px;font-size:12px;font-weight:600;color:#15803d;text-transform:uppercase;">Your Submission</p>
            <p style="margin:0;font-size:18px;font-weight:700;color:#111827;">${title.trim()}</p>
            <p style="margin:4px 0 0;font-size:13px;color:#6b7280;">${readTime} · submitted ${new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</p>
          </div>
          <div style="background:#fffbeb;border-left:3px solid #f59e0b;border-radius:0 8px 8px 0;padding:14px 18px;margin-bottom:24px;">
            <p style="margin:0;font-size:13px;color:#92400e;line-height:1.6;">⏳ <strong>Status: Pending Review</strong> — We typically review within 2–3 business days. Please don't resubmit the same post.</p>
          </div>
          <p style="font-size:14px;color:#6b7280;line-height:1.7;margin:0;">Questions? Reach us at <a href="mailto:${OWNER_EMAIL}" style="color:#15803d;font-weight:600;">${OWNER_EMAIL}</a></p>
        `),
      });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("[blog/submit]", err);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}