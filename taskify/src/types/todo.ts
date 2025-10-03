export type Priority = "low" | "medium" | "high";

export type Status = "pending" | "in progress" | "done";

export interface Todo {
  id: number;
  title: string;
  priority: Priority;
  status: Status;
}


