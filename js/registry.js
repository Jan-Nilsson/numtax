import * as primes from './algorithms/primes.js';
import * as factorization from './algorithms/factorization.js';
import * as figurates from './algorithms/figurates.js';
import * as sequences from './algorithms/sequences.js';
import * as digits from './algorithms/digits.js';
import * as divisors from './algorithms/divisors.js';

export const FAST = 'fast';
export const MEDIUM = 'medium';
export const SLOW = 'slow';

const N_250 = 250;
const N_500 = 500;
const N_1200 = 1200;
const N_1600 = 1600;
const N_10K = 10000;
const N_30K = 30000;
const N_50K = 50000;
const N_60K = 60000;
const N_75K = 75000;
const N_100K = 100000;
const N_150K = 150000;
const N_250K = 250000;
const N_2M = 2000000;

export const CATEGORY_REGISTRY = {
  primes: {
    label: 'Primes',
    description: 'Prime numbers and classical subclasses defined by primality or prime-specific congruences.'
  },
  factorization: {
    label: 'Factorization',
    description: 'Integers classified by the number, multiplicity, or exponents of their prime factors.'
  },
  figurates: {
    label: 'Figurates',
    description: 'Integers defined by polygonal, centered, cubic, pyramidal, or other geometric counting formulas.'
  },
  sequences: {
    label: 'Sequences',
    description: 'Integers occurring as values of named recurrence, combinatorial, factorial, or exponential sequences.'
  },
  digits: {
    label: 'Digits',
    description: 'Integers defined by their numeral representation in a specified base.'
  },
  divisors: {
    label: 'Divisors',
    description: 'Integers classified by sums of proper divisors or by the divisor-sum function.'
  }
};

function property({
  key,
  label,
  category,
  predicate,
  formula,
  description,
  baseDependent = false,
  defaultBase = 10,
  cost = MEDIUM,
  defaultCount = N_10K,
  exhaustiveCount = N_50K,
  visualizations = ['polar']
}) {
  return {
    key,
    label,
    category,
    predicate,
    formula,
    description,
    baseDependent,
    ...(baseDependent ? { defaultBase } : {}),
    visualizations,
    cost,
    defaultCount,
    exhaustiveCount
  };
}

/*
 * Taxonomic rule: every registered property has one canonical category.
 * Hybrid intersections such as prime repunits, Mersenne primes, and Fermat
 * primes are intentionally not separate registry entries. An integer may
 * naturally satisfy multiple independently registered properties.
 */

export const PROPERTY_REGISTRY = [
  // PRIMES
  property({
    key: 'isPrime', label: 'Primes', category: 'primes', predicate: primes.isPrime,
    formula: 'p \\in \\mathbb{P}',
    description: 'Integers greater than one whose only positive divisors are one and themselves.',
    cost: MEDIUM, defaultCount: N_10K, exhaustiveCount: N_50K
  }),
  property({
    key: 'isTwinPrime', label: 'Twin Prime Pair Starts', category: 'primes', predicate: primes.isTwinPrime,
    formula: 'p, p+2 \\in \\mathbb{P}',
    description: 'The lower member p of a pair of primes differing by two.',
    cost: MEDIUM, defaultCount: N_10K, exhaustiveCount: N_50K
  }),
  property({
    key: 'isPrimeTriplet', label: 'Prime Triplets', category: 'primes', predicate: primes.isPrimeTriplet,
    formula: '(p,p+2,p+6) \\text{ or } (p,p+4,p+6)',
    description: 'Prime numbers belonging to a prime triplet of one of the two standard forms, including (3,5,7).',
    cost: MEDIUM, defaultCount: N_250, exhaustiveCount: N_250
  }),
  property({
    key: 'isChenPrime', label: 'Chen Primes', category: 'primes', predicate: primes.isChenPrime,
    formula: 'p \\in \\mathbb{P},\\quad p+2 \\text{ is prime or semiprime}',
    description: 'A prime p such that p+2 is prime or has exactly two prime factors counted with multiplicity.',
    cost: MEDIUM, defaultCount: N_10K, exhaustiveCount: N_50K
  }),
  property({
    key: 'isSophieGermainPrime', label: 'Sophie Germain Primes', category: 'primes', predicate: primes.isSophieGermainPrime,
    formula: 'p, 2p+1 \\in \\mathbb{P}',
    description: 'A prime p for which 2p+1 is also prime.',
    cost: MEDIUM, defaultCount: N_10K, exhaustiveCount: N_50K
  }),
  property({
    key: 'isSafePrime', label: 'Safe Primes', category: 'primes', predicate: primes.isSafePrime,
    formula: 'p \\in \\mathbb{P},\\quad (p-1)/2 \\in \\mathbb{P}',
    description: 'A prime p whose half predecessor (p−1)/2 is also prime.',
    cost: MEDIUM, defaultCount: N_10K, exhaustiveCount: N_50K
  }),
  property({
    key: 'isCousinPrime', label: 'Cousin Prime Pair Starts', category: 'primes', predicate: primes.isCousinPrime,
    formula: 'p, p+4 \\in \\mathbb{P}',
    description: 'The lower member p of a prime pair differing by four.',
    cost: MEDIUM, defaultCount: N_10K, exhaustiveCount: N_50K
  }),
  property({
    key: 'isSexyPrime', label: 'Sexy Prime Pair Starts', category: 'primes', predicate: primes.isSexyPrime,
    formula: 'p, p+6 \\in \\mathbb{P}',
    description: 'The lower member p of a prime pair differing by six.',
    cost: MEDIUM, defaultCount: N_10K, exhaustiveCount: N_50K
  }),
  property({
    key: 'isFactorialPrime', label: 'Factorial Primes', category: 'primes', predicate: primes.isFactorialPrime,
    formula: 'p = k! \\pm 1,\\quad p \\in \\mathbb{P}',
    description: 'Primes one above or one below a factorial value.',
    cost: FAST, defaultCount: N_500, exhaustiveCount: N_500
  }),
  property({
    key: 'isPillaiPrime', label: 'Pillai Primes', category: 'primes', predicate: primes.isPillaiPrime,
    formula: 'k! \\equiv -1 \\pmod p,\\quad k \\not\\equiv -1 \\pmod p',
    description: 'Primes satisfying the defining nontrivial factorial congruence.',
    cost: SLOW, defaultCount: N_500, exhaustiveCount: N_1600
  }),
  property({
    key: 'isWilsonPrime', label: 'Wilson Primes', category: 'primes', predicate: primes.isWilsonPrime,
    formula: '(p-1)! \\equiv -1 \\pmod{p^2}',
    description: 'Primes satisfying the Wilson congruence modulo the square of the prime.',
    cost: SLOW, defaultCount: N_1200, exhaustiveCount: N_1200
  }),
  property({
    key: 'isWagstaffPrime', label: 'Wagstaff Primes', category: 'primes', predicate: primes.isWagstaffPrime,
    formula: 'p=(2^q+1)/3,\\quad p,q \\in \\mathbb{P},\\ q>2',
    description: 'Primes of Wagstaff form, generated from an odd prime exponent q.',
    cost: FAST, defaultCount: N_1200, exhaustiveCount: N_1200
  }),
  property({
    key: 'isWieferichPrime', label: 'Wieferich Primes', category: 'primes', predicate: primes.isWieferichPrime,
    formula: '2^{p-1} \\equiv 1 \\pmod{p^2}',
    description: 'Odd primes satisfying the Wieferich congruence to base two.',
    cost: MEDIUM, defaultCount: N_10K, exhaustiveCount: N_50K
  }),

  // FACTORIZATION
  property({
    key: 'isSemiPrime', label: 'Semiprimes', category: 'factorization', predicate: factorization.isSemiPrime,
    formula: 'n=pq,\\quad p,q \\in \\mathbb{P}',
    description: 'Integers with exactly two prime factors counted with multiplicity.',
    cost: MEDIUM, defaultCount: N_10K, exhaustiveCount: N_50K
  }),
  property({
    key: 'isSphenic', label: 'Sphenic Numbers', category: 'factorization', predicate: factorization.isSphenicNumber,
    formula: 'n=pqr,\\quad p<q<r \\text{ prime}',
    description: 'Products of exactly three distinct primes.',
    cost: MEDIUM, defaultCount: N_10K, exhaustiveCount: N_50K
  }),
  property({
    key: 'isPowerfulSequence', label: 'Powerful Numbers', category: 'factorization', predicate: factorization.isPowerfulNumber,
    formula: 'p^a \\mid n \\Rightarrow a \\geq 2',
    description: 'Positive integers for which every prime factor occurs with exponent at least two; one is included by convention.',
    cost: MEDIUM, defaultCount: N_30K, exhaustiveCount: N_150K
  }),

  // FIGURATES
  property({
    key: 'isTriangular', label: 'Triangular Numbers', category: 'figurates', predicate: figurates.isTriangular,
    formula: 'T_k = k(k+1)/2',
    description: 'Numbers forming triangular point arrangements.',
    cost: FAST, defaultCount: N_50K, exhaustiveCount: N_150K
  }),
  property({
    key: 'isSquare', label: 'Square Numbers', category: 'figurates', predicate: figurates.isSquare,
    formula: 'S_k = k^2',
    description: 'Squares of positive integers.',
    cost: FAST, defaultCount: N_50K, exhaustiveCount: N_150K
  }),
  property({
    key: 'isPentagonal', label: 'Pentagonal Numbers', category: 'figurates', predicate: figurates.isPentagonal,
    formula: 'P_5(k)=k(3k-1)/2',
    description: 'Five-sided polygonal numbers.',
    cost: FAST, defaultCount: N_50K, exhaustiveCount: N_150K
  }),
  property({
    key: 'isHexagonal', label: 'Hexagonal Numbers', category: 'figurates', predicate: figurates.isHexagonal,
    formula: 'P_6(k)=k(2k-1)',
    description: 'Six-sided polygonal numbers.',
    cost: FAST, defaultCount: N_50K, exhaustiveCount: N_150K
  }),
  property({
    key: 'isHeptagonal', label: 'Heptagonal Numbers', category: 'figurates', predicate: figurates.isHeptagonal,
    formula: 'P_7(k)=k(5k-3)/2',
    description: 'Seven-sided polygonal numbers.',
    cost: FAST, defaultCount: N_50K, exhaustiveCount: N_150K
  }),
  property({
    key: 'isOctagonal', label: 'Octagonal Numbers', category: 'figurates', predicate: figurates.isOctagonal,
    formula: 'P_8(k)=k(3k-2)',
    description: 'Eight-sided polygonal numbers.',
    cost: FAST, defaultCount: N_50K, exhaustiveCount: N_150K
  }),
  property({
    key: 'isNonagonal', label: 'Nonagonal Numbers', category: 'figurates', predicate: figurates.isNonagonalNumber,
    formula: 'P_9(k)=k(7k-5)/2',
    description: 'Nine-sided polygonal numbers.',
    cost: FAST, defaultCount: N_50K, exhaustiveCount: N_150K
  }),
  property({
    key: 'isDecagonal', label: 'Decagonal Numbers', category: 'figurates', predicate: figurates.isDecagonalNumber,
    formula: 'P_{10}(k)=k(4k-3)',
    description: 'Ten-sided polygonal numbers.',
    cost: FAST, defaultCount: N_50K, exhaustiveCount: N_150K
  }),
  property({
    key: 'isDodecagonal', label: 'Dodecagonal Numbers', category: 'figurates', predicate: figurates.isDodecagonalNumber,
    formula: 'P_{12}(k)=k(5k-4)',
    description: 'Twelve-sided polygonal numbers.',
    cost: FAST, defaultCount: N_50K, exhaustiveCount: N_150K
  }),
  property({
    key: 'isCube', label: 'Cube Numbers', category: 'figurates', predicate: figurates.isCube,
    formula: 'C_k=k^3',
    description: 'Cubes of positive integers.',
    cost: FAST, defaultCount: N_50K, exhaustiveCount: N_150K
  }),
  property({
    key: 'isTetrahedralNumber', label: 'Tetrahedral Numbers', category: 'figurates', predicate: figurates.isTetrahedralNumber,
    formula: 'Te_k=k(k+1)(k+2)/6',
    description: 'Three-dimensional figurate numbers made by stacking triangular layers.',
    cost: MEDIUM, defaultCount: N_30K, exhaustiveCount: N_75K
  }),
  property({
    key: 'isSquarePyramidal', label: 'Square Pyramidal Numbers', category: 'figurates', predicate: figurates.isSquarePyramidal,
    formula: 'Sp_k=k(k+1)(2k+1)/6',
    description: 'Sums of the first k square numbers.',
    cost: MEDIUM, defaultCount: N_30K, exhaustiveCount: N_75K
  }),
  property({
    key: 'isCenteredSquare', label: 'Centered Square Numbers', category: 'figurates', predicate: figurates.isCenteredSquare,
    formula: 'C_4(k)=2k(k-1)+1',
    description: 'Centered square arrangements with a central point.',
    cost: FAST, defaultCount: N_50K, exhaustiveCount: N_150K
  }),
  property({
    key: 'isCenteredTriangular', label: 'Centered Triangular Numbers', category: 'figurates', predicate: figurates.isCenteredTriangular,
    formula: 'C_3(k)=3k(k-1)/2+1',
    description: 'Centered triangular arrangements with a central point.',
    cost: FAST, defaultCount: N_50K, exhaustiveCount: N_150K
  }),
  property({
    key: 'isCenteredPentagonal', label: 'Centered Pentagonal Numbers', category: 'figurates', predicate: figurates.isCenteredPentagonalNumber,
    formula: 'C_5(k)=5k(k-1)/2+1',
    description: 'Centered pentagonal arrangements with a central point.',
    cost: FAST, defaultCount: N_50K, exhaustiveCount: N_150K
  }),
  property({
    key: 'isCenteredHexagonal', label: 'Centered Hexagonal Numbers', category: 'figurates', predicate: figurates.isCenteredHexagonalNumber,
    formula: 'C_6(k)=3k(k-1)+1',
    description: 'Centered hexagonal arrangements with a central point.',
    cost: FAST, defaultCount: N_50K, exhaustiveCount: N_150K
  }),
  property({
    key: 'isPronic', label: 'Pronic (Oblong) Numbers', category: 'figurates', predicate: figurates.isPronicNumber,
    formula: 'n=k(k+1),\\quad k\\geq1',
    description: 'Products of consecutive positive integers.',
    cost: FAST, defaultCount: N_50K, exhaustiveCount: N_150K
  }),

  // SEQUENCES
  property({
    key: 'isFibonacci', label: 'Fibonacci Numbers', category: 'sequences', predicate: sequences.isFibonacci,
    formula: 'F_0=0, F_1=1, F_n=F_{n-1}+F_{n-2}',
    description: 'Values of the Fibonacci recurrence.',
    cost: FAST, defaultCount: N_50K, exhaustiveCount: N_150K
  }),
  property({
    key: 'isLucas', label: 'Lucas Numbers', category: 'sequences', predicate: sequences.isLucas,
    formula: 'L_0=2, L_1=1, L_n=L_{n-1}+L_{n-2}',
    description: 'Values of the Lucas recurrence.',
    cost: FAST, defaultCount: N_50K, exhaustiveCount: N_150K
  }),
  property({
    key: 'isPell', label: 'Pell Numbers', category: 'sequences', predicate: sequences.isPell,
    formula: 'P_0=0, P_1=1, P_n=2P_{n-1}+P_{n-2}',
    description: 'Values of the Pell recurrence.',
    cost: FAST, defaultCount: N_50K, exhaustiveCount: N_150K
  }),
  property({
    key: 'isPellLucas', label: 'Pell-Lucas Numbers', category: 'sequences', predicate: sequences.isPellLucas,
    formula: 'Q_0=Q_1=2, Q_n=2Q_{n-1}+Q_{n-2}',
    description: 'Companion sequence to Pell numbers.',
    cost: FAST, defaultCount: N_50K, exhaustiveCount: N_150K
  }),
  property({
    key: 'isJacobsthal', label: 'Jacobsthal Numbers', category: 'sequences', predicate: sequences.isJacobsthal,
    formula: 'J_0=0, J_1=1, J_n=J_{n-1}+2J_{n-2}',
    description: 'Values of the Jacobsthal recurrence.',
    cost: FAST, defaultCount: N_50K, exhaustiveCount: N_150K
  }),
  property({
    key: 'isJacobsthalLucas', label: 'Jacobsthal-Lucas Numbers', category: 'sequences', predicate: sequences.isJacobsthalLucas,
    formula: 'j_0=2, j_1=1, j_n=j_{n-1}+2j_{n-2}',
    description: 'Companion sequence associated with the Jacobsthal numbers.',
    cost: FAST, defaultCount: N_50K, exhaustiveCount: N_150K
  }),
  property({
    key: 'isTribonacci', label: 'Tribonacci Numbers', category: 'sequences', predicate: sequences.isTribonacci,
    formula: 'T_n=T_{n-1}+T_{n-2}+T_{n-3}',
    description: 'Each term is the sum of the three preceding terms.',
    cost: FAST, defaultCount: N_50K, exhaustiveCount: N_150K
  }),
  property({
    key: 'isTetranacci', label: 'Tetranacci Numbers', category: 'sequences', predicate: sequences.isTetranacci,
    formula: 'T_n=T_{n-1}+T_{n-2}+T_{n-3}+T_{n-4}',
    description: 'Each term is the sum of the four preceding terms.',
    cost: FAST, defaultCount: N_50K, exhaustiveCount: N_150K
  }),
  property({
    key: 'isPentavonacci', label: 'Pentavonacci Numbers', category: 'sequences', predicate: sequences.isPentavonacci,
    formula: 'P_n=\\sum_{i=1}^{5}P_{n-i}',
    description: 'Each term is the sum of the five preceding terms.',
    cost: FAST, defaultCount: N_50K, exhaustiveCount: N_150K
  }),
  property({
    key: 'isCatalan', label: 'Catalan Numbers', category: 'sequences', predicate: sequences.isCatalan,
    formula: 'C_n=\\frac{1}{n+1}\\binom{2n}{n}',
    description: 'Counts many recursively defined combinatorial structures.',
    cost: FAST, defaultCount: N_50K, exhaustiveCount: N_150K
  }),
  property({
    key: 'isBell', label: 'Bell Numbers', category: 'sequences', predicate: sequences.isBell,
    formula: 'B_{n+1}=\\sum_{k=0}^{n}\\binom{n}{k}B_k',
    description: 'Counts set partitions.',
    cost: FAST, defaultCount: N_50K, exhaustiveCount: N_150K
  }),
  property({
    key: 'isMotzkin', label: 'Motzkin Numbers', category: 'sequences', predicate: sequences.isMotzkin,
    formula: 'M_n=\\frac{(2n+1)M_{n-1}+3(n-1)M_{n-2}}{n+2}',
    description: 'Counts Motzkin paths and related combinatorial objects.',
    cost: FAST, defaultCount: N_50K, exhaustiveCount: N_150K
  }),
  property({
    key: 'isSchroeder', label: 'Large Schröder Numbers', category: 'sequences', predicate: sequences.isSchroeder,
    formula: 'S_n=\\frac{(6n-3)S_{n-1}-(n-2)S_{n-2}}{n+1}',
    description: 'The large Schröder sequence.',
    cost: FAST, defaultCount: N_50K, exhaustiveCount: N_150K
  }),
  property({
    key: 'isDelannoy', label: 'Central Delannoy Numbers', category: 'sequences', predicate: sequences.isDelannoy,
    formula: 'D_n=\\frac{3(2n-1)D_{n-1}-(n-1)D_{n-2}}{n}',
    description: 'Central Delannoy numbers: 1, 3, 13, 63, 321, …',
    cost: FAST, defaultCount: N_50K, exhaustiveCount: N_150K
  }),
  property({
    key: 'isFubini', label: 'Fubini Numbers', category: 'sequences', predicate: sequences.isFubini,
    formula: 'F_n=\\sum_{k=0}^{n}k!S(n,k)',
    description: 'Counts ordered set partitions (ordered Bell numbers).',
    cost: FAST, defaultCount: N_50K, exhaustiveCount: N_150K
  }),
  property({
    key: 'isPadovan', label: 'Padovan Numbers', category: 'sequences', predicate: sequences.isPadovan,
    formula: 'P_n=P_{n-2}+P_{n-3}',
    description: 'Values of the Padovan recurrence.',
    cost: FAST, defaultCount: N_50K, exhaustiveCount: N_150K
  }),
  property({
    key: 'isPerrin', label: 'Perrin Numbers', category: 'sequences', predicate: sequences.isPerrin,
    formula: 'R_n=R_{n-2}+R_{n-3}',
    description: 'Values of the Perrin recurrence.',
    cost: FAST, defaultCount: N_50K, exhaustiveCount: N_150K
  }),
  property({
    key: 'isFactorial', label: 'Factorial Numbers', category: 'sequences', predicate: sequences.isFactorial,
    formula: 'n!=1\\cdot2\\cdots n',
    description: 'Factorials of non-negative integers, with duplicate values represented once.',
    cost: FAST, defaultCount: N_100K, exhaustiveCount: N_250K
  }),
  property({
    key: 'isDoubleFactorial', label: 'Double Factorial Numbers', category: 'sequences', predicate: sequences.isDoubleFactorial,
    formula: 'n!!=n(n-2)(n-4)\\cdots',
    description: 'Products stepping down by two, for even and odd starting integers.',
    cost: FAST, defaultCount: N_100K, exhaustiveCount: N_250K
  }),
  property({
    key: 'isDerangement', label: 'Derangement Numbers', category: 'sequences', predicate: sequences.isDerangement,
    formula: '!n=n!\\sum_{k=0}^{n}\\frac{(-1)^k}{k!}',
    description: 'Counts permutations with no fixed points.',
    cost: FAST, defaultCount: N_100K, exhaustiveCount: N_250K
  }),
  property({
    key: 'isPowerOfTwoSequence', label: 'Powers of 2', category: 'sequences', predicate: sequences.isPowerOfTwoSequence,
    formula: '2^k',
    description: 'Positive integral powers of two, including 2⁰ = 1.',
    cost: FAST, defaultCount: N_75K, exhaustiveCount: N_250K
  }),
  property({
    key: 'isPowerOfThree', label: 'Powers of 3', category: 'sequences', predicate: sequences.isPowerOfThree,
    formula: '3^k',
    description: 'Positive integral powers of three, including 3⁰ = 1.',
    cost: FAST, defaultCount: N_75K, exhaustiveCount: N_250K
  }),
  property({
    key: 'isPowerOfFive', label: 'Powers of 5', category: 'sequences', predicate: sequences.isPowerOfFive,
    formula: '5^k',
    description: 'Positive integral powers of five, including 5⁰ = 1.',
    cost: FAST, defaultCount: N_75K, exhaustiveCount: N_250K
  }),
  property({
    key: 'isPowerOfTen', label: 'Powers of 10', category: 'sequences', predicate: sequences.isPowerOfTen,
    formula: '10^k',
    description: 'Positive integral powers of ten, including 10⁰ = 1.',
    cost: FAST, defaultCount: N_100K, exhaustiveCount: N_2M
  }),
  property({
    key: 'isMersenneNumber', label: 'Mersenne Numbers', category: 'sequences', predicate: sequences.isMersenneNumber,
    formula: 'M_k=2^k-1,\\quad k\\geq1',
    description: 'Numbers one less than a positive integral power of two.',
    cost: FAST, defaultCount: N_75K, exhaustiveCount: N_250K
  }),
  property({
    key: 'isFermatNumber', label: 'Fermat Numbers', category: 'sequences', predicate: sequences.isFermatNumber,
    formula: 'F_k=2^{2^k}+1,\\quad k\\geq0',
    description: 'Numbers one greater than a power of two whose exponent is a power of two.',
    cost: FAST, defaultCount: N_250K, exhaustiveCount: N_2M
  }),
  property({
    key: 'isLeonardo', label: 'Leonardo Numbers', category: 'sequences', predicate: sequences.isLeonardoNumber,
    formula: 'L_0=L_1=1,\\quad L_n=L_{n-1}+L_{n-2}+1',
    description: 'Values of the Leonardo recurrence.',
    cost: FAST, defaultCount: N_50K, exhaustiveCount: N_150K
  }),
  property({
    key: 'isCentralBinomial', label: 'Central Binomial Coefficients', category: 'sequences', predicate: sequences.isCentralBinomialCoefficient,
    formula: '\\binom{2k}{k}',
    description: 'Values of the central binomial coefficient.',
    cost: FAST, defaultCount: N_50K, exhaustiveCount: N_150K
  }),

  // DIGIT REPRESENTATION
  property({
    key: 'isHappy', label: 'Happy Numbers', category: 'digits', predicate: digits.isHappy,
    formula: 's_b(n)=\\sum_i d_i^2',
    description: 'Repeatedly replacing n by the sum of the squares of its base-b digits eventually reaches one.',
    baseDependent: true, defaultBase: 10, cost: FAST, defaultCount: N_30K, exhaustiveCount: N_100K
  }),
  property({
    key: 'isNarcissistic', label: 'Narcissistic Numbers', category: 'digits', predicate: digits.isNarcissistic,
    formula: 'n=\\sum_{i=1}^{k}d_i^k',
    description: 'Equal to the sum of its base-b digits raised to the number of digits.',
    baseDependent: true, defaultBase: 10, cost: FAST, defaultCount: N_30K, exhaustiveCount: N_100K
  }),
  property({
    key: 'isKaprekar', label: 'Kaprekar Numbers', category: 'digits', predicate: digits.isKaprekar,
    formula: 'n^2=A\\,b^k+B,\\quad A+B=n',
    description: 'The square can be split in base b into two parts whose sum is n.',
    baseDependent: true, defaultBase: 10, cost: FAST, defaultCount: N_30K, exhaustiveCount: N_100K
  }),
  property({
    key: 'isKaprekarConstant', label: 'Kaprekar Constants', category: 'digits', predicate: digits.isKaprekarConstant,
    formula: 'K_b(n)=n',
    description: 'Fixed points of the digit-descending minus digit-ascending Kaprekar step in base b.',
    baseDependent: true, defaultBase: 10, cost: FAST, defaultCount: N_30K, exhaustiveCount: N_30K
  }),
  property({
    key: 'isAutomorphic', label: 'Automorphic Numbers', category: 'digits', predicate: digits.isAutomorphic,
    formula: 'n^2\\equiv n\\pmod{b^k}',
    description: 'The base-b representation of n² ends with the base-b digits of n.',
    baseDependent: true, defaultBase: 10, cost: FAST, defaultCount: N_30K, exhaustiveCount: N_100K
  }),
  property({
    key: 'isRepunit', label: 'Repunit Numbers', category: 'digits', predicate: digits.isRepunit,
    formula: 'R_k=\\frac{b^k-1}{b-1}',
    description: 'Numbers whose base-b representation consists entirely of ones.',
    baseDependent: true, defaultBase: 10, cost: FAST, defaultCount: N_30K, exhaustiveCount: N_150K
  }),
  property({
    key: 'isRepdigit', label: 'Repdigit Numbers', category: 'digits', predicate: digits.isRepdigit,
    formula: 'n=\\overline{ddd\\cdots d}_b',
    description: 'Numbers whose base-b representation repeats a single digit.',
    baseDependent: true, defaultBase: 10, cost: FAST, defaultCount: N_30K, exhaustiveCount: N_150K
  }),

  // DIVISOR SUMS
  property({
    key: 'isPerfect', label: 'Perfect Numbers', category: 'divisors', predicate: divisors.isPerfect,
    formula: 's(n)=n \\iff \\sigma(n)=2n',
    description: 'Equal to the sum of their proper divisors.',
    cost: MEDIUM, defaultCount: N_30K, exhaustiveCount: N_60K
  }),
  property({
    key: 'isAbundant', label: 'Abundant Numbers', category: 'divisors', predicate: divisors.isAbundant,
    formula: 's(n)>n',
    description: 'The sum of proper divisors exceeds the number itself.',
    cost: MEDIUM, defaultCount: N_30K, exhaustiveCount: N_60K
  }),
  property({
    key: 'isDeficient', label: 'Deficient Numbers', category: 'divisors', predicate: divisors.isDeficient,
    formula: 's(n)<n',
    description: 'The sum of proper divisors is smaller than the number itself; one is included.',
    cost: MEDIUM, defaultCount: N_30K, exhaustiveCount: N_60K
  }),
  property({
    key: 'isAmicable', label: 'Amicable Numbers', category: 'divisors', predicate: divisors.isAmicableNumber,
    formula: 's(a)=b,\\quad s(b)=a,\\quad a\\ne b',
    description: 'Members of amicable pairs, where each number is the sum of the other’s proper divisors.',
    cost: MEDIUM, defaultCount: N_30K, exhaustiveCount: N_60K
  }),
  property({
    key: 'isBetrothed', label: 'Betrothed Numbers', category: 'divisors', predicate: divisors.isBetrothedNumber,
    formula: 's(a)=b+1,\\quad s(b)=a+1',
    description: 'Members of pairs whose proper-divisor sums equal the partner plus one.',
    cost: MEDIUM, defaultCount: N_30K, exhaustiveCount: N_60K
  }),
  property({
    key: 'isMultiperfect', label: 'Multiperfect Numbers (Class ≥ 3)', category: 'divisors', predicate: divisors.isMultiperfectNumber,
    formula: '\\sigma(n)=kn,\\quad k\\in\\mathbb{Z},\\ k\\geq3',
    description: 'Numbers whose divisor sum is an integer multiple of themselves, at least three.',
    cost: MEDIUM, defaultCount: N_30K, exhaustiveCount: N_60K
  })
];

export const PROPERTY_BY_KEY = Object.fromEntries(
  PROPERTY_REGISTRY.map(item => [item.key, item])
);

export const SET_NAMES = Object.fromEntries(
  Object.keys(CATEGORY_REGISTRY).map(category => [
    category,
    Object.fromEntries(
      PROPERTY_REGISTRY
        .filter(item => item.category === category)
        .map(item => [item.key, item.label])
    )
  ])
);

export const SET_METADATA = Object.fromEntries(
  Object.keys(CATEGORY_REGISTRY).map(category => [
    category,
    Object.fromEntries(
      PROPERTY_REGISTRY
        .filter(item => item.category === category)
        .map(item => [item.key, {
          formula: item.formula,
          description: item.description,
          label: item.label,
          category: item.category,
          baseDependent: item.baseDependent ?? false,
          defaultBase: item.defaultBase ?? null
        }])
    )
  ])
);

export function getProperty(key) {
  return PROPERTY_BY_KEY[key] ?? null;
}

export function getPropertiesByCategory(category) {
  return PROPERTY_REGISTRY.filter(item => item.category === category);
}

export function getPropertiesByVisualization(visualization) {
  return PROPERTY_REGISTRY.filter(
    item => item.visualizations.includes(visualization)
  );
}