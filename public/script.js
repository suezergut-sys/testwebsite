const targetDate = new Date('2028-09-01T00:00:00Z');
const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const secondsEl = document.getElementById('seconds');

const pad = (value, size = 2) => String(value).padStart(size, '0');
let countdownTimer;

function updateCountdown() {
  const diff = targetDate.getTime() - Date.now();

  if (diff <= 0) {
    daysEl.textContent = '0';
    hoursEl.textContent = '00';
    secondsEl.textContent = '00';

    if (countdownTimer) {
      clearInterval(countdownTimer);
    }
    return;
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const seconds = totalSeconds % 60;

  daysEl.textContent = days.toLocaleString();
  hoursEl.textContent = pad(hours);
  secondsEl.textContent = pad(seconds);
}

countdownTimer = setInterval(updateCountdown, 1000);
updateCountdown();
