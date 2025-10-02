"use client";

import Button from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import React, { useState } from "react";
import clsx from "clsx";

interface TodoCardProps extends React.ComponentPropsWithoutRef<"li"> {
  todoIndex: number;
  deleteTodo: (index: number) => void;
  editTodo: (index: number) => void;
  priority?: "low" | "medium" | "high";
}

export const TodoCard = ({
  children,
  todoIndex,
  deleteTodo,
  editTodo,
  priority,
  ...props
}: TodoCardProps) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <li
      className="flex items-center justify-between px-6 py-4 border border-secondary rounded-md shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out cursor-move"
      {...props}
    >
      <div className="flex items-center gap-4 ">
        <Checkbox
          checked={isChecked}
          onCheckedChange={(checked) => setIsChecked(checked as boolean)}
          className="h-6 w-6 rounded border-neutral-content data-[state=checked]:bg-primary data-[state=checked]:border-primary"
        />
        <div
          className={`flex items-center gap-3 text-base text-gray-800 ${
            isChecked ? "line-through opacity-60" : ""
          }`}
        >
          {children}
          {priority && <Badge variant={priority}>{priority}</Badge>}
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          onClick={() => editTodo(todoIndex)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md text-gray-600 hover:text-primary hover:bg-base-200"
        >
          <i className="fa-solid fa-pen-to-square"></i>
        </Button>
        <Button
          variant="ghost"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md text-gray-600 hover:text-error hover:bg-base-200"
          onClick={() => deleteTodo(todoIndex)}
        >
          <i className="fa-solid fa-trash-can"></i>
        </Button>
      </div>
    </li>
  );
};
