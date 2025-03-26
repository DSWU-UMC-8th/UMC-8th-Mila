interface TodoItem {
  id: number;
  text: string;
  isDone: boolean;
}

const STORAGE_KEY = "my_todos";

const todoForm = document.querySelector<HTMLFormElement>("#todo-form")!;
const todoInput = document.querySelector<HTMLInputElement>("#todo-input")!;
const todoList = document.querySelector<HTMLUListElement>("#todo-list")!;
const doneList = document.querySelector<HTMLUListElement>("#done-list")!;

let todos: TodoItem[] = [];

const saved = localStorage.getItem(STORAGE_KEY);
if (saved) {
  try {
    todos = JSON.parse(saved);
  } catch (e) {
    console.error("❌ 저장된 데이터를 불러올 수 없습니다.", e);
  }
}

let nextId = todos.length > 0 ? Math.max(...todos.map((t) => t.id)) + 1 : 1;

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = todoInput.value.trim();
  if (!text) return;

  const newTodo: TodoItem = {
    id: nextId++,
    text,
    isDone: false,
  };

  todos.push(newTodo);
  renderTodos();
  todoInput.value = "";
});

function renderTodos() {
  todoList.innerHTML = "";
  doneList.innerHTML = "";

  todos.forEach((todo) => {
    const li = document.createElement("li");
    li.className = "todo-row";

    const textSpan = document.createElement("span");
    textSpan.className = "todo-text";
    textSpan.textContent = todo.text;

    const buttonGroup = document.createElement("div");
    buttonGroup.className = "todo-actions";

    if (!todo.isDone) {
      const completeBtn = document.createElement("button");
      completeBtn.textContent = "완료";
      completeBtn.className = "complete-btn";
      completeBtn.addEventListener("click", () => completeTodo(todo.id));
      buttonGroup.appendChild(completeBtn);
    } else {
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "삭제";
      deleteBtn.className = "delete-btn";
      deleteBtn.addEventListener("click", () => deleteTodo(todo.id));
      buttonGroup.appendChild(deleteBtn);
    }

    li.appendChild(textSpan);
    li.appendChild(buttonGroup);

    if (!todo.isDone) {
      todoList.appendChild(li);
    } else {
      doneList.appendChild(li);
    }
  });

  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function completeTodo(id: number) {
  const todo = todos.find((t) => t.id === id);
  if (todo) {
    todo.isDone = true;
    renderTodos();
  }
}

function deleteTodo(id: number) {
  todos = todos.filter((t) => t.id !== id);
  renderTodos();
}
