"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { useState, useEffect } from "react";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";

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

export function Hero() {
  const [slide, setSlide] = useState(0);

  // Auto transition slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setSlide((prev) => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col w-full">
      {/* Slideshow outer section - now full width */}
      <section
        aria-label="Ummah Foundation of Durham"
        className="relative w-full h-[480px] sm:h-[500px] lg:h-[650px] bg-[#0a2e1e] overflow-hidden"
      >
        {SLIDES.map((s, i) => (
          <Image
            key={s.src}
            src={s.src}
            alt={s.alt}
            fill
            priority={i === 0}
            className={`object-cover object-center transition-opacity duration-700 ease-in-out ${i === slide ? "opacity-100" : "opacity-0"
              }`}
            sizes="100vw"
          />
        ))}

        {/* Overlay gradient above images with custom multi-brand colors */}
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{ background: "linear-gradient(120deg, rgba(78,12,23,0.88) 0%, rgba(31,126,58,0.55) 60%, rgba(0,0,0,0.3) 100%)" }}
        />

        {/* Overlaid content panel above the image overlay */}

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-4 md:py-12 sm:py-20 flex flex-col gap-2 md:gap-4 sm:gap-6 justify-center min-h-[380px] sm:min-h-[450px] lg:min-h-[560px]">
          <SectionEyebrow className="text-white/60">
            Masjid Al-Ummah · Durham Region, ON
          </SectionEyebrow>
          <h1
            className="text-white leading-tight max-w-2xl"
            style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)", fontWeight: 700 }}
          >
            A home for prayer,<br />
            <span style={{ color: "#7ED9A0" }}>learning,</span> and service.
          </h1>
          <p className="text-white/75 max-w-md text-sm sm:text-base leading-relaxed" style={{ fontFamily: "sans-serif" }}>
            Ummah Foundation of Durham serves the Muslim community of Durham Region — building the first Green Mosque in North America on six paid-off acres in Oshawa.
          </p>
          <div className="flex flex-wrap gap-3 mt-2">
            <Link
              href="/donate"
              className="inline-flex items-center gap-2 px-7 py-3 rounded font-semibold text-sm text-white transition-all bg-[#1F7E3A] hover:bg-[#C9A227]"
            >
              Donate Now →
            </Link>
          </div>
        </div>

        {/* Manual Slideshow Navigation controls */}
        <div className="absolute bottom-12 left-5 flex items-center gap-2 z-20">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setSlide(i)}
              aria-label={`View slide ${i + 1}`}
              className={`rounded-full transition-all duration-300 ease-out ${i === slide ? "w-5 h-[5px] bg-gold-300" : "w-[5px] h-[5px] bg-white/35 hover:bg-white/60"
                }`}
            />
          ))}
        </div>

        {/* Location Info Badge */}
        <div className="absolute bottom-5 left-5 flex items-center gap-1.5 text-white/55 text-xs font-medium z-20">
          <MapPin className="h-3 w-3 text-gold-300/70" />
          Masjid Al-Ummah · Oshawa, Ontario
        </div>
      </section>
    </div>
  );
}
