# Digit Algorithms

**Status:** Documentation in progress

## Overview

This page will describe the algorithms Numtax uses to inspect and
manipulate the digits of integers.

Examples of digit-based properties include palindromic representations
and relationships between the digits of a number.

## Definitions

A digit representation depends on the chosen base.

For example, the usual decimal representation uses the digits
0 through 9. Properties such as being a palindrome must be defined
with respect to a specific representation.

## Implementation

The implementation will be documented after reviewing
`js/algorithms/digits.js`.

This section will identify the operations actually supported by the
code and explain how numbers are converted into or processed as digits.

## Time and space complexity

**Status:** Pending implementation review.

The analysis will state whether complexity is measured against the
numeric value, the number of digits, or another relevant input measure.

## Correctness

Correctness arguments will be added for each documented digit-based
operation.

## Edge cases and limitations

The documentation will cover relevant cases such as:

- Single-digit integers.
- Numbers containing zeros.
- Repeated digits.
- Negative integers, if supported.
- The representation base used by each operation.

## Examples

Verified examples will be added after code review.

## Tests

Tests will cover representative inputs, boundary cases, and numbers
with different digit patterns.

## References

Relevant definitions and algorithmic references will be added later.