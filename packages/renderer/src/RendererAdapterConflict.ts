import type { RendererAdapter } from "./RendererAdapter";

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
