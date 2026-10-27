# Number Sequences

**Status:** Documentation in progress

## Overview

This page will describe the number-sequence algorithms implemented
in Numtax.

A sequence is an ordered collection of terms defined by a rule,
a recurrence relation, or another specified construction.

## Mathematical definitions

Each sequence documented here will have its own definition, including
the starting values and indexing convention.

For example, the Fibonacci sequence is commonly defined by

\[
F_0 = 0,\quad F_1 = 1
\]

and

\[
F_n = F_{n-1} + F_{n-2}
\quad \text{for } n \geq 2.
\]

This example is illustrative; the implementation's exact conventions
will be confirmed during code review.

## Implementation

The implementation will be documented after reviewing
`js/algorithms/sequences.js`.

This section will identify the supported sequences, explain how their
terms are computed, and describe the actual input and output formats.

## Time and space complexity

**Status:** Pending implementation review.

The analysis will consider the implemented recurrence or generation
method and specify how the input size is measured.

## Correctness

Correctness arguments will be added for the documented sequence
definitions and their implementations.

## Edge cases and limitations

This section will cover starting indices, initial terms, small inputs,
and any limits imposed by the implementation.

## Examples

Verified terms and sequence examples will be added after code review.

## Tests

Tests will verify known terms, initial conditions, and relevant
boundary cases.

## References

Mathematical and algorithmic references will be added later.