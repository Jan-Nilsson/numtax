# Prime Factorization

**Status:** Documentation in progress

## Overview

This page will document how Numtax decomposes integers into prime factors.

Prime factorization expresses an integer greater than 1 as a product
of prime numbers.

## Mathematical definition

For every integer \(n > 1\), there is a unique prime factorization
up to the ordering of the factors.

For example:

\[
60 = 2^2 \cdot 3 \cdot 5
\]

The implementation's treatment of zero, one, negative integers, and
other special inputs will be specified after source-code review.

## Implementation

The implementation will be documented after reviewing
`js/algorithms/factorization.js`.

This section will describe how factors are found, how repeated factors
are handled, and how the result is represented.

## Time and space complexity

**Status:** Pending implementation review.

The analysis will describe how performance depends on the input and
the specific algorithm used by Numtax.

## Correctness

A correctness argument will explain why the reported factors are prime
and why their product reconstructs the supported input.

## Edge cases and limitations

This section will document:

- Prime inputs.
- Composite inputs with repeated prime factors.
- The integer 1.
- Zero and negative integers, according to the implementation.
- Invalid or unsupported input values.

## Examples

Verified factorization examples will be added after code review.

## Tests

Tests will cover known factorizations, repeated factors, and relevant
boundary cases.

## References

Relevant mathematical and algorithmic references will be added later.