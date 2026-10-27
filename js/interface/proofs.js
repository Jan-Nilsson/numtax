
import { PROOFS } from "../proofs/registry.js";

const list = document.getElementById("proofs-list");
const count = document.getElementById("proofs-count");
const searchInput = document.getElementById("proof-search");
const categorySelect = document.getElementById("proof-category");

const KATEX_BASE =
  "https://cdn.jsdelivr.net/npm/katex@0.19.1/dist/";

const MATH_DELIMITERS = [
  { left: "$$", right: "$$", display: true },
  { left: "\\[", right: "\\]", display: true },
  { left: "\\(", right: "\\)", display: false },
  { left: "$", right: "$", display: false },
];

function escapeHTML(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");

    script.src = src;
    script.async = true;
    script.onload = resolve;
    script.onerror = () => {
      reject(new Error(`Could not load script: ${src}`));
    };

    document.head.appendChild(script);
  });
}

async function ensureMathSupport() {
  try {
    if (!window.katex) {
      await loadScript(`${KATEX_BASE}katex.min.js`);
    }

    if (typeof window.renderMathInElement !== "function") {
      await loadScript(
        `${KATEX_BASE}contrib/auto-render.min.js`
      );
    }

    return typeof window.renderMathInElement === "function";
  } catch (error) {
    console.warn(
      "Numtax Proofs: KaTeX could not be loaded.",
      error
    );

    return false;
  }
}

function isMathSegment(segment) {
  return (
    (segment.startsWith("$$") && segment.endsWith("$$")) ||
    (segment.startsWith("\\[") && segment.endsWith("\\]")) ||
    (segment.startsWith("\\(") && segment.endsWith("\\)")) ||
    (
      segment.startsWith("$") &&
      segment.endsWith("$") &&
      !segment.startsWith("$$")
    )
  );
}

function renderInline(markdown) {
  // Protect LaTeX from Markdown emphasis transformations.
  const parts = String(markdown).split(
    /(\$\$[\s\S]*?\$\$|\\\[[\s\S]*?\\\]|\\\([\s\S]*?\\\)|\$[^$\n]+\$)/g
  );

  return parts.map((part) => {
    if (isMathSegment(part)) {
      return escapeHTML(part);
    }

    let html = escapeHTML(part);

    html = html.replace(
      /`([^`]+)`/g,
      "<code>$1</code>"
    );

    html = html.replace(
      /\*\*(.+?)\*\*/g,
      "<strong>$1</strong>"
    );

    html = html.replace(
      /\*(.+?)\*/g,
      "<em>$1</em>"
    );

    return html;
  }).join("");
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

  let mathLines = [];
  let inMathBlock = false;
  let mathClosingDelimiter = null;

  function flushParagraph() {
    if (!paragraph.length) return;

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
    if (!quoteLines.length) return;

    output.push(
      `<blockquote>${quoteLines
        .map(renderInline)
        .join("<br>")}</blockquote>`
    );

    quoteLines = [];
  }

  function flushCode() {
    output.push(
      `<pre><code>${escapeHTML(codeLines.join("\n"))}</code></pre>`
    );

    codeLines = [];
  }

  function flushMath() {
    output.push(
      `<div class="proofs-math-block">${escapeHTML(
        mathLines.join("\n")
      )}</div>`
    );

    mathLines = [];
    inMathBlock = false;
    mathClosingDelimiter = null;
  }

  for (const line of lines) {
    const trimmed = line.trim();

    // Fenced code blocks: do not interpret their contents as LaTeX.
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

    // Collect a multi-line display-math expression.
    if (inMathBlock) {
      mathLines.push(line);

      if (
        trimmed === mathClosingDelimiter ||
        trimmed.endsWith(mathClosingDelimiter)
      ) {
        flushMath();
      }

      continue;
    }

    // Display math on one line, e.g. \[a^2+b^2=c^2\].
    const singleLineMath =
      (
        trimmed.startsWith("\\[") &&
        trimmed.endsWith("\\]")
      ) ||
      (
        trimmed.startsWith("$$") &&
        trimmed.endsWith("$$") &&
        trimmed.length > 4
      );

    if (singleLineMath) {
      flushParagraph();
      flushList();
      flushQuote();

      output.push(
        `<div class="proofs-math-block">${escapeHTML(trimmed)}</div>`
      );

      continue;
    }

    // Start a display-math block.
    if (trimmed === "\\[" || trimmed === "$$") {
      flushParagraph();
      flushList();
      flushQuote();

      inMathBlock = true;
      mathClosingDelimiter =
        trimmed === "\\[" ? "\\]" : "$$";

      mathLines = [trimmed];
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

  if (inCodeBlock) flushCode();
  if (inMathBlock) flushMath();

  return output.join("\n");
}

function renderMath(root) {
  if (typeof window.renderMathInElement !== "function") {
    return;
  }

  window.renderMathInElement(root, {
    delimiters: MATH_DELIMITERS,

    ignoredTags: [
      "script",
      "noscript",
      "style",
      "textarea",
      "pre",
      "code",
      "option",
    ],

    throwOnError: false,
    strict: "warn",
  });
}

function makeCard(proof, markdown) {
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
    `${proof.categoryLabel} · Property: ${proof.property} · ${proof.result}`;

  headingWrap.append(heading, meta);

  const badge = document.createElement("span");
  badge.className = "proofs-badge";
  badge.textContent =
    proof.status === "placeholder" ? "PLACEHOLDER" : "PROOF";

  header.append(headingWrap, badge);

  const content = document.createElement("div");
  content.className = "proofs-markdown";
  content.innerHTML = renderMarkdown(markdown);

  // Crucial: render the LaTeX after the Markdown HTML exists.
  renderMath(content);

  article.append(header, content);

  return article;
}

function showMessage(
  message,
  className = "proofs-empty"
) {
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
    const response = await fetch(url.href);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    return {
      ...proof,
      markdown: await response.text(),
      loadError: false,
    };
  } catch (error) {
    console.error(
      `Could not load proof document: ${proof.path}`,
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
  const query = searchInput.value
    .trim()
    .toLocaleLowerCase();

  const category = categorySelect.value;

  const filtered = proofs.filter((proof) => {
    const matchesCategory =
      category === "all" ||
      proof.category === category;

    const searchable = [
      proof.title,
      proof.categoryLabel,
      proof.property,
      proof.result,
      proof.markdown,
    ].join(" ").toLocaleLowerCase();

    return matchesCategory && searchable.includes(query);
  });

  count.textContent =
    `${filtered.length} ${filtered.length === 1 ? "entry" : "entries"}`;

  list.replaceChildren();

  if (!filtered.length) {
    showMessage("No proof entries match your filters.");
    return;
  }

  for (const proof of filtered) {
    if (proof.loadError) {
      const article = document.createElement("article");
      article.className = "proofs-card";

      const heading = document.createElement("h2");
      heading.textContent = proof.title;

      const error = document.createElement("p");
      error.className = "proofs-error";
      error.textContent =
        `Could not load "${proof.path}". Check that the Markdown ` +
        "file exists at the project root and has been published to Netlify.";

      article.append(heading, error);
      list.appendChild(article);

      continue;
    }

    list.appendChild(makeCard(proof, proof.markdown));
  }
}

async function initializeProofs() {
  if (!list || !count || !searchInput || !categorySelect) {
    console.error(
      "Numtax Proofs: required HTML elements are missing."
    );

    return;
  }

  count.textContent = "Loading proofs…";

  // Load KaTeX before rendering the Markdown documents.
  await ensureMathSupport();

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
}

initializeProofs().catch((error) => {
  console.error(
    "Could not initialize the Proofs page.",
    error
  );

  if (count) count.textContent = "Could not load proofs";

  showMessage(
    "An unexpected error occurred while loading the proof catalogue.",
    "proofs-error"
  );
});
