import type { RendererAdapter } from "./RendererAdapter";

export type RendererAdapterRegistry = Readonly<{
  adapters: readonly RendererAdapter[];
}>;

export function createRendererAdapterRegistry(
  adapters: readonly RendererAdapter[],
): RendererAdapterRegistry {
  return {
    adapters: [...adapters],
  };
}
