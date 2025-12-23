const targetDate = new Date('2028-09-01T00:00:00Z');
const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const secondsEl = document.getElementById('seconds');

function pad(value, size = 2) {
  return String(value).padStart(size, '0');
}

function updateCountdown() {
  const now = new Date();
  const diff = targetDate.getTime() - now.getTime();

  if (diff <= 0) {
    daysEl.textContent = '0';
    hoursEl.textContent = '00';
    secondsEl.textContent = '0000';
    return;
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const seconds = totalSeconds % 3600; // remaining seconds after hours

  daysEl.textContent = days.toLocaleString();
  hoursEl.textContent = pad(hours);
  secondsEl.textContent = pad(seconds, 4);
}

updateCountdown();
setInterval(updateCountdown, 1000);
