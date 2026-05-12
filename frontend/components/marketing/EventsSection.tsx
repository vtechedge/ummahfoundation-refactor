import Link from "next/link";
import { ArrowUpRight, Calendar } from "lucide-react";
import { events } from "@/lib/mock-data";
import { SectionHeader } from "@/components/shared/Section";

export function EventsSection({ showHeader = true, limit }: { showHeader?: boolean; limit?: number }) {
  return (
    <section id="events" className="bg-white py-12 sm:py-16 lg:py-20 border-t border-gray-100">
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

        <ul className="border-t border-gray-200">
          {(limit ? events.slice(0, limit) : events).map((ev) => {
            const d = new Date(ev.date);
            const day = d.getDate();
            const month = d.toLocaleDateString("en", { month: "short" });
            const weekday = d.toLocaleDateString("en", { weekday: "long" });
            return (
              <li
                key={ev.id}
                className="group grid grid-cols-12 items-center gap-4 py-5 border-b border-gray-100 hover:bg-islamic-50/30 transition-colors"
              >
                {/* Date chip */}
                <div className="col-span-2 sm:col-span-1 flex flex-col items-center justify-center bg-islamic-50 rounded text-center py-2 px-1">
                  <span className="font-sans font-bold text-xl text-islamic-700 leading-none tabular-nums">
                    {day}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wide text-islamic-500 mt-0.5">
                    {month}
                  </span>
                </div>

                {/* Event info */}
                <div className="col-span-8 sm:col-span-10">
                  <h3 className="font-bold text-sm text-ink leading-snug font-sans">
                    {ev.title}
                  </h3>
                  <p className="mt-0.5 text-xs text-muted">
                    {weekday} &middot; {ev.time} &middot; {ev.location}
                  </p>
                </div>

                {/* Arrow CTA */}
                <div className="col-span-2 sm:col-span-1 flex justify-end">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-200 text-muted group-hover:border-islamic-400 group-hover:text-islamic-600 transition-colors">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </li>
            );
          })}
        </ul>

      </div>
    </section>
  );
}
