import type { HomeAssistantEntityStatePublisher } from "./HomeAssistantEntityStateTransport";
import { createInMemoryHomeAssistantEntityStateTransport } from "./HomeAssistantEntityStateTransport";
import {
  mapHomeAssistantStateChangedEvent,
  parseHomeAssistantWebSocketMessage,
  type HomeAssistantWebSocketLifecycle,
} from "./HomeAssistantWebSocketProtocol";
import {
  createHomeAssistantServiceCommand,
  type HomeAssistantServiceCommand,
} from "./HomeAssistantServiceCommand";

export type HomeAssistantWebSocket = Readonly<{
  send(data: string): void;
  close(): void;
  onMessage(listener: (data: string) => void | Promise<void>): () => void;
  onClose(listener: (reason?: string) => void): () => void;
}>;

export type HomeAssistantWebSocketClient = Readonly<{
  transport: HomeAssistantEntityStatePublisher;
  getLifecycle(): HomeAssistantWebSocketLifecycle;
  subscribeLifecycle(listener: (lifecycle: HomeAssistantWebSocketLifecycle) => void): () => void;
  callService(command: HomeAssistantServiceCommand): HomeAssistantServiceCallResult;
  disconnect(): void;
}>;

export type HomeAssistantServiceCallResult = Readonly<{
  accepted: boolean;
  requestId?: number;
  reason?: string;
}>;

export function createHomeAssistantWebSocketClient(
  socket: HomeAssistantWebSocket,
  accessToken: string,
): HomeAssistantWebSocketClient {
  const transport = createInMemoryHomeAssistantEntityStateTransport();
  let lifecycle: HomeAssistantWebSocketLifecycle = { state: "connecting" };
  let nextRequestId = 2;
  const lifecycleListeners = new Set<(lifecycle: HomeAssistantWebSocketLifecycle) => void>();
  const updateLifecycle = (nextLifecycle: HomeAssistantWebSocketLifecycle): void => {
    lifecycle = nextLifecycle;
    for (const listener of lifecycleListeners) {
      listener(lifecycle);
    }
  };
  const removeMessageListener = socket.onMessage(async data => {
    const message = parseHomeAssistantWebSocketMessage(data);
    if (!message) {
      return;
    }

    if (message.type === "auth_required") {
      updateLifecycle({ state: "authenticating" });
      socket.send(JSON.stringify({ type: "auth", access_token: accessToken }));
      return;
    }

    if (message.type === "auth_ok") {
      updateLifecycle({ state: "connected", subscription: "pending" });
      socket.send(JSON.stringify({ id: 1, type: "subscribe_events", event_type: "state_changed" }));
      return;
    }

    if (message.type === "auth_invalid") {
      updateLifecycle({ state: "failed", reason: message.message });
      return;
    }

    if (message.type === "result") {
      if (message.id !== 1) {
        return;
      }

      updateLifecycle(message.success
        ? { state: "connected", subscription: "active" }
        : {
          state: "failed",
          reason: message.message ?? "Home Assistant event subscription failed.",
        });
      return;
    }

    await transport.publish(mapHomeAssistantStateChangedEvent(message));
  });
  const removeCloseListener = socket.onClose(reason => {
    updateLifecycle({ state: "closed", ...(reason ? { reason } : {}) });
  });

  return {
    transport,
    getLifecycle(): HomeAssistantWebSocketLifecycle {
      return lifecycle;
    },
    subscribeLifecycle(listener): () => void {
      lifecycleListeners.add(listener);
      listener(lifecycle);
      return () => lifecycleListeners.delete(listener);
    },
    callService(command): HomeAssistantServiceCallResult {
      if (lifecycle.state !== "connected" || lifecycle.subscription !== "active") {
        return {
          accepted: false,
          reason: "Home Assistant event subscription is not active.",
        };
      }

      const validatedCommand = createHomeAssistantServiceCommand(command.entityId, command.service);
      if (!validatedCommand || validatedCommand.domain !== command.domain) {
        return {
          accepted: false,
          reason: "Only light and switch turn_on or turn_off commands are allowed.",
        };
      }

      const requestId = nextRequestId;
      nextRequestId += 1;
      socket.send(JSON.stringify({
        id: requestId,
        type: "call_service",
        domain: validatedCommand.domain,
        service: validatedCommand.service,
        target: { entity_id: validatedCommand.entityId },
      }));
      return { accepted: true, requestId };
    },
    disconnect(): void {
      removeMessageListener();
      removeCloseListener();
      socket.close();
      updateLifecycle({ state: "closed" });
    },
  };
}
