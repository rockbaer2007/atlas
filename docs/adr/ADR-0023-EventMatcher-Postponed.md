# ADR-0023: EventMatcher postponed

**Status**

Accepted

---

## Context

During the implementation of the Heartbeat event infrastructure an
additional abstraction called **EventMatcher** was introduced.

Its responsibility was to decide whether an event should be delivered to
a registered handler.

Initially the implementation only supported exact event type matching.

---

## Problem

The EventMatcher performed only the following comparison.

```ts
event.type === eventType
```

This duplicated logic that already existed inside the
EventHandlerCollection.

The abstraction provided no additional behaviour while increasing the
complexity of the architecture.

---

## Decision

The EventMatcher is removed from the Heartbeat implementation.

The EventBus directly requests the handlers registered for an event type.

```text
publish(event)

↓

EventHandlerCollection

↓

getHandlers(event.type)

↓

foreach handler

↓

execute handler
```

No additional matching step is performed.

---

## Rationale

Heartbeat intentionally focuses on a minimal and maintainable event core.

Introducing abstractions before they solve a real problem violates one of
the project's architectural principles.

> Every abstraction must justify its existence.

---

## Future

The EventMatcher may return in a future snapshot if ATLAS introduces
advanced routing features such as

- wildcard matching
- namespaces
- event filters
- predicates
- priorities

At that point the abstraction would provide real value.

---

## Consequences

### Advantages

- smaller EventBus
- simpler architecture
- fewer dependencies
- easier testing
- better readability

### Disadvantages

Advanced routing is not yet available.

This limitation is accepted for Heartbeat.

---

## Related ADRs

- ADR-0022 — Event Model

---

## Sprint

G2.5.1b-R2 — ❤️ Heartbeat

Snapshot

S0002
