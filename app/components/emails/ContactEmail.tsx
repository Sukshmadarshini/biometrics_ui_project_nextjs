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
//           <Section style={{ backgroundColor: "#31366d", padding: "24px" }}>
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
//                 <Text style={{ margin: 0, color: "#ffffff", fontSize: "20px", fontWeight: "bold" }}>
//                   New Contact Form Submission
//                 </Text>
//                 <Text style={{ margin: 0, color: "#c7cbe8", fontSize: "13px" }}>
//                   Sukshmadarshini™· Internal Notification
//                 </Text>
//               </Column>
//             </Row>
//           </Section>

//           {/* ── Body ── */}
//           <Section style={{ padding: "28px 25px 4px 25px", color: "#333333" }}>
//             <Text style={{ fontSize: "14px", margin: "0 0 20px 0", lineHeight: "1.6" }}>
//               You have received a new message from your website contact form.
//             </Text>

//             {/* Contact Details */}
//             <Text style={{ fontWeight: "bold", fontSize: "13px", color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.05em", margin: "0 0 8px 0" }}>
//               Sender Details
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
//               <Row style={{ backgroundColor: "#f9fafb", borderBottom: "1px solid #e2e8f0" }}>
//                 <Column style={{ padding: "10px 14px", fontWeight: "bold", width: "120px", color: "#374151" }}>
//                   Name
//                 </Column>
//                 <Column style={{ padding: "10px 14px", color: "#111827" }}>
//                   {name}
//                 </Column>
//               </Row>
//               <Row style={{ borderBottom: "1px solid #e2e8f0" }}>
//                 <Column style={{ padding: "10px 14px", fontWeight: "bold", width: "120px", color: "#374151" }}>
//                   Email
//                 </Column>
//                 <Column style={{ padding: "10px 14px", color: "#111827" }}>
//                   {email}
//                 </Column>
//               </Row>
//               <Row style={{ borderBottom: "1px solid #e2e8f0" }}>
//                 <Column style={{ padding: "10px 14px", fontWeight: "bold", width: "120px", color: "#374151" }}>
//                   Subject
//                 </Column>
//                 <Column style={{ padding: "10px 14px", color: "#111827" }}>
//                   {subject}
//                 </Column>
//               </Row>
//               <Row>
//                 <Column style={{ padding: "10px 14px", fontWeight: "bold", width: "120px", color: "#374151" }}>
//                   Received
//                 </Column>
//                 <Column style={{ padding: "10px 14px", color: "#6b7280", fontSize: "13px" }}>
//                   {submittedAt} IST
//                 </Column>
//               </Row>
//             </Section>

//             {/* Message */}
//             <Text style={{ fontWeight: "bold", margin: "0 0 8px 0", fontSize: "14px" }}>
//               Message:
//             </Text>
//             <Section
//               style={{
//                 backgroundColor: "#f1f5f9",
//                 padding: "14px 16px",
//                 borderRadius: "8px",
//                 fontSize: "14px",
//                 lineHeight: "1.6",
//                 color: "#374151",
//                 marginBottom: "24px",
//               }}
//             >
//               <Text style={{ margin: 0, whiteSpace: "pre-line" }}>{message}</Text>
//             </Section>
//           </Section>

//           {/* ── Footer ── */}
//           <Hr style={{ borderColor: "#e2e8f0", margin: 0 }} />
//           <Section style={{ backgroundColor: "#f9fafb", padding: "15px", textAlign: "center" }}>
//             <Text style={{ fontSize: "12px", color: "#6b7280", margin: 0 }}>
//               This email was sent from the Sukshmadarshini™ contact form.
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
import { EmailContent } from "@/app/lib/queries/email-templates";

interface ContactEmailProps {
  name:         string;
  email:        string;
  subject:      string;
  message:      string;
  emailContent: EmailContent;
}

export default function ContactEmail({
  name,
  email,
  subject,
  message,
  emailContent,
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
                  {emailContent.headerTitle}
                </Text>
                <Text style={{ margin: 0, color: "#c7cbe8", fontSize: "13px" }}>
                  {emailContent.headerSubtitle}
                </Text>
              </Column>
            </Row>
          </Section>

          {/* ── Body ── */}
          <Section style={{ padding: "28px 25px 4px 25px", color: "#333333" }}>
            <Text style={{ fontSize: "14px", margin: "0 0 20px 0", lineHeight: "1.6" }}>
              {emailContent.bodyText}
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
              {emailContent.footerText}
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}