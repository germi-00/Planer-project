// Date and time, using moment.js
const DATE = moment().locale("ru").format("DD MMMM YYYY");
const TIME = moment().format("HH:mm");
document.getElementById("header__date_and_time__date").textContent = DATE;
document.getElementById("hedaer__date_and_time__time").textContent = TIME;

// Creating tasks and saving to localStorage
const taskInput = document.querySelector(".block__task__input__entry_field");
const taskList = document.querySelector(".task__text__list");
const addTaskButton = document.querySelector(".block__task__button__text");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
function schowTaskList() {
  taskList.innerHTML = "";
  tasks.forEach(function (task, index) {
    const taskListItem = document.createElement("li");
    taskListItem.innerHTML = `<input type='checkbox' ${
      task.done ? "checked" : ""
    } />
        <span>${task.text}</span>`;
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
    tasks.push({ text: listText, done: false });
    taskInput.value = "";
    updateLocalStorage();
    schowTaskList();
  }
}
addTaskButton.addEventListener("click", createTask);
schowTaskList();

let stopwatch = document.getElementById("stopwatch");
let startBtn = document.getElementById("startBtn");
let pauseBtn = document.getElementById("pauseBtn");
let resetBtn = document.getElementById("resetBtn");

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

startBtn.addEventListener("click", () => {
  interval = setInterval(updateTime, 1000);
  startBtn.disabled = true;
  pauseBtn.disabled = false;
  resetBtn.disabled = false;
});

pauseBtn.addEventListener("click", () => {
  clearInterval(interval);
  startBtn.disabled = false;
  pauseBtn.disabled = true;
});

resetBtn.addEventListener("click", () => {
  clearInterval(interval);
  seconds = 0;
  minutes = 0;
  hours = 0;
  stopwatch.textContent = "00:00:00";
  startBtn.disabled = false;
  pauseBtn.disabled = true;
  resetBtn.disabled = true;
});
