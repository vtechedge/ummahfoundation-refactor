import type { Metadata } from "next";
import { DonationSection } from "@/components/marketing/DonationSection";
import { PageBanner } from "@/components/shared/PageBanner";

export const metadata: Metadata = {
  title: "Donate — Ummah Foundation of Durham",
  description:
    "Support the Masjid Al-Ummah construction project and other campaigns. Donate online or via Interac e-Transfer.",
};

export default function DonatePage() {
  return (
    <>
      <PageBanner
        label="Support the Masjid"
        title="Make a Donation"
        description="Every dollar builds something lasting. Support the Masjid Al-Ummah construction and our community programs."
        breadcrumb={[{ label: "Donate", href: "/donate" }]}
      />
      <DonationSection />
    </>
  );
}
