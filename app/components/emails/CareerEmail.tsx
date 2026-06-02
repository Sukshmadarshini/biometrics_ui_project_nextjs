// // app/components/emails/CareerEmail.tsx
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

// interface CareerEmailProps {
//   name:             string;
//   email:            string;
//   position:         string;
//   whyHire:          string;
//   extracurriculars: string;
// }

// export default function CareerEmail({
//   name,
//   email,
//   position,
//   whyHire,
//   extracurriculars,
// }: CareerEmailProps) {
//   const submittedAt = new Date().toLocaleString("en-IN", {
//     weekday:  "short",
//     month:    "short",
//     day:      "numeric",
//     year:     "numeric",
//     hour:     "2-digit",
//     minute:   "2-digit",
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
//       {/* <Body style={{ backgroundColor: "#0c0f1a", padding: "20px", margin: 0 }}>
//         <Container style={{
//             maxWidth: "600px",
//             margin: "0 auto",
//             backgroundColor: "#ffffff",
//             borderRadius: "10px",
//             border: "1px solid #e2e8f0",
//             overflow: "hidden",
//           }}> */}
//           <Body style={{ backgroundColor: "#f4f6f8", padding: "20px", margin: 0 }}>
//                   <Container
//                     style={{
//                       maxWidth: "600px",
//                       margin: "0 auto",
//                       backgroundColor: "#ffffff",
//                       borderRadius: "10px",
//                       border: "1px solid #e2e8f0",
//                       overflow: "hidden",
//                     }}
//                   >

//           {/* ── Top accent bar ── */}
//           <Section style={{ backgroundColor: "#0094ff", height: "4px", borderRadius: "2px 2px 0 0" }} />

//           {/* ── Header ── */}
//           <Section
//             style={{
//               background: "linear-gradient(135deg, #31336a 0%, #3a48bf 50%, #31336a 100%)",
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
//                     color: "#98d0ff",
//                   }}
//                 >
//                   Sukshmadarshini™ · Careers
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
//                   New Job Application
//                 </Text>
//                 <Text style={{ margin: 0, fontSize: "14px", color: "#98d0ff" }}>
//                   A candidate has applied for a position on your website.
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

//             {/* Applicant details table */}
//             <Text style={{ fontSize: "12px", fontWeight: "bold", letterSpacing: "2px", textTransform: "uppercase", color: "#9ca3af", margin: "0 0 12px 0" }}>
//               Applicant Details
//             </Text>
//             <Section
//               style={{
//                 border: "1px solid #e5e7eb",
//                 borderRadius: "10px",
//                 overflow: "hidden",
//                 marginBottom: "28px",
//               }}
//             >
//               {[
//                 { label: "Name",     value: name,     mono: false },
//                 { label: "Email",    value: email,    mono: true  },
//                 { label: "Position", value: position, mono: false },
//                 { label: "Received", value: `${submittedAt} IST`, mono: false },
//               ].map(({ label, value, mono }, i, arr) => (
//                 <Row
//                   key={label}
//                   style={i < arr.length - 1 ? { borderBottom: "1px solid #f3f4f6" } : {}}
//                 >
//                   <Column style={{ padding: "13px 20px", width: "120px", backgroundColor: "#f9fafb" }}>
//                     <Text style={{ margin: 0, fontSize: "11px", fontWeight: "bold", color: "#6b7280", textTransform: "uppercase", letterSpacing: "1px" }}>
//                       {label}
//                     </Text>
//                   </Column>
//                   <Column style={{ padding: "13px 20px" }}>
//                     <Text style={{ margin: 0, fontSize: mono ? "13px" : "14px", color: mono ? "#374151" : "#111827", fontWeight: mono ? "normal" : "bold", fontFamily: mono ? "monospace" : "inherit" }}>
//                       {value}
//                     </Text>
//                   </Column>
//                 </Row>
//               ))}
//             </Section>

//             {/* Why should we hire you */}
//             <Text style={{ fontSize: "12px", fontWeight: "bold", letterSpacing: "2px", textTransform: "uppercase", color: "#9ca3af", margin: "0 0 12px 0" }}>
//               Why Should We Hire Them?
//             </Text>
//             <Section
//               style={{
//                 backgroundColor: "#f8fafc",
//                 border: "1px solid #e5e7eb",
//                 borderLeft: "3px solid #3a48bf",
//                 borderRadius: "0 8px 8px 0",
//                 padding: "20px 22px",
//                 marginBottom: "28px",
//               }}
//             >
//               <Text style={{ margin: 0, fontSize: "14px", lineHeight: "1.8", color: "#374151", whiteSpace: "pre-line" }}>
//                 {whyHire}
//               </Text>
//             </Section>

//             {/* Extracurriculars */}
//             {extracurriculars && (
//               <>
//                 <Text style={{ fontSize: "12px", fontWeight: "bold", letterSpacing: "2px", textTransform: "uppercase", color: "#9ca3af", margin: "0 0 12px 0" }}>
//                   Extracurricular Activities / Links
//                 </Text>
//                 <Section
//                   style={{
//                     backgroundColor: "#f8fafc",
//                     border: "1px solid #e5e7eb",
//                     borderLeft: "3px solid #3a48bf",
//                     borderRadius: "0 8px 8px 0",
//                     padding: "20px 22px",
//                     marginBottom: "28px",
//                   }}
//                 >
//                   <Text style={{ margin: 0, fontSize: "14px", lineHeight: "1.8", color: "#374151", whiteSpace: "pre-line" }}>
//                     {extracurriculars}
//                   </Text>
//                 </Section>
//               </>
//             )}

//             {/* Resume note */}
//             <Section
//               style={{
//                 backgroundColor: "#fefce8",
//                 border: "1px solid #fde68a",
//                 borderRadius: "8px",
//                 padding: "14px 18px",
//                 marginBottom: "32px",
//               }}
//             >
//               <Text style={{ margin: 0, fontSize: "13px", color: "#92400e" }}>
//                 📎 <strong>Resume attached</strong> — see the attachment in this email.
//               </Text>
//             </Section>

//           </Section>

//           {/* ── Footer ── */}
//           <Section style={{ backgroundColor: "#31336a", padding: "20px 32px", borderRadius: "0 0 2px 2px" }}>
//             <Text style={{ fontSize: "11px", color: "#aeb1ff", margin: 0, textAlign: "center", letterSpacing: "0.5px" }}>
//               SUKSHMADARSHINI™ · CAREER APPLICATION
//             </Text>
//           </Section>

//         </Container>
//       </Body>
//     </Html>
//   );
// }

// app/components/emails/CareerEmail.tsx
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

interface CareerEmailProps {
  name:             string;
  email:            string;
  position:         string;
  whyHire:          string;
  extracurriculars: string;
}

export default function CareerEmail({
  name,
  email,
  position,
  whyHire,
  extracurriculars,
}: CareerEmailProps) {
  const submittedAt = new Date().toLocaleString("en-IN", {
    weekday:  "short",
    month:    "short",
    day:      "numeric",
    year:     "numeric",
    hour:     "2-digit",
    minute:   "2-digit",
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
                  New Job Application
                </Text>
                <Text style={{ margin: 0, color: "#c7cbe8", fontSize: "13px" }}>
                  Sukshmadarshini™ · Careers
                </Text>
              </Column>
            </Row>
          </Section>

          {/* ── Body ── */}
          <Section style={{ padding: "28px 25px 4px 25px", color: "#333333" }}>
            <Text style={{ fontSize: "14px", margin: "0 0 20px 0", lineHeight: "1.6" }}>
              A new job application has been submitted via the website. Review the details below and follow up with the applicant.
            </Text>

            {/* Position badge */}
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
                Position Applied For
              </Text>
              <Text style={{ margin: "4px 0 0 0", fontSize: "15px", fontWeight: "bold", color: "#31366d" }}>
                {position}
              </Text>
            </Section>

            {/* Applicant Details */}
            <Text style={{ fontWeight: "bold", fontSize: "13px", color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.05em", margin: "0 0 8px 0" }}>
              Applicant Details
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
                  Name
                </Column>
                <Column style={{ padding: "10px 14px", color: "#111827" }}>
                  {name}
                </Column>
              </Row>
              <Row style={{ borderBottom: "1px solid #e2e8f0" }}>
                <Column style={{ padding: "10px 14px", fontWeight: "bold", width: "140px", color: "#374151" }}>
                  Email
                </Column>
                <Column style={{ padding: "10px 14px", color: "#111827" }}>
                  {email}
                </Column>
              </Row>
              <Row style={{ borderBottom: "1px solid #e2e8f0" }}>
                <Column style={{ padding: "10px 14px", fontWeight: "bold", width: "140px", color: "#374151" }}>
                  Position
                </Column>
                <Column style={{ padding: "10px 14px", color: "#111827" }}>
                  {position}
                </Column>
              </Row>
              <Row>
                <Column style={{ padding: "10px 14px", fontWeight: "bold", width: "140px", color: "#374151" }}>
                  Received
                </Column>
                <Column style={{ padding: "10px 14px", color: "#6b7280", fontSize: "13px" }}>
                  {submittedAt} IST
                </Column>
              </Row>
            </Section>

            {/* Why should we hire you */}
            <Text style={{ fontWeight: "bold", margin: "0 0 8px 0", fontSize: "14px" }}>
              Why Should We Hire Them?
            </Text>
            <Section
              style={{
                backgroundColor: "#f1f5f9",
                padding: "14px 16px",
                borderRadius: "8px",
                fontSize: "14px",
                lineHeight: "1.6",
                color: "#374151",
                marginBottom: "20px",
              }}
            >
              <Text style={{ margin: 0, whiteSpace: "pre-line" }}>{whyHire}</Text>
            </Section>

            {/* Extracurriculars */}
            {extracurriculars && (
              <>
                <Text style={{ fontWeight: "bold", margin: "0 0 8px 0", fontSize: "14px" }}>
                  Extracurricular Activities / Links
                </Text>
                <Section
                  style={{
                    backgroundColor: "#f1f5f9",
                    padding: "14px 16px",
                    borderRadius: "8px",
                    fontSize: "14px",
                    lineHeight: "1.6",
                    color: "#374151",
                    marginBottom: "20px",
                  }}
                >
                  <Text style={{ margin: 0, whiteSpace: "pre-line" }}>{extracurriculars}</Text>
                </Section>
              </>
            )}

            {/* Resume note */}
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
                📎 <strong>Resume attached</strong>: see the attachment in this email.
              </Text>
            </Section>
          </Section>

          {/* ── Footer ── */}
          <Hr style={{ borderColor: "#e2e8f0", margin: 0 }} />
          <Section style={{ backgroundColor: "#f9fafb", padding: "15px", textAlign: "center" }}>
            <Text style={{ fontSize: "12px", color: "#6b7280", margin: 0 }}>
              This application was submitted via the Sukshmadarshini™ Careers page.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}