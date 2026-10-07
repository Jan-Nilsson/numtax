function getDigits(n) {
  return String(Math.abs(n)).split('').map(Number);
}

function sumOfPoweredDigits(n, exponent) {
  return getDigits(n).reduce((sum, digit) => sum + digit ** exponent, 0);
}

export function isNarcissistic(n) {
  if (n < 0) return false;
  const digitList = getDigits(n);
  const exponent  = digitList.length;
  return sumOfPoweredDigits(n, exponent) === n;
}

export function isHappy(n) {
  if (n < 1) return false;
  const seen = new Set();
  let current = n;
  while (current !== 1) {
    if (seen.has(current)) return false;
    seen.add(current);
    current = sumOfPoweredDigits(current, 2);
  }
  return true;
}

export function isPerfect(n) {
  if (n < 2) return false;
  let sum = 1;
  for (let divisor = 2; divisor * divisor <= n; divisor++) {
    if (n % divisor === 0) {
      sum += divisor;
      if (divisor !== n / divisor) sum += n / divisor;
    }
  }
  return sum === n;
}

export function isAbundant(n) {
  if (n < 1) return false;
  let sum = 1;
  for (let divisor = 2; divisor * divisor <= n; divisor++) {
    if (n % divisor === 0) {
      sum += divisor;
      if (divisor !== n / divisor) sum += n / divisor;
    }
  }
  return sum > n;
}

export function isDeficient(n) {
  if (n < 1) return false;
  let sum = 1;
  for (let divisor = 2; divisor * divisor <= n; divisor++) {
    if (n % divisor === 0) {
      sum += divisor;
      if (divisor !== n / divisor) sum += n / divisor;
    }
  }
  return sum < n;
}

export function isKaprekar(n) {
  if (n < 1) return false;
  if (n * n > Number.MAX_SAFE_INTEGER) return false;
  const squared = String(n * n);
  for (let split = 1; split < squared.length; split++) {
    const left  = Number(squared.slice(0, split));
    const right = Number(squared.slice(split));
    if (right > 0 && left + right === n) return true;
  }
  return false;
}

export function isKaprekarConstant(n) {
  if (String(n).length < 3) return false;
  return n === 495 || n === 6174;
}

export function isAutomorphic(n) {
  if (n < 0) return false;
  if (n * n > Number.MAX_SAFE_INTEGER) return false;
  const squared  = String(n * n);
  const asString = String(n);
  return squared.endsWith(asString);
}

export default { description: 'Digit-based number property functions' };