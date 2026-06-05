// // app/components/emails/BlogRejectedEmail.tsx

// import {
//   Html,
//   Head,
//   Body,
//   Container,
//   Section,
//   Text,
//   Hr,
//   Font,
// } from "@react-email/components";

// interface BlogRejectedEmailProps {
//   blogTitle: string;
//   ownerEmail: string;
// }

// export default function BlogRejectedEmail({
//   blogTitle,
//   ownerEmail,
// }: BlogRejectedEmailProps) {
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
//           <Section style={{ backgroundColor: "#dc2626", padding: "24px" }}>
//             <Text
//               style={{
//                 margin: 0,
//                 color: "#ffffff",
//                 fontSize: "22px",
//                 fontWeight: "bold",
//               }}
//             >
//               Submission Update
//             </Text>

//             <Text
//               style={{
//                 margin: "6px 0 0 0",
//                 color: "#fecaca",
//                 fontSize: "13px",
//               }}
//             >
//               Review Completed
//             </Text>
//           </Section>

//           <Section style={{ padding: "28px 25px" }}>
//             <Text
//               style={{
//                 fontSize: "14px",
//                 color: "#374151",
//                 lineHeight: "1.7",
//               }}
//             >
//               Thank you for taking the time to submit a blog post to
//               Sukshmadarshini.
//             </Text>

//             <Text
//               style={{
//                 fontSize: "14px",
//                 color: "#374151",
//                 lineHeight: "1.7",
//               }}
//             >
//               After careful review, we are unable to publish this submission at
//               this time.
//             </Text>

//             <Section
//               style={{
//                 backgroundColor: "#fef2f2",
//                 borderLeft: "4px solid #dc2626",
//                 borderRadius: "6px",
//                 padding: "16px",
//                 marginTop: "20px",
//                 marginBottom: "24px",
//               }}
//             >
//               <Text
//                 style={{
//                   margin: "0 0 6px 0",
//                   fontSize: "12px",
//                   color: "#6b7280",
//                   textTransform: "uppercase",
//                 }}
//               >
//                 Submission
//               </Text>

//               <Text
//                 style={{
//                   margin: 0,
//                   fontSize: "18px",
//                   fontWeight: "bold",
//                   color: "#111827",
//                 }}
//               >
//                 {blogTitle}
//               </Text>
//             </Section>

//             <Section
//               style={{
//                 backgroundColor: "#fffbeb",
//                 border: "1px solid #fde68a",
//                 borderRadius: "8px",
//                 padding: "14px",
//                 marginBottom: "20px",
//               }}
//             >
//               <Text
//                 style={{
//                   margin: 0,
//                   fontSize: "14px",
//                   color: "#92400e",
//                   lineHeight: "1.7",
//                 }}
//               >
//                 This may be due to editorial guidelines, content focus,
//                 formatting requirements, or relevance to our publication goals.
//               </Text>
//             </Section>

//             <Text
//               style={{
//                 fontSize: "14px",
//                 color: "#374151",
//                 lineHeight: "1.7",
//               }}
//             >
//               We encourage you to review our published articles and consider
//               revising and resubmitting your work in the future.
//             </Text>

//             <Text
//               style={{
//                 fontSize: "14px",
//                 color: "#374151",
//                 lineHeight: "1.7",
//               }}
//             >
//               Questions? Contact us at:
//               <br />
//               <strong>{ownerEmail}</strong>
//             </Text>
//           </Section>

//           <Hr style={{ borderColor: "#e2e8f0", margin: 0 }} />

//           <Section
//             style={{
//               backgroundColor: "#f9fafb",
//               padding: "15px",
//               textAlign: "center",
//             }}
//           >
//             <Text
//               style={{
//                 fontSize: "12px",
//                 color: "#6b7280",
//                 margin: 0,
//               }}
//             >
//               Sukshmadarshini™ Blog Review System
//             </Text>
//           </Section>
//         </Container>
//       </Body>
//     </Html>
//   );
// }

// app/components/emails/BlogRejectedEmail.tsx
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Hr,
  Font,
} from "@react-email/components";
import { EmailContent } from "@/app/lib/queries/email-templates";

interface BlogRejectedEmailProps {
  blogTitle:    string;
  ownerEmail:   string;
  emailContent: EmailContent;
}

export default function BlogRejectedEmail({
  blogTitle,
  ownerEmail,
  emailContent,
}: BlogRejectedEmailProps) {
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
          <Section style={{ backgroundColor: "#dc2626", padding: "24px" }}>
            <Text style={{ margin: 0, color: "#ffffff", fontSize: "22px", fontWeight: "bold" }}>
              {emailContent.headerTitle}
            </Text>
            <Text style={{ margin: "6px 0 0 0", color: "#fecaca", fontSize: "13px" }}>
              {emailContent.headerSubtitle}
            </Text>
          </Section>

          <Section style={{ padding: "28px 25px" }}>
            <Text style={{ fontSize: "14px", color: "#374151", lineHeight: "1.7" }}>
              {emailContent.bodyText1}
            </Text>

            <Text style={{ fontSize: "14px", color: "#374151", lineHeight: "1.7" }}>
              {emailContent.bodyText2}
            </Text>

            <Section
              style={{
                backgroundColor: "#fef2f2",
                borderLeft: "4px solid #dc2626",
                borderRadius: "6px",
                padding: "16px",
                marginTop: "20px",
                marginBottom: "24px",
              }}
            >
              <Text style={{ margin: "0 0 6px 0", fontSize: "12px", color: "#6b7280", textTransform: "uppercase" }}>
                Submission
              </Text>
              <Text style={{ margin: 0, fontSize: "18px", fontWeight: "bold", color: "#111827" }}>
                {blogTitle}
              </Text>
            </Section>

            <Section
              style={{
                backgroundColor: "#fffbeb",
                border: "1px solid #fde68a",
                borderRadius: "8px",
                padding: "14px",
                marginBottom: "20px",
              }}
            >
              <Text style={{ margin: 0, fontSize: "14px", color: "#92400e", lineHeight: "1.7" }}>
                {emailContent.reasonNote}
              </Text>
            </Section>

            <Text style={{ fontSize: "14px", color: "#374151", lineHeight: "1.7" }}>
              {emailContent.encouragement}
            </Text>

            <Text style={{ fontSize: "14px", color: "#374151", lineHeight: "1.7" }}>
              {emailContent.contactLine}
              <br />
              <strong>{ownerEmail}</strong>
            </Text>
          </Section>

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