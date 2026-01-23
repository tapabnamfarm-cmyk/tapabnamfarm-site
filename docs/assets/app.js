/* assets/app.js
   ใช้ร่วมทั้งเว็บ:
   - เมนู 3 ขีด (Overlay กลางจอแบบตัวอย่าง)
   - ปีลิขสิทธิ์
   - ไฮไลต์เมนูหน้าปัจจุบัน
*/

(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", () => {
    // ===== 1) ปีลิขสิทธิ์ =====
    const y = document.getElementById("y");
    if (y) y.textContent = new Date().getFullYear();

    // ===== 2) Menu Overlay open/close =====
    const openBtn = document.getElementById("drawerOpen");
    const closeBtn = document.getElementById("drawerClose");
    const overlay = document.getElementById("drawerOverlay");
    const panel = document.getElementById("drawer");
    const menuLinks = document.querySelectorAll("[data-drawer-link]");

    const canUseMenu = !!(openBtn && closeBtn && overlay && panel);

    function openMenu() {
      if (!canUseMenu) return;
      document.body.classList.add("drawerOpen");
      openBtn.setAttribute("aria-expanded", "true");
      setTimeout(() => closeBtn.focus(), 30);
    }

    function closeMenu() {
      if (!canUseMenu) return;
      document.body.classList.remove("drawerOpen");
      openBtn.setAttribute("aria-expanded", "false");
      setTimeout(() => openBtn.focus(), 30);
    }

    if (canUseMenu) {
      openBtn.addEventListener("click", openMenu);
      closeBtn.addEventListener("click", closeMenu);
      overlay.addEventListener("click", closeMenu);

      // คลิกเมนูแล้วปิด (ถ้าเป็น anchor ในหน้าเดียวก็ยังปิด)
      menuLinks.forEach((a) => a.addEventListener("click", () => closeMenu()));

      // ESC ปิด
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && document.body.classList.contains("drawerOpen")) {
          closeMenu();
        }
      });
    }

    // ===== 3) ไฮไลต์เมนูหน้าปัจจุบัน =====
    const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();

    document.querySelectorAll("a[href]").forEach((a) => {
      const href = (a.getAttribute("href") || "").toLowerCase();
      if (!href || href.startsWith("http") || href.startsWith("#") || href.startsWith("tel:")) return;

      const cleanHref = href.split("/").pop();
      if (cleanHref && cleanHref === path) {
        a.classList.add("is-active-link");
        a.setAttribute("aria-current", "page");
      }
    });
  });
})();