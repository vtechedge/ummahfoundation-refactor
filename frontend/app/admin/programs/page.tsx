import { Topbar } from "@/components/admin/Topbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { programs } from "@/lib/mock-data";
import { BookOpen, Users, Calendar, Heart, GraduationCap, Sparkles, Plus, Pencil, Eye } from "lucide-react";

const iconMap = {
  book: BookOpen,
  users: Users,
  calendar: Calendar,
  heart: Heart,
  graduation: GraduationCap,
  sparkles: Sparkles,
} as const;

export default function AdminPrograms() {
  return (
    <>
      <Topbar title="Programs" subtitle="Add, edit, or archive programs the foundation offers." />

      <div className="p-6 sm:p-8 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Badge variant="neutral">All · {programs.length}</Badge>
            <Badge variant="soft">Active · {programs.length}</Badge>
            <Badge variant="soft">Archived · 0</Badge>
          </div>
          <Button variant="primary" size="sm" className="h-10">
            <Plus className="h-4 w-4" /> New program
          </Button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {programs.map((p) => {
            const Icon = iconMap[p.icon];
            return (
              <div
                key={p.id}
                className="rounded-2xl bg-white border border-islamic-50 shadow-card p-6 hover:shadow-glow transition"
              >
                <div className="flex items-start justify-between">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-islamic-50 text-islamic-600">
                    <Icon className="h-5 w-5" />
                  </span>
                  <Badge variant="green">Active</Badge>
                </div>
                <h3 className="mt-4 font-sans font-semibold text-lg text-ink">{p.title}</h3>
                <p className="mt-1 text-sm text-muted line-clamp-2">{p.description}</p>

                <dl className="mt-4 space-y-1.5 text-xs">
                  <Row label="Schedule" value={p.schedule} />
                  <Row label="Age range" value={p.ageRange} />
                  <Row label="Enrolled" value="42 students" />
                </dl>

                <div className="mt-5 flex gap-2">
                  <button className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full bg-islamic-50 hover:bg-islamic-100 py-2 text-xs font-medium text-islamic-700">
                    <Eye className="h-3.5 w-3.5" /> View
                  </button>
                  <button className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full bg-islamic-500 hover:bg-islamic-600 text-white py-2 text-xs font-medium">
                    <Pencil className="h-3.5 w-3.5" /> Edit
                  </button>
                </div>
              </div>
            );
          })}

          {/* Empty-slot CTA */}
          <button className="rounded-2xl border-2 border-dashed border-islamic-200 hover:border-islamic-400 hover:bg-white/60 transition p-6 flex flex-col items-center justify-center gap-3 min-h-[280px] text-islamic-600">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-islamic-50">
              <Plus className="h-5 w-5" />
            </span>
            <div className="text-sm font-medium">Add a new program</div>
            <div className="text-xs text-muted max-w-[200px] text-center">
              Drop in a title, schedule and description — takes about a minute.
            </div>
          </button>
        </div>
      </div>
    </>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-muted uppercase tracking-wider">{label}</dt>
      <dd className="text-ink/80 font-medium">{value}</dd>
    </div>
  );
}
