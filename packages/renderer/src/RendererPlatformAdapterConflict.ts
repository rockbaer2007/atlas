import type { RendererPlatformAdapter } from "./RendererPlatformAdapter";
import type { RendererPlatformAdapterRegistry } from "./RendererPlatformAdapterRegistry";

export type RendererPlatformAdapterConflict = Readonly<{
  platform: string;
  platformAdapters: readonly RendererPlatformAdapter[];
}>;

export function createRendererPlatformAdapterConflict(
  conflict: RendererPlatformAdapterConflict,
): RendererPlatformAdapterConflict {
  return {
    ...conflict,
    platformAdapters: [...conflict.platformAdapters],
  };
}

export function findRendererPlatformAdapterConflicts(
  registry: RendererPlatformAdapterRegistry,
): readonly RendererPlatformAdapterConflict[] {
  const platformAdaptersByPlatform = new Map<string, RendererPlatformAdapter[]>();

  for (const platformAdapter of registry.platformAdapters) {
    const platformAdapters = platformAdaptersByPlatform.get(platformAdapter.platform) ?? [];
    platformAdapters.push(platformAdapter);
    platformAdaptersByPlatform.set(platformAdapter.platform, platformAdapters);
  }

  return [...platformAdaptersByPlatform.entries()]
    .filter(([, platformAdapters]) => platformAdapters.length > 1)
    .map(([platform, platformAdapters]) => createRendererPlatformAdapterConflict({
      platform,
      platformAdapters,
    }));
}
