import type { Metadata } from "next";
import { ServicesSection } from "@/components/marketing/ServicesSection";
import { PageBanner } from "@/components/shared/PageBanner";

export const metadata: Metadata = {
  title: "Community Services — Ummah Foundation of Durham",
  description:
    "Nikah ceremonies, funeral services, Madrasah, Islamic counselling, and more — serving the Muslim community of Durham Region.",
};

export default function ServicesPage() {
  return (
    <>
      <PageBanner
        label="Available to the community"
        title="Community Services"
        description="Nikah ceremonies, funeral services, Madrasah, Islamic counselling, and more — for all of Durham Region."
        breadcrumb={[{ label: "Services", href: "/services" }]}
      />
      <ServicesSection showHeader={false} />
    </>
  );
}
