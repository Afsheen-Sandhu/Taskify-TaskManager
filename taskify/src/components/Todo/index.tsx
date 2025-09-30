"use client"
import React, { useState } from 'react'
import  {TodoInput}  from '../TodoCompononents' 
import  {TodoList}  from '../TodoCompononents' 
import  {TodoCard}  from '../TodoCompononents' 

interface Todo {
    id: number
    title: string
    description: string
    priority: string
    status: string
}



export const Todo = () => {
    const [todos, setTodos] =  useState<Todo[]>([])
    const [input, setInput] = useState('')
    const [editTodo, setEditTodo] = useState<Todo | null>(null)
    const [todoIndex, setTodoIndex] = useState<number | null>(null)
    const [editMode, setEditMode] = useState(false)
    const [editInput, setEditInput] = useState('')
    const [editTodoIndex, setEditTodoIndex] = useState<number | null>(null)
   const [priority , setPriority]= useState<string | null>(null)

    const addTodo = (todo: Todo) => {
        setTodos([...todos, todo])
    }
    const deleteTodo = (todoIndex: number) => {
        setTodos(todos.filter((_, index) => index !== todoIndex))
    }
    

    const handleEditTodo = (todoIndex: number) => {
        setEditTodo(todos[todoIndex] ?? null)
        setEditTodoIndex(todoIndex)
        setEditMode(true)
    }
    // const priority = (priority) => {
    //     setPriority(priority)
    // }
    // const setPriority = (priority) => {
    //     setPriority(priority)
    // }
  return (
    <div>
        <TodoInput addTodo={addTodo} input={input} setInput={setInput} />
        <TodoList todos={todos} deleteTodo={deleteTodo} editTodo={handleEditTodo} />
        {/* <TodoPriority priority={priority} setPriority={setPriority} /> */}
    </div>
  )
}
