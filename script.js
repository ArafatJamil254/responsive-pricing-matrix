document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('billingToggle');
  const monthlyLabel = document.getElementById('monthlyLabel');
  const yearlyLabel = document.getElementById('yearlyLabel');
  const priceElements = document.querySelectorAll('.price-amount');
  const billingNotes = document.querySelectorAll('.billing-note');

  let isYearly = false;

  function updatePricing() {
    toggleBtn.setAttribute('aria-checked', isYearly ? 'true' : 'false');

    if (isYearly) {
      monthlyLabel.classList.remove('active');
      yearlyLabel.classList.add('active');
    } else {
      monthlyLabel.classList.add('active');
      yearlyLabel.classList.remove('active');
    }

    priceElements.forEach(priceEl => {
      const targetVal = isYearly ? priceEl.dataset.yearly : priceEl.dataset.monthly;

      priceEl.style.opacity = '0';
      priceEl.style.transform = 'translateY(-6px)';

      setTimeout(() => {
        priceEl.textContent = targetVal;
        priceEl.style.opacity = '1';
        priceEl.style.transform = 'translateY(0)';
      }, 150);
    });

    billingNotes.forEach(noteEl => {
      const noteText = isYearly ? noteEl.dataset.yearly : noteEl.dataset.monthly;
      noteEl.textContent = noteText;
    });
  }

  // Toggle click event
  toggleBtn.addEventListener('click', () => {
    isYearly = !isYearly;
    updatePricing();
  });

  // Label click events
  monthlyLabel.addEventListener('click', () => {
    if (isYearly) {
      isYearly = false;
      updatePricing();
    }
  });

  yearlyLabel.addEventListener('click', () => {
    if (!isYearly) {
      isYearly = true;
      updatePricing();
    }
  });

  // Button click feedback
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const originalText = btn.textContent;
      btn.textContent = 'Selected ✓';
      btn.style.opacity = '0.9';

      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.opacity = '1';
      }, 1500);
    });
  });

  // Initial state
  updatePricing();
});
