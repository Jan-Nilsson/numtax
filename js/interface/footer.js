
(function () {
  "use strict";

  const container = document.getElementById("footer-container");

  if (!container) {
    return;
  }

  container.innerHTML = `
    <footer class="site-footer">
      <div class="site-footer__inner">
        <p class="site-footer__brand">
          <span class="site-footer__name">NUMTAX</span>
          <span class="site-footer__description">
            Exploring integers through structure and computation.
          </span>
        </p>

        <nav class="site-footer__links" aria-label="Footer navigation">
          <a href="about.html">About</a>
          <a href="methods.html">Methods</a>
          <a href="contribute.html">Contribute</a>
        </nav>
      </div>
    </footer>
  `;
})();
