(function () {
  "use strict";

  const searchInput = document.getElementById("method-search");
  const methodsGrid = document.getElementById("methods-grid");
  const countElement = document.getElementById("methods-count");
  const emptyMessage = document.getElementById("methods-empty");

  if (!searchInput || !methodsGrid || !countElement || !emptyMessage) {
    return;
  }

  const cards = Array.from(
    methodsGrid.querySelectorAll("[data-method-card]")
  );

  function updateMethods() {
    const query = searchInput.value.trim().toLowerCase();
    let visibleCount = 0;

    cards.forEach((card) => {
      const searchableText = [
        card.textContent || "",
        card.dataset.search || ""
      ].join(" ").toLowerCase();

      const matches = searchableText.includes(query);

      card.hidden = !matches;

      if (matches) {
        visibleCount += 1;
      }
    });

    countElement.textContent =
      `Showing ${visibleCount} of ${cards.length} topics`;

    emptyMessage.hidden = visibleCount !== 0;
  }

  searchInput.addEventListener("input", updateMethods);

  updateMethods();
})();