// Hijri date utility — used by TopUtilityBar (server-side safe)

const MONTHS = [
  "Muharram", "Safar", "Rabi' al-Awwal", "Rabi' al-Thani",
  "Jumada al-Awwal", "Jumada al-Thani", "Rajab", "Sha'ban",
  "Ramadan", "Shawwal", "Dhul Qi'dah", "Dhul Hijjah",
] as const;

// Umm al-Qura via built-in Intl — available in Node 18+
// Falls back to anchor-based calculation if Intl fails
export function getHijriDate(date: Date = new Date()): string {
  try {
    const parts = new Intl.DateTimeFormat("en-u-ca-islamic-umalqura", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).formatToParts(date);
    const day = parts.find((p) => p.type === "day")?.value ?? "";
    const month = parts.find((p) => p.type === "month")?.value ?? "";
    const year = (parts.find((p) => p.type === "year")?.value ?? "").replace(/\s*AH$/i, "");
    return `${day} ${month} ${year} AH`;
  } catch {
    return anchorFallback(date);
  }
}

// Anchor: April 19, 2026 = 01 Dhul Qi'dah 1447
// Used only if Intl.DateTimeFormat with Islamic calendar is unavailable
function anchorFallback(date: Date): string {
  const ANCHOR = new Date(2026, 3, 19); // April 19, 2026
  const ANCHOR_DAY = 1;
  const ANCHOR_MONTH = 10; // 0-indexed: Dhul Qi'dah = index 10
  const ANCHOR_YEAR = 1447;
  const MONTH_DAYS = [30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29];

  const diff = Math.floor((date.getTime() - ANCHOR.getTime()) / 86_400_000);
  let d = ANCHOR_DAY + diff;
  let m = ANCHOR_MONTH;
  let y = ANCHOR_YEAR;

  while (d > MONTH_DAYS[m]) { d -= MONTH_DAYS[m]; m++; if (m >= 12) { m = 0; y++; } }
  while (d < 1)              { m--;                if (m < 0)  { m = 11; y--; } d += MONTH_DAYS[m]; }

  return `${d} ${MONTHS[m]} ${y} AH`;
}
