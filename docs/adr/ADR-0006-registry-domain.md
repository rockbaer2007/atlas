# ADR-0006 Registry Domain

Status: Accepted

The registry is split into small contracts:
- Lookup
- ReadonlyRegistry
- MutableRegistry
- ObservableRegistry

This keeps read/write/notification concerns separated.
