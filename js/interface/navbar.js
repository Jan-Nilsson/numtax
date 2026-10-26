
const NAV_ITEMS = [
  { href: "index.html", label: "Classify" },
  { href: "views.html", label: "Explore" },
  { href: "proofs.html", label: "Proofs" },
];

function renderNavbar() {
  const container = document.getElementById("navbar-container");

  if (!container) {
    console.warn('Navbar: no se encontró "#navbar-container".');
    return;
  }

  const currentPage =
    window.location.pathname.split("/").pop() || "index.html";

  const nav = document.createElement("nav");
  nav.className = "navbar";

  const logo = document.createElement("a");
  logo.href = "index.html";
  logo.className = "nav-logo";
  logo.setAttribute("aria-label", "Numtax home");
  logo.innerHTML = "num<strong>tax</strong>";

  const links = document.createElement("div");
  links.className = "nav-links";

  NAV_ITEMS.forEach(({ href, label }) => {
    const link = document.createElement("a");

    link.href = href;
    link.className = "nav-link";
    link.textContent = label;

    if (currentPage === href) {
      link.classList.add("nav-link--active");
      link.setAttribute("aria-current", "page");
    }

    links.appendChild(link);
  });

  const themeButton = document.createElement("button");
  themeButton.id = "theme-toggle";
  themeButton.className = "theme-btn";
  themeButton.type = "button";
  themeButton.setAttribute("aria-label", "Toggle theme");

  themeButton.innerHTML = `
    <svg
      class="sun-icon"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.5"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4"></circle>
      <path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"></path>
    </svg>
  `;

  nav.append(logo, links, themeButton);
  container.replaceChildren(nav);
}

renderNavbar();
