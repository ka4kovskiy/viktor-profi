document.addEventListener("DOMContentLoaded", function () {
  var menuToggle = document.querySelector(".menu-toggle");
  var siteNav = document.querySelector(".site-nav");
  var currentYear = document.getElementById("current-year");
  var calculator = document.getElementById("cost-calculator");
  var areaInput = document.getElementById("area");
  var typeSelect = document.getElementById("ceiling-type");
  var lightsInput = document.getElementById("lights");
  var calcResult = document.getElementById("calc-result");

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  if (menuToggle && siteNav) {
    menuToggle.addEventListener("click", function () {
      var isOpen = siteNav.classList.toggle("is-open");
      document.body.classList.toggle("menu-open", isOpen);
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    siteNav.addEventListener("click", function (event) {
      if (event.target.tagName === "A") {
        siteNav.classList.remove("is-open");
        document.body.classList.remove("menu-open");
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  function formatRub(value) {
    return new Intl.NumberFormat("ru-RU").format(Math.max(0, Math.round(value)));
  }

  function updateCalculator() {
    if (!areaInput || !typeSelect || !lightsInput || !calcResult) {
      return;
    }

    var area = parseFloat(String(areaInput.value).replace(",", ".")) || 0;
    var price = parseFloat(typeSelect.value) || 0;
    var lights = parseInt(lightsInput.value, 10) || 0;
    var total = area * price + lights * 350;

    calcResult.textContent = "Ориентировочная стоимость: " + formatRub(total) + " ₽";
  }

  if (calculator) {
    calculator.addEventListener("input", updateCalculator);
    updateCalculator();
  }

  document.querySelectorAll(".js-phone-goal").forEach(function (link) {
    link.addEventListener("click", function () {
      // Цель Яндекс.Метрики: клик по телефону.
      if (window.ym) {
        window.ym(0, "reachGoal", "phone_click");
      }
    });
  });

  document.querySelectorAll(".copy-contact").forEach(function (button) {
    button.addEventListener("click", function () {
      var value = button.getAttribute("data-copy") || "";
      var status = button.parentElement ? button.parentElement.querySelector(".copy-status") : null;

      function showStatus(text) {
        if (!status) {
          return;
        }

        status.textContent = text;
        window.setTimeout(function () {
          status.textContent = "";
        }, 2200);
      }

      function fallbackCopy() {
        var field = document.createElement("textarea");
        field.value = value;
        field.setAttribute("readonly", "");
        field.style.position = "fixed";
        field.style.left = "-9999px";
        document.body.appendChild(field);
        field.select();

        try {
          document.execCommand("copy");
          showStatus("Скопировано");
        } catch (error) {
          showStatus("Скопируйте вручную");
        }

        document.body.removeChild(field);
      }

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(value).then(function () {
          showStatus("Скопировано");
        }).catch(fallbackCopy);
      } else {
        fallbackCopy();
      }
    });
  });

  document.querySelectorAll(".js-scroll-top").forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });

      if (window.history && window.history.replaceState) {
        window.history.replaceState(null, "", window.location.pathname);
      }
    });
  });
});
