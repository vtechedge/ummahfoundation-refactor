"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Calendar, Clock, MapPin } from "lucide-react";
import { events } from "@/lib/mock-data";
import { SectionHeader } from "@/components/shared/Section";
import { cn } from "@/lib/utils";

const GREEN = "#1F7E3A";
const TEXT = "#1a1a1a";

function fmtEventDate(iso: string) {
  const d = new Date(iso + "T00:00:00");
  return {
    day: d.getDate(),
    month: d.toLocaleDateString("en", { month: "short" }).toUpperCase(),
  };
}

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

export function EventsSection({ showHeader = true, limit }: { showHeader?: boolean; limit?: number }) {
  const [selectedTag, setSelectedTag] = useState("All");

  // Dynamic tags extraction
  const tags = ["All", ...Array.from(new Set(events.map((e) => e.tag)))];

  // Filtering logic
  const filteredEvents = selectedTag === "All"
    ? events
    : events.filter((ev) => ev.tag === selectedTag);

  const displayedEvents = limit ? filteredEvents.slice(0, limit) : filteredEvents;

  return (
    <section id="events" className="bg-cream py-10 sm:py-16 lg:py-12 border-t border-gray-100">
      <div className="container-tight">

        {showHeader && (
          <SectionHeader
            label="Upcoming"
            title="Events &amp; Programs"
            action={
              <Link
                href="/events"
                className="flex items-center gap-1.5 text-xs text-islamic-600 font-semibold hover:text-islamic-700 transition-colors"
              >
                <Calendar className="h-3.5 w-3.5" />
                All events
              </Link>
            }
          />
        )}

        {/* Tag Filters */}
        <div className="flex flex-wrap items-center gap-2 mt-6 mb-8">
          {tags.map((tag) => {
            const isActive = selectedTag === tag;
            return (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={cn(
                  "px-4 py-1.5 rounded-full text-[10px] font-bold tracking-wider uppercase border transition-all duration-200 shadow-sm",
                  isActive
                    ? "bg-[#1F7E3A] border-[#1F7E3A] text-white"
                    : "bg-white text-ink/70 border-gray-200 hover:border-[#1F7E3A]/40 hover:text-[#1F7E3A]"
                )}
              >
                {tag}
              </button>
            );
          })}
        </div>

        {displayedEvents.length === 0 ? (
          <div className="text-center py-12 text-sm text-muted bg-[#F4F9F5] rounded-xl border border-[#EFECE6] font-semibold">
            No events found for this category.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {displayedEvents.map((ev) => {
              const tc = tagColor(ev.tag);
              const { day, month } = fmtEventDate(ev.date);
              const d = new Date(ev.date + "T00:00:00");
              const weekday = d.toLocaleDateString("en", { weekday: "long" });

              return (
                <div
                  key={ev.id}
                  className="group flex gap-4 items-start rounded-xl p-4 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 ease-out border border-[#EFECE6]"
                >
                  {/* Date chip */}
                  <div
                    className="flex flex-col items-center justify-center rounded-lg flex-shrink-0"
                    style={{ width: 52, height: 52, background: "#F4F9F5", border: `1px solid ${GREEN}30` }}
                  >
                    <span className="text-[10px] uppercase tracking-wide text-ink/65 font-bold">{month}</span>
                    <span className="text-xl font-bold leading-none" style={{ color: GREEN }}>{day}</span>
                  </div>

                  {/* Card body */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span
                        className="text-xs px-2 py-0.5 rounded tracking-wider"
                        style={{ background: tc.bg, color: tc.color }}
                      >
                        {ev.tag}
                      </span>
                      <span className="text-[11px] font-normal text-muted/75 ml-1 font-sans">
                        {weekday}
                      </span>
                    </div>
                    <h4 className="font-bold text-sm font-sans text-ink group-hover:text-islamic-600 transition-colors leading-snug truncate">
                      {ev.title}
                    </h4>
                    
                    {/* Meta items with icons in the same line */}
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-xs text-muted font-semibold">
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5 text-gold-500" />
                        {ev.time}
                      </span>
                      <span className="text-gray-300 select-none hidden sm:inline">&middot;</span>
                      <span className="flex items-center gap-1.5 truncate">
                        <MapPin className="h-3.5 w-3.5 text-gold-500" />
                        {ev.location}
                      </span>
                    </div>
                  </div>

                  {/* Arrow indicator */}
                  <div className="flex-shrink-0 self-center">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-gray-100 text-muted group-hover:border-islamic-400 group-hover:bg-islamic-50 group-hover:text-islamic-600 transition-all duration-200">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}
