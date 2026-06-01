import Link from "next/link";
import { Mail } from "lucide-react";
import { SmartImage } from "@/components/shared/SmartImage";
import { contact } from "@/lib/mock-data";
import { SectionHeader } from "@/components/shared/Section";

export function AboutSection({ showHeader = true }: { showHeader?: boolean }) {
  return (
    <section id="about" className="bg-cream py-12 sm:py-16 lg:py-20 border-t border-gray-100">
      <div className="container-tight">

        {showHeader && (
          <SectionHeader
            label="Who we are"
            title="About Ummah Foundation of Durham"
          />
        )}

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Photo */}
          <figure>
            <div className="relative aspect-[5/4] overflow-hidden rounded border border-gray-200">
              <SmartImage
                src="https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=1400&q=85"
                alt="Mosque at dusk — Masjid Al-Ummah, Oshawa, Ontario"
              />
            </div>
            <figcaption className="mt-2 flex items-baseline justify-between text-xs text-muted">
              <span>Masjid Al-Ummah community · Oshawa, Ontario</span>
              <span className="tabular-nums">2024</span>
            </figcaption>
          </figure>

          {/* Content */}
          <div>
            <p className="text-[15px] text-ink leading-relaxed font-medium">
              Incorporated in 2013 as an Ontario non-profit, Ummah Foundation of
              Durham serves the religious, social, and economic needs of Durham
              Region&apos;s Muslim community — across ethnic and theological
              backgrounds.
            </p>

            <p className="mt-5 text-[15px] text-muted leading-relaxed">
              Our scope includes necessary religious services, building a masjid for
              that purpose, creating harmony among Muslims, and promoting interfaith
              relationships — the neighbourly service the Prophet{" "}
              <span className="font-arabic text-islamic-700 text-base">ﷺ</span>{" "}
              asked us for.
            </p>

            <p className="mt-5 text-sm leading-relaxed font-semibold text-ink">
              Building the first Green Mosque in North America on six paid-off acres
              in Oshawa, Insha&apos;Allah.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/donate"
                className="inline-flex items-center bg-islamic-500 hover:bg-islamic-600 text-white text-[15px] font-semibold px-5 py-2.5 rounded transition-colors"
              >
                Support the Masjid
              </Link>
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center gap-2 text-[15px] text-islamic-600 hover:text-islamic-700 transition-colors"
              >
                <Mail className="h-4 w-4" />
                {contact.email}
              </a>
            </div>

            {/* Key facts row */}
            <div className="mt-8 pt-6 border-t border-gray-200 grid grid-cols-3 gap-4 text-center">
              {[
                { value: "2013", label: "Established" },
                { value: "6 acres", label: "Land owned" },
                { value: "14+ yrs", label: "Serving Durham" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-lg font-bold text-islamic-600 tabular-nums">{stat.value}</p>
                  <p className="text-xs text-muted mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
