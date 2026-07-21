import { Schema, model, Types } from "mongoose";

export type TaskStatus =
  | "todo"
  | "in-progress"
  | "completed";

export type TaskPriority =
  | "low"
  | "medium"
  | "high";

export interface ITask {
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: Date;
  ownerId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const taskSchema = new Schema<ITask>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 100,
    },

    description: {
      type: String,
      trim: true,
      maxlength: 1000,
      default: "",
    },

    status: {
      type: String,
      enum: ["todo", "in-progress", "completed"],
      default: "todo",
    },

    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },

    dueDate: {
      type: Date,
    },

    ownerId: {
      type: Schema.Types.ObjectId,
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Task = model<ITask>("Task", taskSchema);