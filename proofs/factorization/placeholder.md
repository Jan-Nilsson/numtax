
# Infinitely Many Integers Have Exactly k Prime Factors

**Status:** Proof available  
**Category:** Factorization  
**Topic:** Set cardinality

## Claim

For every fixed positive integer \(k\), the set

\[
A_k=\{n\geq 2:\Omega(n)=k\}
\]

is infinite, where \(\Omega(n)\) counts prime factors with multiplicity.

For example, \(\Omega(12)=3\), because

\[
12=2\cdot2\cdot3.
\]

## Proof

Fix any positive integer \(k\).

There are infinitely many odd primes, since the set of all primes is infinite and only one prime is even.

For each odd prime \(p\), define

\[
n_p=2^{k-1}p.
\]

The prime factorization of \(n_p\) consists of \(k-1\) copies of the prime \(2\), together with one copy of \(p\). Therefore,

\[
\Omega(n_p)=k.
\]

Consequently, every \(n_p\) belongs to \(A_k\).

If \(p\) and \(q\) are distinct odd primes, then

\[
2^{k-1}p\neq 2^{k-1}q.
\]

Thus, distinct odd primes produce distinct elements of \(A_k\).

Because there are infinitely many odd primes, this construction produces infinitely many distinct elements of \(A_k\). Therefore, \(A_k\) is infinite.

Finally, \(A_k\) is a subset of the positive integers. Hence, it is countably infinite.

\[
\boxed{|A_k|=\aleph_0}
\]

\(\square\)

## Cardinality consequence

For every fixed \(k\geq1\), infinitely many positive integers have exactly \(k\) prime factors when multiplicities are counted.
