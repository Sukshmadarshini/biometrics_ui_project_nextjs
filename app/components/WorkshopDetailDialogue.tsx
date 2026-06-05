// // "use client";

// // import { useRef, useState } from "react";
// // import Image from "next/image";
// // import {
// //   Clock,
// //   Play,
// //   Share2,
// //   BookOpen,
// //   Award,
// //   Users,
// //   CheckCircle,
// //   Lock,
// //   Tag,
// //   ChevronRight,
// //   Mail,
// //   User,
// //   CalendarDays,
// //   MailCheck,
// //   AlertCircle,
// //   CheckCircle2,
// //   Loader2,
// //   CircleAlert,
// //   MapPin,
// //   Pin,
// //   Clock3,
// // } from "lucide-react";

// // import { Button } from "../components/ui/button";
// // import { Badge } from "../components/ui/badge";
// // import { Separator } from "../components/ui/separator";
// // import { useToast } from "../hooks/use-toast";
// // import {
// //   Dialog,
// //   DialogContent,
// //   DialogDescription,
// //   DialogHeader,
// //   DialogTitle,
// // } from "../components/ui/dialog";
// // import { Label } from "./ui/label";
// // import { Input } from "./ui/input";

// // /* -------------------- Types -------------------- */

// // interface CourseVideo {
// //   id: number;
// //   title: string;
// //   duration: string;
// //   thumbnail: string;
// //   completed: boolean;
// //   locked: boolean;
// // }

// // type EnrollmentForm = {
// //   name: string;
// //   email: string;
// // };

// // type FormErrors = Partial<Record<keyof EnrollmentForm, string>>;

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
// //   if (!/^[\p{L}\p{M}'\- ]+$/u.test(t)) return "Name contains invalid characters.";
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

// // interface CourseDetailDialogProps {
// //   video: CourseVideo | null;
// //   open: boolean;
// //   onOpenChange: (open: boolean) => void;
// //   isEnrolled: boolean;
// //   onEnrollmentComplete?: (courseId: number) => void;
// // }

// // /* -------------------- Workshop Data -------------------- */

// // const workshopDetails: Record<
// //   number,
// //   {
// //     description: string;
// //     instructor: string;
// //     students: number;
// //     date: string;
// //     rating: number;
// //     originalPrice: string;
// //     discountPrice: string;
// //     discountPercent: number;
// //     includes: string[];
// //   }
// // > = {
// //   1: {
// //     description:
// //       "An introductory workshop designed to build strong conceptual foundations in plant proteomics and crop molecular research. Participants gain exposure to LC–MS/MS workflows, plant stress proteomics, crop resilience research, and career pathways in agri-proteomics.",
// //     instructor: "Dr. Priyadarshini Tilak",
// //     students: 320,
// //     date: "Flexible Schedule",
// //     rating: 4.8,
// //     originalPrice: "₹6,000",
// //     discountPrice: "₹3,500",
// //     discountPercent: 42,
// //     includes: [
// //       "Fundamentals of plant proteomics",
// //       "Introduction to LC–MS/MS workflows",
// //       "Plant stress & crop resilience concepts",
// //       "Yield improvement research overview",
// //       "Career pathways in Agri-Proteomics",
// //       "Participation certificate",
// //     ],
// //   },
// //   2: {
// //     description:
// //       "A hands-on intensive workshop focusing on applied LC–MS/MS workflows for plant systems. The program emphasizes experimental design, DDA vs DIA strategy planning, real-world case studies, and workflow design exercises for sustainable agriculture research.",
// //     instructor: "Dr. Priyadarshini Tilak",
// //     students: 180,
// //     date: "Batch Based",
// //     rating: 4.9,
// //     originalPrice: "₹15,000",
// //     discountPrice: "₹11,000",
// //     discountPercent: 27,
// //     includes: [
// //       "Applied LC–MS/MS workflows for plant systems",
// //       "Experimental design in crop molecular research",
// //       "DDA vs DIA strategy planning",
// //       "Case studies in sustainable agriculture",
// //       "Workflow design exercises",
// //       "Hands-on research orientation",
// //     ],
// //   },
// //   3: {
// //     description:
// //       "An advanced certification program covering the complete end-to-end plant proteomics workflow. The course includes sample preparation strategies, experimental design, proteomics data analysis fundamentals, and optional mass spectrometry facility exposure.",
// //     instructor: "Dr. Priyadarshini Tilak",
// //     students: 95,
// //     date: "6–8 Weeks Program",
// //     rating: 5.0,
// //     originalPrice: "₹40,000",
// //     discountPrice: "₹32,000",
// //     discountPercent: 20,
// //     includes: [
// //       "End-to-end plant proteomics workflow",
// //       "Sample preparation & digestion strategy",
// //       "Experimental design principles",
// //       "Basics of proteomics data analysis",
// //       "Research presentation & evaluation",
// //       "Optional mass spectrometry facility visit",
// //       "Certification upon successful evaluation",
// //     ],
// //   },
// //   4: {
// //     description:
// //       "A structured industry-oriented biotechnology skill development program designed to bridge academic learning with real-world laboratory and analytical requirements. Ideal for students seeking industry-ready competencies beyond university curriculum.",
// //     instructor: "Sukshmadarshini™ Academic Team",
// //     students: 210,
// //     date: "4–6 Weeks Program",
// //     rating: 4.7,
// //     originalPrice: "₹25,000",
// //     discountPrice: "₹18,000",
// //     discountPercent: 28,
// //     includes: [
// //       "Advanced molecular biology techniques",
// //       "HPLC fundamentals",
// //       "LC–MS/MS workflow understanding",
// //       "Experimental design strategy",
// //       "Translational data interpretation",
// //       "Research profile building & career positioning",
// //     ],
// //   },
// // };

// // /* -------------------- Helpers -------------------- */

// // const handleShare = (title: string, id: number) => {
// //   const url = `${window.location.origin}/services?workshop=${id}`;
// //   if (navigator.share) {
// //     navigator.share({
// //       title,
// //       text: `Check out this workshop: ${title}`,
// //       url,
// //     });
// //   } else {
// //     navigator.clipboard.writeText(url);
// //   }
// // };

// // /* -------------------- Component -------------------- */

// // export default function WorkshopDetailDialog({
// //   video,
// //   open,
// //   onOpenChange,
// //   isEnrolled,
// //   onEnrollmentComplete,
// // }: CourseDetailDialogProps) {
// //   const { toast } = useToast();

// //   const [showEnrollModal, setShowEnrollModal] = useState(false);
// //   const [step, setStep] = useState<"form" | "confirmation">("form");
// //   const [errors, setErrors] = useState<FormErrors>({});
// //   const [selectedWorkshop, setSelectedWorkshop] = useState<string | null>(null);
// //   const [touched, setTouched] = useState<
// //     Partial<Record<keyof EnrollmentForm, boolean>>
// //   >({});
// //   const [emailCheckStatus, setEmailCheckStatus] =
// //     useState<EmailCheckStatus>("idle");
// //   const emailDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
// //   const [loading, setLoading] = useState(false);

// //   const [formData, setFormData] = useState<EnrollmentForm>({
// //     name: "",
// //     email: "",
// //   });

// //   if (!video) return null;

// //   const details = workshopDetails[video.id] ?? workshopDetails[1];

// //   /* ── Validation ─────────────────────────────────────────────────────────── */

// //   function runValidation(data: EnrollmentForm): FormErrors {
// //     return {
// //       name: validateName(data.name) ?? undefined,
// //       email: validateEmailFormat(data.email) ?? undefined,
// //     };
// //   }

// //   /* ── Email handlers ──────────────────────────────────────────────────────── */

// //   async function handleEmailBlur() {
// //     setTouched((p) => ({ ...p, email: true }));
// //     const formatError = validateEmailFormat(formData.email);
// //     if (formatError) {
// //       setErrors((p) => ({ ...p, email: formatError }));
// //       setEmailCheckStatus("idle");
// //       return;
// //     }
// //     setEmailCheckStatus("checking");
// //     setErrors((p) => ({ ...p, email: undefined }));
// //     try {
// //       const result = await checkEmail(formData.email);
// //       setEmailCheckStatus(result.valid ? "valid" : "invalid");
// //       setErrors((p) => ({
// //         ...p,
// //         email: result.valid
// //           ? undefined
// //           : (result.reason ?? "This email address could not be verified."),
// //       }));
// //     } catch {
// //       setEmailCheckStatus("idle");
// //     }
// //   }

// //   function handleEmailChange(value: string) {
// //     setFormData((p) => ({ ...p, email: value }));
// //     setEmailCheckStatus("idle");
// //     if (touched.email) {
// //       const formatError = validateEmailFormat(value);
// //       setErrors((p) => ({ ...p, email: formatError ?? undefined }));
// //       if (!formatError) {
// //         if (emailDebounceRef.current) clearTimeout(emailDebounceRef.current);
// //         emailDebounceRef.current = setTimeout(async () => {
// //           setEmailCheckStatus("checking");
// //           try {
// //             const result = await checkEmail(value);
// //             setEmailCheckStatus(result.valid ? "valid" : "invalid");
// //             setErrors((p) => ({
// //               ...p,
// //               email: result.valid
// //                 ? undefined
// //                 : (result.reason ?? "This email could not be verified."),
// //             }));
// //           } catch {
// //             setEmailCheckStatus("idle");
// //           }
// //         }, 800);
// //       }
// //     }
// //   }

// //   /* ── Generic field handlers ──────────────────────────────────────────────── */

// //   function handleBlur(field: keyof EnrollmentForm) {
// //     if (field === "email") return;
// //     setTouched((p) => ({ ...p, [field]: true }));
// //     const errs = runValidation(formData);
// //     setErrors((p) => ({ ...p, [field]: errs[field] }));
// //   }

// //   function handleChange(field: keyof EnrollmentForm, value: string) {
// //     if (field === "email") {
// //       handleEmailChange(value);
// //       return;
// //     }
// //     const updated = { ...formData, [field]: value };
// //     setFormData(updated);
// //     if (touched[field]) {
// //       const errs = runValidation(updated);
// //       setErrors((p) => ({ ...p, [field]: errs[field] }));
// //     }
// //   }

// //   /* ── Submit ──────────────────────────────────────────────────────────────── */

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     setTouched({ name: true, email: true });

// //     if (emailCheckStatus === "checking") {
// //       toast({
// //         title: "Please wait",
// //         description: "Verifying email address…",
// //       });
// //       return;
// //     }

// //     const allErrors = runValidation(formData);
// //     if (emailCheckStatus === "invalid") {
// //       allErrors.email =
// //         errors.email ?? "This email address could not be verified.";
// //     }
// //     setErrors(allErrors);

// //     if (Object.values(allErrors).some(Boolean)) {
// //       toast({
// //         title: "Please fix the errors",
// //         description: "Some fields contain invalid or suspicious values.",
// //         variant: "destructive",
// //       });
// //       return;
// //     }

// //     setLoading(true);
// //     // Simulate a brief async action (e.g. API call) before advancing
// //     await new Promise((res) => setTimeout(res, 400));
// //     setLoading(false);
// //     setStep("confirmation");
// //   };

// //   /* ── Sub-components ──────────────────────────────────────────────────────── */

// //   function FieldError({ field }: { field: keyof EnrollmentForm }) {
// //     if (!touched[field] || !errors[field]) return null;
// //     return (
// //       <p className="flex items-center gap-1 mt-1 text-xs text-destructive">
// //         <AlertCircle className="w-3 h-3 shrink-0" />
// //         {errors[field]}
// //       </p>
// //     );
// //   }

// //   function EmailIndicator() {
// //     if (emailCheckStatus === "checking")
// //       return (
// //         <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 animate-spin text-muted-foreground" />
// //       );
// //     if (emailCheckStatus === "valid")
// //       return (
// //         <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500" />
// //       );
// //     if (emailCheckStatus === "invalid")
// //       return (
// //         <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-destructive" />
// //       );
// //     return null;
// //   }

// //   const emailBorderClass =
// //     touched.email && errors.email
// //       ? "border-destructive focus-visible:ring-destructive"
// //       : emailCheckStatus === "valid"
// //       ? "border-green-500 focus-visible:ring-green-500"
// //       : "";

// //   /* ── Confirmation done handler ───────────────────────────────────────────── */

// //   function handleDone() {
// //     const stored =
// //       localStorage.getItem("sukshmadarshini_enrolled_courses") || "[]";
// //     const enrolled: number[] = JSON.parse(stored);
// //     if (!enrolled.includes(video!.id)) enrolled.push(video!.id);
// //     localStorage.setItem(
// //       "sukshmadarshini_enrolled_courses",
// //       JSON.stringify(enrolled)
// //     );
// //     localStorage.setItem("sukshmadarshini_user", JSON.stringify(formData));
// //     toast({
// //       title: "Confirmation email sent",
// //       description: `Confirmation instructions sent for "${video!.title}"`,
// //     });
// //     setShowEnrollModal(false);
// //     setStep("form");
// //     setFormData({ name: "", email: "" });
// //     setTouched({});
// //     setErrors({});
// //     setEmailCheckStatus("idle");
// //     onEnrollmentComplete?.(video!.id);
// //   }

// //   /* -------------------- Render -------------------- */

// //   return (
// //     <>
// //       {/* ── Workshop Detail Dialog ── */}
// //       <Dialog open={open} onOpenChange={onOpenChange}>
// //         <DialogTitle>{video.title}</DialogTitle>
// //         <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto p-0">
// //           {/* Hero */}
// //           <div className="relative h-52">
// //             <Image
// //               src={video.thumbnail}
// //               alt={video.title}
// //               fill
// //               className="object-cover rounded-t-lg"
// //             />
// //             <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-t-lg" />
// //             <div className="absolute bottom-4 left-4 right-4">
// //               <h2 className="text-xl font-bold text-white">{video.title}</h2>
// //               <p className="text-sm text-white/80">by {details.instructor}</p>
// //             </div>
// //           </div>

// //           <div className="p-6 space-y-5">
// //             {/* Meta */}
// //             <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
// //               <span className="flex items-center gap-1">
// //                 <CalendarDays className="w-4 h-4" />
// //                 {details.date}
// //               </span>
// //               <span className="flex items-center gap-1">
// //                 <Clock className="w-4 h-4" />
// //                 {video.duration}
// //               </span>
// //               <span className="flex items-center gap-1">
// //                 <Users className="w-4 h-4" />
// //                 {details.students.toLocaleString()} learners
// //               </span>
// //               <span className="flex items-center gap-1">
// //                 <Award className="w-4 h-4" />
// //                 {details.rating} rating
// //               </span>
// //             </div>

// //             <p className="text-sm text-muted-foreground leading-relaxed">
// //               {details.description}
// //             </p>

// //             <Separator />

// //             {/* Pricing */}
// //             <div className="flex items-center justify-between">
// //               <div className="flex items-center gap-3">
// //                 <span className="text-2xl font-bold">
// //                   {details.discountPrice}
// //                 </span>
// //                 <span className="line-through text-sm text-muted-foreground">
// //                   {details.originalPrice}
// //                 </span>
// //                 <Badge variant="destructive">
// //                   <Tag className="w-3 h-3 mr-1" />
// //                   {details.discountPercent}% OFF
// //                 </Badge>
// //               </div>
// //               <Button
// //                 variant="ghost"
// //                 size="icon"
// //                 onClick={() => handleShare(video.title, video.id)}
// //               >
// //                 <Share2 className="w-5 h-5" />
// //               </Button>
// //             </div>

// //             <Separator />

// //             {/* Includes */}
// //             <div>
// //               <h3 className="font-semibold mb-3 flex items-center gap-2">
// //                 <BookOpen className="w-4 h-4" />
// //                 This workshop includes
// //               </h3>
// //               <ul className="space-y-2">
// //                 {details.includes.map((item, i) => (
// //                   <li
// //                     key={i}
// //                     className="flex items-start gap-2 text-sm text-muted-foreground"
// //                   >
// //                     <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
// //                     {item}
// //                   </li>
// //                 ))}
// //               </ul>
// //             </div>

// //             <Button
// //               className="w-full"
// //               size="lg"
// //               disabled={isEnrolled}
// //               onClick={() => setShowEnrollModal(true)}
// //             >
// //               {isEnrolled ? (
// //                 <>
// //                   <Play className="w-4 h-4 mr-2" />
// //                   Already Enrolled
// //                 </>
// //               ) : (
// //                 <>
// //                   <Lock className="w-4 h-4 mr-2" />
// //                   Enroll Now
// //                 </>
// //               )}
// //             </Button>
// //           </div>
// //         </DialogContent>
// //       </Dialog>

// //       {/* ── Enrollment Modal ── */}
// //       <Dialog open={showEnrollModal} onOpenChange={setShowEnrollModal}>
// //         <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
// //           <DialogHeader>
// //             <DialogTitle className="text-2xl font-display">
// //               {step === "form" ? "Complete Your Registration" : "Confirmation"}
// //             </DialogTitle>
// //             <DialogDescription>
// //               {step === "form"
// //                 ? "Fill in your details to get started with your learning journey"
// //                 : "Seat confirmation instructions will be sent via email"}
// //             </DialogDescription>
// //           </DialogHeader>

// //           {step === "form" ? (
// //             <form onSubmit={handleSubmit} className="space-y-4 pt-4">
// //               {/* Name */}
// //               <div className="space-y-2">
// //                 <Label htmlFor="name">Full Name *</Label>
// //                 <div className="relative">
// //                   <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
// //                   <Input
// //                     id="name"
// //                     placeholder="John Doe"
// //                     value={formData.name}
// //                     onChange={(e) => handleChange("name", e.target.value)}
// //                     onBlur={() => handleBlur("name")}
// //                     className={
// //                       touched.name && errors.name
// //                         ? "border-destructive focus-visible:ring-destructive pl-10"
// //                         : "pl-10"
// //                     }
// //                     required
// //                   />
// //                 </div>
// //                 <FieldError field="name" />
// //               </div>

// //               {/* Email */}
// //               <div className="space-y-2">
// //                 <Label htmlFor="email">Email Address *</Label>
// //                 <div className="relative">
// //                   <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
// //                   <Input
// //                     id="email"
// //                     type="email"
// //                     placeholder="you@example.com"
// //                     value={formData.email}
// //                     onChange={(e) => handleChange("email", e.target.value)}
// //                     onBlur={handleEmailBlur}
// //                     className={`pl-10 pr-9 ${emailBorderClass}`}
// //                     required
// //                   />
// //                   <EmailIndicator />
// //                 </div>
// //                 <FieldError field="email" />
// //               </div>

// //               <Button
// //                 type="submit"
// //                 className="w-full mt-6"
// //                 disabled={loading}
// //               >
// //                 {loading ? (
// //                   <Loader2 className="w-4 h-4 mr-2 animate-spin" />
// //                 ) : (
// //                   <ChevronRight className="w-4 h-4 ml-2" />
// //                 )}
// //                 {loading ? "Verifying…" : "Continue to Confirmation"}
// //               </Button>
// //             </form>
// //           ) : (
// //             // <div className="space-y-6 pt-4 text-center">
// //             //   <MailCheck className="w-32 h-32 justify-center mx-auto text-primary" />
// //             //   <p className="text-sm text-muted-foreground leading-relaxed">
// //             //     You will receive the confirmation email for the{" "}
// //             //     <span className="font-semibold text-foreground">
// //             //       {video.title}
// //             //     </span>{" "}
// //             //     in a few hours.
// //             //     <br />
// //             //     <br />
// //             //     Please follow the steps given in the email to confirm your seat
// //             //     in the workshop.
// //             //   </p>
// //             //   <Button className="w-full" onClick={handleDone}>
// //             //     Done
// //             //   </Button>
// //             // </div>
// //             <div className="space-y-4 pt-0">
// //               <MailCheck className="w-28 h-28 mx-auto text-primary" />
// //               <p className="text-sm text-muted-foreground leading-relaxed">
// //                 Your slot has been successfully reserved.
// //               </p>

// //               {/* Workshop details — always shown */}
// //               <div className="space-y-1 text-sm">
// //                 <div className="flex flex-row items-center mb-1">
// //                   <Pin className="w-5 h-5 mr-2 text-primary shrink-0" />
// //                   <span className="font-semibold text-foreground">{video.title}</span>
// //                 </div>
// //                 <div className="flex flex-row items-center mb-1">
// //                   <Clock3 className="w-5 h-5 mr-2 text-primary shrink-0" />
// //                   <span className="font-semibold text-foreground">{video.duration}</span>
// //                 </div>
// //                 <div className="flex flex-row items-center mb-1">
// //                   <Users className="w-5 h-5 mr-2 text-primary shrink-0" />
// //                   <span className="font-semibold text-foreground">{details.students.toLocaleString()} learners</span>
// //                 </div>
// //                 <div className="flex flex-row items-center mb-1">
// //                   <Award className="w-5 h-5 mr-2 text-primary shrink-0" />
// //                   <span className="font-semibold text-foreground">{details.rating} rating</span>
// //                 </div>
// //               </div>

// //               <p className="text-sm text-muted-foreground leading-relaxed">
// //                 This is a paid workshop service, and payment is required to confirm your booking.
// //               </p>
// //               <p className="text-sm text-muted-foreground leading-relaxed">
// //                 Detailed instructions for completing your booking have been sent to your email.
// //               </p>
// //               <div className="flex flex-row items-center">
// //                 <CircleAlert className="w-4 h-4 mr-1 text-rose-600 shrink-0" />
// //                 <span className="font-semibold text-xs text-rose-600">Slot Held Temporary:</span>
// //                 <span className="font-semibold text-xs text-primary ml-1">It will auto-cancel if unpaid after 3 days.</span>
// //               </div>
// //               <Button className="w-full" onClick={handleDone}>
// //                 Done
// //               </Button>
// //             </div>
// //           )}
// //         </DialogContent>
// //       </Dialog>
// //     </>
// //   );
// // }

// "use client";

// import { useRef, useState } from "react";
// import Image from "next/image";
// import {
//   Clock,
//   Play,
//   Share2,
//   BookOpen,
//   Award,
//   Users,
//   CheckCircle,
//   Lock,
//   Tag,
//   ChevronRight,
//   Mail,
//   User,
//   CalendarDays,
//   MailCheck,
//   AlertCircle,
//   CheckCircle2,
//   Loader2,
//   CircleAlert,
//   MapPin,
//   Pin,
//   Clock3,
// } from "lucide-react";

// import { Button } from "../components/ui/button";
// import { Badge } from "../components/ui/badge";
// import { Separator } from "../components/ui/separator";
// import { useToast } from "../hooks/use-toast";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
// } from "../components/ui/dialog";
// import { Label } from "./ui/label";
// import { Input } from "./ui/input";

// /* -------------------- Types -------------------- */

// interface CourseVideo {
//   id: number;
//   title: string;
//   duration: string;
//   thumbnail: string;
//   completed: boolean;
//   locked: boolean;
// }

// type EnrollmentForm = {
//   contactName: string;
//   email: string;
//   instituteName: string;
//   designation: string;
//   phone: string;
//   estimatedParticipants: string;
//   message: string;
// };

// type FormErrors = Partial<Record<keyof EnrollmentForm, string>>;

// type EmailCheckStatus = "idle" | "checking" | "valid" | "invalid";

// async function checkEmail(
//   email: string
// ): Promise<{ valid: boolean; reason?: string }> {
//   try {
//     const res = await fetch(
//       `/api/validateEmail?email=${encodeURIComponent(email)}`,
//       { cache: "no-store" }
//     );
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

// function validateInstituteName(value: string): string | null {
//   const t = value.trim();
//   if (!t) return "Institute name is required.";
//   if (t.length < 3) return "Institute name is too short.";
//   if (t.length > 120) return "Institute name is too long.";
//   if (!/^[\p{L}\p{M}0-9'\-\.,& ]+$/u.test(t))
//     return "Institute name contains invalid characters.";
//   return null;
// }

// function validateDesignation(value: string): string | null {
//   const t = value.trim();
//   if (!t) return "Designation is required.";
//   if (t.length < 2) return "Designation is too short.";
//   if (t.length > 80) return "Designation is too long.";
//   return null;
// }

// function validatePhone(value: string): string | null {
//   const stripped = value.replace(/[\s\-().+]/g, "");
//   if (!stripped) return "Phone number is required.";
//   if (!/^\d{7,15}$/.test(stripped))
//     return "Please enter a valid phone number.";
//   return null;
// }

// function validateMessage(value: string): string | null {
//   if (!value.trim()) return "Message is required.";
//   if (value.trim().length < 10) return "Message is too short (min 10 characters).";
//   return null;
// }

// function validateEstimatedParticipants(value: string): string | null {
//   if (!value.trim()) return "Please provide an estimated participant count.";
//   return null;
// }

// interface CourseDetailDialogProps {
//   video: CourseVideo | null;
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
//   isEnrolled: boolean;
//   onEnrollmentComplete?: (courseId: number) => void;
// }

// /* -------------------- Workshop Data -------------------- */

// const workshopDetails: Record<
//   number,
//   {
//     description: string;
//     instructor: string;
//     students: number;
//     date: string;
//     rating: number;
//     originalPrice: string;
//     discountPrice: string;
//     discountPercent: number;
//     includes: string[];
//   }
// > = {
//   1: {
//     description:
//       "An introductory workshop designed to build strong conceptual foundations in plant proteomics and crop molecular research. Participants gain exposure to LC–MS/MS workflows, plant stress proteomics, crop resilience research, and career pathways in agri-proteomics.",
//     instructor: "Dr. Priyadarshini Tilak",
//     students: 320,
//     date: "Flexible Schedule",
//     rating: 4.8,
//     originalPrice: "₹6,000",
//     discountPrice: "₹3,500",
//     discountPercent: 42,
//     includes: [
//       "Fundamentals of plant proteomics",
//       "Introduction to LC–MS/MS workflows",
//       "Plant stress & crop resilience concepts",
//       "Yield improvement research overview",
//       "Career pathways in Agri-Proteomics",
//       "Participation certificate",
//     ],
//   },
//   2: {
//     description:
//       "A hands-on intensive workshop focusing on applied LC–MS/MS workflows for plant systems. The program emphasizes experimental design, DDA vs DIA strategy planning, real-world case studies, and workflow design exercises for sustainable agriculture research.",
//     instructor: "Dr. Priyadarshini Tilak",
//     students: 180,
//     date: "Batch Based",
//     rating: 4.9,
//     originalPrice: "₹15,000",
//     discountPrice: "₹11,000",
//     discountPercent: 27,
//     includes: [
//       "Applied LC–MS/MS workflows for plant systems",
//       "Experimental design in crop molecular research",
//       "DDA vs DIA strategy planning",
//       "Case studies in sustainable agriculture",
//       "Workflow design exercises",
//       "Hands-on research orientation",
//     ],
//   },
//   3: {
//     description:
//       "An advanced certification program covering the complete end-to-end plant proteomics workflow. The course includes sample preparation strategies, experimental design, proteomics data analysis fundamentals, and optional mass spectrometry facility exposure.",
//     instructor: "Dr. Priyadarshini Tilak",
//     students: 95,
//     date: "6–8 Weeks Program",
//     rating: 5.0,
//     originalPrice: "₹40,000",
//     discountPrice: "₹32,000",
//     discountPercent: 20,
//     includes: [
//       "End-to-end plant proteomics workflow",
//       "Sample preparation & digestion strategy",
//       "Experimental design principles",
//       "Basics of proteomics data analysis",
//       "Research presentation & evaluation",
//       "Optional mass spectrometry facility visit",
//       "Certification upon successful evaluation",
//     ],
//   },
//   4: {
//     description:
//       "A structured industry-oriented biotechnology skill development program designed to bridge academic learning with real-world laboratory and analytical requirements. Ideal for students seeking industry-ready competencies beyond university curriculum.",
//     instructor: "Sukshmadarshini™ Academic Team",
//     students: 210,
//     date: "4–6 Weeks Program",
//     rating: 4.7,
//     originalPrice: "₹25,000",
//     discountPrice: "₹18,000",
//     discountPercent: 28,
//     includes: [
//       "Advanced molecular biology techniques",
//       "HPLC fundamentals",
//       "LC–MS/MS workflow understanding",
//       "Experimental design strategy",
//       "Translational data interpretation",
//       "Research profile building & career positioning",
//     ],
//   },
// };

// /* -------------------- Helpers -------------------- */

// const handleShare = (title: string, id: number) => {
//   const url = `${window.location.origin}/services?workshop=${id}`;
//   if (navigator.share) {
//     navigator.share({
//       title,
//       text: `Check out this workshop: ${title}`,
//       url,
//     });
//   } else {
//     navigator.clipboard.writeText(url);
//   }
// };

// /* -------------------- Component -------------------- */

// export default function WorkshopDetailDialog({
//   video,
//   open,
//   onOpenChange,
//   isEnrolled,
//   onEnrollmentComplete,
// }: CourseDetailDialogProps) {
//   const { toast } = useToast();

//   const [showEnrollModal, setShowEnrollModal] = useState(false);
//   const [step, setStep] = useState<"form" | "confirmation">("form");
//   const [errors, setErrors] = useState<FormErrors>({});
//   const [selectedWorkshop, setSelectedWorkshop] = useState<string | null>(null);
//   const [touched, setTouched] = useState<
//     Partial<Record<keyof EnrollmentForm, boolean>>
//   >({});
//   const [emailCheckStatus, setEmailCheckStatus] =
//     useState<EmailCheckStatus>("idle");
//   const emailDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
//   const [loading, setLoading] = useState(false);

//   const [formData, setFormData] = useState<EnrollmentForm>({
//     contactName: "",
//     email: "",
//     instituteName: "",
//     designation: "",
//     phone: "",
//     estimatedParticipants: "",
//     message: "",
//   });

//   if (!video) return null;

//   const details = workshopDetails[video.id] ?? workshopDetails[1];

//   /* ── Validation ─────────────────────────────────────────────────────────── */

//   function runValidation(data: EnrollmentForm): FormErrors {
//     return {
//       contactName:           validateName(data.contactName)                     ?? undefined,
//       email:                 validateEmailFormat(data.email)                     ?? undefined,
//       instituteName:         validateInstituteName(data.instituteName)           ?? undefined,
//       designation:           validateDesignation(data.designation)               ?? undefined,
//       phone:                 validatePhone(data.phone)                           ?? undefined,
//       estimatedParticipants: validateEstimatedParticipants(data.estimatedParticipants) ?? undefined,
//       message:               validateMessage(data.message)                       ?? undefined,
//     };
//   }

//   /* ── Email handlers ──────────────────────────────────────────────────────── */

//   async function handleEmailBlur() {
//     setTouched((p) => ({ ...p, email: true }));
//     const formatError = validateEmailFormat(formData.email);
//     if (formatError) {
//       setErrors((p) => ({ ...p, email: formatError }));
//       setEmailCheckStatus("idle");
//       return;
//     }
//     setEmailCheckStatus("checking");
//     setErrors((p) => ({ ...p, email: undefined }));
//     try {
//       const result = await checkEmail(formData.email);
//       setEmailCheckStatus(result.valid ? "valid" : "invalid");
//       setErrors((p) => ({
//         ...p,
//         email: result.valid
//           ? undefined
//           : (result.reason ?? "This email address could not be verified."),
//       }));
//     } catch {
//       setEmailCheckStatus("idle");
//     }
//   }

//   function handleEmailChange(value: string) {
//     setFormData((p) => ({ ...p, email: value }));
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
//               email: result.valid
//                 ? undefined
//                 : (result.reason ?? "This email could not be verified."),
//             }));
//           } catch {
//             setEmailCheckStatus("idle");
//           }
//         }, 800);
//       }
//     }
//   }

//   /* ── Generic field handlers ──────────────────────────────────────────────── */

//   function handleBlur(field: keyof EnrollmentForm) {
//     if (field === "email") return;
//     setTouched((p) => ({ ...p, [field]: true }));
//     const errs = runValidation(formData);
//     setErrors((p) => ({ ...p, [field]: errs[field] }));
//   }

//   function handleChange(field: keyof EnrollmentForm, value: string) {
//     if (field === "email") {
//       handleEmailChange(value);
//       return;
//     }
//     const updated = { ...formData, [field]: value };
//     setFormData(updated);
//     if (touched[field]) {
//       const errs = runValidation(updated);
//       setErrors((p) => ({ ...p, [field]: errs[field] }));
//     }
//   }

//   /* ── Submit ──────────────────────────────────────────────────────────────── */

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setTouched({
//       contactName: true, email: true, instituteName: true,
//       designation: true, phone: true, estimatedParticipants: true, message: true,
//     });

//     if (emailCheckStatus === "checking") {
//       toast({ title: "Please wait", description: "Verifying email address…" });
//       return;
//     }

//     const allErrors = runValidation(formData);
//     if (emailCheckStatus === "invalid") {
//       allErrors.email = errors.email ?? "This email address could not be verified.";
//     }
//     setErrors(allErrors);

//     if (Object.values(allErrors).some(Boolean)) {
//       toast({
//         title: "Please fix the errors",
//         description: "Some fields contain invalid or suspicious values.",
//         variant: "destructive",
//       });
//       return;
//     }

//     setLoading(true);
//     try {
//       const res = await fetch("/api/workshopEmail", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           contactName:           formData.contactName,
//           email:                 formData.email,
//           instituteName:         formData.instituteName,
//           designation:           formData.designation,
//           phone:                 formData.phone,
//           workshopTitle:         video!.title,
//           workshopId:            video!.id,
//           estimatedParticipants: formData.estimatedParticipants,
//           message:               formData.message,
//         }),
//       });
//       const data = await res.json();
//       if (!res.ok || !data.success) {
//         toast({
//           title: "Failed to send enquiry",
//           description: data.error ?? "Something went wrong. Please try again.",
//           variant: "destructive",
//         });
//         return;
//       }
//       setStep("confirmation");
//     } catch {
//       toast({
//         title: "Network error",
//         description: "Could not reach the server. Please check your connection.",
//         variant: "destructive",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ── Sub-components ──────────────────────────────────────────────────────── */

//   function FieldError({ field }: { field: keyof EnrollmentForm }) {
//     if (!touched[field] || !errors[field]) return null;
//     return (
//       <p className="flex items-center gap-1 mt-1 text-xs text-destructive">
//         <AlertCircle className="w-3 h-3 shrink-0" />
//         {errors[field]}
//       </p>
//     );
//   }

//   function EmailIndicator() {
//     if (emailCheckStatus === "checking")
//       return (
//         <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 animate-spin text-muted-foreground" />
//       );
//     if (emailCheckStatus === "valid")
//       return (
//         <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500" />
//       );
//     if (emailCheckStatus === "invalid")
//       return (
//         <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-destructive" />
//       );
//     return null;
//   }

//   const emailBorderClass =
//     touched.email && errors.email
//       ? "border-destructive focus-visible:ring-destructive"
//       : emailCheckStatus === "valid"
//       ? "border-green-500 focus-visible:ring-green-500"
//       : "";

//   /* ── Confirmation done handler ───────────────────────────────────────────── */

//   function handleDone() {
//     toast({
//       title: "Enquiry sent",
//       description: `Your enquiry for "${video!.title}" has been submitted. We'll be in touch soon.`,
//     });
//     setShowEnrollModal(false);
//     setStep("form");
//     setFormData({
//       contactName: "", email: "", instituteName: "",
//       designation: "", phone: "", estimatedParticipants: "", message: "",
//     });
//     setTouched({});
//     setErrors({});
//     setEmailCheckStatus("idle");
//     onEnrollmentComplete?.(video!.id);
//   }

//   /* -------------------- Render -------------------- */

//   return (
//     <>
//       {/* ── Workshop Detail Dialog ── */}
//       <Dialog open={open} onOpenChange={onOpenChange}>
//         <DialogTitle>{video.title}</DialogTitle>
//         <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto p-0">
//           {/* Hero */}
//           <div className="relative h-52">
//             <Image
//               src={video.thumbnail}
//               alt={video.title}
//               fill
//               className="object-cover rounded-t-lg"
//             />
//             <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-t-lg" />
//             <div className="absolute bottom-4 left-4 right-4">
//               <h2 className="text-xl font-bold text-white">{video.title}</h2>
//               <p className="text-sm text-white/80">by {details.instructor}</p>
//             </div>
//           </div>

//           <div className="p-6 space-y-5">
//             {/* Meta */}
//             <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
//               <span className="flex items-center gap-1">
//                 <CalendarDays className="w-4 h-4" />
//                 {details.date}
//               </span>
//               <span className="flex items-center gap-1">
//                 <Clock className="w-4 h-4" />
//                 {video.duration}
//               </span>
//               <span className="flex items-center gap-1">
//                 <Users className="w-4 h-4" />
//                 {details.students.toLocaleString()} learners
//               </span>
//               <span className="flex items-center gap-1">
//                 <Award className="w-4 h-4" />
//                 {details.rating} rating
//               </span>
//             </div>

//             <p className="text-sm text-muted-foreground leading-relaxed">
//               {details.description}
//             </p>

//             <Separator />

//             {/* Pricing */}
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-3">
//                 <span className="text-2xl font-bold">
//                   {details.discountPrice}
//                 </span>
//                 <span className="line-through text-sm text-muted-foreground">
//                   {details.originalPrice}
//                 </span>
//                 <Badge variant="destructive">
//                   <Tag className="w-3 h-3 mr-1" />
//                   {details.discountPercent}% OFF
//                 </Badge>
//               </div>
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 onClick={() => handleShare(video.title, video.id)}
//               >
//                 <Share2 className="w-5 h-5" />
//               </Button>
//             </div>

//             <Separator />

//             {/* Includes */}
//             <div>
//               <h3 className="font-semibold mb-3 flex items-center gap-2">
//                 <BookOpen className="w-4 h-4" />
//                 This workshop includes
//               </h3>
//               <ul className="space-y-2">
//                 {details.includes.map((item, i) => (
//                   <li
//                     key={i}
//                     className="flex items-start gap-2 text-sm text-muted-foreground"
//                   >
//                     <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
//                     {item}
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             <Button
//               className="w-full"
//               size="lg"
//               disabled={isEnrolled}
//               onClick={() => setShowEnrollModal(true)}
//             >
//               {isEnrolled ? (
//                 <>
//                   <Play className="w-4 h-4 mr-2" />
//                   Already Enquired
//                 </>
//               ) : (
//                 <>
//                   <Mail className="w-4 h-4 mr-2" />
//                   Enquire Now
//                 </>
//               )}
//             </Button>
//           </div>
//         </DialogContent>
//       </Dialog>

//       {/* ── Enrollment Modal ── */}
//       <Dialog open={showEnrollModal} onOpenChange={setShowEnrollModal}>
//         <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
//           <DialogHeader>
//             <DialogTitle className="text-2xl font-display">
//               {step === "form" ? "Workshop Enquiry" : "Enquiry Submitted"}
//             </DialogTitle>
//             <DialogDescription>
//               {step === "form"
//                 ? "Fill in your institute details and we'll get back to you shortly"
//                 : "Our team will reach out to confirm scheduling and details"}
//             </DialogDescription>
//           </DialogHeader>

//           {step === "form" ? (
//             <form onSubmit={handleSubmit} className="space-y-4 pt-4">
//               {/* Contact Name */}
//               <div className="space-y-2">
//                 <Label htmlFor="contactName">Contact Person *</Label>
//                 <div className="relative">
//                   <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
//                   <Input
//                     id="contactName"
//                     placeholder="Dr. Jane Smith"
//                     value={formData.contactName}
//                     onChange={(e) => handleChange("contactName", e.target.value)}
//                     onBlur={() => handleBlur("contactName")}
//                     className={
//                       touched.contactName && errors.contactName
//                         ? "border-destructive focus-visible:ring-destructive pl-10"
//                         : "pl-10"
//                     }
//                     required
//                   />
//                 </div>
//                 <FieldError field="contactName" />
//               </div>

//               {/* Designation */}
//               <div className="space-y-2">
//                 <Label htmlFor="designation">Designation *</Label>
//                 <Input
//                   id="designation"
//                   placeholder="e.g. HoD Biotechnology, Training Coordinator"
//                   value={formData.designation}
//                   onChange={(e) => handleChange("designation", e.target.value)}
//                   onBlur={() => handleBlur("designation")}
//                   className={
//                     touched.designation && errors.designation
//                       ? "border-destructive focus-visible:ring-destructive"
//                       : ""
//                   }
//                   required
//                 />
//                 <FieldError field="designation" />
//               </div>

//               {/* Institute Name */}
//               <div className="space-y-2">
//                 <Label htmlFor="instituteName">Institute / College / University *</Label>
//                 <Input
//                   id="instituteName"
//                   placeholder="e.g. MIT Pune, Fergusson College"
//                   value={formData.instituteName}
//                   onChange={(e) => handleChange("instituteName", e.target.value)}
//                   onBlur={() => handleBlur("instituteName")}
//                   className={
//                     touched.instituteName && errors.instituteName
//                       ? "border-destructive focus-visible:ring-destructive"
//                       : ""
//                   }
//                   required
//                 />
//                 <FieldError field="instituteName" />
//               </div>

//               {/* Email */}
//               <div className="space-y-2">
//                 <Label htmlFor="email">Official Email Address *</Label>
//                 <div className="relative">
//                   <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
//                   <Input
//                     id="email"
//                     type="email"
//                     placeholder="you@institution.edu.in"
//                     value={formData.email}
//                     onChange={(e) => handleChange("email", e.target.value)}
//                     onBlur={handleEmailBlur}
//                     className={`pl-10 pr-9 ${emailBorderClass}`}
//                     required
//                   />
//                   <EmailIndicator />
//                 </div>
//                 <FieldError field="email" />
//               </div>

//               {/* Phone */}
//               <div className="space-y-2">
//                 <Label htmlFor="phone">Phone Number *</Label>
//                 <Input
//                   id="phone"
//                   type="tel"
//                   placeholder="+91 98765 43210"
//                   value={formData.phone}
//                   onChange={(e) => handleChange("phone", e.target.value)}
//                   onBlur={() => handleBlur("phone")}
//                   className={
//                     touched.phone && errors.phone
//                       ? "border-destructive focus-visible:ring-destructive"
//                       : ""
//                   }
//                   required
//                 />
//                 <FieldError field="phone" />
//               </div>

//               {/* Estimated Participants */}
//               <div className="space-y-2">
//                 <Label htmlFor="estimatedParticipants">Estimated Number of Participants *</Label>
//                 <Input
//                   id="estimatedParticipants"
//                   placeholder="e.g. 30–50 students"
//                   value={formData.estimatedParticipants}
//                   onChange={(e) => handleChange("estimatedParticipants", e.target.value)}
//                   onBlur={() => handleBlur("estimatedParticipants")}
//                   className={
//                     touched.estimatedParticipants && errors.estimatedParticipants
//                       ? "border-destructive focus-visible:ring-destructive"
//                       : ""
//                   }
//                   required
//                 />
//                 <FieldError field="estimatedParticipants" />
//               </div>

//               {/* Message */}
//               <div className="space-y-2">
//                 <Label htmlFor="message">Message / Additional Requirements *</Label>
//                 <textarea
//                   id="message"
//                   rows={4}
//                   placeholder="Tell us about your preferred schedule, any specific topics, or other requirements…"
//                   value={formData.message}
//                   onChange={(e) => handleChange("message", e.target.value)}
//                   onBlur={() => handleBlur("message")}
//                   className={`flex w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none ${
//                     touched.message && errors.message
//                       ? "border-destructive focus-visible:ring-destructive"
//                       : "border-input"
//                   }`}
//                   required
//                 />
//                 <FieldError field="message" />
//               </div>

//               <Button
//                 type="submit"
//                 className="w-full mt-2"
//                 disabled={loading}
//               >
//                 {loading ? (
//                   <Loader2 className="w-4 h-4 mr-2 animate-spin" />
//                 ) : (
//                   <Mail className="w-4 h-4 mr-2" />
//                 )}
//                 {loading ? "Sending Enquiry…" : "Send Enquiry"}
//               </Button>
//             </form>
//           ) : (
//             // <div className="space-y-6 pt-4 text-center">
//             //   <MailCheck className="w-32 h-32 justify-center mx-auto text-primary" />
//             //   <p className="text-sm text-muted-foreground leading-relaxed">
//             //     You will receive the confirmation email for the{" "}
//             //     <span className="font-semibold text-foreground">
//             //       {video.title}
//             //     </span>{" "}
//             //     in a few hours.
//             //     <br />
//             //     <br />
//             //     Please follow the steps given in the email to confirm your seat
//             //     in the workshop.
//             //   </p>
//             //   <Button className="w-full" onClick={handleDone}>
//             //     Done
//             //   </Button>
//             // </div>
//             <div className="space-y-4 pt-0">
//               <MailCheck className="w-28 h-28 mx-auto text-primary" />
//               <p className="text-sm text-muted-foreground leading-relaxed text-center">
//                 Your enquiry has been successfully submitted.
//               </p>

//               {/* Workshop details */}
//               <div className="space-y-1 text-sm">
//                 <div className="flex flex-row items-center mb-1">
//                   <Pin className="w-5 h-5 mr-2 text-primary shrink-0" />
//                   <span className="font-semibold text-foreground">{video.title}</span>
//                 </div>
//                 <div className="flex flex-row items-center mb-1">
//                   <Clock3 className="w-5 h-5 mr-2 text-primary shrink-0" />
//                   <span className="font-semibold text-foreground">{video.duration}</span>
//                 </div>
//                 <div className="flex flex-row items-center mb-1">
//                   <Users className="w-5 h-5 mr-2 text-primary shrink-0" />
//                   <span className="font-semibold text-foreground">{details.students.toLocaleString()} learners enrolled</span>
//                 </div>
//                 <div className="flex flex-row items-center mb-1">
//                   <Award className="w-5 h-5 mr-2 text-primary shrink-0" />
//                   <span className="font-semibold text-foreground">{details.rating} rating</span>
//                 </div>
//               </div>

//               <p className="text-sm text-muted-foreground leading-relaxed">
//                 Our team will review your enquiry and reach out to{" "}
//                 <span className="font-semibold text-foreground">{formData.email}</span>{" "}
//                 within 1–2 business days to discuss scheduling, pricing, and logistics.
//               </p>
//               <div className="flex flex-row items-center">
//                 <CircleAlert className="w-4 h-4 mr-1 text-amber-500 shrink-0" />
//                 <span className="font-semibold text-xs text-amber-600">
//                   These workshops are exclusively available for colleges, universities, and institutes.
//                 </span>
//               </div>
//               <Button className="w-full" onClick={handleDone}>
//                 Done
//               </Button>
//             </div>
//           )}
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// }

"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
  Clock,
  Play,
  Share2,
  BookOpen,
  Award,
  Users,
  CheckCircle,
  Lock,
  Tag,
  ChevronRight,
  Mail,
  User,
  CalendarDays,
  MailCheck,
  AlertCircle,
  CheckCircle2,
  Loader2,
  CircleAlert,
  MapPin,
  Pin,
  Clock3,
  TriangleAlert,
} from "lucide-react";

import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Separator } from "../components/ui/separator";
import { useToast } from "../hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

/* -------------------- TYPES (MATCH STRAPI) -------------------- */

export interface Workshop {
  id: number;
  title: string;
  duration: string;
  description: string;
  instructor: string;
  idealFor: string;
  date?: string;
  thumbnail:string;
  originalPrice?: string;
  discountedPrice?: string;
  discountPercent?: number;
  includes?: string[];
  students?: number;
  rating?: number;
}

/* -------------------- FORM TYPES -------------------- */

type EnrollmentForm = {
  contactName: string;
  email: string;
  instituteName: string;
  city: string;
  designation: string;
  phone: string;
  estimatedParticipants: string;
  message: string;
};

type FormErrors = Partial<Record<keyof EnrollmentForm, string>>;
type EmailCheckStatus = "idle" | "checking" | "valid" | "invalid";

/* -------------------- EMAIL CHECK -------------------- */

async function checkEmail(email: string) {
  try {
    const res = await fetch(`/api/validateEmail?email=${encodeURIComponent(email)}`);
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

/* -------------------- VALIDATION -------------------- */

function validateEmail(v: string) {
  if (!v.trim()) return "Required";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return "Invalid email";
  return null;
}
function validateRequired(v: string) {
  if (!v.trim()) return "Required";
  return null;
}

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

function validateInstituteName(value: string): string | null {
  const t = value.trim();
  if (!t) return "Institute name is required.";
  if (t.length < 3) return "Institute name is too short.";
  if (t.length > 120) return "Institute name is too long.";
  if (!/^[\p{L}\p{M}0-9'\-\.,& ]+$/u.test(t))
    return "Institute name contains invalid characters.";
  return null;
}

function validateDesignation(value: string): string | null {
  const t = value.trim();
  if (!t) return "Designation is required.";
  if (t.length < 2) return "Designation is too short.";
  if (t.length > 80) return "Designation is too long.";
  return null;
}

function validatePhone(value: string): string | null {
  const stripped = value.replace(/[\s\-().+]/g, "");
  if (!stripped) return "Phone number is required.";
  if (!/^\d{7,15}$/.test(stripped))
    return "Please enter a valid phone number.";
  return null;
}

function validateMessage(value: string): string | null {
  if (!value.trim()) return "Message is required.";
  if (value.trim().length < 10) return "Message is too short (min 10 characters).";
  return null;
}

function validateEstimatedParticipants(value: string): string | null {
  if (!value.trim()) return "Please provide an estimated participant count.";
  return null;
}



/* -------------------- PROPS -------------------- */

interface Props {
  workshop: Workshop | null;
  open: boolean;
  onOpenChange: (v: boolean) => void;
}

const handleShare = (title: string, id: number) => {
  const url = `${window.location.origin}/services?workshop=${id}`;
  if (navigator.share) {
    navigator.share({
      title,
      text: `Check out this workshop: ${title}`,
      url,
    });
  } else {
    navigator.clipboard.writeText(url);
  }
};

/* -------------------- COMPONENT -------------------- */

export default function WorkshopDetailDialog({
  workshop,
  open,
  onOpenChange,
}: Props) {
  const { toast } = useToast();

  const [selectedWorkshop, setSelectedWorkshop] = useState<string | null>(null);
  const [showEnrollModal, setShowEnrollModal] = useState(false);
  const [emailCheckStatus, setEmailCheckStatus] =
    useState<EmailCheckStatus>("idle");
  const emailDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [showEnroll, setShowEnroll] = useState(false);
  const [step, setStep] = useState<"form" | "confirmation">("form");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<EnrollmentForm>({
    contactName: "",
    email: "",
    instituteName: "",
    city: "",
    designation: "",
    phone: "",
    estimatedParticipants: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [emailStatus, setEmailStatus] = useState<EmailCheckStatus>("idle");
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  /* -------------------- GUARD -------------------- */

  const [formData, setFormData] = useState<EnrollmentForm>({
    contactName: "",
    email: "",
    instituteName: "",
    city: "",
    designation: "",
    phone: "",
    estimatedParticipants: "",
    message: "",
  });
  // console.log("VIDEO DATA:", workshop);

  if (!workshop) return null;

  // const img:
  //   workshop.thumbnail?.url ||
  //   "https://via.placeholder.com/800x400?text=No+Image";

  /* -------------------- EMAIL -------------------- */

  function runValidation(data: EnrollmentForm): FormErrors {
    return {
      contactName:           validateName(data.contactName)                     ?? undefined,
      email:                 validateEmailFormat(data.email)                     ?? undefined,
      instituteName:         validateInstituteName(data.instituteName)           ?? undefined,
      designation:           validateDesignation(data.designation)               ?? undefined,
      phone:                 validatePhone(data.phone)                           ?? undefined,
      estimatedParticipants: validateEstimatedParticipants(data.estimatedParticipants) ?? undefined,
      message:               validateMessage(data.message)                       ?? undefined,
    };
  }

  async function handleEmailBlur() {
    setTouched((p) => ({ ...p, email: true }));
    const formatError = validateEmailFormat(formData.email);
    if (formatError) {
      setErrors((p) => ({ ...p, email: formatError }));
      setEmailCheckStatus("idle");
      return;
    }
    setEmailCheckStatus("checking");
    setErrors((p) => ({ ...p, email: undefined }));
    try {
      const result = await checkEmail(formData.email);
      setEmailCheckStatus(result.valid ? "valid" : "invalid");
      setErrors((p) => ({
        ...p,
        email: result.valid
          ? undefined
          : (result.reason ?? "This email address could not be verified."),
      }));
    } catch {
      setEmailCheckStatus("idle");
    }
  }

  function handleEmailChange(value: string) {
    setFormData((p) => ({ ...p, email: value }));
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
              email: result.valid
                ? undefined
                : (result.reason ?? "This email could not be verified."),
            }));
          } catch {
            setEmailCheckStatus("idle");
          }
        }, 800);
      }
    }
  }

  function handleBlur(field: keyof EnrollmentForm) {
    if (field === "email") return;
    setTouched((p) => ({ ...p, [field]: true }));
    const errs = runValidation(formData);
    setErrors((p) => ({ ...p, [field]: errs[field] }));
  }

  function handleChange(field: keyof EnrollmentForm, value: string) {
    if (field === "email") {
      handleEmailChange(value);
      return;
    }
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    if (touched[field]) {
      const errs = runValidation(updated);
      setErrors((p) => ({ ...p, [field]: errs[field] }));
    }
  }

   const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({
      contactName: true, email: true, instituteName: true,
      designation: true, phone: true, estimatedParticipants: true, message: true,
    });

    if (emailCheckStatus === "checking") {
      toast({ title: "Please wait", description: "Verifying email address…" });
      return;
    }

    const allErrors = runValidation(formData);
    if (emailCheckStatus === "invalid") {
      allErrors.email = errors.email ?? "This email address could not be verified.";
    }
    setErrors(allErrors);

    if (Object.values(allErrors).some(Boolean)) {
      toast({
        title: "Please fix the errors",
        description: "Some fields contain invalid or suspicious values.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/workshopEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contactName:           formData.contactName,
          email:                 formData.email,
          instituteName:         formData.instituteName,
          city:                  formData.city,
          designation:           formData.designation,
          phone:                 formData.phone,
          workshopTitle:         workshop.title,
          workshopId:            workshop.id,
          estimatedParticipants: formData.estimatedParticipants,
          message:               formData.message,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        toast({
          title: "Failed to send enquiry",
          description: data.error ?? "Something went wrong. Please try again.",
          variant: "destructive",
        });
        return;
      }
      setStep("confirmation");
    } catch {
      toast({
        title: "Network error",
        description: "Could not reach the server. Please check your connection.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  function FieldError({ field }: { field: keyof EnrollmentForm }) {
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
      return (
        <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 animate-spin text-muted-foreground" />
      );
    if (emailCheckStatus === "valid")
      return (
        <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500" />
      );
    if (emailCheckStatus === "invalid")
      return (
        <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-destructive" />
      );
    return null;
  }

  const emailBorderClass =
    touched.email && errors.email
      ? "border-destructive focus-visible:ring-destructive"
      : emailCheckStatus === "valid"
      ? "border-green-500 focus-visible:ring-green-500"
      : "";

      function handleDone() {
    toast({
      title: "Enquiry sent",
      description: `Your enquiry for "${workshop?.title}" has been submitted. We'll be in touch soon.`,
    });
    setShowEnrollModal(false);
    setStep("form");
    setFormData({
      contactName: "", email: "", instituteName: "", city: "",
      designation: "", phone: "", estimatedParticipants: "", message: "",
    });
    setTouched({});
    setErrors({});
    setEmailCheckStatus("idle");
    // onEnrollmentComplete?.(video!.id);
  }



  /* -------------------- SUBMIT -------------------- */

  /* -------------------- UI -------------------- */

  // const imageUrl = workshop.thumbnail?.url;
  return (
    <>
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-0 max-h-[90vh] overflow-y-auto">

        {/* IMAGE */}
        <div className="relative h-56 w-full">
          {/* <Image
            src={imageUrl}
            alt={workshop.title}
            fill
            className="object-cover rounded-t-lg"
          /> */}
          {/* {imageUrl && ( */}
            <div className="relative h-56 w-full">
              <Image
                src={workshop.thumbnail}
                alt={workshop.title}
                fill
                className="object-cover rounded-t-lg"
              />
            </div>
          {/* )} */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-t-lg" />
            <div className="absolute bottom-4 left-4 right-4">
              <h2 className="text-xl font-bold text-white">{workshop.title}</h2>
              <p className="text-sm text-white/80">by {workshop.instructor}</p>
            </div>
        </div>

        {/* CONTENT */}
        <div className="p-6 space-y-5">

          <DialogTitle>{workshop.title}</DialogTitle>

          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              {/* <span className="flex items-center gap-1">
                <CalendarDays className="w-4 h-4" />
                {workshop.date}
              </span> */}
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {workshop.duration}
              </span>
              <span className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                {workshop.idealFor}
              </span>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">
              {workshop.description}
            </p>

          <Separator />

          <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold">
                  {workshop.discountedPrice}
                </span>
                <span className="line-through text-sm text-muted-foreground">
                  {workshop.originalPrice}
                </span>
                <Badge variant="destructive">
                  <Tag className="w-3 h-3 mr-1" />
                  {workshop.discountPercent}% OFF
                </Badge>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleShare(workshop.title, workshop.id)}
              >
                <Share2 className="w-5 h-5" />
              </Button>
            </div>

            <Separator />

            {/* Includes */}
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                This workshop includes
              </h3>
              <ul className="space-y-2">
                {workshop.includes?.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

          {/* BUTTON */}
          <Button className="w-full" onClick={() => setShowEnrollModal(true)}>
            <Mail className="w-4 h-4 mr-2" />
            Enquire Now
          </Button>
        </div>
        {/* FORM */}
      </DialogContent>
    </Dialog>

     {/* ── Enrollment Modal ── */}
      <Dialog open={showEnrollModal} onOpenChange={setShowEnrollModal}>
        <DialogContent className="max-w-lg max-h-[95vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-display">
              {step === "form" ? "Workshop Enquiry" : "Enquiry Submitted"}
            </DialogTitle>
            <DialogDescription>
              {step === "form"
                ? "Fill in your institute details and we will get back to you shortly"
                : "Our team will reach out to confirm scheduling and details"}
            </DialogDescription>
          </DialogHeader>

          {step === "form" ? (
            <form onSubmit={handleSubmit} className="space-y-4 pt-4">
              {/* Contact Name */}
              <div className="space-y-2">
                <Label htmlFor="contactName">Contact Person *</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="contactName"
                    placeholder="Dr. Jane Smith"
                    value={formData.contactName}
                    onChange={(e) => handleChange("contactName", e.target.value)}
                    onBlur={() => handleBlur("contactName")}
                    className={
                      touched.contactName && errors.contactName
                        ? "border-destructive focus-visible:ring-destructive pl-10"
                        : "pl-10"
                    }
                    required
                  />
                </div>
                <FieldError field="contactName" />
              </div>

              {/* Designation */}
              <div className="space-y-2">
                <Label htmlFor="designation">Designation *</Label>
                <Input
                  id="designation"
                  placeholder="e.g. HoD Biotechnology, Training Coordinator"
                  value={formData.designation}
                  onChange={(e) => handleChange("designation", e.target.value)}
                  onBlur={() => handleBlur("designation")}
                  className={
                    touched.designation && errors.designation
                      ? "border-destructive focus-visible:ring-destructive"
                      : ""
                  }
                  required
                />
                <FieldError field="designation" />
              </div>

              {/* Institute Name */}
              <div className="space-y-2">
                <Label htmlFor="instituteName">Institute / College / University *</Label>
                <Input
                  id="instituteName"
                  placeholder="e.g. MIT Pune, Fergusson College"
                  value={formData.instituteName}
                  onChange={(e) => handleChange("instituteName", e.target.value)}
                  onBlur={() => handleBlur("instituteName")}
                  className={
                    touched.instituteName && errors.instituteName
                      ? "border-destructive focus-visible:ring-destructive"
                      : ""
                  }
                  required
                />
                <FieldError field="instituteName" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  placeholder="e.g. Pune, Mumbai"
                  value={formData.city}
                  onChange={(e) => handleChange("city", e.target.value)}
                  onBlur={() => handleBlur("city")}
                  className={
                    touched.city && errors.city
                      ? "border-destructive focus-visible:ring-destructive"
                      : ""
                  }
                  required
                />
                <FieldError field="city" />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Official Email Address *</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@institution.edu.in"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    onBlur={handleEmailBlur}
                    className={`pl-10 pr-9 ${emailBorderClass}`}
                    required
                  />
                  <EmailIndicator />
                </div>
                <FieldError field="email" />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  onBlur={() => handleBlur("phone")}
                  className={
                    touched.phone && errors.phone
                      ? "border-destructive focus-visible:ring-destructive"
                      : ""
                  }
                  required
                />
                <FieldError field="phone" />
              </div>

              {/* Estimated Participants */}
              <div className="space-y-2">
                <Label htmlFor="estimatedParticipants">Estimated Number of Participants *</Label>
                <Input
                  id="estimatedParticipants"
                  placeholder="e.g. 30-50 students"
                  value={formData.estimatedParticipants}
                  onChange={(e) => handleChange("estimatedParticipants", e.target.value)}
                  onBlur={() => handleBlur("estimatedParticipants")}
                  className={
                    touched.estimatedParticipants && errors.estimatedParticipants
                      ? "border-destructive focus-visible:ring-destructive"
                      : ""
                  }
                  required
                />
                <FieldError field="estimatedParticipants" />
              </div>

              {/* Message */}
              <div className="space-y-2">
                <Label htmlFor="message">Message / Additional Requirements *</Label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder="Tell us about your preferred schedule, any specific topics, or other requirements…"
                  value={formData.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  onBlur={() => handleBlur("message")}
                  className={`flex w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none ${
                    touched.message && errors.message
                      ? "border-destructive focus-visible:ring-destructive"
                      : "border-input"
                  }`}
                  required
                />
                <FieldError field="message" />
              </div>

              <Button
                type="submit"
                className="w-full mt-2"
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Mail className="w-4 h-4 mr-2" />
                )}
                {loading ? "Sending Enquiry…" : "Send Enquiry"}
              </Button>
            </form>
          ) : (
            // <div className="space-y-6 pt-4 text-center">
            //   <MailCheck className="w-32 h-32 justify-center mx-auto text-primary" />
            //   <p className="text-sm text-muted-foreground leading-relaxed">
            //     You will receive the confirmation email for the{" "}
            //     <span className="font-semibold text-foreground">
            //       {video.title}
            //     </span>{" "}
            //     in a few hours.
            //     <br />
            //     <br />
            //     Please follow the steps given in the email to confirm your seat
            //     in the workshop.
            //   </p>
            //   <Button className="w-full" onClick={handleDone}>
            //     Done
            //   </Button>
            // </div>
            <div className="space-y-4 pt-0">
              <MailCheck className="w-28 h-28 mx-auto text-primary" />
              <p className="text-sm text-muted-foreground leading-relaxed text-center">
                Your enquiry has been successfully submitted.
              </p>

              {/* Workshop details */}
              <div className="space-y-1 text-sm">
                <div className="flex flex-row items-center mb-1">
                  <Pin className="w-5 h-5 mr-2 text-primary shrink-0" />
                  <span className="font-semibold text-foreground">{workshop.title}</span>
                </div>
                <div className="flex flex-row items-center mb-1">
                  <Clock3 className="w-5 h-5 mr-2 text-primary shrink-0" />
                  <span className="font-semibold text-foreground">{workshop.duration}</span>
                </div>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed">
                Our team will review your enquiry and reach out to{" "}
                <span className="font-semibold text-foreground">{formData.email}</span>{" "}
                within 1 to 2 business days to discuss scheduling, pricing, and logistics.
              </p>
              <div className="flex flex-row items-center">
                <CircleAlert className="w-4 h-4 mr-1 text-amber-500 shrink-0" />
                <span className="font-semibold text-xs text-amber-600">
                  These workshops are exclusively available for colleges, universities, and institutes.
                </span>
              </div>
              <div className="text-sm text-muted-foreground p-3 rounded-sm bg-orange-50 border border-orange-200 leading-relaxed">
                <div className="flex flex-row items-center mb-1">
                  <TriangleAlert className="w-4 h-4 mr-1 text-orange-400" />
                  <span className="font-semibold text-xs text-orange-400">Important:</span>
                </div>
                <span className="font-semibold text-xs text-primary">
                    We kindly request that you also check your spam or junk folder, as emails from our organization may occasionally be filtered there.
                  </span>
              </div>
              <Button className="w-full" onClick={handleDone}>
                Done
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}