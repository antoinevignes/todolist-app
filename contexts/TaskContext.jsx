import { createContext, useContext, useState } from "react";
import { data } from "@/data/tasks";

const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState(data);

  console.log(tasks);

  const handleAddTask = () => {
    if (input.trim()) {
      setTasks([
        ...tasks,
        { id: tasks.length + 1, title: input.trim(), completed: false },
      ]);
      setInput("");
    }
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        setTasks,
        input,
        setInput,
        handleAddTask,
        handleDelete,
        toggleTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTask() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTask must be used within a TaskProvider");
  }
  return context;
}
