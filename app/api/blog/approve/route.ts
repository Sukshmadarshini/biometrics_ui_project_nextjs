// // // app/api/blog/approve/route.ts

// // import { NextRequest, NextResponse } from "next/server";
// // import { writer } from "../../../lib/sanity";
// // import { Resend } from "resend";
// // import { jwtVerify } from "jose";
// // import { render } from "@react-email/render";
// // import BlogApprovedEmail from "../../../components/emails/BlogApprovedEmail";
// // import BlogRejectedEmail from "../../../components/emails/BlogRejectedEmail";

// // const resend      = new Resend(process.env.RESEND_API_KEY);
// // const JWT_SECRET  = new TextEncoder().encode(process.env.BLOG_APPROVAL_SECRET!);
// // const OWNER_EMAIL = process.env.OWNER_EMAIL!;
// // const BASE_URL    = process.env.NEXT_PUBLIC_BASE_URL!;

// // // ── Browser confirmation page shown to the owner after clicking the link ──────
// // function htmlPage(title: string, message: string, isSuccess: boolean) {
// //   const color = isSuccess ? "#15803d" : "#dc2626";
// //   const icon  = isSuccess ? "✅" : "❌";
// //   return new NextResponse(
// //     `<!DOCTYPE html>
// // <html lang="en">
// // <head>
// //   <meta charset="UTF-8"/>
// //   <meta name="viewport" content="width=device-width,initial-scale=1"/>
// //   <title>${title}</title>
// //   <style>
// //     *{box-sizing:border-box;margin:0;padding:0}
// //     body{min-height:100vh;display:flex;align-items:center;justify-content:center;font-family:'Segoe UI',system-ui,sans-serif;background:#f3f4f6}
// //     .card{background:#fff;border-radius:16px;padding:48px;max-width:460px;width:90%;text-align:center;box-shadow:0 4px 24px rgba(0,0,0,.08)}
// //     .icon{font-size:52px;margin-bottom:20px}
// //     h1{color:${color};font-size:24px;margin-bottom:12px}
// //     p{color:#6b7280;line-height:1.7;font-size:15px;margin-bottom:8px}
// //     a{color:${color};text-decoration:none;font-weight:600}
// //   </style>
// // </head>
// // <body>
// //   <div class="card">
// //     <div class="icon">${icon}</div>
// //     <h1>${title}</h1>
// //     <p>${message}</p>
// //     <p style="margin-top:24px"><a href="${BASE_URL}/blogs">← Back to Blogs</a></p>
// //   </div>
// // </body>
// // </html>`,
// //     { status: 200, headers: { "Content-Type": "text/html" } }
// //   );
// // }

// // export async function GET(req: NextRequest) {
// //   const { searchParams } = new URL(req.url);
// //   const token  = searchParams.get("token");
// //   const action = searchParams.get("action"); // "approve" | "reject"

// //   if (!token || !["approve", "reject"].includes(action ?? "")) {
// //     return htmlPage(
// //       "Invalid Link",
// //       "This approval link is missing required parameters.",
// //       false
// //     );
// //   }

// //   // ── Verify JWT ────────────────────────────────────────────────────────────
// //   let docId: string;
// //   let submitterEmail: string | null = null;
// //   let blogTitle = "your blog post";

// //   try {
// //     const { payload } = await jwtVerify(token, JWT_SECRET);
// //     docId          = payload.docId as string;
// //     submitterEmail = (payload.submitterEmail as string) || null;
// //     blogTitle      = (payload.blogTitle as string) || "your blog post";
// //   } catch {
// //     return htmlPage(
// //       "Link Expired or Invalid",
// //       "This approval link has expired (links last 7 days) or has been tampered with.",
// //       false
// //     );
// //   }

// //   // ── Patch Sanity doc ──────────────────────────────────────────────────────
// //   try {
// //     const newStatus = action === "approve" ? "published" : "rejected";
// //     await writer.patch(docId).set({ status: newStatus }).commit();

// //     // ── Notify the submitter of the decision ──────────────────────────────
// //     if (submitterEmail) {
// //       if (action === "approve") {
// //         const blogUrl = `${BASE_URL}/blogs`; // swap for a per-slug URL if your schema has one
// //         await resend.emails.send({
// //           from: `Sukshmadarshini Blog <no-reply@${new URL(BASE_URL).hostname}>`,
// //           to: submitterEmail,
// //           subject: `Your blog post is live: "${blogTitle}"`,
// //           html: await render(
// //             BlogApprovedEmail({ blogTitle, blogUrl })
// //           ),
// //         });
// //       } else {
// //         await resend.emails.send({
// //           from: `Sukshmadarshini Blog <no-reply@${new URL(BASE_URL).hostname}>`,
// //           to: submitterEmail,
// //           subject: `Blog submission update: "${blogTitle}"`,
// //           html: await render(
// //             BlogRejectedEmail({ blogTitle, ownerEmail: OWNER_EMAIL })
// //           ),
// //         });
// //       }
// //     }

// //     // ── Browser response to owner ─────────────────────────────────────────
// //     if (action === "approve") {
// //       return htmlPage(
// //         "Blog Published!",
// //         `"${blogTitle}" is now live on the website.${
// //           submitterEmail ? ` A notification has been sent to ${submitterEmail}.` : ""
// //         }`,
// //         true
// //       );
// //     } else {
// //       return htmlPage(
// //         "Blog Rejected",
// //         `The submission has been rejected and will not appear on the website.${
// //           submitterEmail ? ` ${submitterEmail} has been notified.` : ""
// //         }`,
// //         false
// //       );
// //     }
// //   } catch (err) {
// //     console.error("[blog/approve]", err);
// //     return htmlPage(
// //       "Something Went Wrong",
// //       "Could not update the blog status. Please try again or update it directly in Sanity Studio.",
// //       false
// //     );
// //   }
// // }

// // app/api/blog/approve/route.ts
// import { NextRequest, NextResponse } from "next/server";
// import { writer } from "../../../lib/sanity";
// import { Resend } from "resend";
// import { jwtVerify } from "jose";
// import { render } from "@react-email/render";
// import BlogApprovedEmail from "../../../components/emails/BlogApprovedEmail";
// import BlogRejectedEmail from "../../../components/emails/BlogRejectedEmail";
// import { getEmailContents } from "@/app/lib/queries/email-templates";

// export const dynamic = "force-dynamic";

// const resend      = new Resend(process.env.RESEND_API_KEY);
// const JWT_SECRET  = new TextEncoder().encode(process.env.BLOG_APPROVAL_SECRET!);
// const OWNER_EMAIL = process.env.OWNER_EMAIL!;
// const BASE_URL    = process.env.NEXT_PUBLIC_BASE_URL!;

// // ── Browser confirmation page shown to the owner after clicking the link ──────
// function htmlPage(title: string, message: string, isSuccess: boolean) {
//   const color = isSuccess ? "#15803d" : "#dc2626";
//   const icon  = isSuccess ? "✅" : "❌";
//   return new NextResponse(
//     `<!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8"/>
//   <meta name="viewport" content="width=device-width,initial-scale=1"/>
//   <title>${title}</title>
//   <style>
//     *{box-sizing:border-box;margin:0;padding:0}
//     body{min-height:100vh;display:flex;align-items:center;justify-content:center;font-family:'Segoe UI',system-ui,sans-serif;background:#f3f4f6}
//     .card{background:#fff;border-radius:16px;padding:48px;max-width:460px;width:90%;text-align:center;box-shadow:0 4px 24px rgba(0,0,0,.08)}
//     .icon{font-size:52px;margin-bottom:20px}
//     h1{color:${color};font-size:24px;margin-bottom:12px}
//     p{color:#6b7280;line-height:1.7;font-size:15px;margin-bottom:8px}
//     a{color:${color};text-decoration:none;font-weight:600}
//   </style>
// </head>
// <body>
//   <div class="card">
//     <div class="icon">${icon}</div>
//     <h1>${title}</h1>
//     <p>${message}</p>
//     <p style="margin-top:24px"><a href="${BASE_URL}/blogs">← Back to Blogs</a></p>
//   </div>
// </body>
// </html>`,
//     { status: 200, headers: { "Content-Type": "text/html" } }
//   );
// }

// export async function GET(req: NextRequest) {
//   const { searchParams } = new URL(req.url);
//   const token  = searchParams.get("token");
//   const action = searchParams.get("action"); // "approve" | "reject"

//   if (!token || !["approve", "reject"].includes(action ?? "")) {
//     return htmlPage(
//       "Invalid Link",
//       "This approval link is missing required parameters.",
//       false
//     );
//   }

//   // ── Verify JWT ────────────────────────────────────────────────────────────
//   let docId: string;
//   let submitterEmail: string | null = null;
//   let blogTitle = "your blog post";

//   try {
//     const { payload } = await jwtVerify(token, JWT_SECRET);
//     docId          = payload.docId as string;
//     submitterEmail = (payload.submitterEmail as string) || null;
//     blogTitle      = (payload.blogTitle as string) || "your blog post";
//   } catch {
//     return htmlPage(
//       "Link Expired or Invalid",
//       "This approval link has expired (links last 7 days) or has been tampered with.",
//       false
//     );
//   }

//   // ── Patch Sanity doc ──────────────────────────────────────────────────────
//   try {
//     const newStatus = action === "approve" ? "published" : "rejected";
//     await writer.patch(docId).set({ status: newStatus }).commit();

//     // ── Notify the submitter of the decision ──────────────────────────────
//     if (submitterEmail) {
//       if (action === "approve") {
//         const blogUrl = `${BASE_URL}/blogs`;

//         // Fetch CMS content for approved email
//         const emailContents = await getEmailContents(["blogApproved"]);
//         const approvedEmailContent = {
//           headerTitle:    "Your Blog Is Live",
//           headerSubtitle: "Approved & Published",
//           greeting:       "Congratulations!",
//           bodyText:       "Your blog submission has been reviewed and approved. It is now published on the Sukshmadarshini website. (Static)",
//           ctaLabel:       "View Published Blog",
//           signOff:        "Thank you for sharing your knowledge and contributing to our growing community.",
//           footerText:     "Sukshmadarshini™ Blog Publication System",
//           ...emailContents["blogApproved"],
//         };

//         await resend.emails.send({
//           from:    `Sukshmadarshini Blog <no-reply@${new URL(BASE_URL).hostname}>`,
//           from: `Sukshmadarshini Blog <onboarding@resend.dev>`,
//           to:      submitterEmail,
//           subject: `Your blog post is live: "${blogTitle}"`,
//           html: await render(
//             BlogApprovedEmail({
//               blogTitle,
//               blogUrl,
//               emailContent: approvedEmailContent,
//             })
//           ),
//         });
//       } else {
//         // Fetch CMS content for rejected email
//         const emailContents = await getEmailContents(["blogRejected"]);
//         const rejectedEmailContent = {
//           headerTitle:    "Submission Update",
//           headerSubtitle: "Review Completed",
//           bodyText1:      "Thank you for taking the time to submit a blog post to Sukshmadarshini.",
//           bodyText2:      "After careful review, we are unable to publish this submission at this time. (Static)",
//           reasonNote:     "This may be due to editorial guidelines, content focus, formatting requirements, or relevance to our publication goals.",
//           encouragement:  "We encourage you to review our published articles and consider revising and resubmitting your work in the future.",
//           contactLine:    "Questions? Contact us at:",
//           footerText:     "Sukshmadarshini™ Blog Review System",
//           ...emailContents["blogRejected"],
//         };

//         await resend.emails.send({
//           from:    `Sukshmadarshini Blog <no-reply@${new URL(BASE_URL).hostname}>`,
//           // from: `Sukshmadarshini Blog <onboarding@resend.dev>`,
//           to:      submitterEmail,
//           subject: `Blog submission update: "${blogTitle}"`,
//           html: await render(
//             BlogRejectedEmail({
//               blogTitle,
//               ownerEmail: OWNER_EMAIL,
//               emailContent: rejectedEmailContent,
//             })
//           ),
//         });
//       }
//     }

//     // ── Browser response to owner ─────────────────────────────────────────
//     if (action === "approve") {
//       return htmlPage(
//         "Blog Published!",
//         `"${blogTitle}" is now live on the website.${
//           submitterEmail ? ` A notification has been sent to ${submitterEmail}.` : ""
//         }`,
//         true
//       );
//     } else {
//       return htmlPage(
//         "Blog Rejected",
//         `The submission has been rejected and will not appear on the website.${
//           submitterEmail ? ` ${submitterEmail} has been notified.` : ""
//         }`,
//         false
//       );
//     }
//   } catch (err) {
//     console.error("[blog/approve]", err);
//     return htmlPage(
//       "Something Went Wrong",
//       "Could not update the blog status. Please try again or update it directly in Sanity Studio.",
//       false
//     );
//   }
// }

// app/api/blog/approve/route.ts

import { NextRequest, NextResponse } from "next/server";
import { writer } from "../../../lib/sanity";
import { Resend } from "resend";
import { jwtVerify } from "jose";
import { render } from "@react-email/render";
import BlogApprovedEmail from "../../../components/emails/BlogApprovedEmail";
import BlogRejectedEmail from "../../../components/emails/BlogRejectedEmail";
import { getEmailContent } from "@/app/lib/queries/email-templates";

export const dynamic = "force-dynamic";

const resend      = new Resend(process.env.RESEND_API_KEY);
const JWT_SECRET  = new TextEncoder().encode(process.env.BLOG_APPROVAL_SECRET!);
const OWNER_EMAIL = process.env.OWNER_EMAIL!;
const BASE_URL    = process.env.NEXT_PUBLIC_BASE_URL!;

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
    return htmlPage(
      "Invalid Link",
      "This approval link is missing required parameters.",
      false
    );
  }

  // ── Verify JWT ────────────────────────────────────────────────────────────
  let docId: string;
  let submitterEmail: string | null = null;
  let blogTitle = "your blog post";

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

    // ── Notify the submitter of the decision ──────────────────────────────
    if (submitterEmail) {
      if (action === "approve") {
        const blogUrl = `${BASE_URL}/blogs`;

        // Fetch CMS content directly — avoids batch helper entirely
        console.log("[blog/approve] fetching blogApproved email template...");
        const sanityContent = await getEmailContent("blogApproved");
        console.log("[blog/approve] blogApproved keys from Sanity:", Object.keys(sanityContent));

        const approvedEmailContent = {
          headerTitle:    "Your Blog Is Live",
          headerSubtitle: "Approved & Published",
          greeting:       "Congratulations!",
          bodyText:       "Your blog submission has been reviewed and approved. It is now published on the Sukshmadarshini website.",
          ctaLabel:       "View Published Blog",
          signOff:        "Thank you for sharing your knowledge and contributing to our growing community.",
          footerText:     "Sukshmadarshini™ Blog Publication System",
          ...sanityContent,
        };

        await resend.emails.send({
          from:    `Sukshmadarshini Blog <no-reply@${new URL(BASE_URL).hostname}>`,
          // from: `Sukshmadarshini Blog <onboarding@resend.dev>`,
          to:      submitterEmail,
          replyTo: process.env.EMAIL_TO!,
          subject: `Your blog post is live: "${blogTitle}"`,
          html: await render(
            BlogApprovedEmail({
              blogTitle,
              blogUrl,
              emailContent: approvedEmailContent,
            })
          ),
        });
      } else {
        // Fetch CMS content directly — avoids batch helper entirely
        console.log("[blog/approve] fetching blogRejected email template...");
        const sanityContent = await getEmailContent("blogRejected");
        console.log("[blog/approve] blogRejected keys from Sanity:", Object.keys(sanityContent));

        const rejectedEmailContent = {
          headerTitle:    "Submission Update",
          headerSubtitle: "Review Completed",
          bodyText1:      "Thank you for taking the time to submit a blog post to Sukshmadarshini.",
          bodyText2:      "After careful review, we are unable to publish this submission at this time.",
          reasonNote:     "This may be due to editorial guidelines, content focus, formatting requirements, or relevance to our publication goals.",
          encouragement:  "We encourage you to review our published articles and consider revising and resubmitting your work in the future.",
          contactLine:    "Questions? Contact us at:",
          footerText:     "Sukshmadarshini™ Blog Review System",
          ...sanityContent,
        };

        await resend.emails.send({
          from:    `Sukshmadarshini Blog <no-reply@${new URL(BASE_URL).hostname}>`,
          // from: `Sukshmadarshini Blog <onboarding@resend.dev>`,
          to:      submitterEmail,
          replyTo: process.env.EMAIL_TO!,
          subject: `Blog submission update: "${blogTitle}"`,
          html: await render(
            BlogRejectedEmail({
              blogTitle,
              ownerEmail: OWNER_EMAIL,
              emailContent: rejectedEmailContent,
            })
          ),
        });
      }
    }

    // ── Browser response to owner ─────────────────────────────────────────
    if (action === "approve") {
      return htmlPage(
        "Blog Published!",
        `"${blogTitle}" is now live on the website.${
          submitterEmail ? ` A notification has been sent to ${submitterEmail}.` : ""
        }`,
        true
      );
    } else {
      return htmlPage(
        "Blog Rejected",
        `The submission has been rejected and will not appear on the website.${
          submitterEmail ? ` ${submitterEmail} has been notified.` : ""
        }`,
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