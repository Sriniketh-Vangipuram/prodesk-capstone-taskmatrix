import express from "express";
import cors from "cors";
import authRoutes from "./modules/auth/auth.routes";

export const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/api/health", (_, res) => {
  res.json({
    success: true,
    message: "TaskMatrix API Running",
  });
});

import { authMiddleware, AuthRequest } from "./shared/middleware/auth.middleware";

app.get(
  "/api/protected",
  authMiddleware,
  (req: AuthRequest, res) => {
    res.json({
      success: true,
      user: req.user,
    });
  }
);
