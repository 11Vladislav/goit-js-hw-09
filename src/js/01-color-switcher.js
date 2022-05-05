const refs = {
    startButton: document.querySelector('button[data-start]'),
    stopButton: document.querySelector('button[data-stop]'),
    body: document.querySelector('body'),
};

refs.startButton.addEventListener('click', startChangingColor);
refs.stopButton.addEventListener('click', stopChangingColor);

let intervalId = null;  

function startChangingColor() {
    refs.startButton.setAttribute('disabled', true);
    refs.stopButton.removeAttribute('disabled');
    intervalId = setInterval(changeColor, 1000);
}

function stopChangingColor() {
    refs.startButton.removeAttribute('disabled');
    refs.stopButton.setAttribute('disabled', true);
    clearInterval(intervalId);
}

function changeColor() {
    refs.body.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
