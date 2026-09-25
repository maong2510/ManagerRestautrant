(function () {
  "use strict";

  var branches = window.BRANCHES || [];

  function formatPhone(p) {
    return p.replace(/(\d{4})(\d{3})(\d{3})/, "$1 $2 $3");
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  // ----- Header & mobile nav -----
  var header = document.getElementById("header");
  var nav = document.getElementById("nav");
  var toggle = document.getElementById("navToggle");

  window.addEventListener("scroll", function () {
    header.classList.toggle("is-scrolled", window.scrollY > 40);
  });

  toggle.addEventListener("click", function () {
    var open = nav.classList.toggle("is-open");
    toggle.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", open);
  });

  nav.addEventListener("click", function (e) {
    if (e.target.tagName === "A") {
      nav.classList.remove("is-open");
      toggle.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });

  // ----- Menu tabs -----
  var tabs = document.querySelectorAll(".tab");
  var panels = document.querySelectorAll(".menu__grid");
  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      tabs.forEach(function (t) { t.classList.remove("is-active"); });
      panels.forEach(function (p) {
        var active = p.getAttribute("data-panel") === tab.getAttribute("data-tab");
        p.classList.toggle("is-active", active);
        if (active) {
          p.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("is-visible"); });
        }
      });
      tab.classList.add("is-active");
    });
  });

  // ----- Branches -----
  var grid = document.getElementById("branchGrid");

  function renderBranches(filter) {
    grid.innerHTML = branches
      .filter(function (b) { return filter === "all" || b.region === filter; })
      .map(function (b) {
        var mapUrl = "https://www.google.com/maps/search/?api=1&query=" +
          encodeURIComponent("Lẩu ếch Huyền Anh " + b.address);
        var phone = b.phone
          ? '<a class="branch__phone" href="tel:' + b.phone + '">📞 ' + formatPhone(b.phone) + "</a>"
          : '<span class="branch__phone branch__phone--muted">📞 Xem hotline trên fanpage</span>';
        return (
          '<article class="branch">' +
            '<span class="branch__region">' + (b.region === "hanoi" ? "Hà Nội" : "Tỉnh") + "</span>" +
            "<h3>" + escapeHtml(b.name) + "</h3>" +
            '<p class="branch__addr">📍 ' + escapeHtml(b.address) + "</p>" +
            phone +
            '<div class="branch__actions">' +
              '<a href="' + mapUrl + '" target="_blank" rel="noopener">Chỉ đường</a>' +
              '<a href="' + b.facebook + '" target="_blank" rel="noopener">Fanpage</a>' +
            "</div>" +
          "</article>"
        );
      })
      .join("");
  }

  document.querySelectorAll(".chip").forEach(function (chip) {
    chip.addEventListener("click", function () {
      document.querySelectorAll(".chip").forEach(function (c) { c.classList.remove("is-active"); });
      chip.classList.add("is-active");
      renderBranches(chip.getAttribute("data-filter"));
    });
  });

  renderBranches("all");

  // ----- Booking form -----
  var select = document.getElementById("branchSelect");
  select.innerHTML = '<option value="">-- Chọn cơ sở --</option>' +
    branches.map(function (b, i) {
      return '<option value="' + i + '">' + escapeHtml(b.name) + "</option>";
    }).join("");

  var form = document.getElementById("bookingForm");
  var msg = document.getElementById("formMsg");
  var dateInput = form.querySelector('input[name="date"]');
  dateInput.min = new Date().toISOString().split("T")[0];

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
    }, { threshold: 0.15 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
  }

  // ----- Counter -----
  document.querySelectorAll("[data-count]").forEach(function (el) {
    var target = Number(el.getAttribute("data-count"));
    var n = 0;
    var timer = setInterval(function () {
      n += 1;
      el.textContent = n;
      if (n >= target) clearInterval(timer);
    }, 120);
  });

  document.getElementById("year").textContent = new Date().getFullYear();
})();
