// paged deck: ← → keys · wheel (landscape) · swipe (touch) · section indicator · progress · image lightbox
(() => {
  const root = document.documentElement;
  const mq = matchMedia("(min-width: 900px) and (min-aspect-ratio: 5/4)");
  const stage = document.querySelector(".stage"), track = document.querySelector(".track");
  const slides = [...track.children], n = slides.length;
  const links = [...document.querySelectorAll(".nav li a")], menu = document.querySelector(".nav ol");
  const bar = document.querySelector(".progress");
  const count = document.querySelector(".dock .count"), where = document.querySelector(".dock .where");
  const prevs = document.querySelectorAll(".prev"), nexts = document.querySelectorAll(".next");
  const lb = document.querySelector(".lb"), lbImg = lb.querySelector("img"), lbCap = lb.querySelector("p");
  const pad = (x) => String(x).padStart(2, "0");
  const deck = () => root.classList.contains("deck");
  let cur = -1;

  const eager = (s) => s && s.querySelectorAll("img[loading=lazy]").forEach((im) => { im.loading = "eager"; });
  const reveal = (s) => {
    s.querySelectorAll(".rv:not(.in)").forEach((el, k) => {
      el.style.transitionDelay = Math.min(k, 8) * 70 + "ms";
      el.classList.add("in");
      el.querySelectorAll("[data-w]").forEach((b) => { b.style.width = b.dataset.w; });
    });
  };
  const place = (anim) => {
    if (!anim) track.style.transition = "none";
    track.style.transform = `translateX(${-Math.max(cur, 0) * stage.clientWidth}px)`;
    if (!anim) { void track.offsetWidth; track.style.transition = ""; }
  };

  const go = (i, anim = true) => {
    i = Math.max(0, Math.min(n - 1, i));
    if (i === cur) return;
    cur = i;
    place(anim);
    slides.forEach((s, k) => { const off = k !== i; s.inert = off; s.setAttribute("aria-hidden", off); });
    const s = slides[i];
    s.scrollTop = 0;
    reveal(s); eager(s); eager(slides[i + 1]); eager(slides[i - 1]);
    const sec = s.dataset.sec;
    links.forEach((a) => a.classList.toggle("on", a.dataset.sec === sec));
    const on = links.find((a) => a.dataset.sec === sec);
    if (on && menu.scrollWidth > menu.clientWidth) {
      const r = on.getBoundingClientRect(), m = menu.getBoundingClientRect();
      menu.scrollBy({ left: (r.left + r.width / 2) - (m.left + m.width / 2), behavior: anim ? "smooth" : "auto" });
    }
    bar.style.width = ((i + 1) / n) * 100 + "%";
    count.textContent = pad(i + 1) + " / " + pad(n);
    where.textContent = s.dataset.title;
    prevs.forEach((b) => { b.disabled = i === 0; });
    nexts.forEach((b) => { b.disabled = i === n - 1; });
    history.replaceState(null, "", i === 0 ? location.pathname + location.search : "#" + s.id);
  };
  const step = (d) => go(cur + d);
  const fromHash = () => {
    const h = decodeURIComponent(location.hash.slice(1));
    let i = slides.findIndex((s) => s.id === h);
    if (i < 0) i = slides.findIndex((s) => s.dataset.sec === h);
    return Math.max(0, i);
  };

  // in-page links (#slide-id) turn pages instead of scrolling
  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const i = slides.findIndex((s) => s.id === a.getAttribute("href").slice(1));
    if (i < 0) return;
    e.preventDefault(); go(i);
  });
  prevs.forEach((b) => b.addEventListener("click", () => step(-1)));
  nexts.forEach((b) => b.addEventListener("click", () => step(1)));
  window.addEventListener("hashchange", () => { stage.scrollLeft = 0; go(fromHash()); });
  // anchor jumps and focus can scroll the stage itself; paging is done only by the track transform
  stage.addEventListener("scroll", () => { if (stage.scrollLeft || stage.scrollTop) stage.scrollLeft = stage.scrollTop = 0; });

  // keyboard
  document.addEventListener("keydown", (e) => {
    if (lb.classList.contains("open")) { if (e.key === "Escape") lb.classList.remove("open"); return; }
    if (e.altKey || e.ctrlKey || e.metaKey || /INPUT|TEXTAREA|SELECT/.test(e.target.tagName)) return;
    const k = e.key;
    let d = 0;
    if (k === "ArrowRight" || (deck() && (k === "PageDown" || (k === " " && !e.shiftKey)))) d = 1;
    else if (k === "ArrowLeft" || (deck() && (k === "PageUp" || (k === " " && e.shiftKey)))) d = -1;
    else if (k === "Home") { e.preventDefault(); go(0); return; }
    else if (k === "End") { e.preventDefault(); go(n - 1); return; }
    if (d) { e.preventDefault(); step(d); }
  });

  // wheel turns pages in landscape; a page that still has content below scrolls first
  let lockUntil = 0, acc = 0, lastWheel = 0;
  stage.addEventListener("wheel", (e) => {
    if (!deck() || e.ctrlKey || lb.classList.contains("open")) return;
    const horiz = Math.abs(e.deltaX) > Math.abs(e.deltaY);
    const d = horiz ? e.deltaX : e.deltaY;
    const sc = e.target.closest("pre, .tbl-wrap");
    if (horiz && sc && sc.scrollWidth > sc.clientWidth) return;
    const s = slides[cur];
    if (!horiz && s.scrollHeight > s.clientHeight + 2 &&
        ((d > 0 && s.scrollTop + s.clientHeight < s.scrollHeight - 2) || (d < 0 && s.scrollTop > 0))) return;
    e.preventDefault();
    const now = performance.now();
    if (now < lockUntil) { lockUntil = Math.max(lockUntil, now + 160); return; }   // swallow trackpad inertia
    if (now - lastWheel > 250) acc = 0;
    lastWheel = now; acc += d;
    if (Math.abs(acc) < 40) return;
    step(acc > 0 ? 1 : -1); acc = 0; lockUntil = now + 650;
  }, { passive: false });

  // swipe
  let t0 = null;
  stage.addEventListener("touchstart", (e) => {
    if (e.touches.length !== 1 || (window.visualViewport && visualViewport.scale > 1.01)) { t0 = null; return; }
    const t = e.touches[0], sc = e.target.closest("pre, .tbl-wrap");
    t0 = { x: t.clientX, y: t.clientY, t: Date.now(), sc: !!(sc && sc.scrollWidth > sc.clientWidth + 2) };
  }, { passive: true });
  stage.addEventListener("touchend", (e) => {
    if (!t0 || t0.sc) { t0 = null; return; }
    const t = e.changedTouches[0], dx = t.clientX - t0.x, dy = t.clientY - t0.y, fast = Date.now() - t0.t < 600;
    t0 = null;
    if (Math.abs(dx) > (fast ? 40 : 90) && Math.abs(dx) > Math.abs(dy) * 1.4) step(dx < 0 ? 1 : -1);
  }, { passive: true });

  // landscape ↔ portrait
  const setMode = () => { root.classList.toggle("deck", mq.matches); place(false); };
  mq.addEventListener ? mq.addEventListener("change", setMode) : mq.addListener(setMode);
  new ResizeObserver(() => place(false)).observe(stage);

  // lightbox
  document.querySelectorAll("figure .shot img").forEach((img) => {
    img.parentElement.addEventListener("click", () => {
      lbImg.src = img.src; lbImg.alt = img.alt;
      const c = img.closest("figure").querySelector("figcaption");
      lbCap.textContent = c ? c.textContent : "";
      lb.classList.add("open");
    });
  });
  lb.addEventListener("click", () => lb.classList.remove("open"));

  setMode();
  go(fromHash(), false);
})();
