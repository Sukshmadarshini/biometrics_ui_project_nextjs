// // "use client";

// // import { useState } from "react";
// // import { z } from "zod";
// // import { Handshake, Calendar, Clock, Users, Mail } from "lucide-react";
// // import { Navbar } from "@/app/components/Navbar";
// // import { Button } from "@/app/components/ui/button";
// // import { Input } from "@/app/components/ui/input";
// // import { Label } from "@/app/components/ui/label";
// // import { Textarea } from "@/app/components/ui/textarea";
// // import { useToast } from "@/app/hooks/use-toast";
// // import Image from "next/image";

// // type Collaboration = {
// //   title: string;
// //   collaboratedWith: string;
// //   dateFrom: string;
// //   dateTo: string;
// //   duration: string;
// //   photos?: string[];
// //   description?: string;
// // };

// // const collaborations: Collaboration[] = [
// //   {
// //     title: "Plant Proteomics Capacity Building",
// //     collaboratedWith: "European Plant Science Consortium",
// //     dateFrom: "Jan 2023",
// //     dateTo: "Dec 2024",
// //     duration: "2 Years",
// //     description:
// //       "Joint training program on advanced LC-MS workflows for crop improvement research across partner institutions.",
// //   },
// //   {
// //     title: "Agri-Multiomics Data Pipeline",
// //     collaboratedWith: "AgriBiotech Research Institute",
// //     dateFrom: "Mar 2023",
// //     dateTo: "Sep 2023",
// //     duration: "6 Months",
// //     description:
// //       "Co-development of an end-to-end multiomics data analysis pipeline for sustainable agriculture studies.",
// //   },
// //   {
// //     title: "Sustainable Crop Stress Symposium",
// //     collaboratedWith: "European Sustainable Agriculture Network",
// //     dateFrom: "Jun 2024",
// //     dateTo: "Aug 2024",
// //     duration: "3 Months",
// //     description:
// //       "Co-hosted symposium and curated training modules for early-career researchers in plant stress proteomics.",
// //   },
// //   {
// //     title: "Proteomics Standards Working Group",
// //     collaboratedWith: "International Proteomics Society",
// //     dateFrom: "Sep 2022",
// //     dateTo: "Mar 2024",
// //     duration: "1.5 Years",
// //     description:
// //       "Contributed to publishing best-practice guidelines for plant proteomics experiments and reproducibility.",
// //   },
// // ];

// // const inquirySchema = z.object({
// //   name: z.string().trim().min(1, "Name is required").max(100),
// //   email: z.string().trim().email("Invalid email").max(255),
// //   organization: z.string().trim().min(1, "Organization is required").max(150),
// //   collaborationType: z.string().trim().min(1, "Please specify the type").max(150),
// //   message: z.string().trim().min(20, "Please write at least 20 characters").max(2000),
// // });

// // export default function Collaborations() {
// //   const { toast } = useToast();
// //   const [form, setForm] = useState({
// //     name: "",
// //     email: "",
// //     organization: "",
// //     collaborationType: "",
// //     message: "",
// //   });
// //   const [errors, setErrors] = useState<Record<string, string>>({});

// //   const handleChange = (field: keyof typeof form, value: string) => {
// //     setForm((p) => ({ ...p, [field]: value }));
// //   };

// //   const handleSubmit = (e: React.FormEvent) => {
// //     e.preventDefault();
// //     const result = inquirySchema.safeParse(form);
// //     if (!result.success) {
// //       const newErrors: Record<string, string> = {};
// //       result.error.issues.forEach((i) => {
// //         if (i.path[0]) newErrors[i.path[0] as string] = i.message;
// //       });
// //       setErrors(newErrors);
// //       return;
// //     }
// //     setErrors({});

// //     const subject = encodeURIComponent(`Collaboration Enquiry — ${form.organization}`);
// //     const body = encodeURIComponent(
// //       `Name: ${form.name}\nEmail: ${form.email}\nOrganization: ${form.organization}\nCollaboration Type: ${form.collaborationType}\n\nMessage:\n${form.message}`
// //     );
// //     window.location.href = `mailto:contact@sukshmadarshini.com?subject=${subject}&body=${body}`;

// //     toast({
// //       title: "Enquiry ready to send",
// //       description: "Your email client should open with the message pre-filled.",
// //     });

// //     setForm({ name: "", email: "", organization: "", collaborationType: "", message: "" });
// //   };

// //   return (
// //     <div className="min-h-screen bg-background">
// //       <Navbar />

// //       <main className="pt-24 md:pt-28">
// //         {/* Hero */}
// //         <section className="container mx-auto px-4 py-12 md:py-20 text-center">
// //           <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary mb-6">
// //             <Handshake className="w-4 h-4" />
// //             <span className="text-sm font-medium">Collaborations</span>
// //           </div>
// //           <h1 className="font-display text-gradient text-4xl md:text-6xl font-bold mb-4">
// //             Partnering for Scientific Impact
// //           </h1>
// //           <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
// //             A look at our past collaborations across research, training, and capacity-building — and how to start a new one with us.
// //           </p>
// //         </section>

// //         {/* Past Collaborations */}
// //         <section className="container mx-auto px-4 py-12">
// //           <h2 className="font-display text-3xl md:text-4xl font-bold text-gradient mb-10 text-center">
// //             Past Collaborations
// //           </h2>

// //           <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
// //             {collaborations.map((c, idx) => (
// //               <article
// //                 key={idx}
// //                 className="border border-border rounded-2xl p-6 bg-card hover:shadow-lg transition-shadow"
// //               >
// //                 <h3 className="font-display text-xl font-semibold text-foreground mb-3">
// //                   {c.title}
// //                 </h3>

// //                 <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
// //                   <Users className="w-4 h-4 text-primary" />
// //                   <span>
// //                     <span className="font-medium text-foreground">Collaborated with:</span>{" "}
// //                     {c.collaboratedWith}
// //                   </span>
// //                 </div>

// //                 <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
// //                   <Calendar className="w-4 h-4 text-primary" />
// //                   <span>
// //                     <span className="font-medium text-foreground">Date:</span> {c.dateFrom} – {c.dateTo}
// //                   </span>
// //                 </div>

// //                 <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
// //                   <Clock className="w-4 h-4 text-primary" />
// //                   <span>
// //                     <span className="font-medium text-foreground">Duration:</span> {c.duration}
// //                   </span>
// //                 </div>

// //                 {c.description && (
// //                   <p className="text-sm text-muted-foreground leading-relaxed mb-4">
// //                     {c.description}
// //                   </p>
// //                 )}

// //                 {c.photos && c.photos.length > 0 && (
// //                   <div className="grid grid-cols-3 gap-2 mt-4">
// //                     {c.photos.map((src, i) => (
// //                       <Image
// //                         key={i}
// //                         src={src}
// //                         alt={`${c.title} photo ${i + 1}`}
// //                         loading="lazy"
// //                         className="w-full h-24 object-cover rounded-lg"
// //                       />
// //                     ))}
// //                   </div>
// //                 )}
// //               </article>
// //             ))}
// //           </div>
// //         </section>

// //         {/* Get in Touch */}
// //         <section className="container mx-auto px-4 py-16">
// //           <div className="max-w-3xl mx-auto border border-border rounded-2xl p-6 md:p-10 bg-card">
// //             <div className="text-center mb-8">
// //               <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
// //                 <Mail className="w-4 h-4" />
// //                 <span className="text-sm font-medium">Collaborate with us</span>
// //               </div>
// //               <h2 className="font-display text-3xl md:text-4xl font-bold text-gradient mb-2">
// //                 Get in Touch
// //               </h2>
// //               <p className="text-muted-foreground">
// //                 Tell us about your organization and the collaboration you have in mind.
// //               </p>
// //             </div>

// //             <form onSubmit={handleSubmit} className="space-y-5">
// //               <div className="grid md:grid-cols-2 gap-5">
// //                 <div className="space-y-2">
// //                   <Label htmlFor="collab-name">Name *</Label>
// //                   <Input
// //                     id="collab-name"
// //                     value={form.name}
// //                     onChange={(e) => handleChange("name", e.target.value)}
// //                     placeholder="Your full name"
// //                   />
// //                   {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
// //                 </div>

// //                 <div className="space-y-2">
// //                   <Label htmlFor="collab-email">Email *</Label>
// //                   <Input
// //                     id="collab-email"
// //                     type="email"
// //                     value={form.email}
// //                     onChange={(e) => handleChange("email", e.target.value)}
// //                     placeholder="you@example.com"
// //                   />
// //                   {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
// //                 </div>
// //               </div>

// //               <div className="grid md:grid-cols-2 gap-5">
// //                 <div className="space-y-2">
// //                   <Label htmlFor="collab-org">Organization *</Label>
// //                   <Input
// //                     id="collab-org"
// //                     value={form.organization}
// //                     onChange={(e) => handleChange("organization", e.target.value)}
// //                     placeholder="Your institution or company"
// //                   />
// //                   {errors.organization && (
// //                     <p className="text-sm text-destructive">{errors.organization}</p>
// //                   )}
// //                 </div>

// //                 <div className="space-y-2">
// //                   <Label htmlFor="collab-type">Type of Collaboration *</Label>
// //                   <Input
// //                     id="collab-type"
// //                     value={form.collaborationType}
// //                     onChange={(e) => handleChange("collaborationType", e.target.value)}
// //                     placeholder="Research, Training, Joint event…"
// //                   />
// //                   {errors.collaborationType && (
// //                     <p className="text-sm text-destructive">{errors.collaborationType}</p>
// //                   )}
// //                 </div>
// //               </div>

// //               <div className="space-y-2">
// //                 <Label htmlFor="collab-msg">Message *</Label>
// //                 <Textarea
// //                   id="collab-msg"
// //                   rows={6}
// //                   value={form.message}
// //                   onChange={(e) => handleChange("message", e.target.value)}
// //                   placeholder="Briefly describe your goals, scope, and timeline."
// //                 />
// //                 {errors.message && <p className="text-sm text-destructive">{errors.message}</p>}
// //               </div>

// //               <Button
// //                 type="submit"
// //                 className="w-full rounded-full bg-secondary hover:bg-secondary/90 text-secondary-foreground"
// //               >
// //                 Send Enquiry
// //               </Button>
// //             </form>
// //           </div>
// //         </section>
// //       </main>
// //     </div>
// //   );
// // };


// "use client";

// import { useState } from "react";
// import { z } from "zod";
// import { Handshake, Calendar, Clock, Users, Mail, GraduationCap, User } from "lucide-react";
// import { Navbar } from "@/app/components/Navbar";
// import { Button } from "@/app/components/ui/button";
// import { Input } from "@/app/components/ui/input";
// import { Label } from "@/app/components/ui/label";
// import { Textarea } from "@/app/components/ui/textarea";
// import { useToast } from "@/app/hooks/use-toast";
// import Image from "next/image";

// type Photo = {
//   asset: { url: string };
// };

// type Intern = {
//   name: string;
//   role: string;
// };

// type UniversityGroup = {
//   university: string;
//   interns: Intern[];
// };

// type Collaboration = {
//   title: string;
//   collaboratedWith: string;
//   dateFrom: string;
//   dateTo: string;
//   duration: string;
//   photos?: Photo[];
//   description?: string;
// };

// type CollaborationsProps = {
//   collaborations: Collaboration[];
// };

// const inquirySchema = z.object({
//   name: z.string().trim().min(1, "Name is required").max(100),
//   email: z.string().trim().email("Invalid email").max(255),
//   organization: z.string().trim().min(1, "Organization is required").max(150),
//   collaborationType: z.string().trim().min(1, "Please specify the type").max(150),
//   message: z.string().trim().min(20, "Please write at least 20 characters").max(2000),
// });

// const internGroups: UniversityGroup[] = [
//   {
//     university: "University of Cambridge",
//     interns: [
//       { name: "Dr. Emily Carter", role: "Research Intern — Proteomics" },
//       { name: "James Miller", role: "Bioinformatics Intern" },
//     ],
//   },
//   {
//     university: "Wageningen University",
//     interns: [
//       { name: "Sofia van Dijk", role: "Plant Science Intern" },
//       { name: "Lars de Vries", role: "Data Analysis Intern" },
//       { name: "Anouk Jansen", role: "Lab Operations Intern" },
//     ],
//   },
//   {
//     university: "Indian Institute of Science",
//     interns: [
//       { name: "Arjun Reddy", role: "Proteomics Research Intern" },
//       { name: "Priya Sharma", role: "Computational Biology Intern" },
//     ],
//   },
// ];

// export default function Collaborations({ collaborations = [] }: CollaborationsProps) {
//   const { toast } = useToast();
//   const [loading, setLoading] = useState(false);   // add this state
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     organization: "",
//     collaborationType: "",
//     message: "",
//   });
//   const [errors, setErrors] = useState<Record<string, string>>({});

//   const handleChange = (field: keyof typeof form, value: string) => {
//     setForm((p) => ({ ...p, [field]: value }));
//   };

//   // const handleSubmit = (e: React.FormEvent) => {
//   //   e.preventDefault();
//   //   const result = inquirySchema.safeParse(form);
//   //   if (!result.success) {
//   //     const newErrors: Record<string, string> = {};
//   //     result.error.issues.forEach((i) => {
//   //       if (i.path[0]) newErrors[i.path[0] as string] = i.message;
//   //     });
//   //     setErrors(newErrors);
//   //     return;
//   //   }
//   //   setErrors({});

//   //   const subject = encodeURIComponent(`Collaboration Enquiry — ${form.organization}`);
//   //   const body = encodeURIComponent(
//   //     `Name: ${form.name}\nEmail: ${form.email}\nOrganization: ${form.organization}\nCollaboration Type: ${form.collaborationType}\n\nMessage:\n${form.message}`
//   //   );
//   //   window.location.href = `mailto:contact@sukshmadarshini.com?subject=${subject}&body=${body}`;

//   //   toast({
//   //     title: "Enquiry ready to send",
//   //     description: "Your email client should open with the message pre-filled.",
//   //   });

//   //   setForm({ name: "", email: "", organization: "", collaborationType: "", message: "" });
//   // };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const result = inquirySchema.safeParse(form);
//     if (!result.success) {
//       const newErrors: Record<string, string> = {};
//       result.error.issues.forEach((i) => {
//         if (i.path[0]) newErrors[i.path[0] as string] = i.message;
//       });
//       setErrors(newErrors);
//       return;
//     }
//     setErrors({});
//     setLoading(true);
 
//     try {
//       const res = await fetch("/api/collaborationEmail", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(form),
//       });
 
//       const data = await res.json();
 
//       if (!res.ok || !data.success) {
//         toast({
//           title: "Submission failed",
//           description: data.error ?? "Something went wrong. Please try again.",
//           variant: "destructive",
//         });
//         return;
//       }
 
//       toast({
//         title: "Enquiry sent!",
//         description: "We've received your collaboration inquiry and will be in touch shortly.",
//       });
 
//       setForm({ name: "", email: "", organization: "", collaborationType: "", message: "" });
 
//     } catch {
//       toast({
//         title: "Network error",
//         description: "Could not reach the server. Please try again.",
//         variant: "destructive",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const hasPastCollaborations = (collaborations ?? []).length > 0;

//   return (
//     <div className="min-h-screen bg-background">
//       <Navbar />

//       <main className="pt-24 md:pt-28">
//         {/* Hero */}
//         <section className="container mx-auto px-4 py-12 md:py-20 text-center">
//           <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary mb-6">
//             <Handshake className="w-4 h-4" />
//             <span className="text-sm font-medium">Collaborations</span>
//           </div>
//           <h1 className="font-display text-gradient text-4xl md:text-6xl font-bold mb-4">
//             Partnering for Scientific Impact
//           </h1>
//           <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
//             A look at our past collaborations across research, training, and capacity-building — and how to start a new one with us.
//           </p>
//         </section>

//         {/* ✅ Past Collaborations — only shown when Sanity has entries */}
//         {hasPastCollaborations && (
//           <section className="container mx-auto px-4 py-12">
//             <h2 className="font-display text-3xl md:text-4xl font-bold text-gradient mb-10 text-center">
//               Past Collaborations
//             </h2>

//             <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
//               {collaborations.map((c, idx) => (
//                 <article
//                   key={idx}
//                   className="border border-border rounded-2xl p-6 bg-card hover:shadow-lg transition-shadow"
//                 >
//                   <h3 className="font-display text-xl font-semibold text-foreground mb-3">
//                     {c.title}
//                   </h3>

//                   <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
//                     <Users className="w-4 h-4 text-primary" />
//                     <span>
//                       <span className="font-medium text-foreground">Collaborated with:</span>{" "}
//                       {c.collaboratedWith}
//                     </span>
//                   </div>

//                   <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
//                     <Calendar className="w-4 h-4 text-primary" />
//                     <span>
//                       <span className="font-medium text-foreground">Date:</span> {c.dateFrom} – {c.dateTo}
//                     </span>
//                   </div>

//                   <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
//                     <Clock className="w-4 h-4 text-primary" />
//                     <span>
//                       <span className="font-medium text-foreground">Duration:</span> {c.duration}
//                     </span>
//                   </div>

//                   {c.description && (
//                     <p className="text-sm text-muted-foreground leading-relaxed mb-4">
//                       {c.description}
//                     </p>
//                   )}

//                   {c.photos && c.photos.length > 0 && (
//                     <div className="grid grid-cols-3 gap-2 mt-4">
//                       {c.photos.map((photo, i) => (
//                         <Image
//                           key={i}
//                           src={photo.asset.url}
//                           alt={`${c.title} photo ${i + 1}`}
//                           width={200}
//                           height={96}
//                           loading="lazy"
//                           className="w-full h-24 object-cover rounded-lg"
//                         />
//                       ))}
//                     </div>
//                   )}
//                 </article>
//               ))}
//             </div>
//           </section>
//         )}

//         {/* Past Interns */}
//         <section className="container mx-auto px-4 py-12">
//           <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-10 text-center">
//             Past Interns
//           </h2>

//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
//             {internGroups.map((group, idx) => (
//               <article
//                 key={idx}
//                 className="border border-border rounded-2xl p-6 bg-card hover:shadow-lg transition-shadow"
//               >
//                 <div className="flex items-center gap-2 mb-5">
//                   <GraduationCap className="w-5 h-5 text-primary" />
//                   <h3 className="font-display text-lg font-semibold text-foreground">
//                     {group.university}
//                   </h3>
//                 </div>

//                 <div className="space-y-4">
//                   {group.interns.map((intern, i) => (
//                     <div key={i} className="flex items-start gap-3">
//                       <User className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
//                       <div>
//                         <p className="text-sm font-medium text-foreground">{intern.name}</p>
//                         <p className="text-sm text-muted-foreground">{intern.role}</p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </article>
//             ))}
//           </div>
//         </section>

//         {/* Get in Touch — always visible */}
//         <section className="container mx-auto px-4 py-16">
//           <div className="max-w-3xl mx-auto border border-border rounded-2xl p-6 md:p-10 bg-card">
//             <div className="text-center mb-8">
//               <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
//                 <Mail className="w-4 h-4" />
//                 <span className="text-sm font-medium">Collaborate with us</span>
//               </div>
//               <h2 className="font-display text-3xl md:text-4xl font-bold text-gradient mb-2">
//                 Get in Touch
//               </h2>
//               <p className="text-muted-foreground">
//                 Tell us about your organization and the collaboration you have in mind.
//               </p>
//             </div>

//             <form onSubmit={handleSubmit} className="space-y-5">
//               <div className="grid md:grid-cols-2 gap-5">
//                 <div className="space-y-2">
//                   <Label htmlFor="collab-name">Name *</Label>
//                   <Input
//                     id="collab-name"
//                     value={form.name}
//                     onChange={(e) => handleChange("name", e.target.value)}
//                     placeholder="Your full name"
//                   />
//                   {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="collab-email">Email *</Label>
//                   <Input
//                     id="collab-email"
//                     type="email"
//                     value={form.email}
//                     onChange={(e) => handleChange("email", e.target.value)}
//                     placeholder="you@example.com"
//                   />
//                   {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
//                 </div>
//               </div>

//               <div className="grid md:grid-cols-2 gap-5">
//                 <div className="space-y-2">
//                   <Label htmlFor="collab-org">Organization *</Label>
//                   <Input
//                     id="collab-org"
//                     value={form.organization}
//                     onChange={(e) => handleChange("organization", e.target.value)}
//                     placeholder="Your institution or company"
//                   />
//                   {errors.organization && (
//                     <p className="text-sm text-destructive">{errors.organization}</p>
//                   )}
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="collab-type">Type of Collaboration *</Label>
//                   <Input
//                     id="collab-type"
//                     value={form.collaborationType}
//                     onChange={(e) => handleChange("collaborationType", e.target.value)}
//                     placeholder="Research, Training, Joint event…"
//                   />
//                   {errors.collaborationType && (
//                     <p className="text-sm text-destructive">{errors.collaborationType}</p>
//                   )}
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="collab-msg">Message *</Label>
//                 <Textarea
//                   id="collab-msg"
//                   rows={6}
//                   value={form.message}
//                   onChange={(e) => handleChange("message", e.target.value)}
//                   placeholder="Briefly describe your goals, scope, and timeline."
//                 />
//                 {errors.message && <p className="text-sm text-destructive">{errors.message}</p>}
//               </div>

//               {/* <Button
//                 type="submit"
//                 className="w-full rounded-full bg-secondary hover:bg-secondary/90 text-secondary-foreground"
//               >
//                 Send Enquiry
//               </Button> */}
//               <Button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full rounded-full bg-secondary hover:bg-secondary/90 text-secondary-foreground"
//               >
//                 {loading ? "Sending…" : "Send Enquiry"}
//               </Button>
//             </form>
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// }

"use client";

import { useState, useRef } from "react";
import { z } from "zod";
import { Handshake, Calendar, Clock, Users, Mail, AlertCircle, CheckCircle2, Loader2, GraduationCap, User } from "lucide-react";
import { Navbar } from "@/app/components/Navbar";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";
import { useToast } from "@/app/hooks/use-toast";
import Image from "next/image";

interface CollaborationsProps {
  collaborations: any[];
  pastInterns: any[];
  badge?: string;
  heading?: string;
  subheading?: string;
}

type Photo = {
  asset: { url: string };
};

type Collaboration = {
  title: string;
  collaboratedWith: string;
  dateFrom: string;
  dateTo: string;
  duration: string;
  photos?: Photo[];
  description?: string;
};

type PastIntern = {
  name: string;
  role: string;
  university: string;
  year: number;
};

// type CollaborationsProps = {
//   collaborations: Collaboration[];
//   pastInterns: PastIntern[];
// };

type FormFields = {
  name: string;
  email: string;
  organization: string;
  collaborationType: string;
  message: string;
};

type EmailCheckStatus = "idle" | "checking" | "valid" | "invalid";

/* -------------------------------------------------------------------------- */
/*                            Email validation helpers                        */
/* -------------------------------------------------------------------------- */

async function checkEmail(email: string): Promise<{ valid: boolean; reason?: string }> {
  try {
    const res = await fetch(`/api/validateEmail?email=${encodeURIComponent(email)}`, {
      cache: "no-store",
    });
    if (!res.ok) return { valid: true };
    return res.json();
  } catch {
    return { valid: true };
  }
}

function validateEmailFormat(value: string): string | null {
  const t = value.trim().toLowerCase();
  if (!t) return "Email is required.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(t))
    return "Please enter a valid email address.";
  return null;
}

/* -------------------------------------------------------------------------- */

const inquirySchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  organization: z.string().trim().min(1, "Organization is required").max(150),
  collaborationType: z.string().trim().min(1, "Please specify the type").max(150),
  message: z.string().trim().min(20, "Please write at least 20 characters").max(2000),
});

type Intern = {
  name: string;
  role: string;
};

type UniversityGroup = {
  university: string;
  interns: Intern[];
};

// const internGroups: UniversityGroup[] = [
//   {
//     university: "University of Cambridge",
//     interns: [
//       { name: "Dr. Emily Carter", role: "Research Intern — Proteomics" },
//       { name: "James Miller", role: "Bioinformatics Intern" },
//     ],
//   },
//   {
//     university: "Wageningen University",
//     interns: [
//       { name: "Sofia van Dijk", role: "Plant Science Intern" },
//       { name: "Lars de Vries", role: "Data Analysis Intern" },
//       { name: "Anouk Jansen", role: "Lab Operations Intern" },
//     ],
//   },
//   {
//     university: "Indian Institute of Science",
//     interns: [
//       { name: "Arjun Reddy", role: "Proteomics Research Intern" },
//       { name: "Priya Sharma", role: "Computational Biology Intern" },
//     ],
//   },
// ];

export default function Collaborations({ 
  collaborations = [], 
  pastInterns = [],
  badge = "Collaborations",
  heading = "Partnering for Scientific Impact",
  subheading = "A look at our past collaborations across research, training, and capacity-building and how to start a new one with us.(This is static)"  
}: CollaborationsProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<FormFields>({
    name: "",
    email: "",
    organization: "",
    collaborationType: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormFields, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormFields, boolean>>>({});
  const [emailCheckStatus, setEmailCheckStatus] = useState<EmailCheckStatus>("idle");
  const emailDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* ── Email handlers ──────────────────────────────────────────────────────── */

  async function handleEmailBlur() {
    setTouched((p) => ({ ...p, email: true }));
    const formatError = validateEmailFormat(form.email);
    if (formatError) {
      setErrors((p) => ({ ...p, email: formatError }));
      setEmailCheckStatus("idle");
      return;
    }
    setEmailCheckStatus("checking");
    setErrors((p) => ({ ...p, email: undefined }));
    try {
      const result = await checkEmail(form.email);
      setEmailCheckStatus(result.valid ? "valid" : "invalid");
      setErrors((p) => ({
        ...p,
        email: result.valid ? undefined : (result.reason ?? "This email address could not be verified."),
      }));
    } catch {
      setEmailCheckStatus("idle");
    }
  }

  function handleEmailChange(value: string) {
    setForm((p) => ({ ...p, email: value }));
    setEmailCheckStatus("idle");
    if (touched.email) {
      const formatError = validateEmailFormat(value);
      setErrors((p) => ({ ...p, email: formatError ?? undefined }));
      if (!formatError) {
        if (emailDebounceRef.current) clearTimeout(emailDebounceRef.current);
        emailDebounceRef.current = setTimeout(async () => {
          setEmailCheckStatus("checking");
          try {
            const result = await checkEmail(value);
            setEmailCheckStatus(result.valid ? "valid" : "invalid");
            setErrors((p) => ({
              ...p,
              email: result.valid ? undefined : (result.reason ?? "This email could not be verified."),
            }));
          } catch {
            setEmailCheckStatus("idle");
          }
        }, 800);
      }
    }
  }

  /* ── Generic field change ────────────────────────────────────────────────── */

  function handleChange(field: keyof FormFields, value: string) {
    if (field === "email") {
      handleEmailChange(value);
      return;
    }
    setForm((p) => ({ ...p, [field]: value }));
    if (touched[field]) {
      // re-validate that field inline
      const result = inquirySchema.safeParse({ ...form, [field]: value });
      const fieldError = result.success
        ? undefined
        : result.error.issues.find((i) => i.path[0] === field)?.message;
      setErrors((p) => ({ ...p, [field]: fieldError }));
    }
  }

  function handleBlur(field: keyof FormFields) {
    if (field === "email") return;
    setTouched((p) => ({ ...p, [field]: true }));
    const result = inquirySchema.safeParse(form);
    const fieldError = result.success
      ? undefined
      : result.error.issues.find((i) => i.path[0] === field)?.message;
    setErrors((p) => ({ ...p, [field]: fieldError }));
  }

  /* ── Submit ──────────────────────────────────────────────────────────────── */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setTouched({ name: true, email: true, organization: true, collaborationType: true, message: true });

    if (emailCheckStatus === "checking") {
      toast({ title: "Please wait", description: "Verifying email address…" });
      return;
    }

    // Run zod on all non-email fields
    const zodResult = inquirySchema.safeParse(form);
    const newErrors: Partial<Record<keyof FormFields, string>> = {};
    if (!zodResult.success) {
      zodResult.error.issues.forEach((i) => {
        if (i.path[0]) newErrors[i.path[0] as keyof FormFields] = i.message;
      });
    }

    // Email validation
    const emailFormatError = validateEmailFormat(form.email);
    if (emailFormatError) {
      newErrors.email = emailFormatError;
    } else if (emailCheckStatus === "invalid") {
      newErrors.email = errors.email ?? "This email address could not be verified.";
    } else if (emailCheckStatus === "idle") {
      // hasn't been checked yet — run it now
      setEmailCheckStatus("checking");
      const result = await checkEmail(form.email);
      setEmailCheckStatus(result.valid ? "valid" : "invalid");
      if (!result.valid) {
        newErrors.email = result.reason ?? "This email address could not be verified.";
      }
    }

    setErrors(newErrors);

    if (Object.values(newErrors).some(Boolean)) {
      toast({
        title: "Please fix the errors",
        description: "Some fields contain invalid values.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/collaborationEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        toast({
          title: "Submission failed",
          description: data.error ?? "Something went wrong. Please try again.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Enquiry sent!",
        description: "We've received your collaboration enquiry and will be in touch shortly.",
      });

      setForm({ name: "", email: "", organization: "", collaborationType: "", message: "" });
      setTouched({});
      setErrors({});
      setEmailCheckStatus("idle");
    } catch {
      toast({
        title: "Network error",
        description: "Could not reach the server. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  /* ── Sub-components ──────────────────────────────────────────────────────── */

  function FieldError({ field }: { field: keyof FormFields }) {
    if (!touched[field] || !errors[field]) return null;
    return (
      <p className="flex items-center gap-1 mt-1 text-xs text-destructive">
        <AlertCircle className="w-3 h-3 shrink-0" />
        {errors[field]}
      </p>
    );
  }

  function EmailIndicator() {
    if (emailCheckStatus === "checking")
      return <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 animate-spin text-muted-foreground" />;
    if (emailCheckStatus === "valid")
      return <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500" />;
    if (emailCheckStatus === "invalid")
      return <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-destructive" />;
    return null;
  }

  const emailBorderClass =
    touched.email && errors.email
      ? "border-destructive focus-visible:ring-destructive"
      : emailCheckStatus === "valid"
      ? "border-green-500 focus-visible:ring-green-500"
      : "";

  const hasPastCollaborations = (collaborations ?? []).length > 0;

  /* ── Render ──────────────────────────────────────────────────────────────── */

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 md:pt-28">
        {/* Hero */}
        <section className="container mx-auto px-4 py-12 md:py-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary mb-6">
            <Handshake className="w-4 h-4" />
            <span className="text-sm font-medium">{badge}</span>
          </div>
          <h1 className="font-display text-gradient text-4xl md:text-6xl font-bold mb-4">
            {/* Partnering for Scientific Impact */}
            {heading}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {/* A look at our past collaborations across research, training, and capacity-building and how to start a new one with us. */}
            {subheading}
          </p>
        </section>

        {/* Past Collaborations — only shown when Sanity has entries */}
        {hasPastCollaborations && (
          <section className="container mx-auto px-4 py-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gradient mb-10 text-center">
              Past Collaborations
            </h2>

            <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
              {collaborations.map((c, idx) => (
                <article
                  key={idx}
                  className="border border-border rounded-2xl p-6 bg-card hover:shadow-lg transition-shadow"
                >
                  <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                    {c.title}
                  </h3>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Users className="w-4 h-4 text-primary" />
                    <span>
                      <span className="font-medium text-foreground">Collaborated with:</span>{" "}
                      {c.collaboratedWith}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span>
                      <span className="font-medium text-foreground">Date:</span> {c.dateFrom} - {c.dateTo}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <Clock className="w-4 h-4 text-primary" />
                    <span>
                      <span className="font-medium text-foreground">Duration:</span> {c.duration}
                    </span>
                  </div>

                  {c.description && (
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {c.description}
                    </p>
                  )}

                  {/* {c.photos && c.photos.length > 0 && (
                    <div className="grid grid-cols-3 gap-2 mt-4">
                      {c.photos.map((photo, i) => (
                        <Image
                          key={i}
                          src={photo.asset.url}
                          alt={`${c.title} photo ${i + 1}`}
                          width={200}
                          height={96}
                          loading="lazy"
                          className="w-full h-24 object-cover rounded-lg"
                        />
                      ))}
                    </div>
                  )} */}
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Past Interns */}
         {/* <section className="container mx-auto px-4 py-12">
           <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-10 text-center">
             Past Interns
           </h2>

           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
             {internGroups.map((group, idx) => (
               <article
                 key={idx}
                 className="border border-border rounded-2xl p-6 bg-card hover:shadow-lg transition-shadow"
               >
                 <div className="flex items-center gap-2 mb-5">
                   <GraduationCap className="w-5 h-5 text-primary" />
                   <h3 className="font-display text-lg font-semibold text-foreground">
                     {group.university}
                   </h3>
                 </div>

                 <div className="space-y-4">
                   {group.interns.map((intern, i) => (
                     <div key={i} className="flex items-start gap-3">
                       <User className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                       <div>
                         <p className="text-sm font-medium text-foreground">{intern.name}</p>
                         <p className="text-sm text-muted-foreground">{intern.role}</p>
                       </div>
                     </div>
                   ))}
                 </div>
               </article>
             ))}
           </div>
         </section> */}
         {/* Past Interns */}
        {pastInterns.length > 0 && (() => {
          // Group by university
          const grouped = pastInterns.reduce<Record<string, PastIntern[]>>((acc, intern) => {
            if (!acc[intern.university]) acc[intern.university] = [];
            acc[intern.university].push(intern);
            return acc;
          }, {});

          return (
            <section className="container mx-auto px-4 py-12">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-gradient mb-10 text-center">
                Past Interns
              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {Object.entries(grouped).map(([university, interns]) => (
                  <article
                    key={university}
                    className="border border-border rounded-2xl p-6 bg-card hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-center gap-2 mb-5">
                      <GraduationCap className="w-5 h-5 text-primary" />
                      <h3 className="font-display text-lg font-semibold text-foreground">
                        {university}
                      </h3>
                    </div>

                    <div className="space-y-4">
                      {interns.map((intern, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <User className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                          <div>
                            <p className="text-sm font-medium text-foreground">{intern.name}</p>
                            <p className="text-sm text-muted-foreground">{intern.role}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          );
        })()}

        {/* Get in Touch — always visible */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto border border-border rounded-2xl p-6 md:p-10 bg-card">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
                <Mail className="w-4 h-4" />
                <span className="text-sm font-medium">Collaborate with us</span>
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-gradient mb-2">
                Get in Touch
              </h2>
              <p className="text-muted-foreground">
                Tell us about your organization and the collaboration you have in mind.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="collab-name">Name *</Label>
                  <Input
                    id="collab-name"
                    value={form.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    onBlur={() => handleBlur("name")}
                    placeholder="Your full name"
                    className={touched.name && errors.name ? "border-destructive focus-visible:ring-destructive" : ""}
                  />
                  <FieldError field="name" />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="collab-email">Email *</Label>
                  <div className="relative">
                    <Input
                      id="collab-email"
                      type="email"
                      value={form.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      onBlur={handleEmailBlur}
                      placeholder="you@example.com"
                      className={`pr-9 ${emailBorderClass}`}
                    />
                    <EmailIndicator />
                  </div>
                  <FieldError field="email" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                {/* Organization */}
                <div className="space-y-2">
                  <Label htmlFor="collab-org">Organization *</Label>
                  <Input
                    id="collab-org"
                    value={form.organization}
                    onChange={(e) => handleChange("organization", e.target.value)}
                    onBlur={() => handleBlur("organization")}
                    placeholder="Your institution or company"
                    className={touched.organization && errors.organization ? "border-destructive focus-visible:ring-destructive" : ""}
                  />
                  <FieldError field="organization" />
                </div>

                {/* Collaboration type */}
                <div className="space-y-2">
                  <Label htmlFor="collab-type">Type of Collaboration *</Label>
                  <Input
                    id="collab-type"
                    value={form.collaborationType}
                    onChange={(e) => handleChange("collaborationType", e.target.value)}
                    onBlur={() => handleBlur("collaborationType")}
                    placeholder="Research, Training, Joint event…"
                    className={touched.collaborationType && errors.collaborationType ? "border-destructive focus-visible:ring-destructive" : ""}
                  />
                  <FieldError field="collaborationType" />
                </div>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <Label htmlFor="collab-msg">Message *</Label>
                <Textarea
                  id="collab-msg"
                  rows={6}
                  value={form.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  onBlur={() => handleBlur("message")}
                  placeholder="Briefly describe your goals, scope, and timeline."
                  className={touched.message && errors.message ? "border-destructive focus-visible:ring-destructive" : ""}
                />
                <FieldError field="message" />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full rounded-full bg-secondary hover:bg-secondary/90 text-secondary-foreground"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Sending…
                  </>
                ) : (
                  "Send Enquiry"
                )}
              </Button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}