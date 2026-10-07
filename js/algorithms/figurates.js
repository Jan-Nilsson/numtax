function isqrt(n) {
  if (n < 0) return -1;
  let root = Math.round(Math.sqrt(n));
  while (root * root > n) root--;
  while ((root + 1) * (root + 1) <= n) root++;
  return root;
}

function isPerfectSquare(n) {
  if (n < 0) return false;
  if (n > Number.MAX_SAFE_INTEGER) return false;
  const root = isqrt(n);
  return root * root === n;
}

export function isTriangular(n) {
  if (n < 1) return false;
  return isPerfectSquare(8 * n + 1);
}

export function isSquare(n) {
  if (n < 1) return false;
  return isPerfectSquare(n);
}

export function isPentagonal(n) {
  if (n < 1) return false;
  const discriminant = 24 * n + 1;
  if (!isPerfectSquare(discriminant)) return false;
  return (1 + isqrt(discriminant)) % 6 === 0;
}

export function isHexagonal(n) {
  if (n < 1) return false;
  const discriminant = 8 * n + 1;
  if (!isPerfectSquare(discriminant)) return false;
  return (1 + isqrt(discriminant)) % 4 === 0;
}

export function isHeptagonal(n) {
  if (n < 1) return false;
  const discriminant = 40 * n + 9;
  if (!isPerfectSquare(discriminant)) return false;
  return (3 + isqrt(discriminant)) % 10 === 0;
}

export function isOctagonal(n) {
  if (n < 1) return false;
  const discriminant = 3 * n + 1;
  if (!isPerfectSquare(discriminant)) return false;
  return (1 + isqrt(discriminant)) % 3 === 0;
}

export function isCube(n) {
  if (n < 1) return false;
  const root = Math.round(Math.cbrt(n));
  for (let candidate = Math.max(1, root - 1); candidate <= root + 1; candidate++) {
    if (candidate * candidate * candidate === n) return true;
  }
  return false;
}

export function isTetrahedralNumber(n) {
  if (n < 1) return false;
  for (let k = 1; ; k++) {
    const value = k * (k + 1) * (k + 2) / 6;
    if (value > Number.MAX_SAFE_INTEGER) return false;
    if (value === n) return true;
    if (value > n) return false;
  }
}

export function isSquarePyramidal(n) {
  if (n < 1) return false;
  for (let k = 1; ; k++) {
    const value = k * (k + 1) * (2 * k + 1) / 6;
    if (value > Number.MAX_SAFE_INTEGER) return false;
    if (value === n) return true;
    if (value > n) return false;
  }
}

export default { description: 'Figurate number functions' };