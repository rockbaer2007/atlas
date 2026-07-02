# ATLAS Foundation

> Every great framework begins with a heartbeat.

The Foundation package provides the core infrastructure used throughout the
ATLAS framework.

Its primary goal is to offer a small, predictable and well-tested foundation
that higher-level packages can build upon.

---

# Current Components

## Event Infrastructure (Heartbeat)

The first production-ready subsystem of the Foundation package is the
Event Infrastructure.

It provides:

- Event contracts
- Event handlers
- Event subscriptions
- Event publishing
- Default EventBus implementation

The implementation intentionally keeps the core small.

Features such as filtering, wildcard matching or priorities are postponed
until real use cases require them.

---

# Design Principles

The Event Infrastructure follows a few simple rules.

## Small Core

The EventBus only coordinates.

Responsibilities are delegated to dedicated classes.

- EventHandlerCollection
- DefaultEventSubscription
- DefaultEventBus

---

## Fail Fast

If an event handler throws an exception:

- publishing stops immediately
- the exception is propagated
- later handlers are not executed

---

## Deterministic Execution

Handlers are always executed

- sequentially
- in registration order

This guarantees predictable behaviour.

---

## Safe Enumeration

Publishing always iterates over a snapshot of the registered handlers.

This allows handlers to unsubscribe themselves safely while an event is
being published.

---

# Example

```ts
const bus = new DefaultEventBus();

bus.subscribe("demo", async event => {
  console.log(event.type);
});

await bus.publish({
  type: "demo",
  timestamp: new Date(),
});
```

---

# Philosophy

The Foundation package is intentionally conservative.

New abstractions are introduced only when they solve an existing problem.

The goal is not to build the largest framework.

The goal is to build a framework developers can trust.

---

# Sprint

Current Sprint

**G2.5.1b-R2 — ❤️ Heartbeat**

Snapshot

**S0002**

---

© ATLAS Framework
