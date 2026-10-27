import { CATEGORY_COMPONENTS } from "../categories/registry.js";

const list = document.getElementById("categories-list");
const count = document.getElementById("categories-count");

function createCard(component) {
  const article = document.createElement("article");
  article.className = "categories-card";
  article.dataset.componentId = component.id;

  const label = document.createElement("p");
  label.className = "categories-card-label";
  label.textContent = component.label;

  const title = document.createElement("h3");
  title.textContent = component.title;

  const description = document.createElement("p");
  description.textContent = component.description;

  const status = document.createElement("span");
  status.className = "categories-card-status";
  status.textContent = component.status;

  article.append(label, title, description, status);
  return article;
}

function render() {
  if (!list || !count) {
    console.error(
      "Numtax Categories: missing #categories-list or #categories-count."
    );
    return;
  }

  count.textContent = `${CATEGORY_COMPONENTS.length} components`;

  const fragment = document.createDocumentFragment();
  for (const component of CATEGORY_COMPONENTS) {
    fragment.appendChild(createCard(component));
  }

  list.replaceChildren(fragment);
}

render();
