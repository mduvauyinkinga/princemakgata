/* ============================================================
   Interactions — cursor, lookbook render/drag, lightbox
   Depends on content.js (SITE, SERVICES, REVIEWS, LOOKBOOK, lookSvg, waLink)
   ============================================================ */

(function () {
  "use strict";

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  /* ---------- Custom cursor ---------- */
  const dot = document.getElementById("cursorDot");
  const ring = document.getElementById("cursorRing");

  if (dot && ring && finePointer && !reducedMotion) {
    let mouseX = -100, mouseY = -100;
    let ringX = -100, ringY = -100;

    window.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    }, { passive: true });

    function ringLoop() {
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      requestAnimationFrame(ringLoop);
    }
    requestAnimationFrame(ringLoop);

    const hoverables = "a, button, .look-card, .service-card, .review-card, iframe";
    document.addEventListener("mouseover", (e) => {
      if (e.target.closest(hoverables)) ring.classList.add("is-hover");
    });
    document.addEventListener("mouseout", (e) => {
      if (e.target.closest(hoverables)) ring.classList.remove("is-hover");
    });
  }

  /* ---------- Render lookbook ---------- */
  const rail = document.getElementById("lookbookRail");
  if (rail) {
    LOOKBOOK.forEach((item, i) => {
      const card = document.createElement("article");
      card.className = "look-card";
      card.setAttribute("tabindex", "0");
      card.setAttribute("role", "button");
      card.setAttribute("aria-label", item.name + " — open larger view");
      card.innerHTML = `
        <div class="look-art">${lookSvg(item, i)}</div>
        <div class="look-veil"></div>
        <div class="look-info">
          <span class="look-index">Look ${String(i + 1).padStart(2, "0")}</span>
          <h3 class="look-name">${item.name}</h3>
          <span class="look-hint">${item.hint} ↗</span>
        </div>`;

      const open = () => openLightbox(item, i);
      card.addEventListener("click", open);
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); }
      });
      rail.appendChild(card);
    });

    /* Drag-to-scroll (mouse + touch via pointer events) */
    let isDown = false, startX = 0, startScroll = 0, moved = false;

    function onStart(e) {
      isDown = true;
      moved = false;
      startX = e.clientX;
      startScroll = rail.scrollLeft;
      try { rail.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ }
    }
    function onMove(e) {
      if (!isDown) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 6) moved = true;
      rail.scrollLeft = startScroll - dx;
    }
    function onEnd(e) {
      isDown = false;
      try { rail.releasePointerCapture(e.pointerId); } catch (err) { /* ignore */ }
    }

    rail.addEventListener("pointerdown", onStart);
    rail.addEventListener("pointermove", onMove);
    rail.addEventListener("pointerup", onEnd);
    rail.addEventListener("pointercancel", onEnd);

    rail.addEventListener("click", (e) => {
      if (moved) { e.stopPropagation(); e.preventDefault(); moved = false; }
    }, true);

    /* Vertical wheel → horizontal scroll while hovering the rail */
    rail.addEventListener("wheel", (e) => {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      const maxScroll = rail.scrollWidth - rail.clientWidth;
      const atStart = rail.scrollLeft <= 0 && e.deltaY < 0;
      const atEnd = rail.scrollLeft >= maxScroll - 1 && e.deltaY > 0;
      if (atStart || atEnd) return;
      e.preventDefault();
      rail.scrollLeft += e.deltaY;
    }, { passive: false });
  }

  /* ---------- Render services ---------- */
  const servicesGrid = document.getElementById("servicesGrid");
  if (servicesGrid) {
    SERVICES.forEach((svc, i) => {
      const card = document.createElement("article");
      card.className = "service-card";
      card.innerHTML = `
        <span class="service-num">Service ${String(i + 1).padStart(2, "0")}</span>
        <h3 class="service-name">${svc.name}</h3>
        <p class="service-desc">${svc.desc}</p>
        <a class="service-link" href="${waLink("Hi Prince, " + svc.cta)}" target="_blank" rel="noopener">Enquire on WhatsApp →</a>`;
      servicesGrid.appendChild(card);
    });
  }

  /* ---------- Render reviews ---------- */
  const reviewsGrid = document.getElementById("reviewsGrid");
  if (reviewsGrid) {
    REVIEWS.forEach((rev) => {
      const card = document.createElement("article");
      card.className = "review-card";
      const stars = "★".repeat(rev.stars);
      card.innerHTML = `
        <span class="review-stars" aria-label="${rev.stars} out of 5 stars">${stars}</span>
        <p class="review-text">“${rev.text}”</p>
        <div class="review-author">
          <span class="review-name">${rev.name}</span>
          <span class="review-meta">${rev.meta}</span>
        </div>`;
      reviewsGrid.appendChild(card);
    });
  }

  /* ---------- Lightbox ---------- */
  const lightbox = document.getElementById("lightbox");
  const lightboxMedia = document.getElementById("lightboxMedia");
  const lightboxCaption = document.getElementById("lightboxCaption");
  const lightboxClose = document.getElementById("lightboxClose");

  function openLightbox(item, index) {
    if (!lightbox) return;
    lightboxMedia.innerHTML = lookSvg(item, index);
    lightboxCaption.textContent = item.name;
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
    if (lightboxClose) lightboxClose.focus();
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.hidden = true;
    lightboxMedia.innerHTML = "";
    document.body.style.overflow = "";
  }

  if (lightbox) {
    if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLightbox();
    });
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !lightbox.hidden) closeLightbox();
    });
  }
})();