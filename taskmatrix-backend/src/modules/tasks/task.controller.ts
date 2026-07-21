import {
  Response,
} from "express";

import { ZodError } from "zod";

import {
  taskService,
} from "./task.service";

import {
  createTaskSchema,
  updateTaskSchema,
} from "./task.schema";

import type {
  AuthRequest,
} from "../../shared/middleware/auth.middleware";

import {
  ApiResponse,
} from "../../shared/utils/ApiResponse";

import {
  ApiError,
} from "../../shared/utils/ApiError";

import {
  asyncHandler,
} from "../../shared/utils/asyncHandler";

class TaskController {
  create = asyncHandler(
    async (
      req: AuthRequest,
      res: Response
    ) => {
      try {
        if (!req.user) {
          throw new ApiError(
            401,
            "Unauthorized"
          );
        }

        const data =
          createTaskSchema.parse(
            req.body
          );

        const task =
          await taskService.createTask(
            req.user.userId,
            data
          );

        return res
          .status(201)
          .json(
            new ApiResponse(
              true,
              "Task created successfully",
              task
            )
          );
      } catch (error) {
        if (
          error instanceof ZodError
        ) {
          throw new ApiError(
            400,
            error.issues[0].message
          );
        }

        throw error;
      }
    }
  );

  getAll = asyncHandler(
    async (
      req: AuthRequest,
      res: Response
    ) => {
      if (!req.user) {
        throw new ApiError(
          401,
          "Unauthorized"
        );
      }

      const tasks =
        await taskService.getTasks(
          req.user.userId
        );

      return res.json(
        new ApiResponse(
          true,
          "Tasks fetched successfully",
          tasks
        )
      );
    }
  );

  getOne = asyncHandler(
    async (
      req: AuthRequest,
      res: Response
    ) => {
      if (!req.user) {
        throw new ApiError(
          401,
          "Unauthorized"
        );
      }

      const task =
        await taskService.getTaskById(
          req.user.userId,
          String(req.params.id)
        );

      if (!task) {
        throw new ApiError(
          404,
          "Task not found or access denied"
        );
      }

      return res.json(
        new ApiResponse(
          true,
          "Task fetched successfully",
          task
        )
      );
    }
  );

  update = asyncHandler(
    async (
      req: AuthRequest,
      res: Response
    ) => {
      try {
        if (!req.user) {
          throw new ApiError(
            401,
            "Unauthorized"
          );
        }

        const data =
          updateTaskSchema.parse(
            req.body
          );

        const task =
          await taskService.updateTask(
            req.user.userId,
            String(req.params.id),
            data
          );

        if (!task) {
          throw new ApiError(
            404,
            "Task not found or access denied"
          );
        }

        return res.json(
          new ApiResponse(
            true,
            "Task updated successfully",
            task
          )
        );
      } catch (error) {
        if (
          error instanceof ZodError
        ) {
          throw new ApiError(
            400,
            error.issues[0].message
          );
        }

        throw error;
      }
    }
  );

  delete = asyncHandler(
    async (
      req: AuthRequest,
      res: Response
    ) => {
      if (!req.user) {
        throw new ApiError(
          401,
          "Unauthorized"
        );
      }

      const task =
        await taskService.deleteTask(
          req.user.userId,
          String(req.params.id)
        );

      if (!task) {
        throw new ApiError(
          404,
          "Task not found or access denied"
        );
      }

      return res.json(
        new ApiResponse(
          true,
          "Task deleted successfully",
          null
        )
      );
    }
  );
}

export const taskController =
  new TaskController();