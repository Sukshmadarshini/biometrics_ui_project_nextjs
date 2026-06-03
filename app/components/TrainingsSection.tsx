// "use client"
// import { Calendar, Clock, Users, ArrowRight } from "lucide-react";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
// import { Button } from "../components/ui/button";
// import { Badge } from "../components/ui/badge";
// import Link from "next/link";


// export function TrainingsSection() {
//   return (
//     <section id="trainings" className="py-10 pb-14 bg-background relative">

//       {/* Background pattern */}
//       <div className="absolute inset-0 opacity-[0.05]">
//         <div className="absolute inset-0" style={{
//           backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
//         }} />
//       </div>

//       <div className="container mx-auto relative px-4">
//         {/* Section Header */}
//         <div className="text-center max-w-3xl mx-auto mb-16">
//           <div className="relative inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
//             <Users className="w-4 h-4" />
//             <span className="text-sm font-semibold">Workshops</span>
//           </div>
//           <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
//             Upcoming Hands-on
//             <span className="text-gradient"> Workshops</span>
//           </h2>
//           <p className="text-lg text-muted-foreground">
//             Industry-ready Workshop programs designed by scientists with deep domain expertise 
//             and active research experience at the forefront of biologics R&D.
//           </p>
//         </div>

//         {/* CTA */}
//         <div className="relative text-center mt-12">
//            <a href="/services" className="inline-flex items-center gap-2">
//             <Button size="lg" className="rounded-full px-8 bg-secondary hover:bg-secondary/90 text-secondary-foreground">
//               View All Programs
//             </Button>
//           </a>
//         </div>
//       </div>
//     </section>
//   );
// }


"use client"
import { Users } from "lucide-react";
import { Button } from "../components/ui/button";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

interface WorkshopsSectionProps {
  badge?:         string;
  heading?:       string;
  // headingAccent?: string;
  subheading?:    string;
  ctaLabel?:      string;
  ctaHref?:       string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

export function TrainingsSection({
  badge,         
  // = "Workshops",
  heading,       
  // = "Upcoming Hands-on",
  // headingAccent, 
  // = "Workshops",
  subheading,    
  // = "Industry-ready Workshop programs designed by scientists with deep domain expertise and active research experience at the forefront of biologics R&D.",
  ctaLabel,      
  // = "View All Programs",
  ctaHref,       
  // = "/services",
}: WorkshopsSectionProps) {
  return (
    <section id="trainings" className="py-10 pb-14 bg-background relative">

      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.05]">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container relative mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="relative inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
            <Users className="w-4 h-4" />
            <span className="text-sm font-semibold">{badge}</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-gradient mb-6">
            {heading}
            {/* <span className="text-gradient"> {headingAccent}</span> */}
          </h2>
          {subheading && (
            <p className="text-lg text-muted-foreground">{subheading}</p>
          )}
        </div>

        {/* CTA */}
        <div className="relative text-center mt-12">
          <a href={ctaHref} className="inline-flex items-center gap-2">
            <Button size="lg" className="rounded-full px-8 bg-secondary hover:bg-secondary/90 text-secondary-foreground">
              {ctaLabel}
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}