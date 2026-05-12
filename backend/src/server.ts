import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { env } from "./config/env";
import { prayerTimesRouter } from "./modules/prayerTimes/route";
import { announcementsRouter } from "./modules/announcements/route";
import { errorMiddleware } from "./middleware/error";

export function createServer() {
  const app = express();

  app.use(cors({ origin: env.CLIENT_URL, credentials: true }));
  app.use(express.json());
  app.use(cookieParser());

  app.get("/api/v1/health", (_req, res) => res.json({ status: "ok", ts: new Date() }));
  app.use("/api/v1/prayer-times",  prayerTimesRouter);
  app.use("/api/v1/announcements", announcementsRouter);

  app.use(errorMiddleware);

  return app;
}
