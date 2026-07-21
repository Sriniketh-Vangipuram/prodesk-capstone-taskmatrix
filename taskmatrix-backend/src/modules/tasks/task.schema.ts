import { z } from "zod";

export const createTaskSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title cannot exceed 100 characters"),

  description: z
    .string()
    .max(
      1000,
      "Description cannot exceed 1000 characters"
    )
    .optional(),

  status: z
    .enum([
      "todo",
      "in-progress",
      "completed",
    ])
    .optional(),

  priority: z
    .enum([
      "low",
      "medium",
      "high",
    ])
    .optional(),

  dueDate: z
    .string()
    .optional(),
});

export const updateTaskSchema =
  createTaskSchema.partial();

export type CreateTaskInput =
  z.infer<typeof createTaskSchema>;

export type UpdateTaskInput =
  z.infer<typeof updateTaskSchema>;