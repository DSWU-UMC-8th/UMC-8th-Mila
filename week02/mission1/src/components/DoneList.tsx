import { useTodoContext } from "../context/TodoContext";

function DoneList() {
  const { dones, deleteTodo } = useTodoContext();

  return (
    <ul className="render-container__list">
      {dones.map((done) => (
        <li className="render-container__item" key={done.id}>
          <span className="render-container__item-text">{done.text}</span>
          <button
            className="render-container__item-button"
            style={{ backgroundColor: "#dc3545" }}
            onClick={() => deleteTodo(done.id)}
          >
            삭제
          </button>
        </li>
      ))}
    </ul>
  );
}

export default DoneList;
