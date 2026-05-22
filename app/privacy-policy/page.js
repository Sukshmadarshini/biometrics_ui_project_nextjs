export const revalidate = 30;

import { getPrivacyPolicy } from "@/app/lib/queries";
import PrivacyPolicy from "./PrivacyPolicyComponent";

export const metadata = {
  title: "Privacy Policy | Sukshmadarshini",

  description: "Learn how Sukshmadarshini collects, uses, and protects personal information shared through our website, workshops, and consultation services.",

  openGraph: {
    title: "Privacy Policy | Sukshmadarshini",

    description: "Learn how Sukshmadarshini collects, uses, and protects personal information shared through our website, workshops, and consultation services.",

    url: "https://sukshmadarshini.com/privacy-policy",

    siteName: "Sukshmadarshini",

    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Sukshmadarshini" }],

    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | Sukshmadarshini",
    description: "Learn how Sukshmadarshini collects, uses, and protects personal information.",
    images: ["/og-image.png"],
  },
  
  robots: { index: true, follow: true },
};

export default async function Page() {
  const data = await getPrivacyPolicy();
  return <PrivacyPolicy data={data} />;
}