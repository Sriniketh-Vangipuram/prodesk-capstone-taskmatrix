import { useState } from "react";
import toast from "react-hot-toast";

import {
  useDeleteTask,
  useTasks,
} from "../../tasks/hooks/useTasks";

import CreateTaskModal from "../../tasks/components/CreateTaskModal";
import EditTaskModal from "../../tasks/components/EditTaskModal";
import KanbanBoard from "../../tasks/components/KanbanBoard";

import type { Task } from "../../tasks/api/task.api";

function DashboardPage() {
  const [
    isCreateModalOpen,
    setIsCreateModalOpen,
  ] = useState(false);

  const [
    selectedTask,
    setSelectedTask,
  ] = useState<Task | null>(null);

  const {
    data: tasks = [],
    isLoading,
    isError,
  } = useTasks();

  const deleteTaskMutation =
    useDeleteTask();

  const handleDelete = (taskId: string) => {
    deleteTaskMutation.mutate(taskId, {
      onSuccess: () => {
        toast.success(
          "Task deleted successfully"
        );
      },

      onError: () => {
        toast.error(
          "Failed to delete task"
        );
      },
    });
  };

  const todoCount = tasks.filter(
    (task) => task.status === "todo"
  ).length;

  const inProgressCount =
    tasks.filter(
      (task) =>
        task.status === "in-progress"
    ).length;

  const completedCount =
    tasks.filter(
      (task) =>
        task.status === "completed"
    ).length;

  return (
    <div className="min-h-screen">
      <main className="mx-auto max-w-7xl p-8">
        {/* HEADER */}

        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">
              Kanban Board
            </h2>

            <p className="mt-2 text-slate-500">
              Track and manage your project tasks visually.
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              setIsCreateModalOpen(true)
            }
            className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            + New Task
          </button>
        </div>

        {/* STATS */}

        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">
              Total Tasks
            </p>

            <p className="mt-2 text-3xl font-bold text-slate-900">
              {tasks.length}
            </p>
          </div>

          <div className="rounded-xl bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">
              Pending Tasks
            </p>

            <p className="mt-2 text-3xl font-bold text-red-600">
              {todoCount}
            </p>
          </div>

          <div className="rounded-xl bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">
              In Progress
            </p>

            <p className="mt-2 text-3xl font-bold text-blue-600">
              {inProgressCount}
            </p>
          </div>

          <div className="rounded-xl bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">
              Completed
            </p>

            <p className="mt-2 text-3xl font-bold text-green-600">
              {completedCount}
            </p>
          </div>
        </div>

        {/* LOADING */}

        {isLoading && (
          <div className="rounded-xl bg-white p-8 text-center shadow-sm">
            <p className="text-slate-500">
              Loading tasks...
            </p>
          </div>
        )}

        {/* ERROR */}

        {isError && (
          <div className="rounded-xl bg-red-50 p-8 text-center">
            <p className="text-red-600">
              Failed to load tasks.
            </p>
          </div>
        )}

        {/* KANBAN BOARD */}

        {!isLoading && !isError && (
          <KanbanBoard
            tasks={tasks}
            onDelete={handleDelete}
            onEdit={(task) =>
              setSelectedTask(task)
            }
            isDeleting={
              deleteTaskMutation.isPending
            }
          />
        )}
      </main>

      {/* CREATE TASK MODAL */}

      {isCreateModalOpen && (
        <CreateTaskModal
          onClose={() =>
            setIsCreateModalOpen(false)
          }
        />
      )}

      {/* EDIT TASK MODAL */}

      {selectedTask && (
        <EditTaskModal
          task={selectedTask}
          onClose={() =>
            setSelectedTask(null)
          }
        />
      )}
    </div>
  );
}

export default DashboardPage;