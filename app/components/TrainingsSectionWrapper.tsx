import { getHomepage } from "@/app/lib/queries";
import { TrainingsSection } from "./TrainingsSection";
 
export default async function TrainingsSectionWrapper() {
  const home = await getHomepage();
  const ws = home?.workshopsSection;
  console.log(ws)
 
  return (
    <TrainingsSection
      badge={ws?.badge}
      heading={ws?.heading}
      // headingAccent={ws?.headingAccent}
      subheading={ws?.subheading}
      ctaLabel={ws?.ctaLabel}
      ctaHref={ws?.ctaHref}
    />
  );
}
 