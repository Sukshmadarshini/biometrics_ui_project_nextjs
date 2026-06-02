// app/components/emails/BlogApprovedEmail.tsx

import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Hr,
  Font,
  Button,
} from "@react-email/components";

interface BlogApprovedEmailProps {
  blogTitle: string;
  blogUrl: string;
}

export default function BlogApprovedEmail({
  blogTitle,
  blogUrl,
}: BlogApprovedEmailProps) {
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
              Your Blog Is Live
            </Text>

            <Text
              style={{
                margin: "6px 0 0 0",
                color: "#d1fae5",
                fontSize: "13px",
              }}
            >
              Approved & Published
            </Text>
          </Section>

          <Section style={{ padding: "28px 25px" }}>
            <Text
              style={{
                fontSize: "15px",
                color: "#111827",
                marginBottom: "14px",
              }}
            >
              Congratulations!
            </Text>

            <Text
              style={{
                fontSize: "14px",
                color: "#374151",
                lineHeight: "1.7",
              }}
            >
              Your blog submission has been reviewed and approved. It is now
              published on the Sukshmadarshini website.
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
              <Text
                style={{
                  margin: "0 0 6px 0",
                  fontSize: "12px",
                  color: "#6b7280",
                  textTransform: "uppercase",
                }}
              >
                Published Post
              </Text>

              <Text
                style={{
                  margin: 0,
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: "#111827",
                }}
              >
                {blogTitle}
              </Text>
            </Section>

            <Button
              href={blogUrl}
              style={{
                backgroundColor: "#15803d",
                color: "#ffffff",
                padding: "12px 24px",
                borderRadius: "8px",
                fontWeight: "bold",
                textDecoration: "none",
              }}
            >
              View Published Blog
            </Button>

            <Text
              style={{
                marginTop: "24px",
                fontSize: "14px",
                color: "#374151",
                lineHeight: "1.7",
              }}
            >
              Thank you for sharing your knowledge and contributing to our
              growing community.
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
              Sukshmadarshini™ Blog Publication System
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
