// Copia email negli appunti con feedback visivo
const copyBtn = document.getElementById('copy-email');
const emailEl = document.getElementById('email-to-copy');
const toast = document.getElementById('copy-toast');

if (copyBtn && emailEl && toast) {
  let toastTimeout;
  
  copyBtn.addEventListener('click', async () => {
    const email = emailEl.textContent.trim();
    
    try {
      await navigator.clipboard.writeText(email);
      
      copyBtn.classList.add('copied');
      copyBtn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
        <span>Copiato!</span>
      `;
      
      toast.hidden = false;
      
      clearTimeout(toastTimeout);
      toastTimeout = setTimeout(() => {
        toast.hidden = true;
        copyBtn.classList.remove('copied');
        copyBtn.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
          <span>Copia</span>
        `;
      }, 2500);
      
    } catch (err) {
      const textarea = document.createElement('textarea');
      textarea.value = email;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      
      toast.textContent = 'Email copiata! (fallback)';
      toast.hidden = false;
      setTimeout(() => toast.hidden = true, 2500);
    }
  });
  
  copyBtn.addEventListener('mouseleave', () => {
    if (copyBtn.classList.contains('copied')) return;
    copyBtn.style.borderColor = '';
    copyBtn.style.color = '';
    copyBtn.style.background = '';
  });
}