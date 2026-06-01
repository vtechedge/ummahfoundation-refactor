// Server component — fetches data, renders section shell.
// Animated rendering is delegated to AnnouncementsGrid (client).

import Link from "next/link";
import { announcements, events as mockEvents, type Announcement } from "@/lib/mock-data";
import { apiFetch } from "@/lib/api";
import { AnnouncementsGrid } from "./AnnouncementsGrid";
import { SectionHeader } from "@/components/shared/Section";

type ApiAnnouncement = {
  _id: string; title: string; body: string; date: string;
  priority: "normal" | "urgent"; tag: string;
  isActive: boolean; tickerOnly: boolean; order: number;
};

function toDisplay(a: ApiAnnouncement): Announcement {
  return {
    id: a._id, title: a.title, body: a.body,
    date: a.date.slice(0, 10), priority: a.priority, tag: a.tag,
  };
}

export async function AnnouncementsSection() {
  const apiData = await apiFetch<ApiAnnouncement[]>("/announcements");
  const data: Announcement[] = apiData?.length ? apiData.map(toDisplay) : announcements;

  const notices        = data.filter((a) => a.priority === "urgent");
  const updates        = data.filter((a) => a.priority !== "urgent");
  const upcomingEvents = mockEvents.slice(0, 4);

  return (
    <section
      id="announcements"
      className="relative overflow-hidden w-full py-12 sm:py-16 lg:py-20"
      style={{ background: "linear-gradient(160deg, #135027 0%, #1E7A3A 60%, #196631 100%)" }}
    >
      {/* Subtle gold dot pattern */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(201,162,39,0.15) 1px, transparent 0)",
          backgroundSize: "40px 40px",
          opacity: 0.2,
        }}
      />

      <div className="relative max-w-screen-xl mx-auto px-6 sm:px-8">

        <SectionHeader
          label="From the Masjid"
          title="Community &amp; Updates"
          dark
          action={
            <Link
              href="#"
              className="group inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-gold-300/50 hover:text-gold-300 transition-colors hidden sm:inline-flex"
            >
              View all
              <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5">→</span>
            </Link>
          }
        />

        {/* Animated 3-column grid — client component */}
        <AnnouncementsGrid
          notices={notices}
          updates={updates}
          upcomingEvents={upcomingEvents}
        />

      </div>
    </section>
  );
}
