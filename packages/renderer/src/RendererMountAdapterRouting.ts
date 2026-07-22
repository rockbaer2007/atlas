import type { RendererAdapter } from "./RendererAdapter";
import {
  createRendererAdapterRegistry,
  findRendererAdapter,
  type RendererAdapterRegistry,
} from "./RendererAdapterRegistry";
import {
  createRendererDomMountAdapter,
  type RendererDomMountAdapter,
} from "./RendererDomMount";
import {
  createRendererMemoryMountAdapter,
  type RendererMemoryMountAdapter,
} from "./RendererMemoryMount";
import {
  createRendererMountRequest,
  createRendererMountResult,
  type RendererMountResult,
} from "./RendererMount";
import type { RendererOutput } from "./RendererOutput";
import type { RendererTarget, RendererTargetKind } from "./RendererTarget";

export const RendererDefaultMountAdapterNames = {
  Memory: "renderer.memory",
  Dom: "renderer.dom",
} as const;

export type RendererDefaultMountAdapterRegistry = Readonly<{
  registry: RendererAdapterRegistry;
  memoryAdapter: RendererMemoryMountAdapter;
  domAdapter: RendererDomMountAdapter;
}>;

export type RendererTargetMountAdapterResolution = Readonly<{
  target: RendererTarget;
  adapterName: string;
  adapter?: RendererAdapter;
  error?: string;
}>;

export type RendererUnifiedMountRequest = Readonly<{
  output: RendererOutput;
  target: RendererTarget;
  registry?: RendererAdapterRegistry;
}>;

function getRendererMountAdapterName(targetKind: RendererTargetKind): string {
  return targetKind === "memory"
    ? RendererDefaultMountAdapterNames.Memory
    : RendererDefaultMountAdapterNames.Dom;
}

export function createDefaultRendererMountAdapterRegistry(
  memoryAdapter: RendererMemoryMountAdapter = createRendererMemoryMountAdapter(
    RendererDefaultMountAdapterNames.Memory,
  ),
  domAdapter: RendererDomMountAdapter = createRendererDomMountAdapter(
    RendererDefaultMountAdapterNames.Dom,
  ),
): RendererDefaultMountAdapterRegistry {
  return {
    memoryAdapter,
    domAdapter,
    registry: createRendererAdapterRegistry([memoryAdapter, domAdapter]),
  };
}

export function resolveRendererTargetMountAdapter(
  registry: RendererAdapterRegistry,
  target: RendererTarget,
): RendererTargetMountAdapterResolution {
  const adapterName = getRendererMountAdapterName(target.kind);
  const lookup = findRendererAdapter(registry, {
    name: adapterName,
  });

  if (!lookup.adapter) {
    return {
      target,
      adapterName,
      error: `Renderer mount adapter ${adapterName} was not found.`,
    };
  }

  return {
    target,
    adapterName,
    adapter: lookup.adapter,
  };
}

export async function executeRendererTargetMount(
  request: RendererUnifiedMountRequest,
): Promise<RendererMountResult> {
  if (request.target.kind === "surface" && !request.target.identifier) {
    return createRendererMountResult({
      mounted: false,
      output: request.output,
      target: request.target,
      error: "Renderer surface targets require identifiers before adapter routing.",
    });
  }

  const registry = request.registry ?? createDefaultRendererMountAdapterRegistry().registry;
  const resolution = resolveRendererTargetMountAdapter(registry, request.target);

  if (!resolution.adapter) {
    return createRendererMountResult({
      mounted: false,
      output: request.output,
      target: request.target,
      error: resolution.error,
    });
  }

  return resolution.adapter.mount(createRendererMountRequest({
    output: request.output,
    target: request.target,
  }));
}
