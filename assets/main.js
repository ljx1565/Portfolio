// reveal on scroll · indicator follows the current section · progress bar · image lightbox
(() => {
  const io = new IntersectionObserver((es) => {
    es.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add("in");
      e.target.querySelectorAll("[data-w]").forEach((el) => { el.style.width = el.dataset.w; });
      io.unobserve(e.target);
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".rv").forEach((el) => io.observe(el));

  const links = [...document.querySelectorAll(".nav li a")];
  const parts = links.map((a) => document.querySelector(a.getAttribute("href")));
  const bar = document.querySelector(".progress");
  const menu = document.querySelector(".nav ol");
  let last = -2;
  const onScroll = () => {
    const y = window.scrollY + window.innerHeight * 0.35;
    let cur = -1;
    parts.forEach((p, i) => { if (p && p.offsetTop <= y) cur = i; });
    if (cur !== last) {
      last = cur;
      links.forEach((a, i) => a.classList.toggle("on", i === cur));
      // scroll only the menu strip sideways; scrollIntoView would also touch the page scroll and cancel wheel / touch momentum
      if (cur >= 0 && menu.scrollWidth > menu.clientWidth) {
        const r = links[cur].getBoundingClientRect(), m = menu.getBoundingClientRect();
        menu.scrollLeft += (r.left + r.width / 2) - (m.left + m.width / 2);
      }
    }
    const h = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + "%";
  };
  let t = 0;
  window.addEventListener("scroll", () => { if (!t) t = requestAnimationFrame(() => { onScroll(); t = 0; }); }, { passive: true });
  onScroll();

  const lb = document.querySelector(".lb"), lbImg = lb.querySelector("img"), lbCap = lb.querySelector("p");
  document.querySelectorAll("figure .shot img").forEach((img) => {
    img.parentElement.addEventListener("click", () => {
      lbImg.src = img.src; lbImg.alt = img.alt;
      const c = img.closest("figure").querySelector("figcaption");
      lbCap.textContent = c ? c.textContent : "";
      lb.classList.add("open");
    });
  });
  lb.addEventListener("click", () => lb.classList.remove("open"));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") lb.classList.remove("open"); });
})();
