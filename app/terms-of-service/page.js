export const revalidate = 30;

import TermsOfService from "./TermsOfServiceComponent";
import { getTermsOfService } from "@/app/lib/queries";

export const metadata = {
  title: "Terms of Service | Sukshmadarshini",
  
  description: "Read the terms and conditions governing the use of Sukshmadarshini's website, workshops, consultations, and educational services.",

  openGraph: {
    title: "Terms of Service | Sukshmadarshini",

    description: "Read the terms and conditions governing the use of Sukshmadarshini's website, workshops, consultations, and educational services.",

    url: "https://sukshmadarshini.com/terms-of-service",

    siteName: "Sukshmadarshini",

    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Sukshmadarshini" }],

    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Terms of Service | Sukshmadarshini",
    description: "Terms and conditions for Sukshmadarshini's website, workshops, and consultation services.",
    images: ["/og-image.png"],
  },
  
  robots: { index: true, follow: true },
};

export default async function Page() {
  const data = await getTermsOfService();
  return <TermsOfService data={data} />;
}