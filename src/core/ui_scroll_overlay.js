// ui_scroll_overlay.js
// Handles hero text & background crossfade, overlay dimming and scroll animations.
// HCK_Labs

export function initScrollOverlay() {
  const sentinels = Array.from(document.querySelectorAll('.sentinel'));
  const heroTitle = document.getElementById('hero-title');
  const heroSub = document.getElementById('hero-sub');
  const bgA = document.getElementById('bg-layer-a');
  const bgB = document.getElementById('bg-layer-b');
  const overlay = document.getElementById('bg-overlay');

  if (!heroTitle || !heroSub || !bgA || !bgB || !overlay) return;

  let activeBg = bgA;
  let inactiveBg = bgB;

  // --- Preload helper ---
  function preload(url, cb) {
    const img = new Image();
    img.src = url;
    img.onload = cb || (() => {});
  }

  // --- Crossfade background layers ---
  function crossfadeBg(url) {
    preload(url, () => {
      inactiveBg.style.backgroundImage = `url('${url}')`;
      inactiveBg.style.transition = 'opacity 900ms ease-in-out';
      inactiveBg.style.opacity = 1;
      activeBg.style.opacity = 0;
      setTimeout(() => {
        [activeBg, inactiveBg] = [inactiveBg, activeBg];
        inactiveBg.style.opacity = 0;
      }, 950);
    });
  }

  // --- IntersectionObserver for sentinel sections ---
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const node = entry.target;
      const title = node.dataset.title || '';
      const sub = node.dataset.sub || '';
      const bg = node.dataset.bg || '';

      heroTitle.style.opacity = 0;
      heroSub.style.opacity = 0;
      setTimeout(() => {
        heroTitle.textContent = title;
        heroSub.textContent = sub;
        heroTitle.style.opacity = 1;
        heroSub.style.opacity = 1;
      }, 220);

      if (bg) crossfadeBg(bg);
    });
  }, { threshold: 0.55 });

  sentinels.forEach(s => io.observe(s));

  // --- overlay intensity + text movement ---
  function onScroll() {
    const center = window.innerHeight / 2;
    let best = null;
    let bestDist = Infinity;

    sentinels.forEach(s => {
      const r = s.getBoundingClientRect();
      const mid = r.top + r.height / 2;
      const dist = Math.abs(mid - center);
      if (dist < bestDist) { bestDist = dist; best = { node: s, dist }; }
    });

    if (!best) return;
    const maxDist = window.innerHeight / 2;
    const progress = 1 - Math.min(bestDist / maxDist, 1);

    const overlayOpacity = clamp((1 - progress) * 0.8, 0, 0.9);
    overlay.style.opacity = overlayOpacity;

    heroTitle.style.transform = `translateY(${(1 - progress) * 18}px)`;
    heroSub.style.transform = `translateY(${(1 - progress) * 10}px)`;
    heroTitle.style.opacity = clamp(0.35 + progress, 0, 1);
    heroSub.style.opacity = clamp(0.2 + progress, 0, 1);
  }

  window.addEventListener('scroll', debounce(onScroll, 12));
  window.addEventListener('resize', debounce(onScroll, 60));
  onScroll();
}

// --- Utility functions ---
function debounce(fn, wait = 80) {
  let t;
  return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), wait); };
}
function clamp(v, a = 0, b = 1) {
  return Math.max(a, Math.min(b, v));
}
