(function () {
  "use strict";

  var branches = window.BRANCHES || [];
  var menu = window.MENU || [];

  function formatPhone(p) {
    return p.replace(/(\d{4})(\d{3})(\d{3})/, "$1 $2 $3");
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function normalize(s) {
    return String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/g, "d");
  }

  function icon(name) {
    return '<svg aria-hidden="true"><use href="#i-' + name + '"/></svg>';
  }

  // ----- Header & mobile nav -----
  var header = document.getElementById("header");
  var nav = document.getElementById("nav");
  var toggle = document.getElementById("navToggle");

  function onScroll() {
    header.classList.toggle("is-scrolled", window.scrollY > 40);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  function closeNav() {
    nav.classList.remove("is-open");
    toggle.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  }

  toggle.addEventListener("click", function () {
    var open = nav.classList.toggle("is-open");
    toggle.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", open);
  });

  nav.addEventListener("click", function (e) {
    if (e.target.closest("a")) closeNav();
  });

  // ----- Menu (bento) -----
  var menuGrid = document.getElementById("menuGrid");

  function renderMenu(cat) {
    var items = menu.filter(function (m) { return m.category === cat; });
    var rest = items.filter(function (m) { return !m.featured; });
    menuGrid.innerHTML = items
      .map(function (m, i) {
        // Cạnh món nổi bật (2x2) còn 4 ô trống: kéo rộng món thường để lấp kín lưới.
        var wide = !m.featured && (rest.length < 3 || (rest.length === 3 && m === rest[2]));
        var tag = m.tag
          ? '<span class="tag' + (/cay/i.test(m.tag) ? " tag--chili" : "") + '">' + escapeHtml(m.tag) + "</span>"
          : "";
        return (
          '<article class="dish' + (m.featured ? " dish--featured" : "") + (wide ? " dish--wide" : "") + '" style="animation-delay:' + i * 60 + 'ms">' +
            '<img loading="lazy" src="' + m.img + '" alt="' + escapeHtml(m.name) + '" onerror="this.remove()" />' +
            tag +
            '<div class="dish__body"><h3>' + escapeHtml(m.name) + "</h3><p>" + escapeHtml(m.desc) + "</p></div>" +
          "</article>"
        );
      })
      .join("");
  }

  document.getElementById("menuTabs").addEventListener("click", function (e) {
    var chip = e.target.closest(".chip");
    if (!chip) return;
    this.querySelectorAll(".chip").forEach(function (c) { c.classList.toggle("is-active", c === chip); });
    renderMenu(chip.getAttribute("data-cat"));
  });

  renderMenu("lau");

  // ----- Branches -----
  var grid = document.getElementById("branchGrid");
  var empty = document.getElementById("branchEmpty");
  var search = document.getElementById("branchSearch");
  var currentFilter = "all";

  function renderBranches() {
    var q = normalize(search.value.trim());
    var list = branches.filter(function (b) {
      var inRegion = currentFilter === "all" || b.region === currentFilter;
      return inRegion && (!q || normalize(b.name + " " + b.address).indexOf(q) !== -1);
    });

    grid.innerHTML = list.map(function (b, i) {
      var mapUrl = "https://www.google.com/maps/search/?api=1&query=" +
        encodeURIComponent("Lẩu ếch Huyền Anh " + b.address);
      var phone = b.phone
        ? '<a href="tel:' + b.phone + '">' + formatPhone(b.phone) + "</a>"
        : "Xem hotline trên fanpage";
      return (
        '<article class="branch" style="animation-delay:' + i * 40 + 'ms">' +
          '<div class="branch__top"><span class="branch__region">' + (b.region === "hanoi" ? "Hà Nội" : "Tỉnh") + "</span>" +
          '<span class="branch__no">' + String(branches.indexOf(b) + 1).padStart(2, "0") + "</span></div>" +
          "<h3>" + escapeHtml(b.name.replace(/^Cơ sở /, "")) + "</h3>" +
          '<p class="branch__row branch__addr">' + icon("pin") + "<span>" + escapeHtml(b.address) + "</span></p>" +
          '<p class="branch__row">' + icon("phone") + "<span>" + phone + "</span></p>" +
          '<div class="branch__actions">' +
            '<a href="' + mapUrl + '" target="_blank" rel="noopener">Chỉ đường</a>' +
            '<a href="' + b.facebook + '" target="_blank" rel="noopener">Fanpage</a>' +
          "</div>" +
        "</article>"
      );
    }).join("");
    empty.hidden = list.length > 0;
  }

  document.getElementById("branchFilters").addEventListener("click", function (e) {
    var chip = e.target.closest(".chip");
    if (!chip) return;
    this.querySelectorAll(".chip").forEach(function (c) { c.classList.toggle("is-active", c === chip); });
    currentFilter = chip.getAttribute("data-filter");
    renderBranches();
  });
  search.addEventListener("input", renderBranches);

  renderBranches();

  // ----- Booking form -----
  var select = document.getElementById("branchSelect");
  select.innerHTML = '<option value="">-- Chọn cơ sở --</option>' +
    branches.map(function (b, i) {
      return '<option value="' + i + '">' + escapeHtml(b.name) + "</option>";
    }).join("");

  var form = document.getElementById("bookingForm");
  var msg = document.getElementById("formMsg");
  form.querySelector('input[name="date"]').min = new Date().toISOString().split("T")[0];

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!form.checkValidity()) {
      msg.className = "form-msg is-error";
      msg.textContent = "Vui lòng điền đầy đủ và đúng thông tin.";
      form.reportValidity();
      return;
    }
    var d = new FormData(form);
    var b = branches[Number(d.get("branch"))];
    var text =
      "Đặt bàn Lẩu Ếch Huyền Anh - " + b.name + "\n" +
      "Tên: " + d.get("name") + "\n" +
      "SĐT: " + d.get("phone") + "\n" +
      "Thời gian: " + d.get("time") + " ngày " + d.get("date").split("-").reverse().join("/") + "\n" +
      "Số người: " + d.get("people") +
      (d.get("note") ? "\nGhi chú: " + d.get("note") : "");

    msg.className = "form-msg is-success";
    if (b.phone) {
      msg.innerHTML = "Cảm ơn " + escapeHtml(d.get("name")) + "! Bấm để " +
        '<a href="sms:' + b.phone + "?body=" + encodeURIComponent(text) + '">gửi tin nhắn</a> hoặc ' +
        '<a href="tel:' + b.phone + '">gọi ' + formatPhone(b.phone) + "</a> để xác nhận đặt bàn.";
    } else {
      msg.innerHTML = "Cảm ơn " + escapeHtml(d.get("name")) + "! Vui lòng nhắn tin tới " +
        '<a href="' + b.facebook + '" target="_blank" rel="noopener">fanpage ' + escapeHtml(b.name) + "</a> để xác nhận đặt bàn.";
    }
  });

  // ----- Reveal on scroll -----
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
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
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
  }

  // ----- Counters -----
  var provinces = {};
  branches.forEach(function (b) {
    provinces[b.address.split(",").pop().trim()] = true;
  });
  var counts = { branches: branches.length, provinces: Object.keys(provinces).length };

  document.querySelectorAll("[data-total]").forEach(function (el) {
    el.textContent = counts[el.getAttribute("data-total")];
  });

  document.querySelectorAll("[data-count]").forEach(function (el) {
    var key = el.getAttribute("data-count");
    var target = key in counts ? counts[key] : Number(key);
    var start = null;
    function step(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / 1200, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  });

  document.getElementById("year").textContent = new Date().getFullYear();
})();
