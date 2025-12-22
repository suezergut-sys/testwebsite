const letters = document.querySelectorAll('.headline span:not(.space)');

letters.forEach((letter, index) => {
  const delay = 150 * index;
  letter.style.animationDelay = `${delay}ms`;
});

document.addEventListener('DOMContentLoaded', () => {
  const subhead = document.querySelector('.subhead');
  subhead.style.opacity = '0';
  subhead.animate(
    [
      { opacity: 0, transform: 'translateY(8px)' },
      { opacity: 1, transform: 'translateY(0)' },
    ],
    { duration: 900, delay: letters.length * 150 + 150, easing: 'ease', fill: 'forwards' }
  );
});
