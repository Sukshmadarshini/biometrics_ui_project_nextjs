// // // lib/queries/email-templates.ts

// // import { sanity } from "@/app/lib/sanity"; // adjust import to your sanity client path

// // // ─── Types ────────────────────────────────────────────────────────────────────

// // export interface EmailSection {
// //   key: string;
// //   label: string;
// //   content: string;
// // }

// // export interface EmailTemplate {
// //   templateKey: string;
// //   templateName: string;
// //   sections: EmailSection[];
// // }

// // /** A flat key→content map, easier to destructure in components */
// // export type EmailContent = Record<string, string>;

// // // ─── GROQ query ───────────────────────────────────────────────────────────────

// // const EMAIL_TEMPLATE_QUERY = `
// //   *[_type == "emailTemplate" && templateKey == $templateKey][0]{
// //     templateKey,
// //     templateName,
// //     sections[]{
// //       key,
// //       label,
// //       content
// //     }
// //   }
// // `;

// // // ─── Fetch helper ─────────────────────────────────────────────────────────────

// // /**
// //  * Fetches an email template from Sanity by templateKey and returns a flat
// //  * key→content map ready for use inside email components.
// //  *
// //  * Always falls back to hardcoded defaults if Sanity is unreachable or the
// //  * template/section is missing, so emails never break in production.
// //  *
// //  * @example
// //  * const t = await getEmailContent("blogApproved");
// //  * // t.headerTitle  → "Your Blog Is Live"
// //  * // t.ctaLabel     → "View Published Blog"
// //  */
// // export async function getEmailContent(
// //   templateKey: string,
// //   fallbacks: EmailContent = {}
// // ): Promise<EmailContent> {
// //   try {
// //     const template = await sanity.fetch<EmailTemplate | null>(
// //       EMAIL_TEMPLATE_QUERY,
// //       { templateKey },
// //       { cache: "no-store" } // always fetch fresh — email content must never be stale
// //     );

// //     console.log(`[email-templates] fetched "${templateKey}":`, JSON.stringify(template)); 

// //     if (!template) {
// //       console.warn(`[email-templates] No Sanity doc found for key: ${templateKey}. Using fallbacks.`);
// //       return fallbacks;
// //     }

// //     const contentMap: EmailContent = { ...fallbacks };
// //     for (const section of template.sections ?? []) {
// //       if (section.key && section.content) {
// //         contentMap[section.key] = section.content;
// //       }
// //     }

// //     return contentMap;
// //   } catch (err) {
// //     console.error(`[email-templates] Failed to fetch template "${templateKey}":`, err);
// //     return fallbacks;
// //   }
// // }

// // // ─── Batch fetch (optional, for routes that send multiple emails at once) ─────

// // /**
// //  * Fetches multiple templates in one go.
// //  * Returns a map of  templateKey → EmailContent.
// //  *
// //  * @example
// //  * const { blogApproved, blogOwnerReview } = await getEmailContents([
// //  *   "blogApproved",
// //  *   "blogOwnerReview",
// //  * ]);
// //  */
// // export async function getEmailContents(
// //   templateKeys: string[]
// // ): Promise<Record<string, EmailContent>> {
// //   const entries = await Promise.allSettled(
// //     templateKeys.map(async (key) => [key, await getEmailContent(key)] as const)
// //   );

// //   const result: Record<string, EmailContent> = {};
// //   for (const entry of entries) {
// //     if (entry.status === "fulfilled") {
// //       const [key, content] = entry.value;
// //       result[key] = content;
// //     }
// //   }
// //   return result;
// // }

// // lib/queries/email-templates.ts

// import { sanity } from "@/app/lib/sanity";

// // ─── Types ────────────────────────────────────────────────────────────────────

// export interface EmailSection {
//   key: string;
//   label: string;
//   content: string;
// }

// export interface EmailTemplate {
//   templateKey: string;
//   templateName: string;
//   sections: EmailSection[];
// }

// /** A flat key→content map, easier to destructure in components */
// export type EmailContent = Record<string, string>;

// // ─── Raw Sanity fetch — bypasses Next.js fetch cache entirely ─────────────────
// // sanity.fetch() wraps fetch internally and ignores the cache option we pass.
// // Instead we read the project config from the existing sanity client instance
// // and call the Sanity HTTP API directly using native fetch() with no-store,
// // which Next.js actually respects.

// async function fetchFromSanityRaw<T>(query: string): Promise<T | null> {
//   // Read config from the already-configured sanity client — avoids duplicating env vars
//   const config    = sanity.config();
//   const projectId = config.projectId;
//   const dataset   = config.dataset ?? "production";
//   const apiVersion = "2024-01-01";

//   if (!projectId) {
//     throw new Error("[email-templates] Sanity projectId is not configured on the sanity client.");
//   }

//   const url = `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}?query=${encodeURIComponent(query)}`;

//   console.log(`[email-templates] raw fetch URL: ${url}`);

//   const res = await fetch(url, {
//     cache: "no-store",
//     headers: { "Content-Type": "application/json" },
//   });

//   if (!res.ok) {
//     const body = await res.text().catch(() => "");
//     throw new Error(`Sanity raw fetch failed: ${res.status} ${res.statusText} — ${body}`);
//   }

//   const json = await res.json();
//   return (json.result as T) ?? null;
// }

// // ─── Fetch helper ─────────────────────────────────────────────────────────────

// /**
//  * Fetches an email template from Sanity by templateKey and returns a flat
//  * key→content map ready for use inside email components.
//  *
//  * Uses native fetch() with cache: "no-store" so Next.js never caches it.
//  * Reads project config from the existing sanity client instance.
//  *
//  * Always falls back to hardcoded defaults if Sanity is unreachable or the
//  * template/section is missing, so emails never break in production.
//  */
// export async function getEmailContent(
//   templateKey: string,
//   fallbacks: EmailContent = {}
// ): Promise<EmailContent> {
//   try {
//     const query    = `*[_type == "emailTemplate" && templateKey == "${templateKey}"][0]{templateKey,templateName,sections[]{key,label,content}}`;
//     const template = await fetchFromSanityRaw<EmailTemplate>(query);

//     console.log(`[email-templates] fetched "${templateKey}":`, JSON.stringify(template));

//     if (!template) {
//       console.warn(`[email-templates] No Sanity doc found for key: "${templateKey}". Using fallbacks.`);
//       return fallbacks;
//     }

//     const contentMap: EmailContent = { ...fallbacks };
//     for (const section of template.sections ?? []) {
//       if (section.key && section.content) {
//         contentMap[section.key] = section.content;
//       }
//     }

//     return contentMap;
//   } catch (err) {
//     console.error(`[email-templates] Failed to fetch template "${templateKey}":`, err);
//     return fallbacks;
//   }
// }

// // ─── Batch fetch ──────────────────────────────────────────────────────────────

// /**
//  * Fetches multiple templates in one go.
//  * Returns a map of templateKey → EmailContent.
//  *
//  * @example
//  * const { blogApproved, blogOwnerReview } = await getEmailContents([
//  *   "blogApproved",
//  *   "blogOwnerReview",
//  * ]);
//  */
// export async function getEmailContents(
//   templateKeys: string[]
// ): Promise<Record<string, EmailContent>> {
//   const entries = await Promise.allSettled(
//     templateKeys.map(async (key) => [key, await getEmailContent(key)] as const)
//   );

//   const result: Record<string, EmailContent> = {};
//   for (const entry of entries) {
//     if (entry.status === "fulfilled") {
//       const [key, content] = entry.value;
//       result[key] = content;
//     }
//   }
//   return result;
// }


// lib/queries/email-templates.ts

// NOTE: No sanity client import needed — we use the raw HTTP API directly
// to guarantee cache: "no-store" is actually respected by Next.js/Vercel.

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

// ─── Raw Sanity fetch ─────────────────────────────────────────────────────────
// Uses the Sanity HTTP API directly with native fetch() so cache: "no-store"
// is fully respected. sanity.config() is unreliable in Vercel serverless —
// reading env vars directly is the safest approach.

async function fetchFromSanityRaw<T>(query: string): Promise<T | null> {
  const projectId  = process.env.SANITY_PROJECT_ID;
  const dataset    = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
  const apiVersion = "2024-01-01";
  // Use write token if available, else read token, else unauthenticated
  const token =
    process.env.SANITY_API_TOKEN ??
    process.env.SANITY_API_READ_TOKEN ??
    null;

  if (!projectId) {
    throw new Error(
      "[email-templates] NEXT_PUBLIC_SANITY_PROJECT_ID is not set. " +
      "Add it to your Vercel environment variables."
    );
  }

  const url = [
    `https://${projectId}.api.sanity.io`,
    `/v${apiVersion}/data/query/${dataset}`,
    `?query=${encodeURIComponent(query)}`,
  ].join("");

  console.log(`[email-templates] projectId=${projectId} dataset=${dataset}`);
  console.log(`[email-templates] raw fetch → ${url}`);

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
    console.log("[email-templates] using auth token");
  } else {
    console.log("[email-templates] no auth token — unauthenticated request");
  }

  const res = await fetch(url, {
    method: "GET",
    cache: "no-store",
    headers,
  });

  console.log(`[email-templates] response status: ${res.status}`);

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(
      `[email-templates] Sanity fetch failed: ${res.status} ${res.statusText} — ${body}`
    );
  }

  const json = await res.json();
  console.log(`[email-templates] raw result: ${JSON.stringify(json.result)}`);
  return (json.result as T) ?? null;
}

// ─── Fetch helper ─────────────────────────────────────────────────────────────

/**
 * Fetches an email template from Sanity by templateKey and returns a flat
 * key→content map ready for use inside email components.
 *
 * Always falls back to hardcoded defaults if Sanity is unreachable or the
 * template/section is missing, so emails never break in production.
 */
export async function getEmailContent(
  templateKey: string,
  fallbacks: EmailContent = {}
): Promise<EmailContent> {
  try {
    const query =
      `*[_type == "emailTemplate" && templateKey == "${templateKey}"][0]` +
      `{templateKey,templateName,sections[]{key,label,content}}`;

    const template = await fetchFromSanityRaw<EmailTemplate>(query);

    if (!template) {
      console.warn(
        `[email-templates] No published doc found for templateKey="${templateKey}". Using fallbacks.`
      );
      return fallbacks;
    }

    const contentMap: EmailContent = { ...fallbacks };
    for (const section of template.sections ?? []) {
      if (section.key && section.content) {
        contentMap[section.key] = section.content;
      }
    }

    console.log(
      `[email-templates] "${templateKey}" loaded ${Object.keys(contentMap).length} keys`
    );
    return contentMap;
  } catch (err) {
    console.error(`[email-templates] Failed to fetch "${templateKey}":`, err);
    return fallbacks;
  }
}

// ─── Batch fetch ──────────────────────────────────────────────────────────────

/**
 * Fetches multiple templates in one go.
 * Returns a map of templateKey → EmailContent.
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