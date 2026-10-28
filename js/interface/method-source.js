
const searchInput = document.getElementById("method-source-search");
const categorySelect = document.getElementById("method-source-category");
const listElement = document.getElementById("method-source-list");
const countElement = document.getElementById("method-source-count");
const statusElement = document.getElementById("method-source-status");
const emptyElement = document.getElementById("method-source-empty");
const viewerElement = document.getElementById("method-source-viewer");
const codePanel = document.getElementById("method-source-code-panel");
const codeElement = document.getElementById("method-source-code");
const titleElement = document.getElementById("method-source-title");
const categoryLabel = document.getElementById("method-source-file-category");
const pathElement = document.getElementById("method-source-file-path");
const openFileLink = document.getElementById("method-source-open-file");

const requiredElements = [
  searchInput,
  categorySelect,
  listElement,
  countElement,
  statusElement,
  emptyElement,
  viewerElement,
  codePanel,
  codeElement,
  titleElement,
  categoryLabel,
  pathElement,
  openFileLink
];

if (requiredElements.every(Boolean)) {
  startMethodSourceExplorer();
} else {
  console.warn("Methods source explorer: required HTML elements are missing.");
}

async function startMethodSourceExplorer() {
  let algorithms = [];
  let selectedPath = null;
  let requestNumber = 0;

  const indexUrl = new URL("../generated/algorithms-index.json", import.meta.url);

  setStatus("Loading algorithm index…");
  setCount("Loading…");

  try {
    const response = await fetch(indexUrl, { cache: "no-cache" });

    if (!response.ok) {
      throw new Error(`Index request failed (${response.status})`);
    }

    const index = await response.json();

    if (!index || !Array.isArray(index.algorithms)) {
      throw new Error("The generated index has an unexpected format.");
    }

    algorithms = index.algorithms.filter((item) =>
      item &&
      typeof item.name === "string" &&
      typeof item.category === "string" &&
      typeof item.path === "string" &&
      typeof item.url === "string"
    );

    populateCategories(algorithms);
    renderList();

    if (algorithms.length > 0) {
      const first = getFilteredAlgorithms()[0] ?? algorithms[0];
      await selectAlgorithm(first);
      setStatus("Source loaded from the original files in js/algorithms.");
    } else {
      setEmpty(
        "No JavaScript algorithm files were found. Add a .js file inside js/algorithms and regenerate the index."
      );
      setStatus("No algorithm files found.");
      setCount("0 files");
    }
  } catch (error) {
    console.error("Numtax Methods source explorer:", error);

    setEmpty(
      "The algorithm index could not be loaded. Run `node scripts/generate-algorithm-index.mjs` and reload this page using a local web server."
    );
    setStatus("Could not load the source index.");
    setCount("Unavailable");
  }

  searchInput.addEventListener("input", applyFilters);
  categorySelect.addEventListener("change", applyFilters);

  function applyFilters() {
    renderList();

    const filtered = getFilteredAlgorithms();

    if (!filtered.some((item) => item.path === selectedPath)) {
      if (filtered.length > 0) {
        selectAlgorithm(filtered[0]);
      } else {
        clearViewer("No algorithms match these filters.");
      }
    }
  }

  function getFilteredAlgorithms() {
    const query = searchInput.value.trim().toLocaleLowerCase();
    const category = categorySelect.value;

    return algorithms.filter((item) => {
      const categoryMatches = !category || item.category === category;
      const searchable =
        `${item.name} ${item.category} ${item.path}`.toLocaleLowerCase();

      return categoryMatches && (!query || searchable.includes(query));
    });
  }

  function populateCategories(items) {
    const categories = [...new Set(items.map((item) => item.category))]
      .sort((a, b) => a.localeCompare(b, "en"));

    for (const category of categories) {
      const option = document.createElement("option");
      option.value = category;
      option.textContent = category;
      categorySelect.append(option);
    }
  }

  function renderList() {
    const filtered = getFilteredAlgorithms();

    listElement.replaceChildren();
    setCount(`${filtered.length} ${filtered.length === 1 ? "file" : "files"}`);

    for (const item of filtered) {
      const listItem = document.createElement("li");
      listItem.className = "method-source-list-item";

      const button = document.createElement("button");
      button.type = "button";
      button.className = "method-source-file-button";
      button.setAttribute(
        "aria-current",
        item.path === selectedPath ? "true" : "false"
      );
      button.setAttribute(
        "aria-label",
        `${item.name}, ${item.category}, ${item.path}`
      );

      const name = document.createElement("span");
      name.className = "method-source-file-name";
      name.textContent = item.name;

      const meta = document.createElement("span");
      meta.className = "method-source-file-meta";
      meta.textContent = item.path;

      button.append(name, meta);
      button.addEventListener("click", () => selectAlgorithm(item));

      listItem.append(button);
      listElement.append(listItem);
    }

    if (filtered.length === 0) {
      const message = document.createElement("li");
      message.className = "method-source-list-empty";
      message.textContent = "No matching files.";
      listElement.append(message);
    }
  }

  async function selectAlgorithm(item) {
    selectedPath = item.path;
    const currentRequest = ++requestNumber;

    renderList();

    titleElement.textContent = item.name;
    categoryLabel.textContent = item.category;
    pathElement.textContent = item.path;
    openFileLink.href = item.url;
    openFileLink.hidden = false;

    emptyElement.hidden = true;
    codePanel.hidden = false;
    codeElement.textContent = "Loading source…";
    viewerElement.setAttribute("aria-busy", "true");

    try {
      const sourceUrl = new URL(item.url, document.baseURI);
      const response = await fetch(sourceUrl, { cache: "no-cache" });

      if (!response.ok) {
        throw new Error(`Source request failed (${response.status})`);
      }

      const source = await response.text();

      // Ignore an older response if another file was selected in the meantime.
      if (currentRequest !== requestNumber) return;

      codeElement.textContent = source;
      setStatus(`Showing ${item.path}`);
    } catch (error) {
      if (currentRequest !== requestNumber) return;

      console.error(`Could not load ${item.path}:`, error);
      codeElement.textContent =
        `Could not load this source file. Check that it is deployed at ${item.url}.`;
      setStatus(`Could not load ${item.path}`);
    } finally {
      if (currentRequest === requestNumber) {
        viewerElement.setAttribute("aria-busy", "false");
      }
    }
  }

  function clearViewer(message) {
    selectedPath = null;
    requestNumber += 1;

    renderList();

    codePanel.hidden = true;
    openFileLink.hidden = true;
    viewerElement.setAttribute("aria-busy", "false");
    setEmpty(message);
  }

  function setEmpty(message) {
    emptyElement.textContent = message;
    emptyElement.hidden = false;
    codePanel.hidden = true;
  }

  function setStatus(message) {
    statusElement.textContent = message;
  }

  function setCount(message) {
    countElement.textContent = message;
  }
}
