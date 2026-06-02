// // // app/components/emails/ComplementaryLectureEmail.tsx
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
// // } from "@react-email/components";

// // interface ComplementaryLectureEmailProps {
// //   name: string;
// //   email: string;
// //   lectureTitle: string;
// //   lectureId: string;
// //   selectedSlot: string; // ISO datetime string
// //   mode: string;         // e.g. "Online", "Offline", "Hybrid"
// //   duration: string;     // e.g. "2 hours"
// //   registrationRef: string;
// // }

// // export default function ComplementaryLectureEmail({
// //   name,
// //   lectureTitle,
// //   selectedSlot,
// //   mode,
// //   duration,
// //   registrationRef,
// // }: ComplementaryLectureEmailProps) {
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
// //           <Section style={{ backgroundColor: "#4a1d6e", padding: "24px" }}>
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
// //                   Seat Confirmed.
// //                 </Text>
// //                 <Text style={{ margin: 0, color: "#d8b4fe", fontSize: "13px" }}>
// //                   Sukshmadarshini™ Complementary Lecture
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
// //               We&apos;re delighted to confirm your registration for our upcoming complementary lecture!
// //               This session is completely <strong>free of charge</strong> — your seat is confirmed the moment you register.
// //             </Text>

// //             {/* FREE badge */}
// //             <Section
// //               style={{
// //                 backgroundColor: "#f0fdf4",
// //                 border: "1px solid #bbf7d0",
// //                 borderRadius: "6px",
// //                 padding: "10px 16px",
// //                 marginBottom: "20px",
// //                 textAlign: "center",
// //               }}
// //             >
// //               <Text style={{ margin: 0, fontSize: "15px", fontWeight: "bold", color: "#15803d" }}>
// //                 ✅ This is a FREE lecture — No payment required
// //               </Text>
// //             </Section>

// //             {/* Session Details */}
// //             <Section
// //               style={{
// //                 backgroundColor: "#f5f0fc",
// //                 borderLeft: "4px solid #4a1d6e",
// //                 borderRadius: "6px",
// //                 padding: "12px 16px",
// //                 marginBottom: "20px",
// //               }}
// //             >
// //               <Text style={{ margin: 0, fontSize: "13px", color: "#6b7280" }}>
// //                 Your Registered Lecture
// //               </Text>
// //               <Text style={{ margin: "4px 0 0 0", fontSize: "15px", fontWeight: "bold", color: "#4a1d6e" }}>
// //                 {lectureTitle}
// //               </Text>
// //               <Text style={{ margin: "6px 0 0 0", fontSize: "13px", color: "#374151" }}>
// //                 📅 {slotDate} IST
// //               </Text>
// //               <Text style={{ margin: "4px 0 0 0", fontSize: "13px", color: "#374151" }}>
// //                 🎙️ Mode: {mode}
// //               </Text>
// //               <Text style={{ margin: "4px 0 0 0", fontSize: "13px", color: "#374151" }}>
// //                 ⏱️ Duration: {duration}
// //               </Text>
// //             </Section>

// //             {/* Registration Reference */}
// //             <Section
// //               style={{
// //                 border: "1px solid #e2e8f0",
// //                 borderRadius: "8px",
// //                 overflow: "hidden",
// //                 fontSize: "14px",
// //                 marginBottom: "20px",
// //               }}
// //             >
// //               <Row style={{ backgroundColor: "#f9fafb" }}>
// //                 <Column style={{ padding: "10px 14px", fontWeight: "bold", width: "160px", color: "#374151" }}>
// //                   Registration Ref
// //                 </Column>
// //                 <Column style={{ padding: "10px 14px", color: "#111827", fontFamily: "monospace" }}>
// //                   {registrationRef}
// //                 </Column>
// //               </Row>
// //             </Section>

// //             {/* What to Expect */}
// //             <Text style={{ fontWeight: "bold", fontSize: "16px", margin: "0 0 10px 0" }}>
// //               📌 What to Expect
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
// //                 • A joining link or venue details will be shared closer to the lecture date.
// //               </Text>
// //               <Text style={{ margin: "0 0 6px 0", fontSize: "14px", color: "#374151" }}>
// //                 • Please keep this email handy as your registration confirmation.
// //               </Text>
// //               <Text style={{ margin: 0, fontSize: "14px", color: "#374151" }}>
// //                 • We recommend joining a few minutes early to get settled.
// //               </Text>
// //             </Section>

// //             {/* Sign-off */}
// //             <Text style={{ fontSize: "14px", lineHeight: "1.7", margin: "0 0 4px 0" }}>
// //               If you have any questions, feel free to reply to this email — we&apos;re happy to help!
// //             </Text>
// //             <Text style={{ fontSize: "14px", lineHeight: "1.7", margin: "0 0 24px 0" }}>
// //               Looking forward to seeing you at the lecture 🚀
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
// //               This email was sent from Sukshmadarshini™ · Ref: {registrationRef}
// //             </Text>
// //           </Section>
// //         </Container>
// //       </Body>
// //     </Html>
// //   );
// // }

// // app/components/emails/ComplementaryLectureEmail.tsx
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

// interface ComplementaryLectureEmailProps {
//   name: string;
//   email: string;
//   lectureTitle: string;
//   lectureId: string;
//   selectedSlot: string;
//   mode: string;
//   duration: string;
//   registrationRef: string;
// }

// export default function ComplementaryLectureEmail({
//   name,
//   lectureTitle,
//   selectedSlot,
//   mode,
//   duration,
//   registrationRef,
// }: ComplementaryLectureEmailProps) {
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
//           <Section style={{ backgroundColor: "#be3ad4", height: "4px", borderRadius: "2px 2px 0 0" }} />

//           {/* ── Header ── */}
//           <Section
//             style={{
//               background: "linear-gradient(135deg, #1a0533 0%, #60177d 50%, #1a0533 100%)",
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
//                     color: "#a78bfa",
//                   }}
//                 >
//                   Sukshmadarshini™ · Lecture Series
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
//                   Seat Confirmed
//                 </Text>
//                 <Text style={{ margin: 0, fontSize: "14px", color: "#c4b5fd" }}>
//                   Your complementary lecture registration is complete.
//                 </Text>
//               </Column>
//               <Column style={{ width: "48px", verticalAlign: "top", textAlign: "right" }}>
//                 <Img
//                   src="https://biometrics-ui-project-nextjs.vercel.app/mail.png"
//                   width="36"
//                   height="36"
//                   alt="mail"
//                   style={{ opacity: "0.6" }}
//                 />
//               </Column>
//             </Row>
//           </Section>

//           {/* ── Free badge ── */}
//           <Section style={{ backgroundColor: "#b0ffc8" , padding: "12px 32px", borderBottom: "1px solid #b0ffc8" }}>
//             <Text style={{ margin: 0, fontSize: "13px", color:  "#006937", fontWeight: "bolder", textAlign: "center", letterSpacing: "0.5px" }}>
//               ✓ &nbsp;COMPLIMENTARY SESSION — NO PAYMENT REQUIRED
//             </Text>
//           </Section>

//           {/* ── Body ── */}
//           <Section style={{ backgroundColor: "#ffffff", padding: "36px 32px 8px" }}>

//             <Text style={{ fontSize: "15px", margin: "0 0 6px 0", color: "#111827", 
//               // fontFamily: "Georgia, serif" 
//               }}>
//               Dear <strong>{name}</strong>,
//             </Text>
//             <Text style={{ fontSize: "14px", margin: "0 0 28px 0", lineHeight: "1.75", color: "#374151" }}>
//               We are delighted to confirm your registration for the upcoming complementary lecture. Your seat is reserved and no further action is needed on your part.
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
//               <Section style={{ backgroundColor: "#faf5ff", padding: "14px 20px", borderBottom: "1px solid #e5e7eb" }}>
//                 <Text style={{ margin: 0, fontSize: "10px", fontWeight: "bold", letterSpacing: "2px", textTransform: "uppercase", color: "#7c3aed" }}>
//                   Registered Lecture
//                 </Text>
//               </Section>
//               <Section style={{ padding: "20px" }}>
//                 <Text style={{ margin: "0 0 12px 0", fontSize: "17px", fontWeight: "bold", color: "#1e1b4b", 
//                   // fontFamily: "Georgia, serif" 
//                   }}>
//                   {lectureTitle}
//                 </Text>
//                 <Row style={{ marginBottom: "8px" }}>
//                   <Column style={{ width: "20px" }}>
//                     <Text style={{ margin: 0, fontSize: "14px" }}>📅</Text>
//                   </Column>
//                   <Column>
//                     <Text style={{ margin: 0, fontSize: "13px", color: "#374151" }}>{slotDate} IST</Text>
//                   </Column>
//                 </Row>
//                 <Row style={{ marginBottom: "8px" }}>
//                   <Column style={{ width: "20px" }}>
//                     <Text style={{ margin: 0, fontSize: "14px" }}>🎙️</Text>
//                   </Column>
//                   <Column>
//                     <Text style={{ margin: 0, fontSize: "13px", color: "#374151" }}>Mode: {mode}</Text>
//                   </Column>
//                 </Row>
//                 <Row>
//                   <Column style={{ width: "20px" }}>
//                     <Text style={{ margin: 0, fontSize: "14px" }}>⏱️</Text>
//                   </Column>
//                   <Column>
//                     <Text style={{ margin: 0, fontSize: "13px", color: "#374151" }}>Duration: {duration}</Text>
//                   </Column>
//                 </Row>
//               </Section>
//               <Section style={{ backgroundColor: "#f9fafb", padding: "10px 20px", borderTop: "1px solid #e5e7eb" }}>
//                 <Row>
//                   <Column>
//                     <Text style={{ margin: 0, fontSize: "11px", color: "#9ca3af", letterSpacing: "1px", textTransform: "uppercase" }}>Registration Reference</Text>
//                   </Column>
//                   <Column style={{ textAlign: "right" }}>
//                     <Text style={{ margin: 0, fontSize: "12px", color: "#4b5563", fontFamily: "monospace", letterSpacing: "1px" }}>
//                       {registrationRef}
//                     </Text>
//                   </Column>
//                 </Row>
//               </Section>
//             </Section>

//             {/* What to expect */}
//             <Text style={{ fontSize: "12px", fontWeight: "bold", letterSpacing: "2px", textTransform: "uppercase", color: "#9ca3af", margin: "0 0 12px 0" }}>
//               What to Expect
//             </Text>
//             <Section style={{ marginBottom: "28px" }}>
//               {[
//                 "A joining link or venue details will be shared closer to the lecture date.",
//                 "Please keep this email as your registration confirmation.",
//                 "We recommend joining a few minutes early to settle in.",
//               ].map((item, i) => (
//                 <Row key={i} style={{ marginBottom: "10px" }}>
//                   <Column style={{ width: "28px", verticalAlign: "top" }}>
//                     <Text style={{ margin: 0, fontSize: "13px", color: "#7c3aed", fontWeight: "bold" }}>→</Text>
//                   </Column>
//                   <Column>
//                     <Text style={{ margin: 0, fontSize: "13px", color: "#374151", lineHeight: "1.6" }}>{item}</Text>
//                   </Column>
//                 </Row>
//               ))}
//             </Section>

//             <Hr style={{ borderColor: "#f3f4f6", margin: "0 0 24px 0" }} />

//             <Text style={{ fontSize: "14px", color: "#374151", lineHeight: "1.75", margin: "0 0 4px 0" }}>
//               Should you have any questions, please don&apos;t hesitate to reply to this email.
//             </Text>
//             <Text style={{ fontSize: "14px", color: "#374151", lineHeight: "1.75", margin: "0 0 32px 0" }}>
//               We look forward to welcoming you.
//               <br /><br />
//               <span style={{ color: "#6b7280" }}>With regards,</span>
//               <br />
//               <strong style={{ color: "#1e1b4b" }}>Team Sukshmadarshini</strong>
//             </Text>
//           </Section>

//           {/* ── Footer ── */}
//           <Section style={{ backgroundColor: "#1a0533", padding: "20px 32px", borderRadius: "0 0 2px 2px" }}>
//             <Text style={{ fontSize: "11px", color: "#665a96", margin: "0 0 4px 0", textAlign: "center", letterSpacing: "0.5px" }}>
//               SUKSHMADARSHINI™ · COMPLEMENTARY LECTURE
//             </Text>
//             <Text style={{ fontSize: "11px", color: "#665a96", margin: 0, textAlign: "center", fontFamily: "monospace" }}>
//               Ref: {registrationRef}
//             </Text>
//           </Section>

//         </Container>
//       </Body>
//     </Html>
//   );
// }

// app/components/emails/ComplementaryLectureEmail.tsx
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

interface ComplementaryLectureEmailProps {
  name: string;
  email: string;
  lectureTitle: string;
  lectureId: string;
  selectedSlot: string;
  mode: string;
  duration: string;
  registrationRef: string;
}

export default function ComplementaryLectureEmail({
  name,
  lectureTitle,
  selectedSlot,
  mode,
  duration,
  registrationRef,
}: ComplementaryLectureEmailProps) {
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
                  Seat Confirmed.
                </Text>
                <Text style={{ margin: 0, color: "#c7cbe8", fontSize: "13px" }}>
                  Sukshmadarshini™ Complementary Lecture
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
              We are delighted to confirm your registration for our upcoming complementary lecture.
              This session is completely <strong>free of charge</strong>: your seat is confirmed the moment you register.
            </Text>

            {/* FREE badge */}
            <Section
              style={{
                backgroundColor: "#f0fdf4",
                border: "1px solid #bbf7d0",
                borderRadius: "6px",
                padding: "10px 16px",
                marginBottom: "20px",
                textAlign: "center",
              }}
            >
              <Text style={{ margin: 0, fontSize: "14px", fontWeight: "bold", color: "#15803d" }}>
                This is a FREE lecture: No payment required
              </Text>
            </Section>

            {/* Session badge */}
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
                Your Registered Lecture
              </Text>
              <Text style={{ margin: "4px 0 0 0", fontSize: "15px", fontWeight: "bold", color: "#31366d" }}>
                {lectureTitle}
              </Text>
              <Text style={{ margin: "6px 0 0 0", fontSize: "13px", color: "#374151" }}>
                📅 {slotDate} IST
              </Text>
              <Text style={{ margin: "4px 0 0 0", fontSize: "13px", color: "#374151" }}>
                🎙️ Mode: {mode}
              </Text>
              <Text style={{ margin: "4px 0 0 0", fontSize: "13px", color: "#374151" }}>
                ⏱️ Duration: {duration}
              </Text>
            </Section>

            {/* Registration reference */}
            <Text style={{ fontWeight: "bold", fontSize: "13px", color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.05em", margin: "0 0 8px 0" }}>
              Registration Details
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
              <Row style={{ backgroundColor: "#f9fafb" }}>
                <Column style={{ padding: "10px 14px", fontWeight: "bold", width: "160px", color: "#374151" }}>
                  Registration Ref
                </Column>
                <Column style={{ padding: "10px 14px", color: "#111827", fontFamily: "monospace" }}>
                  {registrationRef}
                </Column>
              </Row>
            </Section>

            {/* What to Expect */}
            <Text style={{ fontWeight: "bold", margin: "0 0 8px 0", fontSize: "14px" }}>
              What to Expect
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
                • A joining link or venue details will be shared closer to the lecture date.
              </Text>
              <Text style={{ margin: "0 0 6px 0", fontSize: "14px", color: "#374151" }}>
                • Please keep this email handy as your registration confirmation.
              </Text>
              <Text style={{ margin: 0, fontSize: "14px", color: "#374151" }}>
                • We recommend joining a few minutes early to get settled.
              </Text>
            </Section>

            {/* Sign-off */}
            <Text style={{ fontSize: "14px", lineHeight: "1.7", margin: "0 0 4px 0" }}>
              If you have any questions, feel free to reply to this email: we are happy to help.
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
              This email was sent from Sukshmadarshini™ · Ref: {registrationRef}
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}