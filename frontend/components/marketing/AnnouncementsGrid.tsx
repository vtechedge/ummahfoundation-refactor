"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Bell, Newspaper, CalendarDays } from "lucide-react";
import type { Announcement, EventItem } from "@/lib/mock-data";

// ── helpers ───────────────────────────────────────────────────────────────────

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric", month: "short", year: "numeric",
  }).toUpperCase();
}

function fmtEventDate(iso: string) {
  const d = new Date(iso);
  return {
    day:   d.getDate(),
    month: d.toLocaleDateString("en", { month: "short" }).toUpperCase(),
  };
}

const TAG_COLORS: Record<string, string> = {
  Eid:         "bg-gold-100 text-gold-700",
  Zakat:       "bg-gold-100 text-gold-700",
  Jummah:      "bg-islamic-100 text-islamic-700",
  Education:   "bg-islamic-100 text-islamic-700",
  Community:   "bg-blue-50 text-blue-700",
  Lecture:     "bg-purple-50 text-purple-700",
  Youth:       "bg-green-50 text-green-700",
  Celebration: "bg-gold-100 text-gold-700",
};

function TagBadge({ tag }: { tag: string }) {
  return (
    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${TAG_COLORS[tag] ?? "bg-gray-100 text-gray-600"}`}>
      {tag}
    </span>
  );
}

// ── shared card motion props ──────────────────────────────────────────────────

function cardMotion(delay: number, glowColor = "rgba(0,0,0,0.18)") {
  return {
    initial:    { opacity: 0, y: 28 },
    whileInView:{ opacity: 1, y: 0 },
    viewport:   { once: true as const, margin: "-40px" },
    transition: { duration: 0.48, delay, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] },
    whileHover: { y: -5, boxShadow: `0 16px 40px ${glowColor}` },
    whileTap:   { scale: 0.975 },
  };
}

// ── props ─────────────────────────────────────────────────────────────────────

type Props = {
  notices:        Announcement[];
  updates:        Announcement[];
  upcomingEvents: EventItem[];
};

// ── component ─────────────────────────────────────────────────────────────────

export function AnnouncementsGrid({ notices, updates, upcomingEvents }: Props) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">

      {/* ══ Column 1: Community Notices ══ */}
      <div className="flex flex-col">

        {/* Floating column label */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-2.5 mb-4"
        >
          <div className="h-7 w-7 rounded-lg bg-gold-400/20 text-gold-300 flex items-center justify-center flex-shrink-0">
            <Bell className="h-3.5 w-3.5" />
          </div>
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gold-300/90">Community Notices</h3>
          {notices.length > 0 && (
            <span className="ml-auto bg-gold-400 text-ink text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
              {notices.length}
            </span>
          )}
        </motion.div>

        {/* Cards floating on dark bg */}
        <div className="flex flex-col gap-3 flex-1">
          {notices.length === 0 ? (
            <p className="py-6 text-sm text-white/40 text-center">No urgent notices.</p>
          ) : (
            notices.map((a, i) => (
              <motion.article
                key={a.id}
                {...cardMotion(i * 0.1, "rgba(201,162,39,0.28)")}
                className={`rounded-2xl bg-white p-5 cursor-pointer transition-colors duration-200 hover:bg-gold-50/80 ${
                  i === 0
                    ? "shadow-[0_4px_24px_rgba(201,162,39,0.22)] ring-1 ring-gold-300/40"
                    : "shadow-[0_4px_20px_rgba(0,0,0,0.15)]"
                }`}
              >
                {i === 0 && (
                  <span className="inline-flex items-center gap-1 mb-2.5 text-[10px] font-bold uppercase tracking-widest text-gold-700 bg-gold-50 border border-gold-200 px-2.5 py-0.5 rounded-full">
                    ◆ Urgent
                  </span>
                )}
                <div className="flex items-center gap-2 mb-2">
                  <time className="text-xs font-bold text-gold-600 uppercase tracking-wide">{fmtDate(a.date)}</time>
                  <TagBadge tag={a.tag} />
                </div>
                <h4 className="font-bold text-ink text-lg leading-snug mb-1.5">{a.title}</h4>
                <p className="text-[15px] text-muted leading-relaxed line-clamp-2">{a.body}</p>
              </motion.article>
            ))
          )}
        </div>

        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ delay: 0.35 }}
          className="mt-4"
        >
          <Link href="#" className="group inline-flex items-center gap-1 text-[15px] font-semibold text-gold-300/70 hover:text-gold-300 transition-colors">
            All notices
            <span className="inline-block group-hover:translate-x-1.5 transition-transform duration-200">→</span>
          </Link>
        </motion.div>
      </div>

      {/* ══ Column 2: News & Updates ══ */}
      <div className="flex flex-col">

        <motion.div
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex items-center gap-2.5 mb-4"
        >
          <div className="h-7 w-7 rounded-lg bg-white/10 text-white/80 flex items-center justify-center flex-shrink-0">
            <Newspaper className="h-3.5 w-3.5" />
          </div>
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white/80">News &amp; Updates</h3>
          {updates.length > 0 && (
            <span className="ml-auto bg-islamic-400 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
              {updates.length}
            </span>
          )}
        </motion.div>

        <div className="flex flex-col gap-3 flex-1">
          {updates.length === 0 ? (
            <p className="py-6 text-sm text-white/40 text-center">No updates right now.</p>
          ) : (
            updates.map((a, i) => (
              <motion.article
                key={a.id}
                {...cardMotion(0.1 + i * 0.1, "rgba(30,122,58,0.28)")}
                className="rounded-2xl bg-white p-5 cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.15)] hover:bg-islamic-50/60 transition-colors duration-200"
              >
                <div className="flex items-center gap-2 mb-2">
                  <time className="text-xs font-bold text-islamic-600 uppercase tracking-wide">{fmtDate(a.date)}</time>
                  <TagBadge tag={a.tag} />
                </div>
                <h4 className="font-bold text-ink text-lg leading-snug mb-1.5">{a.title}</h4>
                <p className="text-[15px] text-muted leading-relaxed line-clamp-2">{a.body}</p>
              </motion.article>
            ))
          )}
        </div>

        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-4"
        >
          <Link href="#" className="group inline-flex items-center gap-1 text-[15px] font-semibold text-white/50 hover:text-white transition-colors">
            All updates
            <span className="inline-block group-hover:translate-x-1.5 transition-transform duration-200">→</span>
          </Link>
        </motion.div>
      </div>

      {/* ══ Column 3: Events & Programs ══ */}
      <div className="flex flex-col">

        <motion.div
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex items-center gap-2.5 mb-4"
        >
          <div className="h-7 w-7 rounded-lg bg-gold-400/20 text-gold-300 flex items-center justify-center flex-shrink-0">
            <CalendarDays className="h-3.5 w-3.5" />
          </div>
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gold-300/90">Events &amp; Programs</h3>
          <span className="ml-auto bg-gold-400 text-ink text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
            {upcomingEvents.length}
          </span>
        </motion.div>

        <div className="flex flex-col gap-3 flex-1">
          {upcomingEvents.map((ev: EventItem, i) => {
            const { day, month } = fmtEventDate(ev.date);
            return (
              <motion.article
                key={ev.id}
                {...cardMotion(0.2 + i * 0.09, "rgba(30,122,58,0.28)")}
                className="rounded-2xl bg-white p-4 cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.15)] hover:bg-islamic-50/60 transition-colors duration-200 flex items-start gap-3.5"
              >
                {/* Date chip */}
                <div className="flex-shrink-0 bg-islamic-600 rounded-xl text-center w-12 py-2.5 shadow-sm">
                  <p className="text-[9px] font-bold text-gold-300 uppercase tracking-wide leading-none">{month}</p>
                  <p className="text-xl font-bold text-white tabular-nums leading-tight mt-0.5">{day}</p>
                </div>
                {/* Content */}
                <div className="flex-1 min-w-0 pt-0.5">
                  <TagBadge tag={ev.tag} />
                  <h4 className="font-bold text-ink text-lg leading-snug mt-1.5">{ev.title}</h4>
                  <p className="text-sm text-muted mt-0.5 font-medium">{ev.time} · {ev.location}</p>
                </div>
              </motion.article>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-4"
        >
          <Link href="/events" className="group inline-flex items-center gap-1 text-[15px] font-semibold text-gold-300/70 hover:text-gold-300 transition-colors">
            All events
            <span className="inline-block group-hover:translate-x-1.5 transition-transform duration-200">→</span>
          </Link>
        </motion.div>
      </div>

    </div>
  );
}
