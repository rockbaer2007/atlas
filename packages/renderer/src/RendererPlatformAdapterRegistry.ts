import type { RendererPlatformAdapter } from "./RendererPlatformAdapter";

export type RendererPlatformAdapterRegistry = Readonly<{
  platformAdapters: readonly RendererPlatformAdapter[];
}>;

export function createRendererPlatformAdapterRegistry(
  platformAdapters: readonly RendererPlatformAdapter[],
): RendererPlatformAdapterRegistry {
  return {
    platformAdapters: [...platformAdapters],
  };
}
