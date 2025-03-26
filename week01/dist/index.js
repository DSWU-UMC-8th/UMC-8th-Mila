"use strict";
const STORAGE_KEY = "my_todos";
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const doneList = document.querySelector("#done-list");
let todos = [];
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
  const newTodo = {
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
    li.className = "todo-row"; // ✅ 스타일 먹일 클래스

    const textSpan = document.createElement("span");
    textSpan.className = "todo-text";
    textSpan.textContent = todo.text;

    const buttonGroup = document.createElement("div");
    buttonGroup.className = "todo-actions"; // ✅ 버튼 묶음

    if (!todo.isDone) {
      const completeBtn = document.createElement("button");
      completeBtn.textContent = "완료";
      completeBtn.className = "complete-btn"; // ✅ 클래스 추가
      buttonGroup.appendChild(completeBtn);
      completeBtn.addEventListener("click", () => completeTodo(todo.id));
    } else {
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "삭제";
      deleteBtn.className = "delete-btn"; // ✅ 클래스 추가
      buttonGroup.appendChild(deleteBtn);
      deleteBtn.addEventListener("click", () => deleteTodo(todo.id));
    }

    li.appendChild(textSpan);
    li.appendChild(buttonGroup); // ✅ 버튼 박스 포함
    (todo.isDone ? doneList : todoList).appendChild(li);
  });

  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function completeTodo(id) {
  const todo = todos.find((t) => t.id === id);
  if (todo) {
    todo.isDone = true;
    renderTodos();
  }
}
function deleteTodo(id) {
  todos = todos.filter((t) => t.id !== id);
  renderTodos();
}
