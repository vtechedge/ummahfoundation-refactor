import type { Metadata } from "next";
import { AboutSection } from "@/components/marketing/AboutSection";
import { MasjidProjectSection } from "@/components/marketing/MasjidProjectSection";
import { VolunteerSection } from "@/components/marketing/VolunteerSection";
import { PageBanner } from "@/components/shared/PageBanner";

export const metadata: Metadata = {
  title: "About Us — Ummah Foundation of Durham",
  description:
    "Learn about the Ummah Foundation of Durham, Masjid Al-Ummah, our mission, and the $10M masjid construction project.",
};

export default function AboutPage() {
  return (
    <>
      <PageBanner
        label="Our story"
        title="About Ummah Foundation"
        description="Serving the Muslim community of Durham Region since 2013. Building the first Green Mosque in North America."
        breadcrumb={[{ label: "About", href: "/about" }]}
      />
      <AboutSection showHeader={false} />
      <MasjidProjectSection />
      <VolunteerSection />
    </>
  );
}
