"use client";
import React, { useState, useEffect } from "react";
import { TodoInput } from "../TodoCompononents";
import { KanbanColumn } from "../TodoCompononents/KanbanColumn";
import type { Priority, Status, Todo as TodoType } from "@/types/todo";

export const Todo = () => {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [input, setInput] = useState("");
  const [editTodo, setEditTodo] = useState<TodoType | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [editTodoIndex, setEditTodoIndex] = useState<number | null>(null);
  const [priority, setPriority] = useState<Priority | null>(
    null
  );
  const [destination, setDestination] = useState<Status | null>(null);

  const statuses: Status[] = ["pending", "in progress", "done"];

  const LOCAL_STORAGE_KEY = "taskify.todos";

  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem(LOCAL_STORAGE_KEY) : null;
      if (!raw) return;
      const parsed: unknown = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        // Basic shape validation
        const validTodos = parsed.filter((t: any) =>
          t && typeof t.id === "number" && typeof t.title === "string" &&
          (t.priority === "low" || t.priority === "medium" || t.priority === "high") &&
          (t.status === "pending" || t.status === "in progress" || t.status === "done")
        );
        setTodos(validTodos as TodoType[]);
      }
    } catch (_) {
    }
  }, []);
  useEffect(() => {
    try {
      if (typeof window === "undefined") return;
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
    } catch (_) {
    }
  }, [todos]);

  const addTodo = (
    todo: string,
    priority?: Priority | null,
    destinationParam?: Status | null
  ) => {
    if (editMode && editTodoIndex !== null) {
      const updatedTodos = [...todos];
      updatedTodos[editTodoIndex] = {
        ...updatedTodos[editTodoIndex],
        title: todo,
        priority: (priority as Priority) ?? updatedTodos[editTodoIndex].priority,
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
      const newTodo: TodoType = {
        id: Date.now(),
        title: todo,
        priority: (priority as Priority) ?? "low",
        status: (destinationParam as Status) ?? "pending",
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
    setPriority((todos[todoIndex] as TodoType)?.priority ?? null);
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
    newPriority: Priority
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
    newStatus: Status
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

  const getSortedTodosByStatus = (status: Status) => {
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
