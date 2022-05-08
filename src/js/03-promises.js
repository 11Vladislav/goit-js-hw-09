import { Notify } from 'notiflix/build/notiflix-notify-aio'; // подключаем библиотеку Notify

const form = document.querySelector('.form'); // получаем данные из формы
form.addEventListener('submit', onFormSubmit); // навешиваем обработчик на форму

const data = {}; // объект для хранения данных

function onFormSubmit(event) { // обработчик формы
  event.preventDefault(); // отменяем дефолтное поведение формы
  dataGrabber(event.currentTarget); // получаем данные из формы
  promiseRunner(); // запускаем промисы
  event.currentTarget.reset(); // очищаем форму
}

function createPromise(position, delay) { // создаем промис
  const shouldResolve = Math.random() > 0.3; // выбираем результат промиса
 
  return new Promise((resolve, reject) => { // возвращаем промис
    setTimeout(() => { // задержка
      if (shouldResolve) { // если промис выполнился
        resolve({ position, delay }); // возвращаем объект с данными
      } else { // если промис отклонился
        reject({ position, delay }); // возвращаем объект с данными
      }
    }, delay); // задержка
  });
}

function promiseRunner() { // запускаем промисы
  const { delay: firstDelay, step, amount } = data; // получаем данные из объекта
  let delay = firstDelay; // задаем начальную задержку
  
  for (let i = 1; i <= amount; i+=1) { // цикл для запуска промисов
    createPromise(i, delay).then(successPromise).catch(failurePromise); // запускаем промис
    delay += step; // изменяем задержку
  }
}

function dataGrabber(form) { // функция получения данные из формы
  [...form.elements].forEach(({ name, value }) => (data[name] = Number(value))); // получаем данные из формы
}


function successPromise({ position, delay }) { // обработчик промиса выполненного успешно
    Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`); // выводим уведомление
} 

function failurePromise({ position, delay }) { // обработчик промиса отклоненного
    Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`); // выводим уведомление
}