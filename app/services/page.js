export const revalidate = 30;

import ServicesPage from "./ProvidedServicesComponent";

export const metadata = {
  title: "Agriculture Workshops, Lectures & Scientific Consultations | Sukshmadarshini",

  description:
    "Hands-on workshops, scientific lectures, agriculture training programs, and plant science consultations focused on research-driven agriculture and modern farming solutions.",

  keywords: [
    "Agriculture workshops",
    "Plant science lectures",
    "Scientific farming workshops",
    "Agriculture consultations India",
    "Research-based agriculture training",
    "Plant science education",
    "Precision agriculture workshops",
    "Scientific agriculture programs",
    "Agriculture learning programs",
    "Proteomics workshops",
    "Hands-on agriculture workshops",
    "Experimental design consultation",
    "Agriculture skill development",
    "Science-driven farming education",
  ],

   openGraph: {
    title:
      "Agriculture Workshops, Lectures & Scientific Consultations | Sukshmadarshini",

    description:
      "Hands-on workshops, scientific lectures, agriculture training programs, and plant science consultations.",

    url: "https://sukshmadarshini.com/services",

    siteName: "Sukshmadarshini",

    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sukshmadarshini Services",
      },
    ],

    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Agriculture Workshops, Lectures & Scientific Consultations | Sukshmadarshini",

    description:
      "Scientific workshops, agriculture lectures, and plant science consultation services.",

    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
};



export default function Page() {
  return <ServicesPage />;
}