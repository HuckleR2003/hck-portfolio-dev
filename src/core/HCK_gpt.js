// HCK_gpt.js
// hck-GPT chat UI, prompts, typing animation and mock responses.
// HCK_Labs

export function getGptUI() {
  return `
    <div class="hckgpt-modal">
      <h2 class="hckgpt-title">hck-GPT <span class="version">alpha</span></h2>
      <p class="hckgpt-sub">Your local AI companion — exploring HCK_Labs repositories and experiments.</p>

      <div class="hckgpt-chat">
        <div id="chat-log" class="hckgpt-log"></div>
        <div class="hckgpt-inputbar">
          <input id="chat-input" placeholder="Ask about a project, file, or experiment...">
          <button id="chat-send" class="btn hckgpt-send">Send</button>
        </div>
      </div>

      <div class="hckgpt-prompts">
          <button class="prompt-btn" data-prompt="hck_GPT - Overview">hck_GPT – Overview</button>
          <button class="prompt-btn" data-prompt="PC_Workman - Milestones">PC_Workman – Milestones</button>
          <button class="prompt-btn" data-prompt="how_it_works_cross.txt - Explained">how_it_works_cross.txt – Explained</button>
          <button class="prompt-btn" data-prompt="HuckHub - Store & Services">HuckHub – Store & Services</button>
      </div>

      <div class="hckgpt-download">
        <button class="download-main">Download hck_GPT</button>
        <button class="download-sub">– for start experience.</button>
      </div>
    </div>
  `;
}

// ---- Typing animation ----
export function typeChat(container, who, text, addDemoNote = false) {
  return new Promise((resolve) => {
    const prevCursor = container.querySelector('.typing');
    if (prevCursor) prevCursor.classList.remove('typing');

    const line = document.createElement('div');
    line.innerHTML = `<strong style="color:#8be6d8">${who}:</strong> <span class="msg typing"></span>`;
    container.appendChild(line);

    const span = line.querySelector('.msg');
    let i = 0;
    const speed = 25 + Math.random() * 10;

    function typeNext() {
      span.textContent = text.slice(0, i++);
      if (i <= text.length) {
        setTimeout(typeNext, speed);
      } else {
        container.querySelectorAll('.msg').forEach(el => el.classList.remove('typing'));
        span.classList.add('typing');

        if (addDemoNote) {
          const note = document.createElement('div');
          note.classList.add('demo-note');
          note.innerHTML = '<em>Demo agent – response</em>';
          note.style.color = '#7aa3ff';
          note.style.marginTop = '4px';
          container.appendChild(note);
        }
        resolve();
      }
      container.scrollTop = container.scrollHeight;
    }

    typeNext();
  });
}

// ---- Mock response generator ----
export function getProjectResponse(prompt) {
  const p = prompt.toLowerCase();

  if (p.includes('overview') || p.includes('hck_gpt'))
    return `hck-GPT is an experimental local assistant created to analyze your projects inside the portfolio. It integrates lightweight context handling and structured responses for diagnostics and documentation. Furthermore, hck-GPT will support larger projects like PC_Workman, calculating and displaying useful data about processes and components.`;

  if (p.includes('pc_workman') || p.includes('milestones'))
    return `PC_Workman-HCK monitors processes, detects anomalies, and maps hardware performance trends. Future builds will include mini-antivirus logic and adaptive suggestions via hck-GPT.`;

  if (p.includes('how_it_works'))
    return `how_it_works_cross.txt documents every module across repositories. It describes dependencies, function roles, and file connections — acting as an educational layer for understanding HCK_Labs architecture.`;

  if (p.includes('huckhub'))
    return `HuckHub connects AI tools with real e-commerce systems. It powers product recommendation, trend prediction, and conversational support — fusing research with business integration.`;

  if (p.includes('diagnostic') || p.includes('console'))
    return `Diagnostic Console runs system checks and logs connection results for internal modules. In demo mode, it simulates API and DB responses.`;

  return `This prompt is not yet configured in demo mode.`;
}

// ---- Init GPT UI interactions ----
export function initGPT() {
  document.addEventListener('click', async (e) => {
    if (e.target.classList.contains('prompt-btn')) {
      const prompt = e.target.dataset.prompt;
      const log = document.getElementById('chat-log');
      if (!log) return;
      const response = getProjectResponse(prompt);
      await typeChat(log, 'You', prompt);
      await typeChat(log, 'hck-GPT', response, true);
      log.scrollTop = log.scrollHeight;
    }
  });

  document.addEventListener('click', async (e) => {
    if (e.target.id === 'chat-send') {
      const input = document.getElementById('chat-input');
      const log = document.getElementById('chat-log');
      if (!input || !log) return;
      const msg = input.value.trim();
      if (!msg) return;
      input.value = '';
      await typeChat(log, 'You', msg);
      const reply = getProjectResponse(msg);
      await typeChat(log, 'hck-GPT', reply, true);
      log.scrollTop = log.scrollHeight;
    }
  });
}
