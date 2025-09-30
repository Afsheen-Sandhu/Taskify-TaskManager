import React from 'react';
interface TodoCardProps {
  children: React.ReactNode;
  todoIndex: number;
  deleteTodo: (index: number) => void;
  editTodo: (index: number) => void;

}
export const TodoCard = ({ children, todoIndex, deleteTodo, editTodo } : TodoCardProps) => {
  return (
    <li className="flex items-center justify-between rounded-lg border border-gray-800 bg-gray-900 px-4 py-3 shadow-sm hover:shadow transition-shadow">
      <div className="text-sm text-gray-100">
        {children}
      </div>
      <div className="flex items-center gap-2">
        <button onClick={() => editTodo(todoIndex)} className="inline-flex h-9 w-9 items-center justify-center rounded-md text-gray-300 hover:text-orange-400 hover:bg-gray-800">
          <i className="fa-solid fa-pen-to-square"></i>
        </button>
        <button className="inline-flex h-9 w-9 items-center justify-center rounded-md text-gray-300 hover:text-red-400 hover:bg-gray-800" onClick={() => deleteTodo(todoIndex)}>
          <i className="fa-solid fa-trash-can"></i>
        </button>
      </div>
    </li>
  );
};


