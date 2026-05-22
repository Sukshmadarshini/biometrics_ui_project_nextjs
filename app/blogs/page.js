export const revalidate = 30;

import BlogsAndTestimonies from "./BlogsandTestimonies";
import { getBlogs, getTestimonies } from "../lib/queries";

export const metadata = {
  title: "Agriculture and Plant Science Blogs",
  
  description: "Research-backed insights on agriculture, plant science, proteomics, scientific farming, crop diagnostics, and agri innovation.",

  keywords: [
    "Agriculture blogs",
    "Plant science articles",
    "Scientific farming",
    "Agri proteomics",
    "Crop diagnostics",
  ],

  openGraph: {
    title: "Agriculture and Plant Science Blogs | Sukshmadarshini",

    description: "Research-backed insights on agriculture, plant science, proteomics, scientific farming, crop diagnostics, and agri innovation.",

    url: "https://sukshmadarshini.com/blogs",

    siteName: "Sukshmadarshini",

    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Sukshmadarshini Blogs" }],

    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Agriculture and Plant Science Blogs | Sukshmadarshini",
    description: "Research-backed insights on agriculture, plant science, proteomics, and scientific farming.",
    images: ["/og-image.png"],
  },

  robots: { index: true, follow: true },
};

export default async function Page() {
  const [blogs, testimonies] = await Promise.all([getBlogs(), getTestimonies()]);
  return <BlogsAndTestimonies 
  blogs={blogs} testimonies={testimonies} 
  />;
}