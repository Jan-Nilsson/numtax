
# The Number of Positive Divisors from Prime Factorization

**Status:** Proof available  
**Category:** Divisors  
**Topic:** Finite set cardinality

## Claim

Let \(n\geq2\) have prime factorization

\[
n=p_1^{a_1}p_2^{a_2}\cdots p_r^{a_r},
\]

where the primes \(p_1,\ldots,p_r\) are distinct and each \(a_i\geq1\).

Let

\[
D(n)=\{d\in\mathbb{N}:d\mid n\}
\]

be the set of positive divisors of \(n\).

Then

\[
\boxed{|D(n)|=\prod_{i=1}^{r}(a_i+1)}
\]

## Proof

By unique prime factorization, every positive divisor \(d\) of \(n\) can be written uniquely as

\[
d=p_1^{b_1}p_2^{b_2}\cdots p_r^{b_r},
\]

where each exponent satisfies

\[
0\leq b_i\leq a_i.
\]

Conversely, every choice of exponents satisfying these inequalities produces a positive divisor of \(n\).

Thus, the divisors of \(n\) correspond one-to-one with the exponent tuples

\[
(b_1,b_2,\ldots,b_r)
\]

such that \(b_i\in\{0,1,\ldots,a_i\}\) for every \(i\).

There are exactly \(a_i+1\) choices for each exponent \(b_i\). Since the choices can be made independently, the total number of exponent tuples is

\[
(a_1+1)(a_2+1)\cdots(a_r+1).
\]

The one-to-one correspondence therefore gives

\[
|D(n)|=\prod_{i=1}^{r}(a_i+1).
\]

\(\square\)

## Example

Since

\[
12=2^2\cdot3^1,
\]

the number of positive divisors of \(12\) is

\[
|D(12)|=(2+1)(1+1)=6.
\]

Indeed, the positive divisors are \(1,2,3,4,6,12\).

## Cardinality consequence

The prime factorization of a positive integer determines the exact cardinality of its set of positive divisors.
