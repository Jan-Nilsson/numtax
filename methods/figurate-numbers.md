# Figurate Numbers

**Status:** Documentation in progress

## Overview

This page will document the methods Numtax uses to investigate
figurate numbers.

Figurate numbers are numbers associated with geometric arrangements
of points. Common examples include triangular and square numbers.

## Mathematical definitions

The exact definitions and formulas documented here will correspond
to the figurate-number types supported by Numtax.

For reference, the \(n\)-th triangular number is

\[
T_n = \frac{n(n+1)}{2}
\]

and the \(n\)-th square number is

\[
S_n = n^2
\]

These examples do not imply that every possible figurate-number type
is currently implemented in the project.

## Implementation

The implementation will be documented after reviewing
`js/algorithms/figurates.js`.

This section will explain which figurate-number families are supported
and whether the implementation generates values, tests membership,
or performs other operations.

## Time and space complexity

**Status:** Pending implementation review.

The analysis will distinguish between generating a term and testing
whether a value belongs to a particular figurate-number family.

## Correctness

Mathematical arguments will be provided for the formulas or tests
used by each documented implementation.

## Edge cases and limitations

This section will cover supported input ranges, index conventions,
and any limitations found during code review.

## Examples

Verified examples will be added after reviewing the source code.

## Tests

Tests will compare computed results against known values and relevant
boundary cases.

## References

Mathematical references will be added during review.