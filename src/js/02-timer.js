import flatpickr from 'flatpickr';   // подключаем flatpickr
import 'flatpickr/dist/flatpickr.min.css'; // подключаем flatpickr стили
import { Notify } from 'notiflix/build/notiflix-notify-aio'; // подключаем библиотеку Notify

class Timer { // создаем класс Timer
  constructor({ selector, date }) { // принимаем параметры из конструктора
    this.selector = document.querySelector(selector); // получаем селектор из конструктора
    this.date = date.getTime(); // получаем дату из конструктора
    this.intervalId = null; // переменная для хранения интервала
    this.getRefs(); // вызываем метод getRefs для получения ссылок на элементы
  }

  start() { // метод для запуска таймера
    this.intervalId = setInterval(() => { // запускаем интервал
      if (this.date < Date.now()) { // если дата меньше текущей даты
        clearInterval(this.intervalId); // останавливаем интервал
        Notify.success('Время истекло!'); // выводим сообщение об успехе
        return; // выходим из метода
      }
      this.updateTime(); // вызываем метод updateTime
    }, 1000); // интервал в 1 секунду
  }

  getRefs() { // метод для получения ссылок на элементы
    this.refs = { // присваиваем переменной refs объект
      days: this.selector.querySelector('[data-days]'), // получаем ссылку на элемент с атрибутом data-days
      hours: this.selector.querySelector('[data-hours]'), // получаем ссылку на элемент с атрибутом data-hours
      minutes: this.selector.querySelector('[data-minutes]'), // получаем ссылку на элемент с атрибутом data-minutes
      seconds: this.selector.querySelector('[data-seconds]'), // получаем ссылку на элемент с атрибутом data-seconds
    };
  }
  updateTime() { // метод для обновления времени
    const { days, hours, minutes, seconds } = this.convertMs(this.date - Date.now()); // получаем оставшиеся дни, часы, минуты и секунды
    this.refs.days.textContent = this.addLeadingZero(days); // присваиваем значение дней
    this.refs.hours.textContent =  this.addLeadingZero(hours); // присваиваем значение часов
    this.refs.minutes.textContent =  this.addLeadingZero(minutes); // присваиваем значение минут
    this.refs.seconds.textContent =  this.addLeadingZero(seconds); // присваиваем значение секунд
  }

  addLeadingZero(value) { // метод для добавления нуля перед числом
    return String(value).padStart(2, '0'); // добавляем нули перед числом
  }

  convertMs(ms) { // метод для перевода миллисекунд в дни, часы, минуты и секунды
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds }; // возвращаем объект с днями, часами, минутами и секундами
}
}

const dateSelect = document.querySelector('#datetime-picker'); // получаем ссылку на элемент с атрибутом id datetime-picker
const startBtn = document.querySelector('[data-start]'); // получаем ссылку на элемент с атрибутом data-start

  startBtn.addEventListener('click', startClickHandler); // при клике на элемент с атрибутом data-start вызываем метод startClickHandler

    flatpickr('#datetime-picker', { // привязываем к элементу с атрибутом id datetime-picker плагин flatpickr
  enableTime: true, // включаем время
  time_24hr: true, // включаем 24-часовой формат
  defaultDate: new Date(), // по умолчанию выбираем текущую дату
  minuteIncrement: 1, // частота инкремента минут
  onClose(selectedDates) { // при закрытии календаря
    dateCheck(selectedDates[0]); // вызываем метод dateCheck
  }
});

function startClickHandler() { // метод для обработки клика на элемент с атрибутом data-start
  const timer = new Timer({ selector: '.timer', date: new Date (dateSelect.value) }); // создаем новый объект Timer
  timer.start.call(timer); // вызываем метод start объекта timer
  startBtn.disabled = true; // делаем кнопку неактивной
}

function dateCheck(date) { // метод для проверки введенной даты
  if (date.getTime() > Date.now()) { // если введенная дата больше текущей
    startBtn.disabled = false; // делаем кнопку активной
    return; // выходим из функции
  }
  startBtn.disabled = true; // делаем кнопку неактивной
  Notify.failure('Выберите дату больше текущей'); // выводим сообщение об ошибке
}