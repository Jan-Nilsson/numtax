# Primality Testing

**Status:** Documentation in progress

## Overview

This page will explain how Numtax determines whether an integer is prime.

A prime number is an integer greater than 1 whose only positive divisors
are 1 and itself.

## Mathematical definition

Let \(n\) be an integer greater than 1.

The number \(n\) is prime if its only positive divisors are 1 and \(n\).
Otherwise, it is composite.

The integers below 2 are neither prime nor composite.

## Implementation

The implementation used by Numtax will be described here after reviewing
`js/algorithms/primes.js`.

This section will explain the actual algorithm, its input assumptions,
and the way special cases are handled.

## Time and space complexity

**Status:** Pending implementation review.

Complexity estimates will be based on the actual code and will state
the relevant input variables and assumptions.

## Correctness

A correctness argument will be added to explain why the implementation
returns the expected result for each supported input.

## Edge cases and limitations

The documentation will cover inputs such as:

- Integers less than 2.
- The number 2.
- Even and odd integers.
- Invalid or unsupported input values, where applicable.

## Examples

Verified examples will be added after the implementation has been reviewed.

## Tests

The relevant automated tests and boundary cases will be documented here.

## References

Mathematical and algorithmic references will be added during review.