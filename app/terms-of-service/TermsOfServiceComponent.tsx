// import { FileText, Shield, UserCheck, AlertCircle, Scale, BookOpen, Globe, RefreshCw, Mail, Eye, AlertTriangle } from "lucide-react";
// import { Navbar } from "../components/Navbar";
// // import { Footer } from "../components/Footer";

// const sections = [
//   {
//     icon: Eye,
//     number: "1",
//     title: "Overview",
//     content: (
//       // <p>These Terms of Service (&quot;Terms&quot;) govern your access to and use of the Sukshmadarshini™ website (sukshmadarshini.com) and all related services. By accessing or using our website, you agree to be bound by these Terms. If you do not agree, please discontinue use immediately.</p>
//       <p>
//         These Terms of Service (&quot;Terms&quot;) outline the conditions governing your access to and use of the Sukshmadarshini™ website (sukshmadarshini.com) and its related services. By accessing or using our website, you acknowledge that you have read, understood, and agree to comply with these Terms. If you do not agree with any part of these Terms, we kindly request that you refrain from using our website and services.
//       </p>
//     ),
//   },
//   {
//     icon: BookOpen,
//     number: "2",
//     title: "Services Offered",
//     content: (
//       <>
//         <p className="mb-3">Sukshmadarshini™ provides:</p>
//         <ul className="space-y-2 ml-2">
//           <li className="flex items-center gap-3">
//             <span className="w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0" />
//             Agri-Proteomics consulting and research advisory
//           </li>
//           <li className="flex items-center gap-3">
//             <span className="w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0" />
//             Biotechnology training programs and workshops
//           </li>
//           <li className="flex items-center gap-3">
//             <span className="w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0" />
//             European research advisory services
//           </li>
//           <li className="flex items-center gap-3">
//             <span className="w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0" />
//             Scientific resources and educational content
//           </li>
//           <li className="flex items-center gap-3">
//             <span className="w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0" />
//             Internship and career opportunities in life sciences
//           </li>
//         </ul>
//         <p className="mt-3 text-primary text-sm font-normal">
//           We strive to keep our services consistent; however, service availability, schedules, or content may occasionally be updated. In such cases, Sukshmadarshini™ will make reasonable efforts to provide prior notice of significant changes whenever possible.
//         </p>
//       </>
//     ),
//   },
//   {
//     icon: UserCheck,
//     number: "3",
//     title: "User Responsibilities",
//     content: (
//       <>
//         <p className="mb-3">By using this website, you agree to:</p>
//         <ul className="space-y-2 ml-2">
//           <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0" />Provide accurate information when submitting forms or inquiries</li>
//           <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0" />Use the website and its content only for lawful purposes</li>
//           <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0" />Not attempt to interfere with the website&apos;s functionality or security</li>
//           <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0" />Not reproduce, distribute, or misrepresent any content without written permission</li>
//         </ul>
//       </>
//     ),
//   },
//   {
//     icon: Shield,
//     number: "4",
//     title: "Intellectual Property",
//     content: (
//       <p>All content on this website, including text, logos, the Sukshmadarshini™ name and brand identity, training materials, and scientific resources, is the intellectual property of Sukshmadarshini™ and is protected by applicable copyright and trademark laws. Unauthorized use, reproduction, or distribution is strictly prohibited.</p>
//     ),
//   },
//   {
//     icon: Scale,
//     number: "5",
//     title: "Limitation of Liability",
//     content: (
//       <>
//         <p className="mb-3">Sukshmadarshini™ strives to provide accurate and up-to-date information; however:</p>
//         <ul className="space-y-2 ml-2">
//           <li className="flex items-start gap-3"><span className="w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0 mt-2" />We do not guarantee that the website will be error-free, uninterrupted, or free from vulnerabilities.</li>
//           <li className="flex items-start gap-3"><span className="w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0 mt-2" />Content is provided &qout;as is&qout; for informational purposes and does not constitute professional or scientific advice.</li>
//           <li className="flex items-start gap-3"><span className="w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0 mt-2" />We shall not be liable for any direct, indirect, or consequential damages arising from the use of this website.</li>
//         </ul>
//       </>
//     ),
//   },
//   {
//     icon: AlertCircle,
//     number: "6",
//     title: "Privacy",
//     content: (
//       <p>Your use of this website is also governed by our <a href="/privacy-policy" className="text-secondary hover:underline font-medium">Privacy Policy</a>, which details how we collect, use, and protect your personal information. We collect only your first name and email address, and we do not sell, rent, or share your data with third parties.</p>
//     ),
//   },
//   {
//     icon: Globe,
//     number: "7",
//     title: "Third-Party Links",
//     content: (
//       <p>Our website does not contain third-party links. All content and resources are hosted directly on sukshmadarshini.com.</p>
//     ),
//   },
//   {
//     icon: RefreshCw,
//     number: "8",
//     title: "Changes to These Terms",
//     content: (
//       <p>We reserve the right to update or modify these Terms of Service at any time. Changes will be effective immediately upon being posted on this page with an updated effective date. Continued use of the website constitutes acceptance of the revised terms.</p>
//     ),
//   },
//   {
//     icon: AlertTriangle,
//     number: "9",
//     title: "AI-Generated Content Disclaimer",
//     content: (
//       <p>Some images on this website are generated using AI tools. Any resemblance to real individuals or events is purely coincidental. We do not claim or imply any real-world association, and we are not liable for unintended similaritiesWe reserve the right to update or modify these Terms of Service at any time. Changes will be effective immediately upon being posted on this page with an updated effective date. Continued use of the website constitutes acceptance of the revised terms.</p>
//     ),
//   },
//   {
//     icon: Mail,
//     number: "10",
//     title: "Contact Us",
//     content: (
//       <p>If you have any questions or concerns about these Terms of Service, please contact us at: <a href="mailto:sukshmadarshini@gmail.com" className="text-secondary hover:underline font-medium">sukshmadarshini@gmail.com</a></p>
//     ),
//   },
// ];

// export default function TermsOfService() {
//   return (
//     <div className="min-h-screen bg-background">
//       <Navbar />

//       {/* Hero Banner */}
//       <section className="relative pt-10 overflow-hidden">
//         <div className="gradient-hero py-16 md:py-24">
//           <div className="container mx-auto px-4 relative z-10">
//             <div className="flex items-center gap-4 mb-4 animate-fade-up">
//               <div className="w-14 h-14 rounded-2xl bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 flex items-center justify-center">
//                 <Scale className="w-7 h-7 text-primary-foreground" />
//               </div>
//               <span className="text-primary-foreground/70 font-medium tracking-wide uppercase text-sm">Legal</span>
//             </div>
//             <h1 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-4 animate-fade-up" style={{ animationDelay: "0.1s" }}>
//               Terms of Service
//             </h1>
//             <p className="text-primary-foreground/80 text-lg max-w-2xl animate-fade-up" style={{ animationDelay: "0.2s" }}>
//               Please review the terms that govern your use of the Sukshmadarshini™ website and services.
//             </p>
//             <div className="flex gap-6 mt-6 text-primary-foreground/60 text-sm animate-fade-up" style={{ animationDelay: "0.3s" }}>
//               <span>Effective Date: March 3, 2026</span>
//               <span>•</span>
//               <span>sukshmadarshini.com</span>
//             </div>
//           </div>
//           <div className="absolute inset-0 dna-pattern opacity-30" />
//         </div>

//         {/* Wave */}
//         <div className="relative h-20 overflow-hidden bg-background -mt-1">
//           <svg className="absolute -top-1 w-full" viewBox="0 0 1440 80" preserveAspectRatio="none" fill="none">
//             <path d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,50 1440,40 L1440,0 L0,0 Z" fill="url(#tosWave)" />
//             <defs>
//               <linearGradient id="tosWave" x1="0%" y1="0%" x2="100%" y2="0%">
//                 <stop offset="0%" stopColor="hsl(var(--init))" />
//                 <stop offset="50%" stopColor="hsl(var(--secondary))" />
//                 <stop offset="100%" stopColor="hsl(var(--accent))" />
//               </linearGradient>
//             </defs>
//           </svg>
//         </div>
//       </section>

//       {/* Content */}
//       <section className="container mx-auto px-4 max-w-4xl pb-24">
//         <div className="space-y-6">
//           {sections.map((section, index) => (
//             <div
//               key={section.number}
//               className="glass-card rounded-2xl p-6 md:p-8 shadow-soft hover:shadow-glow transition-all duration-300 animate-fade-up"
//               style={{ animationDelay: `${index * 0.05}s` }}
//             >
//               <div className="flex items-start gap-4 mb-0">
//                 <div className="w-9 h-9 rounded-xl gradient-accent flex items-center justify-center flex-shrink-0">
//                   <section.icon className="w-5 h-5 text-primary-foreground" />
//                 </div>
//                 <div>
//                   {/* <span className="text-xs text-muted-foreground font-medium tracking-wider uppercase">Section {section.number}</span> */}
//                   <h2 className="font-display text-xl font-semibold text-foreground">{section.title}</h2>
//                 </div>
//               </div>
//               <div className="text-foreground/80 leading-relaxed pl-14">
//                 {section.content}
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* <Footer /> */}
//     </div>
//   );
// }

import { FileText, Shield, UserCheck, AlertCircle, Scale, BookOpen, Globe, RefreshCw, Mail, Eye, AlertTriangle } from "lucide-react";
import { Navbar } from "../components/Navbar";
import Image from "next/image";
// import { Footer } from "../components/Footer";

type TermsOfServiceSection = {
  title?: string;
  description?: string;
  descriptionPoints?: string[];
  icon?: {
    asset?: {
      url?: string;
    };
  };
};

type TermsOfServiceData = {
  SectionIcon?: {
    asset?: {
      url?: string;
    };
  };
  SectionTitle?: string;
  SectionDescription?: string;
  SectionDate?: string;
  SectionTag?: string;
  terms?: TermsOfServiceSection[];
};

export default function TermsOfService({ data }: { data: TermsOfServiceData }) {
  // console.log("TermsOfServiceComponent:", data);
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Banner */}
      <section className="relative pt-10 overflow-hidden">
        <div className="gradient-hero py-16 md:py-24">
          <div className="container mx-auto px-4 relative z-10">
            {/* <div className="flex items-center gap-4 mb-4 animate-fade-up">
              <div className="w-14 h-14 rounded-2xl bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 flex items-center justify-center">
                <Scale className="w-7 h-7 text-primary-foreground" />
              </div>
              <span className="text-primary-foreground/70 font-medium tracking-wide uppercase text-sm">Legal</span>
            </div> */}
            <div className="flex items-center gap-4 mb-4 animate-fade-up">
                            <div className="w-14 h-14 rounded-2xl bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 flex items-center justify-center">
                              {/* <Shield className="w-7 h-7 text-primary-foreground" /> */}
                              {data?.SectionIcon?.asset?.url ? (
                                  <Image
                                    src={data?.SectionIcon.asset.url}
                                    alt="icon"
                                    width={28}
                                    height={28}
                                    className="w-7 h-7 object-contain"
                                  />
                                ) : (
                                  // <Shield className="w-5 h-5 text-primary-foreground" />
                                  null
                                )}
                            </div>
                            <span className="text-primary-foreground/70 font-medium tracking-wide uppercase text-sm">
                              {data?.SectionTag || "Legal"}
                            </span>
                          </div>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-4 animate-fade-up" style={{ animationDelay: "0.1s" }}>
              {data?.SectionTitle || "Privacy Policy"}
            </h1>
            <p className="text-primary-foreground/80 text-lg max-w-2xl animate-fade-up" style={{ animationDelay: "0.2s" }}>
              {data?.SectionDescription ||
                  "Your trust matters to us. Learn how we handle your data."}
            </p>
            <div className="flex gap-6 mt-6 text-primary-foreground/60 text-sm animate-fade-up" style={{ animationDelay: "0.3s" }}>
              <span>
                  Effective Date:{" "}
                  {data?.SectionDate
                    ? new Date(data.SectionDate).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })
                    : "N/A"}
                </span>
              <span>•</span>
              <span>sukshmadarshini.com</span>
            </div>
          </div>
          <div className="absolute inset-0 dna-pattern opacity-30" />
        </div>

        {/* Wave */}
        <div className="relative h-20 overflow-hidden bg-background -mt-1">
          <svg className="absolute -top-1 w-full" viewBox="0 0 1440 80" preserveAspectRatio="none" fill="none">
            <path d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,50 1440,40 L1440,0 L0,0 Z" fill="url(#tosWave)" />
            <defs>
              <linearGradient id="tosWave" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(var(--init))" />
                <stop offset="50%" stopColor="hsl(var(--secondary))" />
                <stop offset="100%" stopColor="hsl(var(--accent))" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </section>

      {/* Content */}
      <section className="container mx-auto px-4 max-w-4xl pb-24">
        <div className="space-y-6">
          {data?.terms?.map((section, index) => (
            <div
              key={index}
              className="glass-card rounded-2xl p-6 md:p-8 shadow-soft hover:shadow-glow transition-all duration-300 animate-fade-up"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="flex items-start gap-4 mb-0">
                <div className="w-9 h-9 rounded-xl gradient-accent flex items-center justify-center flex-shrink-0">
                  {/* <section.icon className="w-5 h-5 text-primary-foreground" /> */}
                  {section.icon?.asset?.url ? (
                    <Image
                      src={section.icon.asset.url}
                      alt="icon"
                      width={20}
                      height={20}
                      className="w-5 h-5 object-contain"
                    />
                    ) : (
                    <Shield className="w-5 h-5 text-primary-foreground" />
                  )}
                </div>
                <div>
                  {/* <span className="text-xs text-muted-foreground font-medium tracking-wider uppercase">Section {section.number}</span> */}
                  <h2 className="font-display text-xl font-semibold text-foreground">{section.title}</h2>
                </div>
              </div>
              <div className="text-foreground/80 leading-relaxed pl-14">
                {/* Description */}
                  {section.description && (
                    <p className="mb-3">{section.description}</p>
                  )}

                  {/* Bullet Points */}
                    {section.descriptionPoints?.length ? (
                      <ul className="space-y-2 ml-1">
                        {section.descriptionPoints.map((point, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0" />
                            {point}
                          </li>
                        ))}
                      </ul>
                    ) : null}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* <Footer /> */}
    </div>
  );
}

