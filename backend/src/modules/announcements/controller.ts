import { asyncHandler } from "../../middleware/asyncHandler";
import * as svc from "./service";

export const list    = asyncHandler(async (_req, res) => res.json({ data: await svc.getActive() }));
export const ticker  = asyncHandler(async (_req, res) => res.json({ data: await svc.getTicker() }));
export const create  = asyncHandler(async (req,  res) => res.status(201).json({ data: await svc.create(req.body) }));
export const update  = asyncHandler(async (req,  res) => res.json({ data: await svc.update(req.params.id, req.body) }));
export const destroy = asyncHandler(async (req,  res) => { await svc.remove(req.params.id); res.status(204).end(); });
