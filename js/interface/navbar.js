
(function () {
  "use strict";

  const container = document.getElementById("navbar-container");

  if (!container) return;

  const links = [
    { href: "index.html", label: "Classify" },
    { href: "views.html", label: "Explore" },
    { href: "sets.html", label: "Sets" },
    { href: "proofs.html", label: "Proofs" },
    { href: "categories.html", label: "Categories" }
  ];

  const pathParts = window.location.pathname
    .split("/")
    .filter(Boolean);

  const currentPage = (
    pathParts[pathParts.length - 1] || "index.html"
  ).toLowerCase();

  const linksHTML = links.map(({ href, label }) => {
    const current = href.toLowerCase() === currentPage;

    return `
      <a
        class="site-nav__link"
        href="${href}"
        ${current ? 'aria-current="page"' : ""}
      >${label}</a>
    `;
  }).join("");

  container.innerHTML = `
    <header class="site-nav">
      <div class="site-nav__inner">

        <a
          class="site-nav__brand"
          href="index.html"
          aria-label="Numtax home"
        >NUMTAX</a>

        <nav
          id="site-primary-nav"
          class="site-nav__links"
          aria-label="Main navigation"
        >
          ${linksHTML}
        </nav>

        <button
          class="site-nav__menu-toggle"
          type="button"
          aria-label="Open navigation menu"
          aria-expanded="false"
          aria-controls="site-primary-nav"
        >
          <span class="site-nav__menu-icon" aria-hidden="true">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>

        <button
          id="theme-toggle"
          class="theme-toggle site-nav__theme-toggle"
          type="button"
          data-theme-toggle
          aria-label="Toggle colour theme"
          title="Toggle colour theme"
        >
          <span aria-hidden="true">◐</span>
        </button>

      </div>
    </header>
  `;

  const menuButton = container.querySelector(
    ".site-nav__menu-toggle"
  );

  const navigation = container.querySelector(
    "#site-primary-nav"
  );

  const menuIcon = container.querySelector(
    ".site-nav__menu-icon"
  );

  function setMenuOpen(open) {
    navigation.classList.toggle("is-open", open);
    menuIcon.classList.toggle("is-open", open);

    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute(
      "aria-label",
      open ? "Close navigation menu" : "Open navigation menu"
    );
  }

  menuButton.addEventListener("click", () => {
    const isOpen =
      menuButton.getAttribute("aria-expanded") === "true";

    setMenuOpen(!isOpen);
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenuOpen(false));
  });

  document.addEventListener("click", (event) => {
    const isOpen =
      menuButton.getAttribute("aria-expanded") === "true";

    if (isOpen && !container.contains(event.target)) {
      setMenuOpen(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    const isOpen =
      menuButton.getAttribute("aria-expanded") === "true";

    if (event.key === "Escape" && isOpen) {
      setMenuOpen(false);
      menuButton.focus();
    }
  });

  const desktopMedia = window.matchMedia("(min-width: 821px)");

  function handleBreakpointChange(event) {
    if (event.matches) {
      setMenuOpen(false);
    }
  }

  if (desktopMedia.addEventListener) {
    desktopMedia.addEventListener("change", handleBreakpointChange);
  } else {
    desktopMedia.addListener(handleBreakpointChange);
  }
})();
