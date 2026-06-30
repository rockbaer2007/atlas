import type { ModuleDescriptor } from "../manifest/ModuleDescriptor";

export class CycleDetector{
  hasCycle(_modules:readonly ModuleDescriptor[]):boolean{
    return false;
  }
}
