//app/components/ComplementaryLectureDetailDialogue.tsx
"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import {
  Clock,
  Share2,
  BookOpen,
  ChevronRight,
  Mail,
  User,
  CalendarDays,
  MailCheck,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Pin,
  Clock3,
  CheckCircle,
  UsersRound,
  CheckCheck,
  Gift,
  MapPin,
  CircleAlert,
  TriangleAlert,
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

/* -------------------- Types -------------------- */

type ComplementaryLecture = {
  _id: string;
  id: string;
  title: string;
  description?: string;
  category?: string;
  date?: string;         // ISO datetime string
  instructor?: string;
  idealFor?: string[];
  duration?: string;
  includes?: string[];
  mode?: string;
  thumbnail?: string;
  content?: string[];
};

type EnrollmentForm = {
  name: string;
  email: string;
};

type Props = {
  video: ComplementaryLecture | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

/* -------------------- Helpers -------------------- */

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
  const url = `${window.location.origin}/services?complementary=${id}`;
  if (navigator.share) {
    navigator.share({ title, text: `Check out this free lecture: ${title}`, url });
  } else {
    navigator.clipboard.writeText(url);
  }
};

/* -------------------- Component -------------------- */

export default function ComplementaryLectureDetailDialog({
  video,
  open,
  onOpenChange,
}: Props) {
  const { toast } = useToast();
  const [showEnrollModal, setShowEnrollModal] = useState(false);
  const [step, setStep] = useState<"form" | "confirmation">("form");
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<
    Partial<Record<keyof EnrollmentForm, boolean>>
  >({});
  const [emailCheckStatus, setEmailCheckStatus] =
    useState<EmailCheckStatus>("idle");
  const emailDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<EnrollmentForm>({
    name: "",
    email: "",
  });

  if (!video) return null;

  /* ── Validation ──────────────────────────────────────────────────────────── */

  function runValidation(data: EnrollmentForm): FormErrors {
    return {
      name: validateName(data.name) ?? undefined,
      email: validateEmailFormat(data.email) ?? undefined,
    };
  }

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

  /* ── Generic field handlers ──────────────────────────────────────────────── */

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

  /* ── Submit ──────────────────────────────────────────────────────────────── */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true });

    if (emailCheckStatus === "checking") {
      toast({ title: "Please wait", description: "Verifying email address…" });
      return;
    }

    const allErrors = runValidation(formData);
    if (emailCheckStatus === "invalid") {
      allErrors.email =
        errors.email ?? "This email address could not be verified.";
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
      const res = await fetch("/api/complementaryLectureEmail", {
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

  /* ── Done handler ────────────────────────────────────────────────────────── */

  function handleDone() {
    const stored =
      localStorage.getItem("sukshmadarshini_enrolled_courses") || "[]";
    const enrolled: string[] = JSON.parse(stored);
    if (!enrolled.includes(video!._id)) enrolled.push(video!._id);
    localStorage.setItem(
      "sukshmadarshini_enrolled_courses",
      JSON.stringify(enrolled)
    );
    localStorage.setItem("sukshmadarshini_user", JSON.stringify(formData));
    toast({
      title: "Seat confirmed!",
      description: `Your seat for "${video!.title}" has been reserved.`,
    });
    setShowEnrollModal(false);
    setStep("form");
    setFormData({ name: "", email: "" });
    setTouched({});
    setErrors({});
    setEmailCheckStatus("idle");
  }

  /* -------------------- Render -------------------- */

  return (
    <>
      {/* ── Detail Dialog ── */}
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="p-0 max-w-2xl max-h-[90vh] overflow-y-auto">

          {/* Hero Image */}
          <div className="relative h-52">
            <Image
              src={getImage(video.thumbnail)}
              alt={video.title}
              fill
              className="object-cover rounded-t-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-t-lg" />

            {/* FREE badge on the image */}
            <div className="absolute top-3 left-3">
              <span className="inline-flex items-center gap-1 bg-green-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                <Gift className="w-3 h-3" />
                FREE
              </span>
            </div>

            <div className="absolute bottom-4 left-4 right-4">
              <h2 className="text-xl font-bold text-white">{video.title}</h2>
              <p className="text-sm text-white/80">by {video.instructor}</p>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-5">
            <DialogHeader>
              <DialogTitle>{video.title}</DialogTitle>
            </DialogHeader>

            {/* Meta row */}
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              {video.date && (
                <span className="flex items-center gap-1">
                  <CalendarDays className="w-4 h-4" />
                  {new Date(video.date).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              )}
              {video.duration && (
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {video.duration}
                </span>
              )}
              {video.mode && (
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {video.mode}
                </span>
              )}
            </div>

            <p className="text-sm text-muted-foreground">{video.description}</p>
            <p className="text-xs text-muted-foreground">
              Duration: {video.duration} | Mode: {video.mode}
            </p>

            {/* Ideal for */}
            {video.idealFor && video.idealFor.length > 0 && (
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <UsersRound className="w-4 h-4" />
                  This lecture is ideal for:
                </h3>
                <ul className="space-y-2">
                  {video.idealFor.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm font-medium text-muted-foreground"
                    >
                      <CheckCheck className="w-4 h-4 text-primary mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <Separator />

            {/* FREE callout — replaces the pricing row in LectureDetailDialogue */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 rounded-lg px-4 py-2 text-sm font-semibold">
                  <Gift className="w-4 h-4" />
                  This lecture is completely FREE
                </span>
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
            {video.includes && video.includes.length > 0 && (
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  This lecture includes
                </h3>
                <ul className="space-y-2">
                  {video.includes.map((item, i) => (
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
            )}

            <Separator />

            <Button className="w-full" onClick={() => setShowEnrollModal(true)}>
              <Gift className="w-4 h-4 mr-2" />
              Reserve My Free Seat
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* ── Registration Modal ── */}
      <Dialog open={showEnrollModal} onOpenChange={setShowEnrollModal}>
        <DialogContent className="max-w-lg max-h-[95vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-display">
              {step === "form" ? "Reserve Your Free Seat" : "Seat Confirmed!"}
            </DialogTitle>
            <DialogDescription>
              {step === "form"
                ? "Fill in your details: no payment needed, it's completely free."
                : "A confirmation has been sent to your email."}
            </DialogDescription>
          </DialogHeader>

          {step === "form" ? (
            <form onSubmit={handleSubmit} className="space-y-4 pt-4">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="cl-name">Full Name *</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="cl-name"
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
                <Label htmlFor="cl-email">Email Address *</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="cl-email"
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

              <Button
                type="submit"
                className="w-full mt-6"
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <ChevronRight className="w-4 h-4 ml-2" />
                )}
                {loading ? "Reserving your seat…" : "Confirm Free Registration"}
              </Button>
            </form>
          ) : (
            /* ── Confirmation screen ── */
            <div className="space-y-4 pt-0">
              <MailCheck className="w-28 h-28 mx-auto text-primary" />

              <p className="text-sm text-muted-foreground leading-relaxed">
                Your seat has been successfully reserved: no payment required!
              </p>

              {/* Session details recap */}
              <div className="space-y-1 text-sm">
                <div className="flex flex-row items-center mb-1">
                  <Pin className="w-5 h-5 mr-2 text-primary shrink-0" />
                  <span className="font-semibold text-foreground">
                    {video.title}
                  </span>
                </div>
                {video.duration && (
                  <div className="flex flex-row items-center mb-1">
                    <Clock3 className="w-5 h-5 mr-2 text-primary shrink-0" />
                    <span className="font-semibold text-foreground">
                      {video.duration}
                    </span>
                  </div>
                )}
                {video.mode && (
                  <div className="flex flex-row items-center mb-1">
                    <MapPin className="w-5 h-5 mr-2 text-primary shrink-0" />
                    <span className="font-semibold text-foreground">
                      {video.mode}
                    </span>
                  </div>
                )}
              </div>

              {/* Free callout */}
              <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
                <Gift className="w-4 h-4 text-green-600 shrink-0" />
                <span className="text-xs font-semibold text-green-700">
                  This is a free session: no payment needed.
                </span>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed">
                A joining link or venue details will be shared closer to the
                lecture date via the email you provided.
              </p>

              <div className="text-sm text-muted-foreground p-3 rounded-md bg-orange-50 border border-orange-200 leading-relaxed">
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