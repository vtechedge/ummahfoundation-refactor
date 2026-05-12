import mongoose from "mongoose";
import { connectDB } from "../config/db";
import { PrayerTime } from "../modules/prayerTimes/model";
import { Announcement } from "../modules/announcements/model";

const PRAYER_SEED = [
  { date: "2026-04-19", hijri: "01 Qi'dah 1447", fajr: { begins: "4:30 AM", adhan: "5:35 AM", jamat: "5:45 AM" }, sunrise: "6:26 AM", dhuhr: { begins: "1:15 PM", adhan: "1:25 PM", jamat: "1:35 PM" }, asr: { begins: "5:03 PM", adhan: "6:05 PM", jamat: "6:15 PM" }, maghrib: { begins: "8:04 PM", adhan: "8:07 PM", jamat: "8:10 PM" }, isha: { begins: "9:31 PM", adhan: "9:35 PM", jamat: "9:45 PM" }, jummah: { khutbah: "1:14 PM", adhan: "1:30 PM", iqamah: "2:00 PM" } },
  { date: "2026-04-20", hijri: "02 Qi'dah 1447", fajr: { begins: "4:28 AM", adhan: "5:33 AM", jamat: "5:43 AM" }, sunrise: "6:24 AM", dhuhr: { begins: "1:15 PM", adhan: "1:25 PM", jamat: "1:35 PM" }, asr: { begins: "5:04 PM", adhan: "6:06 PM", jamat: "6:16 PM" }, maghrib: { begins: "8:06 PM", adhan: "8:09 PM", jamat: "8:12 PM" }, isha: { begins: "9:33 PM", adhan: "9:37 PM", jamat: "9:47 PM" }, jummah: { khutbah: "1:14 PM", adhan: "1:30 PM", iqamah: "2:00 PM" } },
  { date: "2026-04-25", hijri: "07 Qi'dah 1447", fajr: { begins: "4:21 AM", adhan: "5:26 AM", jamat: "5:36 AM" }, sunrise: "6:17 AM", dhuhr: { begins: "1:14 PM", adhan: "1:24 PM", jamat: "1:34 PM" }, asr: { begins: "5:08 PM", adhan: "6:10 PM", jamat: "6:20 PM" }, maghrib: { begins: "8:12 PM", adhan: "8:15 PM", jamat: "8:18 PM" }, isha: { begins: "9:40 PM", adhan: "9:44 PM", jamat: "9:54 PM" }, jummah: { khutbah: "1:14 PM", adhan: "1:30 PM", iqamah: "2:00 PM" } },
];

const ANNOUNCEMENT_SEED = [
  { title: "Eid al-Adha Prayer — Masjid Al-Ummah", body: "Eid prayer will be held at 8:00 AM and 9:30 AM. All musallis are requested to bring their own prayer mats. Parking available on site.", tag: "Eid", priority: "urgent", date: new Date("2026-06-16"), order: 0 },
  { title: "Zakat al-Fitr 2026 — $15 per person", body: "The Zakat al-Fitr amount for 2026 has been set at $15 per person. Please pay before Eid prayer. E-Transfer to info@ummahfoundation.ca.", tag: "Zakat", priority: "urgent", date: new Date("2026-06-10"), order: 1 },
  { title: "Jummah Khutbah — New Time", body: "Effective immediately, Jummah Khutbah begins at 1:15 PM with Iqamah at 1:30 PM. Please arrive early.", tag: "Jummah", priority: "normal", date: new Date("2026-04-20"), order: 2 },
  { title: "Evening Maktab — 2026 Enrolment Open", body: "Registration for the 2026–2027 Evening Maktab session is now open. Contact Moulana Aamir Bhayat to enrol your child.", tag: "Education", priority: "normal", date: new Date("2026-04-15"), order: 3 },
];

async function seed() {
  await connectDB();

  for (const pt of PRAYER_SEED) {
    const d = new Date(pt.date);
    const dayStart = new Date(d); dayStart.setHours(0, 0, 0, 0);
    const dayEnd   = new Date(d); dayEnd.setHours(23, 59, 59, 999);
    await PrayerTime.findOneAndUpdate(
      { date: { $gte: dayStart, $lte: dayEnd } },
      { $setOnInsert: { ...pt, date: d } },
      { upsert: true }
    );
  }

  for (const a of ANNOUNCEMENT_SEED) {
    await Announcement.findOneAndUpdate(
      { title: a.title },
      { $setOnInsert: a },
      { upsert: true }
    );
  }

  console.log("Seed complete.");
  await mongoose.disconnect();
}

seed().catch(console.error);
