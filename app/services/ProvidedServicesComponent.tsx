"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Gift, Handshake, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

import { Clock, Users, Briefcase, CheckCircle, BookOpenText } from "lucide-react";

import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Card, CardContent } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

import WorkshopDetailDialog from "../components/WorkshopDetailDialogue";
import LectureDetailDialog from "../components/LectureDetailDialogue";
import ConsultationDetailDialog from "../components/ConsultationDetailDialogue";

import { getServices, getProvidedServicesPageContent } from "@/app/lib/queries";
import ComplementaryLectureDetailDialog from "../components/ComplementaryLectureDetailDialogue";

/* ------------------ TYPES ------------------ */

type TabValue = "complementary" | "lectures" | "workshops" | "consulting";

function getTabFromHash(hash: string): TabValue {
  const clean = hash.replace("#", "") as TabValue;
  return ["complementary", "lectures", "workshops", "consulting"].includes(clean)
    ? clean
    : "lectures";
}

const navLinks = [
  { label: "About us", href: "/#about" },
  { label: "Our Services", href: "/#trainings" },
];

/* ------------------ PAGE ------------------ */

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState<TabValue>("complementary");
  const [isOpen, setIsOpen] = useState(false);
  const [lectures, setLectures] = useState<any[]>([]);
    const [complementaryLectures, setComplementaryLectures] = useState<any[]>([]);
  const [workshops, setWorkshops] = useState<any[]>([]);
  const [consultationServices, setConsultationServices] = useState<any[]>([]);
  const [pageContent, setPageContent] = useState<{
  badge: string;
  heading: string;
  subheading: string;
} | null>(null);
  const [selectedWorkshop, setSelectedWorkshop] = useState<any>(null);
  const [selectedLecture, setSelectedLecture] = useState<any>(null);
    const [selectedComplementaryLecture, setSelectedComplementaryLecture] = useState<any>(null);
  const [selectedConsultation, setSelectedConsultation] = useState<any>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
  });

  const pathname = usePathname();

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    const hash = href.startsWith("/#")
      ? href.slice(1)
      : href.startsWith("#")
      ? href
      : null;

    if (!hash) return;
    if (window.location.pathname !== "/") return;

    e.preventDefault();
    const target = document.querySelector(hash);
    if (!target) return;

    const navbarHeight = 80;
    const offsetPosition =
      target.getBoundingClientRect().top +
      window.scrollY -
      navbarHeight;

    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
  };

  /* ------------------ FETCH SANITY ------------------ */

  useEffect(() => {
    async function load() {
      try {
        const data = await getServices();
        const pageData = await getProvidedServicesPageContent();
        if (pageData?.servicesPage) {
          setPageContent(pageData.servicesPage);
        }

        setComplementaryLectures(
          (data.complementaryLectures || []).map((item: any) => ({
            id: item._id,
            _id: item._id,
            title: item.title,
            duration: item.duration,
            date: item.date,
            mode: item.mode,
            description: item.description,
            category: item.category,
            instructor: item.instructor,
            idealFor: item.idealFor,
            content: item.content || [],
            includes: item.includes || [],
            thumbnail: item.thumbnail?.asset?.url || "",
          }))
        );
        
        setLectures(
          (data.lectures || []).map((item: any) => ({
            _id: item._id,               // ← Sanity document ID for API route
            id: item._id,                // ← kept for backwards compat (localStorage etc.)
            title: item.title,
            duration: item.duration,
            date: item.date,
            mode: item.mode,
            description: item.description,
            category: item.category,
            originalPrice: item.originalPrice,
            priceLabel: item.priceLabel,         // ← replaces discountedPrice
            discountPercent: item.discountPercent,
            priceNote: item.priceNote,
            instructor: item.instructor,
            idealFor: item.idealFor,
            content: item.content || [],
            includes: item.includes || [],
            thumbnail: item.thumbnail?.asset?.url || "",
          }))
        );

        setWorkshops(
          (data.workshops || []).map((item: any) => ({
            id: item._id,
            title: item.title,
            duration: item.duration,
            description: item.description,
            mode: item.mode,
            category: item.category,
            originalPrice: item.originalPrice,
            discountedPrice: item.discountedPrice,
            discountPercent: item.discountPercent,
            priceNote: item.priceNote,
            instructor: item.instructor,
            idealFor: item.idealFor,
            content: item.content || [],
            includes: item.includes || [],
            thumbnail: item.thumbnail?.asset?.url || "",
          }))
        );

        setConsultationServices(
          (data.consultations || []).map((item: any) => ({
            id: item._id,
            title: item.title,
            duration: item.duration,
            mode: item.mode,
            audience: item.audience,
            description: item.description,
            price: item.price,
            priceLabel: item.priceLabel,  
            cta: item.cta,
            includes: item.includes || [],
            thumbnail: item.thumbnail?.asset?.url || "",
          }))
        );
      } catch (err) {
        console.error("Sanity fetch error:", err);
      }
    }

    load();
  }, []);

  /* ------------------ HASH SYNC ------------------ */

  useEffect(() => {
    const sync = () => {
      setActiveTab(getTabFromHash(window.location.hash));
    };

    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  /* ------------------ UI ------------------ */

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">

      {/* NAV */}
      <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur-xl shadow-sm">
      <div className="container mx-auto flex h-16 md:h-20 items-center justify-between px-4">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <Image
            src="/official logo.svg"
            alt="EyeIcon Navbar Logo"
            width={56}
            height={40}
            className="object-contain"
          />
          <div className="flex flex-col">
            <span className="font-display text-lg font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Sukshmadarshini Services
            </span>
            <span className="text-xs text-muted-foreground">
              Insight Beyond Vision
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium"
            >
              {link.label}
            </a>
          ))}

          <Link
            href="/#contact"
            onClick={(e) => handleNavClick(e, "/#contact")}
          >
            <Button className="rounded-full px-4 bg-secondary hover:bg-secondary/90 text-secondary-foreground">
              Enquire Today
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t bg-background px-4 py-4">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  handleNavClick(e, link.href);
                  setIsOpen(false);
                }}
                className="text-muted-foreground hover:text-primary font-medium"
              >
                {link.label}
              </a>
            ))}

            <Link
              href="/#contact"
              onClick={(e) => {
                handleNavClick(e, "/#contact");
                setIsOpen(false);
              }}
            >
              <Button className="w-full mt-2 rounded-full bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                Enquire Today
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>

      {/* HEADER */}
      {/* <section className="container mx-auto px-4 py-14 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary mb-6">
            <BookOpenText className="w-4 h-4" />
            <span className="text-sm font-medium">Our Services</span>
        </div>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-gradient bg-clip-text text-transparent">
          Advanced Agri-Proteomics Workshops & Research Consulting
        </h1>
        <p className="text-muted-foreground mt-2 max-w-3xl mx-auto">
          Hands-on training, workflow consulting, and strategic mentorship in
          plant proteomics and molecular agriculture.
        </p>
      </section> */}
      <section className="container mx-auto px-4 py-14 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary mb-6">
          <BookOpenText className="w-4 h-4" />
          <span className="text-sm font-medium">
            {pageContent?.badge ?? "Our Services"}
          </span>
        </div>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-gradient bg-clip-text text-transparent">
          {pageContent?.heading ?? "Advanced Agri-Proteomics Workshops & Research Consulting"}
        </h1>
        <p className="text-muted-foreground mt-2 max-w-3xl mx-auto">
          {pageContent?.subheading ?? "Hands-on training, workflow consulting, and strategic mentorship in plant proteomics and molecular agriculture."}
        </p>
      </section>

      <main className="container mx-auto px-4 pb-16">
        {/* TABS */}
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as TabValue)}>
          <TabsList className="grid grid-cols-1 sm:grid-cols-4 max-w-4xl mx-auto h-auto">
            <TabsTrigger value="complementary">
              <Gift className="w-4 h-4 mr-2" />
              Complementary Lectures
            </TabsTrigger>
            
            <TabsTrigger value="lectures">
              <BookOpenText className="w-4 h-4 mr-2" />
              Lectures Provided
            </TabsTrigger>

            <TabsTrigger value="workshops">
              <Users className="w-4 h-4 mr-2" />
              Workshops & Programs
            </TabsTrigger>

            <TabsTrigger value="consulting">
              <Briefcase className="w-4 h-4 mr-2" />
              Consulting Services
            </TabsTrigger>
          </TabsList>

          {/* ----------------COMPLEMENTARY LECTURES ---------------- */}
          <TabsContent value="complementary" className="mt-10 text-center">
            <h3 className="font-display text-3xl md:text-4xl font-bold text-gradient mb-10">
              Complementary Lectures
            </h3>

            {/* <span className="italic text-gray-500"> Complementary Lectures Coming soon....</span> */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
              {complementaryLectures.map((l) => (
                <Card
                  className="overflow-hidden transition-all duration-300 cursor-pointer hover:shadow-lg hover:-translate-y-1 flex flex-col"
                  key={l._id}
                  onClick={() => setSelectedComplementaryLecture(l)}
                >
                  <div className="relative h-48">
                    <Image
                      src={l.thumbnail || "/placeholder.png"}
                      alt={l.title}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-105 rounded-t-lg"
                    />
                    <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {l.duration}
                    </div>
                  </div>
                  <CardContent className="pt-4 flex flex-col flex-1">
                    <div className="flex-1 space-y-3">
                      <Badge variant="outline">{l.category}</Badge>
                      <h3 className="font-semibold">{l.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        <strong>Mode:</strong> {l.mode ?? "N/A"}
                      </p>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        {(l.content ?? []).slice(0, 3).map((c: string, i: number) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                            <span>{c}</span>
                          </li>
                        ))}
                        {l.content && l.content.length > 3 && (
                          <li className="italic text-xs text-muted-foreground">+ more</li>
                        )}
                      </ul>
                      {/* Show priceLabel instead of discountedPrice
                      {l.priceLabel && (
                        <p className="text-sm font-semibold text-foreground">
                          {l.priceLabel}
                          {l.originalPrice && (
                            <span className="ml-2 line-through text-xs text-muted-foreground font-normal">
                              {l.originalPrice}
                            </span>
                          )}
                        </p>
                      )} */}
                      {/* <p className="text-xs italic text-muted-foreground">
                        {l.priceNote}
                      </p> */}
                    </div>
                    <Button variant="secondary" className="w-full mt-4">
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          {/* ---------------- LECTURES ---------------- */}
          <TabsContent value="lectures" className="mt-10 text-center">
            <h3 className="font-display text-3xl md:text-4xl font-bold text-gradient mb-10">
              One-on-One & Group Lectures
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
              {lectures.map((l) => (
                <Card
                  className="overflow-hidden transition-all duration-300 cursor-pointer hover:shadow-lg hover:-translate-y-1 flex flex-col"
                  key={l._id}
                  onClick={() => setSelectedLecture(l)}
                >
                  <div className="relative h-48">
                    <Image
                      src={l.thumbnail || "/placeholder.png"}
                      alt={l.title}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-105 rounded-t-lg"
                    />
                    <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {l.duration}
                    </div>
                  </div>
                  <CardContent className="pt-4 flex flex-col flex-1">
                    <div className="flex-1 space-y-3">
                      <Badge variant="outline">{l.category}</Badge>
                      <h3 className="font-semibold">{l.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        <strong>Mode:</strong> {l.mode ?? "N/A"}
                      </p>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        {(l.content ?? []).slice(0, 3).map((c: string, i: number) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                            <span>{c}</span>
                          </li>
                        ))}
                        {l.content && l.content.length > 3 && (
                          <li className="italic text-xs text-muted-foreground">+ more</li>
                        )}
                      </ul>
                      {/* Show priceLabel instead of discountedPrice */}
                      {l.priceLabel && (
                        <p className="text-sm font-semibold text-foreground">
                          {l.priceLabel}
                          {l.originalPrice && (
                            <span className="ml-2 line-through text-xs text-muted-foreground font-normal">
                              {l.originalPrice}
                            </span>
                          )}
                        </p>
                      )}
                      <p className="text-xs italic text-muted-foreground">
                        {l.priceNote}
                      </p>
                    </div>
                    <Button variant="secondary" className="w-full mt-4">
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* ---------------- WORKSHOPS ---------------- */}
          <TabsContent value="workshops" className="mt-10 text-center">
            <h3 className="font-display text-3xl md:text-4xl font-bold text-gradient mb-10">
              Offline and Online Workshops
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
              {workshops.map((w) => (
                <Card
                  className="overflow-hidden transition-all duration-300 cursor-pointer hover:shadow-lg hover:-translate-y-1 flex flex-col"
                  key={w.id}
                  onClick={() => setSelectedWorkshop(w)}
                >
                  <div className="relative h-48">
                    <Image
                      src={w.thumbnail || "/placeholder.png"}
                      alt={w.title}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-105 rounded-t-lg"
                    />
                    <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {w.duration}
                    </div>
                  </div>
                  <CardContent className="p-4 flex flex-col flex-1">
                    <div className="flex-1 space-y-3">
                      <Badge variant="outline">{w.category}</Badge>
                      <h3 className="font-semibold text-lg">{w.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        <strong>Mode:</strong> {w.mode}
                      </p>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        {(w.content ?? []).slice(0, 3).map((c: string, i: number) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                            <span>{c}</span>
                          </li>
                        ))}
                        {w.content && w.content.length > 3 && (
                          <li className="italic text-xs text-muted-foreground">+ more</li>
                        )}
                      </ul>
                      <p className="text-xs italic text-muted-foreground">
                        {w.priceNote}
                      </p>
                    </div>
                    <Button variant="secondary" className="w-full mt-4">
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* ---------------- CONSULTING ---------------- */}
          <TabsContent value="consulting" className="mt-10 text-center">
            <h3 className="font-display text-3xl md:text-4xl font-bold text-gradient mb-10">
              Consultation Services
            </h3>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {consultationServices.map((c) => (
                <Card
                  className="overflow-hidden transition-all duration-300 cursor-pointer hover:shadow-lg hover:-translate-y-1 flex flex-col"
                  key={c.id}
                  onClick={() => setSelectedConsultation(c)}
                >
                  <div className="relative h-48 w-full overflow-hidden bg-muted">
                    <Image
                      src={c.thumbnail || "/placeholder.png"}
                      alt={c.title}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {c.duration}
                    </div>
                  </div>
                  <CardContent className="pt-4 flex flex-col flex-1">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-semibold text-lg leading-tight">{c.title}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">{c.description}</p>
                      <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                        <Badge variant="outline">{c.mode}</Badge>
                        <Badge variant="outline">{c.audience}</Badge>
                      </div>
                    </div>
                    <Button
                      onClick={() => setSelectedConsultation(c)}
                      className="w-full mt-4"
                    >
                      <Briefcase className="w-4 h-4 mr-2" />
                      {c.cta}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* ---------------- DIALOGS ---------------- */}
      <ComplementaryLectureDetailDialog
        video={selectedComplementaryLecture}
        open={!!selectedComplementaryLecture}
        onOpenChange={() => setSelectedComplementaryLecture(null)}
      />

      <LectureDetailDialog
        video={selectedLecture}
        open={!!selectedLecture}
        onOpenChange={() => setSelectedLecture(null)}
      />

      <WorkshopDetailDialog
        workshop={selectedWorkshop}
        open={!!selectedWorkshop}
        onOpenChange={() => setSelectedWorkshop(null)}
      />

      <ConsultationDetailDialog
        service={selectedConsultation}
        open={!!selectedConsultation}
        onOpenChange={() => setSelectedConsultation(null)}
        isBooked={false}
      />
    </div>
  );
}