import { ArrowRight } from "lucide-react";
import { masjidProject } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SmartImage } from "@/components/shared/SmartImage";
import { SectionHeader } from "@/components/shared/Section";

export function MasjidProjectSection() {
  const raised = masjidProject.raised * 100;
  const goal = masjidProject.projectedCost * 100;
  const pct = Math.round((raised / goal) * 100);

  return (
    <section
      id="masjid"
      className="relative overflow-hidden bg-islamic-800 text-cream py-12 sm:py-16 border-y border-white/10"
    >
      {/* Deep-green painterly background — one technique, nothing more */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-islamic-900 via-islamic-800 to-islamic-700" />

      <div className="container-tight relative">
        <SectionHeader
          label="The Masjid Project"
          title="The First Green Mosque in North America"
          dark
        />

        <p className="text-white/60 text-[15px] mb-8 tabular-nums">
          Projected build cost: {formatCurrency(goal)}
        </p>

        <p className="mt-8 max-w-2xl text-[15px] text-white/65 leading-[1.75]">
          A 35,000 sq ft masjid on six paid-off acres in Oshawa — purpose-built
          around rainwater cisterns, LED lighting with sensors, water-saving
          fixtures, and a storm-water pond. Designed to serve generations.
        </p>

        <div className="grid lg:grid-cols-12 gap-14 lg:gap-20 pt-14 lg:pt-20">
          {/* Cinematic image + milestones */}
          <div className="lg:col-span-7">
            <figure>
              <div className="relative aspect-[16/11] overflow-hidden">
                <SmartImage
                  src="/masjid-render-angle.png"
                  alt="Masjid Al-Ummah — architectural rendering · Oshawa, Ontario"
                />
              </div>
              <figcaption className="mt-5 flex items-baseline justify-between text-xs text-white/50">
                <span className="italic">Brick-faced façade · rendering</span>
                <span className="num text-white/40">2025</span>
              </figcaption>
            </figure>

            {/* Milestones — single inline sentence */}
            <div className="mt-14 pt-8 border-t border-white/10 text-[13px] uppercase tracking-[0.2em] text-white/55 flex flex-wrap items-center gap-x-3 gap-y-2">
              {masjidProject.milestones.map((m, i) => {
                const last = i === masjidProject.milestones.length - 1;
                return (
                  <span key={m.year} className="inline-flex items-center gap-3">
                    <span className="font-sans font-bold normal-case tracking-normal text-gold-200/90 text-lg tabular-nums">
                      {m.year}
                    </span>
                    <span className="normal-case tracking-normal text-white/65 text-[13px]">
                      {m.label}
                    </span>
                    {!last && <span className="text-white/25 mx-2">·</span>}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Project detail — progress + features + cta */}
          <div className="lg:col-span-5 lg:pl-8 lg:border-l lg:border-white/10">
            <p className="text-[16px] text-cream/75 leading-[1.85] max-w-md">
              The land is paid off. {formatCurrency(raised)} raised toward the
              {" "}{formatCurrency(goal)} build, which will seat 500 men and 350
              women across two storeys.
            </p>

            {/* Progress */}
            <div className="mt-14">
              <div className="flex items-baseline justify-between text-xs text-white/50">
                <span>Raised · {formatCurrency(raised)}</span>
                <span className="tabular-nums text-gold-300">{pct}%</span>
              </div>
              <div className="mt-3 h-2 rounded-full overflow-hidden" style={{ backgroundColor: "rgba(255,255,255,0.12)" }}>
                <div
                  className="h-full rounded-full transition-[width] duration-700"
                  style={{ width: `${pct}%`, background: "linear-gradient(90deg, #C9A227, #F6ECC4)" }}
                />
              </div>
            </div>

            <div className="mt-14">
              <div className="num text-white/40 mb-6">What we&apos;re building</div>
              <ul className="divide-y divide-white/10 border-y border-white/10">
                {masjidProject.features.map((f, i) => (
                  <li
                    key={f}
                    className="grid grid-cols-12 items-baseline py-4 gap-4"
                  >
                    <span className="num col-span-2 text-white/40">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="col-span-10 text-[15px] text-cream/90">
                      {f}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-14">
              <Button variant="gold" size="lg">
                Support the build <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
