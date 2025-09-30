import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface TodoInputProps {
  addTodo: (todo: string) => void;
  input: string;
  setInput: (input: string) => void;
}
export const TodoInput = ({ addTodo, input, setInput }: TodoInputProps) => {

  const handleAddTodo = () => {
    if (input.trim() === '') return;
    addTodo(input);
    setInput('');
  };
  return (
    <header className="w-full flex items-center gap-3 p-4 border-b border-gray-800 bg-gray-900">
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter your task"
        className="flex-1 border-gray-700 bg-gray-800 text-gray-100 placeholder-gray-400"
      />
      <Button onClick={handleAddTodo} >
        Add
      </Button>
    </header>
  );
};


