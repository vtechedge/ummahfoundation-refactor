import mongoose, { Schema, Document } from "mongoose";

export interface IAnnouncement extends Document {
  title: string;
  body: string;
  tag: string;
  priority: "normal" | "urgent";
  date: Date;
  isActive: boolean;
  tickerOnly: boolean;
  order: number;
}

const announcementSchema = new Schema<IAnnouncement>(
  {
    title:      { type: String, required: true },
    body:       { type: String, required: true },
    tag:        { type: String, required: true, default: "Notice" },
    priority:   { type: String, enum: ["normal", "urgent"], default: "normal" },
    date:       { type: Date, default: Date.now },
    isActive:   { type: Boolean, default: true },
    tickerOnly: { type: Boolean, default: false },
    order:      { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Announcement = mongoose.model<IAnnouncement>("Announcement", announcementSchema);
