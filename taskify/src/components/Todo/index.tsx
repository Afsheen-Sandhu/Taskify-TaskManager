"use client"
import React, { useState } from 'react'
import  {TodoInput}  from '../TodoCompononents' 
import  {TodoList}  from '../TodoCompononents' 
import  {TodoCard}  from '../TodoCompononents' 

interface Todo {
    id: number
    title: string
    description: string
    priority: 'low' | 'medium' | 'high'
    status: string
}



export const Todo = () => {
    const [todos, setTodos] =  useState<Todo[]>([])
    const [input, setInput] = useState('')
    const [editTodo, setEditTodo] = useState<Todo | null>(null)
    const [editMode, setEditMode] = useState(false)
    const [editTodoIndex, setEditTodoIndex] = useState<number | null>(null)
    const [priority, setPriority] = useState<'low' | 'medium' | 'high' | null>(null);
    const addTodo = (title: string, selectedPriority?: 'low' | 'medium' | 'high') => {
        if (editMode && editTodoIndex !== null) {
            // Update existing todo
            const updatedTodos = [...todos]
            updatedTodos[editTodoIndex] = {
                ...updatedTodos[editTodoIndex],
                title,
                priority: selectedPriority ?? updatedTodos[editTodoIndex].priority,
            }
            setTodos(updatedTodos)
            setPriority(null)
            setEditMode(false)
            setEditTodo(null)
            setEditTodoIndex(null)
            setInput('')
        } else {
            // Add new todo
            const newTodo: Todo = {
                id: Date.now(),
                title,
                description: '',
                priority: (selectedPriority ?? 'low'),
                status: 'pending'
            }
            setTodos([...todos, newTodo])
            setInput('')
            setPriority(null)
        }
    }
    const deleteTodo = (todoIndex: number) => {
        setTodos(todos.filter((_, index) => index !== todoIndex))
    }
    

    const handleEditTodo = (todoIndex: number) => {
        setEditTodo(todos[todoIndex] ?? null)
        setEditTodoIndex(todoIndex)
        setEditMode(true)
        setInput(todos[todoIndex]?.title ?? '')
        setPriority((todos[todoIndex] as Todo)?.priority ?? null)
    }

  return (
    <div className='w-full bg-base-300 h-full py-5 '>
        <TodoInput addTodo={addTodo} input={input} setInput={setInput} editMode={editMode} priority={priority} setPriority={setPriority} />
        <TodoList todos={todos} deleteTodo={deleteTodo} editTodo={handleEditTodo} />
        {/* <TodoPriority priority={priority} setPriority={setPriority} /> */}
    </div>
  )
}
