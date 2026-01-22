/* =========================================================
   Tapabnam Farm - Shared JS (one JS for all pages)
   - Drawer (เมนู 3 ขีด)
   - (optional) Auto highlight current page link later
   ========================================================= */

(function () {
  // ----- Drawer elements (if exists on page) -----
  const openBtn = document.getElementById("drawerOpen");
  const closeBtn = document.getElementById("drawerClose");
  const overlay = document.getElementById("drawerOverlay");
  const drawer = document.getElementById("drawer");

  const drawerLinks = document.querySelectorAll("[data-drawer-link]");

  function openDrawer() {
    document.body.classList.add("drawerOpen");
    if (openBtn) openBtn.setAttribute("aria-expanded", "true");
    // focus close for accessibility
    if (closeBtn) setTimeout(() => closeBtn.focus(), 50);
  }

  function closeDrawer() {
    document.body.classList.remove("drawerOpen");
    if (openBtn) openBtn.setAttribute("aria-expanded", "false");
    if (openBtn) setTimeout(() => openBtn.focus(), 50);
  }

  // Only bind if drawer exists on this page
  if (drawer && openBtn && closeBtn && overlay) {
    openBtn.addEventListener("click", openDrawer);
    closeBtn.addEventListener("click", closeDrawer);
    overlay.addEventListener("click", closeDrawer);

    drawerLinks.forEach((a) => {
      a.addEventListener("click", () => closeDrawer());
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && document.body.classList.contains("drawerOpen")) {
        closeDrawer();
      }
    });
  }

  // ----- Footer year (optional, safe) -----
  const y = document.getElementById("y");
  if (y) y.textContent = new Date().getFullYear();
})();
