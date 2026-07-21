import { Types } from "mongoose";

import { Task } from "./task.model";
import type {
  CreateTaskInput,
  UpdateTaskInput,
} from "./task.schema";

class TaskService {
  async createTask(
    userId: string,
    data: CreateTaskInput
  ) {
    return Task.create({
      ...data,

      ownerId: new Types.ObjectId(userId),
    });
  }

  async getTasks(userId: string) {
    return Task.find({
      ownerId: new Types.ObjectId(userId),
    }).sort({
      createdAt: -1,
    });
  }

  async getTaskById(
    userId: string,
    taskId: string
  ) {
    return Task.findOne({
      _id: taskId,

      // Ownership validation
      ownerId: new Types.ObjectId(userId),
    });
  }

  async updateTask(
    userId: string,
    taskId: string,
    data: UpdateTaskInput
  ) {
    return Task.findOneAndUpdate(
      {
        _id: taskId,

        // Ownership validation
        ownerId: new Types.ObjectId(userId),
      },

      data,

      {
        new: true,
        runValidators: true,
      }
    );
  }

  async deleteTask(
    userId: string,
    taskId: string
  ) {
    return Task.findOneAndDelete({
      _id: taskId,

      // Ownership validation
      ownerId: new Types.ObjectId(userId),
    });
  }
}

export const taskService = new TaskService();