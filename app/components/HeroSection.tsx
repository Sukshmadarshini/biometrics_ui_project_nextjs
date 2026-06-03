"use client"
import { LucideIcon, GraduationCap, BookOpen, FlaskConical, Presentation, Microscope, Users, Star  } from "lucide-react";
import { Button } from "./ui/button";
import Image from "next/image";
import { Navbar } from "../components/Navbar";
import { useMediaQuery } from "usehooks-ts";
import imageUrlBuilder from "@sanity/image-url";
import { sanity } from "@/app/lib/sanity"; // adjust path
// import { LucideIcon, GraduationCap, BookOpen, FlaskConical, Presentation, Microscope, Users, Star } from "lucide-react";

const builder = imageUrlBuilder(sanity);

const urlFor = (source: any) => builder.image(source);

const FALLBACK_ICONS: LucideIcon[] = [Presentation, BookOpen, FlaskConical, GraduationCap, Microscope, Users, Star];

const features = [
  {
    icon: Presentation,
    title: "Hands-on Workshops",
    description: "Application focused, data-driven training led by domain experts actively shaping the future of biologics research and development.",
  },
  {
    icon: BookOpen,
    title: "Customized Training Programs",
    description: "Training tailored to your level of expertise, technical background, and goals from foundational principles to advanced, applied workflows.",
  },
  {
    icon: FlaskConical,
    title: "Experimental Design & Consultation",
    description: "Strategic consultation on experimental design to ensure robust, interpretable, and decision-ready data for biologics development.",
  },
  {
    icon: GraduationCap,
    title: "Educational Consultations and Partnerships",
    description: "Academic guidance and strategic partnerships to support students and early-career researchers aspiring to excel in Europe’s research ecosystem",
  },
];

// const getImageUrl = (url?: string) => {
//   if (!url) return undefined;

//   if (url.startsWith("http")) return url;

//   return url;
// };



interface SanityService {
  _key?: string;
  title?: string;
  description?: string;
  icon?: any; // Sanity image reference
}

interface HeroSectionProps {
  heroTitle?: string;
  heroCtaLabel?: string;
  heroTagline?: string;
  heroImage?: string;
  heroImageMobile?: string;
  services?: SanityService[];
}

export function HeroSection({ 
  heroTitle ,
  heroCtaLabel ,
  heroTagline,
  heroImage,
  heroImageMobile,
  services = [],
}: HeroSectionProps) {
  // const imageUrl = getImageUrl(heroImage);
  // const desktopUrl = getImageUrl(heroImage);
  // const mobileUrl = getImageUrl(heroImageMobile);

  const isMobile = useMediaQuery("(max-width: 768px)");

const desktopUrl = heroImage ? urlFor(heroImage).width(1600).url() : undefined;
const mobileUrl = heroImageMobile ? urlFor(heroImageMobile).width(600).url() : undefined;
// console.log(heroImage);
// console.log(heroImageMobile);


const selectedImage = isMobile
  ? mobileUrl || desktopUrl
  : desktopUrl || mobileUrl;
  

  return (
    <>
    <Navbar />
    <section id="home" className="py-16 bg-background relative overflow-hidden">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/40 to-transparent z-10" />
        
        {/* <div className="absolute inset-0 w-full h-full">
          {selectedImage && (
            <Image
              src={selectedImage}
              alt="Hero"
              fill
              priority
              sizes="100vw"
              className="object-cover md:object-center object-top"
            />
          )}
        </div> */}
        <div className="absolute inset-0 w-full h-full">
          {(desktopUrl || mobileUrl) && (
            <picture>
              {/* Mobile */}
              {mobileUrl && (
                <source
                  media="(max-width: 500px)"
                  srcSet={mobileUrl}
                />
              )}

              {/* Desktop fallback */}
              <img
                src={desktopUrl || mobileUrl}
                alt="Hero"
                className="w-full h-full object-cover object-center"
              />
            </picture>
          )}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-[auto_1fr] min-h-[500px] items-end py-16">
            <div className="text-primary-foreground">
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                {heroTitle}
              </h1>
              <a href="/services" className="flex items-center gap-3">
                <div className="text-center mt-5">
                  <Button variant="outline" size="lg" className="rounded-md px-8 bg-secondary hover:bg-transparent text-secondary-foreground border-2 border-secondary hover:border-secondary">
                    {heroCtaLabel }
                  </Button>
                </div>
              </a>
            </div>
            <div className="hidden lg:block" />
          </div>
        </div>
      </div>

      {/* Feature Cards — unchanged */}
      <div className="container mx-auto px-4 py-16">
        {/* <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div key={feature.title} className="bg-card rounded-2xl p-6 shadow-soft hover:shadow-lg transition-all duration-300 animate-fade-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl gradient-accent flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground leading-tight">
                  {feature.title}
                </h3>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div> */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.length > 0
              ? services.map((service, index) => {
                  const FallbackIcon = FALLBACK_ICONS[index % FALLBACK_ICONS.length];
                  const iconUrl = service.icon ? urlFor(service.icon).width(64).height(64).url() : null;
 
                  return (
                    <div
                      key={service._key ?? index}
                      className="bg-card rounded-2xl p-6 shadow-soft hover:shadow-lg transition-all duration-300 animate-fade-up"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-xl gradient-accent flex items-center justify-center flex-shrink-0 overflow-hidden">
                          {iconUrl ? (
                            <Image
                              src={iconUrl}
                              alt={service.title ?? "Service icon"}
                              width={28}
                              height={28}
                              className="object-contain"
                            />
                          ) : (
                            <FallbackIcon className="w-6 h-6 text-primary-foreground" />
                          )}
                        </div>
                        <h3 className="font-display text-lg font-semibold text-foreground leading-tight">
                          {service.title}
                        </h3>
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  );
                })
              : // Graceful empty state — never shows a broken grid
                null}
          </div>

        <div className="text-center mt-16 animate-fade-up" style={{ animationDelay: '0.3s' }}>
          {/* <p className="text-xl md:text-2xl italic text-foreground"> */}
          <span className=" text-xl font-semibold md:text-2xl italic text-gradient block">
            {heroTagline}
          </span>
          {/* </p> */}
        </div>
      </div>
    </section>
    </>
  );
}