import { useState } from "react";
import toast from "react-hot-toast";

import type {
  Task,
  UpdateTaskData,
} from "../api/task.api";

import { useUpdateTask } from "../hooks/useTasks";

interface EditTaskModalProps {
  task: Task;
  onClose: () => void;
}

function EditTaskModal({
  task,
  onClose,
}: EditTaskModalProps) {
  const updateTaskMutation =
    useUpdateTask();

  const [title, setTitle] =
    useState(task.title);

  const [description, setDescription] =
    useState(task.description);

  const [status, setStatus] =
    useState<Task["status"]>(task.status);

  const [priority, setPriority] =
    useState<Task["priority"]>(task.priority);

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!title.trim()) {
      toast.error("Title is required");
      return;
    }

    const data: UpdateTaskData = {
      title: title.trim(),
      description: description.trim(),
      status,
      priority,
    };

    updateTaskMutation.mutate(
      {
        taskId: task._id,
        data,
      },
      {
        onSuccess: () => {
          toast.success(
            "Task updated successfully"
          );

          onClose();
        },

        onError: () => {
          toast.error(
            "Failed to update task"
          );
        },
      }
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900">
            Edit Task
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="text-2xl text-slate-400 hover:text-slate-700"
          >
            ×
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          {/* TITLE */}

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Title
            </label>

            <input
              value={title}
              onChange={(event) =>
                setTitle(event.target.value)
              }
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
          </div>

          {/* DESCRIPTION */}

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Description
            </label>

            <textarea
              value={description}
              onChange={(event) =>
                setDescription(event.target.value)
              }
              rows={4}
              className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
          </div>

          {/* STATUS */}

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Status
            </label>

            <select
              value={status}
              onChange={(event) =>
                setStatus(
                  event.target.value as Task["status"]
                )
              }
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            >
              <option value="todo">
                To Do
              </option>

              <option value="in-progress">
                In Progress
              </option>

              <option value="completed">
                Completed
              </option>
            </select>
          </div>

          {/* PRIORITY */}

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Priority
            </label>

            <select
              value={priority}
              onChange={(event) =>
                setPriority(
                  event.target.value as Task["priority"]
                )
              }
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            >
              <option value="low">
                Low
              </option>

              <option value="medium">
                Medium
              </option>

              <option value="high">
                High
              </option>
            </select>
          </div>

          {/* ACTIONS */}

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-300 px-5 py-3 font-medium text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={
                updateTaskMutation.isPending
              }
              className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {updateTaskMutation.isPending
                ? "Saving..."
                : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditTaskModal;