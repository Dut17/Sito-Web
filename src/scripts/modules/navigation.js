// Navigation toggle per mobile
const navToggle = document.querySelector('.nav__toggle');
const navList = document.querySelector('.nav__list');

if (navToggle && navList) {
  navToggle.addEventListener('click', () => {
    const isOpen = navList.classList.toggle('nav__list--open');
    navToggle.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  navList.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
      navList.classList.remove('nav__list--open');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navList.classList.contains('nav__list--open')) {
      navList.classList.remove('nav__list--open');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });
}