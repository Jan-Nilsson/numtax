
import { readdir, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDir, "..");
const algorithmsDir = path.join(projectRoot, "js", "algorithms");
const outputFile = path.join(
  projectRoot,
  "js",
  "generated",
  "algorithms-index.json"
);

const knownCategories = [
  { label: "Digits", terms: ["digit", "digits"] },
  { label: "Divisors", terms: ["divisor", "divisors"] },
  {
    label: "Factorization",
    terms: ["factor", "factorization", "factorisation"]
  },
  {
    label: "Figurate numbers",
    terms: ["figurate", "triangular", "square-number"]
  },
  { label: "Primes", terms: ["prime", "primality"] },
  { label: "Sequences", terms: ["sequence", "sequences", "fibonacci"] }
];

function titleCase(value) {
  return value
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[._-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

function inferCategory(relativeParts, filename) {
  // If a file is in a subfolder, its first folder defines the category.
  if (relativeParts.length > 0) {
    return titleCase(relativeParts[0]);
  }

  // Infer categories for the existing files directly inside js/algorithms/.
  const stem = path.basename(filename, ".js").toLowerCase();

  const match = knownCategories.find((category) =>
    category.terms.some((term) => stem.includes(term))
  );

  return match?.label ?? "General";
}

async function walk(directory, relativeParts = []) {
  let entries;

  try {
    entries = await readdir(directory, { withFileTypes: true });
  } catch (error) {
    if (error.code === "ENOENT") return [];
    throw error;
  }

  entries.sort((a, b) => a.name.localeCompare(b.name, "en"));

  const files = [];

  for (const entry of entries) {
    if (entry.name.startsWith(".")) continue;

    const absolutePath = path.join(directory, entry.name);
    const parts = [...relativeParts, entry.name];

    if (entry.isDirectory()) {
      files.push(...await walk(absolutePath, parts));
      continue;
    }

    if (!entry.isFile() || !entry.name.toLowerCase().endsWith(".js")) {
      continue;
    }

    const projectRelativePath = path
      .relative(projectRoot, absolutePath)
      .split(path.sep)
      .join("/");

    const url = projectRelativePath
      .split("/")
      .map((segment) => encodeURIComponent(segment))
      .join("/");

    files.push({
      id: projectRelativePath,
      name: titleCase(path.basename(entry.name, ".js")),
      category: inferCategory(relativeParts, entry.name),
      path: projectRelativePath,
      url
    });
  }

  return files;
}

const algorithms = await walk(algorithmsDir);

algorithms.sort((a, b) =>
  a.category.localeCompare(b.category, "en") ||
  a.name.localeCompare(b.name, "en") ||
  a.path.localeCompare(b.path, "en")
);

await mkdir(path.dirname(outputFile), { recursive: true });

await writeFile(
  outputFile,
  `${JSON.stringify(
    {
      generatedAt: new Date().toISOString(),
      algorithms
    },
    null,
    2
  )}\n`,
  "utf8"
);

console.log(
  `Algorithm index generated: ${algorithms.length} JavaScript file(s) -> ` +
  path.relative(projectRoot, outputFile)
);
