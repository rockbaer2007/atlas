import type { ModuleDescriptor } from "../manifest/ModuleDescriptor";

export class TopologicalSorter{
  sort(modules:readonly ModuleDescriptor[]):readonly ModuleDescriptor[]{
    // Placeholder: Kahn algorithm will be implemented in next sprint.
    return [...modules];
  }
}
