import type { Metadata } from "next";
import { PrayerTimesSection } from "@/components/marketing/PrayerTimesCard";
import { PageBanner } from "@/components/shared/PageBanner";

export const metadata: Metadata = {
  title: "Prayer Times — Ummah Foundation of Durham",
  description:
    "Daily prayer times for Masjid Al-Ummah in Oshawa, ON. Fajr, Dhuhr, Asr, Maghrib, Isha and Jummah schedule.",
};

export default function PrayerTimesPage() {
  return (
    <>
      <PageBanner
        label="Masjid Al-Ummah · Oshawa, Ontario"
        title="Prayer Times"
        description="Daily Fajr, Dhuhr, Asr, Maghrib, Isha and Jummah schedule. Updated monthly."
        breadcrumb={[{ label: "Prayer Times", href: "/prayer-times" }]}
      />
      <PrayerTimesSection />
    </>
  );
}
