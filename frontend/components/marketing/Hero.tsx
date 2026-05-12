"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { useState } from "react";
import { campaigns } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";

const SLIDES = [
  {
    src: "/masjid-render-front.png",
    alt: "Masjid Al-Ummah — architectural rendering, front view · Oshawa, Ontario",
  },
  {
    src: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=1920&q=90",
    alt: "Prophet's Mosque — Madinah al-Munawwarah at golden hour",
  },
  {
    src: "/masjid-render-angle.png",
    alt: "Masjid Al-Ummah — architectural rendering, aerial view · Oshawa, Ontario",
  },
  {
    src: "https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=1920&q=85",
    alt: "Grand mosque architecture at dusk — golden light on minarets",
  },
];

const musalla = campaigns[0];

export function Hero() {
  const [slide, setSlide] = useState(0);

  const soldPct   = Math.round((musalla.soldUnits / musalla.targetUnits) * 100);
  const leftUnits = musalla.targetUnits - musalla.soldUnits;

  return (
    <section aria-label="Ummah Foundation of Durham" className="flex flex-col lg:flex-row">

      {/* Left: manual-only slideshow — no auto-play */}
      <div className="relative flex-none w-full h-[300px] sm:h-[440px] lg:w-[60%] lg:h-[700px] bg-[#0a2e1e] overflow-hidden">
        {SLIDES.map((s, i) => (
          <Image
            key={s.src}
            src={s.src}
            alt={s.alt}
            fill
            priority={i === 0}
            className={`object-cover object-center transition-opacity duration-700 ease-in-out ${
              i === slide ? "opacity-100" : "opacity-0"
            }`}
            sizes="(max-width: 1024px) 100vw, 60vw"
          />
        ))}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent 45%, rgba(4,16,10,0.75) 100%)" }}
        />
        <div className="absolute bottom-10 left-5 flex items-center gap-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setSlide(i)}
              aria-label={`View slide ${i + 1}`}
              className={`rounded-full transition-all duration-300 ease-out ${
                i === slide ? "w-5 h-[5px] bg-gold-300" : "w-[5px] h-[5px] bg-white/35 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
        <div className="absolute bottom-4 left-5 flex items-center gap-1.5 text-white/55 text-xs font-medium">
          <MapPin className="h-3 w-3 text-gold-300/70" />
          Masjid Al-Ummah · Oshawa, Ontario
        </div>
      </div>

      {/* Right: content panel */}
      <div
        className="flex-1 flex flex-col px-7 sm:px-9 lg:px-10 py-6 lg:py-8"
        style={{ backgroundColor: "#FAFAF7" }}
      >
        {/* Eyebrow */}
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-islamic-600 mb-2">
          <span className="text-gold-400 mr-2">◆</span>
          Masjid Al-Ummah · Durham Region, ON
        </p>

        {/* Headline */}
        <h1
          className="font-sans font-bold text-maroon-500 leading-[1.15] mb-2"
          style={{ fontSize: "clamp(1.5rem, 2.8vw, 2rem)" }}
        >
          A home for prayer,{" "}
          <span className="text-islamic-600">learning,</span>
          {" "}and service.
        </h1>

        {/* Description */}
        <div className="mt-2 mb-4">
          <p className="text-sm text-muted leading-relaxed mb-3">
            Ummah Foundation of Durham serves the Muslim community of Durham Region —
            building the first Green Mosque in North America on six paid-off acres in Oshawa.
          </p>
          <Link
            href="/donate"
            className="group relative self-start inline-flex items-center gap-1.5 overflow-hidden text-sm font-semibold px-5 py-2 rounded-sm"
            style={{ border: "1.5px solid #C9A227", color: "#A5851C" }}
          >
            <span
              className="absolute inset-0 translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-300 ease-out"
              style={{ background: "#C9A227" }}
              aria-hidden
            />
            <span className="relative group-hover:text-ink transition-colors duration-150 delay-75">Donate Now</span>
            <ArrowRight className="relative h-3.5 w-3.5 group-hover:text-ink group-hover:translate-x-0.5 transition-all duration-150 delay-75" />
          </Link>
        </div>

        {/* Campaign card */}
        <div className="mt-2 flex-1 flex flex-col rounded-lg overflow-hidden border border-islamic-200 shadow-sm">

          {/* Green header */}
          <div className="bg-islamic-600 px-5 py-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-gold-300 mb-1">
              <span className="mr-1.5">◆</span>Active Campaign
            </p>
            <h2 className="font-sans font-bold text-white text-base leading-snug">
              Buy a Musalla — Help Build Masjid Al-Ummah
            </h2>
            <p className="text-[12px] text-white/65 mt-1 leading-snug line-clamp-2">
              {musalla.tagline}
            </p>
          </div>

          {/* Card body */}
          <div className="bg-white px-5 py-4 flex-1 flex flex-col justify-between">

            <div>
              <div className="mb-3">
                <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
                  <span className="text-gold-600 tabular-nums">{musalla.soldUnits} of {musalla.targetUnits} musallas</span>
                  <span className="text-islamic-600">{soldPct}% complete</span>
                </div>
                <div className="h-2.5 rounded-full overflow-hidden bg-gray-100">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${soldPct}%`, background: "linear-gradient(90deg, #C9A227, #F6ECC4)" }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-muted mt-1">
                  <span>{musalla.soldUnits} secured</span>
                  <span>{leftUnits} remaining</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="text-center bg-gold-50 border border-gold-200 rounded py-2">
                  <p className="text-sm font-bold text-gold-600 tabular-nums">{musalla.soldUnits}</p>
                  <p className="text-[10px] text-muted mt-0.5 uppercase tracking-wide">Sold</p>
                </div>
                <div className="text-center bg-gray-50 border border-gray-200 rounded py-2">
                  <p className="text-sm font-bold text-ink/60 tabular-nums">{leftUnits}</p>
                  <p className="text-[10px] text-muted mt-0.5 uppercase tracking-wide">Left</p>
                </div>
                <div className="text-center bg-islamic-50 border border-islamic-200 rounded py-2">
                  <p className="text-sm font-bold text-islamic-700 tabular-nums">{formatCurrency(musalla.unitPrice)}</p>
                  <p className="text-[10px] text-muted mt-0.5 uppercase tracking-wide">Each</p>
                </div>
              </div>
            </div>

            <div className="pt-3">
              <Link
                href="/donate"
                className="group flex items-center justify-center gap-2 bg-islamic-600 hover:bg-islamic-700 text-white font-bold py-3 rounded text-sm transition-all duration-200 hover:shadow-[0_5px_20px_rgba(30,122,58,0.38)]"
              >
                Buy a Musalla · {formatCurrency(musalla.unitPrice)}
                <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform duration-200" />
              </Link>
              <p className="mt-2 text-center text-[10px] text-muted/60">
                CRA tax receipts issued · Registered charity · Since 2013
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
