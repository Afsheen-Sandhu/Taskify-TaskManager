import Button from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface TodoCardProps extends React.ComponentPropsWithoutRef<"li"> {
  todoIndex: number;
  deleteTodo: (index: number) => void;
  editTodo: (index: number) => void;
  priority?: 'low' | 'medium' | 'high';
}

export const TodoCard = ({
  children,
  todoIndex,
  deleteTodo,
  editTodo,
  priority,
  className,
  ...props
}: TodoCardProps) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <li
      className={cn(
        "flex items-center justify-between rounded-lg border-2 border-purple-700 bg-base-100 px-4 py-3 shadow-sm hover:shadow transition-shadow",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-3">
        <Checkbox
          checked={isChecked}
          onCheckedChange={(checked) => setIsChecked(checked as boolean)}
          className="h-5 w-5 rounded border-neutral-content data-[state=checked]:bg-primary data-[state=checked]:border-primary"
        />
        <div
          className={`flex items-center gap-2 text-sm text-base-content ${
            isChecked ? "line-through opacity-70" : ""
          }`}
        >
          {children}
          {priority && (
            <Badge
              variant={
                priority === "high"
                  ? "destructive"
                  : priority === "medium"
                  ? "secondary"
                  : "default"
              }
              className={
                priority === "high"
                  ? "bg-red-600 text-white"
                  : priority === "low"
                  ? "bg-emerald-600 text-white"
                  : undefined
              }
            >
              {priority}
            </Badge>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          onClick={() => editTodo(todoIndex)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-md text-neutral-content hover:text-primary hover:bg-base-200"
        >
          <i className="fa-solid fa-pen-to-square"></i>
        </Button>
        <Button
          variant="ghost"
          className="inline-flex h-9 w-9 items-center justify-center rounded-md text-neutral-content hover:text-error hover:bg-base-200"
          onClick={() => deleteTodo(todoIndex)}
        >
          <i className="fa-solid fa-trash-can"></i>
        </Button>
      </div>
    </li>
  );
};
