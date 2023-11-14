const jsArchive = localStorage.getItem('tasks');
const archive = JSON.parse(jsArchive);
const archiveTaskList = document.querySelector('.task__text__list');

console.log(archive);

// Функция поиска выполненных задач
const filteredArchive = archive.filter(function (item) {
    return item.done === true;
});

console.log(filteredArchive);

//Извлечение элемента text
const archivedTasks = filteredArchive.map(function (item) {
    return item.text;
});

console.log(archivedTasks);

//Функция добавления выполненной задачи на сайт
archivedTasks.forEach(text => {
    const listItem = document.createElement('li');
    listItem.textContent = text;
    archiveTaskList.append(listItem);
});


