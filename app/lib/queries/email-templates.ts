// lib/queries/email-templates.ts

import { sanity } from "@/app/lib/sanity"; // adjust import to your sanity client path

// ─── Types ────────────────────────────────────────────────────────────────────

export interface EmailSection {
  key: string;
  label: string;
  content: string;
}

export interface EmailTemplate {
  templateKey: string;
  templateName: string;
  sections: EmailSection[];
}

/** A flat key→content map, easier to destructure in components */
export type EmailContent = Record<string, string>;

// ─── GROQ query ───────────────────────────────────────────────────────────────

const EMAIL_TEMPLATE_QUERY = `
  *[_type == "emailTemplate" && templateKey == $templateKey][0]{
    templateKey,
    templateName,
    sections[]{
      key,
      label,
      content
    }
  }
`;

// ─── Fetch helper ─────────────────────────────────────────────────────────────

/**
 * Fetches an email template from Sanity by templateKey and returns a flat
 * key→content map ready for use inside email components.
 *
 * Always falls back to hardcoded defaults if Sanity is unreachable or the
 * template/section is missing, so emails never break in production.
 *
 * @example
 * const t = await getEmailContent("blogApproved");
 * // t.headerTitle  → "Your Blog Is Live"
 * // t.ctaLabel     → "View Published Blog"
 */
export async function getEmailContent(
  templateKey: string,
  fallbacks: EmailContent = {}
): Promise<EmailContent> {
  try {
    const template = await sanity.fetch<EmailTemplate | null>(
      EMAIL_TEMPLATE_QUERY,
      { templateKey },
      { cache: "no-store" } // always fetch fresh — email content must never be stale
    );

    if (!template) {
      console.warn(`[email-templates] No Sanity doc found for key: ${templateKey}. Using fallbacks.`);
      return fallbacks;
    }

    const contentMap: EmailContent = { ...fallbacks };
    for (const section of template.sections ?? []) {
      if (section.key && section.content) {
        contentMap[section.key] = section.content;
      }
    }

    return contentMap;
  } catch (err) {
    console.error(`[email-templates] Failed to fetch template "${templateKey}":`, err);
    return fallbacks;
  }
}

// ─── Batch fetch (optional, for routes that send multiple emails at once) ─────

/**
 * Fetches multiple templates in one go.
 * Returns a map of  templateKey → EmailContent.
 *
 * @example
 * const { blogApproved, blogOwnerReview } = await getEmailContents([
 *   "blogApproved",
 *   "blogOwnerReview",
 * ]);
 */
export async function getEmailContents(
  templateKeys: string[]
): Promise<Record<string, EmailContent>> {
  const entries = await Promise.allSettled(
    templateKeys.map(async (key) => [key, await getEmailContent(key)] as const)
  );

  const result: Record<string, EmailContent> = {};
  for (const entry of entries) {
    if (entry.status === "fulfilled") {
      const [key, content] = entry.value;
      result[key] = content;
    }
  }
  return result;
}