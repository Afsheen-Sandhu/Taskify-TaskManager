import React, { useState, useRef } from "react";
import { TodoCard } from "../TodoCard";

interface TodoListProps {
  todos: {
    id: number;
    title: string;
    priority: "low" | "medium" | "high";
    status: string;
  }[];
  deleteTodo: (index: number) => void;
  editTodo: (index: number) => void;
  reorderTodo: (fromIndex: number, toIndex: number) => void;
  updatePriority: (index: number, newPriority: "low" | "medium" | "high") => void;
}

export const TodoList = ({
  todos,
  deleteTodo,
  editTodo,
  reorderTodo,
  updatePriority,
}: TodoListProps) => {
  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);

  const handleDragStart = (
    e: React.DragEvent<HTMLLIElement>,
    index: number
  ) => {
    e.dataTransfer.dropEffect = "move";
    dragItem.current = index;
  };

  const handleDragEnter = (e: React.DragEvent<HTMLLIElement>, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    dragOverItem.current = index;
  };

  const handleDrop = (priority: "low" | "medium" | "high") => {
    if (
      dragItem.current !== null &&
      dragOverItem.current !== null
    ) {
      // Update priority if dropped in different section
      if (todos[dragItem.current].priority !== priority) {
        updatePriority(dragItem.current, priority);
      }
      // Reorder within the section
      reorderTodo(dragItem.current, dragOverItem.current);
    }
    dragItem.current = null;
    dragOverItem.current = null;
  };

  // Add onDrop handler to section to allow dropping on empty space
  const handleSectionDrop = (e: React.DragEvent<HTMLUListElement>, priority: "low" | "medium" | "high") => {
    e.preventDefault();
    if (dragItem.current !== null) {
      if (todos[dragItem.current].priority !== priority) {
        updatePriority(dragItem.current, priority);
      }
      dragItem.current = null;
      dragOverItem.current = null;
    }
  };

  return (
    <>
      {(["high", "medium", "low"] as const).map((priority) => (
        <section key={priority} className="mb-6">
          <h2 className="text-lg font-semibold capitalize mb-2">{priority} Priority</h2>
          <ul
            className="w-full p-4 space-y-3 bg-base-300 rounded-md border-2 border-primary"
            onDrop={(e) => handleSectionDrop(e, priority)}
            onDragOver={(e) => e.preventDefault()}
          >
            {todos
              .map((todo, index) => ({ todo, index }))
              .filter(({ todo }) => todo.priority === priority)
              .map(({ todo, index }) => (
                <TodoCard
                  todoIndex={index}
                  deleteTodo={deleteTodo}
                  editTodo={editTodo}
                  priority={todo.priority}
                  key={todo.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, index)}
                  onDragEnter={(e) => handleDragEnter(e, index)}
                  onDragOver={(e) => {
                    e.preventDefault();
                    e.dataTransfer.dropEffect = "move";
                  }}
                  onDrop={() => handleDrop(priority)}
                  className="cursor-move"
                >
                  <div className="flex items-center gap-2">
                    <p className="text-base-content">{todo.title}</p>
                  </div>
                </TodoCard>
              ))}
          </ul>
        </section>
      ))}
    </>
  );
};
