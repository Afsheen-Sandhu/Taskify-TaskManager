import React from "react";
import { TodoCard } from "../TodoCard";
import type { Priority } from "@/types/todo";

interface TodoListProps {
  todos: {
    id: number;
    title: string;
    priority: Priority;
    status: string;
  }[];
  deleteTodo: (id: number) => void;
  editTodo: (id: number) => void;
  reorderTodo: (draggedId: number, dropTargetId: number) => void;
  updatePriority: (
    id: number,
    newPriority: Priority
  ) => void;
   
  
}

export const TodoList = ({
  todos,
  deleteTodo,
  editTodo,
  reorderTodo,
  updatePriority,
}: TodoListProps) => {
  const handleDragStart = (
    e: React.DragEvent<HTMLLIElement>,
    todoId: number
  ) => {
    e.dataTransfer.dropEffect = "move";
    e.dataTransfer.setData("todoId", todoId.toString());
  };

  const handleDrop = (
    e: React.DragEvent<HTMLLIElement>,
    dropTargetTodoId: number,
    priority: Priority
  ) => {
    e.preventDefault();
    const draggedIdStr = e.dataTransfer.getData("todoId");
    if (draggedIdStr === "") return;
    const draggedId = parseInt(draggedIdStr, 10);
    if (isNaN(draggedId)) return;
    const draggedTodo = todos.find(t => t.id === draggedId);
    if (draggedTodo && draggedTodo.priority !== priority) {
      updatePriority(draggedId, priority);
    }
    reorderTodo(draggedId, dropTargetTodoId);
  };

  return (
    <ul className="w-full p-4 space-y-3 rounded-md">
      {todos.map((todo) => (
        <TodoCard
          todoId={todo.id}
          deleteTodo={deleteTodo}
          editTodo={editTodo}
          priority={todo.priority}
          key={todo.id}
          draggable
          onDragStart={(e) => handleDragStart(e, todo.id)}
          onDragOver={(e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = "move";
          }}
          onDrop={(e) => handleDrop(e, todo.id, todo.priority)}
        >
          <div className="flex items-center gap-2">
            <p className="text-base-content">{todo.title}</p>
          </div>
        </TodoCard>
      ))}
    </ul>
  );
};
