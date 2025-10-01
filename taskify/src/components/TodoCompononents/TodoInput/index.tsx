import React from "react";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
interface TodoInputProps {
  addTodo: (todo: string, priority?: "low" | "medium" | "high" | null) => void;
  input: string;
  setInput: (input: string) => void;
  editMode?: boolean;
  priority?: "low" | "medium" | "high" | null;
  setPriority?: (p: "low" | "medium" | "high" | null) => void;
}
export const TodoInput = ({
  addTodo,
  input,
  setInput,
  editMode = false,
  priority = null,
  setPriority,
}: TodoInputProps) => {
  const handleAddTodo = () => {
    if (input.trim() === "") return;
    if (!priority) {
      toast.error("Please set Priority");
      return;
    }

    addTodo(input, priority);
    if (!editMode) {
      setInput("");
      setPriority && setPriority(null);
    }
  };
  return (
    <div className="w-full justify-center flex items-center gap-3 p-4 border-b border-base-200 bg-base-100 relative">
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter your task"
        className="flex w-5xl border-base-200 bg-base-200 text-base-content placeholder-neutral-content "
      />
      <Select
        key={priority ?? "unset"}
        value={priority ?? undefined}
        onValueChange={(v) =>
          setPriority && setPriority(v as "low" | "medium" | "high")
        }
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Set Priority" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="low">Low</SelectItem>
          <SelectItem value="medium">Medium</SelectItem>
          <SelectItem value="high">High</SelectItem>
        </SelectContent>
      </Select>

      <Button size="lg" className="px-10" onClick={handleAddTodo}>
        {editMode ? "Update" : "Add"}
      </Button>
    </div>
  );
};
