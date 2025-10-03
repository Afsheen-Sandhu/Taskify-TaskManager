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
  addTodo: (
    todo: string,
    priority?: "low" | "medium" | "high" | null,
    destination?: string | null
  ) => void;
  input: string;
  setInput: (input: string) => void;
  editMode?: boolean;
  priority?: "low" | "medium" | "high" | null;
  setPriority?: (p: "low" | "medium" | "high" | null) => void;
  destination?: string | null;
  setDestination?: (d: string | null) => void;
}

const destinations = ["pending", "inprogress", "done"];

export const TodoInput = ({
  addTodo,
  input,
  setInput,
  editMode = false,
  priority = null,
  setPriority,
  destination = null,
  setDestination,
}: TodoInputProps) => {
  const handleAddTodo = () => {
    if (input.trim() === "") return;
    if (!priority) {
      toast.error("Please set Priority");
      return;
    }
    if (!destination) {
      toast.error("Please select destination");
      return;
    }

    addTodo(input, priority, destination);
    if (!editMode) {
      setInput("");
      setPriority && setPriority(null);
      setDestination && setDestination(null);
    }
  };

  return (
    <div className="w-full justify-center flex items-center gap-3 p-4 border-b border-base-200 bg-base-100 relative">
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter your task"
        className="flex  border-base-200 bg-base-200 text-base-content placeholder-neutral-content "
      />
      <Select
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
      <Select
        key={destination ?? "unset"}
        value={destination ?? undefined}
        onValueChange={(v) => setDestination && setDestination(v)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select Destination" />
        </SelectTrigger>
        <SelectContent>
          {destinations.map((dest) => (
            <SelectItem key={dest} value={dest}>
              {dest.charAt(0).toUpperCase() + dest.slice(1)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button size="sm" className="px-10" onClick={handleAddTodo}>
        {editMode ? "Update" : "Add"}
      </Button>
    </div>
  );
};
