// 🪟 ui_modals.js
// Core modal control logic for HCK_Labs - open, close, overlay click handling.
// HCK_Labs

export function openModal(html) {
  const modalOverlay = document.getElementById('modal-overlay');
  const modalContent = document.getElementById('modal-content');
  if (!modalOverlay || !modalContent) return;

  modalContent.innerHTML = html;
  modalOverlay.style.display = 'flex';
  modalOverlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

export function closeModal() {
  const modalOverlay = document.getElementById('modal-overlay');
  const modalContent = document.getElementById('modal-content');
  if (!modalOverlay || !modalContent) return;

  modalOverlay.style.display = 'none';
  modalOverlay.setAttribute('aria-hidden', 'true');
  modalContent.innerHTML = '';
  document.body.style.overflow = '';
}

// Initialize close events
export function initModalEvents() {
  const modalOverlay = document.getElementById('modal-overlay');
  const modalClose = document.getElementById('modal-close');
  if (!modalOverlay || !modalClose) return;

  modalClose.addEventListener('click', () => closeModal());
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });
}
