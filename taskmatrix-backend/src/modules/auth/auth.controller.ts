import { Request, Response } from "express";
import { ZodError } from "zod";

import { authService } from "./auth.service";
import { loginSchema, registerSchema } from "./auth.schema";

import { ApiResponse } from "../../shared/utils/ApiResponse";
import { ApiError } from "../../shared/utils/ApiError";
import { asyncHandler } from "../../shared/utils/asyncHandler";

class AuthController {
  register = asyncHandler(async (req: Request, res: Response) => {
    try {
      const data = registerSchema.parse(req.body);

      const result = await authService.register(data);

      return res.status(201).json(
        new ApiResponse(true, "User registered successfully", result)
      );
    } catch (error) {
      if (error instanceof ZodError) {
        throw new ApiError(400, error.issues[0].message);
      }

      throw error;
    }
  });

  login = asyncHandler(async (req: Request, res: Response) => {
    try {
      const data = loginSchema.parse(req.body);

      const result = await authService.login(data);

      return res.json(
        new ApiResponse(true, "Login successful", result)
      );
    } catch (error) {
      if (error instanceof ZodError) {
        throw new ApiError(400, error.issues[0].message);
      }

      throw error;
    }
  });
}

export const authController = new AuthController();