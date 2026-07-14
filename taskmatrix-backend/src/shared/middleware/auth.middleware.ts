import { Request, Response, NextFunction } from "express";

import { ApiError } from "../utils/ApiError";
import { verifyToken } from "../utils/jwt";

export interface AuthRequest extends Request {
  user?: {
    userId: string;
  };
}

export function authMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    throw new ApiError(401, "Unauthorized");
  }

  const token = authHeader.split(" ")[1];

  const payload = verifyToken(token);

  req.user = payload;

  next();
}