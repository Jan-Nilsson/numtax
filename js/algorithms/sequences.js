function isCandidateInteger(n, minimum = 0) {
  return Number.isSafeInteger(n) && n >= minimum;
}

function isInIncreasingSequence(n, initial, nextTerm) {
  if (!isCandidateInteger(n, 0)) return false;
  if (initial.includes(n)) return true;

  let terms = [...initial];
  for (let iteration = 0; iteration < 10000; iteration++) {
    const next = nextTerm(terms);
    if (!Number.isSafeInteger(next) || next < 0) return false;
    if (next === n) return true;
    if (next > n) return false;
    terms = [...terms.slice(1), next];
  }
  return false;
}

function isInBigIntSequence(n, initial, nextTerm) {
  if (!isCandidateInteger(n, 0)) return false;
  const target = BigInt(n);
  if (initial.includes(target)) return true;

  let terms = [...initial];
  for (let iteration = 0; iteration < 10000; iteration++) {
    const next = nextTerm(terms);
    if (next === target) return true;
    if (next > target) return false;
    terms = [...terms.slice(1), next];
  }
  return false;
}

export function isFibonacci(n) {
  return isInIncreasingSequence(n, [0, 1], ([a, b]) => a + b);
}

export function isLucas(n) {
  return isInIncreasingSequence(n, [2, 1], ([a, b]) => a + b);
}

export function isPell(n) {
  return isInIncreasingSequence(n, [0, 1], ([a, b]) => a + 2 * b);
}

export function isPellLucas(n) {
  return isInIncreasingSequence(n, [2, 2], ([a, b]) => a + 2 * b);
}

export function isJacobsthal(n) {
  return isInIncreasingSequence(n, [0, 1], ([a, b]) => b + 2 * a);
}

export function isJacobsthalLucas(n) {
  return isInIncreasingSequence(n, [2, 1], ([a, b]) => b + 2 * a);
}

export function isTribonacci(n) {
  return isInIncreasingSequence(n, [0, 0, 1], ([a, b, c]) => a + b + c);
}

export function isTetranacci(n) {
  return isInIncreasingSequence(n, [0, 0, 0, 1], ([a, b, c, d]) => a + b + c + d);
}

export function isPentavonacci(n) {
  return isInIncreasingSequence(n, [0, 0, 0, 0, 1], ([a, b, c, d, e]) => a + b + c + d + e);
}

export function isCatalan(n) {
  if (!isCandidateInteger(n, 1)) return false;
  const target = BigInt(n);
  let value = 1n; // C_0 = 1; the set of values also contains C_1 = 1.
  if (target === 1n) return true;

  for (let k = 0n; k < 10000n; k++) {
    const numerator = value * 2n * (2n * k + 1n);
    value = numerator / (k + 2n);
    if (value === target) return true;
    if (value > target) return false;
  }
  return false;
}

export function isBell(n) {
  if (!isCandidateInteger(n, 1)) return false;
  const target = BigInt(n);
  let row = [1n];
  if (target === 1n) return true;

  for (let iteration = 0; iteration < 1000; iteration++) {
    const nextRow = [row[row.length - 1]];
    for (let i = 0; i < row.length; i++) {
      nextRow.push(nextRow[i] + row[i]);
    }
    const bell = nextRow[0];
    if (bell === target) return true;
    if (bell > target) return false;
    row = nextRow;
  }
  return false;
}

export function isMotzkin(n) {
  if (!isCandidateInteger(n, 1)) return false;
  const target = BigInt(n);
  let previous2 = 1n; // M_0
  let previous = 1n; // M_1
  if (target === 1n) return true;

  for (let index = 2n; index < 10000n; index++) {
    const current = ((2n * index + 1n) * previous + 3n * (index - 1n) * previous2) / (index + 2n);
    if (current === target) return true;
    if (current > target) return false;
    previous2 = previous;
    previous = current;
  }
  return false;
}

export function isSchroeder(n) {
  if (!isCandidateInteger(n, 1)) return false;
  const target = BigInt(n);
  let previous2 = 1n; // S_0
  let previous = 2n; // S_1
  if (target === 1n || target === 2n) return true;

  for (let index = 2n; index < 10000n; index++) {
    const current = ((6n * index - 3n) * previous - (index - 2n) * previous2) / (index + 1n);
    if (current === target) return true;
    if (current > target) return false;
    previous2 = previous;
    previous = current;
  }
  return false;
}

export function isDelannoy(n) {
  if (!isCandidateInteger(n, 1)) return false;
  const target = BigInt(n);
  let previous2 = 1n; // D_0
  let previous = 3n; // D_1
  if (target === 1n || target === 3n) return true;

  for (let index = 2n; index < 10000n; index++) {
    const current = (3n * (2n * index - 1n) * previous - (index - 1n) * previous2) / index;
    if (current === target) return true;
    if (current > target) return false;
    previous2 = previous;
    previous = current;
  }
  return false;
}

function binomialBigInt(n, k) {
  if (k < 0n || k > n) return 0n;
  if (k > n - k) k = n - k;
  let result = 1n;
  for (let i = 1n; i <= k; i++) result = result * (n - k + i) / i;
  return result;
}

export function isFubini(n) {
  if (!isCandidateInteger(n, 1)) return false;
  const target = BigInt(n);
  let values = [1n]; // F_0
  if (target === 1n) return true;

  for (let size = 1n; size < 10000n; size++) {
    let current = 0n;
    for (let k = 1n; k <= size; k++) {
      current += binomialBigInt(size, k) * values[Number(size - k)];
    }
    if (current === target) return true;
    if (current > target) return false;
    values.push(current);
  }
  return false;
}

export function isPadovan(n) {
  return isInIncreasingSequence(n, [1, 1, 1], ([a, b, c]) => a + b);
}

export function isPerrin(n) {
  if (!isCandidateInteger(n, 0)) return false;
  const target = BigInt(n);
  let terms = [3n, 0n, 2n];
  if (terms.includes(target)) return true;

  for (let i = 0; i < 10000; i++) {
    const next = terms[0] + terms[1];
    if (next === target) return true;
    if (next > target) return false;
    terms = [terms[1], terms[2], next];
  }
  return false;
}

export function isFactorial(n) {
  if (!isCandidateInteger(n, 1)) return false;
  const target = BigInt(n);
  let value = 1n;
  if (target === 1n) return true; // 0! and 1!
  for (let k = 2n; k < 10000n; k++) {
    value *= k;
    if (value === target) return true;
    if (value > target) return false;
  }
  return false;
}

export function isDoubleFactorial(n) {
  if (!isCandidateInteger(n, 1)) return false;
  const target = BigInt(n);
  if (target === 1n || target === 2n || target === 3n) return true;

  let odd = 1n;
  for (let k = 3n; odd <= target; k += 2n) {
    odd *= k;
    if (odd === target) return true;
    if (odd > target) break;
  }

  let even = 2n;
  for (let k = 4n; even <= target; k += 2n) {
    even *= k;
    if (even === target) return true;
    if (even > target) break;
  }
  return false;
}

export function isDerangement(n) {
  if (!isCandidateInteger(n, 0)) return false;
  const target = BigInt(n);
  let previous2 = 1n; // !0 = 1
  let previous = 0n; // !1 = 0
  if (target === previous2 || target === previous) return true;

  for (let index = 2n; index < 10000n; index++) {
    const current = (index - 1n) * (previous + previous2);
    if (current === target) return true;
    if (current > target) return false;
    previous2 = previous;
    previous = current;
  }
  return false;
}

export function isPowerOfTwoSequence(n) {
  if (!isCandidateInteger(n, 1)) return false;
  const value = BigInt(n);
  return (value & (value - 1n)) === 0n;
}

function isPowerOfBase(n, base) {
  if (!isCandidateInteger(n, 1)) return false;
  let value = BigInt(n);
  const b = BigInt(base);
  while (value > 1n && value % b === 0n) value /= b;
  return value === 1n;
}

export function isPowerOfThree(n) {
  return isPowerOfBase(n, 3);
}

export function isPowerOfFive(n) {
  return isPowerOfBase(n, 5);
}

export function isPowerOfTen(n) {
  return isPowerOfBase(n, 10);
}

export function isMersenneNumber(n) {
  if (!isCandidateInteger(n, 1)) return false;
  const value = BigInt(n) + 1n;
  return (value & (value - 1n)) === 0n;
}

export function isFermatNumber(n) {
  if (!isCandidateInteger(n, 3)) return false;
  const target = BigInt(n);
  let power = 2n;
  for (let k = 0; k < 32; k++) {
    if (power + 1n === target) return true;
    if (power + 1n > target) return false;
    power *= power;
    if (power > target) return false;
  }
  return false;
}

const leonardoValues = [1n, 1n];
export function isLeonardoNumber(n) {
  if (!isCandidateInteger(n, 1)) return false;
  const target = BigInt(n);
  while (leonardoValues[leonardoValues.length - 1] < target) {
    const size = leonardoValues.length;
    leonardoValues.push(leonardoValues[size - 1] + leonardoValues[size - 2] + 1n);
  }
  return leonardoValues.includes(target);
}

const centralBinomialValues = [1n];
export function isCentralBinomialCoefficient(n) {
  if (!isCandidateInteger(n, 1)) return false;
  const target = BigInt(n);
  while (centralBinomialValues[centralBinomialValues.length - 1] < target) {
    const k = BigInt(centralBinomialValues.length - 1);
    const previous = centralBinomialValues[centralBinomialValues.length - 1];
    centralBinomialValues.push(previous * 2n * (2n * k + 1n) / (k + 1n));
  }
  return centralBinomialValues.includes(target);
}

export default { description: 'Integer sequence membership functions' };
