import Link from "next/link";
import { GraduationCap, Clock, Users, ArrowRight, BookOpen, BookMarked, Sun, Sparkles } from "lucide-react";
import { programs, programDetails, contact } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/shared/Section";

const ICON_MAP: Record<string, React.ElementType> = {
  sparkles:   Sparkles,
  graduation: GraduationCap,
  book:       BookMarked,
  users:      Sun,
};

const ACCENT = {
  green: { bg: "#E8F5EE", color: "#1E7A3A", border: "#8DCCA7" },
  gold:  { bg: "#FDF8EC", color: "#B8870F", border: "#EDD98A" },
};

function Badge({ label }: { label: string }) {
  const styles: Record<string, string> = {
    "Admissions Open": "bg-islamic-600 text-white",
    "Ages 6+":         "bg-islamic-100 text-islamic-800 border border-islamic-300",
    "Seasonal":        "bg-gold-100 text-gold-800 border border-gold-300",
  };
  return (
    <span className={cn("text-sm font-bold uppercase tracking-wide px-3.5 py-1.5 rounded whitespace-nowrap", styles[label] ?? "bg-gray-100 text-gray-600")}>
      {label}
    </span>
  );
}

function ctaLabel(title: string) {
  if (title.includes("Hifz") || title.includes("Aalim")) return "Apply";
  if (title.includes("Summer")) return "Enquire";
  return "Register";
}

export function ProgramsSection({ showHeader = true, limit }: { showHeader?: boolean; limit?: number }) {
  return (
    <section id="programs" className="py-12 sm:py-16 lg:py-20 bg-cream">
      <div className="container-tight">

        {showHeader && (
          <SectionHeader
            label="Darul-Uloom UFD · Masjid Al-Ummah"
            title="Programs &amp; Classes"
            action={
              <Link href="/programs" className="text-sm font-semibold text-islamic-600 hover:text-islamic-700 transition-colors hidden sm:block">
                All programmes →
              </Link>
            }
          />
        )}

        {/* Column labels */}
        <div className="hidden md:grid grid-cols-12 px-5 pb-2 text-xs font-bold uppercase tracking-widest text-muted/60">
          <div className="col-span-5">Programme</div>
          <div className="col-span-3">Schedule</div>
          <div className="col-span-2">Eligibility</div>
          <div className="col-span-2 text-right pe-2">Status</div>
        </div>

        {/* Card rows */}
        <div className="space-y-2.5">
          {(limit ? programs.slice(0, limit) : programs).map((p) => {
            const detail   = programDetails[p.title as keyof typeof programDetails];
            const accent   = ACCENT[p.accent];
            const Icon     = ICON_MAP[p.icon] ?? BookOpen;
            const [days, time] = p.schedule.split("·").map((s) => s.trim());

            return (
              <div
                key={p.id}
                className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-gray-300 transition-all px-6 py-6 grid md:grid-cols-12 items-center gap-5"
              >
                {/* Programme — col 1-5 */}
                <div className="md:col-span-5 flex items-center gap-4">
                  <div
                    className="h-14 w-14 rounded-xl flex items-center justify-center flex-shrink-0 border"
                    style={{ backgroundColor: accent.bg, borderColor: accent.border }}
                  >
                    <Icon className="h-6 w-6" style={{ color: accent.color }} />
                  </div>
                  <div>
                    <p className="font-bold text-xl text-ink leading-snug">{p.title}</p>
                    <p className="text-sm text-muted mt-0.5">
                      {detail?.subtitle}
                      {detail?.presenter && (
                        <span className="text-islamic-600 font-medium"> · {detail.presenter}</span>
                      )}
                    </p>
                  </div>
                </div>

                {/* Schedule — col 6-8 */}
                <div className="md:col-span-3 hidden md:flex items-center gap-2.5">
                  <Clock className="h-6 w-6 text-islamic-400 flex-shrink-0" />
                  <div>
                    <p className="text-lg font-semibold text-ink leading-snug">{days}</p>
                    {time && <p className="text-sm text-muted">{time}</p>}
                  </div>
                </div>

                {/* Eligibility — col 9-10 */}
                <div className="md:col-span-2 hidden md:flex items-center gap-2">
                  <Users className="h-6 w-6 text-islamic-400 flex-shrink-0" />
                  <span className="text-lg font-medium text-ink/75">{p.ageRange}</span>
                </div>

                {/* Status + CTA — col 11-12 */}
                <div className="md:col-span-2 flex md:flex-col items-center md:items-end justify-between md:justify-center gap-3">
                  {detail?.badge && <Badge label={detail.badge} />}
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1.5 text-lg font-bold text-islamic-600 hover:text-islamic-800 transition-colors whitespace-nowrap"
                  >
                    {ctaLabel(p.title)}
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Admissions footer */}
        <div
          className="mt-6 pt-4 flex flex-wrap items-center justify-between gap-3"
          style={{ borderTop: "1px solid rgba(201,162,39,0.25)" }}
        >
          <div className="flex items-center gap-2.5 text-base text-muted">
            <GraduationCap className="h-5 w-5 text-gold-500 flex-shrink-0" />
            <span>
              Admissions &amp; enquiries — speak to{" "}
              <span className="font-bold text-ink">{contact.moulana.name}</span>
              , {contact.moulana.role}
            </span>
          </div>
          <a
            href={contact.moulana.phoneHref}
            className="font-bold text-base text-islamic-600 hover:text-islamic-700 transition-colors"
          >
            {contact.moulana.phone}
          </a>
        </div>

      </div>
    </section>
  );
}
