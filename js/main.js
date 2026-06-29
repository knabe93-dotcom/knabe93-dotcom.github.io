/* ============================================================
   Kevin Knabe – Portfolio · Interaktivität
   ============================================================ */
(function () {
  "use strict";

  /* ---- Jahr im Footer ---- */
  var jahr = document.getElementById("jahr");
  if (jahr) jahr.textContent = new Date().getFullYear();

  /* ---- Mobile-Navigation ---- */
  var toggle = document.getElementById("navToggle");
  var menu = document.getElementById("navMenu");
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Menü schließen" : "Menü öffnen");
    });
    // Beim Klick auf einen Link Menü schließen
    menu.addEventListener("click", function (e) {
      if (e.target.tagName === "A" && menu.classList.contains("open")) {
        menu.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Menü öffnen");
      }
    });
  }

  /* ---- Vorher/Nachher-Slider ---- */
  var range = document.getElementById("bnaRange");
  var before = document.getElementById("bnaBefore");
  var divider = document.getElementById("bnaDivider");
  if (range && before && divider) {
    var apply = function (val) {
      var pos = Math.max(0, Math.min(100, val));
      before.style.clipPath = "inset(0 " + (100 - pos) + "% 0 0)";
      divider.style.left = pos + "%";
    };
    range.addEventListener("input", function () { apply(Number(range.value)); });
    apply(Number(range.value)); // Startzustand
  }

  /* ---- Scroll-Reveal ---- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    // Fallback: alles sichtbar
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---- Header: transparent über dem Hero, hell beim Scrollen ---- */
  var header = document.querySelector(".site-header");
  var heroEl = document.getElementById("hero");
  if (header && heroEl) {
    var onScroll = function () {
      if (window.scrollY > heroEl.offsetHeight - 90) header.classList.add("is-solid");
      else header.classList.remove("is-solid");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
  }

  /* ---- Laufender Code-Hintergrund im Hero ---- */
  var heroCode = document.getElementById("heroCode");
  if (heroCode) {
    var L = [
      '<span class="cc">// Relaunch: alte Seite -> moderne Website</span>',
      '<span class="ct">&lt;section</span> <span class="ca">class</span>=<span class="cs">"hero"</span><span class="ct">&gt;</span>',
      '  <span class="ct">&lt;h1&gt;</span>Frisches Brot. Jeden Morgen.<span class="ct">&lt;/h1&gt;</span>',
      '  <span class="ct">&lt;a</span> <span class="ca">href</span>=<span class="cs">"#kontakt"</span><span class="ct">&gt;</span>Anfragen<span class="ct">&lt;/a&gt;</span>',
      '<span class="ct">&lt;/section&gt;</span>',
      '',
      '<span class="ck">.hero</span> {',
      '  <span class="ck">display</span>: <span class="cv">grid</span>;',
      '  <span class="ck">background</span>: <span class="cv">#2b4dff</span>;',
      '  <span class="ck">border-radius</span>: <span class="cv">18px</span>;',
      '}',
      '',
      '<span class="ck">const</span> site = <span class="ca">await</span> build({',
      '  <span class="ck">responsive</span>: <span class="cv">true</span>,',
      '  <span class="ck">ladezeit</span>: <span class="cs">"&lt; 1s"</span>,',
      '  <span class="ck">mobil</span>: <span class="cv">true</span>,',
      '});',
      ''
    ];
    var block = L.join("\n");
    heroCode.innerHTML = '<div class="hero-code-track">' + block + "\n" + block + "\n" + block + "</div>";
  }
})();
