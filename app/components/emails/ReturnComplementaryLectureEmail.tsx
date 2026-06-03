// app/components/emails/ReturnComplementaryLectureEmail.tsx
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

interface ReturnComplementaryLectureEmailProps {
  name: string;
  email: string;
  lectureTitle: string;
  lectureId: string;
  selectedSlot: string; // ISO datetime string
  mode: string;
  duration: string;
  registrationRef: string;
}

export default function ReturnComplementaryLectureEmail({
  name,
  email,
  lectureTitle,
  selectedSlot,
  mode,
  duration,
  registrationRef,
}: ReturnComplementaryLectureEmailProps) {
  const slotDate = new Date(selectedSlot).toLocaleString("en-IN", {
    weekday: "long",
    month:   "long",
    day:     "numeric",
    hour:    "2-digit",
    minute:  "2-digit",
    timeZone: "Asia/Kolkata",
  });

  const registeredAt = new Date().toLocaleString("en-IN", {
    weekday: "short",
    month:   "short",
    day:     "numeric",
    year:    "numeric",
    hour:    "2-digit",
    minute:  "2-digit",
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
                  New Complementary Lecture Registration
                </Text>
                <Text style={{ margin: 0, color: "#c4b5fd", fontSize: "13px" }}>
                  Sukshmadarshini™ · Internal Notification
                </Text>
              </Column>
            </Row>
          </Section>

          {/* ── Body ── */}
          <Section style={{ padding: "28px 25px 4px 25px", color: "#333333" }}>

            <Text style={{ fontSize: "14px", margin: "0 0 20px 0", lineHeight: "1.6" }}>
              A new attendee has registered for a complementary lecture. No payment is required for this session.
              Review the details below for your records.
            </Text>

            {/* Lecture Badge */}
            <Section
              style={{
                backgroundColor: "#e8eaff",
                borderLeft: "4px solid #31366d",
                borderRadius: "6px",
                padding: "12px 16px",
                marginBottom: "20px",
              }}
            >
              <Text style={{ margin: 0, fontSize: "13px", color: "#6b7280" }}>
                Registered Lecture
              </Text>
              <Text style={{ margin: "4px 0 0 0", fontSize: "15px", fontWeight: "bold", color: "#2d1b45" }}>
                {lectureTitle}
              </Text>
              <Text style={{ margin: "6px 0 0 0", fontSize: "13px", color: "#374151" }}>
                📅 {slotDate} IST
              </Text>
              <Text style={{ margin: "4px 0 0 0", fontSize: "13px", color: "#374151" }}>
                🎙️ Mode: {mode} &nbsp;|&nbsp; ⏱️ Duration: {duration}
              </Text>
            </Section>

            {/* Registrant Details */}
            <Text style={{ fontWeight: "bold", fontSize: "13px", color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.05em", margin: "0 0 8px 0" }}>
              Registrant Details
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
                <Column style={{ padding: "10px 14px", fontWeight: "bold", width: "160px", color: "#374151" }}>
                  Name
                </Column>
                <Column style={{ padding: "10px 14px", color: "#111827" }}>
                  {name}
                </Column>
              </Row>
              <Row style={{ borderBottom: "1px solid #e2e8f0" }}>
                <Column style={{ padding: "10px 14px", fontWeight: "bold", width: "160px", color: "#374151" }}>
                  Email
                </Column>
                <Column style={{ padding: "10px 14px", color: "#111827" }}>
                  {email}
                </Column>
              </Row>
              <Row style={{ borderBottom: "1px solid #e2e8f0" }}>
                <Column style={{ padding: "10px 14px", fontWeight: "bold", width: "160px", color: "#374151" }}>
                  Registration Ref
                </Column>
                <Column style={{ padding: "10px 14px", color: "#111827", fontFamily: "monospace" }}>
                  {registrationRef}
                </Column>
              </Row>
              <Row>
                <Column style={{ padding: "10px 14px", fontWeight: "bold", width: "160px", color: "#374151" }}>
                  Registered At
                </Column>
                <Column style={{ padding: "10px 14px", color: "#6b7280", fontSize: "13px" }}>
                  {registeredAt} IST
                </Column>
              </Row>
            </Section>

            {/* Info Note */}
            <Section
              style={{
                backgroundColor: "#f0fdf4",
                border: "1px solid #bbf7d0",
                padding: "12px 16px",
                borderRadius: "8px",
                marginBottom: "24px",
              }}
            >
              <Text style={{ margin: 0, fontSize: "14px", color: "#166534" }}>
                This is a <strong>free / complementary</strong> session: no payment verification needed.
                Ensure a joining link or venue details are sent to the registrant before the lecture date.
              </Text>
            </Section>

          </Section>

          {/* ── Footer ── */}
          <Hr style={{ borderColor: "#e2e8f0", margin: 0 }} />
          <Section style={{ backgroundColor: "#f9fafb", padding: "15px", textAlign: "center" }}>
            <Text style={{ fontSize: "12px", color: "#6b7280", margin: 0 }}>
              Sukshmadarshini™ Internal Notification · Ref: {registrationRef}
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}