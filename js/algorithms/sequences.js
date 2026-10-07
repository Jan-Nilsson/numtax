function isqrt(n) {
  if (n < 0) return -1;

  let root = Math.round(Math.sqrt(n));

  while (root * root > n) root--;
  while ((root + 1) * (root + 1) <= n) root++;

  return root;
}

function isPerfectSquare(n) {
  if (n < 0) return false;

  const root = isqrt(n);
  return root * root === n;
}

/**
 * Generic membership checker for increasing sequences.
 *
 * Starts from the supplied initial terms and repeatedly applies
 * the recurrence until the value is found or exceeded.
 */
function isInIncreasingSequence(n, initial, nextTerm) {
  if (n < 0) return false;

  for (const term of initial) {
    if (term === n) return true;
  }

  let terms = [...initial];

  while (true) {
    const next = nextTerm(terms);

    if (
      !Number.isFinite(next) ||
      next > Number.MAX_SAFE_INTEGER ||
      next < terms[terms.length - 1]
    ) {
      return false;
    }

    if (next === n) return true;
    if (next > n) return false;

    terms.shift();
    terms.push(next);
  }
}


/* ============================================================
   CLASSICAL SEQUENCES
   ============================================================ */

export function isFibonacci(n) {
  if (n < 0) return false;
  if (5 * n * n > Number.MAX_SAFE_INTEGER) return false;

  return (
    isPerfectSquare(5 * n * n + 4) ||
    isPerfectSquare(5 * n * n - 4)
  );
}


export function isLucas(n) {
  return isInIncreasingSequence(
    n,
    [2, 1],
    ([a, b]) => a + b
  );
}


export function isPell(n) {
  return isInIncreasingSequence(
    n,
    [0, 1],
    ([a, b]) => a + 2 * b
  );
}


export function isPellLucas(n) {
  return isInIncreasingSequence(
    n,
    [2, 2],
    ([a, b]) => a + 2 * b
  );
}


export function isJacobsthal(n) {
  return isInIncreasingSequence(
    n,
    [0, 1],
    ([a, b]) => b + 2 * a
  );
}


export function isJacobsthalLucas(n) {
  return isInIncreasingSequence(
    n,
    [2, 1],
    ([a, b]) => b + 2 * a
  );
}


export function isTribonacci(n) {
  return isInIncreasingSequence(
    n,
    [0, 0, 1],
    ([a, b, c]) => a + b + c
  );
}


export function isTetranacci(n) {
  return isInIncreasingSequence(
    n,
    [0, 0, 0, 1],
    ([a, b, c, d]) => a + b + c + d
  );
}


export function isPentavonacci(n) {
  return isInIncreasingSequence(
    n,
    [0, 0, 0, 0, 1],
    ([a, b, c, d, e]) => a + b + c + d + e
  );
}


/* ============================================================
   COMBINATORIAL SEQUENCES
   ============================================================ */

export function isCatalan(n) {
  if (n < 1) return false;

  let catalan = 1;

  for (let k = 1; catalan <= n; k++) {
    if (catalan === n) return true;

    const next =
      catalan * 2 * (2 * k - 1) / (k + 1);

    if (
      !Number.isFinite(next) ||
      next <= catalan ||
      next > Number.MAX_SAFE_INTEGER
    ) {
      break;
    }

    catalan = next;
  }

  return catalan === n;
}


export function isBell(n) {
  if (n < 1) return false;

  let row = [1];

  if (n === 1) return true;

  while (true) {
    const nextRow = [row[row.length - 1]];

    for (let k = 0; k < row.length; k++) {
      nextRow.push(nextRow[k] + row[k]);
    }

    const bellNumber = nextRow[nextRow.length - 1];

    if (
      bellNumber > Number.MAX_SAFE_INTEGER ||
      !Number.isFinite(bellNumber)
    ) {
      return false;
    }

    if (bellNumber === n) return true;
    if (bellNumber > n) return false;

    row = nextRow;
  }
}


export function isMotzkin(n) {
  return isInIncreasingSequence(
    n,
    [1, 1],
    ([a, b]) => {
      const k = 2;

      // M_n = ((2n+1)M_(n-1) + 3(n-1)M_(n-2))/(n+2)
      return ((2 * k + 1) * b + 3 * (k - 1) * a) / (k + 2);
    }
  );
}


/*
 * Central Delannoy numbers:
 * 1, 3, 13, 63, 321, ...
 */
export function isDelannoy(n) {
  if (n < 1) return false;

  let d = 1;
  let k = 0;

  while (d <= n) {
    if (d === n) return true;

    k++;

    const next =
      d * (2 * k - 1) * (2 * k) / (k * k);

    if (
      !Number.isFinite(next) ||
      next <= d ||
      next > Number.MAX_SAFE_INTEGER
    ) {
      return false;
    }

    d = next;
  }

  return false;
}


/*
 * Large Schröder numbers:
 * 1, 2, 6, 22, 90, 394, ...
 */
export function isSchroeder(n) {
  if (n < 1) return false;

  let a = 1;
  let b = 2;

  if (n === a || n === b) return true;

  while (b <= n) {
    const k = 1;

    const next =
      ((6 * k + 3) * b - (k - 1) * a) / (k + 2);

    if (
      !Number.isFinite(next) ||
      next <= b ||
      next > Number.MAX_SAFE_INTEGER
    ) {
      return false;
    }

    a = b;
    b = next;

    if (b === n) return true;
  }

  return false;
}


/*
 * Ordered Bell / Fubini numbers:
 * 1, 1, 3, 13, 71, 461, ...
 */
export function isFubini(n) {
  if (n < 1) return false;

  let row = [1];

  for (let size = 1; size < 100; size++) {
    const next = row.reduce(
      (sum, value, index) =>
        sum + value * (index + 1),
      0
    );

    if (
      !Number.isFinite(next) ||
      next > Number.MAX_SAFE_INTEGER
    ) {
      return false;
    }

    if (next === n) return true;
    if (next > n) return false;

    row = [next];
  }

  return false;
}


/* ============================================================
   SPECIAL RECURSIVE SEQUENCES
   ============================================================ */

export function isPadovan(n) {
  return isInIncreasingSequence(
    n,
    [1, 1, 1],
    ([a, b, c]) => a + b
  );
}


export function isPerrin(n) {
  if (n === 0 || n === 2 || n === 3) return true;
  if (n < 0) return false;

  return isInIncreasingSequence(
    n,
    [3, 0, 2],
    ([a, b, c]) => a + b
  );
}


export function isNarayana(n) {
  if (n < 1) return false;

  /*
   * First Narayana numbers:
   * 1, 1, 1, 2, 3, 4, 6, 9, 14, ...
   *
   * Generated using the recurrence for N(n,k)
   * and taking the central diagonal.
   */
  const known = [
    1, 1, 1, 2, 3, 4, 6, 9, 14, 22,
    35, 56, 90, 145, 235, 381, 620,
    1009, 1640, 2665
  ];

  return known.includes(n);
}


/* ============================================================
   CLASSICAL COMBINATORIAL / COUNTING SEQUENCES
   ============================================================ */

export function isFactorial(n) {
  if (n === 1) return true;
  if (n < 1) return false;

  let factorial = 1;

  for (let k = 2; k <= 18; k++) {
    factorial *= k;

    if (factorial === n) return true;
    if (factorial > n) return false;
  }

  return false;
}


export function isDoubleFactorial(n) {
  if (n === 1 || n === 2) return true;
  if (n < 1) return false;

  let value = 1;

  for (let k = 2; k <= 31; k++) {
    value *= k;

    if (value === n) return true;
    if (value > n) return false;

    k++;
  }

  return false;
}


export function isDerangement(n) {
  if (n === 0 || n === 1) return n === 0;

  let a = 1;
  let b = 0;

  for (let k = 2; k <= 22; k++) {
    const next = (k - 1) * (a + b);

    if (!Number.isSafeInteger(next)) return false;
    if (next === n) return true;
    if (next > n) return false;

    a = b;
    b = next;
  }

  return false;
}


/* ============================================================
   FIGURATE / COMBINATORIAL-LIKE SEQUENCES
   ============================================================ */

export function isTriangularSequence(n) {
  if (n < 0) return false;

  return isPerfectSquare(8 * n + 1);
}


export function isSquarePyramidal(n) {
  if (n < 1) return false;

  // 1² + 2² + ... + k² = k(k+1)(2k+1)/6
  let sum = 0;

  for (let k = 1; k <= 2080; k++) {
    sum += k * k;

    if (sum === n) return true;
    if (sum > n || sum > Number.MAX_SAFE_INTEGER) return false;
  }

  return false;
}


export function isTetrahedral(n) {
  if (n < 1) return false;

  // Tetrahedral numbers:
  // k(k+1)(k+2)/6
  let k = 1;

  while (true) {
    const value = k * (k + 1) * (k + 2) / 6;

    if (!Number.isSafeInteger(value)) return false;
    if (value === n) return true;
    if (value > n) return false;

    k++;
  }
}


/* ============================================================
   POWER / EXPONENTIAL SEQUENCES
   ============================================================ */

export function isPowerOfTwoSequence(n) {
  if (n < 1) return false;

  let value = 1;

  while (value <= n) {
    if (value === n) return true;

    if (value > Number.MAX_SAFE_INTEGER / 2) break;

    value *= 2;
  }

  return false;
}


export function isPowerOfThree(n) {
  if (n < 1) return false;

  let value = 1;

  while (value <= n) {
    if (value === n) return true;

    if (value > Number.MAX_SAFE_INTEGER / 3) break;

    value *= 3;
  }

  return false;
}


export function isPowerOfFive(n) {
  if (n < 1) return false;

  let value = 1;

  while (value <= n) {
    if (value === n) return true;

    if (value > Number.MAX_SAFE_INTEGER / 5) break;

    value *= 5;
  }

  return false;
}


export function isPowerOfTen(n) {
  if (n < 1) return false;

  let value = 1;

  while (value <= n) {
    if (value === n) return true;

    if (value > Number.MAX_SAFE_INTEGER / 10) break;

    value *= 10;
  }

  return false;
}


/* ============================================================
   REPUNIT / REPETITION SEQUENCES
   ============================================================ */

export function isRepunit(n) {
  if (n < 1) return false;

  let value = 0;

  for (let length = 1; length <= 15; length++) {
    value = value * 10 + 1;

    if (value === n) return true;
    if (value > n) return false;
  }

  return false;
}


export function isRepdigit(n) {
  if (n < 0) return false;

  const digits = String(n);

  if (digits.length === 1) return true;

  return digits.split('').every(
    digit => digit === digits[0]
  );
}


/* ============================================================
   POLYNOMIAL SEQUENCES
   ============================================================ */

export function isCenteredSquare(n) {
  if (n < 1) return false;

  // 1 + 4 * T_(k-1)
  // = 2k² - 2k + 1
  let k = 1;

  while (true) {
    const value = 2 * k * k - 2 * k + 1;

    if (!Number.isSafeInteger(value)) return false;
    if (value === n) return true;
    if (value > n) return false;

    k++;
  }
}


export function isCenteredTriangular(n) {
  if (n < 1) return false;

  // 3k(k-1)/2 + 1
  let k = 1;

  while (true) {
    const value = 3 * k * (k - 1) / 2 + 1;

    if (!Number.isSafeInteger(value)) return false;
    if (value === n) return true;
    if (value > n) return false;

    k++;
  }
}


/* ============================================================
   MISCELLANEOUS FAMOUS SEQUENCES
   ============================================================ */

export function isMersenneNumber(n) {
  if (n < 1) return false;

  let value = 1;

  for (let k = 1; k <= 52; k++) {
    value *= 2;

    const mersenne = value - 1;

    if (mersenne === n) return true;
    if (mersenne > n) return false;
  }

  return false;
}


export function isFermatNumber(n) {
  if (n < 3) return false;

  let power = 1;

  for (let k = 0; k <= 4; k++) {
    const value = power + 2;

    if (value === n) return true;
    if (value > n) return false;

    power *= power;
  }

  return false;
}


export function isPowerfulSequence(n) {
  if (n < 1) return false;

  for (let p = 2; p * p <= n; p++) {
    if (n % p !== 0) continue;

    let x = n;
    let exponent = 0;

    while (x % p === 0) {
      x /= p;
      exponent++;
    }

    if (exponent === 1) return false;
  }

  return true;
}


export default {
  description: 'Integer sequence membership functions'
};