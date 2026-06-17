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
import { EmailContent } from "@/app/lib/queries/email-templates";

interface ComplementaryLectureEmailProps {
  name: string;
  email: string;
  lectureTitle: string;
  lectureId: string;
  selectedSlot: string;
  time?: string | null;
  mode: string;
  duration: string;
  registrationRef: string;
  emailContent: EmailContent;
}

export default function ComplementaryLectureEmail({
  name,
  lectureTitle,
  selectedSlot,
  mode,
  time,
  duration,
  registrationRef,
  emailContent,
}: ComplementaryLectureEmailProps) {
  const [year, month, day] = selectedSlot.split("T")[0].split("-").map(Number);
  const slotDate = new Date(year, month - 1, day).toLocaleDateString("en-IN", {
    weekday: "long",
    month: "long",
    day: "numeric",
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

            {/* Greeting */}
            <Text style={{ fontSize: "15px", margin: "0 0 6px 0" }}>
              Hi <strong>{name}</strong>,
            </Text>
            <Text style={{ fontSize: "14px", margin: "0 0 20px 0", lineHeight: "1.6" }}>
              {emailContent.bodyText}
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
                {emailContent.freeBadge}
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
                📅 {slotDate}{time ? ` at ${time} IST` : "NA"}
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
                • {emailContent.whatToExpect1}
              </Text>
              <Text style={{ margin: "0 0 6px 0", fontSize: "14px", color: "#374151" }}>
                • {emailContent.whatToExpect2}
              </Text>
              <Text style={{ margin: 0, fontSize: "14px", color: "#374151" }}>
                • {emailContent.whatToExpect3}
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
              {emailContent.footerText} · Ref: {registrationRef}
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}