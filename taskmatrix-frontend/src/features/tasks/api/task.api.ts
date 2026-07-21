import api from "../../../api/axios";

export interface Task {
  _id: string;
  title: string;
  description: string;
  status: "todo" | "in-progress" | "completed";
  priority: "low" | "medium" | "high";
  dueDate?:string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskData {
  title: string;
  description: string;
  status: Task["status"];
  priority: Task["priority"];
  dueDate?:string;
}

export type UpdateTaskData = Partial<CreateTaskData>;

export const getTasks = async (): Promise<Task[]> => {
  const response = await api.get("/tasks");

  return response.data.data;
};

export const createTask = async (
  data: CreateTaskData
): Promise<Task> => {
  const response = await api.post("/tasks", data);

  return response.data.data;
};

export const updateTask = async (
  taskId: string,
  data: UpdateTaskData
): Promise<Task> => {
  const response = await api.put(
    `/tasks/${taskId}`,
    data
  );

  return response.data.data;
};

export const deleteTask = async (
  taskId: string
): Promise<void> => {
  await api.delete(`/tasks/${taskId}`);
};