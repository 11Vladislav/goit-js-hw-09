const refs = {
    startButton: document.querySelector('button[data-start]'), // кнопка запуска
    stopButton: document.querySelector('button[data-stop]'), // кнопка остановки
    body: document.querySelector('body'), // тело страницы
};

refs.startButton.addEventListener('click', startChangingColor); // запускаем функцию при нажатии на кнопку
refs.stopButton.addEventListener('click', stopChangingColor); // останавливаем функцию при нажатии на кнопку

let intervalId = null;  // записываем данные с функции интервал в переменную

function startChangingColor() { // запускаем функцию при нажатии на кнопку
    refs.startButton.setAttribute('disabled', true); // делаем кнопку неактивной
    refs.stopButton.removeAttribute('disabled'); // делаем кнопку активной
    intervalId = setInterval(changeColor, 1000); // запускаем функцию интервал
}

function stopChangingColor() { // останавливаем функцию при нажатии на кнопку
    refs.startButton.removeAttribute('disabled'); // делаем кнопку активной
    refs.stopButton.setAttribute('disabled', true); // делаем кнопку неактивной
    clearInterval(intervalId); // останавливаем функцию интервал
}

function changeColor() { // функция изменения цвета
    refs.body.style.backgroundColor = getRandomHexColor(); // меняем цвет фона
}

function getRandomHexColor() { // функция генерации цвета
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`; // генерируем цвет
}
