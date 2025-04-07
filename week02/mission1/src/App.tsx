import { TodoProvider } from "./context/TodoContext";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import DoneList from "./components/DoneList";
import "./style.css";

function App() {
  return (
    <TodoProvider>
      <div className="todo-container">
        <h1 className="todo-container__header">MILA TODO</h1>
        <TodoInput />
        <div className="render-container">
          <div className="render-container__section">
            <h2 className="render-container__title">할 일</h2>
            <TodoList />
          </div>
          <div className="render-container__section">
            <h2 className="render-container__title">완료</h2>
            <DoneList />
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
