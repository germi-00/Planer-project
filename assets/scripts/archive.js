const jsStore = localStorage.getItem('tasks');
const allTasks = JSON.parse(jsStore);
const archiveTaskList = document.querySelector('.task__text__list');
const button = document.querySelectorAll('.button__archive');

console.log(allTasks);

// Функция поиска заархивированных задач
const filteredArchive = allTasks.filter(function (item) {
    return item.archived === true;
});

console.log(filteredArchive);

//Извлечение элемента text
const archivedTasks = filteredArchive.map(function (item) {
    return item.text;
});

console.log(archivedTasks);

//Функция добавления заархивированной задачи на сайт
archivedTasks.forEach(text => {
    const listItem = document.createElement('li');
    listItem.setAttribute('class', 'task__text__list-item');
    listItem.innerHTML = `${text} <button class="button__remove_from_archive">Разархивировать</button>`;
    archiveTaskList.append(listItem);
});

//Функция возвращения архивной задачи в актуальный лист задач (пока тестовый режим)
const removeFromArchive = document.querySelectorAll('.button__remove_from_archive');

console.log(removeFromArchive);

removeFromArchive.forEach(function (item, index) {
    item.addEventListener('click', function () {
        allTasks[index].archived = false;
        updateLocalStorage();
    });
});
function updateLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(allTasks));
}

//Функция подсчета кол-ва завершенных задач
//Получение завершенных задач
const doneTasks = allTasks.filter(function (item) {
    return item.done === true;
});

console.log(doneTasks);

const taskCounter = document.querySelector('.block_counter_element_number');
console.log(taskCounter);

taskCounter.textContent = doneTasks.length;







