import type { HomeAssistantWebSocket } from "./HomeAssistantWebSocketTransport";

export type HomeAssistantBrowserWebSocketEvent = Readonly<{
  data: string;
}>;

export type HomeAssistantBrowserWebSocketLike = {
  onmessage: ((event: HomeAssistantBrowserWebSocketEvent) => void) | null;
  onclose: (() => void) | null;
  send(data: string): void;
  close(): void;
};

export type HomeAssistantBrowserWebSocketConstructor = new (
  url: string,
) => HomeAssistantBrowserWebSocketLike;

export function createBrowserHomeAssistantWebSocket(
  url: string,
  WebSocketConstructor: HomeAssistantBrowserWebSocketConstructor = globalThis.WebSocket as unknown as HomeAssistantBrowserWebSocketConstructor,
): HomeAssistantWebSocket {
  const socket = new WebSocketConstructor(url);
  const messageListeners = new Set<(data: string) => void | Promise<void>>();
  const closeListeners = new Set<() => void>();

  socket.onmessage = event => {
    for (const listener of messageListeners) {
      void listener(event.data);
    }
  };
  socket.onclose = () => {
    for (const listener of closeListeners) {
      listener();
    }
  };

  return {
    send(data: string): void {
      socket.send(data);
    },
    close(): void {
      socket.close();
    },
    onMessage(listener): () => void {
      messageListeners.add(listener);
      return () => messageListeners.delete(listener);
    },
    onClose(listener): () => void {
      closeListeners.add(listener);
      return () => closeListeners.delete(listener);
    },
  };
}
