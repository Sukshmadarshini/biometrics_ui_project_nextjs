// "use client"
// import { useRef, useState } from "react";
// import { Mail, MapPin, Phone, Send, Loader2, CheckCircle2, XCircle, X, AlertCircle } from "lucide-react";
// import { Button } from "../components/ui/button";
// import { Input } from "../components/ui/input";
// import { Textarea } from "../components/ui/textarea";
// import { useToast } from "../hooks/use-toast";

// // // ─── Disposable domains (client-side fast-path) ───────────────────────────────
// // const DISPOSABLE_DOMAINS = new Set([
// //   "mailinator.com", "guerrillamail.com", "tempmail.com", "throwam.com",
// //   "yopmail.com", "sharklasers.com", "guerrillamailblock.com", "grr.la",
// //   "guerrillamail.info", "guerrillamail.biz", "guerrillamail.de",
// //   "guerrillamail.net", "guerrillamail.org", "spam4.me", "trashmail.com",
// //   "trashmail.me", "trashmail.at", "dispostable.com", "maildrop.cc",
// //   "fakeinbox.com", "spamgourmet.com", "mailnull.com", "10minutemail.com",
// //   "10minutemail.net", "tempr.email", "discard.email", "spamex.com",
// //   "mytemp.email", "temp-mail.org", "tempinbox.com", "throwaway.email",
// //   "wegwerfmail.de", "owlpic.com", "getnada.com",
// // ]);

// // ─── Fake name patterns ───────────────────────────────────────────────────────
// const FAKE_NAME_PATTERNS = [
//   /^(.)\1{2,}$/i,
//   /^[^aeiou]{5,}$/i,
//   /^(test|fake|asdf|qwerty|admin|user|anon|anonymous|nobody|noone|noreply|abc|xyz)$/i,
//   /^[a-z]{1,2}$/i,
//   /\d{3,}/,
//   /^(.{1,3})\1{2,}$/i,
// ];

// // ─── Pure client-side validators ─────────────────────────────────────────────

// function validateName(value: string, field: "First" | "Last"): string | null {
//   const t = value.trim();
//   if (!t) return `${field} name is required.`;
//   if (t.length < 2) return `${field} name is too short.`;
//   if (t.length > 50) return `${field} name is too long.`;
//   if (!/^[\p{L}\p{M}'\- ]+$/u.test(t)) return `${field} name contains invalid characters.`;
//   for (const p of FAKE_NAME_PATTERNS) {
//     if (p.test(t)) return `Please enter a real ${field.toLowerCase()} name.`;
//   }
//   return null;
// }

// // function validateEmailFormat(value: string): string | null {
// //   const t = value.trim().toLowerCase();
// //   if (!t) return "Email is required.";
// //   if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(t)) return "Please enter a valid email address.";
// //   const domain = t.split("@")[1];
// //   if (DISPOSABLE_DOMAINS.has(domain)) return "Temporary/disposable email addresses are not accepted.";
// //   const local = t.split("@")[0];
// //   const fakeLocal = [
// //     /^(test|fake|asdf|qwerty|noreply|no-reply|donotreply|spam|trash|throwaway|temp|temporary)\d*$/i,
// //     /^(.)\1{4,}$/,
// //     /^\d+$/,
// //   ];
// //   for (const p of fakeLocal) {
// //     if (p.test(local)) return "Please use a real email address.";
// //   }
// //   return null;
// // }

// function validateEmailFormat(value: string): string | null {
//   const t = value.trim().toLowerCase()

//   if (!t) return "Email is required."

//   if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(t))
//     return "Please enter a valid email address."

//   return null
// }

// function validateSubject(v: string): string | null {
//   if (!v.trim()) return "Subject is required.";
//   if (v.trim().length < 3) return "Subject is too short.";
//   return null;
// }

// function validateMessage(v: string): string | null {
//   if (!v.trim()) return "Message is required.";
//   if (v.trim().length < 10) return "Message is too short (min 10 characters).";
//   return null;
// }

// // ─── DNS/MX check via our proxy route ────────────────────────────────────────

// type EmailCheckStatus = "idle" | "checking" | "valid" | "invalid";

// // async function checkEmail(email: string): Promise<{ valid: boolean; reason?: string }> {
// //   try {
// //     const res = await fetch(`/api/validateEmail?email=${encodeURIComponent(email)}`);
// //     if (!res.ok) return { valid: true };
// //     return res.json();
// //   } catch {
// //     return { valid: true };
// //   }
// // }

// async function checkEmail(email: string): Promise<{ valid: boolean; reason?: string }> {
//   try {
//     const res = await fetch(
//       `/api/validateEmail?email=${encodeURIComponent(email)}`,
//       { cache: "no-store" }
//     )

//     if (!res.ok) return { valid: true }

//     return res.json()
//   } catch {
//     return { valid: true }
//   }
// }


// // ─── Types ────────────────────────────────────────────────────────────────────

// type FormData = {
//   firstName: string;
//   lastName: string;
//   email: string;
//   subject: string;
//   message: string;
// };

// type FormErrors = Partial<Record<keyof FormData, string>>;

// // ─── Contact info ─────────────────────────────────────────────────────────────

// const contactInfo = [
//   { icon: Mail,   label: "Email",    value: "sukshmadarshini@gmail.com" },
//   { icon: Phone,  label: "Phone",    value: "+91 80101 77746" },
//   { icon: MapPin, label: "Location", value: "Pune, India" },
// ];

// // ─── Component ────────────────────────────────────────────────────────────────

// export function ContactSection() {
//   const { toast } = useToast();
//   const [loading, setLoading] = useState(false);
//   const [overlay, setOverlay] = useState<{ visible: boolean; success: boolean } | null>(null);
//   const [formData, setFormData] = useState<FormData>({
//     firstName: "", lastName: "", email: "", subject: "", message: "",
//   });
//   const [errors, setErrors]   = useState<FormErrors>({});
//   const [touched, setTouched] = useState<Partial<Record<keyof FormData, boolean>>>({});
//   const [emailCheckStatus, setEmailCheckStatus] = useState<EmailCheckStatus>("idle");
//   const emailDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

//   // ── Sync validation ──────────────────────────────────────────────────────
//   function runValidation(data: FormData): FormErrors {
//     return {
//       firstName: validateName(data.firstName, "First") ?? undefined,
//       lastName:  validateName(data.lastName, "Last")   ?? undefined,
//       email:     validateEmailFormat(data.email)        ?? undefined,
//       subject:   validateSubject(data.subject)          ?? undefined,
//       message:   validateMessage(data.message)          ?? undefined,
//     };
//   }

//   // ── Email blur → format check → DNS/MX check ────────────────────────────
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
//         email: result.valid ? undefined : (result.reason ?? "This email address could not be verified."),
//       }));
//     } catch {
//       setEmailCheckStatus("idle");
//     }
//   }

//   // ── Debounced check while typing (after first blur) ──────────────────────
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
//               email: result.valid ? undefined : (result.reason ?? "This email could not be verified."),
//             }));
//           } catch {
//             setEmailCheckStatus("idle");
//           }
//         }, 800);
//       }
//     }
//   }

//   function handleBlur(field: keyof FormData) {
//     if (field === "email") return;
//     setTouched((p) => ({ ...p, [field]: true }));
//     const errs = runValidation(formData);
//     setErrors((p) => ({ ...p, [field]: errs[field] }));
//   }

//   function handleChange(field: keyof FormData, value: string) {
//     if (field === "email") { handleEmailChange(value); return; }
//     const updated = { ...formData, [field]: value };
//     setFormData(updated);
//     if (touched[field]) {
//       const errs = runValidation(updated);
//       setErrors((p) => ({ ...p, [field]: errs[field] }));
//     }
//   }

//   // ── Submit ───────────────────────────────────────────────────────────────
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setTouched({ firstName: true, lastName: true, email: true, subject: true, message: true });

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
//       const res = await fetch("/api/contactEmail", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });
//       const data = await res.json();
//       if (!res.ok || !data.success) throw new Error("Failed");

//       setFormData({ firstName: "", lastName: "", email: "", subject: "", message: "" });
//       setErrors({});
//       setTouched({});
//       setEmailCheckStatus("idle");
//       setOverlay({ visible: true, success: true });
//     } catch {
//       setOverlay({ visible: true, success: false });
//     }
//     setLoading(false);
//   };

//   // ── Field error component ─────────────────────────────────────────────────
//   function FieldError({ field }: { field: keyof FormData }) {
//     if (!touched[field] || !errors[field]) return null;
//     return (
//       <p className="flex items-center gap-1 mt-1 text-xs text-destructive">
//         <AlertCircle className="w-3 h-3 shrink-0" />
//         {errors[field]}
//       </p>
//     );
//   }

//   // ── Email status indicator (icon inside input) ────────────────────────────
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

//   // ── Render ────────────────────────────────────────────────────────────────
//   return (
//     <>
//       <section id="contact" className="relative py-10 pb-0 bg-background overflow-hidden">
//         {/* Soft wave background */}
//         <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-primary/30 to-transparent" />
//         {/* Background pattern */}
//         {/* <div className="absolute inset-0 opacity-[0.05]">
//           <div className="absolute inset-0" style={{
//             backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
//           }} />
//         </div> */}

//         <div className="container mx-auto px-4 relative z-10">
//           <div className="grid lg:grid-cols-2 gap-16 items-start">

//             {/* LEFT CONTENT */}
//             <div>
//               <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
//                 <Mail className="w-4 h-4" />
//                 Get in Touch
//               </span>
//               <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-6">
//                 Let&apos;s <span className="text-gradient font-bold"> Connect </span>
//               </h2>
//               <p className="text-lg text-muted-foreground max-w-xl mb-12 leading-relaxed">
//                 Advance your biologics and omics pipeline with hands-on training,
//                 experimental design expertise, and applied consultation tailored
//                 to your research goals.
//               </p>
//               <div className="space-y-6">
//                 {contactInfo.map((item) => (
//                   <div key={item.label} className="flex items-center gap-4">
//                     <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
//                       <item.icon className="w-5 h-5 text-primary" />
//                     </div>
//                     <div>
//                       <div className="text-sm text-muted-foreground">{item.label}</div>
//                       <div className="font-medium text-foreground">{item.value}</div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* RIGHT FORM */}
//             <div className="bg-background rounded-3xl p-8 md:p-10 shadow-soft border border-border">
//               <form onSubmit={handleSubmit} className="space-y-6" noValidate>

//                 {/* First / Last name */}
//                 <div className="grid sm:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium mb-2">First Name</label>
//                     <Input
//                       placeholder="John"
//                       value={formData.firstName}
//                       onChange={(e) => handleChange("firstName", e.target.value)}
//                       onBlur={() => handleBlur("firstName")}
//                       className={touched.firstName && errors.firstName ? "border-destructive focus-visible:ring-destructive" : ""}
//                     />
//                     <FieldError field="firstName" />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium mb-2">Last Name</label>
//                     <Input
//                       placeholder="Doe"
//                       value={formData.lastName}
//                       onChange={(e) => handleChange("lastName", e.target.value)}
//                       onBlur={() => handleBlur("lastName")}
//                       className={touched.lastName && errors.lastName ? "border-destructive focus-visible:ring-destructive" : ""}
//                     />
//                     <FieldError field="lastName" />
//                   </div>
//                 </div>

//                 {/* Email with live status indicator */}
//                 <div>
//                   <label className="block text-sm font-medium mb-2">Email Address</label>
//                   <div className="relative">
//                     <Input
//                       type="email"
//                       placeholder="john@example.com"
//                       value={formData.email}
//                       onChange={(e) => handleChange("email", e.target.value)}
//                       onBlur={handleEmailBlur}
//                       className={`pr-9 ${emailBorderClass}`}
//                     />
//                     <EmailIndicator />
//                   </div>
//                   {touched.email && errors.email ? (
//                     <p className="flex items-center gap-1 mt-1 text-xs text-destructive">
//                       <AlertCircle className="w-3 h-3 shrink-0" /> {errors.email}
//                     </p>
//                   ) : emailCheckStatus === "checking" ? (
//                     <p className="mt-1 text-xs text-muted-foreground">Verifying email…</p>
//                   ) : emailCheckStatus === "valid" ? (
//                     <p className="flex items-center gap-1 mt-1 text-xs text-green-600">
//                       <CheckCircle2 className="w-3 h-3" /> Email verified
//                     </p>
//                   ) : null}
//                 </div>

//                 {/* Subject */}
//                 <div>
//                   <label className="block text-sm font-medium mb-2">Subject</label>
//                   <Input
//                     placeholder="How can we help?"
//                     value={formData.subject}
//                     onChange={(e) => handleChange("subject", e.target.value)}
//                     onBlur={() => handleBlur("subject")}
//                     className={touched.subject && errors.subject ? "border-destructive focus-visible:ring-destructive" : ""}
//                   />
//                   <FieldError field="subject" />
//                 </div>

//                 {/* Message */}
//                 <div>
//                   <label className="block text-sm font-medium mb-2">Message</label>
//                   <Textarea
//                     rows={5}
//                     placeholder="Tell us about your research needs..."
//                     className={`resize-none ${touched.message && errors.message ? "border-destructive focus-visible:ring-destructive" : ""}`}
//                     value={formData.message}
//                     onChange={(e) => handleChange("message", e.target.value)}
//                     onBlur={() => handleBlur("message")}
//                   />
//                   <FieldError field="message" />
//                 </div>

//                 <Button
//                   type="submit"
//                   size="lg"
//                   className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
//                   disabled={loading || emailCheckStatus === "checking"}
//                 >
//                   {loading ? (
//                     <><Loader2 className="animate-spin w-4 h-4 mr-2" />Sending...</>
//                   ) : (
//                     <><Send className="w-4 h-4 mr-2" />Send Message</>
//                   )}
//                 </Button>
//               </form>
//             </div>
//           </div>
//         </div>

//         {/* Wave decoration */}
//         <div className="relative h-32 overflow-hidden">
//           <svg className="absolute bottom-0 w-full" viewBox="0 0 1440 120" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
//             <path d="M0,60 C360,120 720,0 1080,60 C1260,90 1380,75 1440,60 L1440,120 L0,120 Z" fill="url(#waveGradient)" fillOpacity="0.3" />
//             <path d="M0,80 C360,40 720,100 1080,80 C1260,70 1380,85 1440,80 L1440,120 L0,120 Z" fill="url(#waveGradient)" fillOpacity="0.2" />
//             <defs>
//               <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
//                 <stop offset="0%" stopColor="hsl(var(--primary))" />
//                 <stop offset="50%" stopColor="hsl(var(--tertiary))" />
//                 <stop offset="100%" stopColor="hsl(var(--tertiary-foreground))" />
//               </linearGradient>
//             </defs>
//           </svg>
//         </div>

//         {/* Confirmation / Error Overlay */}
//         {overlay?.visible && (
//           <div
//             className="fixed inset-0 z-50 flex items-center justify-center p-4"
//             style={{ backgroundColor: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }}
//             onClick={() => setOverlay(null)}
//           >
//             <div
//               className="relative bg-background rounded-3xl shadow-2xl border border-border p-10 max-w-md w-full flex flex-col items-center text-center"
//               style={{ animation: "overlayIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) both" }}
//               onClick={(e) => e.stopPropagation()}
//             >
//               <button
//                 onClick={() => setOverlay(null)}
//                 className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors rounded-full p-1"
//                 aria-label="Close"
//               >
//                 <X className="w-5 h-5" />
//               </button>

//               <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 ${
//                 overlay.success ? "bg-green-100 dark:bg-green-900/30" : "bg-red-100 dark:bg-red-900/30"
//               }`}>
//                 {overlay.success ? (
//                   <CheckCircle2 className="w-10 h-10 text-green-600 dark:text-green-400" />
//                 ) : (
//                   <XCircle className="w-10 h-10 text-red-600 dark:text-red-400" />
//                 )}
//               </div>

//               <h3 className="font-display text-2xl font-bold text-foreground mb-2">
//                 {overlay.success ? "Message Sent!" : "Sending Failed"}
//               </h3>
//               <p className="text-muted-foreground text-base mb-8 leading-relaxed">
//                 {overlay.success
//                   ? "Thank you for reaching out. We'll get back to you shortly."
//                   : "Something went wrong while sending your message. Please try again later."}
//               </p>

//               <Button
//                 size="lg"
//                 className={`w-full ${
//                   overlay.success
//                     ? "bg-primary text-primary-foreground hover:bg-primary/90"
//                     : "bg-destructive text-destructive-foreground hover:bg-destructive/90"
//                 }`}
//                 onClick={() => setOverlay(null)}
//               >
//                 {overlay.success ? "Great, thanks!" : "Got it, I'll try again"}
//               </Button>
//             </div>

//             <style>{`
//               @keyframes overlayIn {
//                 from { opacity: 0; transform: scale(0.88) translateY(16px); }
//                 to   { opacity: 1; transform: scale(1) translateY(0); }
//               }
//             `}</style>
//           </div>
//         )}
//       </section>
//     </>
//   );
// }

"use client"
import { useRef, useState } from "react";
import { Mail, MapPin, Phone, Send, Loader2, CheckCircle2, XCircle, X, AlertCircle } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { useToast } from "../hooks/use-toast";

// // ─── Disposable domains (client-side fast-path) ───────────────────────────────
// const DISPOSABLE_DOMAINS = new Set([
//   "mailinator.com", "guerrillamail.com", "tempmail.com", "throwam.com",
//   "yopmail.com", "sharklasers.com", "guerrillamailblock.com", "grr.la",
//   "guerrillamail.info", "guerrillamail.biz", "guerrillamail.de",
//   "guerrillamail.net", "guerrillamail.org", "spam4.me", "trashmail.com",
//   "trashmail.me", "trashmail.at", "dispostable.com", "maildrop.cc",
//   "fakeinbox.com", "spamgourmet.com", "mailnull.com", "10minutemail.com",
//   "10minutemail.net", "tempr.email", "discard.email", "spamex.com",
//   "mytemp.email", "temp-mail.org", "tempinbox.com", "throwaway.email",
//   "wegwerfmail.de", "owlpic.com", "getnada.com",
// ]);

// ─── Fake name patterns ───────────────────────────────────────────────────────
const FAKE_NAME_PATTERNS = [
  /^(.)\1{2,}$/i,
  /^[^aeiou]{5,}$/i,
  /^(test|fake|asdf|qwerty|admin|user|anon|anonymous|nobody|noone|noreply|abc|xyz)$/i,
  /^[a-z]{1,2}$/i,
  /\d{3,}/,
  /^(.{1,3})\1{2,}$/i,
];

// ─── Pure client-side validators ─────────────────────────────────────────────

function validateName(value: string, field: "First" | "Last"): string | null {
  const t = value.trim();
  if (!t) return `${field} name is required.`;
  if (t.length < 2) return `${field} name is too short.`;
  if (t.length > 50) return `${field} name is too long.`;
  if (!/^[\p{L}\p{M}'\- ]+$/u.test(t)) return `${field} name contains invalid characters.`;
  for (const p of FAKE_NAME_PATTERNS) {
    if (p.test(t)) return `Please enter a real ${field.toLowerCase()} name.`;
  }
  return null;
}

// function validateEmailFormat(value: string): string | null {
//   const t = value.trim().toLowerCase();
//   if (!t) return "Email is required.";
//   if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(t)) return "Please enter a valid email address.";
//   const domain = t.split("@")[1];
//   if (DISPOSABLE_DOMAINS.has(domain)) return "Temporary/disposable email addresses are not accepted.";
//   const local = t.split("@")[0];
//   const fakeLocal = [
//     /^(test|fake|asdf|qwerty|noreply|no-reply|donotreply|spam|trash|throwaway|temp|temporary)\d*$/i,
//     /^(.)\1{4,}$/,
//     /^\d+$/,
//   ];
//   for (const p of fakeLocal) {
//     if (p.test(local)) return "Please use a real email address.";
//   }
//   return null;
// }

function validateEmailFormat(value: string): string | null {
  const t = value.trim().toLowerCase()

  if (!t) return "Email is required."

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(t))
    return "Please enter a valid email address."

  return null
}

function validateSubject(v: string): string | null {
  if (!v.trim()) return "Subject is required.";
  if (v.trim().length < 3) return "Subject is too short.";
  return null;
}

function validateMessage(v: string): string | null {
  if (!v.trim()) return "Message is required.";
  if (v.trim().length < 10) return "Message is too short (min 10 characters).";
  return null;
}

// ─── DNS/MX check via our proxy route ────────────────────────────────────────

type EmailCheckStatus = "idle" | "checking" | "valid" | "invalid";

// async function checkEmail(email: string): Promise<{ valid: boolean; reason?: string }> {
//   try {
//     const res = await fetch(`/api/validateEmail?email=${encodeURIComponent(email)}`);
//     if (!res.ok) return { valid: true };
//     return res.json();
//   } catch {
//     return { valid: true };
//   }
// }

async function checkEmail(email: string): Promise<{ valid: boolean; reason?: string }> {
  try {
    const res = await fetch(
      `/api/validateEmail?email=${encodeURIComponent(email)}`,
      { cache: "no-store" }
    )

    if (!res.ok) return { valid: true }

    return res.json()
  } catch {
    return { valid: true }
  }
}


// ─── Types ────────────────────────────────────────────────────────────────────

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

// ─── Contact info ─────────────────────────────────────────────────────────────

// ─── Props ────────────────────────────────────────────────────────────────────

interface ContactSectionProps {
  badge?:      string;
  heading?:    string;
  subheading?: string;
  email?:      string;
  phone?:      string;
  location?:   string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function ContactSection({
  badge      = "Get in Touch",
  heading    = "Let's Connect",
  subheading = "Advance your biologics and omics pipeline with hands-on training, experimental design expertise, and applied consultation tailored to your research goals.",
  email      = "sukshmadarshini@gmail.com",
  phone      = "+91 80101 77746",
  location   = "Pune, India",
}: ContactSectionProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [overlay, setOverlay] = useState<{ visible: boolean; success: boolean } | null>(null);
  const [formData, setFormData] = useState<FormData>({
    firstName: "", lastName: "", email: "", subject: "", message: "",
  });
  const [errors, setErrors]   = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormData, boolean>>>({});
  const [emailCheckStatus, setEmailCheckStatus] = useState<EmailCheckStatus>("idle");
  const emailDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Sync validation ──────────────────────────────────────────────────────
  function runValidation(data: FormData): FormErrors {
    return {
      firstName: validateName(data.firstName, "First") ?? undefined,
      lastName:  validateName(data.lastName, "Last")   ?? undefined,
      email:     validateEmailFormat(data.email)        ?? undefined,
      subject:   validateSubject(data.subject)          ?? undefined,
      message:   validateMessage(data.message)          ?? undefined,
    };
  }

  // ── Email blur → format check → DNS/MX check ────────────────────────────
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
        email: result.valid ? undefined : (result.reason ?? "This email address could not be verified."),
      }));
    } catch {
      setEmailCheckStatus("idle");
    }
  }

  // ── Debounced check while typing (after first blur) ──────────────────────
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
              email: result.valid ? undefined : (result.reason ?? "This email could not be verified."),
            }));
          } catch {
            setEmailCheckStatus("idle");
          }
        }, 800);
      }
    }
  }

  function handleBlur(field: keyof FormData) {
    if (field === "email") return;
    setTouched((p) => ({ ...p, [field]: true }));
    const errs = runValidation(formData);
    setErrors((p) => ({ ...p, [field]: errs[field] }));
  }

  function handleChange(field: keyof FormData, value: string) {
    if (field === "email") { handleEmailChange(value); return; }
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    if (touched[field]) {
      const errs = runValidation(updated);
      setErrors((p) => ({ ...p, [field]: errs[field] }));
    }
  }

  // ── Submit ───────────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ firstName: true, lastName: true, email: true, subject: true, message: true });

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
      const res = await fetch("/api/contactEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error("Failed");

      setFormData({ firstName: "", lastName: "", email: "", subject: "", message: "" });
      setErrors({});
      setTouched({});
      setEmailCheckStatus("idle");
      setOverlay({ visible: true, success: true });
    } catch {
      setOverlay({ visible: true, success: false });
    }
    setLoading(false);
  };

  // ── Field error component ─────────────────────────────────────────────────
  function FieldError({ field }: { field: keyof FormData }) {
    if (!touched[field] || !errors[field]) return null;
    return (
      <p className="flex items-center gap-1 mt-1 text-xs text-destructive">
        <AlertCircle className="w-3 h-3 shrink-0" />
        {errors[field]}
      </p>
    );
  }

  // ── Email status indicator (icon inside input) ────────────────────────────
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

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <>
      <section id="contact" className="relative py-10 pb-0 bg-background overflow-hidden">
        {/* Soft wave background */}
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-primary/30 to-transparent" />
        {/* Background pattern */}
        {/* <div className="absolute inset-0 opacity-[0.05]">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div> */}

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-start">

            {/* LEFT CONTENT */}
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
                <Mail className="w-4 h-4" />
                {badge}
              </span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-6">
                <span className="text-gradient font-bold">{heading}</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-xl mb-12 leading-relaxed">
                {subheading}
              </p>
              <div className="space-y-6">
                {[
                  { icon: Mail,   label: "Email",    value: email },
                  { icon: Phone,  label: "Phone",    value: phone },
                  { icon: MapPin, label: "Location", value: location },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">{item.label}</div>
                      <div className="font-medium text-foreground">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT FORM */}
            <div className="bg-background rounded-3xl p-8 md:p-10 shadow-soft border border-border">
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>

                {/* First / Last name */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">First Name</label>
                    <Input
                      placeholder="John"
                      value={formData.firstName}
                      onChange={(e) => handleChange("firstName", e.target.value)}
                      onBlur={() => handleBlur("firstName")}
                      className={touched.firstName && errors.firstName ? "border-destructive focus-visible:ring-destructive" : ""}
                    />
                    <FieldError field="firstName" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Last Name</label>
                    <Input
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={(e) => handleChange("lastName", e.target.value)}
                      onBlur={() => handleBlur("lastName")}
                      className={touched.lastName && errors.lastName ? "border-destructive focus-visible:ring-destructive" : ""}
                    />
                    <FieldError field="lastName" />
                  </div>
                </div>

                {/* Email with live status indicator */}
                <div>
                  <label className="block text-sm font-medium mb-2">Email Address</label>
                  <div className="relative">
                    <Input
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      onBlur={handleEmailBlur}
                      className={`pr-9 ${emailBorderClass}`}
                    />
                    <EmailIndicator />
                  </div>
                  {touched.email && errors.email ? (
                    <p className="flex items-center gap-1 mt-1 text-xs text-destructive">
                      <AlertCircle className="w-3 h-3 shrink-0" /> {errors.email}
                    </p>
                  ) : emailCheckStatus === "checking" ? (
                    <p className="mt-1 text-xs text-muted-foreground">Verifying email…</p>
                  ) : emailCheckStatus === "valid" ? (
                    <p className="flex items-center gap-1 mt-1 text-xs text-green-600">
                      <CheckCircle2 className="w-3 h-3" /> Email verified
                    </p>
                  ) : null}
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-medium mb-2">Subject</label>
                  <Input
                    placeholder="How can we help?"
                    value={formData.subject}
                    onChange={(e) => handleChange("subject", e.target.value)}
                    onBlur={() => handleBlur("subject")}
                    className={touched.subject && errors.subject ? "border-destructive focus-visible:ring-destructive" : ""}
                  />
                  <FieldError field="subject" />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <Textarea
                    rows={5}
                    placeholder="Tell us about your research needs..."
                    className={`resize-none ${touched.message && errors.message ? "border-destructive focus-visible:ring-destructive" : ""}`}
                    value={formData.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    onBlur={() => handleBlur("message")}
                  />
                  <FieldError field="message" />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  disabled={loading || emailCheckStatus === "checking"}
                >
                  {loading ? (
                    <><Loader2 className="animate-spin w-4 h-4 mr-2" />Sending...</>
                  ) : (
                    <><Send className="w-4 h-4 mr-2" />Send Message</>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/* Wave decoration */}
        <div className="relative h-32 overflow-hidden">
          <svg className="absolute bottom-0 w-full" viewBox="0 0 1440 120" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,60 C360,120 720,0 1080,60 C1260,90 1380,75 1440,60 L1440,120 L0,120 Z" fill="url(#waveGradient)" fillOpacity="0.3" />
            <path d="M0,80 C360,40 720,100 1080,80 C1260,70 1380,85 1440,80 L1440,120 L0,120 Z" fill="url(#waveGradient)" fillOpacity="0.2" />
            <defs>
              <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(var(--primary))" />
                <stop offset="50%" stopColor="hsl(var(--tertiary))" />
                <stop offset="100%" stopColor="hsl(var(--tertiary-foreground))" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Confirmation / Error Overlay */}
        {overlay?.visible && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }}
            onClick={() => setOverlay(null)}
          >
            <div
              className="relative bg-background rounded-3xl shadow-2xl border border-border p-10 max-w-md w-full flex flex-col items-center text-center"
              style={{ animation: "overlayIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) both" }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setOverlay(null)}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors rounded-full p-1"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 ${
                overlay.success ? "bg-green-100 dark:bg-green-900/30" : "bg-red-100 dark:bg-red-900/30"
              }`}>
                {overlay.success ? (
                  <CheckCircle2 className="w-10 h-10 text-green-600 dark:text-green-400" />
                ) : (
                  <XCircle className="w-10 h-10 text-red-600 dark:text-red-400" />
                )}
              </div>

              <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                {overlay.success ? "Message Sent!" : "Sending Failed"}
              </h3>
              <p className="text-muted-foreground text-base mb-8 leading-relaxed">
                {overlay.success
                  ? "Thank you for reaching out. We'll get back to you shortly."
                  : "Something went wrong while sending your message. Please try again later."}
              </p>

              <Button
                size="lg"
                className={`w-full ${
                  overlay.success
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "bg-destructive text-destructive-foreground hover:bg-destructive/90"
                }`}
                onClick={() => setOverlay(null)}
              >
                {overlay.success ? "Great, thanks!" : "Got it, I'll try again"}
              </Button>
            </div>

            <style>{`
              @keyframes overlayIn {
                from { opacity: 0; transform: scale(0.88) translateY(16px); }
                to   { opacity: 1; transform: scale(1) translateY(0); }
              }
            `}</style>
          </div>
        )}
      </section>
    </>
  );
}