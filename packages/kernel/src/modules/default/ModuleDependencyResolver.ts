import { CycleDetector } from "./CycleDetector";
import { TopologicalSorter } from "./TopologicalSorter";
import type { ModuleDescriptor } from "../manifest/ModuleDescriptor";

export class ModuleDependencyResolver{
  private readonly cycles=new CycleDetector();
  private readonly sorter=new TopologicalSorter();

  resolve(modules:readonly ModuleDescriptor[]){
    if(this.cycles.hasCycle(modules)){
      throw new Error("Module dependency cycle detected.");
    }
    return this.sorter.sort(modules);
  }
}
