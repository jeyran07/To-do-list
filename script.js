const taskInput = document.getElementById("taskInput");
const todoList = document.getElementById("todoList");
const completedList = document.getElementById("completedList");
const prioritySelect = document.getElementById("priority");

document.getElementById("date").textContent = new Date().toLocaleDateString(
  "id-ID",
  {
    year: "numeric",
    month: "long",
    weekday: "long",
    day: "numeric",
  }
);

function getFormattedDateTime() {
  const now = new Date();
  return now.toLocaleString("id-ID", {
    year: "numeric",
    month: "long",
    weekday: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

function addTask() {
  const text = taskInput.value.trim();
  const priority = prioritySelect.value;
  if (!text) return;

  taskCount++;
  const timestamp = getFormattedDateTime();

  const item = document.createElement("div");
  item.className = `todo-item priority-${priority}`;
  item.innerHTML = `
    <div>
      <span><strong>${taskCount}.</strong> ${text}</span>
      <div class="timestamp"> ${timestamp}</div>
    </div>
    <div class="task-buttons">
      <button onclick="markDone(this.parentElement.parentElement)" class="markDone">Done</button>
      <button onclick="deleteTask(this.parentElement.parentElement)" class="delete">Delete</button>
    </div>
  `;
  todoList.appendChild(item);
  taskInput.value = "";
}
let taskCount = 0;

function markDone(item) {
  const text = item.querySelector("span").textContent.replace(/^\d+\.\s/, "");
  const timestamp = item.querySelector(".timestamp").textContent;
  const priorityClass = Array.from(item.classList).find((cls) =>
    cls.startsWith("priority-")
  );

  item.remove();
  doneCount++;

  const doneItem = document.createElement("div");
  doneItem.className = `todo-item done ${priorityClass}`;
  doneItem.innerHTML = `
    <div>
      <span><strong>${doneCount}.</strong> ${text}</span>
      <div class="timestamp">${timestamp}</div>
    </div>
    <div class="task-buttons">
      <button onclick="undoTask(this.parentElement.parentElement, '${priorityClass}', '${timestamp}')" class="undo">Undo</button>
      <button onclick="deleteTask(this.parentElement.parentElement)" class="deleteDone">Delete</button>
    </div>
  `;
  completedList.appendChild(doneItem);
}

let doneCount = 0;

function deleteTask(item) {
  item.remove();
}

function undoTask(item, priorityClass, timestamp) {
  const text = item.querySelector("span").textContent.replace(/^\d+\.\s/, "");

  item.remove();
  taskCount++;

  const newItem = document.createElement("div");
  newItem.className = `todo-item ${priorityClass}`;
  newItem.innerHTML = `
    <div>
      <span><strong>${taskCount}.</strong> ${text}</span>
      <div class="timestamp">${timestamp}</div>
    </div>
    <div class="task-buttons">
      <button onclick="markDone(this.parentElement.parentElement)" class="markDone">Done</button>
      <button onclick="deleteTask(this.parentElement.parentElement)" class="delete">Delete</button>
    </div>
  `;
  todoList.appendChild(newItem);
}

function deleteAllTasks() {
  todoList.innerHTML = "";
  completedList.innerHTML = "";
  taskCount = 0;
  doneCount = 0;
}
