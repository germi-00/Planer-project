// Date and time, using moment.js
const DATE = moment().locale('ru').format('DD MMMM YYYY');
const TIME = moment().format('HH:mm');
document.getElementById('header__date_and_time__date').textContent = DATE;
document.getElementById('hedaer__date_and_time__time').textContent = TIME;

// Creating tasks and saving to localStorage
const taskInput = document.querySelector('.block__task__input__entry_field')
const taskList = document.querySelector('.task__text__list');
const addTaskButton = document.querySelector('.block__task__button__text');
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
function schowTaskList() {
    taskList.innerHTML = '';
    tasks.forEach(function (task, index) {
        const taskListItem = document.createElement('li');
        taskListItem.innerHTML = `<input type='checkbox' ${task.done ? 'checked' : ''} />
        <span>${task.text}</span>`;
        taskListItem.querySelector('input').addEventListener('change', function () {
            tasks[index].done = this.checked;
            updateLocalStorage();
        });
        taskList.append(taskListItem);
    });
};
function updateLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
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
addTaskButton.addEventListener('click', createTask);
schowTaskList();

//Добавить новый тег
const addTagButton = document.querySelector('#button__add_new_tag');
const tagInput = document.querySelector('#tag__input');

const tagList = document.querySelector('#tagList__input');

function addNewTag() {
    let newTag = tagInput.value;
    let tagListItem = document.createElement('option');
    tagListItem.value = newTag;
    tagList.append(tagListItem);
    tagInput.value = "";
}
addTagButton.addEventListener('click', addNewTag);
