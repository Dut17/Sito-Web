const FORM_SELECTOR = '.contact__form';

function handleSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const submitButton = form.querySelector('.contact__submit');

  submitButton.disabled = true;
  submitButton.textContent = 'Invio in corso...';

  fetch(form.action, {
    method: 'POST',
    body: new FormData(form),
    headers: { Accept: 'application/json' },
  })
    .then((response) => {
      if (response.ok) {
        form.reset();
        submitButton.textContent = 'Messaggio inviato';
      } else {
        submitButton.textContent = 'Errore, riprova';
      }
    })
    .catch(() => {
      submitButton.textContent = 'Errore di connessione';
    })
    .finally(() => {
      setTimeout(() => {
        submitButton.disabled = false;
        submitButton.textContent = 'Invia';
      }, 3000);
    });
}

export function initContactForm() {
  const form = document.querySelector(FORM_SELECTOR);
  if (!form) return;
  form.addEventListener('submit', handleSubmit);
}
