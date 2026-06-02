// // "use client";

// // import { useState } from "react";
// // import Image from "next/image";
// // import {
// //   Clock,
// //   Play,
// //   Share2,
// //   BookOpen,
// //   CheckCircle,
// //   ChevronRight,
// //   Mail,
// //   User,
// //   MailCheck,
// //   Briefcase,
// //   Globe,
// //   Users,
// //   Calendar,
// //   MapPin,
// //   Pin,
// //   Clock3,
// //   CircleAlert,
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

// // interface ConsultationItem {
// //   id: number;
// //   title: string;
// //   duration: string;
// //   thumbnail: string;
// //   mode: string;
// //   audience: string;
// //   description: string;
// //   includes: string[];
// //   cta: string;
// // }

// // interface ConsultationDetailDialogProps {
// //   service: ConsultationItem | null;
// //   open: boolean;
// //   onOpenChange: (open: boolean) => void;
// //   isBooked: boolean;
// //   onBookingComplete?: (serviceId: number) => void;
// // }

// // /* -------------------- Consultation Data -------------------- */

// // const consultationDetails: Record<
// //   number,
// //   {
// //     price: string;
// //     perSession: boolean;
// //     audience: string;
// //     description: string;
// //     includes: string[];
// //     cta: string;
// //   }
// // > = {
// //   1: {
// //     price: "₹3,500",
// //     perSession: true,
// //     audience: "Researchers • Labs • Institutions",
// //     description:
// //       "Strategic consulting support for experimental design, LC–MS/MS workflows, and sample preparation optimization in plant proteomics research.",
// //     includes: [
// //       "Plant tissue protein extraction strategies",
// //       "Sample clean-up & digestion optimization",
// //       "DDA & DIA workflow planning",
// //       "Contaminant mitigation & QC strategy",
// //       "Targeted vs discovery proteomics planning",
// //       "Free 15-minute discovery call",
// //     ],
// //     cta: "Book Session",
// //   },
// //   2: {
// //     price: "₹2,500",
// //     perSession: true,
// //     audience: "Biotech • Agriculture • Molecular Biology Students",
// //     description:
// //       "Scientific profile evaluation and strategic recommendations for Master's or PhD pathways in Europe.",
// //     includes: [
// //       "Scientific CV review",
// //       "Program alignment advice",
// //       "Skill gap assessment",
// //       "Personalized academic strategy guidance",
// //     ],
// //     cta: "Book Session",
// //   },
// //   3: {
// //     price: "₹2,500",
// //     perSession: true,
// //     audience: "Students applying to European universities",
// //     description:
// //       "Structured guidance for university selection, SOP improvement, and application planning.",
// //     includes: [
// //       "University shortlist (5–7 programs)",
// //       "SOP review (1 round)",
// //       "CV optimization",
// //       "Application timeline planning",
// //     ],
// //     cta: "Book Session",
// //   },
// //   4: {
// //     price: "₹20,000",
// //     perSession: false,
// //     audience: "Serious Master's / PhD applicants",
// //     description:
// //       "End-to-end structured mentorship for European academic admissions, research alignment, and interview preparation.",
// //     includes: [
// //       "Research alignment strategy",
// //       "University shortlisting",
// //       "SOP drafting guidance",
// //       "Multiple review rounds",
// //       "Interview preparation",
// //       "Skill development roadmap",
// //       "End-to-end mentorship support",
// //     ],
// //     cta: "Apply for Mentorship",
// //   },
// // };

// // /* -------------------- Helpers -------------------- */

// // const handleShare = (title: string, id: number) => {
// //   const url = `${window.location.origin}/services?consultation=${id}`;
// //   if (navigator.share) {
// //     navigator.share({ title, text: `Check out this service: ${title}`, url });
// //   } else {
// //     navigator.clipboard.writeText(url);
// //   }
// // };

// // /* -------------------- Component -------------------- */

// // export default function ConsultationDetailDialog({
// //   service,
// //   open,
// //   onOpenChange,
// //   isBooked,
// //   onBookingComplete,
// // }: ConsultationDetailDialogProps) {
// //   const { toast } = useToast();
// //   const [showBookModal, setShowBookModal] = useState(false);
// //   const [step, setStep] = useState<"form" | "slots" | "confirmation">("form");
// //   const [availableSlots, setAvailableSlots] = useState<string[]>([]);
// //   const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
// //   const [loadingSlots, setLoadingSlots] = useState(false);
// //   const [confirmingSlot, setConfirmingSlot] = useState(false);
// //   const [formData, setFormData] = useState({
// //     name: "",
// //     email: "",
// //     organization: "",
// //   });

// //   if (!service) return null;

// //   const details = consultationDetails[service.id] ?? consultationDetails[1];

// //   /* ---- Step 1 → 2: fetch available slots ---- */
// //   async function handleFormSubmit(e: React.FormEvent) {
// //     e.preventDefault();
// //     setLoadingSlots(true);
// //     try {
// //       const res = await fetch(`/api/calendar?serviceId=${service!.id}`);
// //       const data = await res.json();
// //       setAvailableSlots(data.slots ?? []);
// //       setStep("slots");
// //     } catch {
// //       toast({ title: "Error", description: "Could not fetch available slots. Please try again." });
// //     } finally {
// //       setLoadingSlots(false);
// //     }
// //   }

// //   /* ---- Step 2 → 3: confirm booking ---- */
// //   async function handleConfirmSlot() {
// //     if (!selectedSlot) return;
// //     setConfirmingSlot(true);
// //     try {
// //       await fetch("/api/calendar", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({
// //           serviceTitle: service!.title,
// //           slot: selectedSlot,
// //           formData,
// //         }),
// //       });
// //       setStep("confirmation");
// //     } catch {
// //       toast({ title: "Error", description: "Could not confirm booking. Please try again." });
// //     } finally {
// //       setConfirmingSlot(false);
// //     }
// //   }

// //   /* ---- Reset modal state on close ---- */
// //   function handleModalClose(open: boolean) {
// //     if (!open) {
// //       setStep("form");
// //       setSelectedSlot(null);
// //       setAvailableSlots([]);
// //     }
// //     setShowBookModal(open);
// //   }

// //   /* -------------------- Render -------------------- */

// //   return (
// //     <>
// //       {/* ── Detail Dialog ── */}
// //       <Dialog open={open} onOpenChange={onOpenChange}>
// //         <DialogTitle>{service.title}</DialogTitle>
// //         <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto p-0">
// //           {/* Hero */}
// //           <div className="relative h-52">
// //             <Image
// //               src={service.thumbnail}
// //               alt={service.title}
// //               fill
// //               className="object-cover rounded-t-lg"
// //             />
// //             <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-t-lg" />
// //             <div className="absolute bottom-4 left-4 right-4">
// //               <h2 className="text-xl font-bold text-white">{service.title}</h2>
// //               <p className="text-sm text-white/80">Sukshmadarshini™</p>
// //             </div>
// //           </div>

// //           <div className="p-6 space-y-5">
// //             {/* Meta */}
// //             <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
// //               <span className="flex items-center gap-1">
// //                 <Clock className="w-4 h-4" />
// //                 {service.duration}
// //               </span>
// //               <span className="flex items-center gap-1">
// //                 <Globe className="w-4 h-4" />
// //                 {service.mode}
// //               </span>
// //               <span className="flex items-center gap-1">
// //                 <Users className="w-4 h-4" />
// //                 {details.audience}
// //               </span>
// //             </div>

// //             <p className="text-sm text-muted-foreground leading-relaxed">
// //               {details.description}
// //             </p>

// //             <Separator />

// //             {/* Pricing */}
// //             <div className="flex items-center justify-between">
// //               <div className="flex items-baseline gap-1">
// //                 <span className="text-2xl font-bold">{details.price}</span>
// //                 {details.perSession && (
// //                   <span className="text-sm text-muted-foreground">/session</span>
// //                 )}
// //               </div>
// //               <Button
// //                 variant="ghost"
// //                 size="icon"
// //                 onClick={() => handleShare(service.title, service.id)}
// //               >
// //                 <Share2 className="w-5 h-5" />
// //               </Button>
// //             </div>

// //             <Separator />

// //             {/* Includes */}
// //             <div>
// //               <h3 className="font-semibold mb-3 flex items-center gap-2">
// //                 <BookOpen className="w-4 h-4" />
// //                 This service includes
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
// //               disabled={isBooked}
// //               onClick={() => setShowBookModal(true)}
// //             >
// //               {isBooked ? (
// //                 <>
// //                   <Play className="w-4 h-4 mr-2" />
// //                   Already Booked
// //                 </>
// //               ) : (
// //                 <>
// //                   <Briefcase className="w-4 h-4 mr-2" />
// //                   {details.cta}
// //                 </>
// //               )}
// //             </Button>
// //           </div>
// //         </DialogContent>
// //       </Dialog>

// //       {/* ── Booking Modal ── */}
// //       <Dialog open={showBookModal} onOpenChange={handleModalClose}>
// //         <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
// //           <DialogHeader>
// //             <DialogTitle className="text-2xl font-display">
// //               {step === "form" && "Register Your Interest"}
// //               {step === "slots" && "Choose a Time Slot"}
// //               {step === "confirmation" && "Booking Confirmed!"}
// //             </DialogTitle>
// //             <DialogDescription>
// //               {step === "form" && "Enter your details to see available slots."}
// //               {step === "slots" && "All times shown in IST. Select a 1-hour slot."}
// //               {step === "confirmation"}
// //             </DialogDescription>
// //           </DialogHeader>

// //           {/* ── Step 1: Form ── */}
// //           {step === "form" && (
// //             <form onSubmit={handleFormSubmit} className="space-y-4 pt-4">
// //               <div className="space-y-2">
// //                 <Label htmlFor="name">Full Name *</Label>
// //                 <div className="relative">
// //                   <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
// //                   <Input
// //                     id="name"
// //                     placeholder="John Doe"
// //                     value={formData.name}
// //                     onChange={(e) => setFormData({ ...formData, name: e.target.value })}
// //                     className="pl-10"
// //                     required
// //                   />
// //                 </div>
// //               </div>

// //               <div className="space-y-2">
// //                 <Label htmlFor="email">Email Address *</Label>
// //                 <div className="relative">
// //                   <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
// //                   <Input
// //                     id="email"
// //                     type="email"
// //                     placeholder="you@example.com"
// //                     value={formData.email}
// //                     onChange={(e) => setFormData({ ...formData, email: e.target.value })}
// //                     className="pl-10"
// //                     required
// //                   />
// //                 </div>
// //               </div>

// //               {/* <div className="space-y-2">
// //                 <Label htmlFor="organization">Organization (Optional)</Label>
// //                 <Input
// //                   id="organization"
// //                   placeholder="Your University/Company"
// //                   value={formData.organization}
// //                   onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
// //                 />
// //               </div> */}

// //               <Button type="submit" className="w-full mt-6" disabled={loadingSlots}>
// //                 {loadingSlots ? "Checking availability…" : "See Available Slots"}
// //                 <ChevronRight className="w-4 h-4 ml-2" />
// //               </Button>
// //             </form>
// //           )}

// //           {/* ── Step 2: Slot Picker ── */}
// //           {/* {step === "slots" && (
// //             <div className="space-y-4 pt-4">
// //               {availableSlots.length === 0 ? (
// //                 <p className="text-sm text-muted-foreground text-center py-6">
// //                   No available slots in the next 7 days. Please check back later.
// //                 </p>
// //               ) : (
// //                 <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto pr-1">
// //                   {availableSlots.map((slot) => {
// //                     const d = new Date(slot);
// //                     const label = d.toLocaleString("en-IN", {
// //                       weekday: "short",
// //                       month: "short",
// //                       day: "numeric",
// //                       hour: "2-digit",
// //                       minute: "2-digit",
// //                       timeZone: "Asia/Kolkata",
// //                     });
// //                     return (
// //                       <button
// //                         key={slot}
// //                         type="button"
// //                         onClick={() => setSelectedSlot(slot)}
// //                         className={`text-xs p-2 rounded border transition-colors text-left ${
// //                           selectedSlot === slot
// //                             ? "bg-primary text-primary-foreground border-primary"
// //                             : "border-border hover:border-primary"
// //                         }`}
// //                       >
// //                         {label}
// //                       </button>
// //                     );
// //                   })}
// //                 </div>
// //               )}

// //               <Button
// //                 className="w-full"
// //                 disabled={!selectedSlot || confirmingSlot}
// //                 onClick={handleConfirmSlot}
// //               >
// //                 <Calendar className="w-4 h-4 mr-2" />
// //                 {confirmingSlot ? "Confirming…" : "Confirm Booking"}
// //               </Button>

// //               <Button
// //                 variant="ghost"
// //                 className="w-full"
// //                 onClick={() => setStep("form")}
// //               >
// //                 ← Back
// //               </Button>
// //             </div>
// //           )} */}
// //           {step === "slots" && (
// //             <div className="space-y-4 pt-4">
// //               {availableSlots.length === 0 ? (
// //                 <p className="text-sm text-muted-foreground text-center py-6">
// //                   No available slots in the next 7 days. Please check back later.
// //                 </p>
// //               ) : (
// //                 <div className="max-h-72 overflow-y-auto pr-1 space-y-4">
// //                   {/* Group slots by day */}
// //                   {Object.entries(
// //                     availableSlots.reduce<Record<string, string[]>>((groups, slot) => {
// //                       const day = new Date(slot).toLocaleDateString("en-IN", {
// //                         weekday: "long",
// //                           month: "long",
// //                           day: "numeric",
// //                           timeZone: "Asia/Kolkata",
// //                       });
// //                       if (!groups[day]) groups[day] = [];
// //                       groups[day].push(slot);
// //                       return groups;
// //                     }, {})
// //                   ).map(([day, daySlots]) => (
// //                     <div key={day}>
// //                       {/* Day header */}
// //                       <div className="mb-2">
// //                         <p className="text-base font-semibold text-foreground">{day}</p>
// //                         <Separator />
// //                       </div>

// //                       {/* 2-column slot grid */}
// //                       <div className="grid grid-cols-2 gap-2">
// //                         {daySlots.map((slot) => {
// //                           const time = new Date(slot).toLocaleTimeString("en-IN", {
// //                             hour: "2-digit",
// //                             minute: "2-digit",
// //                             hour12: true,
// //                             timeZone: "Asia/Kolkata",
// //                           });
// //                           return (
// //                             <button
// //                               key={slot}
// //                               type="button"
// //                               onClick={() => setSelectedSlot(slot)}
// //                               className={`text-sm py-2 px-3 rounded-md border transition-colors text-center ${
// //                                 selectedSlot === slot
// //                                   ? "bg-primary text-primary-foreground border-primary"
// //                                   : "bg-muted text-muted-foreground border-transparent hover:border-primary hover:text-foreground"
// //                               }`}
// //                             >
// //                               {time}
// //                             </button>
// //                           );
// //                         })}
// //                       </div>
// //                     </div>
// //                   ))}
// //                 </div>
// //               )}

// //               <Button
// //                 className="w-full"
// //                 disabled={!selectedSlot || confirmingSlot}
// //                 onClick={handleConfirmSlot}
// //               >
// //                 <Calendar className="w-4 h-4 mr-2" />
// //                 {confirmingSlot ? "Confirming…" : "Confirm Booking"}
// //               </Button>

// //               <Button variant="ghost" className="w-full hover:bg-primary/30" onClick={() => setStep("form")}>
// //                 ← Back
// //               </Button>
// //             </div>
// //           )}

// //           {/* ── Step 3: Confirmation ── */}
// //           {step === "confirmation" && (
// //             <div className="space-y-4 pt-0">
// //               <MailCheck className="w-28 h-28 mx-auto text-primary" />
// //               <p className="text-sm text-muted-foreground leading-relaxed">
// //                 Your slot{" "}
// //                 {/* <span className="font-semibold text-foreground">{service.title}</span>{" "} */}
// //                 has been successfully reserved.
// //               </p>
// //               <p className="text-sm text-muted-foreground leading-relaxed">
// //                 {/* <br /><br /> */}
// //                 {selectedSlot && (
// //                   <>
// //                   <div className="flex flex-row mb-1">
// //                     <Pin className="w-5 h-5 mr-2 text-primary" /> <span className="font-semibold text-foreground">
// //                       {service.title}
// //                     </span>
// //                   </div>
// //                   <div className="flex flex-row mb-1">
// //                     <MapPin className="w-5 h-5 mr-2 text-primary"/> <span className="font-semibold text-md text-foreground">
// //                       {new Date(selectedSlot).toLocaleString("en-IN", {
// //                         weekday: "long",
// //                         month: "long",
// //                         day: "numeric",
// //                       })}
// //                     </span>
// //                   </div>
// //                   <div className="flex flex-row mb-1">
// //                     <Clock3 className="w-5 h-5 mr-2 text-primary" /> <span className="font-semibold text-foreground">
// //                       {new Date(selectedSlot).toLocaleString("en-IN", {
// //                         hour: "2-digit",
// //                         minute: "2-digit",
// //                         timeZone: "Asia/Kolkata",
// //                       })} IST
// //                     </span>
// //                   </div>
// //                     {/* <br /><br /> */}
// //                   </>
// //                 )}
// //                 {/* You will receive the confirmation email  in a few hours.
// //                 <br />
// //                 To confirm your booking, please complete the payment using the QR code sent to your email.
// //                 <br /><br /> */}
// //                 </p>
// //                 <p className="text-sm text-muted-foreground leading-relaxed">
// //                 This is a paid consultation service, and payment is required to confirm your booking.
// //                 </p>
// //                 <p className="text-sm text-muted-foreground leading-relaxed">
// //                 {/* ⏳
// //                 <span className="font-semibold text-foreground">Important:</span>{" "}
// //                 <br /> */}
// //                 Detailed instructions for completing your booking have been sent to your email.
// //                 <br /><br />
// //                 {/* <span className="font-semibold text-foreground">{formData.email}</span>. */}
// //                 <div className="flex flex-row items-center mb-1">
// //                 <CircleAlert className="w-4 h-4 mr-1 text-rose-600"/>
// //                 <span className="font-semibold text-xs text-rose-600">Slot Held Temporary:</span>{" "} 
// //                 {" "}<span className="font-semibold text-xs text-primary ml-1">It will auto-cancel if unpaid 1 hour prior.</span>
// //                 </div>
// //               </p>
// //               <Button
// //                 className="w-full"
// //                 onClick={() => {
// //                   const stored = localStorage.getItem("sukshmadarshini_enrolled_courses") || "[]";
// //                   const enrolled = JSON.parse(stored);
// //                   if (!enrolled.includes(service.id)) enrolled.push(service.id);
// //                   localStorage.setItem("sukshmadarshini_enrolled_courses", JSON.stringify(enrolled));
// //                   localStorage.setItem("sukshmadarshini_user", JSON.stringify(formData));
// //                   toast({
// //                     title: "Booking confirmed!",
// //                     description: `Calendar invite sent for "${service.title}"`,
// //                   });
// //                   setShowBookModal(false);
// //                   setStep("form");
// //                   setSelectedSlot(null);
// //                   onBookingComplete?.(service.id);
// //                 }}
// //               >
// //                 Done
// //               </Button>
// //             </div>
// //           )}
// //         </DialogContent>
// //       </Dialog>
// //     </>
// //   );
// // }

// // "use client";

// // import { useState } from "react";
// // import Image from "next/image";
// // import {
// //   Clock,
// //   Play,
// //   Share2,
// //   BookOpen,
// //   CheckCircle,
// //   ChevronRight,
// //   Mail,
// //   User,
// //   MailCheck,
// //   Briefcase,
// //   Globe,
// //   Users,
// //   Calendar,
// //   MapPin,
// //   Pin,
// //   Clock3,
// //   CircleAlert,
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

// // interface ConsultationItem {
// //   id: number;
// //   title: string;
// //   duration: string;
// //   thumbnail: string;
// //   mode: string;
// //   audience: string;
// //   description: string;
// //   includes: string[];
// //   cta: string;
// // }

// // interface ConsultationDetailDialogProps {
// //   service: ConsultationItem | null;
// //   open: boolean;
// //   onOpenChange: (open: boolean) => void;
// //   isBooked: boolean;
// //   onBookingComplete?: (serviceId: number) => void;
// // }

// // /* -------------------- Consultation Data -------------------- */

// // const consultationDetails: Record<
// //   number,
// //   {
// //     price: string;
// //     perSession: boolean;
// //     audience: string;
// //     description: string;
// //     includes: string[];
// //     cta: string;
// //   }
// // > = {
// //   1: {
// //     price: "₹3,500",
// //     perSession: true,
// //     audience: "Researchers • Labs • Institutions",
// //     description:
// //       "Strategic consulting support for experimental design, LC–MS/MS workflows, and sample preparation optimization in plant proteomics research.",
// //     includes: [
// //       "Plant tissue protein extraction strategies",
// //       "Sample clean-up & digestion optimization",
// //       "DDA & DIA workflow planning",
// //       "Contaminant mitigation & QC strategy",
// //       "Targeted vs discovery proteomics planning",
// //       "Free 15-minute discovery call",
// //     ],
// //     cta: "Book Session",
// //   },
// //   2: {
// //     price: "₹2,500",
// //     perSession: true,
// //     audience: "Biotech • Agriculture • Molecular Biology Students",
// //     description:
// //       "Scientific profile evaluation and strategic recommendations for Master's or PhD pathways in Europe.",
// //     includes: [
// //       "Scientific CV review",
// //       "Program alignment advice",
// //       "Skill gap assessment",
// //       "Personalized academic strategy guidance",
// //     ],
// //     cta: "Book Session",
// //   },
// //   3: {
// //     price: "₹2,500",
// //     perSession: true,
// //     audience: "Students applying to European universities",
// //     description:
// //       "Structured guidance for university selection, SOP improvement, and application planning.",
// //     includes: [
// //       "University shortlist (5–7 programs)",
// //       "SOP review (1 round)",
// //       "CV optimization",
// //       "Application timeline planning",
// //     ],
// //     cta: "Book Session",
// //   },
// //   4: {
// //     price: "₹20,000",
// //     perSession: false,
// //     audience: "Serious Master's / PhD applicants",
// //     description:
// //       "End-to-end structured mentorship for European academic admissions, research alignment, and interview preparation.",
// //     includes: [
// //       "Research alignment strategy",
// //       "University shortlisting",
// //       "SOP drafting guidance",
// //       "Multiple review rounds",
// //       "Interview preparation",
// //       "Skill development roadmap",
// //       "End-to-end mentorship support",
// //     ],
// //     cta: "Apply for Mentorship",
// //   },
// // };

// // /* -------------------- Helpers -------------------- */

// // const handleShare = (title: string, id: number) => {
// //   const url = `${window.location.origin}/services?consultation=${id}`;
// //   if (navigator.share) {
// //     navigator.share({ title, text: `Check out this service: ${title}`, url });
// //   } else {
// //     navigator.clipboard.writeText(url);
// //   }
// // };

// // /* -------------------- Component -------------------- */

// // export default function ConsultationDetailDialog({
// //   service,
// //   open,
// //   onOpenChange,
// //   isBooked,
// //   onBookingComplete,
// // }: ConsultationDetailDialogProps) {
// //   const { toast } = useToast();
// //   const [showBookModal, setShowBookModal] = useState(false);
// //   const [step, setStep] = useState<"form" | "slots" | "confirmation">("form");
// //   const [availableSlots, setAvailableSlots] = useState<string[]>([]);
// //   const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
// //   const [loadingSlots, setLoadingSlots] = useState(false);
// //   const [confirmingSlot, setConfirmingSlot] = useState(false);
// //   const [formData, setFormData] = useState({
// //     name: "",
// //     email: "",
// //     organization: "",
// //   });

// //   if (!service) return null;

// //   const details = consultationDetails[service.id] ?? consultationDetails[1];

// //   /* ---- Step 1 → 2: fetch available slots ---- */
// //   async function handleFormSubmit(e: React.FormEvent) {
// //     e.preventDefault();
// //     setLoadingSlots(true);
// //     try {
// //       const res = await fetch(`/api/calendar?serviceId=${service!.id}`);
// //       const data = await res.json();
// //       setAvailableSlots(data.slots ?? []);
// //       setStep("slots");
// //     } catch {
// //       toast({ title: "Error", description: "Could not fetch available slots. Please try again." });
// //     } finally {
// //       setLoadingSlots(false);
// //     }
// //   }

// //   /* ---- Step 2 → 3: confirm booking + send payment email ---- */
// //   async function handleConfirmSlot() {
// //     if (!selectedSlot) return;
// //     setConfirmingSlot(true);
// //     try {
// //       // 1. Book the calendar slot (existing)
// //       await fetch("/api/calendar", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({
// //           serviceTitle: service!.title,
// //           slot: selectedSlot,
// //           formData,
// //         }),
// //       });

// //       // 2. Send payment email with UPI QR to the customer
// //       const emailRes = await fetch("/api/consultationsEmail", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({
// //           name:         formData.name,
// //           email:        formData.email,
// //           serviceId:    service!.id,
// //           serviceTitle: service!.title,
// //           selectedSlot,
// //         }),
// //       });
// //       const emailData = await emailRes.json();
// //       if (!emailRes.ok || !emailData.success) {
// //         // Non-blocking: slot is still booked, just warn
// //         console.warn("[consultationEmail] Email send failed:", emailData.error);
// //         toast({
// //           title: "Slot booked — email issue",
// //           description: "Your slot is confirmed but the payment email could not be sent. Please contact us.",
// //         });
// //       }

// //       setStep("confirmation");
// //     } catch {
// //       toast({ title: "Error", description: "Could not confirm booking. Please try again." });
// //     } finally {
// //       setConfirmingSlot(false);
// //     }
// //   }

// //   /* ---- Reset modal state on close ---- */
// //   function handleModalClose(open: boolean) {
// //     if (!open) {
// //       setStep("form");
// //       setSelectedSlot(null);
// //       setAvailableSlots([]);
// //     }
// //     setShowBookModal(open);
// //   }

// //   /* -------------------- Render -------------------- */

// //   return (
// //     <>
// //       {/* ── Detail Dialog ── */}
// //       <Dialog open={open} onOpenChange={onOpenChange}>
// //         <DialogTitle>{service.title}</DialogTitle>
// //         <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto p-0">
// //           {/* Hero */}
// //           <div className="relative h-52">
// //             <Image
// //               src={service.thumbnail}
// //               alt={service.title}
// //               fill
// //               className="object-cover rounded-t-lg"
// //             />
// //             <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-t-lg" />
// //             <div className="absolute bottom-4 left-4 right-4">
// //               <h2 className="text-xl font-bold text-white">{service.title}</h2>
// //               <p className="text-sm text-white/80">Sukshmadarshini™</p>
// //             </div>
// //           </div>

// //           <div className="p-6 space-y-5">
// //             {/* Meta */}
// //             <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
// //               <span className="flex items-center gap-1">
// //                 <Clock className="w-4 h-4" />
// //                 {service.duration}
// //               </span>
// //               <span className="flex items-center gap-1">
// //                 <Globe className="w-4 h-4" />
// //                 {service.mode}
// //               </span>
// //               <span className="flex items-center gap-1">
// //                 <Users className="w-4 h-4" />
// //                 {details.audience}
// //               </span>
// //             </div>

// //             <p className="text-sm text-muted-foreground leading-relaxed">
// //               {details.description}
// //             </p>

// //             <Separator />

// //             {/* Pricing */}
// //             <div className="flex items-center justify-between">
// //               <div className="flex items-baseline gap-1">
// //                 <span className="text-2xl font-bold">{details.price}</span>
// //                 {details.perSession && (
// //                   <span className="text-sm text-muted-foreground">/session</span>
// //                 )}
// //               </div>
// //               <Button
// //                 variant="ghost"
// //                 size="icon"
// //                 onClick={() => handleShare(service.title, service.id)}
// //               >
// //                 <Share2 className="w-5 h-5" />
// //               </Button>
// //             </div>

// //             <Separator />

// //             {/* Includes */}
// //             <div>
// //               <h3 className="font-semibold mb-3 flex items-center gap-2">
// //                 <BookOpen className="w-4 h-4" />
// //                 This service includes
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
// //               disabled={isBooked}
// //               onClick={() => setShowBookModal(true)}
// //             >
// //               {isBooked ? (
// //                 <>
// //                   <Play className="w-4 h-4 mr-2" />
// //                   Already Booked
// //                 </>
// //               ) : (
// //                 <>
// //                   <Briefcase className="w-4 h-4 mr-2" />
// //                   {details.cta}
// //                 </>
// //               )}
// //             </Button>
// //           </div>
// //         </DialogContent>
// //       </Dialog>

// //       {/* ── Booking Modal ── */}
// //       <Dialog open={showBookModal} onOpenChange={handleModalClose}>
// //         <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
// //           <DialogHeader>
// //             <DialogTitle className="text-2xl font-display">
// //               {step === "form" && "Register Your Interest"}
// //               {step === "slots" && "Choose a Time Slot"}
// //               {step === "confirmation" && "Booking Confirmed!"}
// //             </DialogTitle>
// //             <DialogDescription>
// //               {step === "form" && "Enter your details to see available slots."}
// //               {step === "slots" && "All times shown in IST. Select a 1-hour slot."}
// //               {step === "confirmation"}
// //             </DialogDescription>
// //           </DialogHeader>

// //           {/* ── Step 1: Form ── */}
// //           {step === "form" && (
// //             <form onSubmit={handleFormSubmit} className="space-y-4 pt-4">
// //               <div className="space-y-2">
// //                 <Label htmlFor="name">Full Name *</Label>
// //                 <div className="relative">
// //                   <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
// //                   <Input
// //                     id="name"
// //                     placeholder="John Doe"
// //                     value={formData.name}
// //                     onChange={(e) => setFormData({ ...formData, name: e.target.value })}
// //                     className="pl-10"
// //                     required
// //                   />
// //                 </div>
// //               </div>

// //               <div className="space-y-2">
// //                 <Label htmlFor="email">Email Address *</Label>
// //                 <div className="relative">
// //                   <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
// //                   <Input
// //                     id="email"
// //                     type="email"
// //                     placeholder="you@example.com"
// //                     value={formData.email}
// //                     onChange={(e) => setFormData({ ...formData, email: e.target.value })}
// //                     className="pl-10"
// //                     required
// //                   />
// //                 </div>
// //               </div>

// //               {/* <div className="space-y-2">
// //                 <Label htmlFor="organization">Organization (Optional)</Label>
// //                 <Input
// //                   id="organization"
// //                   placeholder="Your University/Company"
// //                   value={formData.organization}
// //                   onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
// //                 />
// //               </div> */}

// //               <Button type="submit" className="w-full mt-6" disabled={loadingSlots}>
// //                 {loadingSlots ? "Checking availability…" : "See Available Slots"}
// //                 <ChevronRight className="w-4 h-4 ml-2" />
// //               </Button>
// //             </form>
// //           )}

// //           {/* ── Step 2: Slot Picker ── */}
// //           {/* {step === "slots" && (
// //             <div className="space-y-4 pt-4">
// //               {availableSlots.length === 0 ? (
// //                 <p className="text-sm text-muted-foreground text-center py-6">
// //                   No available slots in the next 7 days. Please check back later.
// //                 </p>
// //               ) : (
// //                 <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto pr-1">
// //                   {availableSlots.map((slot) => {
// //                     const d = new Date(slot);
// //                     const label = d.toLocaleString("en-IN", {
// //                       weekday: "short",
// //                       month: "short",
// //                       day: "numeric",
// //                       hour: "2-digit",
// //                       minute: "2-digit",
// //                       timeZone: "Asia/Kolkata",
// //                     });
// //                     return (
// //                       <button
// //                         key={slot}
// //                         type="button"
// //                         onClick={() => setSelectedSlot(slot)}
// //                         className={`text-xs p-2 rounded border transition-colors text-left ${
// //                           selectedSlot === slot
// //                             ? "bg-primary text-primary-foreground border-primary"
// //                             : "border-border hover:border-primary"
// //                         }`}
// //                       >
// //                         {label}
// //                       </button>
// //                     );
// //                   })}
// //                 </div>
// //               )}

// //               <Button
// //                 className="w-full"
// //                 disabled={!selectedSlot || confirmingSlot}
// //                 onClick={handleConfirmSlot}
// //               >
// //                 <Calendar className="w-4 h-4 mr-2" />
// //                 {confirmingSlot ? "Confirming…" : "Confirm Booking"}
// //               </Button>

// //               <Button
// //                 variant="ghost"
// //                 className="w-full"
// //                 onClick={() => setStep("form")}
// //               >
// //                 ← Back
// //               </Button>
// //             </div>
// //           )} */}
// //           {step === "slots" && (
// //             <div className="space-y-4 pt-4">
// //               {availableSlots.length === 0 ? (
// //                 <p className="text-sm text-muted-foreground text-center py-6">
// //                   No available slots in the next 7 days. Please check back later.
// //                 </p>
// //               ) : (
// //                 <div className="max-h-72 overflow-y-auto pr-1 space-y-4">
// //                   {/* Group slots by day */}
// //                   {Object.entries(
// //                     availableSlots.reduce<Record<string, string[]>>((groups, slot) => {
// //                       const day = new Date(slot).toLocaleDateString("en-IN", {
// //                         weekday: "long",
// //                           month: "long",
// //                           day: "numeric",
// //                           timeZone: "Asia/Kolkata",
// //                       });
// //                       if (!groups[day]) groups[day] = [];
// //                       groups[day].push(slot);
// //                       return groups;
// //                     }, {})
// //                   ).map(([day, daySlots]) => (
// //                     <div key={day}>
// //                       {/* Day header */}
// //                       <div className="mb-2">
// //                         <p className="text-base font-semibold text-foreground">{day}</p>
// //                         <Separator />
// //                       </div>

// //                       {/* 2-column slot grid */}
// //                       <div className="grid grid-cols-2 gap-2">
// //                         {daySlots.map((slot) => {
// //                           const time = new Date(slot).toLocaleTimeString("en-IN", {
// //                             hour: "2-digit",
// //                             minute: "2-digit",
// //                             hour12: true,
// //                             timeZone: "Asia/Kolkata",
// //                           });
// //                           return (
// //                             <button
// //                               key={slot}
// //                               type="button"
// //                               onClick={() => setSelectedSlot(slot)}
// //                               className={`text-sm py-2 px-3 rounded-md border transition-colors text-center ${
// //                                 selectedSlot === slot
// //                                   ? "bg-primary text-primary-foreground border-primary"
// //                                   : "bg-muted text-muted-foreground border-transparent hover:border-primary hover:text-foreground"
// //                               }`}
// //                             >
// //                               {time}
// //                             </button>
// //                           );
// //                         })}
// //                       </div>
// //                     </div>
// //                   ))}
// //                 </div>
// //               )}

// //               <Button
// //                 className="w-full"
// //                 disabled={!selectedSlot || confirmingSlot}
// //                 onClick={handleConfirmSlot}
// //               >
// //                 <Calendar className="w-4 h-4 mr-2" />
// //                 {confirmingSlot ? "Confirming…" : "Confirm Booking"}
// //               </Button>

// //               <Button variant="ghost" className="w-full hover:bg-primary/30" onClick={() => setStep("form")}>
// //                 ← Back
// //               </Button>
// //             </div>
// //           )}

// //           {/* ── Step 3: Confirmation ── */}
// //           {step === "confirmation" && (
// //             <div className="space-y-4 pt-0">
// //               <MailCheck className="w-28 h-28 mx-auto text-primary" />
// //               <p className="text-sm text-muted-foreground leading-relaxed">
// //                 Your slot has been successfully reserved.
// //               </p>
// //               <p className="text-sm text-muted-foreground leading-relaxed">
// //                 {selectedSlot && (
// //                   <>
// //                   <div className="flex flex-row mb-1">
// //                     <Pin className="w-5 h-5 mr-2 text-primary" /> <span className="font-semibold text-foreground">
// //                       {service.title}
// //                     </span>
// //                   </div>
// //                   <div className="flex flex-row mb-1">
// //                     <MapPin className="w-5 h-5 mr-2 text-primary"/> <span className="font-semibold text-md text-foreground">
// //                       {new Date(selectedSlot).toLocaleString("en-IN", {
// //                         weekday: "long",
// //                         month: "long",
// //                         day: "numeric",
// //                       })}
// //                     </span>
// //                   </div>
// //                   <div className="flex flex-row mb-1">
// //                     <Clock3 className="w-5 h-5 mr-2 text-primary" /> <span className="font-semibold text-foreground">
// //                       {new Date(selectedSlot).toLocaleString("en-IN", {
// //                         hour: "2-digit",
// //                         minute: "2-digit",
// //                         timeZone: "Asia/Kolkata",
// //                       })} IST
// //                     </span>
// //                   </div>
// //                   </>
// //                 )}
// //               </p>
// //               <p className="text-sm text-muted-foreground leading-relaxed">
// //                 This is a paid consultation service, and payment is required to confirm your booking.
// //               </p>
// //               <p className="text-sm text-muted-foreground leading-relaxed">
// //                 A payment email with the UPI QR code has been sent to{" "}
// //                 <span className="font-semibold text-foreground">{formData.email}</span>.
// //               </p>
// //               <p className="text-sm text-muted-foreground leading-relaxed">
// //                 <div className="text-sm text-muted-foreground leading-relaxed">
// //                   <div className="flex flex-row items-center mb-1">
// //                     <CircleAlert className="w-4 h-4 mr-1 text-rose-600"/>
// //                     <span className="font-semibold text-xs text-rose-600">
// //                       Slot Held Temporary:
// //                     </span>
// //                     <span className="font-semibold text-xs text-primary ml-1">
// //                       It will auto-cancel if unpaid 1 hour prior.
// //                     </span>
// //                   </div>
// //                 </div>
// //               </p>
// //               <Button
// //                 className="w-full"
// //                 onClick={() => {
// //                   toast({
// //                     title: "Booking confirmed!",
// //                     description: `Payment instructions sent for "${service.title}"`,
// //                   });
// //                   setShowBookModal(false);
// //                   setStep("form");
// //                   setSelectedSlot(null);
// //                   onBookingComplete?.(service.id);
// //                 }}
// //               >
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

// import { useState } from "react";
// import Image from "next/image";
// import {
// Clock,
//   Play,
//   Share2,
//   BookOpen,
//   CheckCircle,
//   ChevronRight,
//   Mail,
//   User,
//   MailCheck,
//   Briefcase,
//   Globe,
//   Users,
//   Calendar,
//   MapPin,
//   Pin,
//   Clock3,
//   CircleAlert,
//   Loader2,
//   CheckCircle2,
//   AlertCircle,
// } from "lucide-react";

// import { Button } from "../components/ui/button";
// import { Separator } from "../components/ui/separator";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
// } from "../components/ui/dialog";
// import { Label } from "./ui/label";
// import { Input } from "./ui/input";
// import { useToast } from "../hooks/use-toast";

// /* -------------------- TYPES -------------------- */

// interface ConsultationItem {
//   id: string;
//   title: string;
//   duration: string;
//   thumbnail: string;
//   mode: string;
//   audience: string;
//   description: string;
//   includes: string[];
//   cta: string;
//   // price: string;
//   priceLabel?: string; 
// }

// type FormErrors = Partial<Record<keyof EnrollmentForm, string>>;
// type EmailCheckStatus = "idle" | "checking" | "valid" | "invalid";

// interface Props {
//   service: ConsultationItem | null;
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
//   isBooked: boolean;
// }

// const handleShare = (title: string, id: string) => {
//   const url = `${window.location.origin}/services?consultation=${id}`;
//   if (navigator.share) {
//     navigator.share({ title, text: `Check out this service: ${title}`, url });
//   } else {
//     navigator.clipboard.writeText(url);
//   }
// };

// /* -------------------- COMPONENT -------------------- */

// export default function ConsultationDetailDialog({
//   service,
//   open,
//   onOpenChange,
//   isBooked,
// }: Props) {

//   const { toast } = useToast();
//   const [showBookModal, setShowBookModal] = useState(false);
//   const [step, setStep] = useState<"form" | "slots" | "confirmation">("form");
//   const [availableSlots, setAvailableSlots] = useState<string[]>([]);
//   const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
//   const [loadingSlots, setLoadingSlots] = useState(false);
//   const [confirmingSlot, setConfirmingSlot] = useState(false);
//   const [touched, setTouched] = useState<Partial<Record<keyof EnrollmentForm, boolean>>>({});
//   const [emailCheckStatus, setEmailCheckStatus] = useState<EmailCheckStatus>("idle");
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     organization: "",
//   });
//   if (!service) return null;
//   // console.log("VIDEO DATA:", service);

//   async function handleFormSubmit(e: React.FormEvent) {
//     e.preventDefault();
//     setLoadingSlots(true);
//     try {
//       const res = await fetch(`/api/calendar?serviceId=${service!.id}`);
//       const data = await res.json();
//       setAvailableSlots(data.slots ?? []);
//       setStep("slots");
//     } catch {
//       toast({ title: "Error", description: "Could not fetch available slots. Please try again." });
//     } finally {
//       setLoadingSlots(false);
//     }
//   }

//   async function handleConfirmSlot() {
//     if (!selectedSlot) return;
//     setConfirmingSlot(true);
//     try {
//       // 1. Book the calendar slot (existing)
//       await fetch("/api/calendar", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           serviceTitle: service!.title,
//           slot: selectedSlot,
//           formData,
//         }),
//       });

//       // console.log("BODY RECEIVED:", body);
//       // const emailRes = await fetch("/api/consultationsEmail", {
//       //   method: "POST",
//       //   headers: { "Content-Type": "application/json" },
//       //   body: JSON.stringify({
//       //     name:         formData.name,
//       //     email:        formData.email,
//       //     serviceId:    service!.id,
//       //     serviceTitle: service!.title,
//       //     selectedSlot,
//       //   }),
        
//       // });

//       const emailRes = await fetch("/api/consultationsEmail", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           name: formData.name,
//           email: formData.email,
//           serviceId: service!.id,
//           serviceTitle: service!.title,
//           selectedSlot, // make sure this exists in your state
//         }),
//       });
      
//       const emailData = await emailRes.json();
//       if (!emailRes.ok || !emailData.success) {
//         // Non-blocking: slot is still booked, just warn
//         console.warn("[consultationEmail] Email send failed:", emailData.error);
//         toast({
//           title: "Slot booked — email issue",
//           description: "Your slot is confirmed but the payment email could not be sent. Please contact us.",
//         });
//       }

//       setStep("confirmation");
//     } catch {
//       toast({ title: "Error", description: "Could not confirm booking. Please try again." });
//     } finally {
//       setConfirmingSlot(false);
//     }
//   }

//   function handleModalClose(open: boolean) {
//     if (!open) {
//       setStep("form");
//       setSelectedSlot(null);
//       setAvailableSlots([]);
//     }
//     setShowBookModal(open);
//   }

//     function FieldError({ field }: { field: keyof EnrollmentForm }) {
//       if (!touched[field] || !errors[field]) return null;
//       return (
//         <p className="flex items-center gap-1 mt-1 text-xs text-destructive">
//           <AlertCircle className="w-3 h-3 shrink-0" />
//           {errors[field]}
//         </p>
//       );
//     }
  
//     function EmailIndicator() {
//       if (emailCheckStatus === "checking")
//         return <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 animate-spin text-muted-foreground" />;
//       if (emailCheckStatus === "valid")
//         return <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500" />;
//       if (emailCheckStatus === "invalid")
//         return <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-destructive" />;
//       return null;
//     }
  
//     const emailBorderClass =
//       touched.email && errors.email
//         ? "border-destructive focus-visible:ring-destructive"
//         : emailCheckStatus === "valid"
//         ? "border-green-500 focus-visible:ring-green-500"
//         : "";

//   return (
//     <>
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogTitle>{service.title}</DialogTitle>

//       <DialogContent className="p-0 max-w-2xl max-h-[90vh] overflow-y-auto">
//         {/* IMAGE */}
//         <div className="relative h-52">
//           <Image
//             src={service.thumbnail}
//             alt={service.title}
//             fill
//             className="object-cover rounded-t-lg"
//           />
//           <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-t-lg" />
//           <div className="absolute bottom-4 left-4 right-4">
//             <h2 className="text-xl font-bold text-white">{service.title}</h2>
//             <p className="text-sm text-white/80">Sukshmadarshini™</p>
//           </div>
//         </div>

//         <div className="p-6 space-y-5">
//           {/* META */}
//           <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
//             <span className="flex items-center gap-1">
//               <Clock className="w-4 h-4" />
//               {service.duration}
//             </span>
//             <span className="flex items-center gap-1">
//               <Globe className="w-4 h-4" />
//               {service.mode}
//             </span>
//             <span className="flex items-center gap-1">
//               <Users className="w-4 h-4" />
//               {service.audience}
//             </span>
//           </div>

//           <p className="text-sm text-muted-foreground leading-relaxed">
//               {service.description}
//             </p>

//           <Separator />

//           {/* PRICE */}
//           <div className="flex items-center justify-between">
//               <div className="flex items-baseline gap-1">
//                 <span className="text-2xl font-bold">{service.priceLabel}</span>
//               </div>
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 onClick={() => handleShare(service.title, service.id)}
//               >
//                 <Share2 className="w-5 h-5" />
//               </Button>
//             </div>

//           <Separator />

//           {/* INCLUDES */}
//           <div>
//             <h3 className="font-semibold mb-3 flex items-center gap-2">
//               <BookOpen className="w-4 h-4" />
//               Includes
//             </h3>

//             <ul className="space-y-2">
//               {service.includes.map((item, i) => (
//                 <li key={i} className="flex gap-2 text-sm">
//                   <CheckCircle className="w-4 h-4 text-green-500" />
//                   {item}
//                 </li>
//               ))}
//             </ul>
//           </div>

//           <Button className="w-full" onClick={() => setShowBookModal(true)} disabled={isBooked}>
//             <Briefcase className="w-4 h-4 mr-2" />
//             {service.cta}
//           </Button>
//         </div>
//       </DialogContent>
//     </Dialog>

//     <Dialog open={showBookModal} onOpenChange={handleModalClose}>
//         <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
//           <DialogHeader>
//             <DialogTitle className="text-2xl font-display">
//               {step === "form" && "Register Your Interest"}
//               {step === "slots" && "Choose a Time Slot"}
//               {step === "confirmation" && "Booking Confirmed!"}
//             </DialogTitle>
//             <DialogDescription>
//               {step === "form" && "Enter your details to see available slots."}
//               {step === "slots" && "All times shown in IST. Select a 1-hour slot."}
//               {step === "confirmation"}
//             </DialogDescription>
//           </DialogHeader>

//           {/* ── Step 1: Form ── */}
//           {step === "form" && (
//             <form onSubmit={handleFormSubmit} className="space-y-4 pt-4">
//               <div className="space-y-2">
//                 <Label htmlFor="name">Full Name *</Label>
//                 <div className="relative">
//                   <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
//                   <Input
//                     id="name"
//                     placeholder="John Doe"
//                     value={formData.name}
//                     onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                     className="pl-10"
//                     required
//                   />
//                   <FieldError field="name" />
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="email">Email Address *</Label>
//                 <div className="relative">
//                   <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
//                   <Input
//                     id="email"
//                     type="email"
//                     placeholder="you@example.com"
//                     value={formData.email}
//                     onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                     className="pl-10"
//                     required
//                   />
//                   <EmailIndicator />
//                 </div>
//                 <FieldError field="email" />
//               </div>

//               {/* <div className="space-y-2">
//                 <Label htmlFor="organization">Organization (Optional)</Label>
//                 <Input
//                   id="organization"
//                   placeholder="Your University/Company"
//                   value={formData.organization}
//                   onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
//                 />
//               </div> */}

//               <Button type="submit" className="w-full mt-6" disabled={loadingSlots}>
//                 {loadingSlots ? "Checking availability…" : "See Available Slots"}
//                 <ChevronRight className="w-4 h-4 ml-2" />
//               </Button>
//             </form>
//           )}

//           {/* ── Step 2: Slot Picker ── */}
//           {/* {step === "slots" && (
//             <div className="space-y-4 pt-4">
//               {availableSlots.length === 0 ? (
//                 <p className="text-sm text-muted-foreground text-center py-6">
//                   No available slots in the next 7 days. Please check back later.
//                 </p>
//               ) : (
//                 <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto pr-1">
//                   {availableSlots.map((slot) => {
//                     const d = new Date(slot);
//                     const label = d.toLocaleString("en-IN", {
//                       weekday: "short",
//                       month: "short",
//                       day: "numeric",
//                       hour: "2-digit",
//                       minute: "2-digit",
//                       timeZone: "Asia/Kolkata",
//                     });
//                     return (
//                       <button
//                         key={slot}
//                         type="button"
//                         onClick={() => setSelectedSlot(slot)}
//                         className={`text-xs p-2 rounded border transition-colors text-left ${
//                           selectedSlot === slot
//                             ? "bg-primary text-primary-foreground border-primary"
//                             : "border-border hover:border-primary"
//                         }`}
//                       >
//                         {label}
//                       </button>
//                     );
//                   })}
//                 </div>
//               )}

//               <Button
//                 className="w-full"
//                 disabled={!selectedSlot || confirmingSlot}
//                 onClick={handleConfirmSlot}
//               >
//                 <Calendar className="w-4 h-4 mr-2" />
//                 {confirmingSlot ? "Confirming…" : "Confirm Booking"}
//               </Button>

//               <Button
//                 variant="ghost"
//                 className="w-full"
//                 onClick={() => setStep("form")}
//               >
//                 ← Back
//               </Button>
//             </div>
//           )} */}
//           {step === "slots" && (
//             <div className="space-y-4 pt-4">
//               {availableSlots.length === 0 ? (
//                 <p className="text-sm text-muted-foreground text-center py-6">
//                   No available slots in the next 7 days. Please check back later.
//                 </p>
//               ) : (
//                 <div className="max-h-72 overflow-y-auto pr-1 space-y-4">
//                   {/* Group slots by day */}
//                   {Object.entries(
//                     availableSlots.reduce<Record<string, string[]>>((groups, slot) => {
//                       const day = new Date(slot).toLocaleDateString("en-IN", {
//                         weekday: "long",
//                           month: "long",
//                           day: "numeric",
//                           timeZone: "Asia/Kolkata",
//                       });
//                       if (!groups[day]) groups[day] = [];
//                       groups[day].push(slot);
//                       return groups;
//                     }, {})
//                   ).map(([day, daySlots]) => (
//                     <div key={day}>
//                       {/* Day header */}
//                       <div className="mb-2">
//                         <p className="text-base font-semibold text-foreground">{day}</p>
//                         <Separator />
//                       </div>

//                       {/* 2-column slot grid */}
//                       <div className="grid grid-cols-2 gap-2">
//                         {daySlots.map((slot) => {
//                           const time = new Date(slot).toLocaleTimeString("en-IN", {
//                             hour: "2-digit",
//                             minute: "2-digit",
//                             hour12: true,
//                             timeZone: "Asia/Kolkata",
//                           });
//                           return (
//                             <button
//                               key={slot}
//                               type="button"
//                               onClick={() => setSelectedSlot(slot)}
//                               className={`text-sm py-2 px-3 rounded-md border transition-colors text-center ${
//                                 selectedSlot === slot
//                                   ? "bg-primary text-primary-foreground border-primary"
//                                   : "bg-muted text-muted-foreground border-transparent hover:border-primary hover:text-foreground"
//                               }`}
//                             >
//                               {time}
//                             </button>
//                           );
//                         })}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}

//               <Button
//                 className="w-full"
//                 disabled={!selectedSlot || confirmingSlot}
//                 onClick={handleConfirmSlot}
//               >
//                 <Calendar className="w-4 h-4 mr-2" />
//                 {confirmingSlot ? "Confirming…" : "Confirm Booking"}
//               </Button>

//               <Button variant="ghost" className="w-full hover:bg-primary/30" onClick={() => setStep("form")}>
//                 ← Back
//               </Button>
//             </div>
//           )}

//           {/* ── Step 3: Confirmation ── */}
//           {step === "confirmation" && (
//             <div className="space-y-4 pt-0">
//               <MailCheck className="w-28 h-28 mx-auto text-primary" />
//               <p className="text-sm text-muted-foreground leading-relaxed">
//                 Your slot has been successfully reserved.
//               </p>
//               <p className="text-sm text-muted-foreground leading-relaxed">
//                 {selectedSlot && (
//                   <>
//                   <div className="flex flex-row mb-1">
//                     <Pin className="w-5 h-5 mr-2 text-primary" /> <span className="font-semibold text-foreground">
//                       {service.title}
//                     </span>
//                   </div>
//                   <div className="flex flex-row mb-1">
//                     <MapPin className="w-5 h-5 mr-2 text-primary"/> <span className="font-semibold text-md text-foreground">
//                       {new Date(selectedSlot).toLocaleString("en-IN", {
//                         weekday: "long",
//                         month: "long",
//                         day: "numeric",
//                       })}
//                     </span>
//                   </div>
//                   <div className="flex flex-row mb-1">
//                     <Clock3 className="w-5 h-5 mr-2 text-primary" /> <span className="font-semibold text-foreground">
//                       {new Date(selectedSlot).toLocaleString("en-IN", {
//                         hour: "2-digit",
//                         minute: "2-digit",
//                         timeZone: "Asia/Kolkata",
//                       })} IST
//                     </span>
//                   </div>
//                   </>
//                 )}
//               </p>
//               <p className="text-sm text-muted-foreground leading-relaxed">
//                 This is a paid consultation service, and payment is required to confirm your booking.
//               </p>
//               <p className="text-sm text-muted-foreground leading-relaxed">
//                 A payment email with the UPI QR code has been sent to{" "}
//                 <span className="font-semibold text-foreground">{formData.email}</span>.
//               </p>
//               <p className="text-sm text-muted-foreground leading-relaxed">
//                 <div className="text-sm text-muted-foreground leading-relaxed">
//                   <div className="flex flex-row items-center mb-1">
//                     <CircleAlert className="w-4 h-4 mr-1 text-rose-600"/>
//                     <span className="font-semibold text-xs text-rose-600">
//                       Slot Held Temporary:
//                     </span>
//                     <span className="font-semibold text-xs text-primary ml-1">
//                       It will auto-cancel if unpaid 1 hour prior.
//                     </span>
//                   </div>
//                 </div>
//               </p>
//               <Button
//                 className="w-full"
//                 onClick={() => {
//                   toast({
//                     title: "Booking confirmed!",
//                     description: `Payment instructions sent for "${service.title}"`,
//                   });
//                   setShowBookModal(false);
//                   setStep("form");
//                   setSelectedSlot(null);
//                   // onBookingComplete?.(service.id);
//                 }}
//               >
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

import { useState, useRef } from "react";
import Image from "next/image";
import {
  Clock,
  Share2,
  BookOpen,
  CheckCircle,
  ChevronRight,
  Mail,
  User,
  MailCheck,
  Briefcase,
  Globe,
  Users,
  Calendar,
  MapPin,
  Pin,
  Clock3,
  CircleAlert,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

import { Button } from "../components/ui/button";
import { Separator } from "../components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useToast } from "../hooks/use-toast";

/* -------------------- TYPES -------------------- */

interface ConsultationItem {
  id: string;
  title: string;
  duration: string;
  thumbnail: string;
  mode: string;
  audience: string;
  description: string;
  includes: string[];
  cta: string;
  priceLabel?: string;
}

type EnrollmentForm = {
  name: string;
  email: string;
  organization: string;
};

type FormErrors = Partial<Record<keyof EnrollmentForm, string>>;
type EmailCheckStatus = "idle" | "checking" | "valid" | "invalid";

interface Props {
  service: ConsultationItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isBooked: boolean;
}

/* -------------------- HELPERS -------------------- */

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

const handleShare = (title: string, id: string) => {
  const url = `${window.location.origin}/services?consultation=${id}`;
  if (navigator.share) {
    navigator.share({ title, text: `Check out this service: ${title}`, url });
  } else {
    navigator.clipboard.writeText(url);
  }
};

/* -------------------- COMPONENT -------------------- */

export default function ConsultationDetailDialog({
  service,
  open,
  onOpenChange,
  isBooked,
}: Props) {
  const { toast } = useToast();
  const [showBookModal, setShowBookModal] = useState(false);
  const [step, setStep] = useState<"form" | "slots" | "confirmation">("form");
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [confirmingSlot, setConfirmingSlot] = useState(false);

  // ── Validation state ──
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof EnrollmentForm, boolean>>>({});
  const [emailCheckStatus, setEmailCheckStatus] = useState<EmailCheckStatus>("idle");
  const emailDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [formData, setFormData] = useState<EnrollmentForm>({
    name: "",
    email: "",
    organization: "",
  });

  if (!service) return null;

  /* ── Email handlers ──────────────────────────────────────────────────────── */

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

  /* ── Name handler ────────────────────────────────────────────────────────── */

  function handleNameBlur() {
    setTouched((p) => ({ ...p, name: true }));
    const err = validateName(formData.name);
    setErrors((p) => ({ ...p, name: err ?? undefined }));
  }

  function handleNameChange(value: string) {
    setFormData((p) => ({ ...p, name: value }));
    if (touched.name) {
      const err = validateName(value);
      setErrors((p) => ({ ...p, name: err ?? undefined }));
    }
  }

  /* ── Sub-components ──────────────────────────────────────────────────────── */

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

  /* ── Form submit (step 1 → step 2) ──────────────────────────────────────── */

  async function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched({ name: true, email: true });

    if (emailCheckStatus === "checking") {
      toast({ title: "Please wait", description: "Verifying email address…" });
      return;
    }

    // Name
    const nameError = validateName(formData.name);
    // Email
    const emailFormatError = validateEmailFormat(formData.email);

    const newErrors: FormErrors = {};
    if (nameError) newErrors.name = nameError;
    if (emailFormatError) {
      newErrors.email = emailFormatError;
    } else if (emailCheckStatus === "invalid") {
      newErrors.email = errors.email ?? "This email address could not be verified.";
    } else if (emailCheckStatus === "idle") {
      // Not checked yet — run now
      setEmailCheckStatus("checking");
      const result = await checkEmail(formData.email);
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

    // All valid — fetch slots
    setLoadingSlots(true);
    try {
      const res = await fetch(`/api/calendar?serviceId=${service!.id}`);
      const data = await res.json();
      setAvailableSlots(data.slots ?? []);
      setStep("slots");
    } catch {
      toast({ title: "Error", description: "Could not fetch available slots. Please try again." });
    } finally {
      setLoadingSlots(false);
    }
  }

  /* ── Slot confirmation ───────────────────────────────────────────────────── */

  async function handleConfirmSlot() {
    if (!selectedSlot) return;
    setConfirmingSlot(true);
    try {
      await fetch("/api/calendar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceTitle: service!.title,
          slot: selectedSlot,
          formData,
        }),
      });

      const emailRes = await fetch("/api/consultationsEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          serviceId: service!.id,
          serviceTitle: service!.title,
          selectedSlot,
        }),
      });

      const emailData = await emailRes.json();
      if (!emailRes.ok || !emailData.success) {
        console.warn("[consultationEmail] Email send failed:", emailData.error);
        toast({
          title: "Slot booked: email issue",
          description: "Your slot is confirmed but the payment email could not be sent. Please contact us.",
        });
      }

      setStep("confirmation");
    } catch {
      toast({ title: "Error", description: "Could not confirm booking. Please try again." });
    } finally {
      setConfirmingSlot(false);
    }
  }

  /* ── Modal close / reset ─────────────────────────────────────────────────── */

  function handleModalClose(open: boolean) {
    if (!open) {
      setStep("form");
      setSelectedSlot(null);
      setAvailableSlots([]);
      setErrors({});
      setTouched({});
      setEmailCheckStatus("idle");
      setFormData({ name: "", email: "", organization: "" });
    }
    setShowBookModal(open);
  }

  /* -------------------- RENDER -------------------- */

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogTitle>{service.title}</DialogTitle>

        <DialogContent className="p-0 max-w-2xl max-h-[90vh] overflow-y-auto">
          {/* IMAGE */}
          <div className="relative h-52">
            <Image
              src={service.thumbnail}
              alt={service.title}
              fill
              className="object-cover rounded-t-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-t-lg" />
            <div className="absolute bottom-4 left-4 right-4">
              <h2 className="text-xl font-bold text-white">{service.title}</h2>
              <p className="text-sm text-white/80">Sukshmadarshini™</p>
            </div>
          </div>

          <div className="p-6 space-y-5">
            {/* META */}
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {service.duration}
              </span>
              <span className="flex items-center gap-1">
                <Globe className="w-4 h-4" />
                {service.mode}
              </span>
              <span className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                {service.audience}
              </span>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>

            <Separator />

            {/* PRICE */}
            <div className="flex items-center justify-between">
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold">{service.priceLabel}</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleShare(service.title, service.id)}
              >
                <Share2 className="w-5 h-5" />
              </Button>
            </div>

            <Separator />

            {/* INCLUDES */}
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Includes
              </h3>
              <ul className="space-y-2">
                {service.includes.map((item, i) => (
                  <li key={i} className="flex gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <Button className="w-full" onClick={() => setShowBookModal(true)} disabled={isBooked}>
              <Briefcase className="w-4 h-4 mr-2" />
              {service.cta}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* ── Booking Modal ── */}
      <Dialog open={showBookModal} onOpenChange={handleModalClose}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-display">
              {step === "form" && "Register Your Interest"}
              {step === "slots" && "Choose a Time Slot"}
              {step === "confirmation" && "Booking Confirmed!"}
            </DialogTitle>
            <DialogDescription>
              {step === "form" && "Enter your details to see available slots."}
              {step === "slots" && "All times shown in IST. Select a 1-hour slot."}
            </DialogDescription>
          </DialogHeader>

          {/* ── Step 1: Form ── */}
          {step === "form" && (
            <form onSubmit={handleFormSubmit} className="space-y-4 pt-4">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="cons-name">Full Name *</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="cons-name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    onBlur={handleNameBlur}
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
                <Label htmlFor="cons-email">Email Address *</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="cons-email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => handleEmailChange(e.target.value)}
                    onBlur={handleEmailBlur}
                    className={`pl-10 pr-9 ${emailBorderClass}`}
                    required
                  />
                  <EmailIndicator />
                </div>
                <FieldError field="email" />
              </div>

              <Button type="submit" className="w-full mt-6" disabled={loadingSlots || emailCheckStatus === "checking"}>
                {loadingSlots ? (
                  <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Checking availability…</>
                ) : (
                  <>See Available Slots <ChevronRight className="w-4 h-4 ml-2" /></>
                )}
              </Button>
            </form>
          )}

          {/* ── Step 2: Slot Picker ── */}
          {step === "slots" && (
            <div className="space-y-4 pt-4">
              {availableSlots.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-6">
                  No available slots in the next 7 days. Please check back later.
                </p>
              ) : (
                <div className="max-h-72 overflow-y-auto pr-1 space-y-4">
                  {Object.entries(
                    availableSlots.reduce<Record<string, string[]>>((groups, slot) => {
                      const day = new Date(slot).toLocaleDateString("en-IN", {
                        weekday: "long",
                        month: "long",
                        day: "numeric",
                        timeZone: "Asia/Kolkata",
                      });
                      if (!groups[day]) groups[day] = [];
                      groups[day].push(slot);
                      return groups;
                    }, {})
                  ).map(([day, daySlots]) => (
                    <div key={day}>
                      <div className="mb-2">
                        <p className="text-base font-semibold text-foreground">{day}</p>
                        <Separator />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {daySlots.map((slot) => {
                          const time = new Date(slot).toLocaleTimeString("en-IN", {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                            timeZone: "Asia/Kolkata",
                          });
                          return (
                            <button
                              key={slot}
                              type="button"
                              onClick={() => setSelectedSlot(slot)}
                              className={`text-sm py-2 px-3 rounded-md border transition-colors text-center ${
                                selectedSlot === slot
                                  ? "bg-primary text-primary-foreground border-primary"
                                  : "bg-muted text-muted-foreground border-transparent hover:border-primary hover:text-foreground"
                              }`}
                            >
                              {time}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <Button
                className="w-full"
                disabled={!selectedSlot || confirmingSlot}
                onClick={handleConfirmSlot}
              >
                <Calendar className="w-4 h-4 mr-2" />
                {confirmingSlot ? "Confirming…" : "Confirm Booking"}
              </Button>

              <Button variant="ghost" className="w-full hover:bg-primary/30" onClick={() => setStep("form")}>
                ← Back
              </Button>
            </div>
          )}

          {/* ── Step 3: Confirmation ── */}
          {step === "confirmation" && (
            <div className="space-y-4 pt-0">
              <MailCheck className="w-28 h-28 mx-auto text-primary" />
              <p className="text-sm text-muted-foreground leading-relaxed">
                Your slot has been successfully reserved.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {selectedSlot && (
                  <>
                    <div className="flex flex-row mb-1">
                      <Pin className="w-5 h-5 mr-2 text-primary" />
                      <span className="font-semibold text-foreground">{service.title}</span>
                    </div>
                    <div className="flex flex-row mb-1">
                      <MapPin className="w-5 h-5 mr-2 text-primary" />
                      <span className="font-semibold text-md text-foreground">
                        {new Date(selectedSlot).toLocaleString("en-IN", {
                          weekday: "long",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="flex flex-row mb-1">
                      <Clock3 className="w-5 h-5 mr-2 text-primary" />
                      <span className="font-semibold text-foreground">
                        {new Date(selectedSlot).toLocaleString("en-IN", {
                          hour: "2-digit",
                          minute: "2-digit",
                          timeZone: "Asia/Kolkata",
                        })}{" "}
                        IST
                      </span>
                    </div>
                  </>
                )}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                This is a paid consultation service, and payment is required to confirm your booking.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                A payment email with the UPI QR code has been sent to{" "}
                <span className="font-semibold text-foreground">{formData.email}</span>.
              </p>
              <div className="text-sm text-muted-foreground leading-relaxed">
                <div className="flex flex-row items-center mb-1">
                  <CircleAlert className="w-4 h-4 mr-1 text-rose-600" />
                  <span className="font-semibold text-xs text-rose-600">Slot Held Temporarily:</span>
                  <span className="font-semibold text-xs text-primary ml-1">
                    It will auto-cancel if unpaid 1 day prior.
                  </span>
                </div>
              </div>
              <Button
                className="w-full"
                onClick={() => {
                  toast({
                    title: "Booking confirmed!",
                    description: `Payment instructions sent for "${service.title}"`,
                  });
                  setShowBookModal(false);
                  setStep("form");
                  setSelectedSlot(null);
                }}
              >
                Done
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}