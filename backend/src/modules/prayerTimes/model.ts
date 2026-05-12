import mongoose, { Schema, Document } from "mongoose";

export interface IPrayerTime extends Document {
  date: Date;
  hijri: string;
  fajr:    { begins: string; adhan: string; jamat: string };
  sunrise: string;
  dhuhr:   { begins: string; adhan: string; jamat: string };
  asr:     { begins: string; adhan: string; jamat: string };
  maghrib: { begins: string; adhan: string; jamat: string };
  isha:    { begins: string; adhan: string; jamat: string };
  jummah:  { khutbah: string; adhan: string; iqamah: string };
  note?: string;
}

const timeBlockSchema = new Schema(
  { begins: String, adhan: String, jamat: String },
  { _id: false }
);

const prayerTimeSchema = new Schema<IPrayerTime>(
  {
    date: { type: Date, required: true, unique: true, index: true },
    hijri: { type: String, required: true },
    fajr:    timeBlockSchema,
    sunrise: String,
    dhuhr:   timeBlockSchema,
    asr:     timeBlockSchema,
    maghrib: timeBlockSchema,
    isha:    timeBlockSchema,
    jummah:  { type: new Schema({ khutbah: String, adhan: String, iqamah: String }, { _id: false }) },
    note:    String,
  },
  { timestamps: true }
);

export const PrayerTime = mongoose.model<IPrayerTime>("PrayerTime", prayerTimeSchema);
