import { Hero } from "@/components/marketing/Hero";
import { AnnouncementsSection } from "@/components/marketing/AnnouncementsSection";
import { PrayerTimesSection } from "@/components/marketing/PrayerTimesCard";
import { DonationSection } from "@/components/marketing/DonationSection";
import { StatsSection } from "@/components/marketing/StatsSection";
import { TrustBar } from "@/components/marketing/TrustBar";

export default function HomePage() {
  return (
    <>
      <Hero />
      <AnnouncementsSection />
      <PrayerTimesSection />
      <DonationSection />
      <StatsSection />
      <TrustBar />
    </>
  );
}
