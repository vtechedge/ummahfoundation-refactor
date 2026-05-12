import { PrayerTime, IPrayerTime } from "./model";

function dayStart(d: Date): Date {
  const s = new Date(d);
  s.setHours(0, 0, 0, 0);
  return s;
}

function dayEnd(d: Date): Date {
  const e = new Date(d);
  e.setHours(23, 59, 59, 999);
  return e;
}

export async function getTodayPrayerTimes(): Promise<IPrayerTime | null> {
  const today = new Date();
  return PrayerTime.findOne({ date: { $gte: dayStart(today), $lte: dayEnd(today) } }).lean();
}

export async function getMonthPrayerTimes(year: number, month: number): Promise<IPrayerTime[]> {
  const start = new Date(year, month - 1, 1);
  const end   = new Date(year, month, 0, 23, 59, 59);
  return PrayerTime.find({ date: { $gte: start, $lte: end } }).sort({ date: 1 }).lean();
}

export async function upsertPrayerTime(date: string, data: Partial<IPrayerTime>): Promise<IPrayerTime> {
  const d = new Date(date);
  return PrayerTime.findOneAndUpdate(
    { date: { $gte: dayStart(d), $lte: dayEnd(d) } },
    { $set: { ...data, date: d } },
    { upsert: true, new: true, runValidators: true }
  ) as Promise<IPrayerTime>;
}
