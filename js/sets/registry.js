/*
 * Numtax — Sets registry
 *
 * Descriptive catalogue of mathematical sets.
 * This catalogue is currently maintained separately
 * from the executable algorithm registry.
 */

export const SETS = [
  {
    id: "prime-numbers",
    name: "Prime numbers",
    category: "primes",
    categoryLabel: "Primes",
    definition:
      "Integers greater than 1 with exactly two positive divisors: 1 and the number itself.",
    notation:
      "P = { n ∈ ℕ : n > 1 and n is prime }",
    keywords: [
      "primality",
      "divisors",
      "fundamental theorem of arithmetic",
    ],
  },

  {
    id: "composite-numbers",
    name: "Composite numbers",
    category: "factorization",
    categoryLabel: "Factorization",
    definition:
      "Positive integers greater than 1 that are not prime. Each has a factorization into smaller positive integers greater than 1.",
    notation:
      "C = { n ∈ ℕ : n > 1 and n is composite }",
    keywords: [
      "factorization",
      "factors",
      "primes",
    ],
  },

  {
    id: "semiprime-numbers",
    name: "Semiprime numbers",
    category: "factorization",
    categoryLabel: "Factorization",
    definition:
      "Positive integers whose prime factorization contains exactly two prime factors, counted with multiplicity. The factors may be equal.",
    notation:
      "n = p · q, where p and q are prime",
    keywords: [
      "semiprime",
      "prime factors",
      "factorization",
    ],
  },

  {
    id: "triangular-numbers",
    name: "Triangular numbers",
    category: "figurates",
    categoryLabel: "Figurates",
    definition:
      "Numbers that can be arranged as a triangular array of dots. With indexing starting at zero, the nth triangular number is n(n + 1)/2.",
    notation:
      "Tₙ = n(n + 1)/2, n ≥ 0",
    keywords: [
      "polygonal numbers",
      "figurate",
      "sum of integers",
    ],
  },

  {
    id: "square-numbers",
    name: "Square numbers",
    category: "figurates",
    categoryLabel: "Figurates",
    definition:
      "Non-negative integers that are squares of integers.",
    notation:
      "S = { n² : n ∈ ℕ₀ }",
    keywords: [
      "perfect squares",
      "figurate",
      "quadratic",
    ],
  },

  {
    id: "fibonacci-numbers",
    name: "Fibonacci numbers",
    category: "sequences",
    categoryLabel: "Sequences",
    definition:
      "The sequence defined by F₀ = 0, F₁ = 1, and Fₙ = Fₙ₋₁ + Fₙ₋₂ for n ≥ 2. This entry denotes the set of values in that sequence.",
    notation:
      "F₀ = 0, F₁ = 1, Fₙ = Fₙ₋₁ + Fₙ₋₂",
    keywords: [
      "recurrence",
      "sequence",
      "additive",
    ],
  },

  {
    id: "decimal-palindromes",
    name: "Decimal palindromic numbers",
    category: "digits",
    categoryLabel: "Digits",
    definition:
      "Non-negative integers whose decimal digit representation reads identically from left to right and right to left.",
    notation:
      "Digits(n) = reverse(Digits(n)) in base 10",
    keywords: [
      "palindrome",
      "digits",
      "base 10",
      "repdigit",
    ],
  },

  {
    id: "perfect-numbers",
    name: "Perfect numbers",
    category: "divisors",
    categoryLabel: "Divisors",
    definition:
      "Positive integers equal to the sum of their positive proper divisors.",
    notation:
      "σ(n) = 2n",
    keywords: [
      "proper divisors",
      "divisor sum",
      "aliquot sum",
    ],
  },
];

export default SETS;