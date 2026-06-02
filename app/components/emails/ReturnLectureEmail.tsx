import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Row,
  Column,
  Text,
  Hr,
  Font,
  Img,
} from "@react-email/components";

interface ReturnLectureEmailProps {
  name: string;
  email: string;
  lectureTitle: string;
  lectureId: string;
  price: string;           // e.g. "₹999"
  amountNumeric: number;
  selectedSlot: string;    // ISO datetime string
  transactionRef: string;
}

export default function ReturnLectureEmail({
  name,
  email,
  lectureTitle,
  price,
  selectedSlot,
  transactionRef,
}: ReturnLectureEmailProps) {
  const slotDate = new Date(selectedSlot).toLocaleString("en-IN", {
    weekday: "long",
    month:   "long",
    day:     "numeric",
    hour:    "2-digit",
    minute:  "2-digit",
    timeZone: "Asia/Kolkata",
  });

  const registeredAt = new Date().toLocaleString("en-IN", {
    weekday: "short",
    month:   "short",
    day:     "numeric",
    year:    "numeric",
    hour:    "2-digit",
    minute:  "2-digit",
    timeZone: "Asia/Kolkata",
  });

  return (
    <Html>
      <Head>
        <Font
          fontFamily="Helvetica Neue"
          fallbackFontFamily="Arial"
          webFont={undefined}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Body style={{ backgroundColor: "#f4f6f8", padding: "20px", margin: 0 }}>
        <Container
          style={{
            maxWidth: "600px",
            margin: "0 auto",
            backgroundColor: "#ffffff",
            borderRadius: "10px",
            border: "1px solid #e2e8f0",
            overflow: "hidden",
          }}
        >
          {/* ── Header ── */}
          <Section style={{ backgroundColor: "#1a4a3a", padding: "24px" }}>
            <Row>
              <Column style={{ width: "48px", verticalAlign: "middle" }}>
                <Img
                  src="https://biometrics-ui-project-nextjs.vercel.app/mail.png"
                  width="36"
                  height="36"
                  alt="mail"
                  style={{ display: "block" }}
                />
              </Column>
              <Column style={{ verticalAlign: "middle", paddingLeft: "12px" }}>
                <Text style={{ margin: 0, color: "#ffffff", fontSize: "20px", fontWeight: "bold" }}>
                  New Lecture Registration
                </Text>
                <Text style={{ margin: 0, color: "#86efac", fontSize: "13px" }}>
                  Sukshmadarshini™ · Internal Notification
                </Text>
              </Column>
            </Row>
          </Section>

          {/* ── Body ── */}
          <Section style={{ padding: "28px 25px 4px 25px", color: "#333333" }}>

            <Text style={{ fontSize: "14px", margin: "0 0 20px 0", lineHeight: "1.6" }}>
              A new lecture seat registration has been received. Payment is pending verification.
              Please review the details below and confirm the seat once payment is received.
            </Text>

            {/* Lecture Badge */}
            <Section
              style={{
                backgroundColor: "#f0fdf4",
                borderLeft: "4px solid #1a4a3a",
                borderRadius: "6px",
                padding: "12px 16px",
                marginBottom: "20px",
              }}
            >
              <Text style={{ margin: 0, fontSize: "13px", color: "#6b7280" }}>
                Registered Lecture
              </Text>
              <Text style={{ margin: "4px 0 0 0", fontSize: "15px", fontWeight: "bold", color: "#0f2d1f" }}>
                {lectureTitle}
              </Text>
              <Text style={{ margin: "4px 0 0 0", fontSize: "13px", color: "#374151" }}>
                📅 {slotDate} IST
              </Text>
            </Section>

            {/* Registrant Details */}
            <Text style={{ fontWeight: "bold", fontSize: "13px", color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.05em", margin: "0 0 8px 0" }}>
              Registrant Details
            </Text>
            <Section
              style={{
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                overflow: "hidden",
                fontSize: "14px",
                marginBottom: "20px",
              }}
            >
              <Row style={{ backgroundColor: "#f9fafb", borderBottom: "1px solid #e2e8f0" }}>
                <Column style={{ padding: "10px 14px", fontWeight: "bold", width: "150px", color: "#374151" }}>
                  Name
                </Column>
                <Column style={{ padding: "10px 14px", color: "#111827" }}>
                  {name}
                </Column>
              </Row>
              <Row style={{ borderBottom: "1px solid #e2e8f0" }}>
                <Column style={{ padding: "10px 14px", fontWeight: "bold", width: "150px", color: "#374151" }}>
                  Email
                </Column>
                <Column style={{ padding: "10px 14px", color: "#111827" }}>
                  {email}
                </Column>
              </Row>
              <Row style={{ borderBottom: "1px solid #e2e8f0" }}>
                <Column style={{ padding: "10px 14px", fontWeight: "bold", width: "150px", color: "#374151" }}>
                  Amount Due
                </Column>
                <Column style={{ padding: "10px 14px", color: "#111827", fontWeight: "bold" }}>
                  {price}
                </Column>
              </Row>
              <Row style={{ borderBottom: "1px solid #e2e8f0" }}>
                <Column style={{ padding: "10px 14px", fontWeight: "bold", width: "150px", color: "#374151" }}>
                  Transaction Ref
                </Column>
                <Column style={{ padding: "10px 14px", color: "#111827", fontFamily: "monospace" }}>
                  {transactionRef}
                </Column>
              </Row>
              <Row>
                <Column style={{ padding: "10px 14px", fontWeight: "bold", width: "150px", color: "#374151" }}>
                  Registered At
                </Column>
                <Column style={{ padding: "10px 14px", color: "#6b7280", fontSize: "13px" }}>
                  {registeredAt} IST
                </Column>
              </Row>
            </Section>

            {/* Action Reminder */}
            <Section
              style={{
                backgroundColor: "#fefce8",
                border: "1px solid #fde047",
                padding: "12px 16px",
                borderRadius: "8px",
                marginBottom: "24px",
              }}
            >
              <Text style={{ margin: 0, fontSize: "14px", color: "#854d0e" }}>
                <strong>Action required:</strong> Verify payment using the transaction reference above.
                Confirm the seat by replying to the student&apos;s email once payment is received.
                Seat will auto-release if payment is not received <strong>1 day prior</strong> to the lecture.
              </Text>
            </Section>

          </Section>

          {/* ── Footer ── */}
          <Hr style={{ borderColor: "#e2e8f0", margin: 0 }} />
          <Section style={{ backgroundColor: "#f9fafb", padding: "15px", textAlign: "center" }}>
            <Text style={{ fontSize: "12px", color: "#6b7280", margin: 0 }}>
              Sukshmadarshini™ Internal Notification · Ref: {transactionRef}
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// // app/components/emails/ReturnLectureEmail.tsx
// import {
//   Html, Head, Body, Container, Section, Row, Column,
//   Text, Hr, Font, Img,
// } from "@react-email/components";

// interface ReturnLectureEmailProps {
//   name: string;
//   email: string;
//   lectureTitle: string;
//   lectureId: string;
//   price: string;
//   amountNumeric: number;
//   selectedSlot: string;
//   transactionRef: string;
// }

// export default function ReturnLectureEmail({ name, email, lectureTitle, price, selectedSlot, transactionRef }: ReturnLectureEmailProps) {
//   const slotDate = new Date(selectedSlot).toLocaleString("en-IN", {
//     weekday: "long", month: "long", day: "numeric",
//     hour: "2-digit", minute: "2-digit", timeZone: "Asia/Kolkata",
//   });

//   const registeredAt = new Date().toLocaleString("en-IN", {
//     weekday: "short", month: "short", day: "numeric", year: "numeric",
//     hour: "2-digit", minute: "2-digit", timeZone: "Asia/Kolkata",
//   });

//   return (
//     <Html>
//       <Head>
//         <Font fontFamily="Helvetica Neue" fallbackFontFamily="Arial" webFont={undefined} fontWeight={400} fontStyle="normal" />
//       </Head>
//       <Body style={{ backgroundColor: "#f4f6f8", padding: "20px", margin: 0 }}>
//         <Container style={{ maxWidth: "600px", margin: "0 auto", backgroundColor: "#ffffff", borderRadius: "10px", border: "1px solid #e2e8f0", overflow: "hidden" }}>

//           {/* ── Header ── */}
//           <Section style={{ backgroundColor: "#31366d", padding: "24px" }}>
//             <Row>
//               <Column style={{ width: "48px", verticalAlign: "middle" }}>
//                 <Img src="https://biometrics-ui-project-nextjs.vercel.app/mail.png" width="36" height="36" alt="mail" style={{ display: "block" }} />
//               </Column>
//               <Column style={{ verticalAlign: "middle", paddingLeft: "12px" }}>
//                 <Text style={{ margin: 0, color: "#ffffff", fontSize: "20px", fontWeight: "bold" }}>
//                   Lecture Seat Reserved
//                 </Text>
//                 <Text style={{ margin: 0, color: "#c7cbe8", fontSize: "13px" }}>Sukshmadarshini™ Lecture Series</Text>
//               </Column>
//             </Row>
//           </Section>

//           {/* ── Body ── */}
//           <Section style={{ padding: "28px 25px 4px 25px", color: "#333333" }}>
//             <Text style={{ fontSize: "15px", margin: "0 0 6px 0" }}>
//               Hi <strong>{name}</strong>,
//             </Text>
//             <Text style={{ fontSize: "14px", margin: "0 0 20px 0", lineHeight: "1.6" }}>
//               Thank you for registering for our upcoming lecture Your seat has been reserved. To secure your spot, please complete the payment using the details below.
//             </Text>

//             <Section style={{ backgroundColor: "#eef0f9", borderLeft: "4px solid #31366d", borderRadius: "6px", padding: "12px 16px", marginBottom: "20px" }}>
//               <Text style={{ margin: 0, fontSize: "13px", color: "#6b7280" }}>Your Registered Lecture</Text>
//               <Text style={{ margin: "4px 0 0 0", fontSize: "15px", fontWeight: "bold", color: "#31366d" }}>{lectureTitle}</Text>
//               <Text style={{ margin: "4px 0 0 0", fontSize: "13px", color: "#374151" }}>📅 {slotDate} IST</Text>
//             </Section>

//             <Text style={{ fontWeight: "bold", fontSize: "13px", color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.05em", margin: "0 0 8px 0" }}>
//               Registration Details
//             </Text>
//             <Section style={{ border: "1px solid #e2e8f0", borderRadius: "8px", overflow: "hidden", fontSize: "14px", marginBottom: "20px" }}>
//               <Row style={{ backgroundColor: "#f9fafb", borderBottom: "1px solid #e2e8f0" }}>
//                 <Column style={{ padding: "10px 14px", fontWeight: "bold", width: "150px", color: "#374151" }}>Name</Column>
//                 <Column style={{ padding: "10px 14px", color: "#111827" }}>{name}</Column>
//               </Row>
//               <Row style={{ borderBottom: "1px solid #e2e8f0" }}>
//                 <Column style={{ padding: "10px 14px", fontWeight: "bold", width: "150px", color: "#374151" }}>Email</Column>
//                 <Column style={{ padding: "10px 14px", color: "#111827" }}>{email}</Column>
//               </Row>
//               <Row style={{ borderBottom: "1px solid #e2e8f0" }}>
//                 <Column style={{ padding: "10px 14px", fontWeight: "bold", width: "150px", color: "#374151" }}>Amount Due</Column>
//                 <Column style={{ padding: "10px 14px", color: "#111827", fontWeight: "bold", fontSize: "15px" }}>{price}</Column>
//               </Row>
//               <Row style={{ borderBottom: "1px solid #e2e8f0" }}>
//                 <Column style={{ padding: "10px 14px", fontWeight: "bold", width: "150px", color: "#374151" }}>Transaction Ref</Column>
//                 <Column style={{ padding: "10px 14px", color: "#111827", fontFamily: "monospace" }}>{transactionRef}</Column>
//               </Row>
//               <Row>
//                 <Column style={{ padding: "10px 14px", fontWeight: "bold", width: "150px", color: "#374151" }}>Registered At</Column>
//                 <Column style={{ padding: "10px 14px", color: "#6b7280", fontSize: "13px" }}>{registeredAt} IST</Column>
//               </Row>
//             </Section>

//             <Text style={{ fontSize: "13px", color: "#6b7280", margin: "0 0 20px 0" }}>
//               You can make the payment using any UPI app — Google Pay, PhonePe, Paytm, etc.
//             </Text>

//             <Text style={{ fontWeight: "bold", fontSize: "14px", margin: "0 0 8px 0" }}>✅ After Payment</Text>
//             <Section style={{ backgroundColor: "#f1f5f9", padding: "14px 16px", borderRadius: "8px", fontSize: "14px", lineHeight: "1.6", color: "#374151", marginBottom: "20px" }}>
//               <Text style={{ margin: "0 0 6px 0" }}>Once you&apos;ve completed the payment, please <strong>reply to this email</strong> with:</Text>
//               <Text style={{ margin: "0 0 4px 0" }}>• Your name</Text>
//               <Text style={{ margin: 0 }}>• Screenshot of the payment confirmation</Text>
//             </Section>

//             <Section style={{ backgroundColor: "#fff7ed", border: "1px solid #fed7aa", padding: "12px 16px", borderRadius: "8px", marginBottom: "20px" }}>
//               <Text style={{ margin: "0 0 6px 0", fontSize: "14px", color: "#92400e" }}>
//                 ⚠️ Your seat is held temporarily — it will be <strong>auto-released if payment is not received 1 hour prior</strong> to the lecture.
//               </Text>
//               <Text style={{ margin: 0, fontSize: "14px", color: "#92400e" }}>
//                 ⚠️ Your registration will be confirmed only after payment verification.
//               </Text>
//             </Section>

//             <Text style={{ fontSize: "14px", lineHeight: "1.7", margin: "0 0 4px 0" }}>
//               If you have any questions or face any issues, feel free to reply to this email — we&apos;re happy to help!
//             </Text>
//             <Text style={{ fontSize: "14px", lineHeight: "1.7", margin: "0 0 24px 0" }}>
//               Looking forward to seeing you at the lecture 🚀<br />
//               Warm regards,<br /><strong>Team Sukshmadarshini</strong>
//             </Text>
//           </Section>

//           {/* ── Footer ── */}
//           <Hr style={{ borderColor: "#e2e8f0", margin: 0 }} />
//           <Section style={{ backgroundColor: "#f9fafb", padding: "15px", textAlign: "center" }}>
//             <Text style={{ fontSize: "12px", color: "#6b7280", margin: 0 }}>
//               This email was sent from Sukshmadarshini™ · Reference: {transactionRef}
//             </Text>
//           </Section>

//         </Container>
//       </Body>
//     </Html>
//   );
// }