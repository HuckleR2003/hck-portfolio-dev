// HCK_files_manager.js (v3) — robust file explorer for HCK_Labs
// - Safe: checks modal exists before rendering
// - Uses modal.querySelector for all DOM targets
// - Preview for images + basic text preview
// - Uses an in-memory demo FS map (editable)

// =========================
// REAL HCK FILE SYSTEM MAP
// (edit this object to reflect repo contents)
const HCK_FS = {
  "hck-portfolio-dev": {
    type: "folder",
    children: {
      "backend": { type: "folder", children: {} },
      "projects": { type: "folder", children: {} },
      "src": {
        type: "folder",
        children: {
          "core": {
            type: "folder",
            children: {
              "js": {
                type: "folder",
                children: {
                  "main.js": { type: "file" },
                  "main.js.old": { type: "file" },
                  "nav_controller.js": { type: "file" },
                  "ui_manager.js": { type: "file" }
                }
              },
              "utils": {
                type: "folder",
                children: {
                  "helper.js": { type: "file" },
                  "observer_utils.js": { type: "file" }
                }
              },
              "components": {
                type: "folder",
                children: {
                  "diagnostic_console": {
                    type: "folder",
                    children: {
                      "diagnostic_console.js": { type: "file" }
                    }
                  }
                }
              },
              "HCK_files_manager.js": { type: "file" },
              "HCK_gpt.js": { type: "file" },
              "ui_hero.js": { type: "file" },
              "ui_modals.js": { type: "file" },
              "ui_scroll_overlay.js": { type: "file" },
              "css": {
                type: "folder",
                children: {
                  "main.css": { type: "file" },
                  "legacy.css": { type: "file" },
                  "animations.css": { type: "file" },
                  "theme.css": { type: "file" }
                }
              },
              "components_css": {
                type: "folder",
                children: {
                  "hck_files_manager.css": { type: "file" },
                  "hck_gpt.css": { type: "file" },
                  "diagnostic_console.css": { type: "file" },
                  "how_it_works.css": { type: "file" }
                }
              }
            }
          }
        }
      },
      "CHANGELOG.md": { type: "file" },
      "README.md": { type: "file" },
      "how_it_works_cross.txt": { type: "file" },
      "index.html": { type: "file" }
    }
  }
};

// --- Base UI template ---
export function getFilesUI() {
  return `
    <div class="files-modal">
      <div class="files-header">
        <div class="files-breadcrumb" id="files-breadcrumb">
          <span class="crumb root-crumb" data-index="0">hck-portfolio-dev</span>
          <span id="breadcrumbs-dynamic"></span>
        </div>
      </div>
      <div class="files-body">
        <div class="files-tree" id="files-tree" role="tree" aria-label="Files tree"></div>
        <div class="files-preview" id="files-preview" role="region" aria-label="File preview">
          <div id="file-meta" class="file-meta"></div>
          <div id="file-preview-area" class="file-preview-area">
            <pre id="file-content" class="file-content">// Select a file to preview its demo content</pre>
          </div>
        </div>
      </div>
    </div>
  `;
}

// --- Helper: get node at path ---
function nodeAtPath(pathArr) {
  let node = HCK_FS;
  for (const seg of pathArr) {
    if (!node.children || !node.children[seg]) return null;
    node = node.children[seg];
  }
  return node;
}

// --- Render functions / main entrypoint ---
export function renderFilesManagerOnce() {
  // modal-content must exist (modal system from index.html). If not, bail out silently.
  const modalContent = document.getElementById('modal-content');
  if (!modalContent) return; // modal not open yet

  const modal = modalContent; // alias

  // selectors inside modal
  const treeEl = modal.querySelector('#files-tree');
  const breadcrumbEl = modal.querySelector('#files-breadcrumb');
  const metaEl = modal.querySelector('#file-meta');
  const previewEl = modal.querySelector('#files-preview');
  const previewArea = modal.querySelector('#file-preview-area');

  if (!treeEl || !breadcrumbEl || !metaEl || !previewEl || !previewArea) return;

  // initial path (root points to the project folder)
  let curPath = ["hck-portfolio-dev"];

  // render breadcrumb dynamically from curPath
  function renderBreadcrumb() {
    const parts = curPath;
    const crumbs = parts.map((p, i) => {
      const label = i === 0 ? p : p;
      return `<span class="crumb ${i===0?'root-crumb':''}" data-index="${i}">${i===0?label:('/' + label)}</span>`;
    }).join('');
    breadcrumbEl.innerHTML = `<div class="breadcrumb-wrap">${crumbs} <span class="now-here"> NOW HERE</span></div>`;
  }

  // render current node children as tree rows
  function renderTree() {
    const node = nodeAtPath(curPath);
    if (!node) {
      treeEl.innerHTML = `<div class="muted">Path not found</div>`;
      return;
    }
    const children = node.children || {};
    const keys = Object.keys(children);
    if (!keys.length) {
      treeEl.innerHTML = `<div class="muted">No files</div>`;
      return;
    }
    // sort: folders first, then files; alphabetical
    keys.sort((a,b) => {
      const A = children[a].type, B = children[b].type;
      if (A === B) return a.localeCompare(b);
      return A === 'folder' ? -1 : 1;
    });
    const lines = keys.map(name => {
      const ch = children[name];
      const icon = ch.type === 'folder' ? '📁' : '📄';
      return `<div class="tree-row" role="treeitem" data-name="${name}" data-type="${ch.type}">${icon} ${name}</div>`;
    }).join('');
    treeEl.innerHTML = lines;
  }

  // show file preview (images and text)
  function showFile(pathArr) {
    const name = pathArr[pathArr.length - 1];
    const node = nodeAtPath(pathArr);
    if (!node) return;

    metaEl.innerHTML = `<strong>${name}</strong> — <em>${node.type}</em>`;

    // Image preview
    if (name.match(/\.(png|jpg|jpeg|gif)$/i)) {
      const imgPath = `src/core/assets/images/${name}`; // relative path from index.html
      previewArea.innerHTML = `
        <img src="${imgPath}" id="preview-image" style="max-width:100%; border-radius:8px; cursor:pointer; display:block; margin:auto;" alt="${name}">
      `;
      const img = previewArea.querySelector('#preview-image');
      if (img) img.addEventListener('click', () => window.open(img.src, '_blank'));
      return;
    }

    // Basic text preview for common textual files
    if (name.match(/\.(txt|md|js|json|css|html)$/i)) {
      // no server access to read file; display demo/sample placeholder + path info
      previewArea.innerHTML = `<pre id="file-content" class="file-content">// Preview (demo) — ${pathArr.join('/')}\n\n// This is a placeholder. When real file reading is implemented the content will appear here.</pre>`;
      return;
    }

    // fallback: show meta only
    previewArea.innerHTML = `<pre id="file-content" class="file-content">// No preview available for: ${name}</pre>`;
  }

  // initial render
  renderBreadcrumb();
  renderTree();

  // click on tree rows
  treeEl.addEventListener('click', (e) => {
    const row = e.target.closest('.tree-row');
    if (!row) return;
    const name = row.dataset.name;
    const type = row.dataset.type;
    if (!name) return;
    const node = nodeAtPath([...curPath, name]);
    if (!node) return;
    if (type === 'folder') {
      curPath.push(name);
      renderBreadcrumb();
      renderTree();
      previewArea.innerHTML = `<pre id="file-content">// Select a file to preview</pre>`;
      metaEl.textContent = '';
    } else {
      showFile([...curPath, name]);
    }
  });

  // breadcrumb navigation
  breadcrumbEl.addEventListener('click', (e) => {
    const clicked = e.target.closest('.crumb');
    if (!clicked) return;
    const idx = Number(clicked.dataset.index);
    if (Number.isNaN(idx)) return;
    // root always stays as ["hck-portfolio-dev"]
    if (idx === 0) {
      curPath = ["hck-portfolio-dev"];
    } else {
      curPath = curPath.slice(0, idx + 1);
    }
    renderBreadcrumb();
    renderTree();
    previewArea.innerHTML = `<pre id="file-content">// Select a file to preview</pre>`;
    metaEl.textContent = '';
  });

  // keyboard: Backspace goes up (when modal focused)
  modal.addEventListener('keydown', (e) => {
    if (e.key === 'Backspace') {
      if (curPath.length > 1) {
        curPath.pop();
        renderBreadcrumb();
        renderTree();
        previewArea.innerHTML = `<pre id="file-content">// Select a file to preview</pre>`;
        metaEl.textContent = '';
      }
    }
  });

  // expose small API if needed (e.g., for tests)
  return {
    refresh: () => { renderBreadcrumb(); renderTree(); }
  };
}

// --- Diagnostic console (demo) ---
export function getDiagUI() {
  return `
    <h2>Diagnostic Console</h2>
    <p class="muted">Run connectivity tests and export reports (demo).</p>
    <div style="display:flex; gap:8px;">
      <button id="diag-run" class="btn">Run Full Test</button>
      <button id="diag-export" class="btn-outline">Export Report</button>
    </div>
    <pre id="diag-logs" style="margin-top:12px; background:#071022; padding:10px; border-radius:8px; height:260px; overflow:auto;"></pre>
  `;
}

// --- Init Diagnostic Run ---
export function initDiagnostics() {
  document.addEventListener('click', (e) => {
    if (e.target && e.target.id === 'diag-run') {
      const modalContent = document.getElementById('modal-content');
      const logs = modalContent ? modalContent.querySelector('#diag-logs') : document.getElementById('diag-logs');
      if (!logs) return;
      logs.textContent = '[INFO] Starting diagnostics...\n';
      setTimeout(() => logs.textContent += '[OK] Static files reachable.\n', 500);
      setTimeout(() => logs.textContent += '[OK] Mock API ping: 200 OK.\n', 1100);
      setTimeout(() => logs.textContent += '[WARN] DB connection: demo mode.\n', 1600);
      setTimeout(() => logs.textContent += '[OK] Completed: 2 OK, 1 WARN.\n', 2100);
    }
  });
}
