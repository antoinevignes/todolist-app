import { createContext, useContext, useState } from "react";
import { data } from "@/data/tasks";

const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);

  const handleAddTask = () => {
    if (input.trim()) {
      const newId = tasks.length > 0 ? tasks[0].id + 1 : 1;
      setTasks([{ id: newId, title: input, completed: false }, ...tasks]);
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
