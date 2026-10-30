// Small enhancements for the Alchemised page only.
document.querySelectorAll('.chapter-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    document.querySelectorAll('.chapter-nav a').forEach((item) => item.removeAttribute('aria-current'));
    link.setAttribute('aria-current', 'location');
  });
});
