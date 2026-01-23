/* assets/app.js
   ใช้ร่วมทั้งเว็บ: Drawer (เมนู 3 ขีด) + Scroll Reveal + ปีลิขสิทธิ์ + ไฮไลต์เมนูหน้าปัจจุบัน
*/

(function () {
  "use strict";

  // รันเมื่อ DOM พร้อม
  document.addEventListener("DOMContentLoaded", () => {
    // ===== 1) ปีลิขสิทธิ์ =====
    const y = document.getElementById("y");
    if (y) y.textContent = new Date().getFullYear();

    // ===== 2) Drawer open/close =====
    const openBtn = document.getElementById("drawerOpen");
    const closeBtn = document.getElementById("drawerClose");
    const overlay = document.getElementById("drawerOverlay");
    const drawer = document.getElementById("drawer");
    const drawerLinks = document.querySelectorAll("[data-drawer-link]");

    const canUseDrawer = !!(openBtn && closeBtn && overlay && drawer);

    function openDrawer() {
      if (!canUseDrawer) return;
      document.body.classList.add("drawerOpen");
      openBtn.setAttribute("aria-expanded", "true");
      // โฟกัสปุ่มปิดเพื่อใช้งานคีย์บอร์ด
      setTimeout(() => closeBtn.focus(), 50);
    }

    function closeDrawer() {
      if (!canUseDrawer) return;
      document.body.classList.remove("drawerOpen");
      openBtn.setAttribute("aria-expanded", "false");
      setTimeout(() => openBtn.focus(), 50);
    }

    if (canUseDrawer) {
      openBtn.addEventListener("click", openDrawer);
      closeBtn.addEventListener("click", closeDrawer);
      overlay.addEventListener("click", closeDrawer);

      drawerLinks.forEach((a) => {
        a.addEventListener("click", () => closeDrawer());
      });

      // ESC ปิด drawer
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && document.body.classList.contains("drawerOpen")) {
          closeDrawer();
        }
      });
    }

    // ===== 3) Scroll Reveal (IntersectionObserver) =====
    const items = document.querySelectorAll(".reveal");
    if (items.length) {
      if (!("IntersectionObserver" in window)) {
        items.forEach((el) => el.classList.add("is-in"));
      } else {
        const observer = new IntersectionObserver(
          (entries, obs) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add("is-in");
                obs.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.12, rootMargin: "0px 0px -10% 0px" }
        );

        items.forEach((el) => observer.observe(el));
      }
    }

    // ===== 4) ไฮไลต์เมนูหน้าปัจจุบัน (optional แต่ดีมาก) =====
    // ทำงานกับลิงก์แบบ products.html / about.html / contact.html
    const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();

    // ปัก active ให้เมนูที่ตรงกับหน้า
    document.querySelectorAll('a[href]').forEach((a) => {
      const href = (a.getAttribute("href") || "").toLowerCase();
      if (!href || href.startsWith("http") || href.startsWith("#") || href.startsWith("tel:")) return;

      // ให้รองรับแบบ "/products.html" หรือ "products.html"
      const cleanHref = href.split("/").pop();
      if (cleanHref && cleanHref === path) {
        a.classList.add("is-active-link");
        a.setAttribute("aria-current", "page");
      }
    });
  });
})();