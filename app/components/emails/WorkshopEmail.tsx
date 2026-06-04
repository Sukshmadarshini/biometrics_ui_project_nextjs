// // app/components/emails/WorkshopEmail.tsx

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

// interface WorkshopEmailProps {
//   contactName: string;
//   email: string;
//   instituteName: string;
//   city: string;
//   designation: string;
//   phone: string;
//   workshopTitle: string;
//   workshopId: number;
//   estimatedParticipants: string;
//   message: string;
// }

// export default function WorkshopEmail({
//   contactName,
//   email,
//   instituteName,
//   city,
//   designation,
//   phone,
//   workshopTitle,
//   workshopId,
//   estimatedParticipants,
//   message,
// }: WorkshopEmailProps) {
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
//           {/* Header */}
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
//                 <Text
//                   style={{
//                     margin: 0,
//                     color: "#ffffff",
//                     fontSize: "20px",
//                     fontWeight: "bold",
//                   }}
//                 >
//                   New Workshop Enquiry
//                 </Text>
//                 <Text style={{ margin: 0, color: "#c7cbe8", fontSize: "13px" }}>
//                   Institute / College / University
//                 </Text>
//               </Column>
//             </Row>
//           </Section>

//           {/* Body */}
//           <Section style={{ padding: "25px", color: "#333333" }}>
//             <Text style={{ fontSize: "14px", margin: "0 0 20px 0" }}>
//               A new workshop enquiry has been submitted by an institute representative.
//             </Text>

//             {/* Workshop badge */}
//             <Section
//               style={{
//                 backgroundColor: "#eef0f9",
//                 borderLeft: "4px solid #31366d",
//                 borderRadius: "6px",
//                 padding: "12px 16px",
//                 marginBottom: "20px",
//               }}
//             >
//               <Text style={{ margin: 0, fontSize: "13px", color: "#6b7280" }}>
//                 Enquiry for Workshop
//               </Text>
//               <Text
//                 style={{
//                   margin: "4px 0 0 0",
//                   fontSize: "15px",
//                   fontWeight: "bold",
//                   color: "#31366d",
//                 }}
//               >
//                 {workshopTitle}
//               </Text>
//             </Section>

//             {/* Contact Details Table */}
//             <Text
//               style={{ fontWeight: "bold", margin: "0 0 8px 0", fontSize: "13px", color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.05em" }}
//             >
//               Contact Details
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
//                 <Column style={{ padding: "10px 12px", fontWeight: "bold", width: "160px", color: "#374151" }}>
//                   Contact Person
//                 </Column>
//                 <Column style={{ padding: "10px 12px", color: "#111827" }}>{contactName}</Column>
//               </Row>
//               <Row style={{ borderBottom: "1px solid #e2e8f0" }}>
//                 <Column style={{ padding: "10px 12px", fontWeight: "bold", width: "160px", color: "#374151" }}>
//                   Designation
//                 </Column>
//                 <Column style={{ padding: "10px 12px", color: "#111827" }}>{designation}</Column>
//               </Row>
//               <Row style={{ borderBottom: "1px solid #e2e8f0" }}>
//                 <Column style={{ padding: "10px 12px", fontWeight: "bold", width: "160px", color: "#374151" }}>
//                   Email
//                 </Column>
//                 <Column style={{ padding: "10px 12px", color: "#111827" }}>{email}</Column>
//               </Row>
//               <Row style={{ borderBottom: "1px solid #e2e8f0" }}>
//                 <Column style={{ padding: "10px 12px", fontWeight: "bold", width: "160px", color: "#374151" }}>
//                   Phone
//                 </Column>
//                 <Column style={{ padding: "10px 12px", color: "#111827" }}>{phone}</Column>
//               </Row>
//             </Section>

//             {/* Institute Details Table */}
//             <Text
//               style={{ fontWeight: "bold", margin: "0 0 8px 0", fontSize: "13px", color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.05em" }}
//             >
//               Institute Details
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
//                 <Column style={{ padding: "10px 12px", fontWeight: "bold", width: "160px", color: "#374151" }}>
//                   Institute Name
//                 </Column>
//                 <Column style={{ padding: "10px 12px", color: "#111827" }}>{instituteName}</Column>
//               </Row>
//               <Row style={{ backgroundColor: "#f9fafb", borderBottom: "1px solid #e2e8f0" }}>
//                 <Column style={{ padding: "10px 12px", fontWeight: "bold", width: "160px", color: "#374151" }}>
//                   City Name
//                 </Column>
//                 <Column style={{ padding: "10px 12px", color: "#111827" }}>{city}</Column>
//               </Row>
//               <Row>
//                 <Column style={{ padding: "10px 12px", fontWeight: "bold", width: "160px", color: "#374151" }}>
//                   Est. Participants
//                 </Column>
//                 <Column style={{ padding: "10px 12px", color: "#111827" }}>{estimatedParticipants}</Column>
//               </Row>
//             </Section>

//             {/* Message */}
//             <Text style={{ fontWeight: "bold", margin: "0 0 8px 0", fontSize: "14px" }}>
//               Message / Additional Notes:
//             </Text>
//             <Section
//               style={{
//                 backgroundColor: "#f1f5f9",
//                 padding: "15px",
//                 borderRadius: "8px",
//                 fontSize: "14px",
//                 lineHeight: "1.6",
//                 color: "#333333",
//               }}
//             >
//               <Text style={{ margin: 0, whiteSpace: "pre-line" }}>{message}</Text>
//             </Section>
//           </Section>

//           {/* Footer */}
//           <Hr style={{ borderColor: "#e2e8f0", margin: 0 }} />
//           <Section
//             style={{
//               backgroundColor: "#f9fafb",
//               padding: "15px",
//               textAlign: "center",
//             }}
//           >
//             <Text style={{ fontSize: "12px", color: "#6b7280", margin: 0 }}>
//               This enquiry was submitted via the Sukshmadarshini workshop booking form.
//             </Text>
//           </Section>
//         </Container>
//       </Body>
//     </Html>
//   );
// }

// app/components/emails/WorkshopEmail.tsx
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

interface WorkshopEmailProps {
  contactName:           string;
  email:                 string;
  instituteName:         string;
  city:                  string;
  designation:           string;
  phone:                 string;
  workshopTitle:         string;
  workshopId:            number;
  estimatedParticipants: string;
  message:               string;
  emailContent:          EmailContent;
}

export default function WorkshopEmail({
  contactName,
  email,
  instituteName,
  city,
  designation,
  phone,
  workshopTitle,
  workshopId,
  estimatedParticipants,
  message,
  emailContent,
}: WorkshopEmailProps) {
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
          {/* Header */}
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

          {/* Body */}
          <Section style={{ padding: "25px", color: "#333333" }}>
            <Text style={{ fontSize: "14px", margin: "0 0 20px 0" }}>
              {emailContent.bodyText}
            </Text>

            {/* Workshop badge */}
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
                Enquiry for Workshop
              </Text>
              <Text style={{ margin: "4px 0 0 0", fontSize: "15px", fontWeight: "bold", color: "#31366d" }}>
                {workshopTitle}
              </Text>
            </Section>

            {/* Contact Details Table */}
            <Text style={{ fontWeight: "bold", margin: "0 0 8px 0", fontSize: "13px", color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Contact Details
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
                <Column style={{ padding: "10px 12px", fontWeight: "bold", width: "160px", color: "#374151" }}>Contact Person</Column>
                <Column style={{ padding: "10px 12px", color: "#111827" }}>{contactName}</Column>
              </Row>
              <Row style={{ borderBottom: "1px solid #e2e8f0" }}>
                <Column style={{ padding: "10px 12px", fontWeight: "bold", width: "160px", color: "#374151" }}>Designation</Column>
                <Column style={{ padding: "10px 12px", color: "#111827" }}>{designation}</Column>
              </Row>
              <Row style={{ borderBottom: "1px solid #e2e8f0" }}>
                <Column style={{ padding: "10px 12px", fontWeight: "bold", width: "160px", color: "#374151" }}>Email</Column>
                <Column style={{ padding: "10px 12px", color: "#111827" }}>{email}</Column>
              </Row>
              <Row style={{ borderBottom: "1px solid #e2e8f0" }}>
                <Column style={{ padding: "10px 12px", fontWeight: "bold", width: "160px", color: "#374151" }}>Phone</Column>
                <Column style={{ padding: "10px 12px", color: "#111827" }}>{phone}</Column>
              </Row>
            </Section>

            {/* Institute Details Table */}
            <Text style={{ fontWeight: "bold", margin: "0 0 8px 0", fontSize: "13px", color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Institute Details
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
                <Column style={{ padding: "10px 12px", fontWeight: "bold", width: "160px", color: "#374151" }}>Institute Name</Column>
                <Column style={{ padding: "10px 12px", color: "#111827" }}>{instituteName}</Column>
              </Row>
              <Row style={{ backgroundColor: "#f9fafb", borderBottom: "1px solid #e2e8f0" }}>
                <Column style={{ padding: "10px 12px", fontWeight: "bold", width: "160px", color: "#374151" }}>City Name</Column>
                <Column style={{ padding: "10px 12px", color: "#111827" }}>{city}</Column>
              </Row>
              <Row>
                <Column style={{ padding: "10px 12px", fontWeight: "bold", width: "160px", color: "#374151" }}>Est. Participants</Column>
                <Column style={{ padding: "10px 12px", color: "#111827" }}>{estimatedParticipants}</Column>
              </Row>
            </Section>

            {/* Message */}
            <Text style={{ fontWeight: "bold", margin: "0 0 8px 0", fontSize: "14px" }}>
              Message / Additional Notes:
            </Text>
            <Section
              style={{
                backgroundColor: "#f1f5f9",
                padding: "15px",
                borderRadius: "8px",
                fontSize: "14px",
                lineHeight: "1.6",
                color: "#333333",
              }}
            >
              <Text style={{ margin: 0, whiteSpace: "pre-line" }}>{message}</Text>
            </Section>
          </Section>

          {/* Footer */}
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