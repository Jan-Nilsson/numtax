
(function () {
  "use strict";

  const container = document.getElementById("footer-container");

  if (!container) {
    return;
  }

  const links = [
    { href: "about.html", label: "About" },
    { href: "methods.html", label: "Methods" },
    { href: "contribute.html", label: "Contribute" }
  ];

  const currentPage =
    window.location.pathname.split("/").filter(Boolean).pop()?.toLowerCase()
    || "index.html";

  const visibleLinks = links.filter(
    (link) => link.href.toLowerCase() !== currentPage
  );

  const linksHTML = visibleLinks
    .map(
      (link) =>
        `<a href="${link.href}">${link.label}</a>`
    )
    .join("\n");

  container.innerHTML = `
    <footer class="site-footer">
      <div class="site-footer__inner">
        <div class="site-footer__brand">
          <span class="site-footer__name">NUMTAX</span>
          <span class="site-footer__description">
            Exploring integers through structure and computation.
          </span>
        </div>

        <nav class="site-footer__links" aria-label="Footer navigation">
          ${linksHTML}
        </nav>
      </div>
    </footer>
  `;
})();
