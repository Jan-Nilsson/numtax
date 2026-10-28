
# The Set of Triangular Numbers Is Countably Infinite

**Status:** Proof available  
**Category:** Figurates  
**Topic:** Set cardinality

## Claim

The set of positive triangular numbers is countably infinite.

Define

\[
T_n=\frac{n(n+1)}{2},\qquad n\geq1,
\]

and let

\[
\mathcal{T}=\{T_n:n\geq1\}.
\]

We claim that

\[
|\mathcal{T}|=\aleph_0.
\]

## Proof

First, observe that consecutive triangular numbers satisfy

\[
T_{n+1}-T_n
=
\frac{(n+1)(n+2)}{2}
-
\frac{n(n+1)}{2}
=n+1.
\]

Since \(n+1>0\) for every \(n\geq1\),

\[
T_{n+1}>T_n.
\]

Therefore, the sequence of triangular numbers is strictly increasing. In particular, no two different positive indices produce the same triangular number.

Now define the function

\[
f:\mathbb{N}_{\geq1}\to\mathcal{T}
\]

by

\[
f(n)=T_n.
\]

The function is surjective by the definition of \(\mathcal{T}\), since every element of \(\mathcal{T}\) is a triangular number \(T_n\).

It is also injective because the triangular numbers are strictly increasing.

Thus, \(f\) is a bijection between the positive integers and \(\mathcal{T}\).

The two sets therefore have the same cardinality:

\[
\boxed{|\mathcal{T}|=\aleph_0}
\]

\(\square\)

## Cardinality consequence

The set of positive triangular numbers is countably infinite: its elements can be paired one-to-one with the positive integers.
