import * as apiHelpers from "./api-helpers.js";

const form = document.querySelector("form");
const todoList = document.querySelector("#todo-list");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const inputs = Object.fromEntries(formData);

  const result = await apiHelpers.createTodo({
    task: inputs.task,
    completed: false,
  });

  const todoItem = createViewFromTodo(result.payload);
  todoList.append(todoItem);
  event.target.reset();
});

function createViewFromTodo(todo) {
  const container = document.createElement("li");
  container.classList.add("container");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";

  checkbox.addEventListener("change", async (e) => {
    await apiHelpers.updateTodoById(todo.id, {
      task: todo.task,
      completed: e.target.checked,
    });
    container.classList.toggle("completed", e.target.checked);
  });

  const label = document.createElement("label");
  label.append(checkbox, todo.task);

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", async () => {
    await apiHelpers.deleteTodoById(todo.id);
    container.remove();
  });
  deleteButton.classList.add("delete");
  container.append(label, deleteButton);
  return container;
}

async function refreshTodos() {
  const result = await apiHelpers.getTodos();
  const todoItems = result.payload.map(createViewFromTodo);
  todoList.append(...todoItems);
}

await refreshTodos();
