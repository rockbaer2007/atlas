import {
  createHomeAssistantEntityState,
  type HomeAssistantEntityState,
} from "./HomeAssistantEntityState";

export type HomeAssistantWebSocketLifecycleState =
  | "connecting"
  | "authenticating"
  | "connected"
  | "failed"
  | "closed";

export type HomeAssistantWebSocketLifecycle = Readonly<{
  state: HomeAssistantWebSocketLifecycleState;
  reason?: string;
}>;

export type HomeAssistantWebSocketProtocolMessage =
  | Readonly<{ type: "auth_required" }>
  | Readonly<{ type: "auth_ok" }>
  | Readonly<{ type: "auth_invalid"; message: string }>
  | Readonly<{
    type: "event";
    event: Readonly<{
      event_type: "state_changed";
      data: Readonly<{
        entity_id: string;
        new_state: Readonly<{ state: string }> | null;
      }>;
    }>;
  }>;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export function parseHomeAssistantWebSocketMessage(
  rawData: string,
): HomeAssistantWebSocketProtocolMessage | undefined {
  try {
    const message: unknown = JSON.parse(rawData);

    if (!isRecord(message) || typeof message.type !== "string") {
      return undefined;
    }

    if (message.type === "auth_required" || message.type === "auth_ok") {
      return { type: message.type };
    }

    if (message.type === "auth_invalid" && typeof message.message === "string") {
      return { type: "auth_invalid", message: message.message };
    }

    if (message.type !== "event" || !isRecord(message.event)) {
      return undefined;
    }

    const event = message.event;
    if (event.event_type !== "state_changed" || !isRecord(event.data)) {
      return undefined;
    }

    const eventData = event.data;
    const newState = eventData.new_state;
    if (typeof eventData.entity_id !== "string") {
      return undefined;
    }

    let newStateValue: string | null;
    if (newState === null) {
      newStateValue = null;
    } else {
      if (!isRecord(newState) || typeof newState.state !== "string") {
        return undefined;
      }

      newStateValue = newState.state;
    }

    return {
      type: "event",
      event: {
        event_type: "state_changed",
        data: {
          entity_id: eventData.entity_id,
          new_state: newStateValue === null ? null : { state: newStateValue },
        },
      },
    };
  } catch {
    return undefined;
  }
}

export function mapHomeAssistantStateChangedEvent(
  message: Extract<HomeAssistantWebSocketProtocolMessage, { type: "event" }>,
): HomeAssistantEntityState {
  const state = message.event.data.new_state?.state;

  return createHomeAssistantEntityState({
    entityId: message.event.data.entity_id,
    state: state === "on" || state === "off" || state === "unavailable" ? state : "unknown",
  });
}
