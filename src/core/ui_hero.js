// ui_hero.js - final version
// Hero hides smoothly before STATS and disables interactivity when fading out.
// HCK_Labs

export function initHeroVisibility() {
  try {
    const heroMain = document.getElementById("hero-fixed");
    const heroBottom = document.getElementById("hero-bottom");
    const highlightsSection = document.getElementById("highlights");
    const notesSection = document.getElementById("notes");

    if (!heroMain || !highlightsSection) return;

    let heroHidden = false;

    // ---- Helpers ----
    function hideHero() {
      if (heroHidden) return;
      heroMain.classList.add("hidden");
      heroMain.style.pointerEvents = "none";
      heroMain.setAttribute("aria-hidden", "true");
      heroHidden = true;
    }

    function showHero() {
      if (!heroHidden) return;
      heroMain.classList.remove("hidden");
      // małe opóźnienie, żeby nie aktywować kliknięć podczas animacji
      setTimeout(() => {
        heroMain.style.pointerEvents = "auto";
        heroMain.setAttribute("aria-hidden", "false");
      }, 250);
      heroHidden = false;
    }

    // ---- Scroll logic ----
    function onScroll() {
      const rect = highlightsSection.getBoundingClientRect();
      const triggerY = window.innerHeight * 0.85; // hero znika 15% przed sekcją STATS

      // Gdy sekcja STATS zbliża się do dolnej krawędzi ekranu → chowaj hero
      if (rect.top < triggerY && !heroHidden) {
        hideHero();
      }

      // Gdy użytkownik wraca ponad STATS → pokazuj hero z powrotem
      else if (rect.top > window.innerHeight && heroHidden) {
        showHero();
      }
    }

    // ---- Eventy ----
    window.addEventListener("scroll", throttle(onScroll, 50));
    window.addEventListener("resize", throttle(onScroll, 100));
    onScroll();

    // ---- Dolny hero przy sekcji Notes ----
    if (notesSection && heroBottom) {
      const bottomObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => heroBottom.classList.add("visible"), 150);
          } else {
            heroBottom.classList.remove("visible");
          }
        });
      }, { threshold: 0.2 });
      bottomObserver.observe(notesSection);
    }

  } catch (err) {
    console.warn("initHeroVisibility error:", err);
  }
}

// ---- Throttle helper ----
function throttle(fn, wait = 80) {
  let last = 0;
  let t;
  return (...a) => {
    const now = Date.now();
    if (now - last >= wait) {
      last = now;
      fn(...a);
    } else {
      clearTimeout(t);
      t = setTimeout(() => {
        last = Date.now();
        fn(...a);
      }, wait - (now - last));
    }
  };
}
