function validBase(base) {
  return Number.isInteger(base) && base >= 2 && base <= 36;
}

function validNonnegativeInteger(n) {
  return Number.isSafeInteger(n) && n >= 0;
}

function digitValues(n, base = 10) {
  if (!validNonnegativeInteger(n) || !validBase(base)) return null;
  return BigInt(n).toString(base).split('').map(char => parseInt(char, base));
}

function parseBaseInteger(text, base) {
  let value = 0n;
  for (const char of text.toLowerCase()) {
    const digit = parseInt(char, base);
    if (!Number.isInteger(digit) || digit < 0 || digit >= base) return null;
    value = value * BigInt(base) + BigInt(digit);
  }
  return value;
}

function sumPoweredDigits(n, exponent, base) {
  const digits = digitValues(n, base);
  if (!digits) return NaN;
  let sum = 0;
  for (const digit of digits) {
    sum += digit ** exponent;
    if (!Number.isFinite(sum)) return Infinity;
  }
  return sum;
}

export function isNarcissistic(n, base = 10) {
  if (!validNonnegativeInteger(n) || !validBase(base)) return false;
  const digits = digitValues(n, base);
  return sumPoweredDigits(n, digits.length, base) === n;
}

export function isHappy(n, base = 10) {
  if (!Number.isSafeInteger(n) || n < 1 || !validBase(base)) return false;
  const seen = new Set();
  let current = n;

  while (current !== 1) {
    if (seen.has(current)) return false;
    seen.add(current);
    current = sumPoweredDigits(current, 2, base);
    if (!Number.isSafeInteger(current) || current < 0) return false;
  }
  return true;
}

export function isKaprekar(n, base = 10) {
  if (!Number.isSafeInteger(n) || n < 1 || !validBase(base)) return false;
  if (n === 1) return true;

  const squared = (BigInt(n) * BigInt(n)).toString(base);
  const target = BigInt(n);

  for (let split = 1; split < squared.length; split++) {
    const left = parseBaseInteger(squared.slice(0, split), base);
    const right = parseBaseInteger(squared.slice(split), base);
    if (left === null || right === null || right === 0n) continue;
    if (left + right === target) return true;
  }
  return false;
}

export function isKaprekarConstant(n, base = 10) {
  if (!Number.isSafeInteger(n) || n < 1 || !validBase(base)) return false;
  const representation = BigInt(n).toString(base);
  const digits = representation.split('');
  const descending = [...digits].sort((a, b) => parseInt(b, base) - parseInt(a, base));
  const ascending = [...digits].sort((a, b) => parseInt(a, base) - parseInt(b, base));
  const high = parseBaseInteger(descending.join(''), base);
  const low = parseBaseInteger(ascending.join(''), base);
  return high !== null && low !== null && high - low === BigInt(n);
}

export function isAutomorphic(n, base = 10) {
  if (!validNonnegativeInteger(n) || !validBase(base)) return false;
  const value = BigInt(n);
  return (value * value).toString(base).endsWith(value.toString(base));
}

export function isRepunit(n, base = 10) {
  if (!Number.isSafeInteger(n) || n < 1 || !validBase(base)) return false;
  return BigInt(n).toString(base).split('').every(char => char === '1');
}

export function isRepdigit(n, base = 10) {
  if (!validNonnegativeInteger(n) || !validBase(base)) return false;
  const digits = BigInt(n).toString(base);
  return digits.split('').every(char => char === digits[0]);
}

export default { description: 'Digit and numeral-representation properties' };
