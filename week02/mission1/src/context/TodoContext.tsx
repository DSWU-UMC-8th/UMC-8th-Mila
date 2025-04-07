import { createContext, useContext, useState, ReactNode } from "react";

interface Task {
  id: number;
  text: string;
}

interface TodoContextProps {
  todos: Task[];
  dones: Task[];
  addTodo: (text: string) => void;
  completeTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
}

const TodoContext = createContext<TodoContextProps | undefined>(undefined);

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<Task[]>([]);
  const [dones, setDones] = useState<Task[]>([]);

  const addTodo = (text: string) => {
    const newTodo = { id: Date.now(), text };
    setTodos([...todos, newTodo]);
  };

  const completeTodo = (id: number) => {
    const completed = todos.find((t) => t.id === id);
    if (completed) {
      setTodos(todos.filter((t) => t.id !== id));
      setDones([...dones, completed]);
    }
  };

  const deleteTodo = (id: number) => {
    setDones(dones.filter((t) => t.id !== id));
  };

  return (
    <TodoContext.Provider
      value={{ todos, dones, addTodo, completeTodo, deleteTodo }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context)
    throw new Error("useTodoContext must be used within TodoProvider");
  return context;
};
