import Link from "next/link";
import { MapPin } from "lucide-react";
import { prayerTimes, contact } from "@/lib/mock-data";

export function JummahCard() {
  const jummah = prayerTimes.find((p) => p.name === "Jummah")!;

  return (
    <div
      className="relative overflow-hidden border-y"
      style={{
        backgroundColor: "#FBF4E0",
        borderColor: "rgba(201,162,39,0.35)",
      }}
    >
      {/* Faint dot texture */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(201,162,39,0.25) 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative container-tight py-7 sm:py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">

          {/* Left — Arabic + label */}
          <div className="flex items-center gap-5">
            <div
              className="flex-shrink-0 h-16 w-16 rounded-full flex items-center justify-center border-2"
              style={{ backgroundColor: "rgba(201,162,39,0.15)", borderColor: "rgba(201,162,39,0.4)" }}
            >
              <span
                className="font-arabic text-gold-600 leading-none"
                style={{ fontSize: "1.6rem" }}
                dir="rtl"
                aria-label="Al-Jumu'ah"
              >
                الجمعة
              </span>
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-gold-600 mb-0.5">
                <span className="mr-1.5">◆</span>Every Friday
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-maroon-500 leading-tight">
                Jumu&apos;ah Prayer
              </h2>
              <p className="mt-1 flex items-center gap-1.5 text-sm text-muted">
                <MapPin className="h-3.5 w-3.5 text-gold-500 flex-shrink-0" />
                Masjid Al-Ummah &middot; {contact.address.line1}, {contact.address.line2}
              </p>
            </div>
          </div>

          {/* Centre — times */}
          <div className="flex items-center gap-4 sm:gap-8">
            <div className="text-center">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gold-600 mb-1">Khutbah</p>
              <p
                className="font-bold tabular-nums text-maroon-500"
                style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)" }}
              >
                {jummah.begins}
              </p>
            </div>
            <div
              aria-hidden
              className="w-px h-10 self-center"
              style={{ backgroundColor: "rgba(201,162,39,0.4)" }}
            />
            <div className="text-center">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gold-600 mb-1">Iqamah</p>
              <p
                className="font-bold tabular-nums text-ink"
                style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)" }}
              >
                {jummah.adhan}
              </p>
            </div>
          </div>

          {/* Right — CTA */}
          <div className="flex flex-col items-center sm:items-end gap-2 text-center sm:text-right">
            <Link
              href="/prayer-times"
              className="inline-flex items-center gap-2 bg-maroon-500 hover:bg-maroon-600 text-white text-sm font-bold px-5 py-2.5 rounded transition-colors"
            >
              Full Prayer Schedule
            </Link>
            <p className="text-xs text-muted/70">
              Doors open 30 min before Khutbah
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
