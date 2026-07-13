import type { RendererPlatformAdapter } from "./RendererPlatformAdapter";

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
