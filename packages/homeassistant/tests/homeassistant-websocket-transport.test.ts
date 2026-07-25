import { describe, expect, it } from "vitest";

import {
  createHomeAssistantWebSocketClient,
  createHomeAssistantServiceCommand,
  mapHomeAssistantStateChangedEvent,
  parseHomeAssistantWebSocketMessage,
  type HomeAssistantWebSocket,
} from "../src";

function createTestSocket(): HomeAssistantWebSocket & {
  readonly sent: string[];
  readonly emitMessage: (data: string) => Promise<void>;
  readonly emitClose: (reason?: string) => void;
  readonly closed: () => boolean;
} {
  const messageListeners = new Set<(data: string) => void | Promise<void>>();
  const closeListeners = new Set<(reason?: string) => void>();
  const sent: string[] = [];
  let isClosed = false;

  return {
    sent,
    send(data: string): void {
      sent.push(data);
    },
    close(): void {
      isClosed = true;
    },
    onMessage(listener): () => void {
      messageListeners.add(listener);
      return () => messageListeners.delete(listener);
    },
    onClose(listener): () => void {
      closeListeners.add(listener);
      return () => closeListeners.delete(listener);
    },
    async emitMessage(data: string): Promise<void> {
      for (const listener of messageListeners) {
        await listener(data);
      }
    },
    emitClose(reason?: string): void {
      for (const listener of closeListeners) {
        listener(reason);
      }
    },
    closed: (): boolean => isClosed,
  };
}

describe("Home Assistant WebSocket transport", () => {
  it("parses authentication and state change protocol messages safely", () => {
    expect(parseHomeAssistantWebSocketMessage('{"type":"auth_required"}')).toEqual({
      type: "auth_required",
    });
    expect(parseHomeAssistantWebSocketMessage("not-json")).toBeUndefined();

    const event = parseHomeAssistantWebSocketMessage(JSON.stringify({
      type: "event",
      event: {
        event_type: "state_changed",
        data: {
          entity_id: "binary_sensor.atlas",
          new_state: { state: "on" },
        },
      },
    }));

    expect(event).toMatchObject({ type: "event" });
    expect(mapHomeAssistantStateChangedEvent(event as Extract<typeof event, { type: "event" }>)).toEqual({
      entityId: "binary_sensor.atlas",
      state: "on",
      value: "on",
    });

    const sensorEvent = parseHomeAssistantWebSocketMessage(JSON.stringify({
      type: "event",
      event: {
        event_type: "state_changed",
        data: {
          entity_id: "sensor.atlas_temperature",
          new_state: {
            state: "21.5",
            attributes: {
              friendly_name: "Office temperature",
              unit_of_measurement: "°C",
            },
          },
        },
      },
    }));
    expect(mapHomeAssistantStateChangedEvent(sensorEvent as Extract<typeof sensorEvent, { type: "event" }>)).toEqual({
      entityId: "sensor.atlas_temperature",
      state: "available",
      value: "21.5",
      name: "Office temperature",
      unit: "°C",
    });
  });

  it("authenticates, subscribes and publishes state events through the local transport", async () => {
    const socket = createTestSocket();
    const client = createHomeAssistantWebSocketClient(socket, "test-token");
    const lifecycleStates: string[] = [];
    client.subscribeLifecycle(lifecycle => lifecycleStates.push(lifecycle.state));

    expect(client.getLifecycle()).toEqual({ state: "connecting" });
    await socket.emitMessage('{"type":"auth_required"}');
    expect(client.getLifecycle()).toEqual({ state: "authenticating" });
    expect(socket.sent).toEqual(['{"type":"auth","access_token":"test-token"}']);

    await socket.emitMessage('{"type":"auth_ok"}');
    expect(client.getLifecycle()).toEqual({ state: "connected", subscription: "pending" });
    expect(socket.sent[1]).toBe('{"id":1,"type":"subscribe_events","event_type":"state_changed"}');

    await socket.emitMessage('{"id":1,"type":"result","success":true,"result":null}');
    expect(client.getLifecycle()).toEqual({ state: "connected", subscription: "active" });

    await socket.emitMessage(JSON.stringify({
      type: "event",
      event: {
        event_type: "state_changed",
        data: {
          entity_id: "binary_sensor.atlas",
          new_state: { state: "off" },
        },
      },
    }));

    expect(client.transport.getLatest("binary_sensor.atlas")).toEqual({
      entityId: "binary_sensor.atlas",
      state: "off",
      value: "off",
    });
    expect(lifecycleStates).toEqual(["connecting", "authenticating", "connected", "connected"]);
  });

  it("reports authentication failures and closes cleanly", async () => {
    const socket = createTestSocket();
    const client = createHomeAssistantWebSocketClient(socket, "test-token");

    await socket.emitMessage('{"type":"auth_invalid","message":"invalid token"}');
    expect(client.getLifecycle()).toEqual({ state: "failed", reason: "invalid token" });

    client.disconnect();
    expect(socket.closed()).toBe(true);
    expect(client.getLifecycle()).toEqual({ state: "closed" });
  });

  it("reports rejected event subscriptions and remote close reasons", async () => {
    const socket = createTestSocket();
    const client = createHomeAssistantWebSocketClient(socket, "test-token");

    await socket.emitMessage('{"id":1,"type":"result","success":false,"error":{"message":"not authorized"}}');
    expect(client.getLifecycle()).toEqual({ state: "failed", reason: "not authorized" });

    socket.emitClose("server restart");
    expect(client.getLifecycle()).toEqual({ state: "closed", reason: "server restart" });
  });

  it("sends only validated light and switch commands after subscription is active", async () => {
    const socket = createTestSocket();
    const client = createHomeAssistantWebSocketClient(socket, "test-token");
    const lightCommand = createHomeAssistantServiceCommand("light.atlas_lamp", "turn_on");

    expect(lightCommand).toBeDefined();
    expect(client.callService(lightCommand!)).toEqual({
      accepted: false,
      reason: "Home Assistant event subscription is not active.",
    });

    await socket.emitMessage('{"type":"auth_ok"}');
    await socket.emitMessage('{"id":1,"type":"result","success":true}');
    const serviceResults: Array<{ success: boolean; reason?: string }> = [];
    client.subscribeServiceResult(result => serviceResults.push(result));
    expect(client.callService(lightCommand!)).toEqual({ accepted: true, requestId: 2 });
    expect(socket.sent[1]).toBe('{"id":2,"type":"call_service","domain":"light","service":"turn_on","target":{"entity_id":"light.atlas_lamp"}}');
    await socket.emitMessage('{"id":2,"type":"result","success":false,"error":{"message":"device unavailable"}}');
    expect(serviceResults).toMatchObject([{
      requestId: 2,
      command: lightCommand,
      success: false,
      reason: "device unavailable",
    }]);
    expect(createHomeAssistantServiceCommand("sensor.atlas_temperature", "turn_on")).toBeUndefined();
  });
});
