// Small page-only enhancement for section navigation.
document.querySelectorAll('.leaf-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    document.querySelectorAll('.leaf-nav a').forEach((item) => item.removeAttribute('aria-current'));
    link.setAttribute('aria-current', 'location');
  });
});
