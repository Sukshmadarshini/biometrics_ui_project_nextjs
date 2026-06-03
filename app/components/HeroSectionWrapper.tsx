import { getHomepage } from "@/app/lib/queries";
import { HeroSection } from "./HeroSection";

export default async function HeroSectionWrapper() {
  const home = await getHomepage();

  return (
    <HeroSection
      heroTitle={home.heroTitle}
      heroCtaLabel={home.heroCtaLabel}
      heroTagline={home.heroTagline}
      heroImage={home.heroImage?.asset?.url}
      heroImageMobile={home.heroImageMobile?.asset?.url}
      services={home.services ?? []}
    />
  );
}