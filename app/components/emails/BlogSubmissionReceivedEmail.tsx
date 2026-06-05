// // app/components/emails/BlogSubmissionReceivedEmail.tsx

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

// interface BlogSubmissionReceivedEmailProps {
//   author: string;
//   title: string;
//   readTime: string;
// }

// export default function BlogSubmissionReceivedEmail({
//   author,
//   title,
//   readTime,
// }: BlogSubmissionReceivedEmailProps) {
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
//           <Section style={{ backgroundColor: "#15803d", padding: "24px" }}>
//             <Text
//               style={{
//                 margin: 0,
//                 color: "#ffffff",
//                 fontSize: "22px",
//                 fontWeight: "bold",
//               }}
//             >
//               Submission Received
//             </Text>

//             <Text
//               style={{
//                 margin: "6px 0 0 0",
//                 color: "#d1fae5",
//                 fontSize: "13px",
//               }}
//             >
//               Sukshmadarshini Blog Submission
//             </Text>
//           </Section>

//           <Section style={{ padding: "28px 25px" }}>
//             <Text
//               style={{
//                 fontSize: "15px",
//                 color: "#111827",
//                 marginBottom: "10px",
//               }}
//             >
//               Hi <strong>{author}</strong>,
//             </Text>

//             <Text
//               style={{
//                 fontSize: "14px",
//                 color: "#374151",
//                 lineHeight: "1.7",
//               }}
//             >
//               Thank you for submitting your blog post. We have successfully
//               received it and it is currently under review by our editorial team.
//             </Text>

//             <Section
//               style={{
//                 backgroundColor: "#eefbf3",
//                 borderLeft: "4px solid #15803d",
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
//                 Your Submission
//               </Text>

//               <Text
//                 style={{
//                   margin: 0,
//                   fontSize: "18px",
//                   fontWeight: "bold",
//                   color: "#111827",
//                 }}
//               >
//                 {title}
//               </Text>

//               <Text
//                 style={{
//                   margin: "8px 0 0 0",
//                   fontSize: "13px",
//                   color: "#6b7280",
//                 }}
//               >
//                 {readTime}
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
//                 Status: Pending Review
//                 <br />
//                 Our team typically reviews submissions within 2 to 3 business days.
//                 Please avoid submitting the same article multiple times.
//               </Text>
//             </Section>

//             <Text
//               style={{
//                 fontSize: "14px",
//                 color: "#374151",
//                 lineHeight: "1.7",
//               }}
//             >
//               You will receive another email once a decision has been made.
//             </Text>

//             <Text
//               style={{
//                 fontSize: "14px",
//                 color: "#374151",
//                 lineHeight: "1.7",
//               }}
//             >
//               Thank you for contributing to Sukshmadarshini.
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
//               Sukshmadarshini™ Blog Submission System
//             </Text>
//           </Section>
//         </Container>
//       </Body>
//     </Html>
//   );
// }

// app/components/emails/BlogSubmissionReceivedEmail.tsx
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

interface BlogSubmissionReceivedEmailProps {
  author:       string;
  title:        string;
  readTime:     string;
  emailContent: EmailContent;
}

export default function BlogSubmissionReceivedEmail({
  author,
  title,
  readTime,
  emailContent,
}: BlogSubmissionReceivedEmailProps) {
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
          <Section style={{ backgroundColor: "#15803d", padding: "24px" }}>
            <Text style={{ margin: 0, color: "#ffffff", fontSize: "22px", fontWeight: "bold" }}>
              {emailContent.headerTitle}
            </Text>
            <Text style={{ margin: "6px 0 0 0", color: "#d1fae5", fontSize: "13px" }}>
              {emailContent.headerSubtitle}
            </Text>
          </Section>

          <Section style={{ padding: "28px 25px" }}>
            <Text style={{ fontSize: "15px", color: "#111827", marginBottom: "10px" }}>
              Hi <strong>{author}</strong>,
            </Text>

            <Text style={{ fontSize: "14px", color: "#374151", lineHeight: "1.7" }}>
              {emailContent.bodyText}
            </Text>

            <Section
              style={{
                backgroundColor: "#eefbf3",
                borderLeft: "4px solid #15803d",
                borderRadius: "6px",
                padding: "16px",
                marginTop: "20px",
                marginBottom: "24px",
              }}
            >
              <Text style={{ margin: "0 0 6px 0", fontSize: "12px", color: "#6b7280", textTransform: "uppercase" }}>
                Your Submission
              </Text>
              <Text style={{ margin: 0, fontSize: "18px", fontWeight: "bold", color: "#111827" }}>
                {title}
              </Text>
              <Text style={{ margin: "8px 0 0 0", fontSize: "13px", color: "#6b7280" }}>
                {readTime}
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
              <Text style={{ margin: 0, fontSize: "14px", color: "#92400e", lineHeight: "1.7", whiteSpace: "pre-line" }}>
                {emailContent.statusNote}
              </Text>
            </Section>

            <Text style={{ fontSize: "14px", color: "#374151", lineHeight: "1.7" }}>
              {emailContent.nextStep}
            </Text>

            <Text style={{ fontSize: "14px", color: "#374151", lineHeight: "1.7" }}>
              {emailContent.signOff}
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