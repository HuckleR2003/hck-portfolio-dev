// 🚀 main.js
// Central initialization script for HCK_Labs modular system.
// Combines UI, logic, and tool modules into one cohesive runtime.

import { initHeroVisibility } from "../ui_hero.js";
import { initScrollOverlay } from "../ui_scroll_overlay.js";
import { initModalEvents } from "../ui_modals.js";
import { initUIManager } from "./ui_manager.js";
import { initGPT } from "../HCK_gpt.js";
// Optional extras (if used in future)
import { initNavigation } from "./nav_controller.js";
import { renderFilesManagerOnce, initDiagnostics } from "../HCK_files_manager.js";
document.addEventListener("DOMContentLoaded", () => {
  console.log("-------------HCK_Labs initialization sequence started...");

  // Initialize Hero + Overlay visuals
  try {
    initScrollOverlay();
    initHeroVisibility();
    console.log("Hero and overlay initialized");
  } catch (e) {
    console.warn("⚠️Hero/Overlay init failed:", e);
  }

  // Initialize Modal Core
  try {
    initModalEvents();
    console.log("Modal system ready");
  } catch (e) {
    console.warn("⚠️Modal init failed:", e);
  }

  // Initialize UI Buttons & Manager
  try {
    initUIManager();
    console.log("🧩UI Manager active");
  } catch (e) {
    console.warn("⚠️UI Manager init failed:", e);
  }

  // Initialize GPT + File Manager + Diagnostics
  try {
    initGPT();
    // renderFilesManagerOnce(); - OFF
    initDiagnostics();
    console.log("Tools (GPT, Files, Diagnostics) loaded");
  } catch (e) {
    console.warn("⚠️Tool initialization failed:", e);
  }

  // Navigation or optional scripts
  try {
    if (initNavigation) initNavigation();
  } catch (e) {
    console.warn("⚠️Navigation not available:", e);
  }

  console.log("✅ HCK_Labs fully initialized.");
});
