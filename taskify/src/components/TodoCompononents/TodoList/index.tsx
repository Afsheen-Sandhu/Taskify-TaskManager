import React from "react";
import { TodoCard } from "../TodoCard";

interface TodoListProps {
  todos: { id: number; title: string; description: string; priority: 'low' | 'medium' | 'high'; status: string }[];
  deleteTodo: (index: number) => void;
  editTodo: (index: number) => void;
}

export const TodoList = ({ todos, deleteTodo, editTodo }: TodoListProps) => {
  return (
    <ul className="w-full p-4 space-y-3 bg-base-300 rounded-md border border-base-200">
      {todos.map((todo, index) => (
        <TodoCard
          key={index}
          todoIndex={index}
          deleteTodo={deleteTodo}
          editTodo={editTodo}
          priority={todo.priority}
        >
          <div className="flex items-center gap-2">
            <p className="text-base-content">{todo.title}</p>
          </div>
        </TodoCard>
      ))}
    </ul>
  );
};
