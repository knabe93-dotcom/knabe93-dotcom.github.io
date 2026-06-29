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
})();
