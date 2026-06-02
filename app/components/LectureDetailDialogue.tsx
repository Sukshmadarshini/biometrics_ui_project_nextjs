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
//   name: string;
//   email: string;
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
//       "A hands-on 1-day field implementation masterclass focused on precision organic farming techniques. Learn how to move beyond fixed schedules using leaf-sap analysis and Brix monitoring, and apply biological yield engineering to improve crop quality, resilience, and consistency.",
//     instructor: "Dr. Priyadarshini Tilak", // change if different
//     students: 150, // optional estimate or update later
//     date: "Scheduled Batch (Offline Field Training)",
//     rating: 4.9, // you can adjust later
//     originalPrice: "₹5,000",
//     discountPrice: "₹3,500",
//     discountPercent: 30,
//     includes: [
//       "Precision nutrient timing using leaf-sap analysis",
//       "Brix monitoring to identify hidden deficiencies",
//       "Biological yield engineering concepts",
//       "Standardization of farm-made inputs",
//       "Measuring and boosting microbial density",
//       "Improving crop quality, appearance & consistency",
//       "Focused training for fruits, medicinal plants & high-value vegetables",
//       "Participation certificate",
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

// export default function LectureDetailDialog({
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
//     name: "",
//     email: "",
//   });

//   if (!video) return null;

//   const details = workshopDetails[video.id] ?? workshopDetails[1];

//   /* ── Validation ─────────────────────────────────────────────────────────── */

//   function runValidation(data: EnrollmentForm): FormErrors {
//     return {
//       name: validateName(data.name) ?? undefined,
//       email: validateEmailFormat(data.email) ?? undefined,
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
//     setTouched({ name: true, email: true });

//     if (emailCheckStatus === "checking") {
//       toast({
//         title: "Please wait",
//         description: "Verifying email address…",
//       });
//       return;
//     }

//     const allErrors = runValidation(formData);
//     if (emailCheckStatus === "invalid") {
//       allErrors.email =
//         errors.email ?? "This email address could not be verified.";
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
//     // Simulate a brief async action (e.g. API call) before advancing
//     await new Promise((res) => setTimeout(res, 400));
//     setLoading(false);
//     setStep("confirmation");
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
//     const stored =
//       localStorage.getItem("sukshmadarshini_enrolled_courses") || "[]";
//     const enrolled: number[] = JSON.parse(stored);
//     if (!enrolled.includes(video!.id)) enrolled.push(video!.id);
//     localStorage.setItem(
//       "sukshmadarshini_enrolled_courses",
//       JSON.stringify(enrolled)
//     );
//     localStorage.setItem("sukshmadarshini_user", JSON.stringify(formData));
//     toast({
//       title: "Confirmation email sent",
//       description: `Confirmation instructions sent for "${video!.title}"`,
//     });
//     setShowEnrollModal(false);
//     setStep("form");
//     setFormData({ name: "", email: "" });
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
//                   Already Enrolled
//                 </>
//               ) : (
//                 <>
//                   <Lock className="w-4 h-4 mr-2" />
//                   Enroll Now
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
//               {step === "form" ? "Complete Your Registration" : "Confirmation"}
//             </DialogTitle>
//             <DialogDescription>
//               {step === "form"
//                 ? "Fill in your details to get started with your learning journey"
//                 : "Seat confirmation instructions will be sent via email"}
//             </DialogDescription>
//           </DialogHeader>

//           {step === "form" ? (
//             <form onSubmit={handleSubmit} className="space-y-4 pt-4">
//               {/* Name */}
//               <div className="space-y-2">
//                 <Label htmlFor="name">Full Name *</Label>
//                 <div className="relative">
//                   <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
//                   <Input
//                     id="name"
//                     placeholder="John Doe"
//                     value={formData.name}
//                     onChange={(e) => handleChange("name", e.target.value)}
//                     onBlur={() => handleBlur("name")}
//                     className={
//                       touched.name && errors.name
//                         ? "border-destructive focus-visible:ring-destructive pl-10"
//                         : "pl-10"
//                     }
//                     required
//                   />
//                 </div>
//                 <FieldError field="name" />
//               </div>

//               {/* Email */}
//               <div className="space-y-2">
//                 <Label htmlFor="email">Email Address *</Label>
//                 <div className="relative">
//                   <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
//                   <Input
//                     id="email"
//                     type="email"
//                     placeholder="you@example.com"
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

//               <Button
//                 type="submit"
//                 className="w-full mt-6"
//                 disabled={loading}
//               >
//                 {loading ? (
//                   <Loader2 className="w-4 h-4 mr-2 animate-spin" />
//                 ) : (
//                   <ChevronRight className="w-4 h-4 ml-2" />
//                 )}
//                 {loading ? "Verifying…" : "Continue to Confirmation"}
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
//               <p className="text-sm text-muted-foreground leading-relaxed">
//                 Your slot has been successfully reserved.
//               </p>

//               {/* Workshop details — always shown */}
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
//                   <span className="font-semibold text-foreground">{details.students.toLocaleString()} learners</span>
//                 </div>
//                 <div className="flex flex-row items-center mb-1">
//                   <Award className="w-5 h-5 mr-2 text-primary shrink-0" />
//                   <span className="font-semibold text-foreground">{details.rating} rating</span>
//                 </div>
//               </div>

//               <p className="text-sm text-muted-foreground leading-relaxed">
//                 This is a paid workshop service, and payment is required to confirm your booking.
//               </p>
//               <p className="text-sm text-muted-foreground leading-relaxed">
//                 Detailed instructions for completing your booking have been sent to your email.
//               </p>
//               <div className="flex flex-row items-center">
//                 <CircleAlert className="w-4 h-4 mr-1 text-rose-600 shrink-0" />
//                 <span className="font-semibold text-xs text-rose-600">Slot Held Temporary:</span>
//                 <span className="font-semibold text-xs text-primary ml-1">It will auto-cancel if unpaid after 3 days.</span>
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

import Image from "next/image";
import { useRef, useState } from "react";
import {
  Clock,
  Share2,
  BookOpen,
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
  Pin,
  Clock3,
  CheckCircle,
  Users,
  UsersRound,
  CircleUserRound,
  CheckCheck,
} from "lucide-react";
import { Badge } from "../components/ui/badge";
import { Separator } from "../components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useToast } from "../hooks/use-toast";

type Lecture = {
  _id: string;             // Sanity document ID — used by the API route
  id: string;              // same value, kept for localStorage
  title: string;
  description?: string;
  category?: string;
  priceNote?: string;
  originalPrice?: string;
  priceLabel?: string;     // replaces discountedPrice — e.g. "₹3,500"
  date?: string;
  discountPercent?: number;
  instructor?: string;
  idealFor?: string[];
  duration?: string;
  includes?: string[];
  mode?: string;
  thumbnail?: string;
};

type EnrollmentForm = {
  name: string;
  email: string;
};

type Props = {
  video: Lecture | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

function getImage(img?: string) {
  if (!img || img.length === 0) {
    return "https://via.placeholder.com/800x400?text=No+Image";
  }
  return img;
}

type FormErrors = Partial<Record<keyof EnrollmentForm, string>>;
type EmailCheckStatus = "idle" | "checking" | "valid" | "invalid";

async function checkEmail(
  email: string
): Promise<{ valid: boolean; reason?: string }> {
  try {
    const res = await fetch(
      `/api/validateEmail?email=${encodeURIComponent(email)}`,
      { cache: "no-store" }
    );
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
  if (!/^[\p{L}\p{M}'\- ]+$/u.test(t))
    return "Name contains invalid characters.";
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

const handleShare = (title: string, id: string) => {
  const url = `${window.location.origin}/services?lecture=${id}`;
  if (navigator.share) {
    navigator.share({ title, text: `Check out this lecture: ${title}`, url });
  } else {
    navigator.clipboard.writeText(url);
  }
};

export default function LectureDetailDialog({ video, open, onOpenChange }: Props) {
  const { toast } = useToast();
  const [showEnrollModal, setShowEnrollModal] = useState(false);
  const [step, setStep] = useState<"form" | "confirmation">("form");
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof EnrollmentForm, boolean>>>({});
  const [emailCheckStatus, setEmailCheckStatus] = useState<EmailCheckStatus>("idle");
  const emailDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<EnrollmentForm>({ name: "", email: "" });

  if (!video) return null;

  function runValidation(data: EnrollmentForm): FormErrors {
    return {
      name: validateName(data.name) ?? undefined,
      email: validateEmailFormat(data.email) ?? undefined,
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
    setTouched({ name: true, email: true });

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
      const res = await fetch("/api/lecturesEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          lectureId: video._id,
          lectureTitle: video.title,
          selectedSlot: video.date ?? new Date().toISOString(),
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        toast({
          title: "Registration failed",
          description: data.error ?? "Something went wrong. Please try again.",
          variant: "destructive",
        });
        return;
      }

      setStep("confirmation");
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

  function handleDone() {
    const stored = localStorage.getItem("sukshmadarshini_enrolled_courses") || "[]";
    const enrolled: string[] = JSON.parse(stored);
    if (!enrolled.includes(video!._id)) enrolled.push(video!._id);
    localStorage.setItem("sukshmadarshini_enrolled_courses", JSON.stringify(enrolled));
    localStorage.setItem("sukshmadarshini_user", JSON.stringify(formData));
    toast({
      title: "Confirmation email sent",
      description: `Confirmation instructions sent for "${video!.title}"`,
    });
    setShowEnrollModal(false);
    setStep("form");
    setFormData({ name: "", email: "" });
    setTouched({});
    setErrors({});
    setEmailCheckStatus("idle");
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="p-0 max-w-2xl max-h-[90vh] overflow-y-auto">

          {/* IMAGE */}
          <div className="relative h-52">
            <Image
              src={getImage(video.thumbnail)}
              alt={video.title}
              fill
              className="object-cover rounded-t-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-t-lg" />
            <div className="absolute bottom-4 left-4 right-4">
              <h2 className="text-xl font-bold text-white">{video.title}</h2>
              <p className="text-sm text-white/80">by {video.instructor}</p>
            </div>
          </div>

          {/* CONTENT */}
          <div className="p-6 space-y-5">
            <DialogHeader>
              <DialogTitle>{video.title}</DialogTitle>
            </DialogHeader>

            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <CalendarDays className="w-4 h-4" />
                {video.date &&
                  new Date(video.date).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
              </span>
              {/* <span className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                {video.idealFor}
              </span> */}
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {video.duration}
              </span>
            </div>

            <p className="text-sm text-muted-foreground">{video.description}</p>
            <p className="text-xs text-muted-foreground">
              Duration: {video.duration} | Mode: {video.mode}
            </p>

            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <UsersRound className="w-4 h-4" />
                This lecture is ideal for: 
              </h3>
              <ul className="space-y-2">
                {video.idealFor?.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm font-medium text-muted-foreground">
                    <CheckCheck className="w-4 h-4 text-primary mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <Separator />

            {/* Pricing — uses priceLabel instead of discountedPrice */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold">
                  {video.priceLabel ?? "N/A"}
                </span>
                {video.originalPrice && (
                  <span className="line-through text-sm text-muted-foreground">
                    {video.originalPrice}
                  </span>
                )}
                {video.discountPercent && (
                  <Badge variant="destructive">
                    <Tag className="w-3 h-3 mr-1" />
                    {video.discountPercent}% OFF
                  </Badge>
                )}
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleShare(video.title, video._id)}
              >
                <Share2 className="w-5 h-5" />
              </Button>
            </div>

            {/* Includes */}
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                This lecture includes
              </h3>
              <ul className="space-y-2">
                {video.includes?.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <Separator />

            <Button className="w-full" onClick={() => setShowEnrollModal(true)}>
              Enroll
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* ── Enrollment Modal ── */}
      <Dialog open={showEnrollModal} onOpenChange={setShowEnrollModal}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-display">
              {step === "form" ? "Complete Your Registration" : "Confirmation"}
            </DialogTitle>
            <DialogDescription>
              {step === "form"
                ? "Fill in your details to get started with your learning journey"
                : "Seat confirmation instructions will be sent via email"}
            </DialogDescription>
          </DialogHeader>

          {step === "form" ? (
            <form onSubmit={handleSubmit} className="space-y-4 pt-4">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    onBlur={() => handleBlur("name")}
                    className={
                      touched.name && errors.name
                        ? "border-destructive focus-visible:ring-destructive pl-10"
                        : "pl-10"
                    }
                    required
                  />
                </div>
                <FieldError field="name" />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
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

              <Button type="submit" className="w-full mt-6" disabled={loading}>
                {loading ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <ChevronRight className="w-4 h-4 ml-2" />
                )}
                {loading ? "Sending confirmation…" : "Continue to Confirmation"}
              </Button>
            </form>
          ) : (
            <div className="space-y-4 pt-0">
              <MailCheck className="w-28 h-28 mx-auto text-primary" />
              <p className="text-sm text-muted-foreground leading-relaxed">
                Your slot has been successfully reserved.
              </p>

              <div className="space-y-1 text-sm">
                <div className="flex flex-row items-center mb-1">
                  <Pin className="w-5 h-5 mr-2 text-primary shrink-0" />
                  <span className="font-semibold text-foreground">{video.title}</span>
                </div>
                <div className="flex flex-row items-center mb-1">
                  <Clock3 className="w-5 h-5 mr-2 text-primary shrink-0" />
                  <span className="font-semibold text-foreground">{video.duration}</span>
                </div>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed">
                This is a paid lecture service, and payment is required to confirm your booking.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Detailed instructions for completing your booking have been sent to your email.
              </p>
              <div className="flex flex-row items-center">
                <CircleAlert className="w-4 h-4 mr-1 text-rose-600 shrink-0" />
                <span className="font-semibold text-xs text-rose-600">Slot Held Temporary:</span>
                <span className="font-semibold text-xs text-primary ml-1">
                  It will auto-cancel if unpaid after 3 days.
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