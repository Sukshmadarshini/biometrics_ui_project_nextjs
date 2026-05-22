export const revalidate = 30;

import Careers from "./CareersComponent";
import { getCareersPage } from "@/app/lib/queries";

export const metadata = {
  title: "Careers in Agriculture & Plant Science | Sukshmadarshini",

  description:
    "Explore career opportunities, internships, research programs, and science-driven agriculture initiatives at Sukshmadarshini.",

  keywords: [
    "Agriculture careers India",
    "Plant science internships",
    "Research internships agriculture",
    "Scientific agriculture careers",
    "Agri research opportunities",
    "Plant biology internships",
    "Agriculture startup careers",
    "Research-based agriculture jobs",
  ],

  openGraph: {
    title:
      "Careers in Agriculture & Plant Science | Sukshmadarshini",

    description:
      "Join Sukshmadarshini and contribute to science-driven agriculture, plant science research, and agricultural innovation.",

    url: "https://sukshmadarshini.com/careers",
    siteName: "Sukshmadarshini",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sukshmadarshini Careers",
      },
    ],

    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Careers in Agriculture & Plant Science | Sukshmadarshini",
    description: "Join Sukshmadarshini and contribute to science-driven agriculture, plant science research, and agricultural innovation.",
    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default async function Page() {
  const data = await getCareersPage();
  return <Careers data={data}/>;
}