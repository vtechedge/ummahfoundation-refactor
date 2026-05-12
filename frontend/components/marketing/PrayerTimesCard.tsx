"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Download, Calendar } from "lucide-react";
import { prayerTimes, gregorianDate, hijriDate } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const ARABIC: Record<string, string> = {
  Fajr:    "فجر",
  Dhuhr:   "ظهر",
  Asr:     "عصر",
  Maghrib: "مغرب",
  Isha:    "عشاء",
  Jummah:  "الجمعة",
};

function getNextIdx(nowMinutes: number, prayers: typeof prayerTimes): number {
  const idx = prayers.findIndex((p) => p.minutes > nowMinutes);
  return idx === -1 ? 0 : idx;
}

// ── Sliding verse data ────────────────────────────────────────────────────────
const VERSES = [
  { arabic: "الصَّلَاةُ عِمَادُ الدِّينِ",                                        en: "Prayer is the pillar of the religion" },
  { arabic: "حَافِظُوا عَلَى الصَّلَوَاتِ وَالصَّلَاةِ الْوُسْطَىٰ",               en: "Guard strictly your prayers — Al-Baqarah 2:238" },
  { arabic: "الصَّلَاةُ خَيْرٌ مِنَ النَّوْمِ",                                   en: "Prayer is better than sleep — Fajr Adhan" },
  { arabic: "إِنَّ الصَّلَاةَ تَنْهَىٰ عَنِ الْفَحْشَاءِ وَالْمُنكَرِ",           en: "Prayer prevents immorality — Al-Ankabut 29:45" },
  { arabic: "وَأَقِيمُوا الصَّلَاةَ وَآتُوا الزَّكَاةَ",                           en: "Establish prayer and give zakah — Al-Baqarah 2:43" },
  { arabic: "إِنَّ الصَّلَاةَ كَانَتْ عَلَى الْمُؤْمِنِينَ كِتَابًا مَوْقُوتًا", en: "Prayer is decreed at specific times — An-Nisa 4:103" },
];

// ── colour helpers (inline styles because arbitrary hover values) ──────────────
function colBg(isNext: boolean, isHovered: boolean, row: "header" | "begins" | "adhan" | "jamat") {
  if (isNext) {
    const nextMap = { header: "#C9A227", begins: "#FBF6E5", adhan: "#FFFBF0", jamat: "#C9A227" };
    return nextMap[row];
  }
  if (isHovered) {
    const hoverMap = { header: "#196631", begins: "#C5E6D1", adhan: "#E8F5EE", jamat: "#196631" };
    return hoverMap[row];
  }
  const defaultMap = { header: "#0D3C1D", begins: "#E8F5EE", adhan: "#FFFFFF", jamat: "#135027" };
  return defaultMap[row];
}

export function PrayerTimesSection() {
  const [now, setNow]           = useState<Date>(() => new Date());
  const [hoveredCol, setHovered] = useState<number | null>(null);

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
    <section
      id="prayer"
      style={{ background: "linear-gradient(160deg, #135027 0%, #1E7A3A 45%, #196631 100%)" }}
    >
      <div className="container-tight py-8 sm:py-10">

        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between gap-4 pb-5 border-b border-white/20"
        >
          {/* Left: title */}
          <div className="flex-shrink-0">
            <p className="font-arabic text-gold-300 text-lg" dir="rtl">أوقات الصلاة</p>
            <h2 className="mt-0.5 text-white text-xl font-bold font-sans">Daily Prayer Times</h2>
          </div>

          {/* Centre: sliding verse marquee — fills the empty space */}
          <div
            className="flex-1 overflow-hidden mx-4 rounded-lg py-2.5 border border-gold-400/20"
            style={{ background: "rgba(201,162,39,0.07)" }}
          >
            <div className="flex items-center animate-marquee whitespace-nowrap hover:[animation-play-state:paused]">
              {[...VERSES, ...VERSES].map((v, i) => (
                <span key={i} className="inline-flex items-center gap-3 flex-shrink-0 px-6">
                  <span className="font-arabic text-gold-200 text-base leading-none" dir="rtl">
                    {v.arabic}
                  </span>
                  <span className="text-gold-400/50">—</span>
                  <span className="text-white/55 text-xs italic font-medium">{v.en}</span>
                  <span className="text-gold-400/25 mx-1">◆</span>
                </span>
              ))}
            </div>
          </div>

          {/* Right: date */}
          <div className="text-right flex-shrink-0">
            <p className="text-white/75 text-sm">{gregorianDate}</p>
            <p className="text-gold-300 text-xs mt-0.5">{hijriDate}</p>
          </div>
        </motion.div>

        {/* ══ DESKTOP: animated coloured table ══ */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="hidden md:block mt-6 rounded-xl overflow-hidden border-2 border-white/30 shadow-2xl"
        >
          <table className="w-full border-collapse">

            {/* ── Header ── */}
            <thead>
              <tr>
                <th className="w-24 px-4 py-5 text-left" style={{ backgroundColor: "#0D3C1D" }}>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/30">Prayer</span>
                </th>

                {displayPrayers.map((p, i) => {
                  const isNext    = i === nextIdx;
                  const isHovered = hoveredCol === i;
                  return (
                    <motion.th
                      key={p.name}
                      scope="col"
                      initial={{ opacity: 0, y: -20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.25 + i * 0.08 }}
                      onMouseEnter={() => setHovered(i)}
                      onMouseLeave={() => setHovered(null)}
                      className="px-4 py-5 text-center border-l-2 border-white/30 cursor-default"
                      style={{
                        backgroundColor: colBg(isNext, isHovered, "header"),
                        transition: "background-color 0.25s ease",
                      }}
                    >
                      <p className={cn("font-arabic text-2xl leading-none", isNext ? "text-ink" : "text-gold-300")} dir="rtl">
                        {ARABIC[p.name]}
                      </p>
                      <p className={cn("font-bold text-sm uppercase tracking-widest mt-2", isNext ? "text-ink" : "text-white")}>
                        {p.name}
                      </p>
                      {isNext && (
                        <span className="mt-1.5 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-ink/80">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ink/60 opacity-75" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-ink/80" />
                          </span>
                          Next
                        </span>
                      )}
                    </motion.th>
                  );
                })}

                {/* Jummah header */}
                <th
                  scope="col"
                  className="px-4 py-5 text-center border-l-4 border-gold-400 w-[160px]"
                  style={{ backgroundColor: "#3d2e0a" }}
                >
                  <p className="font-arabic text-gold-300 text-2xl leading-none" dir="rtl">{ARABIC["Jummah"]}</p>
                  <p className="font-bold text-sm uppercase tracking-widest mt-2 text-gold-300">Jumu&apos;ah</p>
                  <p className="text-gold-500/70 text-[10px] mt-1">Every Friday</p>
                </th>
              </tr>
            </thead>

            <tbody>
              {/* ── Begins row ── */}
              <motion.tr
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.5 }}
              >
                <td className="px-4 py-4 border-t-2 border-white/40" style={{ backgroundColor: "#E8F5EE" }}>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-islamic-600">Begins</span>
                </td>
                {displayPrayers.map((p, i) => {
                  const isNext = i === nextIdx;
                  const isHov  = hoveredCol === i;
                  return (
                    <td
                      key={p.name}
                      className="px-4 py-4 text-center border-t-2 border-l-2 border-[#8ec9aa]"
                      onMouseEnter={() => setHovered(i)}
                      onMouseLeave={() => setHovered(null)}
                      style={{ backgroundColor: colBg(isNext, isHov, "begins"), transition: "background-color 0.25s ease" }}
                    >
                      <motion.p
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.15 }}
                        className={cn("text-base font-semibold tabular-nums", isNext ? "text-gold-700" : "text-islamic-800")}
                      >
                        {p.begins}
                      </motion.p>
                    </td>
                  );
                })}
                <td className="px-4 py-4 text-center border-t-2 border-l-4 border-gold-400" style={{ backgroundColor: "#FBF6E5" }}>
                  <p className="text-[9px] font-bold text-gold-500 uppercase tracking-widest mb-0.5">Khutbah</p>
                  <p className="text-base font-semibold tabular-nums text-gold-700">{jummah.begins}</p>
                </td>
              </motion.tr>

              {/* ── Adhan row ── */}
              <motion.tr
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.6 }}
              >
                <td className="px-4 py-4 border-t-2 border-gray-400 bg-white">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-muted">Adhan</span>
                </td>
                {displayPrayers.map((p, i) => {
                  const isNext = i === nextIdx;
                  const isHov  = hoveredCol === i;
                  return (
                    <td
                      key={p.name}
                      className="px-4 py-4 text-center border-t-2 border-l-2 border-gray-300"
                      onMouseEnter={() => setHovered(i)}
                      onMouseLeave={() => setHovered(null)}
                      style={{ backgroundColor: colBg(isNext, isHov, "adhan"), transition: "background-color 0.25s ease" }}
                    >
                      <motion.p
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.15 }}
                        className={cn("text-base font-semibold tabular-nums", isNext ? "text-gold-700" : "text-ink")}
                      >
                        {p.adhan ?? "—"}
                      </motion.p>
                    </td>
                  );
                })}
                <td className="px-4 py-4 text-center border-t-2 border-l-4 border-gold-400 bg-white">
                  <p className="text-[9px] font-bold text-gold-500 uppercase tracking-widest mb-0.5">Iqamah</p>
                  <p className="text-base font-semibold tabular-nums text-gold-700">{jummah.adhan}</p>
                </td>
              </motion.tr>

              {/* ── Jamat row ── */}
              <motion.tr
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.7 }}
              >
                <td className="px-4 py-5 border-t-2 border-white/40" style={{ backgroundColor: "#135027" }}>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gold-300">Jamat</span>
                </td>
                {displayPrayers.map((p, i) => {
                  const isNext = i === nextIdx;
                  const isHov  = hoveredCol === i;
                  return (
                    <td
                      key={p.name}
                      className="px-4 py-5 text-center border-t-2 border-l-2 border-white/30"
                      onMouseEnter={() => setHovered(i)}
                      onMouseLeave={() => setHovered(null)}
                      style={{ backgroundColor: colBg(isNext, isHov, "jamat"), transition: "background-color 0.25s ease" }}
                    >
                      <motion.p
                        whileHover={{ scale: 1.12 }}
                        transition={{ duration: 0.15 }}
                        className={cn("text-xl font-bold tabular-nums", isNext ? "text-ink" : "text-white")}
                      >
                        {p.jamat ?? "—"}
                      </motion.p>
                    </td>
                  );
                })}
                <td className="px-4 py-5 text-center border-t-2 border-l-4 border-gold-400" style={{ backgroundColor: "#3d2e0a" }}>
                  <p className="text-xl font-bold tabular-nums text-gold-300/40">—</p>
                </td>
              </motion.tr>
            </tbody>
          </table>
        </motion.div>

        {/* ══ MOBILE: stacked cards ══ */}
        <div className="md:hidden mt-4 space-y-2">
          {displayPrayers.map((p, i) => {
            const isNext = i === nextIdx;
            return (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className={cn("rounded-xl overflow-hidden border", isNext ? "border-gold-400" : "border-white/15")}
              >
                <div className="px-4 py-3 flex items-center justify-between"
                  style={{ backgroundColor: isNext ? "#C9A227" : "#0D3C1D" }}>
                  <div className="flex items-center gap-2.5">
                    <span className={cn("font-arabic text-lg leading-none", isNext ? "text-ink" : "text-gold-300")} dir="rtl">
                      {ARABIC[p.name]}
                    </span>
                    <p className={cn("font-bold text-sm", isNext ? "text-ink" : "text-white")}>{p.name}</p>
                    {isNext && <span className="text-[10px] text-ink/70 font-bold">● NEXT</span>}
                  </div>
                  <p className={cn("font-bold text-lg tabular-nums", isNext ? "text-ink" : "text-white")}>
                    {p.jamat ?? p.begins}
                  </p>
                </div>
                <div className="grid grid-cols-3 divide-x divide-gray-200 bg-white">
                  <div className="px-3 py-2.5 text-center">
                    <p className="text-[9px] font-bold text-muted uppercase tracking-widest">Begins</p>
                    <p className="text-sm font-semibold text-ink tabular-nums mt-0.5">{p.begins}</p>
                  </div>
                  <div className="px-3 py-2.5 text-center">
                    <p className="text-[9px] font-bold text-muted uppercase tracking-widest">Adhan</p>
                    <p className="text-sm font-semibold text-ink tabular-nums mt-0.5">{p.adhan ?? "—"}</p>
                  </div>
                  <div className="px-3 py-2.5 text-center" style={{ backgroundColor: "#135027" }}>
                    <p className="text-[9px] font-bold text-gold-300 uppercase tracking-widest">Jamat</p>
                    <p className="text-sm font-bold text-white tabular-nums mt-0.5">{p.jamat ?? "—"}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="rounded-xl overflow-hidden border-2 border-gold-400"
          >
            <div className="px-4 py-3 flex items-center justify-between" style={{ backgroundColor: "#3d2e0a" }}>
              <div className="flex items-center gap-2.5">
                <span className="font-arabic text-gold-300 text-lg leading-none" dir="rtl">{ARABIC["Jummah"]}</span>
                <p className="font-bold text-sm text-gold-300">Jumu&apos;ah — Every Friday</p>
              </div>
              <p className="font-bold text-lg tabular-nums text-gold-300">{jummah.adhan}</p>
            </div>
            <div className="grid grid-cols-2 divide-x divide-gold-200" style={{ backgroundColor: "#FBF6E5" }}>
              <div className="px-3 py-2.5 text-center">
                <p className="text-[9px] font-bold text-gold-500 uppercase tracking-widest">Khutbah</p>
                <p className="text-sm font-semibold text-gold-700 tabular-nums mt-0.5">{jummah.begins}</p>
              </div>
              <div className="px-3 py-2.5 text-center">
                <p className="text-[9px] font-bold text-gold-500 uppercase tracking-widest">Iqamah</p>
                <p className="text-sm font-semibold text-gold-700 tabular-nums mt-0.5">{jummah.adhan}</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Footer ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-5 pt-4 border-t border-white/20 flex flex-wrap items-center justify-between gap-4"
        >
          <a href="#" className="flex items-center gap-2 text-white/65 hover:text-white text-sm transition-colors">
            <Download className="h-4 w-4 flex-shrink-0" />
            Download Prayer Timetable PDF
          </a>
          <Link href="/prayer-times" className="flex items-center gap-2 text-gold-300 hover:text-gold-200 text-sm font-medium transition-colors">
            <Calendar className="h-4 w-4 flex-shrink-0" />
            View Full Month Calendar
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
