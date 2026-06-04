export const revalidate = 30;

import Collaborations from "./CollaborationsComponent";
import {getCollaborations, getPastInterns} from "../lib/queries";

export const metadata = {
  title:
    "Agriculture Research & Plant Science Collaborations | Sukshmadarshini",

  description:
    "Collaborate with Sukshmadarshini on agriculture research, plant science, proteomics, scientific farming, agri innovation, workshops, and research-driven agricultural initiatives.",

  keywords: [
    "Agriculture collaborations",
    "Plant science collaboration",
    "Research collaboration India",
    "Agri innovation partnerships",
    "Scientific agriculture partnerships",
    "Proteomics collaboration",
    "Agriculture research consulting",
    "Research-driven agriculture",
    "Agri startup partnerships",
    "Plant research collaboration",
  ],

  openGraph: {
    title:
      "Agriculture Research & Plant Science Collaborations | Sukshmadarshini",

    description:
      "Partnership opportunities in agriculture research, plant science, proteomics, and scientific farming initiatives.",

    url: "https://sukshmadarshini.com/collaborations",

    siteName: "Sukshmadarshini",

    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sukshmadarshini Collaborations",
      },
    ],

    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Agriculture Research & Plant Science Collaborations | Sukshmadarshini",
    description: "Partnership opportunities in agriculture research, plant science, proteomics, and scientific farming initiatives.",
    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
};


export default async function CollaborationsPage() {
  // const collaborations = await getCollaborations();
  // const pastInterns = await getPastInterns();
  const data = await getCollaborations();
  const pastInterns = await getPastInterns();
  // return <Collaborations collaborations={collaborations} pastInterns={pastInterns} />;
  return (
    <Collaborations
      collaborations={data.collaborations ?? []}
      pastInterns={pastInterns}
      badge={data.collaborationsPage?.badge}
      heading={data.collaborationsPage?.heading}
      subheading={data.collaborationsPage?.subheading}
    />
  );
}