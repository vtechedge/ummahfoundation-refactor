import { Request, Response, NextFunction } from "express";
import { env } from "../config/env";

interface AppError extends Error {
  statusCode?: number;
}

export function errorMiddleware(
  err: AppError,
  req: Request,
  res: Response,
  _next: NextFunction
): void {
  const status = err.statusCode ?? 500;
  const message =
    env.NODE_ENV === "production" && status === 500
      ? "Internal server error"
      : err.message;
  res.status(status).json({ error: message });
}
