/* assets/app.js
   - Drawer open/close
   - Close on overlay click
   - Close on ESC
*/

(function(){
  "use strict";

  document.addEventListener("DOMContentLoaded", () => {
    const openBtn  = document.getElementById("drawerOpen");
    const closeBtn = document.getElementById("drawerClose");
    const overlay  = document.getElementById("drawerOverlay");
    const drawer   = document.getElementById("drawer");

    if (!openBtn || !closeBtn || !overlay || !drawer) return;

    const focusableSelector =
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

    function openDrawer(){
      document.body.classList.add("drawerOpen");
      openBtn.setAttribute("aria-expanded", "true");
      overlay.setAttribute("aria-hidden", "false");

      // focus close button
      setTimeout(() => closeBtn.focus(), 0);
    }

    function closeDrawer(){
      document.body.classList.remove("drawerOpen");
      openBtn.setAttribute("aria-expanded", "false");
      overlay.setAttribute("aria-hidden", "true");

      // return focus to burger
      setTimeout(() => openBtn.focus(), 0);
    }

    openBtn.addEventListener("click", openDrawer);
    closeBtn.addEventListener("click", closeDrawer);
    overlay.addEventListener("click", closeDrawer);

    // close on ESC
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && document.body.classList.contains("drawerOpen")) {
        closeDrawer();
      }
    });

    // basic focus trap inside drawer
    document.addEventListener("keydown", (e) => {
      if (e.key !== "Tab") return;
      if (!document.body.classList.contains("drawerOpen")) return;

      const focusables = drawer.querySelectorAll(focusableSelector);
      if (!focusables.length) return;

      const first = focusables[0];
      const last  = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    });

    // optional: close when clicking any link in drawer
    drawer.querySelectorAll('a[data-drawer-link]').forEach((a) => {
      a.addEventListener("click", () => closeDrawer());
    });
  });
})();