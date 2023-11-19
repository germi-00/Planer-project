const jsStore = localStorage.getItem('tasks');
const allTasks = JSON.parse(jsStore);
const archiveTaskList = document.querySelector('.task__text__list');
const button = document.querySelectorAll('.button__archive');
const taskCounter = document.querySelector('.block_counter_element_number');
const removeFromArchive = document.querySelectorAll('.button__remove_from_archive');

// Функция поиска заархивированных задач
const filteredArchive = allTasks.filter(function (item) {
    return item.archived === true;
});


//Извлечение элемента text
const archivedTasks = filteredArchive.map(function (item) {
    return item.text;
});


//Функция добавления заархивированной задачи на сайт
archivedTasks.forEach(text => {
    const listItem = document.createElement('li');
    listItem.setAttribute('class', 'task__text__list-item');
    listItem.innerHTML = `${text} <button class="button__remove_from_archive">Удалить</button>`;
    archiveTaskList.append(listItem);
});

//Функция удаления архивной задачи
removeFromArchive.forEach(function (button, index) {
    button.addEventListener('click', function () {
        allTasks[index].archived = !allTasks[index].archived;
        updateLocalStorage();
    });
});
function updateLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(allTasks));
}


//Получение завершенных задач
const doneTasks = allTasks.filter(function (item) {
    return item.done === true;
});

//Подсчет кол-ва завершенных задач 
taskCounter.textContent = doneTasks.length;







