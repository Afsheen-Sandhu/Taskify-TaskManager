import React from 'react';
import { TodoCard } from '../TodoCard';

interface TodoListProps {
  todos: (string | { title: string })[];
  deleteTodo: (index: number) => void;
  editTodo: (index: number) => void;
}


export const TodoList = ({ todos, deleteTodo, editTodo }:  TodoListProps) => {
  return (
    <ul className="w-full p-4 space-y-3">
      {todos.map((todo, index) => (
        <TodoCard
          key={index}
          todoIndex={index}
          deleteTodo={deleteTodo}
          editTodo={editTodo}
        >
          <p className="text-gray-100">{typeof todo === 'string' ? todo : todo?.title ?? ''}</p>
        </TodoCard>
      ))}
    </ul>
  );
};


