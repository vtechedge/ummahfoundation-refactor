import { Router } from "express";
import * as ctrl from "./controller";

export const prayerTimesRouter = Router();
prayerTimesRouter.get("/today", ctrl.getToday);
prayerTimesRouter.get("/month", ctrl.getMonth);
prayerTimesRouter.put("/:date", ctrl.update);
