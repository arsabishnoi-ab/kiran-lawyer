/* =========================================================
   Kiran Thirumalesh J. — Advocate | Site behaviour
   ========================================================= */
(function () {
  "use strict";

  var doc = document;

  /* ----- Footer year ----- */
  var yearEl = doc.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ----- Header shadow on scroll ----- */
  var header = doc.querySelector(".site-header");
  var onScroll = function () {
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 8);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ----- Mobile nav toggle ----- */
  var toggle = doc.getElementById("nav-toggle");
  var nav = doc.getElementById("main-nav");
  if (toggle && nav) {
    var setOpen = function (open) {
      nav.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    };
    toggle.addEventListener("click", function () {
      setOpen(!nav.classList.contains("open"));
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) setOpen(false);
    });
    window.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setOpen(false);
    });
  }

  /* ----- Active nav link on scroll (scrollspy) ----- */
  var navLinks = Array.prototype.slice.call(doc.querySelectorAll('.main-nav ul a[href^="#"]'));
  var sections = navLinks
    .map(function (a) { return doc.querySelector(a.getAttribute("href")); })
    .filter(Boolean);
  if ("IntersectionObserver" in window && sections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          navLinks.forEach(function (a) {
            a.classList.toggle("active", a.getAttribute("href") === "#" + entry.target.id);
          });
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ----- Scroll reveal ----- */
  var revealEls = doc.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var revObs = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { revObs.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ----- Animated stat counters ----- */
  var counters = doc.querySelectorAll(".stat-num[data-count]");
  var runCounter = function (el) {
    var target = parseInt(el.getAttribute("data-count"), 10) || 0;
    var suffix = el.getAttribute("data-suffix") || "";
    var dur = 1400, start = null;
    var step = function (ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(eased * target) + suffix;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if ("IntersectionObserver" in window && counters.length) {
    var cObs = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { runCounter(entry.target); obs.unobserve(entry.target); }
      });
    }, { threshold: 0.6 });
    counters.forEach(function (c) { cObs.observe(c); });
  }

  /* ===== Reviews rendering ===== */
  var grid = doc.getElementById("reviews-grid");
  var data = window.REVIEWS || [];
  var PAGE = 6;
  var shown = PAGE;
  var activeFilter = "all";

  var initials = function (name) {
    return name.split(" ").map(function (w) { return w[0]; }).join("").slice(0, 2).toUpperCase();
  };
  var stars = function (n) {
    var full = "★".repeat(n) + "☆".repeat(5 - n);
    return full;
  };

  var filtered = function () {
    return activeFilter === "all"
      ? data
      : data.filter(function (r) { return r.tag === activeFilter; });
  };

  var renderReviews = function () {
    if (!grid) return;
    var list = filtered().slice(0, shown);
    grid.innerHTML = list.map(function (r) {
      return (
        '<article class="review">' +
          '<div class="review-stars" aria-label="' + r.rating + ' out of 5 stars">' + stars(r.rating) + '</div>' +
          '<p class="review-text">"' + r.text + '"</p>' +
          '<div class="review-meta">' +
            '<span class="review-avatar" aria-hidden="true">' + initials(r.name) + '</span>' +
            '<span>' +
              '<span class="review-name">' + r.name + '</span><br />' +
              '<span class="review-tag">' + r.tag + ' Matter</span>' +
            '</span>' +
          '</div>' +
        '</article>'
      );
    }).join("");

    var btn = doc.getElementById("load-more-reviews");
    if (btn) btn.style.display = shown >= filtered().length ? "none" : "inline-flex";
  };

  if (grid) {
    renderReviews();

    var moreBtn = doc.getElementById("load-more-reviews");
    if (moreBtn) {
      moreBtn.addEventListener("click", function () {
        shown += PAGE;
        renderReviews();
      });
    }

    var chips = doc.querySelectorAll(".chip");
    chips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        chips.forEach(function (c) {
          c.classList.remove("is-active");
          c.setAttribute("aria-selected", "false");
        });
        chip.classList.add("is-active");
        chip.setAttribute("aria-selected", "true");
        activeFilter = chip.getAttribute("data-filter");
        shown = PAGE;
        renderReviews();
      });
    });
  }

  /* ===== Contact form (mailto + WhatsApp) ===== */
  var form = doc.getElementById("contact-form");
  var note = doc.getElementById("cf-note");

  var getValues = function () {
    return {
      name: (doc.getElementById("cf-name") || {}).value || "",
      phone: (doc.getElementById("cf-phone") || {}).value || "",
      matter: (doc.getElementById("cf-matter") || {}).value || "",
      message: (doc.getElementById("cf-message") || {}).value || ""
    };
  };

  var validate = function (v) {
    var ok = true;
    [["cf-name", v.name], ["cf-phone", v.phone], ["cf-message", v.message]].forEach(function (pair) {
      var field = doc.getElementById(pair[0]);
      var wrap = field ? field.closest(".field") : null;
      if (wrap) wrap.classList.toggle("invalid", !pair[1].trim());
      if (!pair[1].trim()) ok = false;
    });
    return ok;
  };

  var buildText = function (v) {
    return (
      "New consultation request%0D%0A" +
      "Name: " + encodeURIComponent(v.name) + "%0D%0A" +
      "Phone: " + encodeURIComponent(v.phone) + "%0D%0A" +
      "Matter: " + encodeURIComponent(v.matter) + "%0D%0A" +
      "Details: " + encodeURIComponent(v.message)
    );
  };

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var v = getValues();
      if (!validate(v)) {
        if (note) { note.textContent = "Please fill in your name, phone and a short description."; note.className = "form-note error"; }
        return;
      }
      var subject = encodeURIComponent("Consultation request — " + v.matter);
      window.location.href = "mailto:ktjeddu@gmail.com?subject=" + subject + "&body=" + buildText(v);
      if (note) { note.textContent = "Opening your email app… If nothing happens, please call 80953 44722."; note.className = "form-note ok"; }
    });

    var waBtn = doc.getElementById("cf-whatsapp");
    if (waBtn) {
      waBtn.addEventListener("click", function () {
        var v = getValues();
        if (!validate(v)) {
          if (note) { note.textContent = "Please fill in your name, phone and a short description."; note.className = "form-note error"; }
          return;
        }
        var text = buildText(v).replace(/%0D%0A/g, "%0A");
        window.open("https://wa.me/918095344722?text=" + text, "_blank", "noopener");
        if (note) { note.textContent = "Opening WhatsApp…"; note.className = "form-note ok"; }
      });
    }

    form.addEventListener("input", function (e) {
      var wrap = e.target.closest(".field");
      if (wrap) wrap.classList.remove("invalid");
    });
  }
})();
