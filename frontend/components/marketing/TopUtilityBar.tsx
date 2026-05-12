// Trust + Context Layer — the first thing every visitor reads.
// Dark green band: Bismillah · address · phone · Hijri · Jummah time · Donate CTA
// Server Component — no client JS needed.

import Link from "next/link";
import { MapPin, Phone, Moon, Clock } from "lucide-react";
import { contact, prayerTimes } from "@/lib/mock-data";
import { getHijriDate } from "@/lib/hijri";

export function TopUtilityBar() {
  const hijri   = getHijriDate();
  const jummah  = prayerTimes.find((p) => p.name === "Jummah");
  const mapHref = `https://maps.google.com/?q=${encodeURIComponent(
    `${contact.address.line1}, ${contact.address.line2}`
  )}`;

  return (
    <div className="bg-islamic-900 text-[12px]">
      <div className="container-tight flex items-center justify-between h-10">

        {/* ── Left cluster ── */}
        <div className="flex items-center">

          {/* Bismillah */}
          <span
            className="font-arabic text-gold-300/80 text-[15px] pe-4 leading-none"
            dir="rtl"
            aria-label="Bismillah"
          >
            بسم الله
          </span>

          <span className="text-white/15 pe-4">|</span>

          {/* Address */}
          <a
            href={mapHref}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden xl:flex items-center gap-1.5 pe-4 me-0 text-white/65 hover:text-white/90 transition-colors"
          >
            <MapPin className="h-3.5 w-3.5 text-gold-300/60 flex-shrink-0" />
            <span>{contact.address.line1}, {contact.address.line2}</span>
          </a>

          {/* Separator */}
          <span className="hidden xl:inline text-white/15 pe-4">|</span>

          {/* Phone */}
          <a
            href={contact.masjidPhoneHref}
            className="flex items-center gap-1.5 pe-4 text-white/75 hover:text-white transition-colors font-medium whitespace-nowrap"
          >
            <Phone className="h-3.5 w-3.5 text-gold-300/60 flex-shrink-0" />
            <span>{contact.masjidPhone}</span>
          </a>

          {/* Hijri date */}
          <span className="hidden sm:inline text-white/15 pe-4">|</span>
          <div className="hidden sm:flex items-center gap-1.5 pe-4 text-white/65">
            <Moon className="h-3.5 w-3.5 text-gold-300/60 flex-shrink-0" />
            <span>{hijri}</span>
          </div>

          {/* Jummah time — gold, most important weekly event */}
          {jummah && (
            <>
              <span className="hidden md:inline text-white/15 pe-4">|</span>
              <div className="hidden md:flex items-center gap-1.5 text-gold-300/90 font-medium whitespace-nowrap">
                <Clock className="h-3.5 w-3.5 flex-shrink-0" />
                <span>
                  Jumu&apos;ah: {jummah.begins} Khutbah &bull; {jummah.adhan} Iqamah
                </span>
              </div>
            </>
          )}
        </div>

        {/* ── Donate CTA ── */}
        <Link
          href="/donate"
          className="flex-shrink-0 ms-4 bg-gold-400 hover:bg-gold-300 text-islamic-900 font-bold px-4 py-1.5 text-[11px] uppercase tracking-widest transition-colors leading-none"
        >
          Donate →
        </Link>

      </div>
    </div>
  );
}
