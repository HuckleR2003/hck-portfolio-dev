// 🧭 nav_controller.js (fixed version)
// Navigation controller + Stats counter animation

export function initNavigation() {
  console.log("initNavigation: starting");

  // Initialize category filters if present
  const filters = Array.from(document.querySelectorAll(".filter"));
  const grid = document.getElementById("projects-grid");
  if (filters.length && grid) {
    filters.forEach((btn) => {
      btn.addEventListener("click", () => {
        filters.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        const cat = btn.dataset.filter;
        Array.from(grid.children).forEach((tile) => {
          if (cat === "all") tile.style.display = "";
          else {
            const has = (tile.dataset.cat || "").split(" ").includes(cat);
            tile.style.display = has ? "" : "none";
          }
        });
      });
    });
  }

  // Initialize counters in STATS section
  initCounters();

  console.log("initNavigation: ready");
}

// ---- COUNTER ANIMATION ----
export function initCounters() {
  const counters = Array.from(document.querySelectorAll(".stat-num"));
  if (!counters.length) return;

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.target || "0", 10);
          const duration = 1800;
          const start = performance.now();

          function animate(now) {
            const progress = Math.min(1, (now - start) / duration);
            const value = Math.floor(target * easeOutCubic(progress));
            el.textContent = value.toLocaleString();
            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              obs.unobserve(el);
            }
          }

          requestAnimationFrame(animate);
        }
      });
    },
    { threshold: 0.4 }
  );

  counters.forEach((el) => observer.observe(el));
}
