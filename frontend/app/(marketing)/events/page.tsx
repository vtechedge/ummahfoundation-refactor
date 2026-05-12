import type { Metadata } from "next";
import { EventsSection } from "@/components/marketing/EventsSection";
import { PageBanner } from "@/components/shared/PageBanner";

export const metadata: Metadata = {
  title: "Events — Ummah Foundation of Durham",
  description:
    "Upcoming events and programs at Masjid Al-Ummah, Oshawa. Lectures, community dinners, youth programs, and more.",
};

export default function EventsPage() {
  return (
    <>
      <PageBanner
        label="Masjid Al-Ummah"
        title="Upcoming Events"
        description="Lectures, community dinners, youth programs, and more — join us at Masjid Al-Ummah in Oshawa."
        breadcrumb={[{ label: "Events", href: "/events" }]}
      />
      <EventsSection showHeader={false} />
    </>
  );
}
