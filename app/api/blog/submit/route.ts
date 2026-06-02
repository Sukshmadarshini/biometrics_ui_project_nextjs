// import { NextRequest, NextResponse } from "next/server";
// import { writer } from "../../../lib/sanity";
// import { Resend } from "resend";
// import { SignJWT } from "jose";
// import { render } from "@react-email/render";
// import BlogSubmissionReceivedEmail from "../../../components/emails/BlogSubmissionReceivedEmail";
// import BlogOwnerReviewEmail from "../../../components/emails/BlogOwnerReviewEmail";

// const resend = new Resend(process.env.RESEND_API_KEY);
// const JWT_SECRET = new TextEncoder().encode(process.env.BLOG_APPROVAL_SECRET!);
// const OWNER_EMAIL = process.env.OWNER_EMAIL!;
// const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!;

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

//     if (!title?.trim() || !content?.trim()) {
//       return NextResponse.json({ message: "Title and content are required" }, { status: 400 });
//     }
//     if (title.length > 120 || (author?.length ?? 0) > 60 || content.length > 10000) {
//       return NextResponse.json({ message: "Input too long" }, { status: 400 });
//     }

//     const words = content.split(/\s+/).filter(Boolean).length;
//     const readTime = `${Math.max(1, Math.round(words / 200))} min read`;

//     const portableTextContent = content
//       .split(/\n\n+/)
//       .map((para) => ({
//         _type: "block",
//         _key: crypto.randomUUID().replace(/-/g, "").slice(0, 12),
//         style: "normal",
//         markDefs: [],
//         children: [{
//           _type: "span",
//           _key: crypto.randomUUID().replace(/-/g, "").slice(0, 12),
//           text: para.trim(),
//           marks: [],
//         }],
//       }));

//     const slugCurrent = title
//       .trim()
//       .toLowerCase()
//       .replace(/[^a-z0-9\s-]/g, "")
//       .replace(/\s+/g, "-")
//       .slice(0, 96);

//     // NOTE: sanity client imported above must have a write token configured.
//     // If your existing client is read-only, either:
//     //   a) add the write token to it (check your lib/sanity.ts), or
//     //   b) create a separate write client here with createClient({ ...config, token: process.env.SANITY_API_WRITE_TOKEN })
//     const doc = await writer.create({
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

//     // Email 1: Owner — review request with approve/reject buttons
//     await resend.emails.send({
//       from: `Sukshmadarshini Blog <no-reply@${new URL(BASE_URL).hostname}>`,
//       // from: `Sukshmadarshini Blog <onboarding@resend.dev>`,
//       to: OWNER_EMAIL,
//       subject: `📝 New blog submission: "${title.trim()}"`,
//       html: await render(
//         BlogOwnerReviewEmail({
//           title: title.trim(),
//           author: author?.trim() || "Anonymous",
//           email: email?.trim(),
//           excerpt: excerpt?.trim() || content.slice(0, 200) + "…",
//           readTime,
//           approveUrl,
//           rejectUrl,
//           docId: doc._id,
//         })
//       ),
//     });

//     // Email 2: Author confirmation (only if email provided)
//     if (email?.trim()) {
//       await resend.emails.send({
//         from: `Sukshmadarshini Blog <no-reply@${new URL(BASE_URL).hostname}>`,
//         // from: `Sukshmadarshini Blog <onboarding@resend.dev>`,
//         to: email.trim(),
//         subject: `✅ We received your blog — "${title.trim()}"`,
//         html: await render(
//           BlogSubmissionReceivedEmail({
//             author: author?.trim() || "there",
//             title: title.trim(),
//             readTime,
//           })
//         ),
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
import { writer } from "../../../lib/sanity";
import { Resend } from "resend";
import { SignJWT } from "jose";
import { render } from "@react-email/render";
import BlogSubmissionReceivedEmail from "../../../components/emails/BlogSubmissionReceivedEmail";
import BlogOwnerReviewEmail from "../../../components/emails/BlogOwnerReviewEmail";

const resend = new Resend(process.env.RESEND_API_KEY);
const JWT_SECRET = new TextEncoder().encode(process.env.BLOG_APPROVAL_SECRET!);
const OWNER_EMAIL = "sukshmadarshini@gmail.com";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!;

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

    // Email 1: Owner — review request with approve/reject buttons
    await resend.emails.send({
      from: `Sukshmadarshini Blog <no-reply@${new URL(BASE_URL).hostname}>`,
      // from: `Sukshmadarshini Blog <onboarding@resend.dev>`,
      to: OWNER_EMAIL,
      subject: `📝 New blog submission: "${title.trim()}"`,
      html: await render(
        BlogOwnerReviewEmail({
          title: title.trim(),
          author: author?.trim() || "Anonymous",
          email: email?.trim(),
          excerpt: excerpt?.trim() || content.slice(0, 200) + "…",
          readTime,
          approveUrl,
          rejectUrl,
          docId: doc._id,
        })
      ),
    });

    // Email 2: Author confirmation (only if email provided)
    if (email?.trim()) {
      await resend.emails.send({
        from: `Sukshmadarshini Blog <no-reply@${new URL(BASE_URL).hostname}>`,
        to: email.trim(),
        subject: `✅ We received your blog — "${title.trim()}"`,
        html: await render(
          BlogSubmissionReceivedEmail({
            author: author?.trim() || "there",
            title: title.trim(),
            readTime,
          })
        ),
      });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("[blog/submit]", err);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}