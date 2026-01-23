/* assets/app.js
   ใช้ร่วมทั้งเว็บ: Drawer (เมนู 3 ขีด) + Scroll Reveal + ปีลิขสิทธิ์ + ไฮไลต์เมนูหน้าปัจจุบัน
   (ปรับปรุง: lock scroll + focus trap + aria ให้สมบูรณ์ รองรับ Drawer UI แบบเต็มจอ)
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

    // จำโฟกัสก่อนเปิด เพื่อคืนกลับตอนปิด
    let lastActiveEl = null;

    // ตัวช่วย: หา focusable elements
    function getFocusable(container) {
      if (!container) return [];
      return Array.from(
        container.querySelectorAll(
          [
            'a[href]',
            'button:not([disabled])',
            'input:not([disabled])',
            'select:not([disabled])',
            'textarea:not([disabled])',
            '[tabindex]:not([tabindex="-1"])'
          ].join(",")
        )
      ).filter((el) => el.offsetParent !== null);
    }

    // Focus trap
    function trapFocus(e) {
      if (!document.body.classList.contains("drawerOpen")) return;
      if (e.key !== "Tab") return;

      const focusables = getFocusable(drawer);
      if (!focusables.length) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      // Shift+Tab จากตัวแรก -> ไปตัวท้าย
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
      // Tab จากตัวท้าย -> ไปตัวแรก
      else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    function setDrawerAria(isOpen) {
      if (!canUseDrawer) return;
      overlay.setAttribute("aria-hidden", String(!isOpen));
      drawer.setAttribute("aria-hidden", String(!isOpen));
      openBtn.setAttribute("aria-expanded", String(isOpen));
    }

    function lockScroll(isLock) {
      // ใช้ class เพื่อให้ไปคุมใน CSS ได้ด้วย (เผื่ออยากเพิ่ม)
      document.documentElement.classList.toggle("noScroll", !!isLock);
      document.body.classList.toggle("noScroll", !!isLock);

      // กันเหนียว: inline style ช่วยบนมือถือบางรุ่น
      if (isLock) {
        document.body.style.overflow = "hidden";
        document.body.style.touchAction = "none";
      } else {
        document.body.style.overflow = "";
        document.body.style.touchAction = "";
      }
    }

    function openDrawer() {
      if (!canUseDrawer) return;
      lastActiveEl = document.activeElement;

      document.body.classList.add("drawerOpen");
      setDrawerAria(true);
      lockScroll(true);

      // โฟกัสปุ่มปิดเพื่อใช้งานคีย์บอร์ด
      setTimeout(() => closeBtn.focus(), 50);
      document.addEventListener("keydown", trapFocus);
    }

    function closeDrawer() {
      if (!canUseDrawer) return;

      document.body.classList.remove("drawerOpen");
      setDrawerAria(false);
      lockScroll(false);

      document.removeEventListener("keydown", trapFocus);

      // คืนโฟกัสเดิม (ถ้ามี) ไม่งั้นคืนไปที่ปุ่มเปิด
      setTimeout(() => {
        if (lastActiveEl && typeof lastActiveEl.focus === "function") {
          lastActiveEl.focus();
        } else {
          openBtn.focus();
        }
      }, 50);
    }

    if (canUseDrawer) {
      // ค่าเริ่มต้น aria
      setDrawerAria(false);

      openBtn.addEventListener("click", openDrawer);
      closeBtn.addEventListener("click", closeDrawer);
      overlay.addEventListener("click", closeDrawer);

      drawerLinks.forEach((a) => {
        a.addEventListener("click", () => {
          // ปิดเมนูทันที แต่ยังปล่อยให้ browser ไปหน้า/ไป anchor ต่อ
          closeDrawer();
        });
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

    // ===== 4) ไฮไลต์เมนูหน้าปัจจุบัน =====
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