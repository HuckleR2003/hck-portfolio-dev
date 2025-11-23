# HCK_Labs — Educational AI Engineering Environment

**Author:** Marcin Firmuga  
**Repository:** hck-portfolio-dev  
**Version:** v0.1 — Framework Build  
**Status:** Active Development  

---

## 1. Overview

**HCK_Labs** is an experimental portfolio and educational framework focused on practical AI engineering, system design, and reproducible open-source learning.  
The project combines a structured developer portfolio with interactive tools, such as file explorers, diagnostic consoles, and local AI chat systems.

This repository, `hck-portfolio-dev`, forms the **core environment** of the HCK ecosystem — a web-based interface serving as both an educational demo and a functional base for modular AI development.

---

## 2. Concept and Purpose

The goal of **HCK_Labs** is to create a self-documenting, modular framework that blends learning and engineering practice.

Each component in the system serves a dual role:
- as a **tool** — providing actual functionality (e.g., local file exploration, LLM demo, diagnostics),  
- and as a **reference** — offering transparent, educational insight into how each part works.

The framework introduces a unique file-level documentation layer —  
`how_it_works_cross.txt` — included in every project directory.  
Each file describes:
- what the scripts in that folder do,  
- how they interconnect,  
- and which commands or APIs are involved in communication between components.

This transforms the repository into an **interactive map of understanding** — not just a collection of code.

---

## 3. Core Features (v0.1 — Framework Build)

- Complete rewrite of **Hero System** with contextual visibility and layered fading
- **Projects and Tools Panels** with interactive cards and modular structure
- Full implementation of **hck-GPT** — local AI chatbot with animated typing and prompt templates
- New **HCK_Files Manager** — in-browser file explorer with folder navigation and breadcrumb interface
- Added **Diagnostic Console** — local tool for checking project integration and system logs
- **HOW_IT_WORKS_CROSS.txt** educational section — fully functional demo with styled UI
- Refreshed **Contact** and **About** sections with unified design system
- Implementation of bottom “HERO_OUTRO” block synchronized with scroll depth
- Global CSS and JS modernization (≈1600 lines refactored)
- Preparation for modular split into independent core/component/utils files

---

## 4. Architecture and Planned Structure (v0.2)

Version 0.2 will introduce a modular architecture inspired by research-grade development environments.

---

### MAIN STRUCTURE
hck-portfolio-dev/
├────`backend/` *not using yet*
├────`projects/` *not using yet*
├────`src/` *under, is full path's for .js , .css*
├──`CHANGELOG.md`
├──`how_it_works_cross.txt`
├──`index.html` *START*
└──`README.md`

### JavaScript ---
/src/
├── core/js
│ ├── main.js
│ ├── nav_controller.js
│ ├── ui_manager.js
│ └── main.js.old
├── utils/
│ ├── helper.js
│ └── observer_utils.js
├── components/
│ └── diagnostic_console/diagnostic_console.js
│
├── HCK_files_manager.js
├── hck_GPT.js
├── ui_hero.js
├── ui_modals.js
└── ui_scroll_overlay.js
### CSS ---
/src/core/
├─────── css/
│ ├── main.css
│ ├── legacy.css
│ ├── animations.css
│ └── theme.css
│ 
├─────── components/
│ ├── hck_files_manager.css *
│ ├── hck_gpt.css *
│ ├── diagnostic_console.css *
│ └── how_it_works.css
└──


---

## 5. Technology Stack

| Layer | Description |
|-------|--------------|
| Frontend | HTML5, CSS3, Vanilla JavaScript |
| UI System | Custom modular design with gradient panels and responsive grids |
| Data Simulation | Local JSON datasets for demo repository structure |
| Future Backend | PHP, MySQL integration for dynamic project indexing |
| AI Layer | Local hck-GPT demo with prompt simulation and typed responses |
| Architecture | Modular, research-style front-end system |

---

## 6. Current Components

| Component           | Description                                  | Status |
|---------------------|----------------------------------------------------|-------|
| `hck-GPT`           | Local demo chatbot with prompts and animated typing| Alpha |
| `HCK_Files Manager` | File system explorer with breadcrumb UI            | Alpha |
| `Diagnostic Console`| System check and modular connectivity panel        | Beta  |
| `HOW_IT_WORKS_CROSS.txt`| Educational documentation layer                | Alpha |

---

## 7. Statistics

| Category | Value |
|-----------|--------|
| HTML | ~400 lines |
| CSS | ~800 lines |
| JavaScript | ~800 lines |
| Total | ~2000+ lines of code |
| Projects | 5 (HCK_Portfolio, PC_Workman-HCK, micrograd_engine, hck-GPT, Files Manager) |
| Certifications in progress | Google ML Engineer, IBM AI Engineering, NASK Cybersecurity |

---

## 8. Roadmap

**Planned for v0.2 — Modular Split**
- Refactor codebase into `/core`, `/components`, and `/utils`
- Add syntax highlighting and dark/light mode
- Implement server-based file access for `HCK_Files Manager`
- Expand `hck-GPT` with integrated contextual querying
- Connect `Diagnostic Console` to live PHP/MySQL endpoints
- Public deployment with domain and GitHub Pages

---

## 9. Author

**Marcin Firmuga**  
Technician in Computer Science, evolving toward AI Engineering and Cybersecurity.  
Focused on open-source learning, reproducible research, and practical model experimentation.  
Building educational frameworks that mirror real development environments.

---

## 10. License

This repository is part of the **HCK_Labs educational initiative** and is distributed for learning, research, and personal use.  
All components and visuals are original works of the author.