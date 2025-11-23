// 🛠️ ui_manager.js
// Connects UI buttons to modal actions and initializes internal tools (GPT, Files, Diagnostics)

import { openModal } from '../ui_modals.js';
import { getGptUI } from '../HCK_gpt.js';
import { getFilesUI, renderFilesManagerOnce } from '../HCK_files_manager.js';
import { getDiagUI } from '../HCK_files_manager.js';

// Initialize UI button events and modal triggers
export function initUIManager() {
  // GPT Modals
  const openGptButtons = document.querySelectorAll('#open-gpt, #open-gpt-bottom, #tool-gpt');
  openGptButtons.forEach(btn =>
    btn.addEventListener('click', () => {
      openModal(getGptUI());
    })
  );

  // Files Manager Modals
  const openFilesButtons = document.querySelectorAll('#open-files, #open-files-bottom, #tool-files');
  openFilesButtons.forEach(btn =>
    btn.addEventListener('click', () => {
      openModal(getFilesUI());
      setTimeout(() => renderFilesManagerOnce(), 120);
    })
  );

  // Diagnostic Console
  const openDiagButtons = document.querySelectorAll('#open-diag, #open-diag-bottom, #tool-diag');
  openDiagButtons.forEach(btn =>
    btn.addEventListener('click', () => {
      openModal(getDiagUI());
    })
  );
}
