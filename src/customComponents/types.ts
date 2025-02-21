export type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE";

export type Task = {
  taskId: string;
  id: string;
  status: TaskStatus;
  title: string;
  description?: string;
  createdAt: string;
};

export type Column = {
  id: TaskStatus;
  title: string;
  color?: string;
};
