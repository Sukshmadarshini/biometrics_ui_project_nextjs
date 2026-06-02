// import { Shield, Lock, UserCheck, Mail, Eye, FileText, RefreshCw, AlertCircle, Globe } from "lucide-react";
// import {Navbar} from "../components/Navbar"

// const sections = [
//   {
//     icon: Eye,
//     number: "1",
//     title: "Introduction",
//     content: (
//       <p>At Sukshmadarshini™, we are committed to protecting your privacy and ensuring transparency in how we handle your information. This Privacy Policy explains what information we collect, how we use it, and your rights regarding your personal data.</p>
//     ),
//   },
//   {
//     icon: FileText,
//     number: "2",
//     title: "Information We Collect",
//     content: (
//       <>
//         <p className="mb-3">We collect only the following personal information through our website forms:</p>
//         <ul className="space-y-2 ml-1">
//           <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0" />First Name</li>
//           <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0" />Email Address</li>
//           <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0" />Other Details such as organization name etc. are optional</li>
//         </ul>
//         <p className="mt-3 text-muted-foreground text-sm">We do not collect sensitive personal data, payment information, or any additional identifying information.</p>
//       </>
//     ),
//   },
//   {
//     icon: Shield,
//     number: "3",
//     title: "Purpose of Data Collection",
//     content: (
//       <>
//         <p className="mb-3">The information collected is used solely for:</p>
//         <ul className="space-y-2 ml-1">
//           <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0" />Responding to inquiries about trainings or services</li>
//           <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0" />Sharing information about our programs</li>
//           <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0" />Communicating updates related to Sukshmadarshini™</li>
//         </ul>
//       </>
//     ),
//   },
//   {
//     icon: Lock,
//     number: "4",
//     title: "Data Storage and Sharing",
//     content: (
//       <ul className="space-y-3 ml-1">
//         <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0 mt-2" />The information provided is not stored in external databases for marketing purposes.</li>
//         <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0 mt-2" />We do not sell, rent, or share your personal information with third parties.</li>
//         <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0 mt-2" />We do not use your information for automated profiling or advertising purposes.</li>
//         <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0 mt-2" />Your data is handled responsibly and used strictly for communication initiated by you.</li>
//       </ul>
//     ),
//   },
//   {
//     icon: AlertCircle,
//     number: "5",
//     title: "Data Security",
//     content: (
//       <p>We take reasonable technical and organizational measures to protect your personal information from unauthorized access, misuse, or disclosure.</p>
//     ),
//   },
//   {
//     icon: UserCheck,
//     number: "6",
//     title: "Your Rights",
//     content: (
//       <>
//         <p className="mb-3">You have the right to:</p>
//         <ul className="space-y-2 ml-1">
//           <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0" />Request access to the personal information you have provided</li>
//           <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0" />Request correction of inaccurate information</li>
//           <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0" />Request deletion of your information at any time</li>
//         </ul>
//         <p className="mt-3">To exercise these rights, please contact us at: <a href="mailto:sukshmadarshini@gmail.com" className="text-secondary hover:underline font-medium">sukshmadarshini@gmail.com</a></p>
//       </>
//     ),
//   },
//   {
//     icon: Globe,
//     number: "7",
//     title: "Third-Party Links",
//     content: (
//       <p>Our website does not contain any third-party links.</p>
//     ),
//   },
//   {
//     icon: RefreshCw,
//     number: "8",
//     title: "Changes to This Privacy Policy",
//     content: (
//       <p>We may update this Privacy Policy periodically. Any changes will be reflected on this page with an updated effective date.</p>
//     ),
//   },
//   {
//     icon: Mail,
//     number: "9",
//     title: "Contact Us",
//     content: (
//       <p>If you have any questions regarding this Privacy Policy, please contact us at: <a href="mailto:sukshmadarshini@gmail.com" className="text-secondary hover:underline font-medium">sukshmadarshini@gmail.com</a></p>
//     ),
//   },
// ];

// export default function PrivacyPolicy() {
//   return (
//     <>
//     <Navbar />
//     <div className="min-h-screen bg-background">
//       {/* Hero Banner */}
//       <section className="relative pt-10 overflow-hidden">
//         <div className="gradient-hero py-16 md:py-24">
//           <div className="container mx-auto px-4 relative z-10">
//             <div className="flex items-center gap-4 mb-4 animate-fade-up">
//               <div className="w-14 h-14 rounded-2xl bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 flex items-center justify-center">
//                 <Shield className="w-7 h-7 text-primary-foreground" />
//               </div>
//               <span className="text-primary-foreground/70 font-medium tracking-wide uppercase text-sm">Legal</span>
//             </div>
//             <h1 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-4 animate-fade-up" style={{ animationDelay: "0.1s" }}>
//               Privacy Policy
//             </h1>
//             <p className="text-primary-foreground/80 text-lg max-w-2xl animate-fade-up" style={{ animationDelay: "0.2s" }}>
//               Your trust matters to us. Learn how Sukshmadarshini™ handles and protects your personal information.
//             </p>
//             <div className="flex gap-6 mt-6 text-primary-foreground/60 text-sm animate-fade-up" style={{ animationDelay: "0.3s" }}>
//               <span>Effective Date: February 22, 2026</span>
//               <span>•</span>
//               <span>sukshmadarshini.com</span>
//             </div>
//           </div>
//           {/* Decorative pattern */}
//           <div className="absolute inset-0 dna-pattern opacity-30" />
//         </div>

//         {/* Wave */}
//         <div className="relative h-20 overflow-hidden bg-background -mt-1">
//           <svg className="absolute -top-1 w-full" viewBox="0 0 1440 80" preserveAspectRatio="none" fill="none">
//             <path d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,50 1440,40 L1440,0 L0,0 Z" fill="url(#privacyWave)" />
//             <defs>
//               <linearGradient id="privacyWave" x1="0%" y1="0%" x2="100%" y2="0%">
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
//     </>
//   );
// }


"use client";

import { Shield } from "lucide-react";
import { Navbar } from "../components/Navbar";
import Image from "next/image";

type PrivacySection = {
  title?: string;
  description?: string;
  descriptionPoints?: string[];
  icon?: {
    asset?: {
      url?: string;
    };
  };
};

type PrivacyData = {
  SectionIcon?: {
    asset?: {
      url?: string;
    };
  };
  SectionTitle?: string;
  SectionDescription?: string;
  SectionDate?: string;
  SectionTag?: string;
  privacyPolicy?: PrivacySection[];
};


export default function PrivacyPolicy({ data }: { data: PrivacyData }) {
  
  // console.log("PrivacyPolicyComponent rendered with data:", data);
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-background">
        {/* Hero Banner */}
        <section className="relative pt-10 overflow-hidden">
          <div className="gradient-hero py-16 md:py-24">
            <div className="container mx-auto px-4 relative z-10">
              
              {/* Tag */}
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

              {/* Title */}
              <h1
                className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-4 animate-fade-up"
                style={{ animationDelay: "0.1s" }}
              >
                {data?.SectionTitle || "Privacy Policy"}
              </h1>

              {/* Description */}
              <p
                className="text-primary-foreground/80 text-lg max-w-2xl animate-fade-up"
                style={{ animationDelay: "0.2s" }}
              >
                {data?.SectionDescription ||
                  "Your trust matters to us. Learn how we handle your data."}
              </p>

              {/* Meta */}
              <div
                className="flex gap-6 mt-6 text-primary-foreground/60 text-sm animate-fade-up"
                style={{ animationDelay: "0.3s" }}
              >
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

            {/* Background pattern */}
            <div className="absolute inset-0 dna-pattern opacity-30" />
          </div>

          {/* Wave */}
          <div className="relative h-20 overflow-hidden bg-background -mt-1">
            <svg
              className="absolute -top-1 w-full"
              viewBox="0 0 1440 80"
              preserveAspectRatio="none"
              fill="none"
            >
              <path
                d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,50 1440,40 L1440,0 L0,0 Z"
                fill="url(#privacyWave)"
              />
              <defs>
                <linearGradient
                  id="privacyWave"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
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
            {data?.privacyPolicy?.map((section, index) => (
              <div
                key={index}
                className="glass-card rounded-2xl p-6 md:p-8 shadow-soft hover:shadow-glow transition-all duration-300 animate-fade-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex items-start gap-4 mb-0">
                  
                  {/* Icon */}
                  <div className="w-9 h-9 rounded-xl gradient-accent flex items-center justify-center flex-shrink-0">
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

                  {/* Title */}
                  <div>
                    <h2 className="font-display text-xl font-semibold text-foreground">
                      {section.title}
                    </h2>
                  </div>
                </div>

                {/* Content */}
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
      </div>
    </>
  );
}