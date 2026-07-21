import type { Task } from "../api/task.api";

interface KanbanColumnProps {
  title: string;

  count: number;

  tasks: Task[];

  color: string;

  onDelete: (taskId: string) => void;

  onEdit: (task: Task) => void;

  isDeleting: boolean;
}

function KanbanColumn({
  title,
  count,
  tasks,
  color,
  onDelete,
  onEdit,
  isDeleting,
}: KanbanColumnProps) {
  return (
    <div
      className={`min-h-[450px] rounded-2xl p-4 ${color}`}
    >
      {/* COLUMN HEADER */}

      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-bold text-slate-900">
          {title}
        </h3>

        <span className="rounded-full bg-white px-3 py-1 text-sm font-semibold text-slate-600">
          {count}
        </span>
      </div>

      {/* TASKS */}

      <div className="space-y-4">
        {tasks.map((task) => (
          <div
            key={task._id}
            className="rounded-xl bg-white p-4 shadow-sm"
          >
            {/* TASK HEADER */}

            <div className="flex items-start justify-between gap-3">
              <h4 className="font-semibold text-slate-900">
                {task.title}
              </h4>

              <span
                className={`rounded-full px-2 py-1 text-xs font-semibold ${
                  task.priority === "high"
                    ? "bg-red-100 text-red-700"
                    : task.priority ===
                      "medium"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {task.priority}
              </span>
            </div>

            {/* DESCRIPTION */}

            {task.description && (
              <p className="mt-3 text-sm text-slate-500">
                {task.description}
              </p>
            )}

            {/* ACTIONS */}

            <div className="mt-4 flex items-center gap-4">
              <button
                type="button"
                onClick={() =>
                  onEdit(task)
                }
                className="text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                Edit
              </button>

              <button
                type="button"
                onClick={() =>
                  onDelete(task._id)
                }
                disabled={isDeleting}
                className="text-sm font-medium text-red-600 hover:text-red-700 disabled:opacity-50"
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        {/* EMPTY STATE */}

        {tasks.length === 0 && (
          <div className="rounded-xl border-2 border-dashed border-slate-300 p-6 text-center text-sm text-slate-500">
            No tasks here
          </div>
        )}
      </div>
    </div>
  );
}

export default KanbanColumn;