import { google } from "googleapis";

const SHEET_ID = process.env.GOOGLE_SHEET_ID!;

function getAuth() {
  return new google.auth.JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
}

async function appendRow(sheetName: string, values: string[]) {
  const sheets = google.sheets({ version: "v4", auth: getAuth() });

  await sheets.spreadsheets.values.append({
    spreadsheetId: SHEET_ID,
    range: `${sheetName}!A:Z`,
    valueInputOption: "USER_ENTERED",
    requestBody: { values: [values] },
  });
}

// ─── Lectures tab ────────────────────────────────────────────
// Columns: Date | Name | Email | Event | Timestamp | Paid/Unpaid
export async function appendLectureRegistration(opts: {
  name: string;
  email: string;
  lectureTitle: string;
  selectedSlot: string;
  transactionRef: string;
}) {
  const now = new Date();
  await appendRow("Lectures", [
    now.toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata" }), // Date
    opts.name,                                                       // Name
    opts.email,                                                      // Email
    opts.lectureTitle,                                               // Event
    now.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),      // Timestamp
    "Unpaid",                                                        // Paid/Unpaid — default
  ]);
}

// export async function appendLectureRegistration(data: {
//   name: string;
//   email: string;
//   lectureTitle: string;
//   selectedSlot: string;
//   mode: string;
//   duration: string;
//   transactionRef: string;
// }) {
//   const auth = await getAuth();
//   const sheets = google.sheets({ version: "v4", auth });
 
//   const timestamp = new Date().toLocaleString("en-IN", {
//     timeZone: "Asia/Kolkata",
//     year:     "numeric",
//     month:    "2-digit",
//     day:      "2-digit",
//     hour:     "2-digit",
//     minute:   "2-digit",
//     second:   "2-digit",
//   });
 
//   const slotFormatted = new Date(data.selectedSlot).toLocaleString("en-IN", {
//     timeZone: "Asia/Kolkata",
//     weekday:  "short",
//     month:    "short",
//     day:      "numeric",
//     year:     "numeric",
//     hour:     "2-digit",
//     minute:   "2-digit",
//   });
 
//   await sheets.spreadsheets.values.append({
//     spreadsheetId: process.env.GOOGLE_SHEET_ID!,
//     range:         "Lectures!A:I",
//     valueInputOption: "USER_ENTERED",
//     requestBody: {
//       values: [[
//         timestamp,            // A: Timestamp (IST)
//         data.name,            // B: Name
//         data.email,           // C: Email
//         data.lectureTitle,    // D: Lecture Title
//         slotFormatted,        // E: Slot (IST)
//         data.mode,            // F: Mode
//         data.duration,        // G: Duration
//         data.transactionRef,  // H: Transaction Ref
//         "Pending",            // I: Payment Status
//       ]],
//     },
//   });
// }

// ─── Workshops tab ───────────────────────────────────────────
// Columns: Date | Name | Email | Phone No | Institute | City | Event | Participants | Message | Timestamp | Paid/Unpaid
export async function appendWorkshopRegistration(opts: {
  name: string;
  email: string;
  phone?: string;
  institute?: string;
  city?: string;
  workshopTitle: string;
  participants?: string;
  message?: string;
}) {
  const now = new Date();
  await appendRow("Workshops", [
    now.toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata" }), // Date
    opts.name,                                                       // Name
    opts.email,                                                      // Email
    opts.phone ?? "",                                                // Phone No
    opts.institute ?? "",                                            // Institute
    opts.city ?? "",                                                 // City
    opts.workshopTitle,                                              // Event
    opts.participants ?? "",                                         // Participants
    opts.message ?? "",                                              // Message
    now.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),      // Timestamp
    "Unpaid",                                                        // Paid/Unpaid — default
  ]);
}

// ─── Consultations tab ───────────────────────────────────────
// Columns: Date | Name | Email | Event | Timestamp | Slot booked | Transaction Ref | Paid/Unpaid
export async function appendConsultationRegistration(opts: {
  name: string;
  email: string;
  serviceTitle: string;
  selectedSlot: string;
  transactionRef: string;
}) {
  const now = new Date();
  await appendRow("Consultations", [
    now.toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata" }), // Date
    opts.name,                                                       // Name
    opts.email,                                                      // Email
    opts.serviceTitle,                                               // Event
    now.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),      // Timestamp
    opts.selectedSlot,                                               // Slot booked
    opts.transactionRef,                                             // Transaction Ref
    "Unpaid",                                                        // Paid/Unpaid — default
  ]);
}

// ─── Complementary Lecture Registrations ─────────────────────────────────────
 
export async function appendComplementaryLectureRegistration(data: {
  name: string;
  email: string;
  lectureTitle: string;
  selectedSlot: string;
  mode: string;
  duration: string;
  registrationRef: string;
}) {
  const auth = await getAuth();
  const sheets = google.sheets({ version: "v4", auth });
 
  const timestamp = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    year:     "numeric",
    month:    "2-digit",
    day:      "2-digit",
    hour:     "2-digit",
    minute:   "2-digit",
    second:   "2-digit",
  });
 
  const slotFormatted = new Date(data.selectedSlot).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    weekday:  "short",
    month:    "short",
    day:      "numeric",
    year:     "numeric",
    hour:     "2-digit",
    minute:   "2-digit",
  });
 
  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEET_ID!,
    range:         "Complementary Lectures!A:H",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [[
        timestamp,              // A: Timestamp (IST)
        data.name,              // B: Name
        data.email,             // C: Email
        data.lectureTitle,      // D: Lecture Title
        slotFormatted,          // E: Slot (IST)
        data.mode,              // F: Mode
        data.duration,          // G: Duration
        data.registrationRef,   // H: Registration Ref
      ]],
    },
  });
}

// ─── Contact Submissions ─────────────────────────────────────────────────────
 
export async function appendContactSubmission(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  const auth = await getAuth(); // reuse your existing helper
  const sheets = google.sheets({ version: "v4", auth });
 
  const timestamp = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    year:     "numeric",
    month:    "2-digit",
    day:      "2-digit",
    hour:     "2-digit",
    minute:   "2-digit",
    second:   "2-digit",
  });
 
  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEET_ID!,
    range:         "ContactForms!A:F",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [[
        timestamp,         // A: Timestamp (IST)
        data.name,         // B: Name
        data.email,        // C: Email
        data.subject,      // D: Subject
        data.message,      // E: Message
        "Website Contact Form", // F: Source
      ]],
    },
  });
}

export async function appendCollaborationInquiry(data: {
  name: string;
  email: string;
  organization: string;
  collaborationType: string;
  message: string;
}) {
  const auth = await getAuth();
  const sheets = google.sheets({ version: "v4", auth });
 
  const timestamp = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    year:     "numeric",
    month:    "2-digit",
    day:      "2-digit",
    hour:     "2-digit",
    minute:   "2-digit",
    second:   "2-digit",
  });
 
  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEET_ID!,
    range:         "Collaboration Inquiries!A:F",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [[
        timestamp,               // A: Timestamp (IST)
        data.name,               // B: Name
        data.email,              // C: Email
        data.organization,       // D: Organization
        data.collaborationType,  // E: Collaboration Type
        data.message,            // F: Message
      ]],
    },
  });
}

// ─── Career Applications ──────────────────────────────────────────────────────
// Columns: Date | Name | Email | Position | Why Hire | Extracurriculars | Timestamp | Source

export async function appendCareerSubmission(data: {
  name:             string;
  email:            string;
  position:         string;
  whyHire:          string;
  extracurriculars: string;
}) {
  const auth = getAuth();
  const sheets = google.sheets({ version: "v4", auth });

  const now = new Date();

  const timestamp = now.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    year:     "numeric",
    month:    "2-digit",
    day:      "2-digit",
    hour:     "2-digit",
    minute:   "2-digit",
    second:   "2-digit",
  });

  await sheets.spreadsheets.values.append({
    spreadsheetId: SHEET_ID,
    range:         "Career Applications!A:H",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [[
        now.toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata" }), // A: Date
        data.name,                                                       // B: Name
        data.email,                                                      // C: Email
        data.position,                                                   // D: Position Applied
        data.whyHire,                                                    // E: Why Hire
        data.extracurriculars || "—",                                    // F: Extracurriculars
        timestamp,                                                       // G: Timestamp (IST)
        "Website Careers Form",                                          // H: Source
      ]],
    },
  });
}