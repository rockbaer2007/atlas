# ADR-0005 Result Domain

Status: Accepted

## Decision

Atlas uses Result<T,E> instead of exceptions for expected failures.
Exceptions remain reserved for unrecoverable programming errors.
