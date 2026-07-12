import type { RendererAdapter } from "./RendererAdapter";
import type { RendererAdapterRegistry } from "./RendererAdapterRegistry";

export type RendererAdapterConflict = Readonly<{
  name: string;
  adapters: readonly RendererAdapter[];
}>;

export function createRendererAdapterConflict(
  conflict: RendererAdapterConflict,
): RendererAdapterConflict {
  return {
    ...conflict,
    adapters: [...conflict.adapters],
  };
}

export function findRendererAdapterConflicts(
  registry: RendererAdapterRegistry,
): readonly RendererAdapterConflict[] {
  const adaptersByName = new Map<string, RendererAdapter[]>();

  for (const adapter of registry.adapters) {
    const adapters = adaptersByName.get(adapter.name) ?? [];
    adapters.push(adapter);
    adaptersByName.set(adapter.name, adapters);
  }

  return [...adaptersByName.entries()]
    .filter(([, adapters]) => adapters.length > 1)
    .map(([name, adapters]) => createRendererAdapterConflict({
      name,
      adapters,
    }));
}
