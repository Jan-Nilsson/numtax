
# The Set of Fibonacci Values Is Countably Infinite

**Status:** Proof available  
**Category:** Sequences  
**Topic:** Set cardinality

## Claim

The set of distinct Fibonacci values is countably infinite.

Let the Fibonacci sequence be defined by

\[
F_0=0,\qquad F_1=1,
\]

and

\[
F_{n+2}=F_{n+1}+F_n,\qquad n\geq0.
\]

Define

\[
\mathcal{F}=\{F_n:n\geq0\}.
\]

We claim that

\[
|\mathcal{F}|=\aleph_0.
\]

## Proof

For every \(n\geq2\), the recurrence relation gives

\[
F_{n+1}=F_n+F_{n-1}.
\]

The Fibonacci terms \(F_{n-1}\) are positive for \(n\geq2\). Consequently,

\[
F_{n+1}>F_n
\qquad\text{for all }n\geq2.
\]

Thus, the terms

\[
F_2,F_3,F_4,\ldots
\]

are strictly increasing and therefore all distinct.

It follows that \(\mathcal{F}\) contains infinitely many distinct elements.

Every Fibonacci value is a non-negative integer, so

\[
\mathcal{F}\subseteq\mathbb{N}_0.
\]

Since \(\mathbb{N}_0\) is countable, \(\mathcal{F}\) is at most countable. As it is also infinite, it must be countably infinite.

Therefore,

\[
\boxed{|\mathcal{F}|=\aleph_0}
\]

\(\square\)

## Cardinality consequence

The set of distinct Fibonacci values is countably infinite, even though the sequence begins with a repeated value: \(F_1=F_2=1\).
