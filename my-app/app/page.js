import TodosPage from "./TodosPage";

async function getTodos() {
  const res = await fetch("http://localhost:5000/todos", {
    next: { revalidate: 60 }, // ISR: Revalidate every 60 seconds
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  
  const todos = await res.json();
  return todos;
}

export default async function Page() {
  const todos = await getTodos(); // Fetch data server-side with ISR
  return <TodosPage initialTodos={todos} />;
}
