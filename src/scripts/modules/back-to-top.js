// Mostra/nasconde il bottone torna su in base allo scroll
const backToTopBtn = document.getElementById('back-to-top');

if (backToTopBtn) {
  const SCROLL_THRESHOLD = 400;

  const toggleVisibility = () => {
    backToTopBtn.classList.toggle('back-to-top--visible', window.scrollY > SCROLL_THRESHOLD);
  };

  window.addEventListener('scroll', toggleVisibility, { passive: true });
  toggleVisibility();
}
