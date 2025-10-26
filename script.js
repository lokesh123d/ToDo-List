const input = document.querySelector("#inpttask");
const addBtn = document.querySelector("#add");
const ul = document.createElement("ul");

ul.className = "task-list";

const container = document.querySelector('.card') || document.querySelector('.main') || document.body;
container.appendChild(ul);

let tasks = [];

function load() {
  const raw = localStorage.getItem("tasks");
  if (!raw) return;
  try {
    tasks = JSON.parse(raw);
  } catch (e) {
    tasks = [];
  }
}

function save() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function render() {
  ul.innerHTML = "";
  tasks.forEach((task, i) => {
  const li = document.createElement("li");
  li.className = "task-item";

  const chk = document.createElement("input");
  chk.type = "checkbox";
  chk.className = "checkbox";
    chk.addEventListener("change", () => {
      tasks[i].completed = chk.checked;
      save();
      render();
    });

  const span = document.createElement("span");
  span.className = "task-text";
  span.textContent = task.text;
  if (task.completed) li.classList.add('completed');

  const del = document.createElement("button");
  del.className = "delete-btn";
  del.textContent = "Delete";
    del.addEventListener("click", () => {
      tasks.splice(i, 1);
      save();
      render();
    });

    li.appendChild(chk);
    const left = document.createElement('div');
    left.className = 'task-left';
    left.appendChild(span);
    li.appendChild(left);
    li.appendChild(del);
    ul.appendChild(li);
  });
}

if (addBtn)
  addBtn.addEventListener("click", function add() {
    const val = input.value.trim();
    if (!val) return;
    tasks.push({ text: val, completed: false });
    save();
    render();
    input.value = "";
    input.focus();
  });

load();
render();
