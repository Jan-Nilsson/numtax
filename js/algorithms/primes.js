const MAX_SAFE = Number.MAX_SAFE_INTEGER;

function isSafeIntegerAtLeast(n, minimum = 0) {
  return Number.isSafeInteger(n) && n >= minimum;
}

export function isPrime(n) {
  if (!isSafeIntegerAtLeast(n, 2)) return false;
  if (n === 2 || n === 3) return true;
  if (n % 2 === 0 || n % 3 === 0) return false;

  for (let d = 5; d <= n / d; d += 6) {
    if (n % d === 0 || n % (d + 2) === 0) return false;
  }
  return true;
}

function isSemiprimeValue(n) {
  if (!isSafeIntegerAtLeast(n, 4)) return false;
  let remaining = n;
  let factors = 0;

  for (let p = 2; p <= remaining / p; p++) {
    while (remaining % p === 0) {
      remaining /= p;
      factors++;
      if (factors > 2) return false;
    }
  }
  if (remaining > 1) factors++;
  return factors === 2;
}

export function isTwinPrime(n) {
  // Store each pair once: n is the lower member of (n, n + 2).
  return isSafeIntegerAtLeast(n, 2) && isPrime(n) && isPrime(n + 2);
}

export function isPrimeTriplet(n) {
  // Membership means that n is any member of a prime triplet.
  if (!isPrime(n)) return false;
  if (n === 3 || n === 5 || n === 7) return true;

  const starts = [n, n - 2, n - 4, n - 6];
  for (const p of starts) {
    if (p < 2) continue;
    const firstForm = isPrime(p) && isPrime(p + 2) && isPrime(p + 6);
    const secondForm = isPrime(p) && isPrime(p + 4) && isPrime(p + 6);
    if ((firstForm || secondForm) && n >= p && n <= p + 6) {
      const members = firstForm
        ? [p, p + 2, p + 6]
        : [p, p + 4, p + 6];
      if (members.includes(n)) return true;
    }
  }
  return false;
}

export function isChenPrime(n) {
  if (!isPrime(n)) return false;
  const successor = n + 2;
  return isPrime(successor) || isSemiprimeValue(successor);
}

export function isSophieGermainPrime(n) {
  return isSafeIntegerAtLeast(n, 2) && isPrime(n) && isPrime(2 * n + 1);
}

export function isSafePrime(n) {
  return isSafeIntegerAtLeast(n, 5) && isPrime(n) && isPrime((n - 1) / 2);
}

export function isCousinPrime(n) {
  // Store each pair once: n is the lower member of (n, n + 4).
  return isSafeIntegerAtLeast(n, 2) && isPrime(n) && isPrime(n + 4);
}

export function isSexyPrime(n) {
  // Store each pair once: n is the lower member of (n, n + 6).
  return isSafeIntegerAtLeast(n, 2) && isPrime(n) && isPrime(n + 6);
}

function modPowBigInt(base, exponent, modulus) {
  let result = 1n;
  base %= modulus;
  while (exponent > 0n) {
    if (exponent & 1n) result = result * base % modulus;
    base = base * base % modulus;
    exponent >>= 1n;
  }
  return result;
}

export function isWieferichPrime(n) {
  if (!isSafeIntegerAtLeast(n, 3) || n % 2 === 0 || !isPrime(n)) return false;
  const p = BigInt(n);
  return modPowBigInt(2n, p - 1n, p * p) === 1n;
}

export function isWilsonPrime(n) {
  if (!isSafeIntegerAtLeast(n, 2) || !isPrime(n)) return false;
  const p = BigInt(n);
  const modulus = p * p;
  let factorial = 1n;
  for (let k = 2n; k < p; k++) factorial = factorial * k % modulus;
  return (factorial + 1n) % modulus === 0n;
}

export function isWagstaffPrime(n) {
  if (!isSafeIntegerAtLeast(n, 3) || !isPrime(n)) return false;
  const value = 3n * BigInt(n) - 1n;
  if (value <= 0n || (value & (value - 1n)) !== 0n) return false;
  const exponent = BigInt(value.toString(2).length - 1);
  return isBigIntPrime(exponent);
}

function isBigIntPrime(n) {
  if (n < 2n) return false;
  if (n === 2n) return true;
  if (n % 2n === 0n) return false;
  for (let d = 3n; d * d <= n; d += 2n) {
    if (n % d === 0n) return false;
  }
  return true;
}

export function isFactorialPrime(n) {
  if (!isSafeIntegerAtLeast(n, 2) || !isPrime(n)) return false;
  const target = BigInt(n);
  let factorial = 1n;

  for (let k = 1n; k <= 100n; k++) {
    factorial *= k;
    if (factorial - 1n === target || factorial + 1n === target) return true;
    if (factorial > target + 1n) return false;
  }
  return false;
}

export function isPillaiPrime(n) {
  if (!isSafeIntegerAtLeast(n, 2) || !isPrime(n)) return false;
  let factorial = 1;
  const limit = Math.min(n - 1, 10000);
  for (let k = 1; k <= limit; k++) {
    factorial = factorial * k % n;
    if (factorial === n - 1 && k % n !== n - 1) return true;
  }
  return false;
}

export default { description: 'Prime and primality-related functions' };
