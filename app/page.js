// app/page.tsx
import {HeroSection} from "./components/HeroSection"
import {AboutSection} from "./components/AboutSection"
// import {ServicesSection} from "./components/ServicesSection"
// import {TrainingsSection} from "./components/TrainingsSection"
import TrainingsSectionWrapper from "./components/TrainingsSectionWrapper"
// import {EventsSection} from "./components/EventsSection"
// import {FounderInfo} from "./components/FounderInfo"
import { Expertise } from "./components/Expertise"
// import {GallerySection} from "./components/GallerySection"
// import {StatsSection} from "./components/StatsSection"
// import {ResourcesSection} from "./components/ResourcesSection"
// import {ContactSection} from "./components/ContactSection"
import ContactSectionWrapper from "./components/ContactSectionWrapper"
import HeroSectionWrapper from "./components/HeroSectionWrapper"
import AboutSectionWrapper from "./components/AboutSectionWrapper"
import ExpertiseWrapper from "./components/ExpertiseWrapper"
import PastAchievementsSectionWrapper from "./components/PastAchievementsSectionWrapper"
import TeamSectionWrapper from "./components/TeamSectionWrapper"
// import { EuropeanAdvisory } from "./components/EuropeanAdvisory"
// import { CoreFocusSection } from "./components/CoreFocus"

export const revalidate = 30;

export default function HomePage() {
  return (
    <>
      <HeroSectionWrapper />
      <AboutSectionWrapper />
      <ExpertiseWrapper />
      <TrainingsSectionWrapper />
      <PastAchievementsSectionWrapper />
      <TeamSectionWrapper />
      <ContactSectionWrapper />
      {/* <EventsSection /> */}
      {/* <GallerySection /> */}
      {/* <StatsSection /> */}
      {/* <ResourcesSection /> */}
      {/* <ServicesSection /> */}
      {/* <CoreFocusSection /> */}
      {/* <EuropeanAdvisory /> */}
    </>
  )
}
