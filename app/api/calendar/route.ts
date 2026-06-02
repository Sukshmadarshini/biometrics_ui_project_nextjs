// // app/api/calendar/route.ts
// import { NextRequest, NextResponse } from "next/server";
// import { GoogleAuth } from "google-auth-library";

// /* ---- helper: get auto-refreshed token from service account ---- */
// async function getAccessToken(): Promise<string> {
//   const auth = new GoogleAuth({
//     credentials: {
//       type: "service_account",
//       project_id: process.env.GOOGLE_PROJECT_ID!,
//       private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID!,
//       // Replace literal \n with real newlines common env variable issue
//       private_key: process.env.GOOGLE_PRIVATE_KEY!.replace(/\\n/g, "\n"),
//       client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL!,
//       client_id: process.env.GOOGLE_CLIENT_ID!,
//     },
//     scopes: ["https://www.googleapis.com/auth/calendar"],
//   });
//   const client = await auth.getClient();
//   const token = await client.getAccessToken();
//   return token.token!;
// }

// // GET /api/calendar?serviceId=1 → returns available slots
// export async function GET(req: NextRequest) {
//   const CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID!;
//   const ACCESS_TOKEN = await getAccessToken(); // ← changed

//   const now = new Date();
//   const weekLater = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

//   const freeBusyRes = await fetch(
//     "https://www.googleapis.com/calendar/v3/freeBusy",
//     {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${ACCESS_TOKEN}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         timeMin: now.toISOString(),
//         timeMax: weekLater.toISOString(),
//         items: [{ id: CALENDAR_ID }],
//       }),
//     }
//   );

//   const freeBusy = await freeBusyRes.json();
//   const busySlots = freeBusy.calendars?.[CALENDAR_ID]?.busy ?? [];

//   const slots = generateAvailableSlots(busySlots);
//   return NextResponse.json({ slots });
// }

// // POST /api/calendar → creates a booking event
// export async function POST(req: NextRequest) {
//   const { serviceTitle, slot, formData } = await req.json();
//   const CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID!;
//   const ACCESS_TOKEN = await getAccessToken(); // ← changed

//   const start = new Date(slot);
//   const end = new Date(start.getTime() + 60 * 60 * 1000);

//   await fetch(
//     `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(CALENDAR_ID)}/events`,
//     {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${ACCESS_TOKEN}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         summary: `Consultation: ${serviceTitle}`,
//         description: `Booked by ${formData.name} (${formData.email})${formData.organization ? ` from ${formData.organization}` : ""}`,
//         start: { dateTime: start.toISOString(), timeZone: "Asia/Kolkata" },
//         end: { dateTime: end.toISOString(), timeZone: "Asia/Kolkata" },
//         attendees: [{ email: formData.email, displayName: formData.name }],
//         sendUpdates: "all",
//       }),
//     }
//   );

//   return NextResponse.json({ success: true });
// }

// /* ---- helper: generate 1-hr slots, skip busy ones ---- */
// function generateAvailableSlots(busySlots: { start: string; end: string }[]) {
//   const slots: string[] = [];
//   const now = new Date();

//   for (let d = 1; d <= 7; d++) {
//     const day = new Date(now);
//     day.setDate(now.getDate() + d);
//     if (day.getDay() === 0) continue; // skip Sundays

//     for (let h = 10; h <= 17; h++) {
//       const candidate = new Date(day);
//       candidate.setHours(h, 0, 0, 0);
//       const candidateEnd = new Date(candidate.getTime() + 60 * 60 * 1000);

//       const isBusy = busySlots.some((b) => {
//         const bs = new Date(b.start).getTime();
//         const be = new Date(b.end).getTime();
//         return candidate.getTime() < be && candidateEnd.getTime() > bs;
//       });

//       if (!isBusy) slots.push(candidate.toISOString());
//     }
//   }
//   return slots;
// }

// app/api/calendar/route.ts
import { NextRequest, NextResponse } from "next/server";
import { GoogleAuth } from "google-auth-library";

/* ---- helper: get auto-refreshed token from service account ---- */
async function getAccessToken(): Promise<string> {
  const auth = new GoogleAuth({
    credentials: {
      type: "service_account",
      project_id: process.env.GOOGLE_PROJECT_ID!,
      private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID!,
      private_key: process.env.GOOGLE_PRIVATE_KEY!.replace(/\\n/g, "\n"),
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL!,
      client_id: process.env.GOOGLE_CLIENT_ID!,
    },
    scopes: ["https://www.googleapis.com/auth/calendar"],
  });
  const client = await auth.getClient();
  const token = await client.getAccessToken();
  return token.token!;
}

// GET /api/calendar?serviceId=1 → returns available slots
export async function GET(req: NextRequest) {
  try {
    const CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID!;
    console.log("📆 GET /api/calendar — Calendar ID:", CALENDAR_ID);

    const ACCESS_TOKEN = await getAccessToken();
    console.log("🔑 Access token obtained");

    const now = new Date();
    const weekLater = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

    const freeBusyRes = await fetch(
      "https://www.googleapis.com/calendar/v3/freeBusy",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          timeMin: now.toISOString(),
          timeMax: weekLater.toISOString(),
          items: [{ id: CALENDAR_ID }],
        }),
      }
    );

    const freeBusy = await freeBusyRes.json();
    console.log("📬 FreeBusy response:", JSON.stringify(freeBusy, null, 2));

    if (!freeBusyRes.ok) {
      console.error("❌ FreeBusy API error:", freeBusy);
      return NextResponse.json({ slots: [], error: freeBusy }, { status: 500 });
    }

    const busySlots = freeBusy.calendars?.[CALENDAR_ID]?.busy ?? [];
    console.log("🔒 Busy slots:", busySlots);

    const slots = generateAvailableSlots(busySlots);
    console.log(`✅ Generated ${slots.length} available slots`);

    return NextResponse.json({ slots });
  } catch (err) {
    console.error("❌ GET /api/calendar crashed:", err);
    return NextResponse.json({ slots: [], error: String(err) }, { status: 500 });
  }
}

// POST /api/calendar → creates a booking event
export async function POST(req: NextRequest) {
  try {
    const { serviceTitle, slot, formData } = await req.json();
    const CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID!;

    console.log("📅 POST /api/calendar — Booking request:", { serviceTitle, slot, formData });
    console.log("📆 Calendar ID:", CALENDAR_ID);

    const ACCESS_TOKEN = await getAccessToken();
    console.log("🔑 Access token obtained");

    const start = new Date(slot);
    const end = new Date(start.getTime() + 60 * 60 * 1000);

    console.log("⏰ Event time:", { start: start.toISOString(), end: end.toISOString() });

    const response = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(CALENDAR_ID)}/events`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          summary: `Consultation: ${serviceTitle}`,
          description: `Booked by ${formData.name} (${formData.email})${
            formData.organization ? ` from ${formData.organization}` : ""
          }`,
          start: { dateTime: start.toISOString(), timeZone: "Asia/Kolkata" },
          end: { dateTime: end.toISOString(), timeZone: "Asia/Kolkata" },
          // attendees: [{ email: formData.email, displayName: formData.name }],
          sendUpdates: "all",
        }),
      }
    );

    const result = await response.json();
    console.log("📬 Google Calendar API response:", JSON.stringify(result, null, 2));

    if (!response.ok) {
      console.error("❌ Google API error:", result);
      return NextResponse.json(
        { success: false, error: result?.error ?? result },
        { status: 500 }
      );
    }

    console.log("✅ Event created successfully:", result.htmlLink);
    return NextResponse.json({ success: true, eventLink: result.htmlLink });

  } catch (err) {
    console.error("❌ POST /api/calendar crashed:", err);
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
  }
}

/* ---- helper: generate 1-hr slots, skip busy ones ---- */
// function generateAvailableSlots(busySlots: { start: string; end: string }[]) {
//   const slots: string[] = [];
//   const now = new Date();

//   for (let d = 1; d <= 7; d++) {
//     const day = new Date(now);
//     day.setDate(now.getDate() + d);
//     if (day.getDay() === 0) continue; // skip Sundays

//     for (let h = 10; h <= 17; h++) {
//       const candidate = new Date(day);
//       candidate.setHours(h, 0, 0, 0);
//       const candidateEnd = new Date(candidate.getTime() + 60 * 60 * 1000);

//       const isBusy = busySlots.some((b) => {
//         const bs = new Date(b.start).getTime();
//         const be = new Date(b.end).getTime();
//         return candidate.getTime() < be && candidateEnd.getTime() > bs;
//       });

//       if (!isBusy) slots.push(candidate.toISOString());
//     }
//   }
//   return slots;
// }

// function generateAvailableSlots(busySlots: { start: string; end: string }[]) {
//   const slots: string[] = [];
//   const now = new Date();

//   // Morning: 10am–12pm, Evening: 4pm–7pm (IST)
//   const allowedHours = [10, 11, 16, 17, 18];

//   for (let d = 1; d <= 7; d++) {
//     const day = new Date(now);
//     day.setDate(now.getDate() + d);
//     if (day.getDay() === 0) continue; // skip Sundays

//     for (const h of allowedHours) {
//       const candidate = new Date(day);
//       candidate.setHours(h, 0, 0, 0);
//       const candidateEnd = new Date(candidate.getTime() + 60 * 60 * 1000);

//       const isBusy = busySlots.some((b) => {
//         const bs = new Date(b.start).getTime();
//         const be = new Date(b.end).getTime();
//         return candidate.getTime() < be && candidateEnd.getTime() > bs;
//       });

//       if (!isBusy) slots.push(candidate.toISOString());
//     }
//   }
//   return slots;
// }

function generateAvailableSlots(busySlots: { start: string; end: string }[]) {
  const slots: string[] = [];

  // Use IST "now" as the reference
  const nowIST = new Date(
    new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
  );

  for (let d = 1; d <= 7; d++) {
    const day = new Date(nowIST);
    day.setDate(nowIST.getDate() + d);
    if (day.getDay() === 0) continue; // skip Sundays

    const allowedHours = [10, 11, 16, 17, 18]; // 10am, 11am, 4pm, 5pm, 6pm IST

    for (const h of allowedHours) {
      // Build ISO string explicitly in IST offset (+05:30)
      const yyyy = day.getFullYear();
      const mm = String(day.getMonth() + 1).padStart(2, "0");
      const dd = String(day.getDate()).padStart(2, "0");
      const hh = String(h).padStart(2, "0");

      // +05:30 hardcoded — avoids any server timezone dependency
      const candidateISO = `${yyyy}-${mm}-${dd}T${hh}:00:00+05:30`;
      const candidate = new Date(candidateISO);
      const candidateEnd = new Date(candidate.getTime() + 60 * 60 * 1000);

      const isBusy = busySlots.some((b) => {
        const bs = new Date(b.start).getTime();
        const be = new Date(b.end).getTime();
        return candidate.getTime() < be && candidateEnd.getTime() > bs;
      });

      if (!isBusy) slots.push(candidate.toISOString());
    }
  }
  return slots;
}