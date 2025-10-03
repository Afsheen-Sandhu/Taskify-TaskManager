"use client";
import React, { useState } from "react";
import { TodoInput } from "../TodoCompononents";
import { KanbanColumn } from "../TodoCompononents/KanbanColumn";

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
  const [destination, setDestination] = useState<string | null>(null);

  const statuses = ["pending", "inprogress", "done"];

  const addTodo = (
    todo: string,
    priority?: "low" | "medium" | "high" | "null" | null,
    destinationParam?: string | null
  ) => {
    if (editMode && editTodoIndex !== null) {
      const updatedTodos = [...todos];
      updatedTodos[editTodoIndex] = {
        ...updatedTodos[editTodoIndex],
        title: todo,
        priority: (priority as "low" | "medium" | "high") ?? updatedTodos[editTodoIndex].priority,
        status: destinationParam ?? updatedTodos[editTodoIndex].status,
      };
      setTodos(updatedTodos);
      setPriority(null);
      setDestination(null);
      setEditMode(false);
      setEditTodo(null);
      setEditTodoIndex(null);
      setInput("");
    } else {
      const newTodo: Todo = {
        id: Date.now(),
        title: todo,
        priority: (priority as "low" | "medium" | "high") ?? "low",
        status: destinationParam ?? "pending",
      };
      setTodos([...todos, newTodo]);
      setInput("");
      setPriority(null);
      setDestination(null);
    }
  };

  const deleteTodo = (todoId: number) => {
    setTodos((prev) => prev.filter((t) => t.id !== todoId));
  };

  const handleEditTodo = (todoId: number) => {
    const todoIndex = todos.findIndex((t) => t.id === todoId);
    if (todoIndex === -1) return;
    setEditTodo(todos[todoIndex] ?? null);
    setEditTodoIndex(todoIndex);
    setEditMode(true);
    setInput(todos[todoIndex]?.title ?? "");
    setPriority((todos[todoIndex] as Todo)?.priority ?? null);
    setDestination(todos[todoIndex]?.status ?? null);
  };

  const reorderTodo = (draggedId: number, dropTargetId: number) => {
    setTodos((prev) => {
      const updated = [...prev];
      const fromIndex = updated.findIndex((t) => t.id === draggedId);
      const toIndex = updated.findIndex((t) => t.id === dropTargetId);
      if (fromIndex === -1 || toIndex === -1) return prev;
      const [movedTodo] = updated.splice(fromIndex, 1);
      updated.splice(toIndex, 0, movedTodo);
      return updated;
    });
  };

  const updatePriority = (
    todoId: number,
    newPriority: "low" | "medium" | "high"
  ) => {
    setTodos((prev) => {
      const updated = [...prev];
      const idx = updated.findIndex((t) => t.id === todoId);
      if (idx === -1) return prev;
      updated[idx] = { ...updated[idx], priority: newPriority };
      return updated;
    });
  };

  const handleDropTodo = (
    e: React.DragEvent<HTMLDivElement>,
    newStatus: string
  ) => {
    e.preventDefault();
    const draggedId = parseInt(e.dataTransfer.getData("todoId"), 10);
    if (isNaN(draggedId)) return;
    setTodos((prev) => {
      const updated = [...prev];
      const idx = updated.findIndex((t) => t.id === draggedId);
      if (idx === -1) return prev;
      updated[idx] = { ...updated[idx], status: newStatus };
      return updated;
    });
  };

  const getSortedTodosByStatus = (status: string) => {
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    return todos
      .filter((todo) => todo.status === status)
      .sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
  };

  return (
    <div className="w-full h-full py-5 ">
      <TodoInput
        addTodo={addTodo}
        input={input}
        setInput={setInput}
        editMode={editMode}
        priority={priority}
        setPriority={setPriority}
        destination={destination}
        setDestination={setDestination}
      />
      <div className="flex gap-4 w-full">
        {statuses.map((status) => (
          <KanbanColumn
            key={status}
            status={status}
            todos={getSortedTodosByStatus(status)}
            onDropTodo={handleDropTodo}
            deleteTodo={deleteTodo}
            editTodo={handleEditTodo}
            reorderTodo={reorderTodo}
            updatePriority={updatePriority}
          />
        ))}
      </div>
    </div>
  );
};
