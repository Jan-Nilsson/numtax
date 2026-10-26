
import { PROOFS } from "../proofs/registry.js";

const list = document.getElementById("proofs-list");
const count = document.getElementById("proofs-count");
const searchInput = document.getElementById("proof-search");
const categorySelect = document.getElementById("proof-category");

function escapeHTML(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderInline(markdown) {
  let html = escapeHTML(markdown);

  html = html.replace(/`([^`]+)`/g, "<code>$1</code>");
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");

  return html;
}

function renderMarkdown(markdown) {
  const lines = String(markdown)
    .replace(/\r\n/g, "\n")
    .split("\n");

  const output = [];

  let paragraph = [];
  let listType = null;
  let listItems = [];
  let quoteLines = [];
  let codeLines = [];
  let inCodeBlock = false;

  function flushParagraph() {
    if (paragraph.length === 0) return;

    output.push(
      `<p>${paragraph.map(renderInline).join(" ")}</p>`
    );

    paragraph = [];
  }

  function flushList() {
    if (!listType) return;

    const items = listItems
      .map((item) => `<li>${renderInline(item)}</li>`)
      .join("");

    output.push(`<${listType}>${items}</${listType}>`);

    listType = null;
    listItems = [];
  }

  function flushQuote() {
    if (quoteLines.length === 0) return;

    output.push(
      `<blockquote>${quoteLines
        .map(renderInline)
        .join("<br>")}</blockquote>`
    );

    quoteLines = [];
  }

  function flushCode() {
    if (codeLines.length === 0) return;

    output.push(
      `<pre><code>${escapeHTML(codeLines.join("\n"))}</code></pre>`
    );

    codeLines = [];
  }

  for (const line of lines) {
    const trimmed = line.trim();

    if (/^```/.test(trimmed)) {
      if (inCodeBlock) {
        flushCode();
        inCodeBlock = false;
      } else {
        flushParagraph();
        flushList();
        flushQuote();
        inCodeBlock = true;
      }

      continue;
    }

    if (inCodeBlock) {
      codeLines.push(line);
      continue;
    }

    if (!trimmed) {
      flushParagraph();
      flushList();
      flushQuote();
      continue;
    }

    const heading = trimmed.match(/^(#{1,3})\s+(.+)$/);

    if (heading) {
      flushParagraph();
      flushList();
      flushQuote();

      const level = heading[1].length;

      output.push(
        `<h${level}>${renderInline(heading[2])}</h${level}>`
      );

      continue;
    }

    const quote = trimmed.match(/^>\s?(.*)$/);

    if (quote) {
      flushParagraph();
      flushList();

      quoteLines.push(quote[1]);
      continue;
    }

    const ordered = trimmed.match(/^\d+[.)]\s+(.+)$/);
    const unordered = trimmed.match(/^[-*+]\s+(.+)$/);

    if (ordered || unordered) {
      flushParagraph();
      flushQuote();

      const nextType = ordered ? "ol" : "ul";

      if (listType && listType !== nextType) {
        flushList();
      }

      listType = nextType;
      listItems.push((ordered || unordered)[1]);

      continue;
    }

    flushList();
    flushQuote();

    paragraph.push(trimmed);
  }

  flushParagraph();
  flushList();
  flushQuote();

  if (inCodeBlock) {
    flushCode();
  }

  return output.join("\n");
}

function createProofCard(proof, markdown) {
  const article = document.createElement("article");
  article.className = "proofs-card";
  article.dataset.category = proof.category;

  const header = document.createElement("header");
  header.className = "proofs-card-header";

  const headingWrap = document.createElement("div");

  const heading = document.createElement("h2");
  heading.textContent = proof.title;

  const meta = document.createElement("div");
  meta.className = "proofs-card-meta";
  meta.textContent =
    `${proof.categoryLabel} · ${proof.property} · ${proof.result}`;

  headingWrap.append(heading, meta);

  const badge = document.createElement("span");
  badge.className = "proofs-badge";
  badge.textContent =
    proof.status === "placeholder" ? "PLACEHOLDER" : "PROOF";

  header.append(headingWrap, badge);

  const content = document.createElement("div");
  content.className = "proofs-markdown";
  content.innerHTML = renderMarkdown(markdown);

  article.append(header, content);

  return article;
}

function showMessage(message, className = "proofs-empty") {
  if (!list) return;

  list.replaceChildren();

  const element = document.createElement("p");
  element.className = className;
  element.textContent = message;

  list.appendChild(element);
}

async function loadProofDocument(proof) {
  try {
    const url = new URL(proof.path, document.baseURI);
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const markdown = await response.text();

    return {
      ...proof,
      markdown,
      loadError: false,
    };
  } catch (error) {
    console.error(
      `Numtax: failed to load proof document "${proof.path}".`,
      error
    );

    return {
      ...proof,
      markdown: "",
      loadError: true,
    };
  }
}

function renderProofList(proofs) {
  const query = searchInput.value.trim().toLocaleLowerCase();
  const selectedCategory = categorySelect.value;

  const filtered = proofs.filter((proof) => {
    const matchesCategory =
      selectedCategory === "all" ||
      proof.category === selectedCategory;

    const searchableText = [
      proof.title,
      proof.categoryLabel,
      proof.property,
      proof.result,
      proof.markdown,
    ]
      .join(" ")
      .toLocaleLowerCase();

    return matchesCategory && searchableText.includes(query);
  });

  count.textContent =
    `${filtered.length} ${filtered.length === 1 ? "entry" : "entries"}`;

  list.replaceChildren();

  if (filtered.length === 0) {
    showMessage("No proof entries match your filters.");
    return;
  }

  for (const proof of filtered) {
    if (proof.loadError) {
      const article = document.createElement("article");
      article.className = "proofs-card";

      const heading = document.createElement("h2");
      heading.textContent = proof.title;

      const message = document.createElement("p");
      message.className = "proofs-error";
      message.textContent =
        `Could not load "${proof.path}". Check that the file exists ` +
        "and that Numtax is being served over HTTP or HTTPS.";

      article.append(heading, message);
      list.appendChild(article);

      continue;
    }

    list.appendChild(createProofCard(proof, proof.markdown));
  }
}

async function initializeProofs() {
  if (!list || !count || !searchInput || !categorySelect) {
    console.error(
      "Numtax: the Proofs page is missing one or more required HTML elements."
    );
    return;
  }

  count.textContent = "Loading proofs…";

  try {
    const proofs = await Promise.all(
      PROOFS.map(loadProofDocument)
    );

    searchInput.addEventListener("input", () => {
      renderProofList(proofs);
    });

    categorySelect.addEventListener("change", () => {
      renderProofList(proofs);
    });

    renderProofList(proofs);
  } catch (error) {
    console.error("Numtax: could not initialize the Proofs page.", error);

    count.textContent = "Error";

    showMessage(
      "An unexpected error occurred while loading the proof catalogue.",
      "proofs-error"
    );
  }
}

initializeProofs();
