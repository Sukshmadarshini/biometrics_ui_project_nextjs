import { promises as dns } from "dns";

/* -------------------------------------------------------------------------- */
/*                               DOMAIN LISTS                                 */
/* -------------------------------------------------------------------------- */

export const DISPOSABLE_DOMAINS = new Set([
  "mailinator.com","guerrillamail.com","tempmail.com","throwam.com",
  "yopmail.com","sharklasers.com","guerrillamailblock.com","grr.la",
  "guerrillamail.info","guerrillamail.biz","guerrillamail.de",
  "guerrillamail.net","guerrillamail.org","spam4.me","trashmail.com",
  "trashmail.me","trashmail.at","dispostable.com","maildrop.cc",
  "fakeinbox.com","spamgourmet.com","mailnull.com","10minutemail.com",
  "10minutemail.net","tempr.email","discard.email","spamex.com",
  "mytemp.email","temp-mail.org","tempinbox.com","throwaway.email",
  "wegwerfmail.de","owlpic.com","getnada.com","minitts.net","solarnyx.com",
]);

export const KNOWN_GOOD_DOMAINS = new Set([
  // Global
  "gmail.com","googlemail.com",
  "yahoo.com","yahoo.in","ymail.com",
  "outlook.com","hotmail.com","live.com","msn.com",
  "icloud.com","me.com","mac.com",
  "protonmail.com","proton.me",
  "aol.com",
  "zoho.com",
  "mail.com",
  // German providers
  "gmx.de","gmx.com",
  "web.de",
  "t-online.de",
  "freenet.de",
  "arcor.de",
  "posteo.de",
  "tutanota.com",
  // Indian providers
  "rediffmail.com",
]);

const GIBBERISH_DOMAIN_PATTERNS = [
  // REMOVED /^[^aeiou]{2,}\.[a-z]{2,}$/i — was a false positive for gmx.de, web.de, etc.
  /^(.)\1{2,}\.[a-z]{2,}$/i,
  /^(foo|bar|baz|qux|test|fake|dummy|example|sample|blah|asdf|xyz|abc)\.[a-z]{2,}$/i,
];

const PARKING_NAMESERVERS = [
  "cashparking.com","parkingcrew.net","sedoparking.com","bodis.com",
  "parklogic.com","above.com","domainsponsor.com","parkingpage.net",
  "uniregistry.com","undeveloped.com","dan.com","afternic.com",
  "hugedomains.com","namecheapparking.com","godaddyparking.com",
  "smartname.com","premiumdrop.net","skenzo.com","trafficz.com",
];

/* -------------------------------------------------------------------------- */
/*                                  CACHE                                     */
/* -------------------------------------------------------------------------- */

const cache = new Map<string, { valid: boolean; reason?: string }>();

/* -------------------------------------------------------------------------- */
/*                              DNS VALIDATION                                */
/* -------------------------------------------------------------------------- */

async function checkMx(domain: string): Promise<"valid" | "nomx" | "parked" | "unknown"> {
  try {
    const mx = await dns.resolveMx(domain);
    if (!mx || mx.length === 0) return "nomx";

    const topMx = mx.sort((a, b) => a.priority - b.priority)[0].exchange;

    try {
      const addresses = await dns.resolve4(topMx);
      if (!addresses || addresses.length === 0) return "parked";
      return "valid";
    } catch (err: any) {
      if (err.code === "ENODATA" || err.code === "ENOTFOUND") return "parked";
      return "unknown";
    }
  } catch (err: any) {
    if (["ENODATA", "ENOTFOUND", "ESERVFAIL"].includes(err.code)) return "nomx";
    return "unknown";
  }
}

async function isParked(domain: string) {
  try {
    const ns = await dns.resolveNs(domain);
    return ns.some((server) =>
      PARKING_NAMESERVERS.some((parking) =>
        server.toLowerCase().includes(parking)
      )
    );
  } catch {
    return false;
  }
}

/* -------------------------------------------------------------------------- */
/*                              MAIN VALIDATOR                                */
/* -------------------------------------------------------------------------- */

export async function validateEmail(email: string) {

  const normalized = email.trim().toLowerCase();

  if (cache.has(normalized)) return cache.get(normalized)!;

  /* Format check */
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(normalized)) {
    const result = { valid: false, reason: "Please use a valid email address." };
    cache.set(normalized, result);
    return result;
  }

  const [local, domain] = normalized.split("@");

  /* Disposable domain */
  if (DISPOSABLE_DOMAINS.has(domain)) {
    const result = { valid: false, reason: "Temporary emails are not allowed." };
    cache.set(normalized, result);
    return result;
  }

  /* Fake local parts */
  const fakePatterns = [
    // /^(test|fake|asdf|qwerty|noreply|no-reply|donotreply|spam|trash|throwaway|temp)\d*$/i,
    /^(.)\1{4,}$/,
    /^\d+$/,
  ];
  for (const pattern of fakePatterns) {
    if (pattern.test(local)) {
      const result = { valid: false, reason: "Please use a real email address." };
      cache.set(normalized, result);
      return result;
    }
  }

  /* Trusted domains — skip DNS entirely */
  if (KNOWN_GOOD_DOMAINS.has(domain)) {
    const result = { valid: true };
    cache.set(normalized, result);
    return result;
  }

  /* Gibberish domain */
  for (const pattern of GIBBERISH_DOMAIN_PATTERNS) {
    if (pattern.test(domain)) {
      const result = { valid: false, reason: "This email domain doesn't look real." };
      cache.set(normalized, result);
      return result;
    }
  }

  /* MX check */
  const mx = await checkMx(domain);

  if (mx === "nomx") {
    const result = { valid: false, reason: "This email domain can't receive emails." };
    cache.set(normalized, result);
    return result;
  }

  if (mx === "parked") {
    const parked = await isParked(domain);
    const result = {
      valid: false,
      reason: parked
        ? "This domain appears parked."
        : "This email domain cannot receive emails.",
    };
    cache.set(normalized, result);
    return result;
  }

  if (mx === "unknown") {
    console.warn(`DNS lookup failed for ${domain} — failing open`);
    return { valid: true };
  }

  const result = { valid: true };
  cache.set(normalized, result);
  return result;
}