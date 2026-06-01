// Server component — fetches data, renders section shell.

import Link from "next/link";
import { ArrowUpRight, Calendar, Clock, MapPin } from "lucide-react";
import { announcements, events as mockEvents, type Announcement } from "@/lib/mock-data";
import { apiFetch } from "@/lib/api";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";

type ApiAnnouncement = {
  _id: string; title: string; body: string; date: string;
  priority: "normal" | "urgent"; tag: string;
  isActive: boolean; tickerOnly: boolean; order: number;
};

const MAROON = "#4E0C17";
const GREEN = "#1F7E3A";
const TEXT = "#1a1a1a";

// ── Shared date format helpers ───────────────────────────────────────────────
function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric", month: "short", year: "numeric",
  }).toUpperCase();
}

function fmtEventDate(iso: string) {
  const d = new Date(iso + "T00:00:00");
  return {
    day: d.getDate(),
    month: d.toLocaleDateString("en", { month: "short" }).toUpperCase(),
  };
}

function toDisplay(a: ApiAnnouncement): Announcement {
  return {
    id: a._id, title: a.title, body: a.body,
    date: a.date.slice(0, 10), priority: a.priority, tag: a.tag,
  };
}

export async function AnnouncementsSection() {
  const apiData = await apiFetch<ApiAnnouncement[]>("/announcements");
  const data: Announcement[] = apiData?.length ? apiData.map(toDisplay) : announcements;

  const notices = data.filter((a) => a.priority === "urgent");
  const updates = data.filter((a) => a.priority !== "urgent");
  const upcomingEvents = mockEvents.slice(0, 4);

  const tagColor = (tag: string) => {
    const map: Record<string, { bg: string; color: string }> = {
      Eid: { bg: "#FFF3CD", color: "#856404" },
      Zakat: { bg: "#D1ECF1", color: "#0C5460" },
      Sunnah: { bg: "#D4EDDA", color: "#155724" },
      Education: { bg: "#CCE5FF", color: "#004085" },
      Community: { bg: "#D4EDDA", color: "#155724" },
      Lecture: { bg: "#E2D9F3", color: "#4A235A" },
      Youth: { bg: "#CCE5FF", color: "#004085" },
      Celebration: { bg: "#FDEBD0", color: "#784212" },
    };
    return map[tag] || { bg: "#e9ecef", color: "#495057" };
  };

  return (
    <section
      id="announcements"
      className="relative overflow-hidden w-full py-16 px-6 border-b border-gray-200/50"
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

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section heading */}
        <div className="flex items-end justify-between mb-10 pb-4 border-b border-white/10">
          <div>
            <SectionEyebrow className="text-gold-300/80" diamondClassName="text-gold-550 mr-2" underlineWidth="w-[100px]">
              From the Masjid
            </SectionEyebrow>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-sans text-white">
              Community &amp; Updates
            </h2>
          </div>
        </div>

        <div className="flex flex-col gap-10">

          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Col 1 — Notices */}
            <div>
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/10">
                <span className="text-xs font-bold tracking-widest uppercase text-white/90">
                  Community Notices
                </span>
                <Link href="#" className="text-xs font-bold text-gold-300/80 hover:text-gold-300 transition">
                  All notices
                  <span className="inline-block group-hover:translate-x-1.5 transition-transform duration-200">→</span>
                </Link>
              </div>
              <div className="flex flex-col gap-4">
                {notices.map((n, i) => {
                  const tc = tagColor(n.tag);
                  return (
                    <div
                      key={n.id || i}
                      className="rounded-xl p-5 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 ease-out animate-fade-in"
                      style={{ border: "1px solid #EFECE6", borderLeft: `4px solid ${MAROON}` }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        {i === 0 && (
                          <span
                            className="text-xs font-bold px-2 py-0.5 rounded"
                            style={{ background: "#FCE4E4", color: MAROON }}
                          >
                            Urgent
                          </span>
                        )}
                        <span
                          className="text-xs px-2 py-0.5 rounded"
                          style={{ background: tc.bg, color: tc.color }}
                        >
                          {n.tag}
                        </span>
                        <span className="text-xs text-gray-400 ml-auto">{fmtDate(n.date)}</span>
                      </div>
                      <h4 className="font-bold text-sm mb-1 font-sans" style={{ color: TEXT }}>{n.title}</h4>
                      <p className="text-xs text-muted leading-relaxed" style={{ fontFamily: "sans-serif" }}>{n.body}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Col 2 — News */}
            <div>
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/10">
                <span className="text-xs font-bold tracking-widest uppercase text-white/90">
                  News &amp; Updates
                </span>
                <Link href="#" className="text-xs font-bold text-gold-300/80 hover:text-gold-300 transition">
                  All updates
                  <span className="inline-block group-hover:translate-x-1.5 transition-transform duration-200">→</span>
                </Link>
              </div>
              <div className="flex flex-col gap-4">
                {updates.map((n, i) => {
                  const tc = tagColor(n.tag);
                  return (
                    <div
                      key={n.id || i}
                      className="rounded-xl p-5 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 ease-out"
                      style={{ border: "1px solid #EFECE6", borderLeft: `4px solid #C9A227` }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className="text-xs px-2 py-0.5 rounded"
                          style={{ background: tc.bg, color: tc.color }}
                        >
                          {n.tag}
                        </span>
                        <span className="text-xs text-gray-400 ml-auto">{fmtDate(n.date)}</span>
                      </div>
                      <h4 className="font-bold text-sm mb-1 font-sans" style={{ color: TEXT }}>{n.title}</h4>
                      <p className="text-xs text-muted leading-relaxed" style={{ fontFamily: "sans-serif" }}>{n.body}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Col 3 — Events */}
          <div>
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/10">
              <span className="text-xs font-bold tracking-widest uppercase text-white/90">
                Events &amp; Programs
              </span>
              <Link href="/events" className="text-xs font-bold text-gold-300/80 hover:text-gold-300 transition">
                All events
                <span className="inline-block group-hover:translate-x-1.5 transition-transform duration-200">→</span>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {upcomingEvents.map((e, i) => {
                const tc = tagColor(e.tag);
                const { day, month } = fmtEventDate(e.date);
                const d = new Date(e.date + "T00:00:00");
                const weekday = d.toLocaleDateString("en", { weekday: "long" });
                return (
                  <div
                    key={e.id || i}
                    className="flex gap-4 items-start rounded-xl p-4 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 ease-out"
                    style={{ border: "1px solid #EFECE6" }}
                  >
                    <div
                      className="flex flex-col items-center justify-center rounded-lg flex-shrink-0 bg-islamic-600"
                      style={{ width: 52, height: 52, background: "#F4F9F5", border: `1px solid ${GREEN}30` }}
                    >
                      <span className="text-xs uppercase tracking-wide" style={{ color: TEXT + "99" }}>{month}</span>
                      <span className="text-xl font-bold leading-none" style={{ color: GREEN }}>{day}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className="text-xs px-2 py-0.5 rounded"
                          style={{ background: tc.bg, color: tc.color }}
                        >
                          {e.tag}
                        </span>
                        <span className="text-[11px] font-normal text-muted/75 ml-1 font-sans">
                          {weekday}
                        </span>
                      </div>
                      <h4 className="font-bold text-sm font-sans text-ink truncate">{e.title}</h4>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-xs text-muted font-semibold">
                        <span className="flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5 text-gold-500" />
                          {e.time}
                        </span>
                        <span className="text-gray-300 select-none hidden sm:inline">&middot;</span>
                        <span className="flex items-center gap-1.5 truncate">
                          <MapPin className="h-3.5 w-3.5 text-gold-500" />
                          {e.location}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
