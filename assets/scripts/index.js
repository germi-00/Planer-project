// Date and time, using moment.js
const DATE = setInterval(function () {
    const D = moment().locale('ru').format('DD MMMM YYYY');
    const T = moment().format('HH:mm');
    document.getElementById('header__date_and_time__date').textContent = D;
    document.getElementById('hedaer__date_and_time__time').textContent = T;
}, 1000);

// Creating tasks and saving to localStorage
const taskInput = document.querySelector('.block__task__input__entry_field')
const taskList = document.querySelector('.task__text__list');
const addTaskButton = document.querySelector('.block__task__button__text');
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
function schowTaskList() {
    taskList.innerHTML = '';
    tasks.forEach(function (task, index) {
        const taskListItem = document.createElement('li');
        taskListItem.setAttribute('class', 'task__text__list-item');
        taskListItem.innerHTML = `<input type='checkbox' ${task.done ? 'checked' : ''} />
        <span>${task.text}</span> <button class="button__remove" onclick="removeTask(this)">Удалить</button><button class="button__archive">В архив</button>`;
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
        tasks.push({ text: listText, done: false, archived: false }); //добавила дополнительное свойство archived 
        taskInput.value = "";
        updateLocalStorage();
        schowTaskList();
    }
}
addTaskButton.addEventListener('click', createTask);
schowTaskList();

// Функция удаления задачи
function removeTask(event) {
    let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
    tasks.forEach(task => {
        if (task.task === event.parentNode.children[1].value) {
            tasks.splice(tasks.indexOf(task), 1);
        }
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    event.parentElement.remove();
}


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


//Функция отправки задачи в архив по клику на кнопку "Архив"
const archiveButtons = document.querySelectorAll('.button__archive');

archiveButtons.forEach(function (item, index) {
    item.addEventListener('click', function () {
        tasks[index].archived = !tasks[index].archived;
        updateLocalStorage();
    });
});
function updateLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}



