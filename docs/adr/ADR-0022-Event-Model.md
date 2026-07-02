# ADR-0022: Event Model

**Status**

Accepted

---

## Context

ATLAS requires a lightweight and predictable event infrastructure that can be
used by all framework packages.

The event system should provide a minimal public API while remaining easy to
extend in future releases.

---

## Decision

An event is represented by the following contract.

```ts
export interface Event {
  readonly type: string;
  readonly timestamp: Date;
}
```

Each event must provide

- a unique event type
- the creation timestamp

No additional metadata is required by the core infrastructure.

---

## Event Type

The event type uniquely identifies the event.

Examples

```
kernel.started

plugin.loaded

renderer.initialized
```

The EventBus routes handlers solely by the event type.

---

## Event Timestamp

Each event contains the creation timestamp.

The timestamp can later be used for

- diagnostics
- logging
- tracing
- metrics

without requiring changes to the EventBus API.

---

## Event Handling

Events are processed

- sequentially
- in registration order

This guarantees deterministic behaviour.

---

## Error Handling

The EventBus follows the Fail Fast principle.

If an event handler throws an exception

- publishing stops immediately
- the exception is propagated
- remaining handlers are not executed

---

## Consequences

### Advantages

- minimal API
- deterministic behaviour
- simple implementation
- easy to understand
- easy to test

### Disadvantages

Features such as

- priorities
- filtering
- wildcard matching

are intentionally not part of the initial implementation.

These features may be introduced in future snapshots when justified by real
requirements.

---

## Notes

Heartbeat intentionally focuses on building a stable core rather than a
feature-rich event system.

The public API should remain as small as possible.

---

**Sprint**

G2.5.1b-R2 — ❤️ Heartbeat

**Snapshot**

S0002
