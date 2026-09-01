// Contact form handling con Formspree
const form = document.getElementById('contact-form');
const statusEl = form?.querySelector('.form-status');
const submitBtn = form?.querySelector('.form-submit');

if (form && statusEl && submitBtn) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    requiredFields.forEach(field => {
      if (!field.value.trim()) {
        field.style.borderColor = '#ef4444';
        isValid = false;
      } else {
        field.style.borderColor = '';
      }
    });
    
    if (!isValid) {
      statusEl.textContent = 'Compila tutti i campi obbligatori.';
      statusEl.className = 'form-status error';
      return;
    }
    
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    statusEl.textContent = '';
    statusEl.className = 'form-status';
    
    try {
      const formData = new FormData(form);
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });
      
      if (response.ok) {
        statusEl.textContent = 'Messaggio inviato! Ti rispondo entro 24h.';
        statusEl.className = 'form-status success';
        form.reset();
      } else {
        throw new Error('Errore invio');
      }
    } catch (error) {
      statusEl.textContent = "Errore nell'invio. Scrivimi direttamente a dut@portfolio.dev";
      statusEl.className = 'form-status error';
    } finally {
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;
    }
  });
  
  form.querySelectorAll('.form-input, .form-select, .form-textarea').forEach(field => {
    field.addEventListener('input', () => {
      field.style.borderColor = '';
    });
  });
}