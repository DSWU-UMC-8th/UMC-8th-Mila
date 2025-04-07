import { useTodoContext } from "../context/TodoContext";

function TodoList() {
  const { todos, completeTodo } = useTodoContext();

  return (
    <ul className="render-container__list">
      {todos.map((todo) => (
        <li className="render-container__item" key={todo.id}>
          <span className="render-container__item-text">{todo.text}</span>
          <button
            className="render-container__item-button"
            style={{ backgroundColor: "#28a745" }}
            onClick={() => completeTodo(todo.id)}
          >
            완료
          </button>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
