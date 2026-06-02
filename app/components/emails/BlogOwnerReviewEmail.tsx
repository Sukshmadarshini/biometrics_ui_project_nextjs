// app/components/emails/BlogOwnerReviewEmail.tsx

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
  Button,
} from "@react-email/components";

interface BlogOwnerReviewEmailProps {
  title: string;
  author: string;
  email?: string;
  excerpt: string;
  readTime: string;
  approveUrl: string;
  rejectUrl: string;
  docId: string;
}

export default function BlogOwnerReviewEmail({
  title,
  author,
  email,
  excerpt,
  readTime,
  approveUrl,
  rejectUrl,
  docId,
}: BlogOwnerReviewEmailProps) {
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
            <Text
              style={{
                margin: 0,
                color: "#ffffff",
                fontSize: "22px",
                fontWeight: "bold",
              }}
            >
              New Blog Submission
            </Text>

            <Text
              style={{
                margin: "6px 0 0 0",
                color: "#d1fae5",
                fontSize: "13px",
              }}
            >
              Sukshmadarshini Blog Review
            </Text>
          </Section>

          <Section style={{ padding: "28px 25px" }}>
            <Text style={{ fontSize: "14px", color: "#374151" }}>
              A new blog post has been submitted and is awaiting approval.
            </Text>

            <Section
              style={{
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                overflow: "hidden",
                marginTop: "18px",
                marginBottom: "24px",
              }}
            >
              <Row
                style={{
                  borderBottom: "1px solid #e2e8f0",
                  backgroundColor: "#f9fafb",
                }}
              >
                <Column style={{ padding: "12px", width: "120px" }}>
                  <Text style={{ margin: 0, fontWeight: "bold" }}>
                    Title
                  </Text>
                </Column>
                <Column style={{ padding: "12px" }}>
                  <Text style={{ margin: 0 }}>{title}</Text>
                </Column>
              </Row>

              <Row style={{ borderBottom: "1px solid #e2e8f0" }}>
                <Column style={{ padding: "12px", width: "120px" }}>
                  <Text style={{ margin: 0, fontWeight: "bold" }}>
                    Author
                  </Text>
                </Column>
                <Column style={{ padding: "12px" }}>
                  <Text style={{ margin: 0 }}>{author}</Text>
                </Column>
              </Row>

              {email && (
                <Row style={{ borderBottom: "1px solid #e2e8f0" }}>
                  <Column style={{ padding: "12px", width: "120px" }}>
                    <Text style={{ margin: 0, fontWeight: "bold" }}>
                      Email
                    </Text>
                  </Column>
                  <Column style={{ padding: "12px" }}>
                    <Text style={{ margin: 0 }}>{email}</Text>
                  </Column>
                </Row>
              )}

              <Row>
                <Column style={{ padding: "12px", width: "120px" }}>
                  <Text style={{ margin: 0, fontWeight: "bold" }}>
                    Read Time
                  </Text>
                </Column>
                <Column style={{ padding: "12px" }}>
                  <Text style={{ margin: 0 }}>{readTime}</Text>
                </Column>
              </Row>
            </Section>

            <Text
              style={{
                fontSize: "15px",
                fontWeight: "bold",
                marginBottom: "10px",
              }}
            >
              Excerpt
            </Text>

            <Section
              style={{
                backgroundColor: "#f0fdf4",
                borderLeft: "4px solid #15803d",
                borderRadius: "6px",
                padding: "14px",
                marginBottom: "24px",
              }}
            >
              <Text
                style={{
                  margin: 0,
                  fontSize: "14px",
                  lineHeight: "1.7",
                  color: "#374151",
                }}
              >
                {excerpt}
              </Text>
            </Section>

            <Text
              style={{
                fontSize: "13px",
                color: "#6b7280",
                marginBottom: "18px",
              }}
            >
              Review the full article in Sanity before taking action.
            </Text>

            <Section style={{ marginBottom: "20px" }}>
              <Button
                href={approveUrl}
                style={{
                  backgroundColor: "#15803d",
                  color: "#ffffff",
                  padding: "12px 20px",
                  borderRadius: "8px",
                  fontWeight: "bold",
                  textDecoration: "none",
                  marginRight: "10px",
                }}
              >
                Approve & Publish
              </Button>

              <Button
                href={rejectUrl}
                style={{
                  backgroundColor: "#dc2626",
                  color: "#ffffff",
                  padding: "12px 20px",
                  borderRadius: "8px",
                  fontWeight: "bold",
                  textDecoration: "none",
                }}
              >
                Reject
              </Button>
            </Section>

            <Text
              style={{
                fontSize: "11px",
                color: "#9ca3af",
              }}
            >
              Document ID: {docId}
            </Text>
          </Section>

          <Hr style={{ borderColor: "#e2e8f0", margin: 0 }} />

          <Section
            style={{
              backgroundColor: "#f9fafb",
              padding: "15px",
              textAlign: "center",
            }}
          >
            <Text
              style={{
                fontSize: "12px",
                color: "#6b7280",
                margin: 0,
              }}
            >
              Sukshmadarshini™ Blog Management
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

