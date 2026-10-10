// ---------------------------------------------------------------------------
// Registration link: paste the Google Form URL here once it is ready.
// While empty, all "Register" buttons render as a disabled "Coming Soon" button.
// ---------------------------------------------------------------------------
const REGISTRATION_FORM_URL = "";

document.addEventListener("DOMContentLoaded", () => {
  // --- language toggle ---
  const root = document.documentElement;
  const saved = localStorage.getItem("uja-lang");
  if (saved === "en" || saved === "ja") root.setAttribute("data-lang", saved);

  document.querySelectorAll("[data-lang-btn]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const lang = btn.getAttribute("data-lang-btn");
      root.setAttribute("data-lang", lang);
      localStorage.setItem("uja-lang", lang);
      syncLangButtons(lang);
    });
  });
  syncLangButtons(root.getAttribute("data-lang") || "ja");

  function syncLangButtons(lang) {
    document.querySelectorAll("[data-lang-btn]").forEach((btn) => {
      btn.classList.toggle("active", btn.getAttribute("data-lang-btn") === lang);
    });
  }

  // --- mobile nav ---
  const navToggle = document.querySelector(".nav-toggle-btn");
  const navLinks = document.querySelector(".nav-links");
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => navLinks.classList.toggle("open"));
    navLinks.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => navLinks.classList.remove("open"))
    );
  }

  // --- register buttons ---
  document.querySelectorAll("[data-register-btn]").forEach((btn) => {
    if (REGISTRATION_FORM_URL) {
      btn.setAttribute("href", REGISTRATION_FORM_URL);
      btn.target = "_blank";
      btn.rel = "noopener";
      btn.classList.remove("disabled");
      const badge = btn.querySelector(".coming-soon-badge");
      if (badge) badge.remove();
    } else {
      btn.classList.add("disabled");
      btn.addEventListener("click", (e) => e.preventDefault());
    }
  });
});
