import React from "react";
import { TodoList } from "../TodoList";
import type { Priority, Status } from "@/types/todo";

interface KanbanColumnProps {
  status: Status;
  todos: {
    id: number;
    title: string;
    priority: Priority;
    status: Status;
  }[];
  onDropTodo: (e: React.DragEvent<HTMLDivElement>, status: Status) => void;
  deleteTodo: (index: number) => void;
  editTodo: (index: number) => void;
  reorderTodo: (fromIndex: number, toIndex: number) => void;
  updatePriority: (index: number, newPriority: Priority) => void;
}

export const KanbanColumn = ({
    status,
    todos,
    onDropTodo,
    deleteTodo,
    editTodo,
    reorderTodo,
    updatePriority,
  }: KanbanColumnProps) => (
    <div
      className="flex-1 p-4 bg-base-100 mt-5 rounded min-h-[400px]"
      onDragOver={e => e.preventDefault()}
      onDrop={e => onDropTodo(e, status)}
    >
      <h2 className="mb-2 font-bold text-lg text-center">{status.toUpperCase()}</h2>
      <div className="h-96 overflow-y-auto"> {/* <-- Add this wrapper */}
        <TodoList
          todos={todos}
          deleteTodo={deleteTodo}
          editTodo={editTodo}
          reorderTodo={reorderTodo}
          updatePriority={updatePriority}
        />
      </div>
    </div>
  );