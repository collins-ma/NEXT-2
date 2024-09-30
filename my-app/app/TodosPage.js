'use client';

import axios from "axios";
import { useState } from "react";

function TodosPage({ initialTodos }) {
  const [todos, setTodos] = useState(initialTodos);
  const [newTodo, setNewTodo] = useState("");

  const createTodo = async () => {
    if (!newTodo) return;
  
    const res = await axios.post("http://localhost:3000/todos", {
      title: newTodo,
      completed: false,
    });
  
    // Add the newly created Todo to the state
    setTodos([res.data, ...todos]);
    setNewTodo("");
  };
  
  

  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:5000/todos/${id}`);
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleTodo = async (id, completed) => {
    const res = await axios.patch(`http://localhost:5000/todos/${id}`, {
      completed: !completed,
    });
    setTodos(todos.map((todo) => (todo.id === id ? res.data : todo)));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Todo List (ISR)</h1>

      <div className="mb-4">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
          className="border p-2 rounded w-full"
        />
        <button
          onClick={createTodo}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Add Todo
        </button>
      </div>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className="mb-2 flex items-center justify-between">
            <span
              className={`cursor-pointer text-lg ${todo.completed ? "line-through" : ""}`}
              onClick={() => toggleTodo(todo.id, todo.completed)}
            >
              {todo.title}
            </span>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="ml-2 px-2 py-1 bg-red-500 text-white rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodosPage;

 
