import { SETS } from "../sets/registry.js";

const list = document.getElementById("sets-list");
const count = document.getElementById("sets-count");
const searchInput = document.getElementById("set-search");
const categorySelect = document.getElementById("set-category");

function addTextElement(parent, tag, className, text) {
  const element = document.createElement(tag);

  if (className) {
    element.className = className;
  }

  element.textContent = text;
  parent.appendChild(element);

  return element;
}

function createSetCard(set) {
  const article = document.createElement("article");

  article.className = "set-card";
  article.dataset.setId = set.id;
  article.dataset.category = set.category;

  const header = document.createElement("header");
  header.className = "set-card-header";

  addTextElement(header, "h2", "set-card-title", set.name);

  addTextElement(
    header,
    "span",
    "set-category",
    set.categoryLabel
  );

  article.appendChild(header);

  addTextElement(
    article,
    "p",
    "set-definition",
    set.definition
  );

  if (set.notation) {
    addTextElement(
      article,
      "code",
      "set-notation",
      set.notation
    );
  }

  if (set.keywords?.length) {
    const keywords = document.createElement("div");

    keywords.className = "set-keywords";
    keywords.setAttribute(
      "aria-label",
      "Related keywords"
    );

    for (const keyword of set.keywords) {
      addTextElement(
        keywords,
        "span",
        "set-keyword",
        keyword
      );
    }

    article.appendChild(keywords);
  }

  return article;
}

function getFilteredSets() {
  const query = searchInput.value
    .trim()
    .toLocaleLowerCase();

  const selectedCategory = categorySelect.value;

  return SETS.filter((set) => {
    const matchesCategory =
      selectedCategory === "all" ||
      set.category === selectedCategory;

    const searchableText = [
      set.name,
      set.categoryLabel,
      set.definition,
      set.notation ?? "",
      ...(set.keywords ?? []),
    ]
      .join(" ")
      .toLocaleLowerCase();

    return (
      matchesCategory &&
      searchableText.includes(query)
    );
  });
}

function render() {
  if (!list || !count || !searchInput || !categorySelect) {
    return;
  }

  const filteredSets = getFilteredSets();

  count.textContent =
    `${filteredSets.length} ` +
    `${filteredSets.length === 1 ? "set" : "sets"}`;

  list.replaceChildren();

  if (filteredSets.length === 0) {
    addTextElement(
      list,
      "p",
      "sets-state",
      "No sets match your search and filters."
    );

    return;
  }

  const fragment = document.createDocumentFragment();

  for (const set of filteredSets) {
    fragment.appendChild(createSetCard(set));
  }

  list.appendChild(fragment);
}

function initializeSets() {
  if (!list || !count || !searchInput || !categorySelect) {
    console.error(
      "Numtax Sets: required HTML elements are missing. " +
      "Check sets.html for sets-list, sets-count, " +
      "set-search and set-category."
    );

    return;
  }

  searchInput.addEventListener("input", render);
  categorySelect.addEventListener("change", render);

  render();
}

initializeSets();