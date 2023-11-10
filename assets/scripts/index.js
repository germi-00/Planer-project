// Date and time, using moment.js
const DATE = moment().locale('ru').format('DD MMMM YYYY');
const TIME = moment().format('HH:mm');
document.getElementById('header__date_and_time__date').textContent = DATE;
document.getElementById('hedaer__date_and_time__time').textContent = TIME;