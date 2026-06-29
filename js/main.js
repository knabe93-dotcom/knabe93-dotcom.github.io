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

  /* ---- Scroll-Fortschrittsbalken ---- */
  var progress = document.getElementById("scrollProgress");
  if (progress) {
    var updateProgress = function () {
      var h = document.documentElement;
      var max = h.scrollHeight - h.clientHeight;
      progress.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + "%";
    };
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    updateProgress();
  }

  /* ---- Spotlight, das dem Cursor folgt ---- */
  Array.prototype.forEach.call(document.querySelectorAll(".card, .work, .philo-pair"), function (el) {
    el.addEventListener("mousemove", function (e) {
      var r = el.getBoundingClientRect();
      el.style.setProperty("--mx", (e.clientX - r.left) + "px");
      el.style.setProperty("--my", (e.clientY - r.top) + "px");
    });
  });

  /* ---- Sanfter 3D-Tilt auf Projektkarten ---- */
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia && window.matchMedia("(pointer: fine)").matches;
  if (!reduce && finePointer) {
    Array.prototype.forEach.call(document.querySelectorAll(".work"), function (el) {
      el.addEventListener("mousemove", function (e) {
        var r = el.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = "perspective(800px) rotateX(" + (-py * 5).toFixed(2) + "deg) rotateY(" + (px * 5).toFixed(2) + "deg) translateY(-4px)";
      });
      el.addEventListener("mouseleave", function () { el.style.transform = ""; });
    });
  }
})();
