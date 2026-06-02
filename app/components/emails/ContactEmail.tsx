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

// // interface ContactEmailProps {
// //   name: string;
// //   email: string;
// //   subject: string;
// //   message: string;
// // }

// // export default function ContactEmail({
// //   name,
// //   email,
// //   subject,
// //   message,
// // }: ContactEmailProps) {
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
// //           {/* Header */}
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
// //                 <Text
// //                   style={{
// //                     margin: 0,
// //                     color: "#ffffff",
// //                     fontSize: "20px",
// //                     fontWeight: "bold",
// //                   }}
// //                 >
// //                   New Contact Form Submission
// //                 </Text>
// //               </Column>
// //             </Row>
// //           </Section>

// //           {/* Body */}
// //           <Section style={{ padding: "25px", color: "#333333" }}>
// //             <Text style={{ fontSize: "14px", margin: "0 0 20px 0" }}>
// //               You have received a new message from your website contact form.
// //             </Text>

// //             {/* Details Table */}
// //             <Section
// //               style={{
// //                 border: "1px solid #e2e8f0",
// //                 borderRadius: "8px",
// //                 overflow: "hidden",
// //                 fontSize: "14px",
// //               }}
// //             >
// //               <Row style={{ backgroundColor: "#f9fafb", borderBottom: "1px solid #e2e8f0" }}>
// //                 <Column style={{ padding: "10px 12px", fontWeight: "bold", width: "120px" }}>
// //                   Name
// //                 </Column>
// //                 <Column style={{ padding: "10px 12px" }}>{name}</Column>
// //               </Row>
// //               <Row style={{ borderBottom: "1px solid #e2e8f0" }}>
// //                 <Column style={{ padding: "10px 12px", fontWeight: "bold", width: "120px" }}>
// //                   Email
// //                 </Column>
// //                 <Column style={{ padding: "10px 12px" }}>{email}</Column>
// //               </Row>
// //               <Row>
// //                 <Column style={{ padding: "10px 12px", fontWeight: "bold", width: "120px" }}>
// //                   Subject
// //                 </Column>
// //                 <Column style={{ padding: "10px 12px" }}>{subject}</Column>
// //               </Row>
// //             </Section>

// //             {/* Message */}
// //             <Text style={{ fontWeight: "bold", margin: "20px 0 8px 0", fontSize: "14px" }}>
// //               Message:
// //             </Text>
// //             <Section
// //               style={{
// //                 backgroundColor: "#f1f5f9",
// //                 padding: "15px",
// //                 borderRadius: "8px",
// //                 fontSize: "14px",
// //                 lineHeight: "1.6",
// //                 color: "#333333",
// //               }}
// //             >
// //               <Text style={{ margin: 0, whiteSpace: "pre-line" }}>{message}</Text>
// //             </Section>
// //           </Section>

// //           {/* Footer */}
// //           <Hr style={{ borderColor: "#e2e8f0", margin: 0 }} />
// //           <Section
// //             style={{
// //               backgroundColor: "#f9fafb",
// //               padding: "15px",
// //               textAlign: "center",
// //             }}
// //           >
// //             <Text style={{ fontSize: "12px", color: "#6b7280", margin: 0 }}>
// //               This email was sent from your website contact form.
// //             </Text>
// //           </Section>
// //         </Container>
// //       </Body>
// //     </Html>
// //   );
// // }

// // app/components/emails/ContactEmail.tsx
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

// interface ContactEmailProps {
//   name: string;
//   email: string;
//   subject: string;
//   message: string;
// }

// export default function ContactEmail({
//   name,
//   email,
//   subject,
//   message,
// }: ContactEmailProps) {
//   const submittedAt = new Date().toLocaleString("en-IN", {
//     weekday: "short",
//     month: "short",
//     day: "numeric",
//     year: "numeric",
//     hour: "2-digit",
//     minute: "2-digit",
//     timeZone: "Asia/Kolkata",
//   });

//   return (
//     <Html>
//       <Head>
//         <Font
//           fontFamily="Georgia"
//           fallbackFontFamily="Times New Roman"
//           webFont={undefined}
//           fontWeight={400}
//           fontStyle="normal"
//         />
//       </Head>
//       <Body style={{ backgroundColor: "#0c0f1a", padding: "32px 16px", margin: 0 }}>
//         <Container style={{ maxWidth: "600px", margin: "0 auto" }}>

//           {/* ── Top accent bar ── */}
//           <Section style={{ backgroundColor: "#6366f1", height: "4px", borderRadius: "2px 2px 0 0" }} />

//           {/* ── Header ── */}
//           <Section
//             style={{
//               background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1e1b4b 100%)",
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
//                     color: "#a5b4fc",
//                   }}
//                 >
//                   Sukshmadarshini™ · Contact
//                 </Text>
//                 <Text
//                   style={{
//                     margin: "0 0 6px 0",
//                     fontSize: "28px",
//                     fontWeight: "bold",
//                     color: "#ffffff",
//                     lineHeight: "1.2",
//                     fontFamily: "Georgia, serif",
//                   }}
//                 >
//                   New Message Received
//                 </Text>
//                 <Text style={{ margin: 0, fontSize: "14px", color: "#c7d2fe" }}>
//                   A visitor has submitted a contact form enquiry.
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

//             <Text style={{ fontSize: "12px", fontWeight: "bold", letterSpacing: "2px", textTransform: "uppercase", color: "#9ca3af", margin: "0 0 12px 0" }}>
//               Sender Details
//             </Text>
//             <Section
//               style={{
//                 border: "1px solid #e5e7eb",
//                 borderRadius: "10px",
//                 overflow: "hidden",
//                 marginBottom: "28px",
//               }}
//             >
//               <Row style={{ borderBottom: "1px solid #f3f4f6" }}>
//                 <Column style={{ padding: "13px 20px", width: "120px", backgroundColor: "#f9fafb" }}>
//                   <Text style={{ margin: 0, fontSize: "11px", fontWeight: "bold", color: "#6b7280", textTransform: "uppercase", letterSpacing: "1px" }}>Name</Text>
//                 </Column>
//                 <Column style={{ padding: "13px 20px" }}>
//                   <Text style={{ margin: 0, fontSize: "14px", color: "#111827", fontWeight: "bold" }}>{name}</Text>
//                 </Column>
//               </Row>
//               <Row style={{ borderBottom: "1px solid #f3f4f6" }}>
//                 <Column style={{ padding: "13px 20px", width: "120px", backgroundColor: "#f9fafb" }}>
//                   <Text style={{ margin: 0, fontSize: "11px", fontWeight: "bold", color: "#6b7280", textTransform: "uppercase", letterSpacing: "1px" }}>Email</Text>
//                 </Column>
//                 <Column style={{ padding: "13px 20px" }}>
//                   <Text style={{ margin: 0, fontSize: "13px", color: "#374151", fontFamily: "monospace" }}>{email}</Text>
//                 </Column>
//               </Row>
//               <Row style={{ borderBottom: "1px solid #f3f4f6" }}>
//                 <Column style={{ padding: "13px 20px", width: "120px", backgroundColor: "#f9fafb" }}>
//                   <Text style={{ margin: 0, fontSize: "11px", fontWeight: "bold", color: "#6b7280", textTransform: "uppercase", letterSpacing: "1px" }}>Subject</Text>
//                 </Column>
//                 <Column style={{ padding: "13px 20px" }}>
//                   <Text style={{ margin: 0, fontSize: "13px", color: "#374151" }}>{subject}</Text>
//                 </Column>
//               </Row>
//               <Row>
//                 <Column style={{ padding: "13px 20px", width: "120px", backgroundColor: "#f9fafb" }}>
//                   <Text style={{ margin: 0, fontSize: "11px", fontWeight: "bold", color: "#6b7280", textTransform: "uppercase", letterSpacing: "1px" }}>Received</Text>
//                 </Column>
//                 <Column style={{ padding: "13px 20px" }}>
//                   <Text style={{ margin: 0, fontSize: "12px", color: "#6b7280" }}>{submittedAt} IST</Text>
//                 </Column>
//               </Row>
//             </Section>

//             <Text style={{ fontSize: "12px", fontWeight: "bold", letterSpacing: "2px", textTransform: "uppercase", color: "#9ca3af", margin: "0 0 12px 0" }}>
//               Message
//             </Text>
//             <Section
//               style={{
//                 backgroundColor: "#f8fafc",
//                 border: "1px solid #e5e7eb",
//                 borderLeft: "3px solid #6366f1",
//                 borderRadius: "0 8px 8px 0",
//                 padding: "20px 22px",
//                 marginBottom: "32px",
//               }}
//             >
//               <Text style={{ margin: 0, fontSize: "14px", lineHeight: "1.8", color: "#374151", whiteSpace: "pre-line" }}>
//                 {message}
//               </Text>
//             </Section>

//           </Section>

//           {/* ── Footer ── */}
//           <Section style={{ backgroundColor: "#1e1b4b", padding: "20px 32px", borderRadius: "0 0 2px 2px" }}>
//             <Text style={{ fontSize: "11px", color: "#4c4882", margin: 0, textAlign: "center", letterSpacing: "0.5px" }}>
//               SUKSHMADARSHINI™ · CONTACT FORM SUBMISSION
//             </Text>
//           </Section>

//         </Container>
//       </Body>
//     </Html>
//   );
// }

// app/components/emails/ContactEmail.tsx
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

interface ContactEmailProps {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactEmail({
  name,
  email,
  subject,
  message,
}: ContactEmailProps) {
  const submittedAt = new Date().toLocaleString("en-IN", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
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
                  New Contact Form Submission
                </Text>
                <Text style={{ margin: 0, color: "#c7cbe8", fontSize: "13px" }}>
                  Sukshmadarshini™· Internal Notification
                </Text>
              </Column>
            </Row>
          </Section>

          {/* ── Body ── */}
          <Section style={{ padding: "28px 25px 4px 25px", color: "#333333" }}>
            <Text style={{ fontSize: "14px", margin: "0 0 20px 0", lineHeight: "1.6" }}>
              You have received a new message from your website contact form.
            </Text>

            {/* Contact Details */}
            <Text style={{ fontWeight: "bold", fontSize: "13px", color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.05em", margin: "0 0 8px 0" }}>
              Sender Details
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
                <Column style={{ padding: "10px 14px", fontWeight: "bold", width: "120px", color: "#374151" }}>
                  Name
                </Column>
                <Column style={{ padding: "10px 14px", color: "#111827" }}>
                  {name}
                </Column>
              </Row>
              <Row style={{ borderBottom: "1px solid #e2e8f0" }}>
                <Column style={{ padding: "10px 14px", fontWeight: "bold", width: "120px", color: "#374151" }}>
                  Email
                </Column>
                <Column style={{ padding: "10px 14px", color: "#111827" }}>
                  {email}
                </Column>
              </Row>
              <Row style={{ borderBottom: "1px solid #e2e8f0" }}>
                <Column style={{ padding: "10px 14px", fontWeight: "bold", width: "120px", color: "#374151" }}>
                  Subject
                </Column>
                <Column style={{ padding: "10px 14px", color: "#111827" }}>
                  {subject}
                </Column>
              </Row>
              <Row>
                <Column style={{ padding: "10px 14px", fontWeight: "bold", width: "120px", color: "#374151" }}>
                  Received
                </Column>
                <Column style={{ padding: "10px 14px", color: "#6b7280", fontSize: "13px" }}>
                  {submittedAt} IST
                </Column>
              </Row>
            </Section>

            {/* Message */}
            <Text style={{ fontWeight: "bold", margin: "0 0 8px 0", fontSize: "14px" }}>
              Message:
            </Text>
            <Section
              style={{
                backgroundColor: "#f1f5f9",
                padding: "14px 16px",
                borderRadius: "8px",
                fontSize: "14px",
                lineHeight: "1.6",
                color: "#374151",
                marginBottom: "24px",
              }}
            >
              <Text style={{ margin: 0, whiteSpace: "pre-line" }}>{message}</Text>
            </Section>
          </Section>

          {/* ── Footer ── */}
          <Hr style={{ borderColor: "#e2e8f0", margin: 0 }} />
          <Section style={{ backgroundColor: "#f9fafb", padding: "15px", textAlign: "center" }}>
            <Text style={{ fontSize: "12px", color: "#6b7280", margin: 0 }}>
              This email was sent from the Sukshmadarshini™ contact form.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}