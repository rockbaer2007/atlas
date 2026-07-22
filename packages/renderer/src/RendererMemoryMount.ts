import type { RendererAdapter } from "./RendererAdapter";
import type {
  RendererMountRequest,
  RendererMountResult,
} from "./RendererMount";
import type { RendererOutput } from "./RendererOutput";
import type { RendererTarget } from "./RendererTarget";

export type RendererMemoryMountRecord = Readonly<{
  outputName: string;
  outputKind: RendererOutput["kind"];
  targetName: string;
  targetIdentifier?: string;
  content: string;
}>;

export type RendererMemoryMountStore = Readonly<{
  records: readonly RendererMemoryMountRecord[];
}>;

export type RendererMemoryMountAdapter = RendererAdapter & Readonly<{
  store: RendererMemoryMountStore;
}>;

export function createRendererMemoryMountStore(): RendererMemoryMountStore {
  return {
    records: [],
  };
}

export function createRendererMemoryMountRecord(
  request: RendererMountRequest,
): RendererMemoryMountRecord {
  return {
    outputName: request.output.name,
    outputKind: request.output.kind,
    targetName: request.target.name,
    ...(request.target.identifier !== undefined
      ? { targetIdentifier: request.target.identifier }
      : {}),
    content: request.output.content ?? "",
  };
}

export function createRendererMemoryMountAdapter(
  name: string,
  store: RendererMemoryMountStore = createRendererMemoryMountStore(),
): RendererMemoryMountAdapter {
  const records: RendererMemoryMountRecord[] = [...store.records];
  const mountedStore: RendererMemoryMountStore = {
    records,
  };

  return {
    name,
    store: mountedStore,
    mount(request: RendererMountRequest): RendererMountResult {
      if (request.target.kind !== "memory") {
        return {
          mounted: false,
          output: request.output,
          target: request.target,
          error: `Renderer memory adapter cannot mount to ${request.target.kind} targets`,
        };
      }

      records.push(createRendererMemoryMountRecord(request));

      return {
        mounted: true,
        output: request.output,
        target: request.target,
      };
    },
  };
}

