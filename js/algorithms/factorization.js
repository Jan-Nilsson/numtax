import { isPrime } from './primes.js';

export function isSemiPrime(n) {
  if (!Number.isSafeInteger(n) || n < 4) return false;
  let remaining = n;
  let factorCount = 0;

  for (let p = 2; p <= remaining / p; p++) {
    while (remaining % p === 0) {
      remaining /= p;
      factorCount++;
      if (factorCount > 2) return false;
    }
  }
  if (remaining > 1) factorCount++;
  return factorCount === 2;
}

export function isSphenicNumber(n) {
  if (!Number.isSafeInteger(n) || n < 30) return false;
  let remaining = n;
  let distinctFactors = 0;

  for (let p = 2; p <= remaining / p; p++) {
    if (remaining % p !== 0) continue;
    if (!isPrime(p)) continue;

    distinctFactors++;
    remaining /= p;
    if (remaining % p === 0) return false;
    if (distinctFactors > 3) return false;
  }

  if (remaining > 1) distinctFactors++;
  return distinctFactors === 3;
}

export function isPowerfulNumber(n) {
  if (!Number.isSafeInteger(n) || n < 1) return false;
  let remaining = n;

  for (let p = 2; p <= remaining / p; p++) {
    if (remaining % p !== 0) continue;
    if (!isPrime(p)) continue;

    let exponent = 0;
    while (remaining % p === 0) {
      remaining /= p;
      exponent++;
    }
    if (exponent < 2) return false;
  }

  // Any remaining factor is prime and occurs to exponent 1.
  return remaining === 1;
}

export default { description: 'Integer factorization properties' };
