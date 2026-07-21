import { useState } from "react";
import toast from "react-hot-toast";

import {
  useCreateTask,
} from "../hooks/useTasks";

interface CreateTaskModalProps {
  onClose: () => void;
}

function CreateTaskModal({
  onClose,
}: CreateTaskModalProps) {
  const createTaskMutation =
    useCreateTask();

  const [title, setTitle] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [priority, setPriority] =
    useState<
      "low" | "medium" | "high"
    >("medium");

  const [dueDate, setDueDate] =
    useState("");

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!title.trim()) {
      toast.error("Task title is required");

      return;
    }

    createTaskMutation.mutate(
      {
        title: title.trim(),

        description: description.trim(),

        status: "todo",

        priority,

        ...(dueDate
          ? { dueDate }
          : {}),
      },

      {
        onSuccess: () => {
          toast.success(
            "Task created successfully"
          );

          onClose();
        },

        onError: () => {
          toast.error(
            "Failed to create task"
          );
        },
      }
    );
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl"
        onClick={(event) =>
          event.stopPropagation()
        }
      >
        {/* HEADER */}

        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Create New Task
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Add a new task to your workspace.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-xl text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
          >
            ×
          </button>
        </div>

        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          {/* TITLE */}

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Task Title
            </label>

            <input
              value={title}
              onChange={(event) =>
                setTitle(event.target.value)
              }
              placeholder="e.g. Implement authentication"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
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
                setDescription(
                  event.target.value
                )
              }
              rows={4}
              placeholder="Describe what needs to be done..."
              className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
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
                  event.target.value as
                    | "low"
                    | "medium"
                    | "high"
                )
              }
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
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

          {/* DUE DATE */}

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Due Date
            </label>

            <input
              type="date"
              value={dueDate}
              onChange={(event) =>
                setDueDate(
                  event.target.value
                )
              }
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
          </div>

          {/* ACTIONS */}

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-300 px-5 py-3 font-medium text-slate-700 transition hover:bg-slate-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={
                createTaskMutation.isPending
              }
              className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {createTaskMutation.isPending
                ? "Creating..."
                : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateTaskModal;