document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");
  const year = document.getElementById("year");
  const playerCount = document.getElementById("playerCount");

  // Aktuelles Jahr automatisch setzen
  if (year) year.textContent = new Date().getFullYear();

  // Mobile Navigation
  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    mainNav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        mainNav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Kleiner visueller Platzhalter für eine spätere echte API.
  // Später kann dieser Bereich durch einen echten Serverstatus ersetzt werden.
  if (playerCount) {
    let current = 1247;
    setInterval(() => {
      const change = Math.floor(Math.random() * 9) - 4;
      current = Math.max(0, current + change);
      playerCount.textContent = current.toLocaleString("de-DE");
    }, 5000);
  }

  // Header beim Scrollen leicht verändern
  const header = document.querySelector(".site-header");
  window.addEventListener("scroll", () => {
    if (!header) return;
    header.style.background = window.scrollY > 30
      ? "rgba(5, 6, 9, .94)"
      : "rgba(5, 6, 9, .78)";
  }, { passive: true });
});
