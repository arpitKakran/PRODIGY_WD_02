let startTime, elapsed = 0;
let timerInterval;

const display = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapList = document.getElementById('lapList');

function updateTime() {
  elapsed = Date.now() - startTime;
  display.textContent = formatTime(elapsed);
}

function formatTime(time) {
  const ms = time % 1000;
  time = Math.floor(time / 1000);
  const seconds = time % 60;
  time = Math.floor(time / 60);
  const minutes = time % 60;
  const hours = Math.floor(time / 60);

  const formattedHours = String(hours).padStart(2, '0');
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');
  const formattedMs = String(ms).padStart(3, '0');

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}.${formattedMs}`;
}

startBtn.addEventListener('click', () => {
  startTime = Date.now() - elapsed;
  timerInterval = setInterval(updateTime, 10);
  startBtn.disabled = true;
});

pauseBtn.addEventListener('click', () => {
  clearInterval(timerInterval);
  startBtn.disabled = false;
});

resetBtn.addEventListener('click', () => {
  clearInterval(timerInterval);
  elapsed = 0;
  display.textContent = "00:00:00.000";
  startBtn.disabled = false;
  lapList.innerHTML = "";
});

lapBtn.addEventListener('click', () => {
  if (!timerInterval) return;
  const lapTime = formatTime(elapsed);
  const li = document.createElement('li');
  li.textContent = lapTime;
  lapList.appendChild(li);
});
