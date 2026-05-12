import { Request, Response } from "express";
import { asyncHandler } from "../../middleware/asyncHandler";
import * as svc from "./service";

export const getToday = asyncHandler(async (_req, res) => {
  const data = await svc.getTodayPrayerTimes();
  if (!data) return res.status(404).json({ error: "No prayer times for today" });
  res.json({ data });
});

export const getMonth = asyncHandler(async (req, res) => {
  const [year, month] = (req.query.m as string ?? "").split("-").map(Number);
  if (!year || !month) return res.status(400).json({ error: "Pass ?m=YYYY-MM" });
  const data = await svc.getMonthPrayerTimes(year, month);
  res.json({ data });
});

export const update = asyncHandler(async (req, res) => {
  const data = await svc.upsertPrayerTime(req.params.date, req.body);
  res.json({ data });
});
