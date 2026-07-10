import { CycleDetector } from "./CycleDetector";
import { TopologicalSorter } from "./TopologicalSorter";
import type { ModuleDescriptor } from "../manifest/ModuleDescriptor";

export class ModuleDependencyResolver{
  private readonly cycles=new CycleDetector();
  private readonly sorter=new TopologicalSorter();

  resolve(modules:readonly ModuleDescriptor[]):readonly ModuleDescriptor[]{
    const moduleIds = new Set(modules.map(module => module.manifest.id));

    for (const module of modules) {
      for (const dependency of module.manifest.dependencies) {
        if (!dependency.optional && !moduleIds.has(dependency.id)) {
          throw new Error(
            `Module dependency not found: ${module.manifest.id} -> ${dependency.id}`,
          );
        }
      }
    }

    if(this.cycles.hasCycle(modules)){
      throw new Error("Module dependency cycle detected.");
    }
    return this.sorter.sort(modules);
  }
}
