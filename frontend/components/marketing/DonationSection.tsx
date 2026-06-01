"use client";

// Donation — emotional centrepiece.
// Hadith opens on rich green. Campaign: image is purely decorative top half,
// all stats sit on solid green (always readable). Form on warm ivory.
// No decorative lines anywhere.

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Receipt, Users } from "lucide-react";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { campaigns, CHARITY_BN } from "@/lib/mock-data";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { cn } from "@/lib/utils";

const CATEGORIES = ["Zakat", "Sadaqah", "Mosque Fund", "General"] as const;
type Category = (typeof CATEGORIES)[number];
const PRESETS = [50, 100, 250, 500, 1_000] as const;

const SLIDES = [
  {
    src: "/masjid-render-front.png",
    alt: "Masjid Al-Ummah — architectural rendering, front view · Oshawa, Ontario",
  },
  {
    src: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1920&q=85",
    alt: "Grand mosque architecture — marble courtyard and minarets",
  },
  {
    src: "/masjid-render-angle.png",
    alt: "Masjid Al-Ummah — architectural rendering, aerial view · Oshawa, Ontario",
  },
];

export function DonationSection() {
  const campaign = campaigns[0];
  const pct = Math.min(100, Math.round((campaign.raisedAmount / campaign.goalAmount) * 100));

  const [category, setCategory] = useState<Category>("Mosque Fund");
  const [preset, setPreset] = useState<number | null>(100);
  const [custom, setCustom] = useState("");
  const [monthly, setMonthly] = useState(false);
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % SLIDES.length), 4_500);
    return () => clearInterval(t);
  }, []);

  const displayAmount = custom ? `$${custom}` : preset ? formatCurrency(preset * 100) : "—";

  return (
    <section id="donate">

      {/* ══ Hadith opening — spiritual context before the ask ══ */}
      <div
        className="relative overflow-hidden px-6 sm:px-10 py-14 sm:py-16 text-center border-b border-white/10"
        style={{ background: "#4E0C17" }}
      >
        {/* Subtle repeating star pattern */}
        <div
          aria-hidden className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, #C9A227 1.5px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
        {/* Soft gold radial glow */}
        <div
          aria-hidden className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)",
            backgroundSize: "20px 20px",
          }}
        />

        <div className="relative container-tight">
          <SectionEyebrow className="text-gold-300/80">
            Sahih Muslim 533
          </SectionEyebrow>

          {/* Arabic — glowing gold, large and readable */}
          <p
            dir="rtl"
            className="font-arabic text-gold-200 font-bold leading-[1.8] mb-5"
            style={{ fontSize: "clamp(1.4rem, 3.8vw, 2.6rem)" }}
          >
            مَنْ بَنَىٰ مَسْجِدًا لِلَّهِ بَنَى اللَّهُ لَهُ بَيْتًا فِي الْجَنَّةِ
          </p>

          <p className="font-sans italic text-white/90 text-base sm:text-lg max-w-lg mx-auto leading-relaxed font-semibold">
            &ldquo;Whoever builds a masjid for Allah, Allah will build for him a house in Paradise.&rdquo;
          </p>
          <p className="mt-2 text-sm text-white/50 font-medium">— The Prophet Muhammad ﷺ</p>

          {/* Trust signals */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2.5 text-xs text-white/70 font-semibold">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-gold-300/70" />
              Registered Charity · BN: {CHARITY_BN}
            </span>
            <span className="flex items-center gap-1.5">
              <Receipt className="h-4 w-4 text-gold-300/70" />
              CRA-approved tax receipts
            </span>
            <span className="flex items-center gap-1.5">
              <Users className="h-4 w-4 text-gold-300/70" />
              {campaign.donors}+ donors · since 2011
            </span>
          </div>
        </div>
      </div>

      {/* ══ Slider + Form ══ */}
      <div className="grid lg:grid-cols-[3fr_2fr]">

        {/* ── Left: full-height auto-sliding image panel with campaign overlay ── */}
        <div className="relative overflow-hidden min-h-[420px] lg:min-h-[600px]" style={{ backgroundColor: "#FAFAF7" }}>

          {/* Slide images */}
          {SLIDES.map((s, i) => (
            <div
              key={s.src}
              className="absolute inset-0 transition-opacity duration-700 ease-in-out"
              style={{ opacity: i === slide ? 1 : 0 }}
            >
              <Image
                src={s.src}
                alt={s.alt}
                fill
                priority={i === 0}
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
            </div>
          ))}

          {/* Dot indicators — bottom centre */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setSlide(i)}
                aria-label={`Slide ${i + 1}`}
                className={cn(
                  "rounded-full transition-all duration-300",
                  i === slide ? "w-6 h-2 bg-gold-400 shadow-sm" : "w-2 h-2 bg-white/60 hover:bg-white/95 shadow-sm"
                )}
              />
            ))}
          </div>
        </div>

        {/* Donation form — warm ivory, clean */}
        <div
          id="donate-form"
          className="flex flex-col justify-center px-8 sm:px-10 py-10 border-t-[2px] border-gold-400/40"
          style={{ backgroundColor: "#FAFAF7" }}
        >
          <SectionEyebrow className="text-islamic-600">
            Give today
          </SectionEyebrow>
          <h3 className="font-sans font-semibold text-xl text-ink mb-7">Make your donation</h3>

          {/* Category */}
          <div className="mb-5">
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted mb-2">Donation type</p>
            <div className="grid grid-cols-2 gap-1.5">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={cn(
                    "py-2 text-xs font-semibold rounded-lg border transition-colors duration-200",
                    category === cat
                      ? "bg-[#1F7E3A] border-[#1F7E3A] text-white hover:bg-[#C9A227] hover:border-[#C9A227]"
                      : "bg-white text-ink/70 border-gray-200 hover:border-[#C9A227] hover:bg-[#C9A227] hover:text-white"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Presets */}
          <div className="mb-5">
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted mb-2">Select amount</p>
            <div className="grid grid-cols-3 gap-1.5">
              {PRESETS.map((amt) => (
                <button
                  key={amt}
                  onClick={() => { setPreset(amt); setCustom(""); }}
                  className={cn(
                    "py-2 text-sm font-bold rounded-lg border transition-colors duration-200",
                    preset === amt && !custom
                      ? "bg-[#1F7E3A] border-[#1F7E3A] text-white hover:bg-[#C9A227] hover:border-[#C9A227]"
                      : "bg-white text-ink border-gray-200 hover:border-[#C9A227] hover:bg-[#C9A227] hover:text-white"
                  )}
                >
                  {formatCurrency(amt * 100)}
                </button>
              ))}
              <button
                onClick={() => setPreset(null)}
                className={cn(
                  "py-2 text-sm font-bold rounded-lg border transition-colors duration-200",
                  !preset || custom
                    ? "bg-[#1F7E3A] border-[#1F7E3A] text-white hover:bg-[#C9A227] hover:border-[#C9A227]"
                    : "bg-white text-ink border-gray-200 hover:border-[#C9A227] hover:bg-[#C9A227] hover:text-white"
                )}
              >
                Custom
              </button>
            </div>
            {(!preset || custom !== "") && (
              <div className="mt-2 relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted text-sm font-semibold">$</span>
                <input
                  type="number" min="1" placeholder="Enter amount" value={custom}
                  onChange={(e) => { setCustom(e.target.value); setPreset(null); }}
                  className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-islamic-500"
                />
              </div>
            )}
          </div>

          {/* Monthly toggle */}
          <label className="flex items-center gap-3 mb-6 cursor-pointer">
            <div
              className={cn("relative w-9 h-5 rounded-full transition-colors", monthly ? "bg-islamic-600" : "bg-gray-300")}
              onClick={() => setMonthly((v) => !v)}
            >
              <div className={cn("absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform", monthly ? "translate-x-4" : "translate-x-0.5")} />
            </div>
            <span className="text-sm text-ink/75">Make this a monthly pledge</span>
          </label>

          <button
            className="w-full bg-[#1F7E3A] hover:bg-[#C9A227] text-white font-bold py-3.5 rounded-lg text-sm transition-all duration-200 hover:shadow-md"
          >
            Donate {displayAmount} · {category}
          </button>
          <p className="mt-3 text-center text-[10px] text-muted/60">
            Secure · Tax receipt by email · BN: {CHARITY_BN}
          </p>
        </div>
      </div>
    </section>
  );
}
