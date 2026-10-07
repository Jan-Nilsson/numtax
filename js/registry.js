import * as primes from './algorithms/primes.js';
import * as figurates from './algorithms/figurates.js';
import * as sequences from './algorithms/sequences.js';
import * as digits from './algorithms/digits.js';

const FAST = 'fast';
const MEDIUM = 'medium';
const SLOW = 'slow';

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
    description: 'Integer greater than 1 divisible only by 1 and itself, and sets derived from prime relationships.'
  },
  figurates: {
    label: 'Figurates',
    description: 'Numbers representable as regular geometric arrangements of equally spaced points.'
  },
  sequences: {
    label: 'Sequences',
    description: 'Numbers belonging to integer sequences defined by recurrence relations or combinatorial formulas.'
  },
  digits: {
    label: 'Digits',
    description: 'Numbers with properties defined by their digits or divisor sums.'
  }
};

export const PROPERTY_REGISTRY = [
  {
    key: 'isPrime',
    label: 'Primes',
    category: 'primes',
    predicate: primes.isPrime,
    formula: 'p \\in \\mathbb{P} \\iff \\forall d \\mid p,\\ d = 1 \\text{ or } d = p',
    description: 'A natural number greater than 1 with no positive divisors other than 1 and itself.',
    baseDependent: false,
    visualizations: ['polar'],
    cost: MEDIUM,
    defaultCount: N_10K,
    exhaustiveCount: N_50K
  },
  {
    key: 'isSemiPrime',
    label: 'Semi Primes',
    category: 'primes',
    predicate: primes.isSemiPrime,
    formula: 'n = p \\cdot q,\\quad p,q \\in \\mathbb{P}',
    description: 'Product of exactly two primes, not necessarily distinct.',
    baseDependent: false,
    visualizations: ['polar'],
    cost: MEDIUM,
    defaultCount: N_10K,
    exhaustiveCount: N_50K
  },
  {
    key: 'isTwinPrime',
    label: 'Twin Primes',
    category: 'primes',
    predicate: primes.isTwinPrime,
    formula: 'p \\in \\mathbb{P},\\quad p + 2 \\in \\mathbb{P}',
    description: 'A prime p such that p+2 is also prime.',
    baseDependent: false,
    visualizations: ['polar'],
    cost: MEDIUM,
    defaultCount: N_10K,
    exhaustiveCount: N_50K
  },
  {
    key: 'isPrimeTriplet',
    label: 'Prime Triplets',
    category: 'primes',
    predicate: primes.isPrimeTriplet,
    formula: '(p,\\,p+2,\\,p+6)\\text{ or }(p,\\,p+4,\\,p+6)',
    description: 'A prime that belongs to a set of three primes of the form (p,p+2,p+6) or (p,p+4,p+6).',
    baseDependent: false,
    visualizations: ['polar'],
    cost: FAST,
    defaultCount: N_250,
    exhaustiveCount: N_250
  },
  {
    key: 'isChenPrime',
    label: 'Chen Primes',
    category: 'primes',
    predicate: primes.isChenPrime,
    formula: 'p \\in \\mathbb{P},\\quad p+2 \\in \\mathbb{P} \\cup \\mathbb{P}_2',
    description: 'A prime p where p+2 is either prime or semiprime.',
    baseDependent: false,
    visualizations: ['polar'],
    cost: MEDIUM,
    defaultCount: N_10K,
    exhaustiveCount: N_50K
  },
  {
    key: 'isSophieGermainPrime',
    label: 'Sophie Germain Primes',
    category: 'primes',
    predicate: primes.isSophieGermainPrime,
    formula: 'p \\in \\mathbb{P},\\quad 2p+1 \\in \\mathbb{P}',
    description: 'A prime p such that 2p+1 is also prime.',
    baseDependent: false,
    visualizations: ['polar'],
    cost: MEDIUM,
    defaultCount: N_10K,
    exhaustiveCount: N_50K
  },
  {
    key: 'isMersennePrime',
    label: 'Mersenne Primes',
    category: 'primes',
    predicate: primes.isMersennePrime,
    formula: 'M_p = 2^p - 1 \\in \\mathbb{P},\\quad p \\in \\mathbb{P}',
    description: 'A prime of the form 2^p−1 where p is prime.',
    baseDependent: false,
    visualizations: ['polar'],
    cost: FAST,
    defaultCount: N_250,
    exhaustiveCount: N_250
  },
  {
    key: 'isFermatPrime',
    label: 'Fermat Primes',
    category: 'primes',
    predicate: primes.isFermatPrime,
    formula: 'F_n = 2^{2^n} + 1',
    description: 'A prime of the form 2^(2^n)+1.',
    baseDependent: false,
    visualizations: ['polar'],
    cost: FAST,
    defaultCount: N_250,
    exhaustiveCount: N_250
  },
  {
    key: 'isWilsonPrime',
    label: 'Wilson Primes',
    category: 'primes',
    predicate: primes.isWilsonPrime,
    formula: 'p^2 \\mid (p-1)! + 1',
    description: 'A prime p such that p² divides (p−1)!+1.',
    baseDependent: false,
    visualizations: ['polar'],
    cost: FAST,
    defaultCount: N_1200,
    exhaustiveCount: N_1200
  },
  {
    key: 'isWagstaffPrime',
    label: 'Wagstaff Primes',
    category: 'primes',
    predicate: primes.isWagstaffPrime,
    formula: '\\frac{2^p + 1}{3} \\in \\mathbb{P},\\quad p \\in \\mathbb{P}\\text{ odd}',
    description: 'A prime of the form (2^p+1)/3 where p is an odd prime.',
    baseDependent: false,
    visualizations: ['polar'],
    cost: FAST,
    defaultCount: N_1200,
    exhaustiveCount: N_1200
  },
  {
    key: 'isPrimeRepunit',
    label: 'Repunit Primes',
    category: 'primes',
    predicate: primes.isPrimeRepunit,
    formula: 'R_n = \\frac{10^n - 1}{9}',
    description: 'A prime whose decimal representation consists entirely of 1s.',
    baseDependent: true,
    defaultBase: 10,
    visualizations: ['polar'],
    cost: MEDIUM,
    defaultCount: N_10K,
    exhaustiveCount: N_50K
  },
  {
    key: 'isFactorialPrime',
    label: 'Factorial Primes',
    category: 'primes',
    predicate: primes.isFactorialPrime,
    formula: 'n! \\pm 1 \\in \\mathbb{P}',
    description: 'A prime of the form n!−1 or n!+1.',
    baseDependent: false,
    visualizations: ['polar'],
    cost: FAST,
    defaultCount: N_500,
    exhaustiveCount: N_500
  },
  {
    key: 'isPillaiPrime',
    label: 'Pillai Primes',
    category: 'primes',
    predicate: primes.isPillaiPrime,
    formula: '\\exists\\,k:\\;k! \\equiv -1 \\pmod p,\\quad k \\not\\equiv -1 \\pmod p',
    description: 'A prime p for which there exists k with k! ≡ −1 (mod p) but k ≢ −1 (mod p).',
    baseDependent: false,
    visualizations: ['polar'],
    cost: SLOW,
    defaultCount: N_500,
    exhaustiveCount: N_1600
  },

  {
    key: 'isTriangular',
    label: 'Triangular Numbers',
    category: 'figurates',
    predicate: figurates.isTriangular,
    formula: 'T_n = \\frac{n(n+1)}{2}',
    description: 'A number that can be arranged in an equilateral triangle.',
    baseDependent: false,
    visualizations: ['polar'],
    cost: FAST,
    defaultCount: N_50K,
    exhaustiveCount: N_150K
  },
  {
    key: 'isSquare',
    label: 'Square Numbers',
    category: 'figurates',
    predicate: figurates.isSquare,
    formula: 'S_n = n^2',
    description: 'A number that is the square of an integer.',
    baseDependent: false,
    visualizations: ['polar'],
    cost: FAST,
    defaultCount: N_50K,
    exhaustiveCount: N_150K
  },
  {
    key: 'isPentagonal',
    label: 'Pentagonal Numbers',
    category: 'figurates',
    predicate: figurates.isPentagonal,
    formula: 'P_n = \\frac{n(3n-1)}{2}',
    description: 'A pentagonal figurate number.',
    baseDependent: false,
    visualizations: ['polar'],
    cost: FAST,
    defaultCount: N_50K,
    exhaustiveCount: N_150K
  },
  {
    key: 'isHexagonal',
    label: 'Hexagonal Numbers',
    category: 'figurates',
    predicate: figurates.isHexagonal,
    formula: 'H_n = n(2n-1)',
    description: 'A hexagonal number. Every hexagonal number is triangular.',
    baseDependent: false,
    visualizations: ['polar'],
    cost: FAST,
    defaultCount: N_50K,
    exhaustiveCount: N_150K
  },
  {
    key: 'isHeptagonal',
    label: 'Heptagonal Numbers',
    category: 'figurates',
    predicate: figurates.isHeptagonal,
    formula: 'Hep_n = \\frac{n(5n-3)}{2}',
    description: 'A heptagonal figurate number.',
    baseDependent: false,
    visualizations: ['polar'],
    cost: FAST,
    defaultCount: N_50K,
    exhaustiveCount: N_150K
  },
  {
    key: 'isOctagonal',
    label: 'Octagonal Numbers',
    category: 'figurates',
    predicate: figurates.isOctagonal,
    formula: 'O_n = n(3n-2)',
    description: 'An octagonal figurate number.',
    baseDependent: false,
    visualizations: ['polar'],
    cost: FAST,
    defaultCount: N_50K,
    exhaustiveCount: N_150K
  },
  {
    key: 'isCube',
    label: 'Cube Numbers',
    category: 'figurates',
    predicate: figurates.isCube,
    formula: 'C_n = n^3',
    description: 'A number that is the cube of an integer.',
    baseDependent: false,
    visualizations: ['polar'],
    cost: FAST,
    defaultCount: N_50K,
    exhaustiveCount: N_150K
  },
  {
    key: 'isTetrahedralNumber',
    label: 'Tetrahedral Numbers',
    category: 'figurates',
    predicate: figurates.isTetrahedralNumber,
    formula: 'Te_n = \\frac{n(n+1)(n+2)}{6}',
    description: 'Three-dimensional figurate numbers obtained by stacking triangular layers.',
    baseDependent: false,
    visualizations: ['polar'],
    cost: MEDIUM,
    defaultCount: N_30K,
    exhaustiveCount: N_75K
  },
  {
    key: 'isSquarePyramidal',
    label: 'Square Pyramidal Numbers',
    category: 'figurates',
    predicate: figurates.isSquarePyramidal,
    formula: 'Sp_n = \\frac{n(n+1)(2n+1)}{6}',
    description: 'The sum of the first n square numbers.',
    baseDependent: false,
    visualizations: ['polar'],
    cost: MEDIUM,
    defaultCount: N_30K,
    exhaustiveCount: N_75K
  },

  {
    key: 'isFibonacci',
    label: 'Fibonacci Sequence',
    category: 'sequences',
    predicate: sequences.isFibonacci,
    formula: 'F_n = F_{n-1} + F_{n-2},\\quad F_0=0,\\,F_1=1',
    description: 'Member of the Fibonacci sequence.',
    baseDependent: false,
    visualizations: ['polar'],
    cost: FAST,
    defaultCount: N_50K,
    exhaustiveCount: N_150K
  },
  {
    key: 'isLucas',
    label: 'Lucas Numbers',
    category: 'sequences',
    predicate: sequences.isLucas,
    formula: 'L_n = L_{n-1} + L_{n-2},\\quad L_0=2,\\,L_1=1',
    description: 'Member of the Lucas sequence.',
    baseDependent: false,
    visualizations: ['polar'],
    cost: FAST,
    defaultCount: N_50K,
    exhaustiveCount: N_150K
  },
  {
    key: 'isPell',
    label: 'Pell Numbers',
    category: 'sequences',
    predicate: sequences.isPell,
    formula: 'P_n = 2P_{n-1} + P_{n-2},\\quad P_0=0,\\,P_1=1',
    description: 'Member of the Pell sequence.',
    baseDependent: false,
    visualizations: ['polar'],
    cost: FAST,
    defaultCount: N_50K,
    exhaustiveCount: N_150K
  },
  {
    key: 'isPellLucas',
    label: 'Pell-Lucas Numbers',
    category: 'sequences',
    predicate: sequences.isPellLucas,
    formula: 'Q_n = 2Q_{n-1} + Q_{n-2},\\quad Q_0=Q_1=2',
    description: 'Lucas-type companion sequence to the Pell numbers.',
    baseDependent: false,
    visualizations: ['polar'],
    cost: FAST,
    defaultCount: N_50K,
    exhaustiveCount: N_150K
  },
  {
    key: 'isJacobsthal',
    label: 'Jacobsthal Numbers',
    category: 'sequences',
    predicate: sequences.isJacobsthal,
    formula: 'J_n = J_{n-1} + 2J_{n-2},\\quad J_0=0,\\,J_1=1',
    description: 'Member of the Jacobsthal sequence.',
    baseDependent: false,
    visualizations: ['polar'],
    cost: FAST,
    defaultCount: N_50K,
    exhaustiveCount: N_150K
  },
  {
    key: 'isJacobsthalLucas',
    label: 'Jacobsthal-Lucas Numbers',
    category: 'sequences',
    predicate: sequences.isJacobsthalLucas,
    formula: 'j_n = j_{n-1} + 2j_{n-2},\\quad j_0=2,\\,j_1=1',
    description: 'Lucas-type companion sequence associated with the Jacobsthal numbers.',
    baseDependent: false,
    visualizations: ['polar'],
    cost: FAST,
    defaultCount: N_50K,
    exhaustiveCount: N_150K
  },
  {
    key: 'isTribonacci',
    label: 'Tribonacci Numbers',
    category: 'sequences',
    predicate: sequences.isTribonacci,
    formula: 'T_n = T_{n-1}+T_{n-2}+T_{n-3}',
    description: 'Generalization of Fibonacci using the three preceding terms.',
    baseDependent: false,
    visualizations: ['polar'],
    cost: FAST,
    defaultCount: N_50K,
    exhaustiveCount: N_150K
  },
  {
    key: 'isTetranacci',
    label: 'Tetranacci Numbers',
    category: 'sequences',
    predicate: sequences.isTetranacci,
    formula: 'T_n = T_{n-1}+T_{n-2}+T_{n-3}+T_{n-4}',
    description: 'Generalization of Fibonacci using the four preceding terms.',
    baseDependent: false,
    visualizations: ['polar'],
    cost: FAST,
    defaultCount: N_50K,
    exhaustiveCount: N_150K
  },
  {
    key: 'isPentavonacci',
    label: 'Pentavonacci Numbers',
    category: 'sequences',
    predicate: sequences.isPentavonacci,
    formula: 'P_n = P_{n-1}+P_{n-2}+P_{n-3}+P_{n-4}+P_{n-5}',
    description: 'Generalization of Fibonacci using the five preceding terms.',
    baseDependent: false,
    visualizations: ['polar'],
    cost: FAST,
    defaultCount: N_50K,
    exhaustiveCount: N_150K
  },
  {
    key: 'isCatalan',
    label: 'Catalan Numbers',
    category: 'sequences',
    predicate: sequences.isCatalan,
    formula: 'C_n = \\frac{1}{n+1}\\binom{2n}{n}',
    description: 'Counts many combinatorial structures.',
    baseDependent: false,
    visualizations: ['polar'],
    cost: FAST,
    defaultCount: N_50K,
    exhaustiveCount: N_150K
  },
  {
    key: 'isBell',
    label: 'Bell Numbers',
    category: 'sequences',
    predicate: sequences.isBell,
    formula: 'B_{n+1} = \\sum_{k=0}^{n} \\binom{n}{k}B_k',
    description: 'Counts the number of partitions of a set.',
    baseDependent: false,
    visualizations: ['polar'],
    cost: FAST,
    defaultCount: N_50K,
    exhaustiveCount: N_150K
  },
  {
    key: 'isNarayana',
    label: 'Narayana Numbers',
    category: 'sequences',
    predicate: sequences.isNarayana,
    formula: 'N(n,k)=\\frac{1}{n}\\binom{n}{k}\\binom{n}{k-1}',
    description: 'Triangular array refining the Catalan numbers.',
    baseDependent: false,
    visualizations: ['polar'],
    cost: FAST,
    defaultCount: N_50K,
    exhaustiveCount: N_150K
  },
  {
    key: 'isMotzkin',
    label: 'Motzkin Numbers',
    category: 'sequences',
    predicate: sequences.isMotzkin,
    formula: 'M_0=1,\\quad M_1=1,\\quad M_n=M_{n-1}+\\sum_{k=0}^{n-2}M_kM_{n-2-k}',
    description: 'Counts Motzkin paths and related combinatorial structures.',
    baseDependent: false,
    visualizations: ['polar'],
    cost: FAST,
    defaultCount: N_50K,
    exhaustiveCount: N_150K
  },
  {
    key: 'isSchroeder',
    label: 'Schröder Numbers',
    category: 'sequences',
    predicate: sequences.isSchroeder,
    formula: 'S_0=1,\\quad S_n=S_{n-1}+\\sum_{k=0}^{n-1}S_kS_{n-1-k}',
    description: 'Large Schröder numbers.',
    baseDependent: false,
    visualizations: ['polar'],
    cost: FAST,
    defaultCount: N_50K,
    exhaustiveCount: N_150K
  },
  {
    key: 'isDelannoy',
    label: 'Delannoy Numbers',
    category: 'sequences',
    predicate: sequences.isDelannoy,
    formula: 'D_n=\\sum_{k=0}^{n}\\binom{n}{k}\\binom{n+k}{k}',
    description: 'Central Delannoy numbers.',
    baseDependent: false,
    visualizations: ['polar'],
    cost: FAST,
    defaultCount: N_50K,
    exhaustiveCount: N_150K
  },
  {
    key: 'isFubini',
    label: 'Fubini Numbers',
    category: 'sequences',
    predicate: sequences.isFubini,
    formula: 'F_n=\\sum_{k=0}^{n}k!\\,S(n,k)',
    description: 'Counts ordered set partitions.',
    baseDependent: false,
    visualizations: ['polar'],
    cost: FAST,
    defaultCount: N_50K,
    exhaustiveCount: N_150K
  },
  {
    key: 'isPadovan',
    label: 'Padovan Sequence',
    category: 'sequences',
    predicate: sequences.isPadovan,
    formula: 'P_n=P_{n-2}+P_{n-3},\\quad P_0=P_1=P_2=1',
    description: 'Sequence associated with the plastic constant.',
    baseDependent: false,
    visualizations: ['polar'],
    cost: FAST,
    defaultCount: N_50K,
    exhaustiveCount: N_150K
  },
  {
    key: 'isPerrin',
    label: 'Perrin Sequence',
    category: 'sequences',
    predicate: sequences.isPerrin,
    formula: 'a_n=a_{n-2}+a_{n-3},\\quad a_0=3,\\,a_1=0,\\,a_2=2',
    description: 'Sequence related to Perrin pseudoprimes.',
    baseDependent: false,
    visualizations: ['polar'],
    cost: FAST,
    defaultCount: N_50K,
    exhaustiveCount: N_150K
  },
  {
    key: 'isFactorial',
    label: 'Factorial Numbers',
    category: 'sequences',
    predicate: sequences.isFactorial,
    formula: 'n! = 1\\cdot2\\cdot3\\cdots n',
    description: 'A number equal to the factorial of a non-negative integer.',
    baseDependent: false,
    visualizations: ['polar'],
    cost: FAST,
    defaultCount: N_100K,
    exhaustiveCount: N_250K
  },
  {
    key: 'isDoubleFactorial',
    label: 'Double Factorial Numbers',
    category: 'sequences',
    predicate: sequences.isDoubleFactorial,
    formula: 'n!! = n(n-2)(n-4)\\cdots',
    description: 'A number obtained by multiplying every second positive integer down to 1 or 2.',
    baseDependent: false,
    visualizations: ['polar'],
    cost: FAST,
    defaultCount: N_100K,
    exhaustiveCount: N_250K
  },
  {
    key: 'isDerangement',
    label: 'Derangement Numbers',
    category: 'sequences',
    predicate: sequences.isDerangement,
    formula: '!n = n!\\sum_{k=0}^{n}\\frac{(-1)^k}{k!}',
    description: 'Counts permutations in which no element appears in its original position.',
    baseDependent: false,
    visualizations: ['polar'],
    cost: FAST,
    defaultCount: N_100K,
    exhaustiveCount: N_250K
  },
  {
    key: 'isRepunit',
    label: 'Repunit Numbers',
    category: 'sequences',
    predicate: sequences.isRepunit,
    formula: 'R_n=\\frac{10^n-1}{9}',
    description: 'A number whose decimal representation consists entirely of 1s.',
    baseDependent: true,
    defaultBase: 10,
    visualizations: ['polar'],
    cost: FAST,
    defaultCount: N_30K,
    exhaustiveCount: N_150K
  },
  {
    key: 'isRepdigit',
    label: 'Repdigit Numbers',
    category: 'sequences',
    predicate: sequences.isRepdigit,
    formula: 'n=\\underbrace{ddd\\cdots d}_{k\\text{ digits}}',
    description: 'A number whose decimal representation consists of repetitions of a single digit.',
    baseDependent: true,
    defaultBase: 10,
    visualizations: ['polar'],
    cost: FAST,
    defaultCount: N_30K,
    exhaustiveCount: N_150K
  },
  {
    key: 'isPowerOfTwoSequence',
    label: 'Powers of 2',
    category: 'sequences',
    predicate: sequences.isPowerOfTwoSequence,
    formula: 'a_n=2^n',
    description: 'A positive integer that is an integral power of 2.',
    baseDependent: false,
    visualizations: ['polar'],
    cost: FAST,
    defaultCount: N_75K,
    exhaustiveCount: N_250K
  },
  {
    key: 'isPowerOfThree',
    label: 'Powers of 3',
    category: 'sequences',
    predicate: sequences.isPowerOfThree,
    formula: 'a_n=3^n',
    description: 'A positive integer that is an integral power of 3.',
    baseDependent: false,
    visualizations: ['polar'],
    cost: FAST,
    defaultCount: N_75K,
    exhaustiveCount: N_250K
  },
  {
    key: 'isPowerOfFive',
    label: 'Powers of 5',
    category: 'sequences',
    predicate: sequences.isPowerOfFive,
    formula: 'a_n=5^n',
    description: 'A positive integer that is an integral power of 5.',
    baseDependent: false,
    visualizations: ['polar'],
    cost: FAST,
    defaultCount: N_75K,
    exhaustiveCount: N_250K
  },
  {
    key: 'isPowerOfTen',
    label: 'Powers of 10',
    category: 'sequences',
    predicate: sequences.isPowerOfTen,
    formula: 'a_n=10^n',
    description: 'A positive integer that is an integral power of 10.',
    baseDependent: false,
    visualizations: ['polar'],
    cost: FAST,
    defaultCount: N_100K,
    exhaustiveCount: N_2M
  },
  {
    key: 'isCenteredSquare',
    label: 'Centered Square Numbers',
    category: 'sequences',
    predicate: sequences.isCenteredSquare,
    formula: 'C_n=2n^2-2n+1',
    description: 'A centered square figurate number.',
    baseDependent: false,
    visualizations: ['polar'],
    cost: FAST,
    defaultCount: N_50K,
    exhaustiveCount: N_150K
  },
  {
    key: 'isCenteredTriangular',
    label: 'Centered Triangular Numbers',
    category: 'sequences',
    predicate: sequences.isCenteredTriangular,
    formula: 'C_n=\\frac{3n(n-1)}{2}+1',
    description: 'A centered triangular figurate number.',
    baseDependent: false,
    visualizations: ['polar'],
    cost: FAST,
    defaultCount: N_50K,
    exhaustiveCount: N_150K
  },
  {
    key: 'isMersenneNumber',
    label: 'Mersenne Numbers',
    category: 'sequences',
    predicate: sequences.isMersenneNumber,
    formula: 'M_n=2^n-1',
    description: 'A number one less than an integral power of 2.',
    baseDependent: false,
    visualizations: ['polar'],
    cost: FAST,
    defaultCount: N_75K,
    exhaustiveCount: N_250K
  },
  {
    key: 'isFermatNumber',
    label: 'Fermat Numbers',
    category: 'sequences',
    predicate: sequences.isFermatNumber,
    formula: 'F_n=2^{2^n}+1',
    description: 'A number of the form 2^(2^n)+1.',
    baseDependent: false,
    visualizations: ['polar'],
    cost: FAST,
    defaultCount: N_250K,
    exhaustiveCount: N_2M
  },
  {
    key: 'isPowerfulSequence',
    label: 'Powerful Numbers',
    category: 'sequences',
    predicate: sequences.isPowerfulSequence,
    formula: 'p^a\\mid n\\Rightarrow a\\geq2',
    description: 'A positive integer in which every prime factor occurs with exponent at least 2.',
    baseDependent: false,
    visualizations: ['polar'],
    cost: MEDIUM,
    defaultCount: N_30K,
    exhaustiveCount: N_150K
  },

  {
    key: 'isPerfect',
    label: 'Perfect Numbers',
    category: 'digits',
    predicate: digits.isPerfect,
    formula: '\\sigma(n)=2n',
    description: 'A number equal to the sum of its proper divisors.',
    baseDependent: false,
    visualizations: ['polar'],
    cost: MEDIUM,
    defaultCount: N_30K,
    exhaustiveCount: N_60K
  },
  {
    key: 'isAbundant',
    label: 'Abundant Numbers',
    category: 'digits',
    predicate: digits.isAbundant,
    formula: '\\sigma(n)>2n',
    description: 'A number whose proper divisors sum to more than itself.',
    baseDependent: false,
    visualizations: ['polar'],
    cost: MEDIUM,
    defaultCount: N_30K,
    exhaustiveCount: N_60K
  },
  {
    key: 'isDeficient',
    label: 'Deficient Numbers',
    category: 'digits',
    predicate: digits.isDeficient,
    formula: '\\sigma(n)<2n',
    description: 'A number whose proper divisors sum to less than itself.',
    baseDependent: false,
    visualizations: ['polar'],
    cost: MEDIUM,
    defaultCount: N_30K,
    exhaustiveCount: N_60K
  },
  {
    key: 'isHappy',
    label: 'Happy Numbers',
    category: 'digits',
    predicate: digits.isHappy,
    formula: '\\exists\\,k:\\;s^k(n)=1,\\quad s(n)=\\sum_i d_i^2',
    description: 'Repeatedly replacing n by the sum of squares of its digits eventually reaches 1.',
    baseDependent: true,
    defaultBase: 10,
    visualizations: ['polar'],
    cost: FAST,
    defaultCount: N_30K,
    exhaustiveCount: N_100K
  },
  {
    key: 'isNarcissistic',
    label: 'Narcissistic Numbers',
    category: 'digits',
    predicate: digits.isNarcissistic,
    formula: 'n=\\sum_{i=1}^{k}d_i^k',
    description: 'Equal to the sum of its own digits each raised to the power of the number of digits.',
    baseDependent: true,
    defaultBase: 10,
    visualizations: ['polar'],
    cost: FAST,
    defaultCount: N_30K,
    exhaustiveCount: N_100K
  },
  {
    key: 'isKaprekar',
    label: 'Kaprekar Numbers',
    category: 'digits',
    predicate: digits.isKaprekar,
    formula: 'n^2=\\overline{AB},\\quad A+B=n',
    description: 'n² can be split into two parts that sum back to n.',
    baseDependent: true,
    defaultBase: 10,
    visualizations: ['polar'],
    cost: FAST,
    defaultCount: N_30K,
    exhaustiveCount: N_100K
  },
  {
    key: 'isKaprekarConstant',
    label: 'Kaprekar Constants',
    category: 'digits',
    predicate: digits.isKaprekarConstant,
    formula: 'K(n)=K(\\operatorname{sort}_\\downarrow(n)-\\operatorname{sort}_\\uparrow(n))',
    description: 'A fixed point of the Kaprekar routine for a given digit length.',
    baseDependent: true,
    defaultBase: 10,
    visualizations: ['polar'],
    cost: FAST,
    defaultCount: N_30K,
    exhaustiveCount: N_30K
  },
  {
    key: 'isAutomorphic',
    label: 'Automorphic Numbers',
    category: 'digits',
    predicate: digits.isAutomorphic,
    formula: 'n^2\\equiv n \\pmod{10^k}',
    description: 'n² ends in the digits of n itself.',
    baseDependent: true,
    defaultBase: 10,
    visualizations: ['polar'],
    cost: FAST,
    defaultCount: N_30K,
    exhaustiveCount: N_100K
  }
];

export const PROPERTY_BY_KEY = Object.fromEntries(
  PROPERTY_REGISTRY.map(property => [property.key, property])
);

export const SET_NAMES = Object.fromEntries(
  Object.keys(CATEGORY_REGISTRY).map(category => [
    category,
    Object.fromEntries(
      PROPERTY_REGISTRY
        .filter(property => property.category === category)
        .map(property => [property.key, property.label])
    )
  ])
);

export const SET_METADATA = Object.fromEntries(
  Object.keys(CATEGORY_REGISTRY).map(category => [
    category,
    Object.fromEntries(
      PROPERTY_REGISTRY
        .filter(property => property.category === category)
        .map(property => [
          property.key,
          {
            formula: property.formula,
            description: property.description,
            label: property.label,
            category: property.category,
            baseDependent: property.baseDependent ?? false,
            defaultBase: property.defaultBase ?? null
          }
        ])
    )
  ])
);

export function getProperty(key) {
  return PROPERTY_BY_KEY[key] ?? null;
}

export function getPropertiesByCategory(category) {
  return PROPERTY_REGISTRY.filter(
    property => property.category === category
  );
}