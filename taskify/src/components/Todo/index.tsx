"use client";
import React, { useState } from "react";
import { TodoInput } from "../TodoCompononents";
import { TodoList } from "../TodoCompononents";

interface Todo {
  id: number;
  title: string;
  priority: "low" | "medium" | "high";
  status: string;
}

export const Todo = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");
  const [editTodo, setEditTodo] = useState<Todo | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [editTodoIndex, setEditTodoIndex] = useState<number | null>(null);
  const [priority, setPriority] = useState<"low" | "medium" | "high" | null>(
    null
  );
  const priorityLevels: ("low" | "medium" | "high")[] = [
    "low",
    "medium",
    "high",
  ];

  const addTodo = (
    todo: string,
    priority?: "low" | "medium" | "high" | null
  ) => {
    if (editMode && editTodoIndex !== null) {
      // Update existing todo
      const updatedTodos = [...todos];
      updatedTodos[editTodoIndex] = {
        ...updatedTodos[editTodoIndex],
        title: todo,
        priority: priority ?? updatedTodos[editTodoIndex].priority,
      };
      setTodos(updatedTodos);
      setPriority(null);
      setEditMode(false);
      setEditTodo(null);
      setEditTodoIndex(null);
      setInput("");
    } else {
      // Add new todo
      const newTodo: Todo = {
        id: Date.now(),
        title: todo,
        priority: priority ?? "low",
        status: "pending",
      };
      setTodos([...todos, newTodo]);
      setInput("");
      setPriority(null);
    }
  };
  const deleteTodo = (todoIndex: number) => {
    setTodos(todos.filter((_, index) => index !== todoIndex));
  };

  const handleEditTodo = (todoIndex: number) => {
    setEditTodo(todos[todoIndex] ?? null);
    setEditTodoIndex(todoIndex);
    setEditMode(true);
    setInput(todos[todoIndex]?.title ?? "");
    setPriority((todos[todoIndex] as Todo)?.priority ?? null);
  };

  const reorderTodo = (fromIndex: number, toIndex: number) => {
    setTodos((prev) => {
      const updated = [...prev];

      // Remove the dragged todo
      const [movedTodo] = updated.splice(fromIndex, 1);

      // Insert it at the new index
      updated.splice(toIndex, 0, movedTodo);

      return updated;
    });
  };

  const updatePriority = (index: number, newPriority: "low" | "medium" | "high") => {
    setTodos((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], priority: newPriority };
      return updated;
    });
  };

  const sortedTodos = [...todos].sort((a, b) => {
    return (
      priorityLevels.indexOf(a.priority) - priorityLevels.indexOf(b.priority)
    );
  });

  return (
    <div className="w-fulL h-full py-5 ">
      <TodoInput
        addTodo={addTodo}
        input={input}
        setInput={setInput}
        editMode={editMode}
        priority={priority}

        setPriority={setPriority}
      />
      <TodoList
        todos={todos}
        deleteTodo={deleteTodo}
        editTodo={handleEditTodo}
        reorderTodo={reorderTodo}
        updatePriority={updatePriority}
      />
    </div>
  );
};
