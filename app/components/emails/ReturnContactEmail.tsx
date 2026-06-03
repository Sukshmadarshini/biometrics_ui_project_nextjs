// // app/components/emails/ReturnContactEmail.tsx
// import {
//   Html, Head, Body, Container, Section, Row, Column,
//   Text, Hr, Font, Img,
// } from "@react-email/components";

// interface ReturnContactEmailProps {
//   name: string;
//   email: string;
//   subject: string;
//   message: string;
// }

// export default function ReturnContactEmail({ name, email, subject, message }: ReturnContactEmailProps) {
//   const submittedAt = new Date().toLocaleString("en-IN", {
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
//                   We&apos;ve Received Your Message
//                 </Text>
//                 <Text style={{ margin: 0, color: "#c7cbe8", fontSize: "13px" }}>Sukshmadarshini™</Text>
//               </Column>
//             </Row>
//           </Section>

//           {/* ── Body ── */}
//           <Section style={{ padding: "28px 25px 4px 25px", color: "#333333" }}>
//             <Text style={{ fontSize: "15px", margin: "0 0 6px 0" }}>
//               Hi <strong>{name}</strong>,
//             </Text>
//             <Text style={{ fontSize: "14px", margin: "0 0 20px 0", lineHeight: "1.6" }}>
//               Thank you for reaching out to us. We have successfully received your message and our team will get back to you as soon as possible, typically within <strong>1 to 2 business days</strong>.
//             </Text>

//             <Text style={{ fontWeight: "bold", fontSize: "13px", color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.05em", margin: "0 0 8px 0" }}>
//               Your Submission
//             </Text>
//             <Section style={{ border: "1px solid #e2e8f0", borderRadius: "8px", overflow: "hidden", fontSize: "14px", marginBottom: "20px" }}>
//               <Row style={{ backgroundColor: "#f9fafb", borderBottom: "1px solid #e2e8f0" }}>
//                 <Column style={{ padding: "10px 14px", fontWeight: "bold", width: "130px", color: "#374151" }}>Name</Column>
//                 <Column style={{ padding: "10px 14px", color: "#111827" }}>{name}</Column>
//               </Row>
//               <Row style={{ borderBottom: "1px solid #e2e8f0" }}>
//                 <Column style={{ padding: "10px 14px", fontWeight: "bold", width: "130px", color: "#374151" }}>Email</Column>
//                 <Column style={{ padding: "10px 14px", color: "#111827" }}>{email}</Column>
//               </Row>
//               <Row style={{ borderBottom: "1px solid #e2e8f0" }}>
//                 <Column style={{ padding: "10px 14px", fontWeight: "bold", width: "130px", color: "#374151" }}>Subject</Column>
//                 <Column style={{ padding: "10px 14px", color: "#111827" }}>{subject}</Column>
//               </Row>
//               <Row>
//                 <Column style={{ padding: "10px 14px", fontWeight: "bold", width: "130px", color: "#374151" }}>Submitted At</Column>
//                 <Column style={{ padding: "10px 14px", color: "#6b7280", fontSize: "13px" }}>{submittedAt} IST</Column>
//               </Row>
//             </Section>

//             <Text style={{ fontWeight: "bold", margin: "0 0 8px 0", fontSize: "14px" }}>Your Message:</Text>
//             <Section style={{ backgroundColor: "#f1f5f9", padding: "14px 16px", borderRadius: "8px", fontSize: "14px", lineHeight: "1.6", color: "#374151", marginBottom: "24px" }}>
//               <Text style={{ margin: 0, whiteSpace: "pre-line" }}>{message}</Text>
//             </Section>

//             <Section style={{ backgroundColor: "#eef0f9", borderLeft: "4px solid #31366d", borderRadius: "6px", padding: "12px 16px", marginBottom: "20px" }}>
//               <Text style={{ margin: 0, fontSize: "14px", fontWeight: "bold", color: "#31366d" }}>What happens next?</Text>
//               <Text style={{ margin: "8px 0 4px 0", fontSize: "13px", color: "#374151" }}>📬 Your message has been forwarded to our team.</Text>
//               <Text style={{ margin: "0 0 4px 0", fontSize: "13px", color: "#374151" }}>🕐 We aim to respond within 1 to 2 business days.</Text>
//               <Text style={{ margin: 0, fontSize: "13px", color: "#374151" }}>📧 You&apos;ll receive a reply directly to <strong>{email}</strong>.</Text>
//             </Section>

//             <Text style={{ fontSize: "14px", lineHeight: "1.7", margin: "0 0 4px 0" }}>
//               If you have anything to add, feel free to reply to this email directly.
//             </Text>
//             <Text style={{ fontSize: "14px", lineHeight: "1.7", margin: "0 0 24px 0" }}>
//               Warm regards,<br /><strong>Team Sukshmadarshini</strong>
//             </Text>
//           </Section>

//           {/* ── Footer ── */}
//           <Hr style={{ borderColor: "#e2e8f0", margin: 0 }} />
//           <Section style={{ backgroundColor: "#f9fafb", padding: "15px", textAlign: "center" }}>
//             <Text style={{ fontSize: "12px", color: "#6b7280", margin: 0 }}>
//               This email was sent from Sukshmadarshini™
//             </Text>
//           </Section>

//         </Container>
//       </Body>
//     </Html>
//   );
// }

// app/components/emails/ReturnContactEmail.tsx
import {
  Html, Head, Body, Container, Section, Row, Column,
  Text, Hr, Font, Img,
} from "@react-email/components";
import { EmailContent } from "@/app/lib/queries/email-templates";

interface ReturnContactEmailProps {
  name:         string;
  email:        string;
  subject:      string;
  message:      string;
  emailContent: EmailContent;
}

export default function ReturnContactEmail({ name, email, subject, message, emailContent }: ReturnContactEmailProps) {
  const submittedAt = new Date().toLocaleString("en-IN", {
    weekday: "short", month: "short", day: "numeric", year: "numeric",
    hour: "2-digit", minute: "2-digit", timeZone: "Asia/Kolkata",
  });

  return (
    <Html>
      <Head>
        <Font fontFamily="Helvetica Neue" fallbackFontFamily="Arial" webFont={undefined} fontWeight={400} fontStyle="normal" />
      </Head>
      <Body style={{ backgroundColor: "#f4f6f8", padding: "20px", margin: 0 }}>
        <Container style={{ maxWidth: "600px", margin: "0 auto", backgroundColor: "#ffffff", borderRadius: "10px", border: "1px solid #e2e8f0", overflow: "hidden" }}>

          {/* ── Header ── */}
          <Section style={{ backgroundColor: "#31366d", padding: "24px" }}>
            <Row>
              <Column style={{ width: "48px", verticalAlign: "middle" }}>
                <Img src="https://biometrics-ui-project-nextjs.vercel.app/mail.png" width="36" height="36" alt="mail" style={{ display: "block" }} />
              </Column>
              <Column style={{ verticalAlign: "middle", paddingLeft: "12px" }}>
                <Text style={{ margin: 0, color: "#ffffff", fontSize: "20px", fontWeight: "bold" }}>
                  {emailContent.headerTitle}
                </Text>
                <Text style={{ margin: 0, color: "#c7cbe8", fontSize: "13px" }}>Sukshmadarshini™</Text>
              </Column>
            </Row>
          </Section>

          {/* ── Body ── */}
          <Section style={{ padding: "28px 25px 4px 25px", color: "#333333" }}>
            <Text style={{ fontSize: "15px", margin: "0 0 6px 0" }}>
              Hi <strong>{name}</strong>,
            </Text>
            <Text style={{ fontSize: "14px", margin: "0 0 20px 0", lineHeight: "1.6" }}>
              {emailContent.bodyText}
            </Text>

            <Text style={{ fontWeight: "bold", fontSize: "13px", color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.05em", margin: "0 0 8px 0" }}>
              Your Submission
            </Text>
            <Section style={{ border: "1px solid #e2e8f0", borderRadius: "8px", overflow: "hidden", fontSize: "14px", marginBottom: "20px" }}>
              <Row style={{ backgroundColor: "#f9fafb", borderBottom: "1px solid #e2e8f0" }}>
                <Column style={{ padding: "10px 14px", fontWeight: "bold", width: "130px", color: "#374151" }}>Name</Column>
                <Column style={{ padding: "10px 14px", color: "#111827" }}>{name}</Column>
              </Row>
              <Row style={{ borderBottom: "1px solid #e2e8f0" }}>
                <Column style={{ padding: "10px 14px", fontWeight: "bold", width: "130px", color: "#374151" }}>Email</Column>
                <Column style={{ padding: "10px 14px", color: "#111827" }}>{email}</Column>
              </Row>
              <Row style={{ borderBottom: "1px solid #e2e8f0" }}>
                <Column style={{ padding: "10px 14px", fontWeight: "bold", width: "130px", color: "#374151" }}>Subject</Column>
                <Column style={{ padding: "10px 14px", color: "#111827" }}>{subject}</Column>
              </Row>
              <Row>
                <Column style={{ padding: "10px 14px", fontWeight: "bold", width: "130px", color: "#374151" }}>Submitted At</Column>
                <Column style={{ padding: "10px 14px", color: "#6b7280", fontSize: "13px" }}>{submittedAt} IST</Column>
              </Row>
            </Section>

            <Text style={{ fontWeight: "bold", margin: "0 0 8px 0", fontSize: "14px" }}>Your Message:</Text>
            <Section style={{ backgroundColor: "#f1f5f9", padding: "14px 16px", borderRadius: "8px", fontSize: "14px", lineHeight: "1.6", color: "#374151", marginBottom: "24px" }}>
              <Text style={{ margin: 0, whiteSpace: "pre-line" }}>{message}</Text>
            </Section>

            <Section style={{ backgroundColor: "#eef0f9", borderLeft: "4px solid #31366d", borderRadius: "6px", padding: "12px 16px", marginBottom: "20px" }}>
              <Text style={{ margin: 0, fontSize: "14px", fontWeight: "bold", color: "#31366d" }}>{emailContent.nextStepsTitle}</Text>
              <Text style={{ margin: "8px 0 4px 0", fontSize: "13px", color: "#374151" }}>{emailContent.step1}</Text>
              <Text style={{ margin: "0 0 4px 0", fontSize: "13px", color: "#374151" }}>{emailContent.step2}</Text>
              <Text style={{ margin: 0, fontSize: "13px", color: "#374151" }}>📧 You&apos;ll receive a reply directly to <strong>{email}</strong>.</Text>
            </Section>

            <Text style={{ fontSize: "14px", lineHeight: "1.7", margin: "0 0 4px 0" }}>
              {emailContent.signOff}
            </Text>
            <Text style={{ fontSize: "14px", lineHeight: "1.7", margin: "0 0 24px 0" }}>
              Warm regards,<br /><strong>Team Sukshmadarshini</strong>
            </Text>
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