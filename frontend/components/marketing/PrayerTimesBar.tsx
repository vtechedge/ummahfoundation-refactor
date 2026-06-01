"use client";

import { useEffect, useMemo, useState } from "react";
import { prayerTimes } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const ARABIC: Record<string, string> = {
  Fajr: "فجر", Dhuhr: "ظهر", Asr: "عصر", Maghrib: "مغرب", Isha: "عشاء", Jummah: "الجمعة",
};

function getNextIdx(nowMinutes: number, prayers: typeof prayerTimes) {
  const idx = prayers.findIndex((p) => p.minutes > nowMinutes);
  return idx === -1 ? 0 : idx;
}

export function PrayerTimesBar() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(t);
  }, []);

  const displayPrayers = useMemo(
    () => prayerTimes.filter((p) => p.name !== "Jummah" && p.name !== "Sunrise"),
    []
  );
  const jummah     = prayerTimes.find((p) => p.name === "Jummah")!;
  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  const nextIdx    = useMemo(() => getNextIdx(nowMinutes, displayPrayers), [nowMinutes, displayPrayers]);

  return (
    /* same dark-green family as the utility bar above, one shade lighter */
    <div className="bg-islamic-800 border-b border-white/10">
      <div className="max-w-screen-xl mx-auto px-3 sm:px-6">
        {/* Mobile: 3-col grid (2 rows of 3). sm+: single flex row */}
        <div className="grid grid-cols-3 gap-1.5 py-2 sm:flex sm:items-stretch sm:gap-2">

          {displayPrayers.map((p, i) => {
            const isNext = i === nextIdx;
            return (
              <div
                key={p.name}
                className={cn(
                  "flex flex-col items-center justify-center rounded-lg py-2 px-1.5 border transition-all duration-200 sm:flex-1",
                  isNext
                    ? "bg-gold-400 border-gold-400 shadow-[0_2px_16px_rgba(201,162,39,0.4)]"
                    : "bg-white/[0.06] border-white/10 hover:bg-white/[0.12] hover:border-white/20"
                )}
              >
                <div className="flex items-center gap-0.5 sm:gap-1 whitespace-nowrap">
                  <span
                    className={cn("font-arabic text-[13px] sm:text-sm leading-none", isNext ? "text-islamic-900" : "text-gold-300")}
                    dir="rtl"
                  >
                    {ARABIC[p.name]}
                  </span>
                  <span className={cn("text-[8px] sm:text-[9px]", isNext ? "text-islamic-800/50" : "text-white/25")}>·</span>
                  <span className={cn("text-[9px] sm:text-[10px] font-bold uppercase tracking-wider", isNext ? "text-islamic-800" : "text-white/60")}>
                    {p.name}
                  </span>
                  {isNext && (
                    <span className="relative flex h-1.5 w-1.5 ml-0.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-islamic-700 opacity-60" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-islamic-800" />
                    </span>
                  )}
                </div>

                <p className={cn(
                  "text-sm sm:text-base font-bold tabular-nums mt-1 leading-none",
                  isNext ? "text-islamic-900" : "text-white"
                )}>
                  {p.jamat ?? p.begins}
                </p>
              </div>
            );
          })}

          {/* Divider — desktop only */}
          <div className="hidden sm:block w-px bg-gold-400/30 flex-shrink-0 self-stretch my-1" />

          {/* Jummah */}
          <div className="flex flex-col items-center justify-center rounded-lg py-2 px-1.5 border border-gold-400/40 bg-gold-400/[0.1] hover:bg-gold-400/[0.16] transition-all duration-200 sm:flex-1">
            <div className="flex items-center gap-0.5 sm:gap-1 whitespace-nowrap">
              <span className="font-arabic text-[13px] sm:text-sm leading-none text-gold-300" dir="rtl">
                {ARABIC["Jummah"]}
              </span>
              <span className="text-[8px] sm:text-[9px] text-gold-400/40">·</span>
              <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-gold-300">
                Jumu&apos;ah
              </span>
            </div>
            <p className="text-sm sm:text-base font-bold tabular-nums mt-1 leading-none text-gold-200">
              {jummah.adhan}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
