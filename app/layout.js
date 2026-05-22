// app/layout.tsx
import "./globals.css"
// import {Navbar} from "./components/Navbar"
import {Footer} from "./components/Footer"
// import { AuthProvider } from "./contexts/AuthContext"
// import type { Metadata } from "next";

export const metadata = {           // no "Metadata" type needed
  metadataBase: new URL("https://sukshmadarshini.com"),
  title: {
    default: "Sukshmadarshini",
    template: "%s | Sukshmadarshini",
  },
  description: "Sukshmadarshini is a science-driven platform focused on agriculture, plant science, proteomics, scientific farming, research collaborations, workshops, and innovative solutions that bridge modern science with real-world agricultural applications.",
  keywords: [
    "Sukshmadarshini",
    "Agriculture consulting India",
    "Plant science consulting",
    "Proteomics consulting",
    "Scientific farming advisory",
    "Precision agriculture India",
    "Plant health diagnostics",
    "Crop stress analysis",
    "Sustainable farming guidance",
    "Research-based agriculture solutions",
  ],
  authors: [{ name: "Sukshmadarshini" }],
  creator: "Sukshmadarshini",
  openGraph: {
    title: "Sukshmadarshini | Scientific Agriculture & Plant Science Consulting",
    description: "Research-backed agriculture consulting, plant diagnostics, proteomics, precision farming, and sustainable agriculture solutions.",
    url: "https://sukshmadarshini.com",
    siteName: "Sukshmadarshini",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Sukshmadarshini" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sukshmadarshini",
    description: "Lectures, workshops, and consultations on Indian knowledge systems.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
}


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* <Navbar />
        {children}
        <Footer /> */}
        {/* <Navbar /> */}
          {/* <AuthProvider> */}
            {children}
          {/* </AuthProvider> */}
        <Footer />
      </body>
    </html>
  )
}
