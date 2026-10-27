/*
 * Numtax — Categories placeholder registry
 *
 * These entries describe planned parts of the interface only.
 * They do not define a mathematical category or assert morphisms.
 */

export const CATEGORY_COMPONENTS = [
  {
    id: "objects",
    label: "Objects",
    title: "Objects",
    description:
      "Specify which mathematical structures count as objects and give each one a stable identity and precise definition.",
    status: "Not defined",
  },
  {
    id: "morphisms",
    label: "Morphisms",
    title: "Morphisms",
    description:
      "Define the allowed arrows between objects, including their domains, codomains and mathematical meaning.",
    status: "Not defined",
  },
  {
    id: "identities-composition",
    label: "Axioms",
    title: "Identities and composition",
    description:
      "Specify identity morphisms and composition, then verify associativity and the identity laws.",
    status: "Not defined",
  },
  {
    id: "map",
    label: "Visualization",
    title: "Interactive map",
    description:
      "Visualize only the objects and morphisms justified by the formal model, with details available on selection.",
    status: "Planned",
  },
];

export default CATEGORY_COMPONENTS;
