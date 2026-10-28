
# The Number of Positive Integers with Exactly k Digits

**Status:** Proof available  
**Category:** Digits  
**Topic:** Finite set cardinality

## Claim

For every positive integer \(k\), the set of positive integers with exactly \(k\) decimal digits has cardinality

\[
|D_k|=9\cdot10^{k-1},
\]

where

\[
D_k=\{n\in\mathbb{N}:10^{k-1}\leq n<10^k\}.
\]

## Proof

An integer has exactly \(k\) decimal digits if and only if it lies between \(10^{k-1}\) and \(10^k-1\), inclusive.

Thus, the smallest element of \(D_k\) is \(10^{k-1}\), and the largest is \(10^k-1\).

The number of integers in this interval is

\[
(10^k-1)-10^{k-1}+1.
\]

Simplifying gives

\[
10^k-10^{k-1}
=10^{k-1}(10-1)
=9\cdot10^{k-1}.
\]

Therefore,

\[
\boxed{|D_k|=9\cdot10^{k-1}}
\]

\(\square\)

## Example

For \(k=3\), the set contains all integers from \(100\) through \(999\). Its cardinality is

\[
|D_3|=9\cdot10^2=900.
\]

## Cardinality consequence

For every fixed number of decimal digits, the corresponding set of positive integers is finite and its size is given by the formula above.
