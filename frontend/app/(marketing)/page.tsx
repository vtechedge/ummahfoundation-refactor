import { Hero } from "@/components/marketing/Hero";
import { ActiveCampaignCard } from "@/components/marketing/ActiveCampaignCard";
import { AnnouncementsSection } from "@/components/marketing/AnnouncementsSection";
import { PrayerTimesSection } from "@/components/marketing/PrayerTimesCard";
import { DonationSection } from "@/components/marketing/DonationSection";
import { StatsSection } from "@/components/marketing/StatsSection";
import { TrustBar } from "@/components/marketing/TrustBar";
import { GoldDivider } from "@/components/marketing/GoldDivider";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ActiveCampaignCard />
      <AnnouncementsSection />
      <PrayerTimesSection />
      <GoldDivider />
      <DonationSection />
      <StatsSection />
      <TrustBar />
    </>
  );
}
