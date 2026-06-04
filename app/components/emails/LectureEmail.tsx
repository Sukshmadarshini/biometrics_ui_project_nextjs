// // app/components/emails/LectureEmail.tsx

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

// interface LectureEmailProps {
//   name: string;
//   email: string;
//   lectureTitle: string;
//   lectureId: string;
//   price: string;           // e.g. "₹999"
//   amountNumeric: number;   // e.g. 999
//   selectedSlot: string;    // ISO datetime string
//   upiId: string;           // from env, injected server-side
//   upiName: string;         // from env, injected server-side
//   transactionRef: string;  // generated server-side
//   qrDataUrl: string;       // QR code URL generated server-side
// }

// export default function LectureEmail({
//   name,
//   lectureTitle,
//   price,
//   selectedSlot,
//   upiId,
//   transactionRef,
//   qrDataUrl,
// }: LectureEmailProps) {
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
//           {/* ── Header ── */}
//           <Section style={{ backgroundColor: "#1a4a3a", padding: "24px" }}>
//             <Row>
//               <Column style={{ width: "48px", verticalAlign: "middle" }}>
//                 <Img
//                   src="https://biometrics-ui-project-nextjs.vercel.app/mail.png"
//                   width="36"
//                   height="36"
//                   alt="mail"
//                   style={{ display: "block" }}
//                 />
//               </Column>
//               <Column style={{ verticalAlign: "middle", paddingLeft: "12px" }}>
//                 <Text
//                   style={{
//                     margin: 0,
//                     color: "#ffffff",
//                     fontSize: "20px",
//                     fontWeight: "bold",
//                   }}
//                 >
//                   Lecture Seat Reserved
//                 </Text>
//                 <Text style={{ margin: 0, color: "#a7c4b5", fontSize: "13px" }}>
//                   Sukshmadarshini™ Lecture Series
//                 </Text>
//               </Column>
//             </Row>
//           </Section>

//           {/* ── Body ── */}
//           <Section style={{ padding: "28px 25px 4px 25px", color: "#333333" }}>
//             {/* Greeting */}
//             <Text style={{ fontSize: "15px", margin: "0 0 6px 0" }}>
//               Hi <strong>{name}</strong>,
//             </Text>
//             <Text
//               style={{
//                 fontSize: "14px",
//                 margin: "0 0 20px 0",
//                 lineHeight: "1.6",
//               }}
//             >
//               Thank you for registering for our upcoming lecture. Your seat
//               has been reserved. To secure your spot, please complete the
//               payment using the details below.
//             </Text>

//             {/* Slot badge */}
//             <Section
//               style={{
//                 backgroundColor: "#edf5f1",
//                 borderLeft: "4px solid #1a4a3a",
//                 borderRadius: "6px",
//                 padding: "12px 16px",
//                 marginBottom: "20px",
//               }}
//             >
//               <Text
//                 style={{ margin: 0, fontSize: "13px", color: "#6b7280" }}
//               >
//                 Your Registered Lecture
//               </Text>
//               <Text
//                 style={{
//                   margin: "4px 0 0 0",
//                   fontSize: "15px",
//                   fontWeight: "bold",
//                   color: "#1a4a3a",
//                 }}
//               >
//                 {lectureTitle}
//               </Text>
//               <Text
//                 style={{
//                   margin: "4px 0 0 0",
//                   fontSize: "13px",
//                   color: "#374151",
//                 }}
//               >
//                 📅 {slotDate} IST
//               </Text>
//             </Section>

//             {/* Payment Details */}
//             <Text
//               style={{
//                 fontWeight: "bold",
//                 fontSize: "16px",
//                 margin: "0 0 10px 0",
//               }}
//             >
//               Payment Details
//             </Text>
//             <Section
//               style={{
//                 border: "1px solid #e2e8f0",
//                 borderRadius: "8px",
//                 overflow: "hidden",
//                 fontSize: "14px",
//                 marginBottom: "20px",
//               }}
//             >
//               <Row
//                 style={{
//                   backgroundColor: "#f9fafb",
//                   borderBottom: "1px solid #e2e8f0",
//                 }}
//               >
//                 <Column
//                   style={{
//                     padding: "10px 14px",
//                     fontWeight: "bold",
//                     width: "140px",
//                     color: "#374151",
//                   }}
//                 >
//                   Amount
//                 </Column>
//                 <Column
//                   style={{
//                     padding: "10px 14px",
//                     color: "#111827",
//                     fontWeight: "bold",
//                     fontSize: "15px",
//                   }}
//                 >
//                   {price}
//                 </Column>
//               </Row>
//               <Row style={{ borderBottom: "1px solid #e2e8f0" }}>
//                 <Column
//                   style={{
//                     padding: "10px 14px",
//                     fontWeight: "bold",
//                     width: "140px",
//                     color: "#374151",
//                   }}
//                 >
//                   UPI ID
//                 </Column>
//                 <Column style={{ padding: "10px 14px", color: "#111827" }}>
//                   {upiId}
//                 </Column>
//               </Row>
//               <Row>
//                 <Column
//                   style={{
//                     padding: "10px 14px",
//                     fontWeight: "bold",
//                     width: "140px",
//                     color: "#374151",
//                   }}
//                 >
//                   Transaction Ref
//                 </Column>
//                 <Column
//                   style={{
//                     padding: "10px 14px",
//                     color: "#111827",
//                     fontFamily: "monospace",
//                   }}
//                 >
//                   {transactionRef}
//                 </Column>
//               </Row>
//             </Section>

//             <Text
//               style={{
//                 fontSize: "13px",
//                 color: "#6b7280",
//                 margin: "-12px 0 20px 0",
//               }}
//             >
//               You can make the payment using any UPI app: Google Pay, PhonePe,
//               Paytm, etc.
//             </Text>

//             {/* QR Code */}
//             <Text
//               style={{
//                 fontWeight: "bold",
//                 fontSize: "16px",
//                 margin: "0 0 10px 0",
//               }}
//             >
//               QR Code Option
//             </Text>
//             <Text
//               style={{
//                 fontSize: "13px",
//                 color: "#6b7280",
//                 margin: "0 0 14px 0",
//               }}
//             >
//               Scan the QR code below with any UPI app to pay directly.
//             </Text>
//             <Section style={{ textAlign: "center", marginBottom: "20px" }}>
//               <Img
//                 src={qrDataUrl}
//                 width="200"
//                 height="200"
//                 alt="UPI QR Code"
//                 style={{
//                   display: "inline-block",
//                   border: "1px solid #e2e8f0",
//                   borderRadius: "8px",
//                   padding: "8px",
//                 }}
//               />
//             </Section>

//             {/* After Payment */}
//             <Text
//               style={{
//                 fontWeight: "bold",
//                 fontSize: "16px",
//                 margin: "0 0 10px 0",
//               }}
//             >
//               After Payment
//             </Text>
//             <Text
//               style={{
//                 fontSize: "14px",
//                 lineHeight: "1.7",
//                 margin: "0 0 6px 0",
//               }}
//             >
//               Once you have completed the payment, please{" "}
//               <strong>reply to this email</strong> with:
//             </Text>
//             <Section
//               style={{
//                 backgroundColor: "#f1f5f9",
//                 padding: "12px 16px",
//                 borderRadius: "8px",
//                 marginBottom: "20px",
//               }}
//             >
//               <Text
//                 style={{ margin: "0 0 6px 0", fontSize: "14px", color: "#374151" }}
//               >
//                 • Your name
//               </Text>
//               <Text style={{ margin: 0, fontSize: "14px", color: "#374151" }}>
//                 • Screenshot of the payment confirmation
//               </Text>
//             </Section>
//             <Text
//               style={{
//                 fontSize: "13px",
//                 color: "#6b7280",
//                 margin: "-12px 0 20px 0",
//               }}
//             >
//               This helps us confirm your seat quickly.
//             </Text>

//             {/* Important */}
//             <Text
//               style={{
//                 fontWeight: "bold",
//                 fontSize: "16px",
//                 margin: "0 0 10px 0",
//               }}
//             >
//               Important
//             </Text>
//             <Section
//               style={{
//                 backgroundColor: "#fff7ed",
//                 border: "1px solid #fed7aa",
//                 padding: "12px 16px",
//                 borderRadius: "8px",
//                 marginBottom: "20px",
//               }}
//             >
//               <Text
//                 style={{
//                   margin: "0 0 6px 0",
//                   fontSize: "14px",
//                   color: "#92400e",
//                 }}
//               >
//                 Your seat is held temporarily. it will be{" "}
//                 <strong>
//                   auto-released if payment is not received 1 day prior
//                 </strong>{" "}
//                 to the lecture.
//               </Text>
//               <Text style={{ margin: 0, fontSize: "14px", color: "#92400e" }}>
//                 Your registration will be confirmed only after payment
//                 verification.
//               </Text>
//             </Section>

//             {/* Sign-off */}
//             <Text
//               style={{
//                 fontSize: "14px",
//                 lineHeight: "1.7",
//                 margin: "0 0 4px 0",
//               }}
//             >
//               If you have any questions or face any issues, feel free to reply
//               to this email: we are happy to help.
//             </Text>
//             <Text
//               style={{
//                 fontSize: "14px",
//                 lineHeight: "1.7",
//                 margin: "0 0 24px 0",
//               }}
//             >
//               Looking forward to seeing you at the lecture.
//               <br />
//               <strong>Best regards,</strong>
//               <br />
//               Team Sukshmadarshini
//             </Text>
//           </Section>

//           {/* ── Footer ── */}
//           <Hr style={{ borderColor: "#e2e8f0", margin: 0 }} />
//           <Section
//             style={{
//               backgroundColor: "#f9fafb",
//               padding: "15px",
//               textAlign: "center",
//             }}
//           >
//             <Text style={{ fontSize: "12px", color: "#6b7280", margin: 0 }}>
//               This email was sent from Sukshmadarshini™ · Lecture Division.
//               {transactionRef}
//             </Text>
//           </Section>
//         </Container>
//       </Body>
//     </Html>
//   );
// }

// app/components/emails/LectureEmail.tsx
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
import { EmailContent } from "@/app/lib/queries/email-templates";

interface LectureEmailProps {
  name:          string;
  email:         string;
  lectureTitle:  string;
  lectureId:     string;
  price:         string;
  amountNumeric: number;
  selectedSlot:  string;
  upiId:         string;
  upiName:       string;
  transactionRef:string;
  qrDataUrl:     string;
  emailContent:  EmailContent;
}

export default function LectureEmail({
  name,
  lectureTitle,
  price,
  selectedSlot,
  upiId,
  transactionRef,
  qrDataUrl,
  emailContent,
}: LectureEmailProps) {
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
                  {emailContent.headerTitle}
                </Text>
                <Text style={{ margin: 0, color: "#a7c4b5", fontSize: "13px" }}>
                  {emailContent.headerSubtitle}
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
              {emailContent.bodyText}
            </Text>

            {/* Slot badge */}
            <Section
              style={{
                backgroundColor: "#edf5f1",
                borderLeft: "4px solid #1a4a3a",
                borderRadius: "6px",
                padding: "12px 16px",
                marginBottom: "20px",
              }}
            >
              <Text style={{ margin: 0, fontSize: "13px", color: "#6b7280" }}>
                Your Registered Lecture
              </Text>
              <Text style={{ margin: "4px 0 0 0", fontSize: "15px", fontWeight: "bold", color: "#1a4a3a" }}>
                {lectureTitle}
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
              {emailContent.upiNote}
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
              {emailContent.afterPaymentText}
            </Text>
            <Section
              style={{
                backgroundColor: "#f1f5f9",
                padding: "12px 16px",
                borderRadius: "8px",
                marginBottom: "20px",
              }}
            >
              <Text style={{ margin: "0 0 6px 0", fontSize: "14px", color: "#374151" }}>• Your name</Text>
              <Text style={{ margin: 0, fontSize: "14px", color: "#374151" }}>• Screenshot of the payment confirmation</Text>
            </Section>
            <Text style={{ fontSize: "13px", color: "#6b7280", margin: "-12px 0 20px 0" }}>
              This helps us confirm your seat quickly.
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
              <Text style={{ margin: 0, fontSize: "14px", color: "#92400e" }}>
                {emailContent.importantNote}
              </Text>
            </Section>

            {/* Sign-off */}
            <Text style={{ fontSize: "14px", lineHeight: "1.7", margin: "0 0 4px 0" }}>
              {emailContent.signOff}
            </Text>
            <Text style={{ fontSize: "14px", lineHeight: "1.7", margin: "0 0 24px 0" }}>
              Looking forward to seeing you at the lecture.
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
              {emailContent.footerText} · {transactionRef}
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}