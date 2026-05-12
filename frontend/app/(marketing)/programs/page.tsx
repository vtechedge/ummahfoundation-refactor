import type { Metadata } from "next";
import { ProgramsSection } from "@/components/marketing/ProgramsSection";
import { PageBanner } from "@/components/shared/PageBanner";

export const metadata: Metadata = {
  title: "Programs & Classes — Ummah Foundation of Durham",
  description:
    "Darul-Uloom UFD Alim & Hifz programs, Children's Madrasah, and community education classes.",
};

export default function ProgramsPage() {
  return (
    <>
      <PageBanner
        label="Darul-Uloom UFD · Masjid Al-Ummah"
        title="Programs & Classes"
        description="Alim, Hifz, Children's Madrasah, and community education — rooted in tradition, built for Durham."
        breadcrumb={[{ label: "Programs", href: "/programs" }]}
      />
      <ProgramsSection showHeader={false} />
    </>
  );
}
