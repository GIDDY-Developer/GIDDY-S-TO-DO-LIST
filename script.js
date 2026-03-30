const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");
const count = document.getElementById("task-count");
const clearBtn = document.getElementById("clear-completed");
const filterButtons = document.querySelectorAll(".filters button");

let todos = [];
let currentFilter = "all";

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const text = input.value.trim();
  if (text === "") return;

  todos.push({ text, completed: false });
  input.value = "";

  render();
});

function render() {
  list.innerHTML = "";

  let filtered = todos.filter(todo => {
    if (currentFilter === "active") return !todo.completed;
    if (currentFilter === "completed") return todo.completed;
    return true;
  });

  filtered.forEach((todo, index) => {
    const li = document.createElement("li");
    if (todo.completed) li.classList.add("completed");

    const span = document.createElement("span");
    span.textContent = todo.text;
    span.addEventListener("click", () => {
      todo.completed = !todo.completed;
      render();
    });

    const delBtn = document.createElement("button");
    delBtn.textContent = "X";
    delBtn.addEventListener("click", () => {
      todos.splice(index, 1);
      render();
    });

    li.appendChild(span);
    li.appendChild(delBtn);
    list.appendChild(li);
  });

  updateCount();
}

function updateCount() {
  const active = todos.filter(t => !t.completed).length;
  count.textContent = `${active} task(s) left`;
}

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    currentFilter = btn.dataset.filter;
    render();
  });
});

clearBtn.addEventListener("click", () => {
  todos = todos.filter(todo => !todo.completed);
  render();
});