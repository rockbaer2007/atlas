# ADR-0020 – Event Infrastructure

**Status:** Accepted
**Sprint:** G2.5.1a

## Context
ATLAS definiert zunächst eine stabile Event-Infrastruktur über öffentliche Contracts.

## Decision
Die Contracts Event, EventBus, EventHandler, EventPublisher,
EventSubscriber, EventFilter und EventSubscription bilden die öffentliche API.
Die Implementierung folgt in G2.5.1b.

## Consequences
- Lose Kopplung
- Gute Testbarkeit
- Erweiterbare Architektur

## Follow-up
- DefaultEventBus
- EventHandlerCollection
- DefaultEventSubscription
- EventMatcher

## Later decisions

- `EventBus` composes the focused `EventPublisher` and `EventSubscriber` contracts.
- `EventFilter` is deferred; advanced filtering is not part of the initial event API (see ADR-0023).
