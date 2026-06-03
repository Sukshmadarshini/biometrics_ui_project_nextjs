import { getHomepage } from "@/app/lib/queries";
import { ContactSection } from "./ContactSection";

export default async function ContactSectionWrapper() {
  const home = await getHomepage();
  const cs = home.contactSection;

  return (
    <ContactSection
      badge={cs?.badge}
      heading={cs?.heading}
      subheading={cs?.subheading}
      email={cs?.email}
      phone={cs?.phone}
      location={cs?.location}
    />
  );
}