import { ArrowRight } from "lucide-react";
import { masjidProject } from "@/lib/mock-data";
import { formatCurrency, cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SmartImage } from "@/components/shared/SmartImage";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";

export function MasjidProjectSection() {
  const raised = masjidProject.raised * 100;
  const goal = masjidProject.projectedCost * 100;
  const pct = Math.round((raised / goal) * 100);

  return (
    <section
      id="masjid"
      className="relative overflow-hidden bg-white text-ink py-12 sm:py-16 border-y border-gray-100"
    >
      <div className="container-tight relative">
        <div className="flex items-end justify-between mb-10 pb-4 border-b border-gray-100">
          <div>
            <SectionEyebrow className="text-islamic-600" diamondClassName="text-gold-550 mr-2" underlineWidth="w-[100px]">
              The Masjid Project
            </SectionEyebrow>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-sans text-maroon-500">
              The First Green Mosque in North America
            </h2>
          </div>
        </div>

        <p className="text-muted text-[15px] mb-8 tabular-nums font-semibold">
          Projected build cost: {formatCurrency(goal)}
        </p>

        <p className="mt-8 max-w-2xl text-[15px] text-muted leading-[1.75]">
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
              <figcaption className="mt-5 flex items-baseline justify-between text-xs text-muted">
                <span className="italic">Brick-faced façade · rendering</span>
                <span className="num text-muted/80">2025</span>
              </figcaption>
            </figure>

            {/* Milestones — Timeline format */}
            <div className="mt-14 pt-8 border-t border-gray-100">
              <SectionEyebrow className="text-islamic-600 mb-5" diamondClassName="text-gold-550 mr-2" underlineWidth="w-[100px]">
                Project Milestones
              </SectionEyebrow>
              <div className="relative">
                {/* Horizontal connector line */}
                <div className="absolute top-[18px] left-[16.67%] right-[16.67%] h-[1px] bg-gray-200" />
                
                <div className="grid grid-cols-3 gap-4 relative z-10">
                  {masjidProject.milestones.map((m, i) => {
                    const isUpcoming = m.year === "2026";
                    return (
                      <div key={m.year} className="flex flex-col items-center text-center">
                        {/* Milestone dot on the line */}
                        <div className="relative flex items-center justify-center mb-4">
                          <div 
                            className={cn(
                              "w-9 h-9 rounded-full flex items-center justify-center border font-sans font-bold text-xs tabular-nums transition-all duration-300",
                              isUpcoming 
                                ? "bg-[#947719] border-[#947719] text-white shadow-[0_0_15px_rgba(148,119,25,0.3)] scale-110" 
                                : "bg-white border-islamic-300 text-muted"
                            )}
                          >
                            {m.year}
                          </div>
                          {/* Inner glowing ring for upcoming milestones */}
                          {isUpcoming && (
                            <span className="absolute -inset-0.5 rounded-full bg-[#947719]/20 animate-ping pointer-events-none" />
                          )}
                        </div>

                        {/* Label */}
                        <p className={cn(
                          "text-xs sm:text-[13px] leading-relaxed max-w-[140px] font-semibold",
                          isUpcoming ? "text-islamic-700" : "text-muted"
                        )}>
                          {m.label}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Project detail — progress + features + cta */}
          <div className="lg:col-span-5 lg:pl-8 lg:border-l lg:border-gray-100">
            <p className="text-[16px] text-ink leading-[1.85] max-w-md font-medium">
              The land is paid off. {formatCurrency(raised)} raised toward the
              {" "}{formatCurrency(goal)} build, which will seat 500 men and 350
              women across two storeys.
            </p>

            {/* Progress */}
            <div className="mt-14">
              <div className="flex items-baseline justify-between text-xs text-muted">
                <span>Raised · {formatCurrency(raised)}</span>
                <span className="tabular-nums text-islamic-600 font-bold">{pct}%</span>
              </div>
              <div className="mt-3 h-2 rounded-full overflow-hidden bg-gray-100">
                <div
                  className="h-full rounded-full transition-[width] duration-700"
                  style={{ width: `${pct}%`, background: "linear-gradient(90deg, #1F7E3A, #3cb05f)" }}
                />
              </div>
            </div>

            <div className="mt-14">
              <div className="num text-muted mb-6 font-semibold uppercase tracking-wider text-xs">What we&apos;re building</div>
              <ul className="divide-y divide-gray-100 border-y border-gray-100">
                {masjidProject.features.map((f, i) => (
                  <li
                    key={f}
                    className="flex items-start gap-4 py-4"
                  >
                    <span className="w-7 h-7 rounded-full bg-[#947719]/10 border border-[#947719]/25 text-[#947719] text-xs font-bold font-sans flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                      {i + 1}
                    </span>
                    <span className="text-[15px] text-ink pt-0.5 font-medium">
                      {f}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-14">
              <Button
                variant="default"
                size="lg"
                className="bg-islamic-600 hover:bg-islamic-700 text-white font-bold transition-all duration-200"
              >
                Support the build <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
