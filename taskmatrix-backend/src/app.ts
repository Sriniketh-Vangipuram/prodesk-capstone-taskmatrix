import express from "express";
import cors from "cors";
import authRoutes from "./modules/auth/auth.routes";
import taskRoutes from "./modules/tasks/task.routes";

export const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://prodesk-capstone-taskmatrix-neon.vercel.app",
];

app.use(
  cors({
    origin(origin, callback) {
      // Allow Postman/server-to-server requests
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/tasks",taskRoutes);

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
