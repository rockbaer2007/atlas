import { describe, expect, it } from "vitest";

import {
  createBrowserHomeAssistantWebSocket,
  createHomeAssistantConnectionConfiguration,
  createHomeAssistantRuntimeConnection,
  mapHomeAssistantConnectionLifecycleToStatus,
  type HomeAssistantBrowserWebSocketLike,
  type HomeAssistantWebSocket,
} from "../src";

function createSocket(): HomeAssistantWebSocket & {
  readonly emitMessage: (data: string) => Promise<void>;
  readonly sent: string[];
  readonly closed: () => boolean;
} {
  const listeners = new Set<(data: string) => void | Promise<void>>();
  const sent: string[] = [];
  let isClosed = false;

  return {
    sent,
    send: data => sent.push(data),
    close: () => { isClosed = true; },
    onMessage: listener => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    onClose: () => () => undefined,
    async emitMessage(data: string): Promise<void> {
      for (const listener of listeners) {
        await listener(data);
      }
    },
    closed: () => isClosed,
  };
}

describe("Home Assistant runtime connection", () => {
  it("adapts browser-compatible WebSocket events to the ATLAS socket contract", async () => {
    let browserSocket: HomeAssistantBrowserWebSocketLike | undefined;
    const socket = createBrowserHomeAssistantWebSocket("ws://home.example.test/api/websocket", class {
      onmessage: ((event: { data: string }) => void) | null = null;
      onclose: (() => void) | null = null;
      send(): void {}
      close(): void {}

      constructor() {
        browserSocket = this;
      }
    });
    const received: string[] = [];
    socket.onMessage(data => received.push(data));

    browserSocket?.onmessage?.({ data: "message" });

    expect(received).toEqual(["message"]);
  });

  it("connects and reconnects through an injected socket factory without retaining tokens", async () => {
    const sockets: ReturnType<typeof createSocket>[] = [];
    const urls: string[] = [];
    const connection = createHomeAssistantRuntimeConnection(
      createHomeAssistantConnectionConfiguration({ url: "https://home.example.test" }),
      url => {
        urls.push(url);
        const socket = createSocket();
        sockets.push(socket);
        return socket;
      },
    );

    expect(connection.connect("first-token")).toEqual({ state: "connecting" });
    await sockets[0].emitMessage('{"type":"auth_required"}');
    expect(sockets[0].sent).toEqual(['{"type":"auth","access_token":"first-token"}']);

    expect(connection.reconnect("second-token")).toEqual({ state: "connecting" });
    expect(sockets[0].closed()).toBe(true);
    await sockets[1].emitMessage('{"type":"auth_required"}');
    expect(sockets[1].sent).toEqual(['{"type":"auth","access_token":"second-token"}']);
    expect(urls).toEqual([
      "wss://home.example.test/api/websocket",
      "wss://home.example.test/api/websocket",
    ]);
  });

  it("reports invalid configuration without creating a socket", () => {
    const connection = createHomeAssistantRuntimeConnection(
      createHomeAssistantConnectionConfiguration({ url: "not-a-url" }),
      () => { throw new Error("Socket factory must not be called."); },
    );

    expect(connection.connect("test-token")).toEqual({
      state: "failed",
      reason: "Home Assistant connection requires an HTTP or HTTPS URL.",
    });
    expect(mapHomeAssistantConnectionLifecycleToStatus({ state: "authenticating" })).toBe("pending");
    expect(mapHomeAssistantConnectionLifecycleToStatus({ state: "connected" })).toBe("ready");
    expect(mapHomeAssistantConnectionLifecycleToStatus({ state: "failed" })).toBe("blocked");
  });
});
