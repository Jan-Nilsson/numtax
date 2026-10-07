export function isPrime(n) {
  if (n < 2) return false;
  if (n === 2) return true;
  if (n % 2 === 0) return false;
  for (let i = 3; i * i <= n; i += 2) {
    if (n % i === 0) return false;
  }
  return true;
}

export function isSemiPrime(n) {
  if (n < 4) return false;
  for (let factor = 2; factor * factor <= n; factor++) {
    if (n % factor === 0) {
      const cofactor = n / factor;
      return isPrime(factor) && isPrime(cofactor);
    }
  }
  return false;
}

export function isSophieGermainPrime(n) {
  return isPrime(n) && isPrime(2 * n + 1);
}

export function isMersennePrime(n) {
  if (!isPrime(n)) return false;
  const exponent = Math.round(Math.log2(n + 1));
  if (exponent < 1 || exponent > 52) return false;
  if (Math.pow(2, exponent) - 1 !== n) return false;
  return isPrime(exponent);
}

export function isFermatPrime(n) {
  
  const known = new Set([3, 5, 17, 257, 65537]);
  return known.has(n);
}

export function isWilsonPrime(n) {
  
  return n === 5 || n === 13 || n === 563;
}

export function isWagstaffPrime(n) {
  const known = new Set([
    3, 11, 43, 683, 2731, 43691, 174763, 2796203, 715827883,
    2932031007403
  ]);
  return known.has(n);
}

export function isTwinPrime(n) {
  if (!isPrime(n)) return false;
  return isPrime(n - 2) || isPrime(n + 2);
}

export function isPrimeTriplet(n) {
  
  
  
  return n === 3 || n === 5 || n === 7;
}

export function isChenPrime(n) {
  if (!isPrime(n)) return false;
  const next = n + 2;
  return isPrime(next) || isSemiPrime(next);
}

export function isPrimeRepunit(n) {
  return isPrime(n) && /^1+$/.test(n.toString());
}

export function isFactorialPrime(n) {
  if (!isPrime(n)) return false;
  
  let factorial = 1;
  for (let k = 2; k <= 18; k++) {
    factorial *= k;
    if (factorial - 1 === n || factorial + 1 === n) return true;
    if (factorial > Number.MAX_SAFE_INTEGER) break;
  }
  return false;
}

export function isPillaiPrime(n) {
  if (!isPrime(n)) return false;
  
  let factorial = 1;
  for (let k = 1; k < n && k <= 10000; k++) {
    factorial = (factorial * k) % n;
    if (factorial === n - 1 && k % n !== n - 1) return true;
  }
  return false;
}

export default { description: 'Functions related to primes' };