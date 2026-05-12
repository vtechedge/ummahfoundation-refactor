"use client";

import { useState } from "react";
import { Topbar } from "@/components/admin/Topbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Upload, Download, Calendar, Save, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Row = {
  date: string;
  hijri: string;
  fajr: string;
  sunrise: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
  jummah?: string;
};

type SaveState = "idle" | "saving" | "saved" | "error";

const initialRows: Row[] = [
  { date: "19 Apr 2026", hijri: "01 Qi'dah 1447", fajr: "5:45", sunrise: "6:26", dhuhr: "1:35", asr: "6:15", maghrib: "8:10", isha: "9:45", jummah: "2:00" },
  { date: "20 Apr 2026", hijri: "02 Qi'dah 1447", fajr: "5:43", sunrise: "6:24", dhuhr: "1:35", asr: "6:16", maghrib: "8:12", isha: "9:47" },
  { date: "21 Apr 2026", hijri: "03 Qi'dah 1447", fajr: "5:41", sunrise: "6:22", dhuhr: "1:35", asr: "6:17", maghrib: "8:13", isha: "9:48" },
  { date: "22 Apr 2026", hijri: "04 Qi'dah 1447", fajr: "5:39", sunrise: "6:21", dhuhr: "1:34", asr: "6:18", maghrib: "8:14", isha: "9:50" },
  { date: "23 Apr 2026", hijri: "05 Qi'dah 1447", fajr: "5:37", sunrise: "6:19", dhuhr: "1:34", asr: "6:19", maghrib: "8:15", isha: "9:51" },
  { date: "24 Apr 2026", hijri: "06 Qi'dah 1447", fajr: "5:36", sunrise: "6:18", dhuhr: "1:34", asr: "6:20", maghrib: "8:16", isha: "9:53" },
  { date: "25 Apr 2026", hijri: "07 Qi'dah 1447", fajr: "5:34", sunrise: "6:16", dhuhr: "1:34", asr: "6:21", maghrib: "8:17", isha: "9:54" },
  { date: "26 Apr 2026", hijri: "08 Qi'dah 1447", fajr: "5:32", sunrise: "6:15", dhuhr: "1:34", asr: "6:22", maghrib: "8:19", isha: "9:56", jummah: "2:00" },
];

const columns: Array<{ key: keyof Row; label: string }> = [
  { key: "fajr", label: "Fajr" },
  { key: "sunrise", label: "Sunrise" },
  { key: "dhuhr", label: "Dhuhr" },
  { key: "asr", label: "Asr" },
  { key: "maghrib", label: "Maghrib" },
  { key: "isha", label: "Isha" },
  { key: "jummah", label: "Jummah" },
];

// Convert "19 Apr 2026" → "2026-04-19" for the API
function toISODate(label: string): string {
  const d = new Date(label);
  if (isNaN(d.getTime())) return label;
  return d.toISOString().slice(0, 10);
}

const BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api/v1";

export default function AdminPrayerTimes() {
  const [rows, setRows] = useState<Row[]>(initialRows);
  const [activeCell, setActiveCell] = useState<string | null>(null);
  const [saveStates, setSaveStates] = useState<Record<string, SaveState>>({});

  const update = (rowIdx: number, key: keyof Row, value: string) => {
    const copy = [...rows];
    copy[rowIdx] = { ...copy[rowIdx], [key]: value };
    setRows(copy);
  };

  const saveRow = async (row: Row) => {
    const isoDate = toISODate(row.date);
    setSaveStates((prev) => ({ ...prev, [row.date]: "saving" }));

    try {
      const body = {
        hijri: row.hijri,
        fajr:    { jamat: row.fajr },
        sunrise: row.sunrise,
        dhuhr:   { jamat: row.dhuhr },
        asr:     { jamat: row.asr },
        maghrib: { jamat: row.maghrib },
        isha:    { jamat: row.isha },
        jummah:  row.jummah ? { iqamah: row.jummah } : undefined,
      };

      const res = await fetch(`${BASE}/prayer-times/${isoDate}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      setSaveStates((prev) => ({
        ...prev,
        [row.date]: res.ok ? "saved" : "error",
      }));

      if (res.ok) {
        setTimeout(() => {
          setSaveStates((prev) => ({ ...prev, [row.date]: "idle" }));
        }, 3000);
      }
    } catch {
      setSaveStates((prev) => ({ ...prev, [row.date]: "error" }));
    }
  };

  return (
    <>
      <Topbar
        title="Prayer Times"
        subtitle="Edit today's and upcoming prayer times. Changes save instantly."
      />

      <div className="p-6 sm:p-8 space-y-6">
        {/* Toolbar */}
        <div className="rounded-2xl bg-white border border-islamic-50 shadow-card p-5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-islamic-100 hover:bg-islamic-50">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="flex items-center gap-2 rounded-xl bg-islamic-50 px-4 h-10 text-sm font-medium text-islamic-700">
              <Calendar className="h-4 w-4" /> April 2026
            </div>
            <button className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-islamic-100 hover:bg-islamic-50">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button variant="ghost" size="sm" className="h-10">
              <Upload className="h-4 w-4" /> Paste from Excel
            </Button>
            <Button variant="ghost" size="sm" className="h-10">
              <Download className="h-4 w-4" /> Export PDF
            </Button>
            <Button variant="primary" size="sm" className="h-10">
              <Plus className="h-4 w-4" /> Add day
            </Button>
          </div>
        </div>

        {/* Spreadsheet */}
        <div className="rounded-2xl bg-white border border-islamic-50 shadow-card overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-islamic-50">
            <div>
              <div className="text-xs uppercase tracking-wider text-muted">Jamat times</div>
              <div className="mt-0.5 font-sans font-medium text-lg">Tab to edit. Click Save to push each row to the API.</div>
            </div>
            <Badge variant="neutral">April 2026</Badge>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-islamic-50/50 text-left sticky top-0">
                <tr>
                  <th className="px-5 py-3 text-xs uppercase tracking-wider font-semibold text-muted w-48">
                    Date
                  </th>
                  <th className="px-3 py-3 text-xs uppercase tracking-wider font-semibold text-muted w-36">
                    Hijri
                  </th>
                  {columns.map((c) => (
                    <th
                      key={c.key}
                      className="px-3 py-3 text-xs uppercase tracking-wider font-semibold text-muted text-center"
                    >
                      {c.label}
                    </th>
                  ))}
                  <th className="px-4 py-3 w-28" />
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => {
                  const state = saveStates[row.date] ?? "idle";
                  return (
                    <tr
                      key={row.date}
                      className={cn(
                        "border-t border-islamic-50 transition",
                        i === 0 ? "bg-gold-50/30" : "hover:bg-islamic-50/40"
                      )}
                    >
                      <td className="px-5 py-2.5">
                        <div className="flex items-center gap-2">
                          {i === 0 && (
                            <span className="h-1.5 w-1.5 rounded-full bg-gold-400 animate-pulse" />
                          )}
                          <span className="font-medium text-ink">{row.date}</span>
                        </div>
                      </td>
                      <td className="px-3 py-2.5 text-muted text-xs">{row.hijri}</td>
                      {columns.map((c) => {
                        const id = `${i}-${c.key}`;
                        const active = activeCell === id;
                        const val = (row[c.key] as string | undefined) ?? "—";
                        return (
                          <td key={c.key} className="px-2 py-1.5">
                            <input
                              value={val === "—" ? "" : val}
                              placeholder="—"
                              onFocus={() => setActiveCell(id)}
                              onBlur={() => setActiveCell(null)}
                              onChange={(e) => update(i, c.key, e.target.value)}
                              className={cn(
                                "w-full rounded-lg border px-2.5 py-1.5 text-center font-mono text-sm transition",
                                active
                                  ? "border-islamic-400 bg-white shadow-soft"
                                  : "border-transparent bg-transparent hover:bg-white/80 hover:border-islamic-100"
                              )}
                            />
                          </td>
                        );
                      })}
                      <td className="px-4 py-2.5 text-right">
                        {state === "error" && (
                          <span className="mr-2 text-xs text-red-600 font-medium">Failed</span>
                        )}
                        {state === "saved" && (
                          <span className="mr-2 text-xs text-islamic-600 font-medium">Saved ✓</span>
                        )}
                        <button
                          onClick={() => saveRow(row)}
                          disabled={state === "saving"}
                          className={cn(
                            "inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-medium transition",
                            state === "saving"
                              ? "bg-islamic-100 text-islamic-400 cursor-not-allowed"
                              : "bg-islamic-50 hover:bg-islamic-100 text-islamic-700"
                          )}
                          aria-label="Save row"
                        >
                          <Save className="h-3 w-3" />
                          {state === "saving" ? "Saving…" : "Save"}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Helper card */}
        <div className="rounded-2xl bg-gradient-to-br from-islamic-500 to-islamic-700 text-white p-6 relative overflow-hidden">
          <div className="absolute inset-0 pattern-islamic opacity-30" />
          <div className="relative flex flex-wrap items-center justify-between gap-4">
            <div className="max-w-md">
              <div className="text-xs uppercase tracking-wider text-gold-300">Tip</div>
              <div className="mt-1 font-sans font-medium text-lg">
                Paste an entire month directly from Excel
              </div>
              <p className="mt-1 text-sm text-white/80">
                Select your rows in Excel, copy them, then click the table and press Ctrl+V.
                We&apos;ll fill in the dates for you.
              </p>
            </div>
            <Button variant="gold" size="sm">Learn how</Button>
          </div>
        </div>
      </div>
    </>
  );
}
