import { Topbar } from "@/components/admin/Topbar";
import { SmartImage } from "@/components/shared/SmartImage";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { events } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";
import { Plus, Pencil, Trash2, Users, MapPin } from "lucide-react";

export default function AdminEvents() {
  return (
    <>
      <Topbar title="Events" subtitle="Manage upcoming gatherings, camps and lectures." />

      <div className="p-6 sm:p-8 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1 p-1 bg-white border border-islamic-50 rounded-full text-sm shadow-card">
            {["Upcoming", "Past", "Drafts"].map((l, i) => (
              <button
                key={l}
                className={`px-4 py-1.5 rounded-full font-medium ${
                  i === 0 ? "bg-islamic-500 text-white" : "text-muted hover:text-ink"
                }`}
              >
                {l}
              </button>
            ))}
          </div>
          <Button variant="primary" size="sm" className="h-10">
            <Plus className="h-4 w-4" /> Create event
          </Button>
        </div>

        <div className="space-y-4">
          {events.map((ev) => {
            const d = new Date(ev.date);
            return (
              <article
                key={ev.id}
                className="rounded-2xl bg-white border border-islamic-50 shadow-card p-5 flex flex-col md:flex-row gap-5 hover:shadow-glow transition"
              >
                <div className="relative md:w-52 h-40 md:h-36 shrink-0 rounded-xl overflow-hidden">
                  <SmartImage src={ev.image} alt={ev.title} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge variant="gold">{ev.tag}</Badge>
                        <span className="text-xs text-muted">{formatDate(ev.date)} · {ev.time}</span>
                      </div>
                      <h3 className="mt-2 font-sans font-semibold text-xl text-ink">{ev.title}</h3>
                      <div className="mt-1 flex items-center gap-1.5 text-sm text-muted">
                        <MapPin className="h-3.5 w-3.5" /> {ev.location}
                      </div>
                    </div>
                    <div className="flex flex-col items-center justify-center rounded-xl bg-islamic-50 px-4 py-3 min-w-[60px]">
                      <span className="text-[10px] uppercase tracking-wider text-islamic-600 font-semibold">
                        {d.toLocaleDateString("en", { month: "short" })}
                      </span>
                      <span className="font-sans font-bold text-2xl leading-none text-islamic-700">
                        {d.getDate()}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-islamic-50">
                    <div className="flex items-center gap-4 text-xs">
                      <Stat icon={<Users className="h-3.5 w-3.5" />} label="Registered" value="128" />
                      <Stat icon={<Users className="h-3.5 w-3.5" />} label="Capacity" value="200" />
                    </div>
                    <div className="flex gap-2">
                      <Button variant="subtle" size="sm">
                        <Pencil className="h-3.5 w-3.5" /> Edit
                      </Button>
                      <Button variant="ghost" size="sm">
                        View registrants
                      </Button>
                      <button
                        className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-red-50 text-red-600 hover:bg-red-100"
                        aria-label="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-islamic-500">{icon}</span>
      <span className="text-muted">{label}:</span>
      <span className="font-semibold text-ink">{value}</span>
    </div>
  );
}
