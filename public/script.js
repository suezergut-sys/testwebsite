const letters = document.querySelectorAll('.headline span:not(.space)');

letters.forEach((letter, index) => {
  const delay = 150 * index;
  letter.style.animationDelay = `${delay}ms`;
});

document.addEventListener('DOMContentLoaded', () => {
  const subhead = document.querySelector('.subhead');
  const countdown = document.querySelector('.countdown');
  subhead.style.opacity = '0';
  subhead.animate(
    [
      { opacity: 0, transform: 'translateY(8px)' },
      { opacity: 1, transform: 'translateY(0)' },
    ],
    { duration: 900, delay: letters.length * 150 + 150, easing: 'ease', fill: 'forwards' }
  );

  const targetDate = new Date('2028-09-01T00:00:00Z');

  const updateCountdown = () => {
    const now = new Date();
    const diff = targetDate.getTime() - now.getTime();

    if (diff <= 0) {
      countdown.textContent = '00:00:00';
      return;
    }

    const dayMs = 1000 * 60 * 60 * 24;
    const hourMs = 1000 * 60 * 60;

    const days = Math.floor(diff / dayMs);
    const hours = Math.floor((diff % dayMs) / hourMs);
    const seconds = Math.floor((diff % hourMs) / 1000);

    const formatted = [
      days.toString().padStart(2, '0'),
      hours.toString().padStart(2, '0'),
      seconds.toString().padStart(2, '0'),
    ].join(':');

    countdown.textContent = formatted;
  };

  updateCountdown();
  setInterval(updateCountdown, 1000);
});
