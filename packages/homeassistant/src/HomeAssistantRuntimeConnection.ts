import {
  deriveHomeAssistantWebSocketUrl,
  type HomeAssistantConnectionConfiguration,
} from "./HomeAssistantConnectionConfiguration";
import type { HomeAssistantWebSocketLifecycle } from "./HomeAssistantWebSocketProtocol";
import {
  createHomeAssistantWebSocketClient,
  type HomeAssistantWebSocket,
  type HomeAssistantWebSocketClient,
} from "./HomeAssistantWebSocketTransport";

export type HomeAssistantWebSocketFactory = (url: string) => HomeAssistantWebSocket;

export type HomeAssistantRuntimeConnection = Readonly<{
  connect(accessToken: string): HomeAssistantWebSocketLifecycle;
  reconnect(accessToken: string): HomeAssistantWebSocketLifecycle;
  disconnect(): void;
  getLifecycle(): HomeAssistantWebSocketLifecycle;
  getClient(): HomeAssistantWebSocketClient | undefined;
}>;

export function createHomeAssistantRuntimeConnection(
  configuration: HomeAssistantConnectionConfiguration,
  createSocket: HomeAssistantWebSocketFactory,
): HomeAssistantRuntimeConnection {
  let client: HomeAssistantWebSocketClient | undefined;
  let lifecycle: HomeAssistantWebSocketLifecycle = { state: "closed" };

  const connect = (accessToken: string): HomeAssistantWebSocketLifecycle => {
    const url = deriveHomeAssistantWebSocketUrl(configuration);
    if (!url) {
      lifecycle = {
        state: "failed",
        reason: "Home Assistant connection requires an HTTP or HTTPS URL.",
      };
      return lifecycle;
    }

    client?.disconnect();
    client = createHomeAssistantWebSocketClient(createSocket(url), accessToken);
    lifecycle = client.getLifecycle();
    return lifecycle;
  };

  return {
    connect,
    reconnect(accessToken: string): HomeAssistantWebSocketLifecycle {
      return connect(accessToken);
    },
    disconnect(): void {
      client?.disconnect();
      lifecycle = { state: "closed" };
    },
    getLifecycle(): HomeAssistantWebSocketLifecycle {
      return client?.getLifecycle() ?? lifecycle;
    },
    getClient(): HomeAssistantWebSocketClient | undefined {
      return client;
    },
  };
}
