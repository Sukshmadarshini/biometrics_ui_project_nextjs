// // "use client";

// // import {
// //   Mail,
// //   ArrowRight,
// //   MapPin,
// //   Briefcase as JobIcon,
// //   CheckCircle2,
// //   Clock,
// //   Shield,
// //   CircleCheckBig,
// //   Upload,
// // } from "lucide-react";

// // import { Navbar } from "../components/Navbar";
// // import { Button } from "../components/ui/button";
// // import {
// //   Dialog,
// //   DialogContent,
// //   DialogHeader,
// //   DialogTitle,
// //   DialogDescription,
// //   DialogFooter,
// // } from "../components/ui/dialog";

// // import { z } from "zod";

// // import { useState } from "react";
// // import Image from "next/image";
// // import { Label } from "../components/ui/label";
// // import { Textarea } from "../components/ui/textarea";
// // import { Input } from "../components/ui/input";
// // import { useToast } from "../hooks/use-toast";

// // /* ================= TYPES ================= */

// // type EmailCheckStatus = "idle" | "checking" | "valid" | "invalid";

// // async function checkEmail(
// //   email: string
// // ): Promise<{ valid: boolean; reason?: string }> {
// //   try {
// //     const res = await fetch(
// //       `/api/validateEmail?email=${encodeURIComponent(email)}`,
// //       { cache: "no-store" }
// //     );
// //     if (!res.ok) return { valid: true };
// //     return res.json();
// //   } catch {
// //     return { valid: true };
// //   }
// // }

// // const FAKE_NAME_PATTERNS = [
// //   /^(.)\1{2,}$/i,
// //   /^[^aeiou]{5,}$/i,
// //   /^(test|fake|asdf|qwerty|admin|user|anon|anonymous|nobody|noone|noreply|abc|xyz)$/i,
// //   /^[a-z]{1,2}$/i,
// //   /\d{3,}/,
// //   /^(.{1,3})\1{2,}$/i,
// // ];

// // function validateName(value: string): string | null {
// //   const t = value.trim();
// //   if (!t) return "Full name is required.";
// //   if (t.length < 2) return "Name is too short.";
// //   if (t.length > 50) return "Name is too long.";
// //   if (!/^[\p{L}\p{M}'\- ]+$/u.test(t))
// //     return "Name contains invalid characters.";
// //   for (const p of FAKE_NAME_PATTERNS) {
// //     if (p.test(t)) return "Please enter your real name.";
// //   }
// //   return null;
// // }

// // function validateEmailFormat(value: string): string | null {
// //   const t = value.trim().toLowerCase();
// //   if (!t) return "Email is required.";
// //   if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(t))
// //     return "Please enter a valid email address.";
// //   return null;
// // }

// // type Job = {
// //   title?: string;
// //   type?: string;
// //   location?: string;
// //   department?: string;
// //   description?: string;
// //   responsibilities?: string[];
// //   requirements?: string[];
// //   compensation?: string;
// // };

// // type CareersSection = {
// //   title?: string;
// //   tag?: string;
// //   description?: string;
// //   icon?: {
// //     asset?: {
// //       url?: string;
// //     };
// //   };
// //   points?: string[];
// //   jobs?: Job[];
// // };

// // type CareersData = {
// //   SectionTitle?: string;
// //   SectionDescription?: string;
// //   SectionTag?: string;
// //   SectionIcon?: {
// //     asset?: {
// //       url?: string;
// //     };
// //   };
// //   careersSections?: CareersSection[];
// //   application?: {
// //     email?: string;
// //     note?: string;
// //   };
// // };

// // /* ================= COMPONENT ================= */

// // export default function CareersComponent({ data }: { data: CareersData }) {
// //   const [selectedJob, setSelectedJob] = useState<Job | null>(null);
// //   const [applyJob, setApplyJob] = useState<Job | null>(null);
// //   const [form, setForm] = useState({ name: "", email: "", whyHire: "", extracurriculars: "" });
// //   const [resumeFile, setResumeFile] = useState<File | null>(null);
// //   const [errors, setErrors] = useState<Record<string, string>>({});
// //   const { toast } = useToast();

// //   // console.log("CareersComponent data:", data);

// //   const applicationSchema = z.object({
// //   name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
// //   email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
// //   whyHire: z.string().trim().min(20, "Please write at least 20 characters").max(2000, "Must be less than 2000 characters"),
// //   extracurriculars: z.string().trim().max(1000, "Must be less than 1000 characters").optional(),
// // });

// //   const sections = data?.careersSections || [];

// //   // const intro = sections.find((s) =>
// //   //   s.title?.toLowerCase().includes("who")
// //   // );

// //   // const rolesSection = sections.find((s) =>
// //   //   s.title?.toLowerCase().includes("connecting")
// //   // );

// //   const jobsSection = sections.find((s) => s.jobs?.length);

// //   // const internshipSection = sections.find((s) =>
// //   //   s.title?.toLowerCase().includes("intern")
// //   // );

// //   const jobs = jobsSection?.jobs || [];

// //   const openApply = (job: Job) => {
// //     setSelectedJob(null);
// //     setApplyJob(job);
// //     setForm({ name: "", email: "", whyHire: "", extracurriculars: "" });
// //     setResumeFile(null);
// //     setErrors({});
// //   };

// //   const handleSubmit = (e: React.FormEvent) => {
// //     e.preventDefault();
// //     const result = applicationSchema.safeParse(form);
// //     if (!result.success) {
// //       const fieldErrors: Record<string, string> = {};
// //       result.error.errors.forEach((err) => {
// //         if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
// //       });
// //       setErrors(fieldErrors);
// //       return;
// //     }
// //     if (!resumeFile) {
// //       setErrors({ resume: "Please attach your resume" });
// //       return;
// //     }
// //     const data = result.data;
// //     const subject = `Application: ${applyJob?.title ?? ""}`;
// //     const body = [
// //       `Name: ${data.name}`,
// //       `Email: ${data.email}`,
// //       `Position: ${applyJob?.title ?? ""}`,
// //       "",
// //       "Why we should hire me:",
// //       data.whyHire,
// //       "",
// //       "Extracurricular activities / shareable links:",
// //       data.extracurriculars || "—",
// //       "",
// //       `Resume: ${resumeFile.name} (please find attached)`,
// //     ].join("\n");
// //     window.location.href = `mailto:sukshmadarshini@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
// //     toast({
// //       title: "Opening your email client",
// //       description: "Please attach your resume file before sending.",
// //     });
// //     setApplyJob(null);
// //   };

// //   return (
// //     <>
// //     <Navbar />

// //     <div className="min-h-screen bg-background">
// //       {/* HERO */}
// //       <section className="relative pt-10 overflow-hidden">
// //         <div className="gradient-hero py-16 md:py-24">
// //           <div className="container mx-auto px-4 relative z-10">
// //             <div className="flex items-center gap-4 mb-4">
// //               <div className="w-14 h-14 rounded-2xl bg-primary-foreground/10 flex items-center justify-center">
// //                 {/* <Users className="w-7 h-7 text-primary-foreground" /> */}
// //                 {data?.SectionIcon?.asset?.url ? (
// //                                       <Image
// //                                         src={data?.SectionIcon.asset.url}
// //                                         alt="icon"
// //                                         width={28}
// //                                         height={28}
// //                                         className="w-7 h-7 object-contain"
// //                                       />
// //                                     ) : (
// //                                       // <Shield className="w-5 h-5 text-primary-foreground" />
// //                                       null
// //                                     )}
// //               </div>

// //               <span className="text-primary-foreground/70 uppercase text-sm">
// //                 {data?.SectionTag }
// //               </span>
// //             </div>

// //             <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
// //               {data?.SectionTitle }
// //             </h1>

// //             <p className="text-primary-foreground/80 text-lg max-w-2xl">
// //               {data?.SectionDescription}
// //             </p>
// //           </div>
// //         </div>
// //         {/* Wave */}
// //           <div className="relative h-20 overflow-hidden bg-background -mt-1">
// //             <svg
// //               className="absolute -top-1 w-full"
// //               viewBox="0 0 1440 80"
// //               preserveAspectRatio="none"
// //               fill="none"
// //             >
// //               <path
// //                 d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,50 1440,40 L1440,0 L0,0 Z"
// //                 fill="url(#privacyWave)"
// //               />
// //               <defs>
// //                 <linearGradient
// //                   id="privacyWave"
// //                   x1="0%"
// //                   y1="0%"
// //                   x2="100%"
// //                   y2="0%"
// //                 >
// //                   <stop offset="0%" stopColor="hsl(var(--init))" />
// //                   <stop offset="50%" stopColor="hsl(var(--secondary))" />
// //                   <stop offset="100%" stopColor="hsl(var(--accent))" />
// //                 </linearGradient>
// //               </defs>
// //             </svg>
// //           </div>
// //       </section>

// //       {/* CONTENT */}
// //       <section className="container mx-auto px-4 max-w-4xl pb-24">
// //         <div className="space-y-6">
// //             {data?.careersSections?.map((section, index) => (
// //               <div
// //                 key={index}
// //                 className="glass-card rounded-2xl p-6 md:p-8 shadow-soft hover:shadow-glow transition-all duration-300 animate-fade-up"
// //                 style={{ animationDelay: `${index * 0.05}s` }}
// //               >
// //                 <div className="flex items-start gap-4 mb-3">
// //                   <div className="flex items-center gap-4">
// //                     {/* Icon */}
// //                     <div className="w-9 h-9 rounded-xl gradient-accent flex items-center justify-center flex-shrink-0">
// //                       {section.icon?.asset?.url ? (
// //                         <Image
// //                           src={section.icon.asset.url}
// //                           alt="icon"
// //                           width={20}
// //                           height={20}
// //                           className="w-5 h-5 object-contain"
// //                         />
// //                       ) : (
// //                         <Shield className="w-5 h-5 text-primary-foreground" />
// //                       )}
// //                     </div>

// //                     {/* Title */}
// //                     <div>
// //                       <span className="text-xs text-muted-foreground font-medium tracking-wider uppercase">{section.tag}</span>
// //                       <h2 className="font-display text-xl font-semibold text-foreground">
// //                         {section.title}
// //                       </h2>
// //                     </div>
// //                   </div>
// //                 </div>

// //                 {/* Content */}
// //                 <div className="text-foreground/80 leading-relaxed pl-14">
                  
// //                   {/* Description */}
// //                   {section.description && (
// //                     <p className="mb-3">{section.description}</p>
// //                   )}

// //                   {/* Bullet Points */}
// //                     {section.points?.length ? (
// //                       <ul className="space-y-2 ml-1">
// //                         {section.points.map((point, i) => (
// //                           <li key={i} className="flex items-center gap-2">
// //                             <CircleCheckBig className="w-4 h-4 rounded-full text-secondary mt-0.5 flex-shrink-0" />
// //                             {point}
// //                           </li>
// //                         ))}
// //                       </ul>
// //                     ) : null}
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //           <div className="mt-8 glass-card rounded-2xl p-6 md:p-8 shadow-soft hover:shadow-glow transition-all duration-300 animate-fade-up">
// //                 <div className="flex items-start gap-4 mb-3">
// //                   <div className="flex items-center gap-4">
// //                   <div className="w-9 h-9 rounded-xl gradient-accent flex items-center justify-center flex-shrink-0">
// //                     <JobIcon className="w-4 h-4 text-white" />
// //                   </div>
// //                   <div>
// //                     <span className="text-xs text-muted-foreground font-medium tracking-wider uppercase">Open Roles</span>
// //                     <h2 className="font-display text-xl font-semibold text-foreground">
// //                       Available Jobs
// //                     </h2>
// //                   </div>
// //                   </div>
// //                   {/* <span className="text-xs uppercase">Open Roles</span>
// //                   <h3 className="text-lg font-semibold mb-4">
// //                   Available Jobs
// //                 </h3> */}
// //                 </div>


// //                 <div className="grid sm:grid-cols-2 gap-4">
// //                   {jobs.length ? (
// //                     jobs.map((job, i) => (
// //                       <div
// //                         key={i}
// //                         className="glass-card rounded-2xl p-6 md:p-8 shadow-soft hover:shadow-glow transition-all duration-300 animate-fade-up"
// //                       >
// //                         <div className="flex justify-between mb-3">
// //                           <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-accent/10 text-accent text-[10px] font-semibold tracking-wider uppercase">{job.department}</span>
// //                           <span className="text-[10px] text-muted-foreground font-medium tracking-wider uppercase">{job.type}</span>
// //                         </div>

// //                         <h4 className="font-semibold">{job.title}</h4>

// //                         <p className="text-sm mt-2">
// //                           {job.description}
// //                         </p>

// //                         <div className="flex justify-between mt-4">
// //                           <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
// //                             <MapPin className="w-3.5 h-3.5" />
// //                             {job.location}
// //                           </span>

// //                           <Button
// //                             size="sm"
// //                             variant="ghost"
// //                             className="h-8 px-2 text-secondary hover:text-secondary hover:bg-secondary/10"
// //                             onClick={() => setSelectedJob(job)}
// //                           >
// //                             View
// //                             <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
// //                           </Button>
// //                         </div>
// //                       </div>
// //                     ))
// //                   ) : (
// //                     <p>No openings available</p>
// //                   )}
// //                 </div>
// //               </div>
// //       </section>

// //       <Dialog open={!!selectedJob} onOpenChange={(open) => !open && setSelectedJob(null)}>
// //         <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
// //           {selectedJob && (
// //             <>
// //               <DialogHeader>
// //                 <div className="flex flex-wrap items-center gap-2 mb-2">
// //                   <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-accent/10 text-accent text-[10px] font-semibold tracking-wider uppercase">
// //                     {selectedJob.department}
// //                   </span>
// //                   <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
// //                     <Clock className="w-3.5 h-3.5" />
// //                     {selectedJob.type}
// //                   </span>
// //                   <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
// //                     <MapPin className="w-3.5 h-3.5" />
// //                     {selectedJob.location}
// //                   </span>
// //                 </div>
// //                 <DialogTitle className="font-display text-2xl">{selectedJob.title}</DialogTitle>
// //                 <DialogDescription className="text-foreground/70 leading-relaxed pt-1">
// //                   {selectedJob.description}
// //                 </DialogDescription>
// //               </DialogHeader>

// //               <div className="space-y-5 mt-2">
// //                 <div>
// //                   <h4 className="font-display text-sm font-semibold text-foreground mb-2 uppercase tracking-wider">
// //                     Responsibilities
// //                   </h4>
// //                   <ul className="space-y-2">
// //                     {selectedJob.responsibilities?.map((item) => (
// //                       <li key={item} className="flex items-start gap-2 text-sm text-foreground/80">
// //                         <CheckCircle2 className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
// //                         <span>{item}</span>
// //                       </li>
// //                     ))}
// //                   </ul>
// //                 </div>

// //                 <div>
// //                   <h4 className="font-display text-sm font-semibold text-foreground mb-2 uppercase tracking-wider">
// //                     Requirements
// //                   </h4>
// //                   <ul className="space-y-2">
// //                     {selectedJob.requirements?.map((item) => (
// //                       <li key={item} className="flex items-start gap-2 text-sm text-foreground/80">
// //                         <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
// //                         <span>{item}</span>
// //                       </li>
// //                     ))}
// //                   </ul>
// //                 </div>

// //                 <div className="rounded-lg bg-muted/40 border border-border/60 p-4">
// //                   <span className="text-[10px] text-muted-foreground font-semibold tracking-wider uppercase">
// //                     Compensation
// //                   </span>
// //                   <p className="text-sm text-foreground/80 mt-1">{selectedJob.compensation}</p>
// //                 </div>
// //               </div>

// //               <DialogFooter className="mt-4">
// //                 <Button variant="outline" onClick={() => setSelectedJob(null)}>
// //                   Close
// //                 </Button>
// //                 <Button onClick={() => openApply(selectedJob)}>
// //                     <Mail className="w-4 h-4" />
// //                     Apply Now
// //                 </Button>
// //               </DialogFooter>
// //             </>
// //           )}
// //         </DialogContent>
// //       </Dialog>

// //       <Dialog open={!!applyJob} onOpenChange={(open) => !open && setApplyJob(null)}>
// //         <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
// //           {applyJob && (
// //             <form onSubmit={handleSubmit}>
// //               <DialogHeader>
// //                 <DialogTitle className="font-display text-xl">Apply: {applyJob.title}</DialogTitle>
// //                 <DialogDescription>
// //                   Fill in your details below. Your email client will open to send the application — please attach your resume before sending.
// //                 </DialogDescription>
// //               </DialogHeader>

// //               <div className="space-y-4 mt-4">
// //                 <div className="space-y-1.5">
// //                   <Label htmlFor="apply-name">Full name <span className="text-destructive">*</span></Label>
// //                   <Input
// //                     id="apply-name"
// //                     value={form.name}
// //                     onChange={(e) => setForm({ ...form, name: e.target.value })}
// //                     maxLength={100}
// //                     required
// //                   />
// //                   {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
// //                 </div>

// //                 <div className="space-y-1.5">
// //                   <Label htmlFor="apply-email">Email <span className="text-destructive">*</span></Label>
// //                   <Input
// //                     id="apply-email"
// //                     type="email"
// //                     value={form.email}
// //                     onChange={(e) => setForm({ ...form, email: e.target.value })}
// //                     maxLength={255}
// //                     required
// //                   />
// //                   {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
// //                 </div>

// //                 <div className="space-y-1.5">
// //                   <Label htmlFor="apply-why">Why should we hire you <span className="text-destructive">*</span></Label>
// //                   <Textarea
// //                     id="apply-why"
// //                     rows={5}
// //                     value={form.whyHire}
// //                     onChange={(e) => setForm({ ...form, whyHire: e.target.value })}
// //                     maxLength={2000}
// //                     placeholder="Tell us about your strengths, motivation, and fit for this role…"
// //                     required
// //                   />
// //                   {errors.whyHire && <p className="text-xs text-destructive">{errors.whyHire}</p>}
// //                 </div>

// //                 <div className="space-y-1.5">
// //                   <Label htmlFor="apply-resume">Resume <span className="text-destructive">*</span></Label>
// //                   <label
// //                     htmlFor="apply-resume"
// //                     className="flex items-center gap-3 px-3 py-2.5 rounded-md border border-dashed border-input bg-background hover:bg-muted/40 cursor-pointer transition-colors"
// //                   >
// //                     <Upload className="w-4 h-4 text-muted-foreground" />
// //                     <span className="text-sm text-foreground/80 truncate">
// //                       {resumeFile ? resumeFile.name : "Choose a PDF / DOC / DOCX file"}
// //                     </span>
// //                   </label>
// //                   <Input
// //                     id="apply-resume"
// //                     type="file"
// //                     accept=".pdf,.doc,.docx"
// //                     className="hidden"
// //                     onChange={(e) => setResumeFile(e.target.files?.[0] ?? null)}
// //                   />
// //                   {errors.resume && <p className="text-xs text-destructive">{errors.resume}</p>}
// //                 </div>

// //                 <div className="space-y-1.5">
// //                   <Label htmlFor="apply-extra">Extracurricular activities (shareable links)</Label>
// //                   <Textarea
// //                     id="apply-extra"
// //                     rows={3}
// //                     value={form.extracurriculars}
// //                     onChange={(e) => setForm({ ...form, extracurriculars: e.target.value })}
// //                     maxLength={1000}
// //                     placeholder="LinkedIn, GitHub, portfolio, publications, volunteer work…"
// //                   />
// //                   {errors.extracurriculars && <p className="text-xs text-destructive">{errors.extracurriculars}</p>}
// //                 </div>
// //               </div>

// //               <DialogFooter className="mt-6">
// //                 <Button type="button" variant="outline" onClick={() => setApplyJob(null)}>
// //                   Cancel
// //                 </Button>
// //                 <Button type="submit">
// //                   <Mail className="w-4 h-4" />
// //                   Send Application
// //                 </Button>
// //               </DialogFooter>
// //             </form>
// //           )}
// //         </DialogContent>
// //       </Dialog>
// //     </div>
// //     </>
// //   );
// // }

// "use client";

// import {
//   Mail,
//   ArrowRight,
//   MapPin,
//   Briefcase as JobIcon,
//   CheckCircle2,
//   Clock,
//   Shield,
//   CircleCheckBig,
//   Upload,
//   AlertCircle,
//   Loader2,
// } from "lucide-react";

// import { Navbar } from "../components/Navbar";
// import { Button } from "../components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
//   DialogFooter,
// } from "../components/ui/dialog";

// import { z } from "zod";

// import { useState, useRef } from "react";
// import Image from "next/image";
// import { Label } from "../components/ui/label";
// import { Textarea } from "../components/ui/textarea";
// import { Input } from "../components/ui/input";
// import { useToast } from "../hooks/use-toast";

// /* ================= TYPES ================= */

// type EmailCheckStatus = "idle" | "checking" | "valid" | "invalid";

// /* -------------------------------------------------------------------------- */
// /*                            Email validation helpers                        */
// /* -------------------------------------------------------------------------- */

// async function checkEmail(email: string): Promise<{ valid: boolean; reason?: string }> {
//   try {
//     const res = await fetch(`/api/validateEmail?email=${encodeURIComponent(email)}`, {
//       cache: "no-store",
//     });
//     if (!res.ok) return { valid: true };
//     return res.json();
//   } catch {
//     return { valid: true };
//   }
// }

// const FAKE_NAME_PATTERNS = [
//   /^(.)\1{2,}$/i,
//   /^[^aeiou]{5,}$/i,
//   /^(test|fake|asdf|qwerty|admin|user|anon|anonymous|nobody|noone|noreply|abc|xyz)$/i,
//   /^[a-z]{1,2}$/i,
//   /\d{3,}/,
//   /^(.{1,3})\1{2,}$/i,
// ];

// function validateName(value: string): string | null {
//   const t = value.trim();
//   if (!t) return "Full name is required.";
//   if (t.length < 2) return "Name is too short.";
//   if (t.length > 50) return "Name is too long.";
//   if (!/^[\p{L}\p{M}'\- ]+$/u.test(t)) return "Name contains invalid characters.";
//   for (const p of FAKE_NAME_PATTERNS) {
//     if (p.test(t)) return "Please enter your real name.";
//   }
//   return null;
// }

// function validateEmailFormat(value: string): string | null {
//   const t = value.trim().toLowerCase();
//   if (!t) return "Email is required.";
//   if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(t))
//     return "Please enter a valid email address.";
//   return null;
// }

// /* -------------------------------------------------------------------------- */

// type Job = {
//   title?: string;
//   type?: string;
//   location?: string;
//   department?: string;
//   description?: string;
//   responsibilities?: string[];
//   requirements?: string[];
//   compensation?: string;
// };

// type CareersSection = {
//   title?: string;
//   tag?: string;
//   description?: string;
//   icon?: { asset?: { url?: string } };
//   points?: string[];
//   jobs?: Job[];
// };

// type CareersData = {
//   SectionTitle?: string;
//   SectionDescription?: string;
//   SectionTag?: string;
//   SectionIcon?: { asset?: { url?: string } };
//   careersSections?: CareersSection[];
//   application?: { email?: string; note?: string };
// };

// type ApplyForm = {
//   name: string;
//   email: string;
//   whyHire: string;
//   extracurriculars: string;
// };

// /* ================= COMPONENT ================= */

// export default function CareersComponent({ data }: { data: CareersData }) {
//   const [selectedJob, setSelectedJob] = useState<Job | null>(null);
//   const [applyJob, setApplyJob] = useState<Job | null>(null);
//   const [form, setForm] = useState<ApplyForm>({ name: "", email: "", whyHire: "", extracurriculars: "" });
//   const [resumeFile, setResumeFile] = useState<File | null>(null);
//   const [errors, setErrors] = useState<Partial<Record<keyof ApplyForm | "resume", string>>>({});
//   const [touched, setTouched] = useState<Partial<Record<keyof ApplyForm, boolean>>>({});
//   const [emailCheckStatus, setEmailCheckStatus] = useState<EmailCheckStatus>("idle");
//   const [submitting, setSubmitting] = useState(false);
//   const emailDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
//   const { toast } = useToast();

//   const applicationSchema = z.object({
//     whyHire: z
//       .string()
//       .trim()
//       .min(20, "Please write at least 20 characters")
//       .max(2000, "Must be less than 2000 characters"),
//     extracurriculars: z
//       .string()
//       .trim()
//       .max(1000, "Must be less than 1000 characters")
//       .optional(),
//   });

//   const sections = data?.careersSections || [];
//   const jobsSection = sections.find((s) => s.jobs?.length);
//   const jobs = jobsSection?.jobs || [];

//   const openApply = (job: Job) => {
//     setSelectedJob(null);
//     setApplyJob(job);
//     setForm({ name: "", email: "", whyHire: "", extracurriculars: "" });
//     setResumeFile(null);
//     setErrors({});
//     setTouched({});
//     setEmailCheckStatus("idle");
//   };

//   /* ── Email handlers ──────────────────────────────────────────────────────── */

//   async function handleEmailBlur() {
//     setTouched((p) => ({ ...p, email: true }));
//     const formatError = validateEmailFormat(form.email);
//     if (formatError) {
//       setErrors((p) => ({ ...p, email: formatError }));
//       setEmailCheckStatus("idle");
//       return;
//     }
//     setEmailCheckStatus("checking");
//     setErrors((p) => ({ ...p, email: undefined }));
//     try {
//       const result = await checkEmail(form.email);
//       setEmailCheckStatus(result.valid ? "valid" : "invalid");
//       setErrors((p) => ({
//         ...p,
//         email: result.valid ? undefined : (result.reason ?? "This email address could not be verified."),
//       }));
//     } catch {
//       setEmailCheckStatus("idle");
//     }
//   }

//   function handleEmailChange(value: string) {
//     setForm((p) => ({ ...p, email: value }));
//     setEmailCheckStatus("idle");
//     if (touched.email) {
//       const formatError = validateEmailFormat(value);
//       setErrors((p) => ({ ...p, email: formatError ?? undefined }));
//       if (!formatError) {
//         if (emailDebounceRef.current) clearTimeout(emailDebounceRef.current);
//         emailDebounceRef.current = setTimeout(async () => {
//           setEmailCheckStatus("checking");
//           try {
//             const result = await checkEmail(value);
//             setEmailCheckStatus(result.valid ? "valid" : "invalid");
//             setErrors((p) => ({
//               ...p,
//               email: result.valid ? undefined : (result.reason ?? "This email could not be verified."),
//             }));
//           } catch {
//             setEmailCheckStatus("idle");
//           }
//         }, 800);
//       }
//     }
//   }

//   /* ── Generic field handlers ──────────────────────────────────────────────── */

//   function handleFieldChange(field: keyof ApplyForm, value: string) {
//     if (field === "email") {
//       handleEmailChange(value);
//       return;
//     }
//     setForm((p) => ({ ...p, [field]: value }));
//   }

//   function handleBlur(field: keyof ApplyForm) {
//     if (field === "email") return;
//     setTouched((p) => ({ ...p, [field]: true }));

//     if (field === "name") {
//       const err = validateName(form.name);
//       setErrors((p) => ({ ...p, name: err ?? undefined }));
//       return;
//     }

//     const result = applicationSchema.safeParse(form);
//     const fieldError = result.success
//       ? undefined
//       : result.error.issues.find((i) => i.path[0] === field)?.message;
//     setErrors((p) => ({ ...p, [field]: fieldError }));
//   }

//   /* ── Submit ──────────────────────────────────────────────────────────────── */

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     setTouched({ name: true, email: true, whyHire: true, extracurriculars: true });

//     if (emailCheckStatus === "checking") {
//       toast({ title: "Please wait", description: "Verifying email address…" });
//       return;
//     }

//     const newErrors: Partial<Record<keyof ApplyForm | "resume", string>> = {};

//     // Name
//     const nameError = validateName(form.name);
//     if (nameError) newErrors.name = nameError;

//     // Email format
//     const emailFormatError = validateEmailFormat(form.email);
//     if (emailFormatError) {
//       newErrors.email = emailFormatError;
//     } else if (emailCheckStatus === "invalid") {
//       newErrors.email = errors.email ?? "This email address could not be verified.";
//     } else if (emailCheckStatus === "idle") {
//       // Not checked yet — run it now before proceeding
//       setSubmitting(true);
//       setEmailCheckStatus("checking");
//       const result = await checkEmail(form.email);
//       setEmailCheckStatus(result.valid ? "valid" : "invalid");
//       if (!result.valid) {
//         newErrors.email = result.reason ?? "This email address could not be verified.";
//       }
//       setSubmitting(false);
//     }

//     // Zod fields
//     const zodResult = applicationSchema.safeParse(form);
//     if (!zodResult.success) {
//       zodResult.error.issues.forEach((i) => {
//         if (i.path[0]) newErrors[i.path[0] as keyof ApplyForm] = i.message;
//       });
//     }

//     // Resume
//     if (!resumeFile) newErrors.resume = "Please attach your resume";

//     setErrors(newErrors);

//     if (Object.values(newErrors).some(Boolean)) {
//       toast({
//         title: "Please fix the errors",
//         description: "Some fields contain invalid values.",
//         variant: "destructive",
//       });
//       return;
//     }

//     // All good — open mailto
//     const subject = `Application: ${applyJob?.title ?? ""}`;
//     const body = [
//       `Name: ${form.name}`,
//       `Email: ${form.email}`,
//       `Position: ${applyJob?.title ?? ""}`,
//       "",
//       "Why we should hire me:",
//       form.whyHire,
//       "",
//       "Extracurricular activities / shareable links:",
//       form.extracurriculars || "—",
//       "",
//       `Resume: ${resumeFile!.name} (please find attached)`,
//     ].join("\n");

//     window.location.href = `mailto:sukshmadarshini@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

//     toast({
//       title: "Opening your email client",
//       description: "Please attach your resume file before sending.",
//     });

//     setApplyJob(null);
//   };

//   /* ── Sub-components ──────────────────────────────────────────────────────── */

//   function FieldError({ field }: { field: keyof ApplyForm | "resume" }) {
//     const key = field as string;
//     if (!touched[key as keyof ApplyForm] && field !== "resume") return null;
//     if (!errors[field]) return null;
//     return (
//       <p className="flex items-center gap-1 mt-1 text-xs text-destructive">
//         <AlertCircle className="w-3 h-3 shrink-0" />
//         {errors[field]}
//       </p>
//     );
//   }

//   function EmailIndicator() {
//     if (emailCheckStatus === "checking")
//       return <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 animate-spin text-muted-foreground" />;
//     if (emailCheckStatus === "valid")
//       return <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500" />;
//     if (emailCheckStatus === "invalid")
//       return <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-destructive" />;
//     return null;
//   }

//   const emailBorderClass =
//     touched.email && errors.email
//       ? "border-destructive focus-visible:ring-destructive"
//       : emailCheckStatus === "valid"
//       ? "border-green-500 focus-visible:ring-green-500"
//       : "";

//   /* ── Render ──────────────────────────────────────────────────────────────── */

//   return (
//     <>
//       <Navbar />

//       <div className="min-h-screen bg-background">
//         {/* HERO */}
//         <section className="relative pt-10 overflow-hidden">
//           <div className="gradient-hero py-16 md:py-24">
//             <div className="container mx-auto px-4 relative z-10">
//               <div className="flex items-center gap-4 mb-4">
//                 <div className="w-14 h-14 rounded-2xl bg-primary-foreground/10 flex items-center justify-center">
//                   {data?.SectionIcon?.asset?.url ? (
//                     <Image
//                       src={data.SectionIcon.asset.url}
//                       alt="icon"
//                       width={28}
//                       height={28}
//                       className="w-7 h-7 object-contain"
//                     />
//                   ) : null}
//                 </div>
//                 <span className="text-primary-foreground/70 uppercase text-sm">{data?.SectionTag}</span>
//               </div>

//               <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
//                 {data?.SectionTitle}
//               </h1>
//               <p className="text-primary-foreground/80 text-lg max-w-2xl">{data?.SectionDescription}</p>
//             </div>
//           </div>

//           {/* Wave */}
//           <div className="relative h-20 overflow-hidden bg-background -mt-1">
//             <svg className="absolute -top-1 w-full" viewBox="0 0 1440 80" preserveAspectRatio="none" fill="none">
//               <path
//                 d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,50 1440,40 L1440,0 L0,0 Z"
//                 fill="url(#privacyWave)"
//               />
//               <defs>
//                 <linearGradient id="privacyWave" x1="0%" y1="0%" x2="100%" y2="0%">
//                   <stop offset="0%" stopColor="hsl(var(--init))" />
//                   <stop offset="50%" stopColor="hsl(var(--secondary))" />
//                   <stop offset="100%" stopColor="hsl(var(--accent))" />
//                 </linearGradient>
//               </defs>
//             </svg>
//           </div>
//         </section>

//         {/* CONTENT */}
//         <section className="container mx-auto px-4 max-w-4xl pb-24">
//           <div className="space-y-6">
//             {data?.careersSections?.map((section, index) => (
//               <div
//                 key={index}
//                 className="glass-card rounded-2xl p-6 md:p-8 shadow-soft hover:shadow-glow transition-all duration-300 animate-fade-up"
//                 style={{ animationDelay: `${index * 0.05}s` }}
//               >
//                 <div className="flex items-start gap-4 mb-3">
//                   <div className="flex items-center gap-4">
//                     <div className="w-9 h-9 rounded-xl gradient-accent flex items-center justify-center flex-shrink-0">
//                       {section.icon?.asset?.url ? (
//                         <Image
//                           src={section.icon.asset.url}
//                           alt="icon"
//                           width={20}
//                           height={20}
//                           className="w-5 h-5 object-contain"
//                         />
//                       ) : (
//                         <Shield className="w-5 h-5 text-primary-foreground" />
//                       )}
//                     </div>
//                     <div>
//                       <span className="text-xs text-muted-foreground font-medium tracking-wider uppercase">
//                         {section.tag}
//                       </span>
//                       <h2 className="font-display text-xl font-semibold text-foreground">{section.title}</h2>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="text-foreground/80 leading-relaxed pl-14">
//                   {section.description && <p className="mb-3">{section.description}</p>}
//                   {section.points?.length ? (
//                     <ul className="space-y-2 ml-1">
//                       {section.points.map((point, i) => (
//                         <li key={i} className="flex items-center gap-2">
//                           <CircleCheckBig className="w-4 h-4 rounded-full text-secondary mt-0.5 flex-shrink-0" />
//                           {point}
//                         </li>
//                       ))}
//                     </ul>
//                   ) : null}
//                 </div>
//               </div>
//             ))}
//           </div>

//           <div className="mt-8 glass-card rounded-2xl p-6 md:p-8 shadow-soft hover:shadow-glow transition-all duration-300 animate-fade-up">
//             <div className="flex items-start gap-4 mb-3">
//               <div className="flex items-center gap-4">
//                 <div className="w-9 h-9 rounded-xl gradient-accent flex items-center justify-center flex-shrink-0">
//                   <JobIcon className="w-4 h-4 text-white" />
//                 </div>
//                 <div>
//                   <span className="text-xs text-muted-foreground font-medium tracking-wider uppercase">Open Roles</span>
//                   <h2 className="font-display text-xl font-semibold text-foreground">Available Jobs</h2>
//                 </div>
//               </div>
//             </div>

//             <div className="grid sm:grid-cols-2 gap-4">
//               {jobs.length ? (
//                 jobs.map((job, i) => (
//                   <div
//                     key={i}
//                     className="glass-card rounded-2xl p-6 md:p-8 shadow-soft hover:shadow-glow transition-all duration-300 animate-fade-up"
//                   >
//                     <div className="flex justify-between mb-3">
//                       <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-accent/10 text-accent text-[10px] font-semibold tracking-wider uppercase">
//                         {job.department}
//                       </span>
//                       <span className="text-[10px] text-muted-foreground font-medium tracking-wider uppercase">
//                         {job.type}
//                       </span>
//                     </div>

//                     <h4 className="font-semibold">{job.title}</h4>
//                     <p className="text-sm mt-2">{job.description}</p>

//                     <div className="flex justify-between mt-4">
//                       <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
//                         <MapPin className="w-3.5 h-3.5" />
//                         {job.location}
//                       </span>
//                       <Button
//                         size="sm"
//                         variant="ghost"
//                         className="h-8 px-2 text-secondary hover:text-secondary hover:bg-secondary/10"
//                         onClick={() => setSelectedJob(job)}
//                       >
//                         View
//                         <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
//                       </Button>
//                     </div>
//                   </div>
//                 ))
//               ) : (
//                 <p>No openings available</p>
//               )}
//             </div>
//           </div>
//         </section>

//         {/* Job detail dialog */}
//         <Dialog open={!!selectedJob} onOpenChange={(open) => !open && setSelectedJob(null)}>
//           <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
//             {selectedJob && (
//               <>
//                 <DialogHeader>
//                   <div className="flex flex-wrap items-center gap-2 mb-2">
//                     <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-accent/10 text-accent text-[10px] font-semibold tracking-wider uppercase">
//                       {selectedJob.department}
//                     </span>
//                     <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
//                       <Clock className="w-3.5 h-3.5" />
//                       {selectedJob.type}
//                     </span>
//                     <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
//                       <MapPin className="w-3.5 h-3.5" />
//                       {selectedJob.location}
//                     </span>
//                   </div>
//                   <DialogTitle className="font-display text-2xl">{selectedJob.title}</DialogTitle>
//                   <DialogDescription className="text-foreground/70 leading-relaxed pt-1">
//                     {selectedJob.description}
//                   </DialogDescription>
//                 </DialogHeader>

//                 <div className="space-y-5 mt-2">
//                   <div>
//                     <h4 className="font-display text-sm font-semibold text-foreground mb-2 uppercase tracking-wider">
//                       Responsibilities
//                     </h4>
//                     <ul className="space-y-2">
//                       {selectedJob.responsibilities?.map((item) => (
//                         <li key={item} className="flex items-start gap-2 text-sm text-foreground/80">
//                           <CheckCircle2 className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
//                           <span>{item}</span>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>

//                   <div>
//                     <h4 className="font-display text-sm font-semibold text-foreground mb-2 uppercase tracking-wider">
//                       Requirements
//                     </h4>
//                     <ul className="space-y-2">
//                       {selectedJob.requirements?.map((item) => (
//                         <li key={item} className="flex items-start gap-2 text-sm text-foreground/80">
//                           <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
//                           <span>{item}</span>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>

//                   <div className="rounded-lg bg-muted/40 border border-border/60 p-4">
//                     <span className="text-[10px] text-muted-foreground font-semibold tracking-wider uppercase">
//                       Compensation
//                     </span>
//                     <p className="text-sm text-foreground/80 mt-1">{selectedJob.compensation}</p>
//                   </div>
//                 </div>

//                 <DialogFooter className="mt-4">
//                   <Button variant="outline" onClick={() => setSelectedJob(null)}>Close</Button>
//                   <Button onClick={() => openApply(selectedJob)}>
//                     <Mail className="w-4 h-4" />
//                     Apply Now
//                   </Button>
//                 </DialogFooter>
//               </>
//             )}
//           </DialogContent>
//         </Dialog>

//         {/* Apply dialog */}
//         <Dialog open={!!applyJob} onOpenChange={(open) => !open && setApplyJob(null)}>
//           <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
//             {applyJob && (
//               <form onSubmit={handleSubmit}>
//                 <DialogHeader>
//                   <DialogTitle className="font-display text-xl">Apply: {applyJob.title}</DialogTitle>
//                   <DialogDescription>
//                     Fill in your details below. Your email client will open to send the application — please attach your resume before sending.
//                   </DialogDescription>
//                 </DialogHeader>

//                 <div className="space-y-4 mt-4">
//                   {/* Name */}
//                   <div className="space-y-1.5">
//                     <Label htmlFor="apply-name">
//                       Full name <span className="text-destructive">*</span>
//                     </Label>
//                     <Input
//                       id="apply-name"
//                       value={form.name}
//                       onChange={(e) => handleFieldChange("name", e.target.value)}
//                       onBlur={() => handleBlur("name")}
//                       maxLength={100}
//                       className={touched.name && errors.name ? "border-destructive focus-visible:ring-destructive" : ""}
//                       required
//                     />
//                     <FieldError field="name" />
//                   </div>

//                   {/* Email */}
//                   <div className="space-y-1.5">
//                     <Label htmlFor="apply-email">
//                       Email <span className="text-destructive">*</span>
//                     </Label>
//                     <div className="relative">
//                       <Input
//                         id="apply-email"
//                         type="email"
//                         value={form.email}
//                         onChange={(e) => handleFieldChange("email", e.target.value)}
//                         onBlur={handleEmailBlur}
//                         maxLength={255}
//                         className={`pr-9 ${emailBorderClass}`}
//                         required
//                       />
//                       <EmailIndicator />
//                     </div>
//                     <FieldError field="email" />
//                   </div>

//                   {/* Why hire */}
//                   <div className="space-y-1.5">
//                     <Label htmlFor="apply-why">
//                       Why should we hire you <span className="text-destructive">*</span>
//                     </Label>
//                     <Textarea
//                       id="apply-why"
//                       rows={5}
//                       value={form.whyHire}
//                       onChange={(e) => handleFieldChange("whyHire", e.target.value)}
//                       onBlur={() => handleBlur("whyHire")}
//                       maxLength={2000}
//                       placeholder="Tell us about your strengths, motivation, and fit for this role…"
//                       className={touched.whyHire && errors.whyHire ? "border-destructive focus-visible:ring-destructive" : ""}
//                       required
//                     />
//                     <FieldError field="whyHire" />
//                   </div>

//                   {/* Resume */}
//                   <div className="space-y-1.5">
//                     <Label htmlFor="apply-resume">
//                       Resume <span className="text-destructive">*</span>
//                     </Label>
//                     <label
//                       htmlFor="apply-resume"
//                       className="flex items-center gap-3 px-3 py-2.5 rounded-md border border-dashed border-input bg-background hover:bg-muted/40 cursor-pointer transition-colors"
//                     >
//                       <Upload className="w-4 h-4 text-muted-foreground" />
//                       <span className="text-sm text-foreground/80 truncate">
//                         {resumeFile ? resumeFile.name : "Choose a PDF / DOC / DOCX file"}
//                       </span>
//                     </label>
//                     <Input
//                       id="apply-resume"
//                       type="file"
//                       accept=".pdf,.doc,.docx"
//                       className="hidden"
//                       onChange={(e) => setResumeFile(e.target.files?.[0] ?? null)}
//                     />
//                     <FieldError field="resume" />
//                   </div>

//                   {/* Extracurriculars */}
//                   <div className="space-y-1.5">
//                     <Label htmlFor="apply-extra">Extracurricular activities (shareable links)</Label>
//                     <Textarea
//                       id="apply-extra"
//                       rows={3}
//                       value={form.extracurriculars}
//                       onChange={(e) => handleFieldChange("extracurriculars", e.target.value)}
//                       onBlur={() => handleBlur("extracurriculars")}
//                       maxLength={1000}
//                       placeholder="LinkedIn, GitHub, portfolio, publications, volunteer work…"
//                     />
//                     <FieldError field="extracurriculars" />
//                   </div>
//                 </div>

//                 <DialogFooter className="mt-6">
//                   <Button type="button" variant="outline" onClick={() => setApplyJob(null)}>
//                     Cancel
//                   </Button>
//                   <Button type="submit" disabled={submitting}>
//                     {submitting ? (
//                       <Loader2 className="w-4 h-4 animate-spin" />
//                     ) : (
//                       <Mail className="w-4 h-4" />
//                     )}
//                     Send Application
//                   </Button>
//                 </DialogFooter>
//               </form>
//             )}
//           </DialogContent>
//         </Dialog>
//       </div>
//     </>
//   );
// }

"use client";

import {
  Mail,
  ArrowRight,
  MapPin,
  Briefcase as JobIcon,
  CheckCircle2,
  Clock,
  Shield,
  CircleCheckBig,
  Upload,
  AlertCircle,
  Loader2,
} from "lucide-react";

import { Navbar } from "../components/Navbar";
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../components/ui/dialog";

import { z } from "zod";

import { useState, useRef } from "react";
import Image from "next/image";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Input } from "../components/ui/input";
import { useToast } from "../hooks/use-toast";

/* ================= TYPES ================= */

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

const FAKE_NAME_PATTERNS = [
  /^(.)\1{2,}$/i,
  /^[^aeiou]{5,}$/i,
  /^(test|fake|asdf|qwerty|admin|user|anon|anonymous|nobody|noone|noreply|abc|xyz)$/i,
  /^[a-z]{1,2}$/i,
  /\d{3,}/,
  /^(.{1,3})\1{2,}$/i,
];

function validateName(value: string): string | null {
  const t = value.trim();
  if (!t) return "Full name is required.";
  if (t.length < 2) return "Name is too short.";
  if (t.length > 50) return "Name is too long.";
  if (!/^[\p{L}\p{M}'\- ]+$/u.test(t)) return "Name contains invalid characters.";
  for (const p of FAKE_NAME_PATTERNS) {
    if (p.test(t)) return "Please enter your real name.";
  }
  return null;
}

function validateEmailFormat(value: string): string | null {
  const t = value.trim().toLowerCase();
  if (!t) return "Email is required.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(t))
    return "Please enter a valid email address.";
  return null;
}

/* -------------------------------------------------------------------------- */

type Job = {
  title?: string;
  type?: string;
  location?: string;
  department?: string;
  description?: string;
  responsibilities?: string[];
  requirements?: string[];
  compensation?: string;
};

type CareersSection = {
  title?: string;
  tag?: string;
  description?: string;
  icon?: { asset?: { url?: string } };
  points?: string[];
  jobs?: Job[];
};

type CareersData = {
  SectionTitle?: string;
  SectionDescription?: string;
  SectionTag?: string;
  SectionIcon?: { asset?: { url?: string } };
  careersSections?: CareersSection[];
  application?: { email?: string; note?: string };
};

type ApplyForm = {
  name: string;
  email: string;
  whyHire: string;
  extracurriculars: string;
};

/* ================= SHARED UI COMPONENTS ================= */

function FieldError({
  field,
  errors,
  touched,
}: {
  field: keyof ApplyForm | "resume";
  errors: Partial<Record<keyof ApplyForm | "resume", string>>;
  touched: Partial<Record<keyof ApplyForm, boolean>>;
}) {
  if (field !== "resume" && !touched[field as keyof ApplyForm]) return null;
  if (!errors[field]) return null;
  return (
    <p className="flex items-center gap-1 mt-1 text-xs text-destructive">
      <AlertCircle className="w-3 h-3 shrink-0" />
      {errors[field]}
    </p>
  );
}

function EmailIndicator({ status }: { status: EmailCheckStatus }) {
  if (status === "checking")
    return <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 animate-spin text-muted-foreground" />;
  if (status === "valid")
    return <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500" />;
  if (status === "invalid")
    return <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-destructive" />;
  return null;
}

/* ================= COMPONENT ================= */

export default function CareersComponent({ data }: { data: CareersData }) {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [applyJob, setApplyJob] = useState<Job | null>(null);
  const [form, setForm] = useState<ApplyForm>({ name: "", email: "", whyHire: "", extracurriculars: "" });
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Partial<Record<keyof ApplyForm | "resume", string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof ApplyForm, boolean>>>({});
  const [emailCheckStatus, setEmailCheckStatus] = useState<EmailCheckStatus>("idle");
  const [submitting, setSubmitting] = useState(false);
  const emailDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { toast } = useToast();

  const applicationSchema = z.object({
    whyHire: z
      .string()
      .trim()
      .min(20, "Please write at least 20 characters")
      .max(2000, "Must be less than 2000 characters"),
    extracurriculars: z
      .string()
      .trim()
      .max(1000, "Must be less than 1000 characters")
      .optional(),
  });

  const sections = data?.careersSections || [];
  const jobsSection = sections.find((s) => s.jobs?.length);
  const jobs = jobsSection?.jobs || [];

  const openApply = (job: Job) => {
    setSelectedJob(null);
    setApplyJob(job);
    setForm({ name: "", email: "", whyHire: "", extracurriculars: "" });
    setResumeFile(null);
    setErrors({});
    setTouched({});
    setEmailCheckStatus("idle");
  };

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

  /* ── Generic field handlers ──────────────────────────────────────────────── */

  function handleFieldChange(field: keyof ApplyForm, value: string) {
    if (field === "email") {
      handleEmailChange(value);
      return;
    }
    setForm((p) => ({ ...p, [field]: value }));
  }

  function handleBlur(field: keyof ApplyForm) {
    if (field === "email") return;
    setTouched((p) => ({ ...p, [field]: true }));

    if (field === "name") {
      const err = validateName(form.name);
      setErrors((p) => ({ ...p, name: err ?? undefined }));
      return;
    }

    const result = applicationSchema.safeParse(form);
    const fieldError = result.success
      ? undefined
      : result.error.issues.find((i) => i.path[0] === field)?.message;
    setErrors((p) => ({ ...p, [field]: fieldError }));
  }

  /* ── Submit ──────────────────────────────────────────────────────────────── */

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   setTouched({ name: true, email: true, whyHire: true, extracurriculars: true });

  //   if (emailCheckStatus === "checking") {
  //     toast({ title: "Please wait", description: "Verifying email address…" });
  //     return;
  //   }

  //   const newErrors: Partial<Record<keyof ApplyForm | "resume", string>> = {};

  //   // Name
  //   const nameError = validateName(form.name);
  //   if (nameError) newErrors.name = nameError;

  //   // Email format
  //   const emailFormatError = validateEmailFormat(form.email);
  //   if (emailFormatError) {
  //     newErrors.email = emailFormatError;
  //   } else if (emailCheckStatus === "invalid") {
  //     newErrors.email = errors.email ?? "This email address could not be verified.";
  //   } else if (emailCheckStatus === "idle") {
  //     // Not checked yet — run it now before proceeding
  //     setSubmitting(true);
  //     setEmailCheckStatus("checking");
  //     const result = await checkEmail(form.email);
  //     setEmailCheckStatus(result.valid ? "valid" : "invalid");
  //     if (!result.valid) {
  //       newErrors.email = result.reason ?? "This email address could not be verified.";
  //     }
  //     setSubmitting(false);
  //   }

  //   // Zod fields
  //   const zodResult = applicationSchema.safeParse(form);
  //   if (!zodResult.success) {
  //     zodResult.error.issues.forEach((i) => {
  //       if (i.path[0]) newErrors[i.path[0] as keyof ApplyForm] = i.message;
  //     });
  //   }

  //   // Resume
  //   if (!resumeFile) newErrors.resume = "Please attach your resume";

  //   setErrors(newErrors);

  //   if (Object.values(newErrors).some(Boolean)) {
  //     toast({
  //       title: "Please fix the errors",
  //       description: "Some fields contain invalid values.",
  //       variant: "destructive",
  //     });
  //     return;
  //   }

  //   // All good — open mailto
  //   const subject = `Application: ${applyJob?.title ?? ""}`;
  //   const body = [
  //     `Name: ${form.name}`,
  //     `Email: ${form.email}`,
  //     `Position: ${applyJob?.title ?? ""}`,
  //     "",
  //     "Why we should hire me:",
  //     form.whyHire,
  //     "",
  //     "Extracurricular activities / shareable links:",
  //     form.extracurriculars || "—",
  //     "",
  //     `Resume: ${resumeFile!.name} (please find attached)`,
  //   ].join("\n");

  //   window.location.href = `mailto:sukshmadarshini@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  //   toast({
  //     title: "Opening your email client",
  //     description: "Please attach your resume file before sending.",
  //   });

  //   setApplyJob(null);
  // };

  // const emailBorderClass =
  //   touched.email && errors.email
  //     ? "border-destructive focus-visible:ring-destructive"
  //     : emailCheckStatus === "valid"
  //     ? "border-green-500 focus-visible:ring-green-500"
  //     : "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setTouched({ name: true, email: true, whyHire: true, extracurriculars: true });

    if (emailCheckStatus === "checking") {
      toast({ title: "Please wait", description: "Verifying email address…" });
      return;
    }

    const newErrors: Partial<Record<keyof ApplyForm | "resume", string>> = {};

    // Name
    const nameError = validateName(form.name);
    if (nameError) newErrors.name = nameError;

    // Email format
    const emailFormatError = validateEmailFormat(form.email);
    if (emailFormatError) {
      newErrors.email = emailFormatError;
    } else if (emailCheckStatus === "invalid") {
      newErrors.email = errors.email ?? "This email address could not be verified.";
    } else if (emailCheckStatus === "idle") {
      setSubmitting(true);
      setEmailCheckStatus("checking");
      const result = await checkEmail(form.email);
      setEmailCheckStatus(result.valid ? "valid" : "invalid");
      if (!result.valid) {
        newErrors.email = result.reason ?? "This email address could not be verified.";
      }
      setSubmitting(false);
    }

    // Zod fields
    const zodResult = applicationSchema.safeParse(form);
    if (!zodResult.success) {
      zodResult.error.issues.forEach((i) => {
        if (i.path[0]) newErrors[i.path[0] as keyof ApplyForm] = i.message;
      });
    }

    // Resume
    if (!resumeFile) newErrors.resume = "Please attach your resume";

    setErrors(newErrors);

    if (Object.values(newErrors).some(Boolean)) {
      toast({
        title: "Please fix the errors",
        description: "Some fields contain invalid values.",
        variant: "destructive",
      });
      return;
    }

    // ── Send via API ────────────────────────────────────────────────────────
    try {
      setSubmitting(true);

      const fd = new FormData();
      fd.append("name",             form.name);
      fd.append("email",            form.email);
      fd.append("position",         applyJob?.title ?? "");
      fd.append("whyHire",          form.whyHire);
      fd.append("extracurriculars", form.extracurriculars ?? "");
      fd.append("resume",           resumeFile!); // File object — browser sets multipart boundary automatically

      const res = await fetch("/api/careerEmail", {
        method: "POST",
        body: fd,
        // ↑ Do NOT set Content-Type manually; the browser must set it with the boundary
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        toast({
          title: "Submission failed",
          description: json.error ?? "Something went wrong. Please try again.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Application sent! ✅",
        description: "We've received your application and will be in touch soon.",
      });

      setApplyJob(null);

    } catch {
      toast({
        title: "Network error",
        description: "Could not reach the server. Please check your connection and try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const emailBorderClass =
    touched.email && errors.email
      ? "border-destructive focus-visible:ring-destructive"
      : emailCheckStatus === "valid"
      ? "border-green-500 focus-visible:ring-green-500"
      : "";

      
  /* ── Render ──────────────────────────────────────────────────────────────── */

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-background">
        {/* HERO */}
        <section className="relative pt-10 overflow-hidden">
          <div className="gradient-hero py-16 md:py-24">
            <div className="container mx-auto px-4 relative z-10">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-primary-foreground/10 flex items-center justify-center">
                  {data?.SectionIcon?.asset?.url ? (
                    <Image
                      src={data.SectionIcon.asset.url}
                      alt="icon"
                      width={28}
                      height={28}
                      className="w-7 h-7 object-contain"
                    />
                  ) : null}
                </div>
                <span className="text-primary-foreground/70 uppercase text-sm">{data?.SectionTag}</span>
              </div>

              <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
                {data?.SectionTitle}
              </h1>
              <p className="text-primary-foreground/80 text-lg max-w-2xl">{data?.SectionDescription}</p>
            </div>
          </div>

          {/* Wave */}
          <div className="relative h-20 overflow-hidden bg-background -mt-1">
            <svg className="absolute -top-1 w-full" viewBox="0 0 1440 80" preserveAspectRatio="none" fill="none">
              <path
                d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,50 1440,40 L1440,0 L0,0 Z"
                fill="url(#privacyWave)"
              />
              <defs>
                <linearGradient id="privacyWave" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="hsl(var(--init))" />
                  <stop offset="50%" stopColor="hsl(var(--secondary))" />
                  <stop offset="100%" stopColor="hsl(var(--accent))" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </section>

        {/* CONTENT */}
        <section className="container mx-auto px-4 max-w-4xl pb-24">
          <div className="space-y-6">
            {data?.careersSections?.map((section, index) => (
              <div
                key={index}
                className="glass-card rounded-2xl p-6 md:p-8 shadow-soft hover:shadow-glow transition-all duration-300 animate-fade-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex items-start gap-4 mb-3">
                  <div className="flex items-center gap-4">
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
                    <div>
                      <span className="text-xs text-muted-foreground font-medium tracking-wider uppercase">
                        {section.tag}
                      </span>
                      <h2 className="font-display text-xl font-semibold text-foreground">{section.title}</h2>
                    </div>
                  </div>
                </div>

                <div className="text-foreground/80 leading-relaxed pl-14">
                  {section.description && <p className="mb-3">{section.description}</p>}
                  {section.points?.length ? (
                    <ul className="space-y-2 ml-1">
                      {section.points.map((point, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <CircleCheckBig className="w-4 h-4 rounded-full text-secondary mt-0.5 flex-shrink-0" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 glass-card rounded-2xl p-6 md:p-8 shadow-soft hover:shadow-glow transition-all duration-300 animate-fade-up">
            <div className="flex items-start gap-4 mb-3">
              <div className="flex items-center gap-4">
                <div className="w-9 h-9 rounded-xl gradient-accent flex items-center justify-center flex-shrink-0">
                  <JobIcon className="w-4 h-4 text-white" />
                </div>
                <div>
                  <span className="text-xs text-muted-foreground font-medium tracking-wider uppercase">Open Roles</span>
                  <h2 className="font-display text-xl font-semibold text-foreground">Available Jobs</h2>
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {jobs.length ? (
                jobs.map((job, i) => (
                  <div
                    key={i}
                    className="glass-card rounded-2xl p-6 md:p-8 shadow-soft hover:shadow-glow transition-all duration-300 animate-fade-up"
                  >
                    <div className="flex justify-between mb-3">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-accent/10 text-accent text-[10px] font-semibold tracking-wider uppercase">
                        {job.department}
                      </span>
                      <span className="text-[10px] text-muted-foreground font-medium tracking-wider uppercase">
                        {job.type}
                      </span>
                    </div>

                    <h4 className="font-semibold">{job.title}</h4>
                    <p className="text-sm mt-2">{job.description}</p>

                    <div className="flex justify-between mt-4">
                      <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                        <MapPin className="w-3.5 h-3.5" />
                        {job.location}
                      </span>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 px-2 text-secondary hover:text-secondary hover:bg-secondary/10"
                        onClick={() => setSelectedJob(job)}
                      >
                        View
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <p>No openings available</p>
              )}
            </div>
          </div>
        </section>

        {/* Job detail dialog */}
        <Dialog open={!!selectedJob} onOpenChange={(open) => !open && setSelectedJob(null)}>
          <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
            {selectedJob && (
              <>
                <DialogHeader>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-accent/10 text-accent text-[10px] font-semibold tracking-wider uppercase">
                      {selectedJob.department}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Clock className="w-3.5 h-3.5" />
                      {selectedJob.type}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                      <MapPin className="w-3.5 h-3.5" />
                      {selectedJob.location}
                    </span>
                  </div>
                  <DialogTitle className="font-display text-2xl">{selectedJob.title}</DialogTitle>
                  <DialogDescription className="text-foreground/70 leading-relaxed pt-1">
                    {selectedJob.description}
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-5 mt-2">
                  <div>
                    <h4 className="font-display text-sm font-semibold text-foreground mb-2 uppercase tracking-wider">
                      Responsibilities
                    </h4>
                    <ul className="space-y-2">
                      {selectedJob.responsibilities?.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-foreground/80">
                          <CheckCircle2 className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-display text-sm font-semibold text-foreground mb-2 uppercase tracking-wider">
                      Requirements
                    </h4>
                    <ul className="space-y-2">
                      {selectedJob.requirements?.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-foreground/80">
                          <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-lg bg-muted/40 border border-border/60 p-4">
                    <span className="text-[10px] text-muted-foreground font-semibold tracking-wider uppercase">
                      Compensation
                    </span>
                    <p className="text-sm text-foreground/80 mt-1">{selectedJob.compensation}</p>
                  </div>
                </div>

                <DialogFooter className="mt-4">
                  <Button variant="outline" onClick={() => setSelectedJob(null)}>Close</Button>
                  <Button onClick={() => openApply(selectedJob)}>
                    <Mail className="w-4 h-4" />
                    Apply Now
                  </Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* Apply dialog */}
        <Dialog open={!!applyJob} onOpenChange={(open) => !open && setApplyJob(null)}>
          <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
            {applyJob && (
              <form onSubmit={handleSubmit}>
                <DialogHeader>
                  <DialogTitle className="font-display text-xl">Apply: {applyJob.title}</DialogTitle>
                  <DialogDescription>
                    Fill in your details below. Your email client will open to send the application — please attach your resume before sending.
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 mt-4">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <Label htmlFor="apply-name">
                      Full name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="apply-name"
                      value={form.name}
                      onChange={(e) => handleFieldChange("name", e.target.value)}
                      onBlur={() => handleBlur("name")}
                      maxLength={100}
                      className={touched.name && errors.name ? "border-destructive focus-visible:ring-destructive" : ""}
                      required
                    />
                    <FieldError field="name" errors={errors} touched={touched} />
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <Label htmlFor="apply-email">
                      Email <span className="text-destructive">*</span>
                    </Label>
                    <div className="relative">
                      <Input
                        id="apply-email"
                        type="email"
                        value={form.email}
                        onChange={(e) => handleFieldChange("email", e.target.value)}
                        onBlur={handleEmailBlur}
                        maxLength={255}
                        className={`pr-9 ${emailBorderClass}`}
                        required
                      />
                      <EmailIndicator status={emailCheckStatus} />
                    </div>
                    <FieldError field="email" errors={errors} touched={touched} />
                  </div>

                  {/* Why hire */}
                  <div className="space-y-1.5">
                    <Label htmlFor="apply-why">
                      Why should we hire you <span className="text-destructive">*</span>
                    </Label>
                    <Textarea
                      id="apply-why"
                      rows={5}
                      value={form.whyHire}
                      onChange={(e) => handleFieldChange("whyHire", e.target.value)}
                      onBlur={() => handleBlur("whyHire")}
                      maxLength={2000}
                      placeholder="Tell us about your strengths, motivation, and fit for this role…"
                      className={touched.whyHire && errors.whyHire ? "border-destructive focus-visible:ring-destructive" : ""}
                      required
                    />
                    <FieldError field="whyHire" errors={errors} touched={touched} />
                  </div>

                  {/* Resume */}
                  <div className="space-y-1.5">
                    <Label htmlFor="apply-resume">
                      Resume <span className="text-destructive">*</span>
                    </Label>
                    <label
                      htmlFor="apply-resume"
                      className="flex items-center gap-3 px-3 py-2.5 rounded-md border border-dashed border-input bg-background hover:bg-muted/40 cursor-pointer transition-colors"
                    >
                      <Upload className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-foreground/80 truncate">
                        {resumeFile ? resumeFile.name : "Choose a PDF / DOC / DOCX file"}
                      </span>
                    </label>
                    <Input
                      id="apply-resume"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                      onChange={(e) => setResumeFile(e.target.files?.[0] ?? null)}
                    />
                    <FieldError field="resume" errors={errors} touched={touched} />
                  </div>

                  {/* Extracurriculars */}
                  <div className="space-y-1.5">
                    <Label htmlFor="apply-extra">Extracurricular activities (shareable links)</Label>
                    <Textarea
                      id="apply-extra"
                      rows={3}
                      value={form.extracurriculars}
                      onChange={(e) => handleFieldChange("extracurriculars", e.target.value)}
                      onBlur={() => handleBlur("extracurriculars")}
                      maxLength={1000}
                      placeholder="LinkedIn, GitHub, portfolio, publications, volunteer work…"
                    />
                    <FieldError field="extracurriculars" errors={errors} touched={touched} />
                  </div>
                </div>

                <DialogFooter className="mt-6">
                  <Button type="button" variant="outline" onClick={() => setApplyJob(null)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={submitting}>
                    {submitting ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Mail className="w-4 h-4" />
                    )}
                    Send Application
                  </Button>
                </DialogFooter>
              </form>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}