/* ============================================================
   Main — preloader, header, nav, reveals, counters, year
   ============================================================ */

(function () {
  "use strict";

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Preloader ---------- */
  const preloader = document.getElementById("preloader");
  const skipBtn = document.getElementById("preloaderSkip");

  function finishPreloader() {
    if (!preloader || preloader.classList.contains("is-done")) return;
    preloader.classList.add("is-done");
    document.body.classList.remove("preloader-active");
    document.body.classList.add("loaded");
    try { sessionStorage.setItem("pmIntroSeen", "1"); } catch (e) { /* private mode */ }
    setTimeout(() => preloader.remove(), 1000);
  }

  let introSeen = false;
  try { introSeen = sessionStorage.getItem("pmIntroSeen") === "1"; } catch (e) { /* ignore */ }

  if (preloader && !reducedMotion && !introSeen) {
    document.body.classList.add("preloader-active");
    setTimeout(finishPreloader, 2400);
    if (skipBtn) skipBtn.addEventListener("click", finishPreloader);
  } else if (preloader) {
    preloader.remove();
    document.body.classList.add("loaded");
  }

  /* ---------- Header scroll state ---------- */
  const header = document.getElementById("siteHeader");
  function onScrollHeader() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 40);
  }
  window.addEventListener("scroll", onScrollHeader, { passive: true });
  onScrollHeader();

  /* ---------- Mobile menu ---------- */
  const navToggle = document.getElementById("navToggle");
  const mobileMenu = document.getElementById("mobileMenu");

  function closeMenu() {
    if (!navToggle || !mobileMenu) return;
    navToggle.classList.remove("is-open");
    mobileMenu.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }

  if (navToggle && mobileMenu) {
    navToggle.addEventListener("click", () => {
      const open = mobileMenu.classList.toggle("is-open");
      navToggle.classList.toggle("is-open", open);
      navToggle.setAttribute("aria-expanded", String(open));
      document.body.style.overflow = open ? "hidden" : "";
    });
    mobileMenu.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeMenu));
    window.addEventListener("keydown", (e) => { if (e.key === "Escape") closeMenu(); });
  }

  /* ---------- Scroll reveals ---------- */
  const revealEls = document.querySelectorAll(".reveal, .section-head, .finale-title");
  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: isMobile ? 0.08 : 0.15, rootMargin: "0px 0px -5% 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  /* Observe dynamically injected cards too (after content.js renders) */
  function observeCards() {
    const cards = document.querySelectorAll(".look-card, .service-card, .review-card");
    if (!("IntersectionObserver" in window)) {
      cards.forEach((c) => c.classList.add("is-visible"));
      return;
    }
    const cardIo = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            cardIo.unobserve(entry.target);
          }
        });
      },
      { threshold: isMobile ? 0.08 : 0.12 }
    );
    cards.forEach((c) => cardIo.observe(c));
  }
  /* content.js renders synchronously before this script, so cards exist now */
  observeCards();

  /* ---------- Animated counters ---------- */
  const counters = document.querySelectorAll(".stat-num[data-count]");
  function animateCounter(el) {
    const target = parseFloat(el.dataset.count);
    const decimals = parseInt(el.dataset.decimals || "0", 10);
    const suffix = el.dataset.suffix || "";
    const duration = 1600;
    const start = performance.now();

    function tick(now) {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = (target * eased).toFixed(decimals) + suffix;
      if (t < 1) {
        requestAnimationFrame(tick);
      } else {
        el.textContent = target.toFixed(decimals) + suffix;
        el.classList.add("counted");
      }
    }
    requestAnimationFrame(tick);
  }

  if (counters.length && "IntersectionObserver" in window) {
    const countIo = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (reducedMotion) {
              const d = parseInt(entry.target.dataset.decimals || "0", 10);
              entry.target.textContent =
                parseFloat(entry.target.dataset.count).toFixed(d) + (entry.target.dataset.suffix || "");
            } else {
              animateCounter(entry.target);
            }
            countIo.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach((c) => countIo.observe(c));
  } else {
    counters.forEach((c) => {
      const d = parseInt(c.dataset.decimals || "0", 10);
      c.textContent = parseFloat(c.dataset.count).toFixed(d) + (c.dataset.suffix || "");
    });
  }

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();