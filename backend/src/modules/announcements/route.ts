import { Router } from "express";
import * as ctrl from "./controller";

export const announcementsRouter = Router();
announcementsRouter.get("/",         ctrl.list);
announcementsRouter.get("/ticker",   ctrl.ticker);
announcementsRouter.post("/",        ctrl.create);
announcementsRouter.put("/:id",      ctrl.update);
announcementsRouter.delete("/:id",   ctrl.destroy);
