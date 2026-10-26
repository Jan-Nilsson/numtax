function isqrt(n) {
  if (!Number.isSafeInteger(n) || n < 0) return -1;
  let root = Math.floor(Math.sqrt(n));
  while (root > 0 && root > n / root) root--;
  while (root + 1 <= n / (root + 1)) root++;
  return root;
}

function isPerfectSquare(n) {
  if (!Number.isSafeInteger(n) || n < 0) return false;
  const root = isqrt(n);
  return root >= 0 && root * root === n;
}

export function isTriangular(n) {
  if (!Number.isSafeInteger(n) || n < 1) return false;
  const discriminant = 8 * n + 1;
  return Number.isSafeInteger(discriminant) && isPerfectSquare(discriminant);
}

export function isSquare(n) {
  return Number.isSafeInteger(n) && n >= 1 && isPerfectSquare(n);
}

export function isPentagonal(n) {
  if (!Number.isSafeInteger(n) || n < 1) return false;
  const discriminant = 24 * n + 1;
  if (!Number.isSafeInteger(discriminant) || !isPerfectSquare(discriminant)) return false;
  return (1 + isqrt(discriminant)) % 6 === 0;
}

export function isHexagonal(n) {
  if (!Number.isSafeInteger(n) || n < 1) return false;
  const discriminant = 8 * n + 1;
  if (!Number.isSafeInteger(discriminant) || !isPerfectSquare(discriminant)) return false;
  return (1 + isqrt(discriminant)) % 4 === 0;
}

export function isHeptagonal(n) {
  if (!Number.isSafeInteger(n) || n < 1) return false;
  const discriminant = 40 * n + 9;
  if (!Number.isSafeInteger(discriminant) || !isPerfectSquare(discriminant)) return false;
  return (3 + isqrt(discriminant)) % 10 === 0;
}

export function isOctagonal(n) {
  if (!Number.isSafeInteger(n) || n < 1) return false;
  const discriminant = 3 * n + 1;
  if (!Number.isSafeInteger(discriminant) || !isPerfectSquare(discriminant)) return false;
  return (1 + isqrt(discriminant)) % 3 === 0;
}

export function isCube(n) {
  if (!Number.isSafeInteger(n) || n < 1) return false;
  const root = Math.round(Math.cbrt(n));
  const target = BigInt(n);
  for (let candidate = Math.max(1, root - 1); candidate <= root + 1; candidate++) {
    const value = BigInt(candidate);
    if (value * value * value === target) return true;
  }
  return false;
}

export function isTetrahedralNumber(n) {
  if (!Number.isSafeInteger(n) || n < 1) return false;
  for (let k = 1; ; k++) {
    const value = k * (k + 1) * (k + 2) / 6;
    if (!Number.isSafeInteger(value)) return false;
    if (value === n) return true;
    if (value > n) return false;
  }
}

export function isSquarePyramidal(n) {
  if (!Number.isSafeInteger(n) || n < 1) return false;
  let sum = 0;
  for (let k = 1; ; k++) {
    sum += k * k;
    if (!Number.isSafeInteger(sum)) return false;
    if (sum === n) return true;
    if (sum > n) return false;
  }
}

function isPolygonal(n, sides) {
  if (!Number.isSafeInteger(n) || n < 1) return false;
  const discriminant = (sides - 4) ** 2 + 8 * (sides - 2) * n;
  if (!Number.isSafeInteger(discriminant) || !isPerfectSquare(discriminant)) return false;
  const numerator = sides - 4 + isqrt(discriminant);
  const denominator = 2 * (sides - 2);
  return numerator % denominator === 0 && numerator / denominator >= 1;
}

function isCenteredPolygonal(n, sides) {
  if (!Number.isSafeInteger(n) || n < 1) return false;
  const numerator = 8 * (n - 1);
  if (!Number.isSafeInteger(numerator) || numerator % sides !== 0) return false;
  const discriminant = 1 + numerator / sides;
  if (!isPerfectSquare(discriminant)) return false;
  const root = isqrt(discriminant);
  return root % 2 === 1 && (1 + root) / 2 >= 1;
}

export function isNonagonalNumber(n) {
  return isPolygonal(n, 9);
}

export function isDecagonalNumber(n) {
  return isPolygonal(n, 10);
}

export function isDodecagonalNumber(n) {
  return isPolygonal(n, 12);
}

export function isCenteredPentagonalNumber(n) {
  return isCenteredPolygonal(n, 5);
}

export function isCenteredHexagonalNumber(n) {
  return isCenteredPolygonal(n, 6);
}

export function isPronicNumber(n) {
  if (!Number.isSafeInteger(n) || n < 2) return false;
  const discriminant = 1 + 4 * n;
  if (!Number.isSafeInteger(discriminant) || !isPerfectSquare(discriminant)) return false;
  const root = isqrt(discriminant);
  return root % 2 === 1 && (root - 1) / 2 >= 1;
}

export function isCenteredSquare(n) {
  return isCenteredPolygonal(n, 4);
}

export function isCenteredTriangular(n) {
  return isCenteredPolygonal(n, 3);
}

export default { description: 'Figurate number functions' };
