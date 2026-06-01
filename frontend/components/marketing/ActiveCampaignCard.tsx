"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { campaigns } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";

const campaign = campaigns[0];

// ─── Brand tokens ─────────────────────────────────────────────
const MAROON = "#4E0C17";
const GREEN  = "#1F7E3A";

export function ActiveCampaignCard() {
  const soldPct   = Math.round((campaign.soldUnits / campaign.targetUnits) * 100);
  const leftUnits = campaign.targetUnits - campaign.soldUnits;

  return (
    <section
      aria-label="Active Campaign"
      className="py-12 px-6 sm:px-8 border-b border-gray-200/50"
      style={{ background: "#F4F9F5" }}
    >
      <div
        className="max-w-6xl mx-auto rounded-2xl overflow-hidden flex flex-col md:flex-row items-stretch bg-white shadow-[0_8px_30px_rgba(0,0,0,0.02)]"
        style={{ border: `2px solid ${GREEN}15` }}
      >
        {/* Left accent bar */}
        <div className="w-2.5 flex-shrink-0 md:block hidden" style={{ background: GREEN }} />

        <div className="flex-1 p-6 sm:p-8 flex flex-col gap-5">
          <SectionEyebrow className="text-gold-600" diamondClassName="text-gold-550 mr-2">
            Active Campaign
          </SectionEyebrow>

          <h2 className="text-xl sm:text-2xl font-bold font-sans" style={{ color: MAROON }}>
            Buy a Musalla — Help Build Masjid Al-Ummah
          </h2>
          <p className="text-sm text-muted max-w-xl font-medium leading-relaxed">
            {campaign.tagline}
          </p>

          {/* Progress */}
          <div className="max-w-3xl">
            <div className="flex justify-between text-xs text-gray-500 mb-2 font-sans font-semibold">
              <span>
                <strong style={{ color: GREEN }}>{campaign.soldUnits}</strong> musallas secured
              </span>
              <span style={{ color: GREEN }}>{soldPct}% complete</span>
              <span>
                <strong>{leftUnits}</strong> remaining
              </span>
            </div>
            <div className="h-3 rounded-full overflow-hidden bg-gray-100 border border-gray-200/40">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${soldPct}%`, background: `linear-gradient(90deg, ${GREEN}, #3cb05f)` }}
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-6 mt-2 pt-2 border-t border-gray-100">
            <div className="flex items-center justify-between sm:justify-start gap-2 sm:gap-6 w-full sm:w-auto">
              <div className="text-center min-w-[55px] sm:min-w-[70px]">
                <div className="text-lg sm:text-2xl font-extrabold tabular-nums" style={{ color: GREEN }}>
                  {campaign.soldUnits}
                </div>
                <div className="text-[10px] text-muted font-bold uppercase tracking-wider mt-0.5">Sold</div>
              </div>
              <div className="h-8 w-px bg-gray-200" />
              <div className="text-center min-w-[55px] sm:min-w-[70px]">
                <div className="text-lg sm:text-2xl font-extrabold tabular-nums text-ink">
                  {leftUnits}
                </div>
                <div className="text-[10px] text-muted font-bold uppercase tracking-wider mt-0.5">Left</div>
              </div>
              <div className="h-8 w-px bg-gray-200" />
              <div className="text-center min-w-[75px] sm:min-w-[70px]">
                <div className="text-lg sm:text-2xl font-extrabold tabular-nums" style={{ color: MAROON }}>
                  {formatCurrency(campaign.unitPrice)}
                </div>
                <div className="text-[10px] text-muted font-bold uppercase tracking-wider mt-0.5">Each</div>
              </div>
            </div>

            <Link
              href="/donate"
              className="px-6 py-3 rounded-lg text-sm font-bold text-white flex items-center gap-2 transition-all duration-200 hover:opacity-90 hover:shadow-md bg-[#1F7E3A] hover:bg-[#C9A227]"
            >
              Buy a Musalla · {formatCurrency(campaign.unitPrice)}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
