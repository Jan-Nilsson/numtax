function validPositiveInteger(n) {
  return Number.isSafeInteger(n) && n >= 1;
}

export function sumProperDivisors(n) {
  if (!validPositiveInteger(n) || n === 1) return 0;

  let sum = 1;
  for (let divisor = 2; divisor <= n / divisor; divisor++) {
    if (n % divisor !== 0) continue;
    sum += divisor;
    const paired = n / divisor;
    if (paired !== divisor) sum += paired;
  }
  return sum;
}

export function sigma(n) {
  if (!validPositiveInteger(n)) return 0;
  return sumProperDivisors(n) + n;
}

export function isPerfect(n) {
  return Number.isSafeInteger(n) && n >= 2 && sumProperDivisors(n) === n;
}

export function isAbundant(n) {
  return validPositiveInteger(n) && sumProperDivisors(n) > n;
}

export function isDeficient(n) {
  return validPositiveInteger(n) && sumProperDivisors(n) < n;
}

export function isAmicableNumber(n) {
  if (!Number.isSafeInteger(n) || n < 2) return false;
  const partner = sumProperDivisors(n);
  return partner > 0 && partner !== n && sumProperDivisors(partner) === n;
}

export function isBetrothedNumber(n) {
  if (!Number.isSafeInteger(n) || n < 2) return false;
  const partner = sumProperDivisors(n) - 1;
  return partner > 0 && partner !== n && sumProperDivisors(partner) === n + 1;
}

export function isMultiperfectNumber(n) {
  if (!Number.isSafeInteger(n) || n < 1) return false;
  const total = sigma(n);
  return total % n === 0 && total / n >= 3;
}

export default { description: 'Divisor-sum arithmetic functions and properties' };
