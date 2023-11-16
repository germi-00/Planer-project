// Date and time, using moment.js
const DATE = setInterval(function () {
  const D = moment().locale("ru").format("DD MMMM YYYY");
  const T = moment().format("HH:mm");
  document.getElementById("header__date_and_time__date").textContent = D;
  document.getElementById("hedaer__date_and_time__time").textContent = T;
}, 1000);

//Секундомер

let stopwatch = document.querySelector(".task__stopwatch");
let startBtn = document.querySelector(".task__startBtn");
let pauseBtn = document.querySelector(".task__pauseBtn");
let resetBtn = document.querySelector(".task__resetBtn");
let saveBtn = document.querySelector(".task__saveBtn");
let seconds = 0;
let minutes = 0;
let hours = 0;
let interval;

function updateTime() {
  seconds++;
  if (seconds === 60) {
    minutes++;
    seconds = 0;
  }
  if (minutes === 60) {
    hours++;
    minutes = 0;
  }
  stopwatch.textContent = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

function startCount() {
  interval = setInterval(updateTime, 1000);
  startBtn.disabled = true;
  pauseBtn.disabled = false;
  resetBtn.disabled = false;
  saveBtn.disabled = false;
}

function pauseCount() {
  clearInterval(interval);
  startBtn.disabled = false;
  pauseBtn.disabled = true;
  saveBtn.disabled = false;
}

function resetCount() {
  clearInterval(interval);
  seconds = 0;
  minutes = 0;
  hours = 0;
  stopwatch.textContent = "00:00:00";
  startBtn.disabled = false;
  pauseBtn.disabled = true;
  resetBtn.disabled = true;
  saveBtn.disabled = true;
}

// Creating tasks and saving to localStorage
const taskInput = document.querySelector(".block__task__input__entry_field");
const taskList = document.querySelector(".task__text__list");
const addTaskButton = document.querySelector(".block__task__button__text");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
function schowTaskList() {
  taskList.innerHTML = "";
  tasks.forEach(function (task, index) {
    const taskListItem = document.createElement("li");
    taskListItem.setAttribute("class", "task__text__list-item");
    taskListItem.innerHTML = `<input type='checkbox' ${
      task.done ? "checked" : ""
    } />
        <span>${
          task.text
        }</span> <button class="button__remove" onclick="removeTask(this)">Удалить</button><button class="button__archive">В архив</button>
        <span>Секундомер: <span class="task__stopwatch">
          ${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}
        </span></span>
        <button class="task__startBtn" onclick="startCount()">Старт</button>
        <button class="task__pauseBtn" onclick="pauseCount(this)" disabled>Пауза</button>
        <button class="task__resetBtn" onclick="resetCount(this)" disabled>Сброс</button>
        <button class="task__saveBtn" onclick="saveCount(this)" disabled>Сохранить</button>`;

    taskListItem.querySelector("input").addEventListener("change", function () {
      tasks[index].done = this.checked;
      updateLocalStorage();
    });
    taskList.append(taskListItem);
  });
}
function updateLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
// Функция добавления задачи
function createTask() {
  let listText = taskInput.value.trim();
  if (listText) {
    tasks.push({
      text: listText,
      done: false,
      stopwatch: `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`,
    });
    taskInput.value = "";
    updateLocalStorage();
    schowTaskList();
  }
}
addTaskButton.addEventListener("click", createTask);
schowTaskList();

// Функция удаления задачи
function removeTask(event) {
  let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
  tasks.forEach((task) => {
    if (task.task === event.parentNode.children[1].value) {
      tasks.splice(tasks.indexOf(task), 1);
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  event.parentElement.remove();
}

//Добавить новый тег
const addTagButton = document.querySelector("#button__add_new_tag");
const tagInput = document.querySelector("#tag__input");

const tagList = document.querySelector("#tagList__input");

function addNewTag() {
  let newTag = tagInput.value;
  let tagListItem = document.createElement("option");
  tagListItem.value = newTag;
  tagList.append(tagListItem);
  tagInput.value = "";
}
addTagButton.addEventListener("click", addNewTag);
