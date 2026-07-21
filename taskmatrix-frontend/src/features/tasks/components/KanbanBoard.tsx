import type { Task } from "../api/task.api";

import KanbanColumn from "./KanbanColumn";

interface KanbanBoardProps {
  tasks: Task[];

  onDelete: (taskId: string) => void;

  onEdit: (task: Task) => void;

  isDeleting: boolean;
}

function KanbanBoard({
  tasks,
  onDelete,
  onEdit,
  isDeleting,
}: KanbanBoardProps) {
  const todoTasks = tasks.filter(
    (task) => task.status === "todo"
  );

  const inProgressTasks = tasks.filter(
    (task) =>
      task.status === "in-progress"
  );

  const completedTasks = tasks.filter(
    (task) =>
      task.status === "completed"
  );

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <KanbanColumn
        title="To Do"
        count={todoTasks.length}
        tasks={todoTasks}
        color="bg-slate-200"
        onDelete={onDelete}
        onEdit={onEdit}
        isDeleting={isDeleting}
      />

      <KanbanColumn
        title="In Progress"
        count={inProgressTasks.length}
        tasks={inProgressTasks}
        color="bg-blue-100"
        onDelete={onDelete}
        onEdit={onEdit}
        isDeleting={isDeleting}
      />

      <KanbanColumn
        title="Done"
        count={completedTasks.length}
        tasks={completedTasks}
        color="bg-green-100"
        onDelete={onDelete}
        onEdit={onEdit}
        isDeleting={isDeleting}
      />
    </div>
  );
}

export default KanbanBoard;