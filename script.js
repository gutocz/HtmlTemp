const timerElement = document.getElementById('timer');
const inputSeconds = document.getElementById('inputSeconds');
const resetButton = document.getElementById('resetButton');

let countdown;
let secondsRemaining = 0;

timerElement.addEventListener('click', startTimer);
resetButton.addEventListener('click', resetTimer);

function startTimer() {
  if (countdown) {
    clearInterval(countdown);
  }

  secondsRemaining = parseInt(inputSeconds.value);
  if (isNaN(secondsRemaining)) {
    return;
  }

  countdown = setInterval(updateTimer, 1000);
  updateTimer();
  timerElement.removeEventListener('click', startTimer);
  timerElement.classList.add('running');
}

function updateTimer() {
  if (secondsRemaining <= 0) {
    clearInterval(countdown);
    timerElement.addEventListener('click', startTimer);
    timerElement.classList.remove('running');
    return;
  }

  secondsRemaining--;

  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  const displayMinutes = minutes.toString().padStart(2, '0');
  const displaySeconds = seconds.toString().padStart(2, '0');

  timerElement.textContent = `${displayMinutes}:${displaySeconds}`;
  updateTimerCircle();
}

function updateTimerCircle() {
  const circleElement = document.getElementById('timerCircle');
  const circleCircumference = 2 * Math.PI * (circleElement.getAttribute('r') - 5);
  const percentageRemaining = (secondsRemaining / parseInt(inputSeconds.value)) * 100;
  const strokeDashOffset = (circleCircumference * percentageRemaining) / 100;

  circleElement.style.strokeDashoffset = strokeDashOffset;
}

function resetTimer() {
  clearInterval(countdown);
  timerElement.textContent = '00:00';
  inputSeconds.value = '';
  timerElement.addEventListener('click', startTimer);
  timerElement.classList.remove('running');
}

