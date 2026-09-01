// Reveal on scroll
const els = document.querySelectorAll('.hero__eyebrow, .hero__title, .hero__description, .hero__status, .hero__actions, .service-card, .about__image-frame, .about__text > p, .about__highlight, .project-card, .skills__category, .contact__form, .contact__info, .section-header, .footer__container > *');

if (els.length) {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('is-visible'), i * 50);
        obs.unobserve(e.target);
      }
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });

  els.forEach(el => {
    el.classList.add('reveal');
    obs.observe(el);
  });

  const style = document.createElement('style');
  style.textContent = `.reveal{opacity:0;transform:translateY(30px);transition:opacity .7s ease,transform .7s ease}.reveal.is-visible{opacity:1;transform:translateY(0)}@media(prefers-reduced-motion:reduce){.reveal{opacity:1;transform:none;transition:none}}`;
  document.head.appendChild(style);
}