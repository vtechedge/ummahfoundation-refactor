import { TopUtilityBar } from "@/components/marketing/TopUtilityBar";
import { PrayerTimesBar } from "@/components/marketing/PrayerTimesBar";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { ScrollButtons } from "@/components/marketing/ScrollButtons";
import { PageTransition } from "@/components/shared/PageTransition";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <TopUtilityBar />
      <PrayerTimesBar />
      <Navbar />
      <PageTransition>
        <main>{children}</main>
      </PageTransition>
      {/* Gold gradient separator — prevents footer from bleeding into last section */}
      <div
        aria-hidden
        className="h-[3px] w-full"
        style={{
          background: "linear-gradient(90deg, transparent 0%, #C9A227 30%, #C9A227 70%, transparent 100%)",
          opacity: 0.7,
        }}
      />
      <Footer />
      <ScrollButtons />
    </>
  );
}
