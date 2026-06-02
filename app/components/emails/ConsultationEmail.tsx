// // import {
// //   Html,
// //   Head,
// //   Body,
// //   Container,
// //   Section,
// //   Row,
// //   Column,
// //   Text,
// //   Hr,
// //   Font,
// //   Img,
// //   Link,
// // } from "@react-email/components";

// // interface ConsultationEmailProps {
// //   name: string;
// //   email: string;
// //   serviceTitle: string;
// //   serviceId: number;
// //   price: string;           // e.g. "₹3,500"
// //   amountNumeric: number;   // e.g. 3500  (used in UPI URL)
// //   selectedSlot: string;    // ISO datetime string
// //   upiId: string;           // from env, injected server-side
// //   upiName: string;         // from env, injected server-side
// //   transactionRef: string;  // generated server-side
// //   qrDataUrl: string;       // base64 data URL generated server-side
// // }

// // export default function ConsultationEmail({
// //   name,
// //   email,
// //   serviceTitle,
// //   serviceId,
// //   price,
// //   amountNumeric,
// //   selectedSlot,
// //   upiId,
// //   upiName,
// //   transactionRef,
// //   qrDataUrl,
// // }: ConsultationEmailProps) {
// //   const slotDate = new Date(selectedSlot).toLocaleString("en-IN", {
// //     weekday: "long",
// //     month:   "long",
// //     day:     "numeric",
// //     hour:    "2-digit",
// //     minute:  "2-digit",
// //     timeZone: "Asia/Kolkata",
// //   });

// //   return (
// //     <Html>
// //       <Head>
// //         <Font
// //           fontFamily="Helvetica Neue"
// //           fallbackFontFamily="Arial"
// //           webFont={undefined}
// //           fontWeight={400}
// //           fontStyle="normal"
// //         />
// //       </Head>
// //       <Body style={{ backgroundColor: "#f4f6f8", padding: "20px", margin: 0 }}>
// //         <Container
// //           style={{
// //             maxWidth: "600px",
// //             margin: "0 auto",
// //             backgroundColor: "#ffffff",
// //             borderRadius: "10px",
// //             border: "1px solid #e2e8f0",
// //             overflow: "hidden",
// //           }}
// //         >
// //           {/* ── Header ── */}
// //           <Section style={{ backgroundColor: "#31366d", padding: "24px" }}>
// //             <Row>
// //               <Column style={{ width: "48px", verticalAlign: "middle" }}>
// //                 <Img
// //                   src="https://biometrics-ui-project-nextjs.vercel.app/mail.png"
// //                   width="36"
// //                   height="36"
// //                   alt="mail"
// //                   style={{ display: "block" }}
// //                 />
// //               </Column>
// //               <Column style={{ verticalAlign: "middle", paddingLeft: "12px" }}>
// //                 <Text style={{ margin: 0, color: "#ffffff", fontSize: "20px", fontWeight: "bold" }}>
// //                   Booking Confirmed
// //                 </Text>
// //                 <Text style={{ margin: 0, color: "#c7cbe8", fontSize: "13px" }}>
// //                   Sukshmadarshini™ Consultation
// //                 </Text>
// //               </Column>
// //             </Row>
// //           </Section>

// //           {/* ── Body ── */}
// //           <Section style={{ padding: "28px 25px 4px 25px", color: "#333333" }}>

// //             {/* Greeting */}
// //             <Text style={{ fontSize: "15px", margin: "0 0 6px 0" }}>
// //               Hi <strong>{name}</strong>,
// //             </Text>
// //             <Text style={{ fontSize: "14px", margin: "0 0 20px 0", lineHeight: "1.6" }}>
// //               Thank you for registering for our consultation session! We&apos;re excited to have you join us.
// //               To confirm your slot, please complete the payment using the details below.
// //             </Text>

// //             {/* Slot badge */}
// //             <Section
// //               style={{
// //                 backgroundColor: "#eef0f9",
// //                 borderLeft: "4px solid #31366d",
// //                 borderRadius: "6px",
// //                 padding: "12px 16px",
// //                 marginBottom: "20px",
// //               }}
// //             >
// //               <Text style={{ margin: 0, fontSize: "13px", color: "#6b7280" }}>
// //                 Your Booked Session
// //               </Text>
// //               <Text style={{ margin: "4px 0 0 0", fontSize: "15px", fontWeight: "bold", color: "#31366d" }}>
// //                 {serviceTitle}
// //               </Text>
// //               <Text style={{ margin: "4px 0 0 0", fontSize: "13px", color: "#374151" }}>
// //                 📅 {slotDate} IST
// //               </Text>
// //             </Section>

// //             {/* Payment Details */}
// //             <Text style={{ fontWeight: "bold", fontSize: "16px", margin: "0 0 10px 0" }}>
// //                Payment Details
// //             </Text>
// //             <Section
// //               style={{
// //                 border: "1px solid #e2e8f0",
// //                 borderRadius: "8px",
// //                 overflow: "hidden",
// //                 fontSize: "14px",
// //                 marginBottom: "20px",
// //               }}
// //             >
// //               <Row style={{ backgroundColor: "#f9fafb", borderBottom: "1px solid #e2e8f0" }}>
// //                 <Column style={{ padding: "10px 14px", fontWeight: "bold", width: "140px", color: "#374151" }}>
// //                   Amount
// //                 </Column>
// //                 <Column style={{ padding: "10px 14px", color: "#111827", fontWeight: "bold", fontSize: "15px" }}>
// //                   {price}
// //                 </Column>
// //               </Row>
// //               <Row style={{ borderBottom: "1px solid #e2e8f0" }}>
// //                 <Column style={{ padding: "10px 14px", fontWeight: "bold", width: "140px", color: "#374151" }}>
// //                   UPI ID
// //                 </Column>
// //                 <Column style={{ padding: "10px 14px", color: "#111827" }}>
// //                   {upiId}
// //                 </Column>
// //               </Row>
// //               <Row>
// //                 <Column style={{ padding: "10px 14px", fontWeight: "bold", width: "140px", color: "#374151" }}>
// //                   Transaction Ref
// //                 </Column>
// //                 <Column style={{ padding: "10px 14px", color: "#111827", fontFamily: "monospace" }}>
// //                   {transactionRef}
// //                 </Column>
// //               </Row>
// //             </Section>

// //             <Text style={{ fontSize: "13px", color: "#6b7280", margin: "-12px 0 20px 0" }}>
// //               You can make the payment using any UPI app — Google Pay, PhonePe, Paytm, etc.
// //             </Text>

// //             {/* QR Code */}
// //             <Text style={{ fontWeight: "bold", fontSize: "16px", margin: "0 0 10px 0" }}>
// //               📱 QR Code Option
// //             </Text>
// //             <Text style={{ fontSize: "13px", color: "#6b7280", margin: "0 0 14px 0" }}>
// //               Scan the QR code below with any UPI app to pay directly.
// //             </Text>
// //             <Section style={{ textAlign: "center", marginBottom: "20px" }}>
// //               <Img
// //                 src={qrDataUrl}
// //                 width="200"
// //                 height="200"
// //                 alt="UPI QR Code"
// //                 style={{
// //                   display: "inline-block",
// //                   border: "1px solid #e2e8f0",
// //                   borderRadius: "8px",
// //                   padding: "8px",
// //                 }}
// //               />
// //             </Section>

// //             {/* After Payment */}
// //             <Text style={{ fontWeight: "bold", fontSize: "16px", margin: "0 0 10px 0" }}>
// //               ✅ After Payment
// //             </Text>
// //             <Text style={{ fontSize: "14px", lineHeight: "1.7", margin: "0 0 6px 0" }}>
// //               Once you&apos;ve completed the payment, please <strong>reply to this email</strong> with:
// //             </Text>
// //             <Section
// //               style={{
// //                 backgroundColor: "#f1f5f9",
// //                 padding: "12px 16px",
// //                 borderRadius: "8px",
// //                 marginBottom: "20px",
// //               }}
// //             >
// //               <Text style={{ margin: "0 0 6px 0", fontSize: "14px", color: "#374151" }}>
// //                 • Your name
// //               </Text>
// //               <Text style={{ margin: 0, fontSize: "14px", color: "#374151" }}>
// //                 • Screenshot of the payment confirmation
// //               </Text>
// //             </Section>
// //             <Text style={{ fontSize: "13px", color: "#6b7280", margin: "-12px 0 20px 0" }}>
// //               This helps us verify your booking quickly.
// //             </Text>

// //             {/* Important */}
// //             <Text style={{ fontWeight: "bold", fontSize: "16px", margin: "0 0 10px 0" }}>
// //               📌 Important
// //             </Text>
// //             <Section
// //               style={{
// //                 backgroundColor: "#fff7ed",
// //                 border: "1px solid #fed7aa",
// //                 padding: "12px 16px",
// //                 borderRadius: "8px",
// //                 marginBottom: "20px",
// //               }}
// //             >
// //               <Text style={{ margin: "0 0 6px 0", fontSize: "14px", color: "#92400e" }}>
// //                 ⚠️ Your slot is held temporarily — it will be <strong>auto-cancelled if payment is not received 1 hour prior</strong> to the session.
// //               </Text>
// //               <Text style={{ margin: 0, fontSize: "14px", color: "#92400e" }}>
// //                 ⚠️ Your registration will be confirmed only after payment verification.
// //               </Text>
// //             </Section>

// //             {/* Sign-off */}
// //             <Text style={{ fontSize: "14px", lineHeight: "1.7", margin: "0 0 4px 0" }}>
// //               If you have any questions or face any issues, feel free to reply to this email — we&apos;re happy to help!
// //             </Text>
// //             <Text style={{ fontSize: "14px", lineHeight: "1.7", margin: "0 0 24px 0" }}>
// //               Looking forward to seeing you at the session 🚀
// //               <br />
// //               <strong>Best regards,</strong>
// //               <br />
// //               Team Sukshmadarshini
// //             </Text>
// //           </Section>

// //           {/* ── Footer ── */}
// //           <Hr style={{ borderColor: "#e2e8f0", margin: 0 }} />
// //           <Section style={{ backgroundColor: "#f9fafb", padding: "15px", textAlign: "center" }}>
// //             <Text style={{ fontSize: "12px", color: "#6b7280", margin: 0 }}>
// //               This email was sent from Sukshmadarshini™ · Reference: {transactionRef}
// //             </Text>
// //           </Section>
// //         </Container>
// //       </Body>
// //     </Html>
// //   );
// // }

// // app/components/emails/ConsultationEmail.tsx
// import {
//   Html,
//   Head,
//   Body,
//   Container,
//   Section,
//   Row,
//   Column,
//   Text,
//   Hr,
//   Font,
//   Img,
// } from "@react-email/components";

// interface ConsultationEmailProps {
//   name: string;
//   email: string;
//   serviceTitle: string;
//   serviceId: number;
//   price: string;
//   amountNumeric: number;
//   selectedSlot: string;
//   upiId: string;
//   upiName: string;
//   transactionRef: string;
//   qrDataUrl: string;
// }

// export default function ConsultationEmail({
//   name,
//   serviceTitle,
//   price,
//   selectedSlot,
//   upiId,
//   transactionRef,
//   qrDataUrl,
// }: ConsultationEmailProps) {
//   const slotDate = new Date(selectedSlot).toLocaleString("en-IN", {
//     weekday: "long",
//     month: "long",
//     day: "numeric",
//     hour: "2-digit",
//     minute: "2-digit",
//     timeZone: "Asia/Kolkata",
//   });

//   return (
//     <Html>
//       <Head>
//         <Font
//           fontFamily="Helvetica Neue"
//           fallbackFontFamily="Arial"
//           webFont={undefined}
//           fontWeight={400}
//           fontStyle="normal"
//         />
//       </Head>
//       <Body style={{ backgroundColor: "#f4f6f8", padding: "20px", margin: 0 }}>
//         <Container
//           style={{
//             maxWidth: "600px",
//             margin: "0 auto",
//             backgroundColor: "#ffffff",
//             borderRadius: "10px",
//             border: "1px solid #e2e8f0",
//             overflow: "hidden",
//           }}
//         >

//           {/* ── Top accent bar ── */}
//           <Section style={{ backgroundColor: "#3b82f6", height: "4px", borderRadius: "2px 2px 0 0" }} />

//           {/* ── Header ── */}
//           <Section
//             style={{
//               background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)",
//               padding: "36px 32px 28px",
//             }}
//           >
//             <Row>
//               <Column>
//                 <Text
//                   style={{
//                     margin: "0 0 4px 0",
//                     fontSize: "11px",
//                     fontWeight: "bold",
//                     letterSpacing: "3px",
//                     textTransform: "uppercase",
//                     color: "#60a5fa",
//                   }}
//                 >
//                   Sukshmadarshini™ · Consultation
//                 </Text>
//                 <Text
//                   style={{
//                     margin: "0 0 6px 0",
//                     fontSize: "28px",
//                     fontWeight: "bold",
//                     color: "#ffffff",
//                     lineHeight: "1.2",
//                     // fontFamily: "Georgia, serif",
//                   }}
//                 >
//                   Booking Confirmed
//                 </Text>
//                 <Text style={{ margin: 0, fontSize: "14px", color: "#93c5fd" }}>
//                   Your session is reserved — complete payment to secure your slot.
//                 </Text>
//               </Column>
//               <Column style={{ width: "48px", verticalAlign: "top", textAlign: "right" }}>
//                 <Img
//                   src="https://biometrics-ui-project-nextjs.vercel.app/mail.png"
//                   width="36"
//                   height="36"
//                   alt="mail"
//                   style={{ opacity: "0.5" }}
//                 />
//               </Column>
//             </Row>
//           </Section>

//           {/* ── Body ── */}
//           <Section style={{ backgroundColor: "#ffffff", padding: "36px 32px 8px" }}>

//             <Text style={{ fontSize: "15px", margin: "0 0 6px 0", color: "#111827", 
//               // fontFamily: "Georgia, serif" 
//               }}>
//               Dear <strong>{name}</strong>,
//             </Text>
//             <Text style={{ fontSize: "14px", margin: "0 0 28px 0", lineHeight: "1.75", color: "#374151" }}>
//               Thank you for booking a consultation with us. Your slot is reserved — please complete the payment using the details below to confirm your session.
//             </Text>

//             {/* Session card */}
//             <Section
//               style={{
//                 border: "1px solid #e5e7eb",
//                 borderRadius: "10px",
//                 overflow: "hidden",
//                 marginBottom: "28px",
//               }}
//             >
//               <Section style={{ backgroundColor: "#eff6ff", padding: "14px 20px", borderBottom: "1px solid #dbeafe" }}>
//                 <Text style={{ margin: 0, fontSize: "10px", fontWeight: "bold", letterSpacing: "2px", textTransform: "uppercase", color: "#2563eb" }}>
//                   Booked Session
//                 </Text>
//               </Section>
//               <Section style={{ padding: "20px" }}>
//                 <Text style={{ margin: "0 0 10px 0", fontSize: "17px", fontWeight: "bold", color: "#0f172a", 
//                   // fontFamily: "Georgia, serif" 
//                   }}>
//                   {serviceTitle}
//                 </Text>
//                 <Row>
//                   <Column style={{ width: "20px" }}>
//                     <Text style={{ margin: 0, fontSize: "14px" }}>📅</Text>
//                   </Column>
//                   <Column>
//                     <Text style={{ margin: 0, fontSize: "13px", color: "#374151" }}>{slotDate} IST</Text>
//                   </Column>
//                 </Row>
//               </Section>
//             </Section>

//             {/* Payment section */}
//             <Text style={{ fontSize: "12px", fontWeight: "bold", letterSpacing: "2px", textTransform: "uppercase", color: "#9ca3af", margin: "0 0 12px 0" }}>
//               Payment Details
//             </Text>
//             <Section
//               style={{
//                 border: "1px solid #e5e7eb",
//                 borderRadius: "10px",
//                 overflow: "hidden",
//                 marginBottom: "8px",
//               }}
//             >
//               <Row style={{ borderBottom: "1px solid #f3f4f6" }}>
//                 <Column style={{ padding: "13px 20px", width: "150px", backgroundColor: "#f9fafb" }}>
//                   <Text style={{ margin: 0, fontSize: "11px", fontWeight: "bold", color: "#6b7280", textTransform: "uppercase", letterSpacing: "1px" }}>Amount</Text>
//                 </Column>
//                 <Column style={{ padding: "13px 20px" }}>
//                   <Text style={{ margin: 0, fontSize: "16px", fontWeight: "bold", color: "#111827" }}>{price}</Text>
//                 </Column>
//               </Row>
//               <Row style={{ borderBottom: "1px solid #f3f4f6" }}>
//                 <Column style={{ padding: "13px 20px", width: "150px", backgroundColor: "#f9fafb" }}>
//                   <Text style={{ margin: 0, fontSize: "11px", fontWeight: "bold", color: "#6b7280", textTransform: "uppercase", letterSpacing: "1px" }}>UPI ID</Text>
//                 </Column>
//                 <Column style={{ padding: "13px 20px" }}>
//                   <Text style={{ margin: 0, fontSize: "13px", color: "#374151", fontFamily: "monospace" }}>{upiId}</Text>
//                 </Column>
//               </Row>
//               <Row>
//                 <Column style={{ padding: "13px 20px", width: "150px", backgroundColor: "#f9fafb" }}>
//                   <Text style={{ margin: 0, fontSize: "11px", fontWeight: "bold", color: "#6b7280", textTransform: "uppercase", letterSpacing: "1px" }}>Txn Reference</Text>
//                 </Column>
//                 <Column style={{ padding: "13px 20px" }}>
//                   <Text style={{ margin: 0, fontSize: "12px", color: "#2563eb", fontFamily: "monospace", letterSpacing: "0.5px" }}>{transactionRef}</Text>
//                 </Column>
//               </Row>
//             </Section>
//             <Text style={{ fontSize: "12px", color: "#9ca3af", margin: "4px 0 28px 0" }}>
//               Accepted via Google Pay, PhonePe, Paytm, and all UPI apps.
//             </Text>

//             {/* QR */}
//             <Text style={{ fontSize: "12px", fontWeight: "bold", letterSpacing: "2px", textTransform: "uppercase", color: "#9ca3af", margin: "0 0 16px 0" }}>
//               Scan to Pay
//             </Text>
//             <Section style={{ textAlign: "center", marginBottom: "28px" }}>
//               <Img
//                 src={qrDataUrl}
//                 width="180"
//                 height="180"
//                 alt="UPI QR Code"
//                 style={{
//                   display: "inline-block",
//                   border: "1px solid #e5e7eb",
//                   borderRadius: "12px",
//                   padding: "10px",
//                   backgroundColor: "#ffffff",
//                 }}
//               />
//               <Text style={{ fontSize: "12px", color: "#9ca3af", margin: "10px 0 0 0" }}>
//                 Point your UPI app camera at this code
//               </Text>
//             </Section>

//             {/* After payment */}
//             <Section
//               style={{
//                 backgroundColor: "#f0fdf4",
//                 border: "1px solid #bbf7d0",
//                 borderRadius: "10px",
//                 padding: "18px 20px",
//                 marginBottom: "20px",
//               }}
//             >
//               <Text style={{ margin: "0 0 10px 0", fontSize: "13px", fontWeight: "bold", color: "#166534" }}>
//                 ✓ &nbsp;After completing payment, reply to this email with:
//               </Text>
//               <Text style={{ margin: "0 0 4px 0", fontSize: "13px", color: "#166534" }}>· Your full name</Text>
//               <Text style={{ margin: 0, fontSize: "13px", color: "#166534" }}>· Screenshot of the payment confirmation</Text>
//             </Section>

//             {/* Warning */}
//             <Section
//               style={{
//                 backgroundColor: "#fffbeb",
//                 border: "1px solid #fde68a",
//                 borderRadius: "10px",
//                 padding: "16px 20px",
//                 marginBottom: "28px",
//               }}
//             >
//               <Text style={{ margin: "0 0 6px 0", fontSize: "13px", color: "#92400e" }}>
//                 ⚠️ &nbsp;Your slot is temporarily held and will be released automatically if payment is not received <strong>1 hour</strong> before the session.
//               </Text>
//               <Text style={{ margin: 0, fontSize: "13px", color: "#92400e" }}>
//                 ⚠️ &nbsp;Registration is confirmed only after payment verification by our team.
//               </Text>
//             </Section>

//             <Hr style={{ borderColor: "#f3f4f6", margin: "0 0 24px 0" }} />

//             <Text style={{ fontSize: "14px", color: "#374151", lineHeight: "1.75", margin: "0 0 32px 0" }}>
//               For any questions, simply reply to this email and we will assist you promptly.
//               <br /><br />
//               <span style={{ color: "#6b7280" }}>With regards,</span>
//               <br />
//               <strong style={{ color: "#0f172a" }}>Team Sukshmadarshini</strong>
//             </Text>
//           </Section>

//           {/* ── Footer ── */}
//           <Section style={{ backgroundColor: "#0f172a", padding: "20px 32px", borderRadius: "0 0 2px 2px" }}>
//             <Text style={{ fontSize: "11px", color: "#475569", margin: "0 0 4px 0", textAlign: "center", letterSpacing: "0.5px" }}>
//               SUKSHMADARSHINI™ · CONSULTATION BOOKING
//             </Text>
//             <Text style={{ fontSize: "11px", color: "#334155", margin: 0, textAlign: "center", fontFamily: "monospace" }}>
//               Ref: {transactionRef}
//             </Text>
//           </Section>

//         </Container>
//       </Body>
//     </Html>
//   );
// }

// app/components/emails/ConsultationEmail.tsx
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

interface ConsultationEmailProps {
  name: string;
  email: string;
  serviceTitle: string;
  serviceId: number;
  price: string;           // e.g. "₹3,500"
  amountNumeric: number;   // e.g. 3500  (used in UPI URL)
  selectedSlot: string;    // ISO datetime string
  upiId: string;           // from env, injected server-side
  upiName: string;         // from env, injected server-side
  transactionRef: string;  // generated server-side
  qrDataUrl: string;       // base64 data URL generated server-side
}

export default function ConsultationEmail({
  name,
  serviceTitle,
  price,
  selectedSlot,
  upiId,
  transactionRef,
  qrDataUrl,
}: ConsultationEmailProps) {
  const slotDate = new Date(selectedSlot).toLocaleString("en-IN", {
    weekday: "long",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
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
          <Section style={{ backgroundColor: "#31366d", padding: "24px" }}>
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
                  Booking Confirmed
                </Text>
                <Text style={{ margin: 0, color: "#c7cbe8", fontSize: "13px" }}>
                  Sukshmadarshini™ Consultation
                </Text>
              </Column>
            </Row>
          </Section>

          {/* ── Body ── */}
          <Section style={{ padding: "28px 25px 4px 25px", color: "#333333" }}>

            {/* Greeting */}
            <Text style={{ fontSize: "15px", margin: "0 0 6px 0" }}>
              Hi <strong>{name}</strong>,
            </Text>
            <Text style={{ fontSize: "14px", margin: "0 0 20px 0", lineHeight: "1.6" }}>
              Thank you for registering for our consultation session. We are excited to have you join us.
              To confirm your slot, please complete the payment using the details below.
            </Text>

            {/* Slot badge */}
            <Section
              style={{
                backgroundColor: "#eef0f9",
                borderLeft: "4px solid #31366d",
                borderRadius: "6px",
                padding: "12px 16px",
                marginBottom: "20px",
              }}
            >
              <Text style={{ margin: 0, fontSize: "13px", color: "#6b7280" }}>
                Your Booked Session
              </Text>
              <Text style={{ margin: "4px 0 0 0", fontSize: "15px", fontWeight: "bold", color: "#31366d" }}>
                {serviceTitle}
              </Text>
              <Text style={{ margin: "4px 0 0 0", fontSize: "13px", color: "#374151" }}>
                📅 {slotDate} IST
              </Text>
            </Section>

            {/* Payment Details */}
            <Text style={{ fontWeight: "bold", fontSize: "16px", margin: "0 0 10px 0" }}>
              Payment Details
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
                <Column style={{ padding: "10px 14px", fontWeight: "bold", width: "140px", color: "#374151" }}>
                  Amount
                </Column>
                <Column style={{ padding: "10px 14px", color: "#111827", fontWeight: "bold", fontSize: "15px" }}>
                  {price}
                </Column>
              </Row>
              <Row style={{ borderBottom: "1px solid #e2e8f0" }}>
                <Column style={{ padding: "10px 14px", fontWeight: "bold", width: "140px", color: "#374151" }}>
                  UPI ID
                </Column>
                <Column style={{ padding: "10px 14px", color: "#111827" }}>
                  {upiId}
                </Column>
              </Row>
              <Row>
                <Column style={{ padding: "10px 14px", fontWeight: "bold", width: "140px", color: "#374151" }}>
                  Transaction Ref
                </Column>
                <Column style={{ padding: "10px 14px", color: "#111827", fontFamily: "monospace" }}>
                  {transactionRef}
                </Column>
              </Row>
            </Section>

            <Text style={{ fontSize: "13px", color: "#6b7280", margin: "-12px 0 20px 0" }}>
              You can make the payment using any UPI app: Google Pay, PhonePe, Paytm, etc.
            </Text>

            {/* QR Code */}
            <Text style={{ fontWeight: "bold", fontSize: "16px", margin: "0 0 10px 0" }}>
              QR Code Option
            </Text>
            <Text style={{ fontSize: "13px", color: "#6b7280", margin: "0 0 14px 0" }}>
              Scan the QR code below with any UPI app to pay directly.
            </Text>
            <Section style={{ textAlign: "center", marginBottom: "20px" }}>
              <Img
                src={qrDataUrl}
                width="200"
                height="200"
                alt="UPI QR Code"
                style={{
                  display: "inline-block",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  padding: "8px",
                }}
              />
            </Section>

            {/* After Payment */}
            <Text style={{ fontWeight: "bold", fontSize: "16px", margin: "0 0 10px 0" }}>
              After Payment
            </Text>
            <Text style={{ fontSize: "14px", lineHeight: "1.7", margin: "0 0 6px 0" }}>
              Once you have completed the payment, please <strong>reply to this email</strong> with:
            </Text>
            <Section
              style={{
                backgroundColor: "#f1f5f9",
                padding: "12px 16px",
                borderRadius: "8px",
                marginBottom: "20px",
              }}
            >
              <Text style={{ margin: "0 0 6px 0", fontSize: "14px", color: "#374151" }}>
                • Your name
              </Text>
              <Text style={{ margin: 0, fontSize: "14px", color: "#374151" }}>
                • Screenshot of the payment confirmation
              </Text>
            </Section>
            <Text style={{ fontSize: "13px", color: "#6b7280", margin: "-12px 0 20px 0" }}>
              This helps us confirm your slot quickly.
            </Text>

            {/* Important */}
            <Text style={{ fontWeight: "bold", fontSize: "16px", margin: "0 0 10px 0" }}>
              Important
            </Text>
            <Section
              style={{
                backgroundColor: "#fff7ed",
                border: "1px solid #fed7aa",
                padding: "12px 16px",
                borderRadius: "8px",
                marginBottom: "20px",
              }}
            >
              <Text style={{ margin: "0 0 6px 0", fontSize: "14px", color: "#92400e" }}>
                Your slot is held temporarily. it will be{" "}
                <strong>auto-released if payment is not received 1 day prior</strong>{" "}
                to the session.
              </Text>
              <Text style={{ margin: 0, fontSize: "14px", color: "#92400e" }}>
                Your registration will be confirmed only after payment verification.
              </Text>
            </Section>

            {/* Sign-off */}
            <Text style={{ fontSize: "14px", lineHeight: "1.7", margin: "0 0 4px 0" }}>
              If you have any questions or face any issues, feel free to reply to this email: we are happy to help
            </Text>
            <Text style={{ fontSize: "14px", lineHeight: "1.7", margin: "0 0 24px 0" }}>
              Looking forward to seeing you at the session.
              <br />
              <strong>Best regards,</strong>
              <br />
              Team Sukshmadarshini
            </Text>
          </Section>

          {/* ── Footer ── */}
          <Hr style={{ borderColor: "#e2e8f0", margin: 0 }} />
          <Section style={{ backgroundColor: "#f9fafb", padding: "15px", textAlign: "center" }}>
            <Text style={{ fontSize: "12px", color: "#6b7280", margin: 0 }}>
              This email was sent from Sukshmadarshini™ · Reference: {transactionRef}
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}